/* ============================================================
   VIAVIA VIRTUAL AIRLINES
   Supabase Connection + Authentication Helpers

   Project: Viavia Operations
   ============================================================ */

const VIAVIA_SUPABASE_URL =
  "https://mlholodzyoumculgwevb.supabase.co";

const VIAVIA_SUPABASE_PUBLISHABLE_KEY =
  "sb_publishable_9tIH3so1-iFxwUeVtIq7LA_lNUKcynd";


/* ============================================================
   LOAD SUPABASE CLIENT
   ============================================================ */

if (!window.supabase) {
  throw new Error(
    "Supabase JS library has not been loaded. " +
    "Load the Supabase CDN before viavia-supabase.js."
  );
}

const viaviaSupabase = window.supabase.createClient(
  VIAVIA_SUPABASE_URL,
  VIAVIA_SUPABASE_PUBLISHABLE_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
    }
  }
);


/* ============================================================
   AUTHENTICATION
   ============================================================ */

/**
 * Returns the currently signed-in Supabase user.
 * Returns null when nobody is signed in.
 */
async function getViaviaUser() {
  const {
    data: { user },
    error
  } = await viaviaSupabase.auth.getUser();

  if (error) {
    console.error("Viavia Auth: Could not get user.", error);
    return null;
  }

  return user;
}


/**
 * Returns the current Supabase session.
 */
async function getViaviaSession() {
  const {
    data: { session },
    error
  } = await viaviaSupabase.auth.getSession();

  if (error) {
    console.error("Viavia Auth: Could not get session.", error);
    return null;
  }

  return session;
}


/**
 * Sign up a new Viavia pilot.
 *
 * The database trigger we created will automatically create
 * the matching row in public.pilots.
 */
async function signUpViaviaPilot(email, password, displayName) {
  const { data, error } = await viaviaSupabase.auth.signUp({
    email: email.trim(),
    password,
    options: {
      data: {
        display_name: displayName.trim()
      }
    }
  });

  if (error) {
    throw error;
  }

  return data;
}


/**
 * Sign in an existing Viavia pilot.
 */
async function signInViaviaPilot(email, password) {
  const { data, error } =
    await viaviaSupabase.auth.signInWithPassword({
      email: email.trim(),
      password
    });

  if (error) {
    throw error;
  }

  return data;
}


/**
 * Sign out the current pilot.
 */
async function signOutViaviaPilot() {
  const { error } = await viaviaSupabase.auth.signOut();

  if (error) {
    throw error;
  }

  return true;
}


/**
 * Require authentication on a protected page.
 *
 * Example:
 *
 * const user = await requireViaviaAuth();
 *
 * If the pilot is not logged in, they are sent to login.html.
 */
async function requireViaviaAuth() {
  const user = await getViaviaUser();

  if (!user) {
    const currentPage =
      window.location.pathname.split("/").pop() || "pilot-center.html";

    const redirect =
      "login.html?redirect=" +
      encodeURIComponent(currentPage + window.location.search);

    window.location.replace(redirect);

    return null;
  }

  return user;
}


/* ============================================================
   PILOT PROFILE
   ============================================================ */

/**
 * Get the current pilot's Viavia profile.
 */
async function getViaviaPilotProfile() {
  const user = await getViaviaUser();

  if (!user) {
    return null;
  }

  const { data, error } = await viaviaSupabase
    .from("pilots")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error) {
    console.error(
      "Viavia Operations: Could not load pilot profile.",
      error
    );

    return null;
  }

  return data;
}


/**
 * Update allowed pilot profile information.
 */
async function updateViaviaPilotProfile(updates) {
  const user = await getViaviaUser();

  if (!user) {
    throw new Error("Pilot is not authenticated.");
  }

  const allowedUpdates = {};

  if (typeof updates.display_name === "string") {
    allowedUpdates.display_name = updates.display_name.trim();
  }

  if (
    updates.base === "DFW" ||
    updates.base === "RSW" ||
    updates.base === "SMF"
  ) {
    allowedUpdates.base = updates.base;
  }

  const { data, error } = await viaviaSupabase
    .from("pilots")
    .update(allowedUpdates)
    .eq("id", user.id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}


/* ============================================================
   TRIP ASSIGNMENTS
   ============================================================ */

/**
 * Converts a Date object or date string to YYYY-MM-DD.
 */
function normalizeViaviaOperatingDate(value) {
  if (!value) {
    throw new Error("An operating date is required.");
  }

  if (typeof value === "string") {
    const match = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);

    if (match) {
      return value;
    }
  }

  const date = value instanceof Date
    ? value
    : new Date(value);

  if (Number.isNaN(date.getTime())) {
    throw new Error("Invalid operating date.");
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}


/**
 * Returns all assigned trip IDs for a particular operating date.
 *
 * This is used by Available Bids to determine which trips have
 * already been claimed by another pilot.
 */
async function getViaviaAssignedTrips(operatingDate) {
  const date = normalizeViaviaOperatingDate(operatingDate);

  const { data, error } = await viaviaSupabase
    .from("trip_assignments")
    .select("trip_id,status")
    .eq("operating_date", date)
    .neq("status", "cancelled");

  if (error) {
    throw error;
  }

  return data || [];
}


/**
 * Check whether a specific trip is already assigned on a date.
 */
async function isViaviaTripAssigned(tripId, operatingDate) {
  const date = normalizeViaviaOperatingDate(operatingDate);

  const { data, error } = await viaviaSupabase
    .from("trip_assignments")
    .select("id")
    .eq("trip_id", tripId)
    .eq("operating_date", date)
    .neq("status", "cancelled")
    .limit(1);

  if (error) {
    throw error;
  }

  return Array.isArray(data) && data.length > 0;
}


/**
 * Claim a pairing.
 *
 * IMPORTANT:
 * Supabase/Postgres is the authority here.
 *
 * The UNIQUE constraint on:
 *
 *     trip_id + operating_date
 *
 * prevents two pilots from being awarded the same trip on the
 * same operating date.
 */
async function claimViaviaTrip(pairing, operatingDate) {
  const user = await getViaviaUser();

  if (!user) {
    throw new Error("You must be signed in to claim a trip.");
  }

  if (!pairing) {
    throw new Error("Pairing information is missing.");
  }

  if (!pairing.pairingId) {
    throw new Error("Pairing does not have a valid Trip ID.");
  }

  if (
    !Array.isArray(pairing.flights) ||
    pairing.flights.length === 0
  ) {
    throw new Error("Pairing does not contain any flights.");
  }

  const date = normalizeViaviaOperatingDate(operatingDate);

  const flightNumbers = pairing.flights.map(
    flight => flight.flightNumber
  );

  const aircraft = [
    ...new Set(
      pairing.flights
        .map(flight => flight.aircraft)
        .filter(Boolean)
    )
  ];

  const assignment = {
    trip_id: pairing.pairingId,
    operating_date: date,
    pilot_id: user.id,

    base:
      pairing.base ||
      pairing.flights[0].origin,

    route:
      pairing.route ||
      pairing.flights
        .map((flight, index) => {
          if (index === 0) {
            return `${flight.origin} → ${flight.destination}`;
          }

          return `→ ${flight.destination}`;
        })
        .join(" "),

    flight_numbers: flightNumbers,

    aircraft,

    leg_count: pairing.flights.length,

    status: "awarded",

    gate_status: "TBD — Gate assignment pending"
  };

  const { data, error } = await viaviaSupabase
    .from("trip_assignments")
    .insert(assignment)
    .select()
    .single();

  if (error) {

    /*
       PostgreSQL error 23505 = unique violation.

       For Viavia, that means another pilot already claimed this
       Trip ID on this operating date.
    */
    if (error.code === "23505") {
      const conflictError = new Error(
        "This trip was just assigned to another pilot."
      );

      conflictError.code = "VIAVIA_TRIP_TAKEN";
      throw conflictError;
    }

    throw error;
  }

  return data;
}


/**
 * Returns all trips belonging to the currently signed-in pilot.
 */
async function getMyViaviaTrips() {
  const user = await getViaviaUser();

  if (!user) {
    throw new Error("Pilot is not authenticated.");
  }

  const { data, error } = await viaviaSupabase
    .from("trip_assignments")
    .select("*")
    .eq("pilot_id", user.id)
    .order("operating_date", {
      ascending: true
    })
    .order("awarded_at", {
      ascending: true
    });

  if (error) {
    throw error;
  }

  return data || [];
}


/**
 * Get one of the current pilot's assignments.
 */
async function getMyViaviaTrip(tripId, operatingDate) {
  const user = await getViaviaUser();

  if (!user) {
    throw new Error("Pilot is not authenticated.");
  }

  const date = normalizeViaviaOperatingDate(operatingDate);

  const { data, error } = await viaviaSupabase
    .from("trip_assignments")
    .select("*")
    .eq("pilot_id", user.id)
    .eq("trip_id", tripId)
    .eq("operating_date", date)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
}


/* ============================================================
   AUTH STATE
   ============================================================ */

/**
 * Allows Viavia pages to respond when a pilot logs in/out.
 */
function onViaviaAuthStateChange(callback) {
  return viaviaSupabase.auth.onAuthStateChange(
    (event, session) => {
      callback(event, session);
    }
  );
}


/* ============================================================
   GLOBAL ACCESS
   ============================================================ */

window.viaviaSupabase = viaviaSupabase;

window.ViaviaAuth = {
  getUser: getViaviaUser,
  getSession: getViaviaSession,
  signUp: signUpViaviaPilot,
  signIn: signInViaviaPilot,
  signOut: signOutViaviaPilot,
  requireAuth: requireViaviaAuth,
  onAuthStateChange: onViaviaAuthStateChange
};

window.ViaviaPilots = {
  getProfile: getViaviaPilotProfile,
  updateProfile: updateViaviaPilotProfile
};

window.ViaviaTrips = {
  normalizeDate: normalizeViaviaOperatingDate,
  getAssignedTrips: getViaviaAssignedTrips,
  isAssigned: isViaviaTripAssigned,
  claim: claimViaviaTrip,
  getMyTrips: getMyViaviaTrips,
  getMyTrip: getMyViaviaTrip
};

console.log(
  "Viavia Operations: Supabase connection initialized."
);
