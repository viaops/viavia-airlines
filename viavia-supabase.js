/* ============================================================
   VIAVIA VIRTUAL AIRLINES
   Supabase Connection + Authentication Helpers

   Project: Viavia Operations
   Version: 2026-09-26
   ============================================================ */

const VIAVIA_SUPABASE_URL =
  "https://mlholodzyoumculgwevb.supabase.co";

const VIAVIA_SUPABASE_PUBLISHABLE_KEY =
  "sb_publishable_9tIH3so1-iFxwUeVtIq7LA_lNUKcynd";

const VIAVIA_EMAIL_CONFIRM_REDIRECT =
  "https://viaops.github.io/viavia-airlines/login.html";


/* ============================================================
   LOAD SUPABASE CLIENT
   ============================================================ */

if (!window.supabase) {
  throw new Error(
    "Supabase JS library has not been loaded. " +
    "Load the Supabase CDN before viavia-supabase.js."
  );
}

const viaviaSupabase =
  window.supabase.createClient(
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

async function getViaviaUser() {

  const {
    data: { user },
    error
  } = await viaviaSupabase.auth.getUser();

  if (error) {

    console.error(
      "Viavia Auth: Could not get user.",
      error
    );

    return null;
  }

  return user;
}


async function getViaviaSession() {

  const {
    data: { session },
    error
  } = await viaviaSupabase.auth.getSession();

  if (error) {

    console.error(
      "Viavia Auth: Could not get session.",
      error
    );

    return null;
  }

  return session;
}


/* ============================================================
   SIGN UP
   ============================================================ */

async function signUpViaviaPilot(
  email,
  password,
  displayName
) {

  const { data, error } =
    await viaviaSupabase.auth.signUp({
      email: email.trim(),
      password,

      options: {

        emailRedirectTo:
          VIAVIA_EMAIL_CONFIRM_REDIRECT,

        data: {
          display_name:
            displayName.trim()
        }

      }
    });

  if (error) {
    throw error;
  }

  return data;
}


/* ============================================================
   SIGN IN
   ============================================================ */

async function signInViaviaPilot(
  email,
  password
) {

  const { data, error } =
    await viaviaSupabase.auth
      .signInWithPassword({
        email: email.trim(),
        password
      });

  if (error) {
    throw error;
  }

  return data;
}


/* ============================================================
   SIGN OUT
   ============================================================ */

async function signOutViaviaPilot() {

  const { error } =
    await viaviaSupabase.auth.signOut();

  if (error) {
    throw error;
  }

  return true;
}


/* ============================================================
   REQUIRE AUTHENTICATION
   ============================================================ */

async function requireViaviaAuth() {

  const user =
    await getViaviaUser();

  if (!user) {

    const currentPage =
      window.location.pathname
        .split("/")
        .pop() ||
      "pilot-center.html";

    const redirect =
      "login.html?redirect=" +
      encodeURIComponent(
        currentPage +
        window.location.search
      );

    window.location.replace(
      redirect
    );

    return null;
  }

  return user;
}


/* ============================================================
   PILOT PROFILE
   ============================================================ */

async function getViaviaPilotProfile() {

  const user =
    await getViaviaUser();

  if (!user) {
    return null;
  }

  const { data, error } =
    await viaviaSupabase
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


/* ============================================================
   UPDATE PILOT PROFILE
   ============================================================ */

async function updateViaviaPilotProfile(
  updates
) {

  const user =
    await getViaviaUser();

  if (!user) {

    throw new Error(
      "Pilot is not authenticated."
    );

  }

  const allowedUpdates = {};


  if (
    typeof updates.display_name ===
    "string"
  ) {

    allowedUpdates.display_name =
      updates.display_name.trim();

  }


  if (
    updates.base === "DFW" ||
    updates.base === "RSW" ||
    updates.base === "SMF"
  ) {

    allowedUpdates.base =
      updates.base;

  }


  const { data, error } =
    await viaviaSupabase
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
   OPERATING DATE
   ============================================================ */

function normalizeViaviaOperatingDate(
  value
) {

  if (!value) {

    throw new Error(
      "An operating date is required."
    );

  }


  if (
    typeof value === "string"
  ) {

    const match =
      value.match(
        /^(\d{4})-(\d{2})-(\d{2})$/
      );

    if (match) {
      return value;
    }

  }


  const date =
    value instanceof Date
      ? value
      : new Date(value);


  if (
    Number.isNaN(
      date.getTime()
    )
  ) {

    throw new Error(
      "Invalid operating date."
    );

  }


  const year =
    date.getFullYear();

  const month =
    String(
      date.getMonth() + 1
    ).padStart(
      2,
      "0"
    );

  const day =
    String(
      date.getDate()
    ).padStart(
      2,
      "0"
    );


  return (
    `${year}-${month}-${day}`
  );
}


/* ============================================================
   GET ASSIGNED TRIPS FOR DATE

   IMPORTANT:
   pilot_id is intentionally included.

   This lets Available Trips determine:

   - Available
   - Assigned to another pilot
   - Awarded to the current pilot
   ============================================================ */

async function getViaviaAssignedTrips(
  operatingDate
) {

  const date =
    normalizeViaviaOperatingDate(
      operatingDate
    );


  const { data, error } =
    await viaviaSupabase
      .from("trip_assignments")
      .select(
        `
        id,
        trip_id,
        operating_date,
        pilot_id,
        base,
        route,
        flight_numbers,
        aircraft,
        leg_count,
        status,
        gate_status,
        awarded_at
        `
      )
      .eq(
        "operating_date",
        date
      )
      .neq(
        "status",
        "cancelled"
      );


  if (error) {
    throw error;
  }


  return data || [];
}


/* ============================================================
   CHECK ONE TRIP
   ============================================================ */

async function isViaviaTripAssigned(
  tripId,
  operatingDate
) {

  const date =
    normalizeViaviaOperatingDate(
      operatingDate
    );


  const { data, error } =
    await viaviaSupabase
      .from("trip_assignments")
      .select(
        "id,trip_id,pilot_id,status"
      )
      .eq(
        "trip_id",
        tripId
      )
      .eq(
        "operating_date",
        date
      )
      .neq(
        "status",
        "cancelled"
      )
      .limit(1);


  if (error) {
    throw error;
  }


  return (
    Array.isArray(data) &&
    data.length > 0
  );
}


/* ============================================================
   CLAIM TRIP

   PostgreSQL is the final authority.

   UNIQUE:
       trip_id + operating_date

   prevents two pilots from receiving the same dated trip.
   ============================================================ */

async function claimViaviaTrip(
  pairing,
  operatingDate
) {

  const user =
    await getViaviaUser();


  if (!user) {

    throw new Error(
      "You must be signed in to claim a trip."
    );

  }


  if (!pairing) {

    throw new Error(
      "Pairing information is missing."
    );

  }


  if (!pairing.pairingId) {

    throw new Error(
      "Pairing does not have a valid Trip ID."
    );

  }


  if (
    !Array.isArray(
      pairing.flights
    ) ||
    pairing.flights.length === 0
  ) {

    throw new Error(
      "Pairing does not contain any flights."
    );

  }


  const date =
    normalizeViaviaOperatingDate(
      operatingDate
    );


  const flightNumbers =
    pairing.flights.map(
      flight =>
        flight.flightNumber
    );


  const aircraft = [
    ...new Set(
      pairing.flights
        .map(
          flight =>
            flight.aircraft
        )
        .filter(Boolean)
    )
  ];


  const assignment = {

    trip_id:
      pairing.pairingId,

    operating_date:
      date,

    pilot_id:
      user.id,

    base:
      pairing.base ||
      pairing.flights[0].origin,

    route:
      pairing.route ||
      pairing.flights
        .map(
          (flight, index) => {

            if (index === 0) {

              return (
                `${flight.origin} → ` +
                `${flight.destination}`
              );

            }

            return (
              `→ ${flight.destination}`
            );

          }
        )
        .join(" "),

    flight_numbers:
      flightNumbers,

    aircraft:
      aircraft,

    leg_count:
      pairing.flights.length,

    status:
      "awarded",

    gate_status:
      "TBD — Gate assignment pending"

  };


  const { data, error } =
    await viaviaSupabase
      .from("trip_assignments")
      .insert(
        assignment
      )
      .select()
      .single();


  if (error) {

    /*
       PostgreSQL 23505 =
       unique constraint violation.

       Another pilot won the assignment first.
    */

    if (
      error.code ===
      "23505"
    ) {

      const conflictError =
        new Error(
          "This trip was just assigned to another pilot."
        );

      conflictError.code =
        "VIAVIA_TRIP_TAKEN";

      throw conflictError;

    }

    throw error;
  }


  return data;
}


/* ============================================================
   CURRENT PILOT'S TRIPS
   ============================================================ */

async function getMyViaviaTrips() {

  const user =
    await getViaviaUser();


  if (!user) {

    throw new Error(
      "Pilot is not authenticated."
    );

  }


  const { data, error } =
    await viaviaSupabase
      .from("trip_assignments")
      .select("*")
      .eq(
        "pilot_id",
        user.id
      )
      .neq(
        "status",
        "cancelled"
      )
      .order(
        "operating_date",
        {
          ascending: true
        }
      )
      .order(
        "awarded_at",
        {
          ascending: true
        }
      );


  if (error) {
    throw error;
  }


  return data || [];
}


/* ============================================================
   CURRENT PILOT'S TRIPS FOR ONE DATE
   ============================================================ */

async function getMyViaviaTripsForDate(
  operatingDate
) {

  const user =
    await getViaviaUser();


  if (!user) {

    throw new Error(
      "Pilot is not authenticated."
    );

  }


  const date =
    normalizeViaviaOperatingDate(
      operatingDate
    );


  const { data, error } =
    await viaviaSupabase
      .from("trip_assignments")
      .select("*")
      .eq(
        "pilot_id",
        user.id
      )
      .eq(
        "operating_date",
        date
      )
      .neq(
        "status",
        "cancelled"
      )
      .order(
        "awarded_at",
        {
          ascending: true
        }
      );


  if (error) {
    throw error;
  }


  return data || [];
}


/* ============================================================
   GET ONE CURRENT-PILOT ASSIGNMENT
   ============================================================ */

async function getMyViaviaTrip(
  tripId,
  operatingDate
) {

  const user =
    await getViaviaUser();


  if (!user) {

    throw new Error(
      "Pilot is not authenticated."
    );

  }


  const date =
    normalizeViaviaOperatingDate(
      operatingDate
    );


  const { data, error } =
    await viaviaSupabase
      .from("trip_assignments")
      .select("*")
      .eq(
        "pilot_id",
        user.id
      )
      .eq(
        "trip_id",
        tripId
      )
      .eq(
        "operating_date",
        date
      )
      .neq(
        "status",
        "cancelled"
      )
      .maybeSingle();


  if (error) {
    throw error;
  }


  return data;
}


/* ============================================================
   OWNERSHIP CHECK

   Useful for Available Trips.
   ============================================================ */

async function getViaviaTripAvailability(
  tripId,
  operatingDate
) {

  const user =
    await getViaviaUser();


  if (!user) {

    throw new Error(
      "Pilot is not authenticated."
    );

  }


  const date =
    normalizeViaviaOperatingDate(
      operatingDate
    );


  const { data, error } =
    await viaviaSupabase
      .from("trip_assignments")
      .select(
        `
        id,
        trip_id,
        operating_date,
        pilot_id,
        status
        `
      )
      .eq(
        "trip_id",
        tripId
      )
      .eq(
        "operating_date",
        date
      )
      .neq(
        "status",
        "cancelled"
      )
      .maybeSingle();


  if (error) {
    throw error;
  }


  if (!data) {

    return {
      available: true,
      mine: false,
      assignment: null
    };

  }


  return {

    available: false,

    mine:
      data.pilot_id ===
      user.id,

    assignment:
      data

  };
}


/* ============================================================
   AUTH STATE
   ============================================================ */

function onViaviaAuthStateChange(
  callback
) {

  return viaviaSupabase.auth
    .onAuthStateChange(
      (event, session) => {

        callback(
          event,
          session
        );

      }
    );
}


/* ============================================================
   GLOBAL ACCESS
   ============================================================ */

window.viaviaSupabase =
  viaviaSupabase;


window.ViaviaAuth = {

  getUser:
    getViaviaUser,

  getSession:
    getViaviaSession,

  signUp:
    signUpViaviaPilot,

  signIn:
    signInViaviaPilot,

  signOut:
    signOutViaviaPilot,

  requireAuth:
    requireViaviaAuth,

  onAuthStateChange:
    onViaviaAuthStateChange

};


window.ViaviaPilots = {

  getProfile:
    getViaviaPilotProfile,

  updateProfile:
    updateViaviaPilotProfile

};


window.ViaviaTrips = {

  normalizeDate:
    normalizeViaviaOperatingDate,

  getAssignedTrips:
    getViaviaAssignedTrips,

  isAssigned:
    isViaviaTripAssigned,

  claim:
    claimViaviaTrip,

  getMyTrips:
    getMyViaviaTrips,

  getMyTripsForDate:
    getMyViaviaTripsForDate,

  getMyTrip:
    getMyViaviaTrip,

  getAvailability:
    getViaviaTripAvailability

};


console.log(
  "Viavia Operations: Supabase connection initialized."
);
