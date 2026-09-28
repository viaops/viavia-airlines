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


/* ============================================================
   GATE ASSIGNMENT — CREATE / RETURN FIXED ASSIGNMENT
   ============================================================ */

function isViaviaRpcMessage(error, code) {

  if (!error) {
    return false;
  }

  return [
    error.message,
    error.details,
    error.hint
  ]
    .filter(Boolean)
    .join(" ")
    .includes(code);
}


async function getOrAssignViaviaGate(
  flightNumber,
  operatingDate,
  airport,
  scheduledArrival = null,
  scheduledDeparture = null
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


  // If already assigned, keep and return the fixed gate.
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
          normalizeViaviaTimestamp(
            scheduledArrival
          ),

        p_scheduled_departure:
          normalizeViaviaTimestamp(
            scheduledDeparture
          )
      }
    );


  if (error) {

    if (
      isViaviaRpcMessage(
        error,
        "VIAVIA_GATE_NOT_RELEASED"
      )
    ) {

      const releaseError =
        new Error(
          "TBD — Gate assignment pending"
        );

      releaseError.code =
        "VIAVIA_GATE_NOT_RELEASED";

      releaseError.cause =
        error;

      throw releaseError;
    }

    throw error;
  }


  return data || null;
}
/* ============================================================
   VIAVIA AIRCRAFT ASSIGNMENT SYSTEM
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


  const { data, error } =
    await viaviaSupabase.rpc(
      "get_viavia_aircraft_assignment",
      {
        p_flight_number:
          flight,

        p_operating_date:
          date
      }
    );


  if (error) {
    throw error;
  }


  if (Array.isArray(data)) {
    return data[0] || null;
  }


  return data || null;
}


async function getOrAssignViaviaAircraft(
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


  // If already assigned, keep and return the fixed aircraft.
  const existing =
    await getViaviaAircraftAssignment(
      flight,
      date
    );

  if (existing) {
    return existing;
  }


  const { data, error } =
    await viaviaSupabase.rpc(
      "assign_viavia_aircraft",
      {
        p_flight_number:
          flight,

        p_operating_date:
          date
      }
    );


  if (error) {

    if (
      isViaviaRpcMessage(
        error,
        "VIAVIA_AIRCRAFT_NOT_RELEASED"
      )
    ) {

      const releaseError =
        new Error(
          "Aircraft registration pending"
        );

      releaseError.code =
        "VIAVIA_AIRCRAFT_NOT_RELEASED";

      releaseError.cause =
        error;

      throw releaseError;
    }

    throw error;
  }


  return data || null;
}
/* ============================================================
   VIACARS — FLIGHTS, EVENTS, MESSAGES
   ============================================================ */

async function startViaviaAcarsFlight(d){
  const u=await getViaviaUser(); if(!u) throw new Error("Pilot is not authenticated.");
  const f=normalizeViaviaFlightNumber(d?.flight_number), date=normalizeViaviaOperatingDate(d?.operating_date);
  const row={pilot_id:u.id,trip_id:String(d?.trip_id||"").trim(),flight_number:f,operating_date:date,
    origin:normalizeViaviaAirport(d?.origin),destination:normalizeViaviaAirport(d?.destination),
    aircraft_type:d?.aircraft_type||null,aircraft_registration:d?.aircraft_registration||null,
    departure_gate:d?.departure_gate||null,arrival_gate:d?.arrival_gate||null,
    scheduled_departure:d?.scheduled_departure||null,scheduled_arrival:d?.scheduled_arrival||null,status:"preflight"};
  if(!row.trip_id) throw new Error("A Trip ID is required.");
  const q=await viaviaSupabase.from("acars_flights").select("*").eq("pilot_id",u.id).eq("flight_number",f).eq("operating_date",date).maybeSingle();
  if(q.error) throw q.error; if(q.data) return q.data;
  const r=await viaviaSupabase.from("acars_flights").insert(row).select().single(); if(r.error) throw r.error;
  await logViaviaAcarsEvent(r.data.id,"ACARS_STARTED",{payload:{trip_id:row.trip_id,flight_number:f}});
  return r.data;
}
async function getViaviaAcarsFlight(id){
  const u=await getViaviaUser(); if(!u) throw new Error("Pilot is not authenticated.");
  const r=await viaviaSupabase.from("acars_flights").select("*").eq("id",id).eq("pilot_id",u.id).maybeSingle();
  if(r.error) throw r.error; return r.data;
}
async function getViaviaAcarsFlightByOperation(number,date){
  const u=await getViaviaUser(); if(!u) throw new Error("Pilot is not authenticated.");
  const r=await viaviaSupabase.from("acars_flights").select("*").eq("pilot_id",u.id)
    .eq("flight_number",normalizeViaviaFlightNumber(number)).eq("operating_date",normalizeViaviaOperatingDate(date)).maybeSingle();
  if(r.error) throw r.error; return r.data;
}
async function logViaviaAcarsEvent(id,type,x={}){
  const u=await getViaviaUser(); if(!u) throw new Error("Pilot is not authenticated.");
  const row={flight_id:id,pilot_id:u.id,event_type:String(type||"").trim().toUpperCase(),
    event_time:normalizeViaviaTimestamp(x.event_time||new Date()),latitude:x.latitude??null,longitude:x.longitude??null,
    altitude_ft:x.altitude_ft??null,ground_speed_kts:x.ground_speed_kts??null,vertical_speed_fpm:x.vertical_speed_fpm??null,
    heading_deg:x.heading_deg??null,fuel_total_lb:x.fuel_total_lb??null,payload:x.payload??null};
  if(!row.event_type) throw new Error("An ACARS event type is required.");
  const r=await viaviaSupabase.from("acars_events").insert(row).select().single(); if(r.error) throw r.error; return r.data;
}
async function updateViaviaAcarsStatus(id,status,when){
  const u=await getViaviaUser(); if(!u) throw new Error("Pilot is not authenticated.");
  const cols={preflight:null,boarding:"boarding_at",gate_out:"out_at",taxi:null,airborne:"off_at",landed:"on_at",gate_in:"in_at",complete:"completed_at",cancelled:null};
  if(!(status in cols)) throw new Error("Invalid VIACARS flight status.");
  const updates={status,updated_at:new Date().toISOString()}, col=cols[status];
  if(col) updates[col]=normalizeViaviaTimestamp(when||new Date());
  const r=await viaviaSupabase.from("acars_flights").update(updates).eq("id",id).eq("pilot_id",u.id).select().single();
  if(r.error) throw r.error; await logViaviaAcarsEvent(id,status.toUpperCase()); return r.data;
}
async function getViaviaAcarsEvents(id){
  const u=await getViaviaUser(); if(!u) throw new Error("Pilot is not authenticated.");
  const r=await viaviaSupabase.from("acars_events").select("*").eq("flight_id",id).eq("pilot_id",u.id).order("event_time",{ascending:true});
  if(r.error) throw r.error; return r.data||[];
}
async function sendViaviaAcarsMessage(id,direction,text,type="free_text"){
  const u=await getViaviaUser(); if(!u) throw new Error("Pilot is not authenticated.");
  if(!["ground_to_air","air_to_ground"].includes(direction)) throw new Error("Invalid ACARS message direction.");
  const msg=String(text||"").trim(); if(!msg) throw new Error("ACARS message text is required.");
  const r=await viaviaSupabase.from("acars_messages").insert({flight_id:id||null,pilot_id:u.id,direction,message_type:type,message_text:msg,status:"queued"}).select().single();
  if(r.error) throw r.error; return r.data;
}
async function getViaviaAcarsMessages(id){
  const u=await getViaviaUser(); if(!u) throw new Error("Pilot is not authenticated.");
  let q=viaviaSupabase.from("acars_messages").select("*").eq("pilot_id",u.id); if(id) q=q.eq("flight_id",id);
  const r=await q.order("created_at",{ascending:true}); if(r.error) throw r.error; return r.data||[];
}
async function updateViaviaAcarsMessageStatus(id,status){
  const u=await getViaviaUser(); if(!u) throw new Error("Pilot is not authenticated.");
  if(!["queued","sent","received","failed"].includes(status)) throw new Error("Invalid ACARS message status.");
  const x={status}; if(status==="sent") x.sent_at=new Date().toISOString(); if(status==="received") x.received_at=new Date().toISOString();
  const r=await viaviaSupabase.from("acars_messages").update(x).eq("id",id).eq("pilot_id",u.id).select().single();
  if(r.error) throw r.error; return r.data;
}

/* ============================================================
   GLOBAL VIAVIA API
   ============================================================ */

window.ViaviaAuth = {
  getUser: getViaviaUser,
  getSession: getViaviaSession,
  signUp: signUpViaviaPilot,
  signIn: signInViaviaPilot,
  signOut: signOutViaviaPilot,
  requireAuth: requireViaviaAuth
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
  drop: dropViaviaTrip,
  getMyTrips: getMyViaviaTrips,
  getMyTripsForDate: getMyViaviaTripsForDate,
  getMyTrip: getMyViaviaTrip,
  getAvailability: getViaviaTripAvailability
};


window.ViaviaGates = {
  normalizeAirport: normalizeViaviaAirport,
  normalizeFlightNumber: normalizeViaviaFlightNumber,
  normalizeTimestamp: normalizeViaviaTimestamp,
  getGatePool: getViaviaGatePool,
  getAllGatePools: getAllViaviaGatePools,
  getGateAssignment: getViaviaGateAssignment,
  getAirportGateAssignments: getViaviaAirportGateAssignments,
  getFlightGateAssignments: getViaviaFlightGateAssignments,
  getOrAssign: getOrAssignViaviaGate
};


window.ViaviaAircraft = {
  getAssignment: getViaviaAircraftAssignment,
  getOrAssign: getOrAssignViaviaAircraft
};



window.ViaviaACARS = {
  startFlight:startViaviaAcarsFlight,
  getFlight:getViaviaAcarsFlight,
  getFlightByOperation:getViaviaAcarsFlightByOperation,
  updateStatus:updateViaviaAcarsStatus,
  logEvent:logViaviaAcarsEvent,
  getEvents:getViaviaAcarsEvents,
  sendMessage:sendViaviaAcarsMessage,
  getMessages:getViaviaAcarsMessages,
  updateMessageStatus:updateViaviaAcarsMessageStatus
};


console.log(
  "Viavia Operations: Supabase helpers loaded."
);
