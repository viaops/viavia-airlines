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
   OWNERSHIP / AVAILABILITY CHECK
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
   VIAVIA GATE SYSTEM

   Supabase tables:

   viavia_gate_pools
   flight_gate_assignments

   Gate assignments are shared between all pilots/devices.
   ============================================================ */


/* ============================================================
   NORMALIZE AIRPORT
   ============================================================ */

function normalizeViaviaAirport(
  airport
) {

  if (
    typeof airport !== "string" ||
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


/* ============================================================
   NORMALIZE FLIGHT NUMBER

   Database format:
   VIA1757
   ============================================================ */

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
    String(flightNumber)
      .trim()
      .toUpperCase()
      .replace(/\s+/g, "");


  if (/^\d+$/.test(value)) {

    value =
      "VIA" + value;

  }


  if (
    !/^VIA\d+$/.test(value)
  ) {

    throw new Error(
      "Invalid Viavia flight number."
    );

  }


  return value;
}


/* ============================================================
   GET APPROVED GATE POOL

   Example:
   ViaviaGates.getPool("DFW")
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
      .from("viavia_gate_pools")
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


/* ============================================================
   GET ALL APPROVED GATE POOLS
   ============================================================ */

async function getAllViaviaGatePools() {

  const { data, error } =
    await viaviaSupabase
      .from("viavia_gate_pools")
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
          ascending: true
        }
      );


  if (error) {
    throw error;
  }


  return data || [];
}


/* ============================================================
   GET ONE EXISTING FLIGHT GATE ASSIGNMENT

   A flight can have an assignment at its departure airport
   and another assignment at its arrival airport.

   Example:
   VIA1757 / 2026-09-27 / RSW
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
      .from("flight_gate_assignments")
      .select(
        `
        id,
        operating_date,
        flight_number,
        airport,
        gate,
        assigned_at,
        created_at,
        updated_at
        `
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
   GET ALL GATE ASSIGNMENTS FOR ONE AIRPORT / DATE
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
      .from("flight_gate_assignments")
      .select(
        `
        id,
        operating_date,
        flight_number,
        airport,
        gate,
        assigned_at,
        created_at,
        updated_at
        `
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
          ascending: true
        }
      );


  if (error) {
    throw error;
  }


  return data || [];
}


/* ============================================================
   GET ALL GATE ASSIGNMENTS FOR ONE FLIGHT / DATE

   Useful because a flight can have:

   origin gate
   destination gate
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
      .from("flight_gate_assignments")
      .select(
        `
        id,
        operating_date,
        flight_number,
        airport,
        gate,
        assigned_at,
        created_at,
        updated_at
        `
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
          ascending: true
        }
      );


  if (error) {
    throw error;
  }


  return data || [];
}


/* ============================================================
   CREATE / GET SHARED GATE ASSIGNMENT

   This function:

   1. Checks for an existing assignment.
   2. Loads the airport's approved gate pool.
   3. Looks at gates already assigned at that airport/date.
   4. Chooses an available approved gate.
   5. Saves it to Supabase.
   6. If another client created the same flight assignment
      first, it retrieves that shared assignment.

   IMPORTANT:
   The 12-hour eligibility decision remains in Flight Planning.
   This helper does not decide when a gate should be released.
   ============================================================ */

async function assignViaviaGate(
  flightNumber,
  operatingDate,
  airport
) {

  const user =
    await getViaviaUser();


  if (!user) {

    throw new Error(
      "Pilot is not authenticated."
    );

  }


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


  /* ----------------------------------------------------------
     EXISTING ASSIGNMENT
     ---------------------------------------------------------- */

  const existing =
    await getViaviaGateAssignment(
      flight,
      date,
      airportCode
    );


  if (existing) {
    return existing;
  }


  /* ----------------------------------------------------------
     APPROVED AIRPORT GATE POOL
     ---------------------------------------------------------- */

  const pool =
    await getViaviaGatePool(
      airportCode
    );


  if (
    !pool ||
    !Array.isArray(pool.gates) ||
    pool.gates.length === 0
  ) {

    const noPoolError =
      new Error(
        `No approved Viavia gate pool exists for ${airportCode}.`
      );

    noPoolError.code =
      "VIAVIA_NO_GATE_POOL";

    throw noPoolError;
  }


  /* ----------------------------------------------------------
     CURRENT ASSIGNMENTS AT AIRPORT
     ---------------------------------------------------------- */

  const airportAssignments =
    await getViaviaAirportGateAssignments(
      airportCode,
      date
    );


  const usedGates =
    new Set(
      airportAssignments
        .map(
          assignment =>
            String(
              assignment.gate
            ).toUpperCase()
        )
    );


  const availableGates =
    pool.gates.filter(
      gate =>
        !usedGates.has(
          String(gate).toUpperCase()
        )
    );


  /*
     If every gate has already been assigned somewhere on that
     operating date, allow the pool to cycle.

     This is intentional for now because the current table does
     not yet store arrival/departure occupancy timestamps.

     Flight Planning will later provide the actual timing logic.
  */

  const candidateGates =
    availableGates.length > 0
      ? availableGates
      : pool.gates;


  /*
     Deterministic selection instead of Math.random().

     The same flight/date/airport combination produces a stable
     starting position in the approved gate pool.
  */

  const seed =
    (
      flight +
      date +
      airportCode
    )
      .split("")
      .reduce(
        (total, character) =>
          total +
          character.charCodeAt(0),
        0
      );


  const gate =
    candidateGates[
      seed %
      candidateGates.length
    ];


  const newAssignment = {

    operating_date:
      date,

    flight_number:
      flight,

    airport:
      airportCode,

    gate:
      String(gate)

  };


  const { data, error } =
    await viaviaSupabase
      .from("flight_gate_assignments")
      .insert(
        newAssignment
      )
      .select()
      .single();


  if (!error) {
    return data;
  }


  /* ----------------------------------------------------------
     RACE CONDITION

     PostgreSQL 23505 means another browser/pilot created the
     same flight/date/airport assignment before this insert
     completed.

     Retrieve the winning shared assignment.
     ---------------------------------------------------------- */

  if (
    error.code ===
    "23505"
  ) {

    const winningAssignment =
      await getViaviaGateAssignment(
        flight,
        date,
        airportCode
      );


    if (winningAssignment) {
      return winningAssignment;
    }


    const conflictError =
      new Error(
        "The gate assignment changed while it was being created."
      );

    conflictError.code =
      "VIAVIA_GATE_ASSIGNMENT_CONFLICT";

    throw conflictError;
  }


  throw error;
}


/* ============================================================
   GET OR ASSIGN

   Convenience function for Flight Planning.

   If the gate already exists:
       return it.

   Otherwise:
       create it.
   ============================================================ */

async function getOrAssignViaviaGate(
  flightNumber,
  operatingDate,
  airport
) {

  const existing =
    await getViaviaGateAssignment(
      flightNumber,
      operatingDate,
      airport
    );


  if (existing) {
    return existing;
  }


  return await assignViaviaGate(
    flightNumber,
    operatingDate,
    airport
  );
}


/* ============================================================
   GATE DISPLAY HELPER
   ============================================================ */

async function getViaviaGateDisplay(
  flightNumber,
  operatingDate,
  airport
) {

  const assignment =
    await getViaviaGateAssignment(
      flightNumber,
      operatingDate,
      airport
    );


  if (!assignment) {

    return {
      assigned: false,
      gate: null,
      text:
        "TBD — Gate assignment pending"
    };

  }


  return {
    assigned: true,
    gate:
      assignment.gate,
    text:
      `Gate ${assignment.gate}`,
    assignment
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


/* ============================================================
   GLOBAL GATE API

   Usage examples:

   ViaviaGates.getPool("DFW")

   ViaviaGates.getAssignment(
     "VIA1757",
     "2026-09-27",
     "RSW"
   )

   ViaviaGates.getOrAssign(
     "VIA1757",
     "2026-09-27",
     "RSW"
   )
   ============================================================ */

window.ViaviaGates = {

  normalizeAirport:
    normalizeViaviaAirport,

  normalizeFlightNumber:
    normalizeViaviaFlightNumber,

  getPool:
    getViaviaGatePool,

  getAllPools:
    getAllViaviaGatePools,

  getAssignment:
    getViaviaGateAssignment,

  getAirportAssignments:
    getViaviaAirportGateAssignments,

  getFlightAssignments:
    getViaviaFlightGateAssignments,

  assign:
    assignViaviaGate,

  getOrAssign:
    getOrAssignViaviaGate,

  getDisplay:
    getViaviaGateDisplay

};


console.log(
  "Viavia Operations: Supabase connection initialized."
);
