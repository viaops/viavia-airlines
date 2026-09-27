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


/* ============================================================
   ATOMIC GATE ASSIGNMENT
   ============================================================ */

async function assignViaviaGate(
  flightNumber,
  operatingDate,
  airport,
  scheduledArrival = null,
  scheduledDeparture = null
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


  const arrivalTimestamp =
    normalizeViaviaTimestamp(
      scheduledArrival
    );

  const departureTimestamp =
    normalizeViaviaTimestamp(
      scheduledDeparture
    );


  const existing =
    await getViaviaGateAssignment(
      flight,
      date,
      airportCode
    );


  if (existing) {
    return existing;
  }


  const { data, error } =
    await viaviaSupabase.rpc(
      "assign_viavia_gate",
      {
        p_flight_number:
          flight,

        p_operating_date:
          date,

        p_airport:
          airportCode,

        p_scheduled_arrival:
          arrivalTimestamp,

        p_scheduled_departure:
          departureTimestamp
      }
    );


  if (error) {

    const message =
      String(
        error.message ||
        ""
      );


    if (
      message.includes(
        "No conflict-free Viavia gate"
      )
    ) {

      const unavailableError =
        new Error(
          `No conflict-free Viavia gate is currently available at ${airportCode}.`
        );

      unavailableError.code =
        "VIAVIA_NO_GATE_AVAILABLE";

      throw unavailableError;

    }


    if (
      message.includes(
        "No approved Viavia gate pool"
      )
    ) {

      const poolError =
        new Error(
          `No approved Viavia gate pool exists for ${airportCode}.`
        );

      poolError.code =
        "VIAVIA_NO_GATE_POOL";

      throw poolError;

    }


    throw error;
  }


  const assignment =
    Array.isArray(data)
      ? data[0]
      : data;


  if (!assignment) {

    const persisted =
      await getViaviaGateAssignment(
        flight,
        date,
        airportCode
      );


    if (persisted) {
      return persisted;
    }


    throw new Error(
      "Viavia Operations did not return the new gate assignment."
    );
  }


  return assignment;
}


/* ============================================================
   GET OR ASSIGN GATE
   ============================================================ */

async function getOrAssignViaviaGate(
  flightNumber,
  operatingDate,
  airport,
  scheduledArrival = null,
  scheduledDeparture = null
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
    airport,
    scheduledArrival,
    scheduledDeparture
  );
}


/* ============================================================
   GATE DISPLAY
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
      assigned:false,
      gate:null,
      text:
        "TBD — Gate assignment pending",
      occupancyStatus:null
    };

  }


  return {
    assigned:true,

    gate:
      assignment.gate,

    text:
      `Gate ${assignment.gate}`,

    occupancyStatus:
      assignment.occupancy_status,

    assignment
  };
}


/* ============================================================
   LIVE GATE STATUS
   ============================================================ */

async function getViaviaLiveGateStatus(
  airport
) {

  const airportCode =
    normalizeViaviaAirport(
      airport
    );


  const { data, error } =
    await viaviaSupabase
      .from(
        "viavia_live_gate_status"
      )
      .select("*")
      .eq(
        "airport",
        airportCode
      );


  if (error) {
    throw error;
  }

  return data || [];
}


/* ============================================================
   IS GATE PHYSICALLY OCCUPIED
   ============================================================ */

async function isViaviaGateOccupied(
  airport,
  gate
) {

  const airportCode =
    normalizeViaviaAirport(
      airport
    );


  if (
    gate === null ||
    gate === undefined ||
    !String(gate).trim()
  ) {

    throw new Error(
      "A gate is required."
    );

  }


  const { data, error } =
    await viaviaSupabase.rpc(
      "viavia_gate_is_occupied",
      {
        p_airport:
          airportCode,

        p_gate:
          String(gate)
            .trim()
            .toUpperCase()
      }
    );


  if (error) {
    throw error;
  }


  return data === true;
}


/* ============================================================
   ACARS GATE IN
   ============================================================ */

async function reportViaviaAcarsGateIn(
  flightNumber,
  operatingDate,
  airport,
  gate
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


  if (
    gate === null ||
    gate === undefined ||
    !String(gate).trim()
  ) {

    throw new Error(
      "A gate is required for ACARS gate-in."
    );

  }


  const { error } =
    await viaviaSupabase.rpc(
      "viavia_acars_gate_in",
      {
        p_flight_number:
          flight,

        p_operating_date:
          date,

        p_airport:
          airportCode,

        p_gate:
          String(gate)
            .trim()
            .toUpperCase()
      }
    );


  if (error) {
    throw error;
  }


  return await getViaviaGateAssignment(
    flight,
    date,
    airportCode
  );
}


/* ============================================================
   ACARS GATE OUT
   ============================================================ */

async function reportViaviaAcarsGateOut(
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


  const { error } =
    await viaviaSupabase.rpc(
      "viavia_acars_gate_out",
      {
        p_flight_number:
          flight,

        p_operating_date:
          date,

        p_airport:
          airportCode
      }
    );


  if (error) {
    throw error;
  }


  return await getViaviaGateAssignment(
    flight,
    date,
    airportCode
  );
}


/* ============================================================
   AIRCRAFT ASSIGNMENTS
   ============================================================ */

const VIAVIA_AIRCRAFT_FIELDS = `
  id,
  operating_date,
  flight_number,
  registration,
  origin,
  destination,
  aircraft_family,
  scheduled_departure,
  scheduled_arrival,
  actual_departure,
  actual_arrival,
  assignment_status,
  assignment_source,
  created_at,
  updated_at
`;


/* ============================================================
   24-HOUR AIRCRAFT REGISTRATION RELEASE
   ============================================================ */

const VIAVIA_AIRCRAFT_RELEASE_HOURS = 24;


function isViaviaAircraftRegistrationReleased(
  scheduledDeparture
) {

  if (!scheduledDeparture) {
    return false;
  }


  const departure =
    new Date(
      scheduledDeparture
    );


  if (
    Number.isNaN(
      departure.getTime()
    )
  ) {

    return false;
  }


  const releaseTime =
    departure.getTime() -
    (
      VIAVIA_AIRCRAFT_RELEASE_HOURS *
      60 *
      60 *
      1000
    );


  return Date.now() >= releaseTime;
}


/* ============================================================
   GET SCHEDULED AIRCRAFT FAMILY
   ============================================================ */

async function getViaviaScheduledAircraftFamily(
  flightNumber
) {

  const flight =
    normalizeViaviaFlightNumber(
      flightNumber
    );


  const { data, error } =
    await viaviaSupabase
      .from(
        "viavia_flights"
      )
      .select(
        "aircraft_family"
      )
      .eq(
        "flight_number",
        flight
      )
      .maybeSingle();


  if (error) {

    console.error(
      `Viavia Aircraft: Could not load scheduled aircraft family for ${flight}.`,
      error
    );

    throw error;
  }


  return (
    data &&
    data.aircraft_family
      ? String(
          data.aircraft_family
        )
          .trim()
          .toUpperCase()
      : null
  );
}


/* ============================================================
   GET STORED AIRCRAFT ASSIGNMENT
   ============================================================ */

async function getStoredViaviaAircraftAssignment(
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
        "aircraft_assignments"
      )
      .select(
        VIAVIA_AIRCRAFT_FIELDS
      )
      .eq(
        "flight_number",
        flight
      )
      .eq(
        "operating_date",
        date
      )
      .neq(
        "assignment_status",
        "cancelled"
      )
      .maybeSingle();


  if (error) {

    console.error(
      `Viavia Aircraft: Could not load ${flight} for ${date}.`,
      error
    );

    throw error;
  }


  return data || null;
}


/* ============================================================
   GET ONE AIRCRAFT ASSIGNMENT

   >24 HOURS:
   Registration is hidden.

   <=24 HOURS:
   Existing assignment is returned.

   If no assignment exists:
   Supabase randomly assigns an available registration from
   the correct aircraft family and permanently stores it.
   ============================================================ */

async function getViaviaAircraftAssignment(
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


  /*
   * First check the database.
   *
   * This is important because October 11-24 already have
   * pre-generated assignments. We keep those assignments,
   * but do NOT expose their registrations before 24 hours.
   */

  const existing =
    await getStoredViaviaAircraftAssignment(
      flight,
      date
    );


  if (existing) {

    if (
      !isViaviaAircraftRegistrationReleased(
        existing.scheduled_departure
      )
    ) {

      return null;
    }


    return existing;
  }


  /*
   * No stored aircraft exists.
   *
   * Ask the database to create one.
   *
   * The SQL function itself enforces the 24-hour rule.
   * Therefore JavaScript cannot accidentally generate an
   * aircraft early.
   */

  const user =
    await getViaviaUser();


  if (!user) {

    throw new Error(
      "Pilot is not authenticated."
    );

  }


  const {
    data: assignedData,
    error: assignError
  } =
    await viaviaSupabase.rpc(
      "assign_random_viavia_aircraft",
      {
        p_flight_number:
          flight,

        p_operating_date:
          date
      }
    );


  if (assignError) {

    const message =
      String(
        assignError.message ||
        ""
      );


    /*
     * This is expected when the flight is still more
     * than 24 hours away.
     */

    if (
      message.includes(
        "VIAVIA_AIRCRAFT_NOT_RELEASED"
      )
    ) {

      return null;
    }


    console.error(
      `Viavia Aircraft: Could not automatically assign ${flight} for ${date}.`,
      assignError
    );

    throw assignError;
  }


  const assignment =
    Array.isArray(
      assignedData
    )
      ? assignedData[0]
      : assignedData;


  if (assignment) {

    if (
      !isViaviaAircraftRegistrationReleased(
        assignment.scheduled_departure
      )
    ) {

      return null;
    }


    return assignment;
  }


  /*
   * Safety fallback.
   *
   * If Supabase inserted the assignment but the RPC response
   * did not contain the row, query the database one more time.
   */

  const persisted =
    await getStoredViaviaAircraftAssignment(
      flight,
      date
    );


  if (
    persisted &&
    isViaviaAircraftRegistrationReleased(
      persisted.scheduled_departure
    )
  ) {

    return persisted;
  }


  return null;
}


/* ============================================================
   GET AIRCRAFT ASSIGNMENTS FOR DATE
   ============================================================ */

async function getViaviaAircraftAssignmentsForDate(
  operatingDate
) {

  const date =
    normalizeViaviaOperatingDate(
      operatingDate
    );


  const { data, error } =
    await viaviaSupabase
      .from(
        "aircraft_assignments"
      )
      .select(
        VIAVIA_AIRCRAFT_FIELDS
      )
      .eq(
        "operating_date",
        date
      )
      .neq(
        "assignment_status",
        "cancelled"
      )
      .order(
        "scheduled_departure",
        {
          ascending:true
        }
      );


  if (error) {
    throw error;
  }


  /*
   * Never expose future registrations before their individual
   * 24-hour release times.
   */

  return (
    data || []
  ).filter(
    assignment =>
      isViaviaAircraftRegistrationReleased(
        assignment.scheduled_departure
      )
  );
}


/* ============================================================
   GET MULTIPLE AIRCRAFT ASSIGNMENTS
   ============================================================ */

async function getViaviaAircraftAssignments(
  flights
) {

  if (
    !Array.isArray(flights) ||
    flights.length === 0
  ) {

    return [];
  }


  const results =
    await Promise.all(
      flights.map(
        async item => {

          if (
            !item ||
            !item.flightNumber ||
            !item.operatingDate
          ) {

            return null;
          }


          return await getViaviaAircraftAssignment(
            item.flightNumber,
            item.operatingDate
          );

        }
      )
    );


  return results.filter(Boolean);
}


/* ============================================================
   GET AIRCRAFT ASSIGNMENT HISTORY
   ============================================================ */

async function getViaviaAircraftRotation(
  registration,
  startDate = null,
  endDate = null
) {

  const tail =
    String(
      registration || ""
    )
      .trim()
      .toUpperCase();


  if (!tail) {

    throw new Error(
      "An aircraft registration is required."
    );

  }


  let query =
    viaviaSupabase
      .from(
        "aircraft_assignments"
      )
      .select(
        VIAVIA_AIRCRAFT_FIELDS
      )
      .eq(
        "registration",
        tail
      )
      .neq(
        "assignment_status",
        "cancelled"
      );


  if (startDate) {

    query =
      query.gte(
        "operating_date",
        normalizeViaviaOperatingDate(
          startDate
        )
      );

  }


  if (endDate) {

    query =
      query.lte(
        "operating_date",
        normalizeViaviaOperatingDate(
          endDate
        )
      );

  }


  const { data, error } =
    await query.order(
      "scheduled_departure",
      {
        ascending:true
      }
    );


  if (error) {
    throw error;
  }


  /*
   * Even this compatibility/history function will not expose
   * registrations before their 24-hour release.
   */

  return (
    data || []
  ).filter(
    assignment =>
      isViaviaAircraftRegistrationReleased(
        assignment.scheduled_departure
      )
  );
}


/* ============================================================
   AIRCRAFT VARIANT
   ============================================================ */

function getViaviaAircraftVariant(
  aircraftFamily
) {

  const family =
    String(
      aircraftFamily || ""
    )
      .trim()
      .toUpperCase();


  const variants = {
    A319:"A319-132",
    A320:"A320-232",
    A321:"A321-232"
  };


  return (
    variants[family] ||
    family ||
    null
  );
}


/* ============================================================
   AIRCRAFT DISPLAY
   ============================================================ */

function formatViaviaAircraftAssignment(
  assignment
) {

  if (!assignment) {
    return null;
  }


  const variant =
    getViaviaAircraftVariant(
      assignment.aircraft_family
    );


  const registration =
    assignment.registration
      ? String(
          assignment.registration
        )
          .trim()
          .toUpperCase()
      : null;


  if (
    variant &&
    registration
  ) {

    return (
      `${variant} · ${registration}`
    );

  }


  return (
    registration ||
    variant ||
    null
  );
}


async function getViaviaAircraftDisplay(
  flightNumber,
  operatingDate
) {

  /*
   * Aircraft TYPE remains visible even when registration
   * has not yet been released.
   */

  const family =
    await getViaviaScheduledAircraftFamily(
      flightNumber
    );

  const variant =
    getViaviaAircraftVariant(
      family
    );


  /*
   * This either:
   *
   * 1. returns an existing released assignment,
   * 2. creates one when <=24 hours,
   * 3. or returns null when >24 hours.
   */

  const assignment =
    await getViaviaAircraftAssignment(
      flightNumber,
      operatingDate
    );


  if (!assignment) {

    return {

      assigned:false,

      released:false,

      assignment:null,

      family,

      variant,

      registration:null,

      text:
        variant
          ? `${variant} · Aircraft registration pending`
          : "Aircraft registration pending"

    };

  }


  return {

    assigned:true,

    released:true,

    assignment,

    family:
      assignment.aircraft_family ||
      family,

    variant:
      getViaviaAircraftVariant(
        assignment.aircraft_family ||
        family
      ),

    registration:
      assignment.registration,

    text:
      formatViaviaAircraftAssignment(
        assignment
      )

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
      (
        event,
        session
      ) => {

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
   ============================================================ */

window.ViaviaGates = {

  normalizeAirport:
    normalizeViaviaAirport,

  normalizeFlightNumber:
    normalizeViaviaFlightNumber,

  normalizeTimestamp:
    normalizeViaviaTimestamp,

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
    getViaviaGateDisplay,

  getLiveStatus:
    getViaviaLiveGateStatus,

  isOccupied:
    isViaviaGateOccupied,

  acarsGateIn:
    reportViaviaAcarsGateIn,

  acarsGateOut:
    reportViaviaAcarsGateOut

};


/* ============================================================
   GLOBAL AIRCRAFT API
   ============================================================ */

window.ViaviaAircraft = {

  getAssignment:
    getViaviaAircraftAssignment,

  getAssignments:
    getViaviaAircraftAssignments,

  getAssignmentsForDate:
    getViaviaAircraftAssignmentsForDate,

  getRotation:
    getViaviaAircraftRotation,

  getVariant:
    getViaviaAircraftVariant,

  format:
    formatViaviaAircraftAssignment,

  getDisplay:
    getViaviaAircraftDisplay,

  isRegistrationReleased:
    isViaviaAircraftRegistrationReleased,

  releaseHours:
    VIAVIA_AIRCRAFT_RELEASE_HOURS

};


console.log(
  "Viavia Operations: Supabase connection initialized."
);
