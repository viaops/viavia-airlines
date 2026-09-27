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
   GET ONE AIRCRAFT ASSIGNMENT
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
   * First check whether this dated flight already
   * has an active aircraft assignment.
   */

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


  /*
   * Aircraft already exists.
   * Keep the stored registration.
   */

  if (data) {
    return data;
  }


  /*
   * No aircraft exists yet.
   *
   * Require an authenticated Viavia pilot before
   * automatically creating an aircraft assignment.
   */

  const user =
    await getViaviaUser();


  if (!user) {

    throw new Error(
      "Pilot is not authenticated."
    );

  }


  /*
   * Ask Supabase to choose a random available
   * registration from the correct aircraft family.
   *
   * The database function handles:
   *
   * - A319/A320/A321 family matching
   * - random registration selection
   * - overlap protection
   * - saving the assignment permanently
   * - returning an existing assignment if another
   *   request created it at the same time
   */

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

    console.error(
      `Viavia Aircraft: Could not automatically assign ${flight} for ${date}.`,
      assignError
    );

    throw assignError;
  }


  /*
   * Supabase RPC responses may come back either as
   * a single object or an array containing the row.
   */

  const assignment =
    Array.isArray(assignedData)
      ? assignedData[0]
      : assignedData;


  if (assignment) {
    return assignment;
  }


  /*
   * Safety fallback:
   *
   * If the RPC successfully inserted the aircraft
   * but did not return the row to JavaScript, query
   * aircraft_assignments again.
   */

  const {
    data: persisted,
    error: persistedError
  } =
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


  if (persistedError) {

    console.error(
      `Viavia Aircraft: Could not reload ${flight} for ${date}.`,
      persistedError
    );

    throw persistedError;
  }


  if (persisted) {
    return persisted;
  }


  throw new Error(
    `Viavia Aircraft: No assignment was returned for ${flight} on ${date}.`
  );
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

    console.error(
      `Viavia Aircraft: Could not load assignments for ${date}.`,
      error
    );

    throw error;
  }


  return data || [];
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
   GET AIRCRAFT ROTATION / ASSIGNMENT HISTORY
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


  return data || [];
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

    A319:
      "A319-132",

    A320:
      "A320-232",

    A321:
      "A321-232"

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


/* ============================================================
   GET AIRCRAFT DISPLAY
   ============================================================ */

async function getViaviaAircraftDisplay(
  flightNumber,
  operatingDate
) {

  /*
   * getViaviaAircraftAssignment() now automatically
   * creates an aircraft assignment when one does not
   * already exist.
   */

  const assignment =
    await getViaviaAircraftAssignment(
      flightNumber,
      operatingDate
    );


  if (!assignment) {

    return {

      assigned:false,

      assignment:null,

      family:null,

      variant:null,

      registration:null,

      text:
        "Aircraft registration pending"

    };

  }


  return {

    assigned:true,

    assignment,

    family:
      assignment.aircraft_family,

    variant:
      getViaviaAircraftVariant(
        assignment.aircraft_family
      ),

    registration:
      assignment.registration,

    text:
      formatViaviaAircraftAssignment(
        assignment
      )

  };
}
