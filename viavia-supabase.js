/* ============================================================
   VIAVIA VIRTUAL AIRLINES
   Supabase Connection + Authentication + Operations Helpers

   Project: Viavia Operations
   Version: 2026-09-27
   ============================================================ */

const VIAVIA_SUPABASE_URL =
  "https://mlholodzyoumculgwevb.supabase.co";

const VIAVIA_SUPABASE_PUBLISHABLE_KEY =
  "sb_publishable_9tIH3so1-iFxwUeVtIq7LA_lNUKcynd";

const VIAVIA_EMAIL_CONFIRM_REDIRECT =
  "https://viaops.github.io/viavia-airlines/login.html";


/* ============================================================
   LOAD SUPABASE
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
  } =
    await viaviaSupabase.auth.getUser();

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
  } =
    await viaviaSupabase.auth.getSession();

  if (error) {

    console.error(
      "Viavia Auth: Could not get session.",
      error
    );

    return null;
  }

  return session;
}


async function signUpViaviaPilot(
  email,
  password,
  displayName
) {

  const { data, error } =
    await viaviaSupabase.auth.signUp({
      email:
        email.trim(),

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


async function signInViaviaPilot(
  email,
  password
) {

  const { data, error } =
    await viaviaSupabase.auth
      .signInWithPassword({
        email:
          email.trim(),

        password
      });

  if (error) {
    throw error;
  }

  return data;
}


async function signOutViaviaPilot() {

  const { error } =
    await viaviaSupabase.auth.signOut();

  if (error) {
    throw error;
  }

  return true;
}


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
      .eq(
        "id",
        user.id
      )
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
      .update(
        allowedUpdates
      )
      .eq(
        "id",
        user.id
      )
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
    typeof value ===
    "string"
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
   TRIP ASSIGNMENTS
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
      .from(
        "trip_assignments"
      )
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
      .from(
        "trip_assignments"
      )
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

            if (
              index === 0
            ) {

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
      .from(
        "trip_assignments"
      )
      .insert(
        assignment
      )
      .select()
      .single();


  if (error) {

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
   DROP TRIP

   The assignment is preserved in the database and its status
   becomes "cancelled".

   Viavia's availability queries already exclude cancelled
   assignments. Therefore the same trip/date becomes available
   to another pilot immediately after the drop succeeds.
   ============================================================ */

async function dropViaviaTrip(
  tripId,
  operatingDate
) {

  const user =
    await getViaviaUser();


  if (!user) {

    throw new Error(
      "You must be signed in to drop a trip."
    );

  }


  const normalizedTripId =
    String(
      tripId || ""
    ).trim();


  if (!normalizedTripId) {

    throw new Error(
      "A valid Trip ID is required."
    );

  }


  const date =
    normalizeViaviaOperatingDate(
      operatingDate
    );


  /*
   * Find the active assignment first.
   *
   * The authenticated user ID is used here so the browser
   * cannot use this helper to drop another pilot's assignment.
   */

  const {
    data: assignment,
    error: lookupError
  } =
    await viaviaSupabase
      .from(
        "trip_assignments"
      )
      .select(
        "id,trip_id,operating_date,pilot_id,status"
      )
      .eq(
        "pilot_id",
        user.id
      )
      .eq(
        "trip_id",
        normalizedTripId
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


  if (lookupError) {

    console.error(
      "Viavia Trips: Could not locate trip to drop.",
      lookupError
    );

    throw lookupError;

  }


  if (!assignment) {

    const notFoundError =
      new Error(
        "This trip is no longer assigned to your account."
      );

    notFoundError.code =
      "VIAVIA_TRIP_NOT_ASSIGNED";

    throw notFoundError;

  }


  /*
   * Keep the historical row.
   * Only its operational status changes.
   */

  const {
    data,
    error
  } =
    await viaviaSupabase
      .from(
        "trip_assignments"
      )
      .update({
        status:
          "cancelled"
      })
      .eq(
        "id",
        assignment.id
      )
      .eq(
        "pilot_id",
        user.id
      )
      .neq(
        "status",
        "cancelled"
      )
      .select()
      .maybeSingle();


  if (error) {

    console.error(
      "Viavia Trips: Could not drop trip.",
      error
    );

    throw error;

  }


  if (!data) {

    const conflictError =
      new Error(
        "The trip could not be dropped because the assignment changed."
      );

    conflictError.code =
      "VIAVIA_TRIP_DROP_CONFLICT";

    throw conflictError;

  }


  console.log(
    `Viavia Trips: ${normalizedTripId} for ${date} was dropped.`
  );


  return data;
}


/* ============================================================
   CURRENT PILOT TRIPS
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
      .from(
        "trip_assignments"
      )
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
          ascending:true
        }
      )
      .order(
        "awarded_at",
        {
          ascending:true
        }
      );


  if (error) {
    throw error;
  }

  return data || [];
}


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
      .from(
        "trip_assignments"
      )
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
          ascending:true
        }
      );


  if (error) {
    throw error;
  }

  return data || [];
}


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
      .from(
        "trip_assignments"
      )
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
      .from(
        "trip_assignments"
      )
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
      available:true,
      mine:false,
      assignment:null
    };

  }


  return {

    available:false,

    mine:
      data.pilot_id ===
      user.id,

    assignment:
      data

  };
}


/* ============================================================
   VIAVIA GATE SYSTEM
   ============================================================ */

function normalizeViaviaAirport(
  airport
) {

  if (
    typeof airport !==
      "string" ||
    !airport.trim()
  ) {

    throw new Error(
      "A valid airport code is required."
    );

  }


  return airport
    .trim()
    .toUpperCase();
}


function normalizeViaviaFlightNumber(
  flightNumber
) {

  if (
    flightNumber === null ||
    flightNumber === undefined
  ) {

    throw new Error(
      "A valid flight number is required."
    );

  }


  let value =
    String(
      flightNumber
    )
      .trim()
      .toUpperCase()
      .replace(
        /\s+/g,
        ""
      );


  if (
    /^\d+$/.test(
      value
    )
  ) {

    value =
      "VIA" +
      value;

  }


  if (
    !/^VIA\d+$/.test(
      value
    )
  ) {

    throw new Error(
      "Invalid Viavia flight number."
    );

  }


  return value;
}


/* ============================================================
   TIMESTAMP NORMALIZATION
   ============================================================ */

function normalizeViaviaTimestamp(
  value
) {

  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {

    return null;
  }


  if (
    value instanceof Date
  ) {

    if (
      Number.isNaN(
        value.getTime()
      )
    ) {

      throw new Error(
        "Invalid Viavia timestamp."
      );

    }

    return value.toISOString();
  }


  const date =
    new Date(
      value
    );


  if (
    Number.isNaN(
      date.getTime()
    )
  ) {

    throw new Error(
      "Invalid Viavia timestamp."
    );

  }


  return date.toISOString();
}


/* ============================================================
   GATE POOLS
   ============================================================ */

async function getViaviaGatePool(
  airport
) {

  const airportCode =
    normalizeViaviaAirport(
      airport
    );


  const { data, error } =
    await viaviaSupabase
      .from(
        "viavia_gate_pools"
      )
      .select(
        `
        airport,
        terminal_concourse,
        gates
        `
      )
      .eq(
        "airport",
        airportCode
      )
      .maybeSingle();


  if (error) {
    throw error;
  }

  return data;
}


async function getAllViaviaGatePools() {

  const { data, error } =
    await viaviaSupabase
      .from(
        "viavia_gate_pools"
      )
      .select(
        `
        airport,
        terminal_concourse,
        gates
        `
      )
      .order(
        "airport",
        {
          ascending:true
        }
      );


  if (error) {
    throw error;
  }

  return data || [];
}


/* ============================================================
   GATE ASSIGNMENT SELECT FIELDS
   ============================================================ */

const VIAVIA_GATE_FIELDS = `
  id,
  operating_date,
  flight_number,
  airport,
  gate,
  scheduled_arrival,
  scheduled_departure,
  actual_gate_in,
  actual_gate_out,
  occupancy_status,
  occupancy_source,
  assigned_at,
  created_at,
  updated_at
`;


/* ============================================================
   GET ONE GATE ASSIGNMENT
   ============================================================ */

async function getViaviaGateAssignment(
  flightNumber,
  operatingDate,
  airport
) {

  const flight =
    normalizeViaviaFlightNumber(
      flightNumber
    );

  const date =
    normalizeViaviaOperatingDate(
      operatingDate
    );

  const airportCode =
    normalizeViaviaAirport(
      airport
    );


  const { data, error } =
    await viaviaSupabase
      .from(
        "flight_gate_assignments"
      )
      .select(
        VIAVIA_GATE_FIELDS
      )
      .eq(
        "flight_number",
        flight
      )
      .eq(
        "operating_date",
        date
      )
      .eq(
        "airport",
        airportCode
      )
      .maybeSingle();


  if (error) {
    throw error;
  }

  return data;
}


/* ============================================================
   AIRPORT GATE ASSIGNMENTS
   ============================================================ */

async function getViaviaAirportGateAssignments(
  airport,
  operatingDate
) {

  const airportCode =
    normalizeViaviaAirport(
      airport
    );

  const date =
    normalizeViaviaOperatingDate(
      operatingDate
    );


  const { data, error } =
    await viaviaSupabase
      .from(
        "flight_gate_assignments"
      )
      .select(
        VIAVIA_GATE_FIELDS
      )
      .eq(
        "airport",
        airportCode
      )
      .eq(
        "operating_date",
        date
      )
      .order(
        "assigned_at",
        {
          ascending:true
        }
      );


  if (error) {
    throw error;
  }

  return data || [];
}


/* ============================================================
   FLIGHT GATE ASSIGNMENTS
   ============================================================ */

async function getViaviaFlightGateAssignments(
  flightNumber,
  operatingDate
) {

  const flight =
    normalizeViaviaFlightNumber(
      flightNumber
    );

  const date =
    normalizeViaviaOperatingDate(
      operatingDate
    );


  const { data, error } =
    await viaviaSupabase
      .from(
        "flight_gate_assignments"
      )
      .select(
        VIAVIA_GATE_FIELDS
      )
      .eq(
        "flight_number",
        flight
      )
      .eq(
        "operating_date",
        date
      )
      .order(
        "airport",
        {
          ascending:true
        }
      );


  if (error) {
    throw error;
  }

  return data || [];
}
