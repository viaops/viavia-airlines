/* ============================================================
   VIAVIA AIRLINES — MASTER FLIGHT SCHEDULE
   IATA: V1
   ICAO: VIA
   Callsign: VIABUS

   This file is the single source of truth for Viavia's
   scheduled flight legs AND crew pairing generation.

   Current schedule:
   - 131 total flight legs
   - 131 unique flight numbers
   - Pilot bases: DFW / RSW / SMF
   - Gate assignment: assigned only inside 12 hours

   Pairing engine:
   - Deterministic
   - Uses only actual scheduled flights
   - No random pairing generation
   - Shared by Available Trips / Crew Calendar / Crew Portal
============================================================ */

const VIAVIA_SCHEDULE = {

    airline: {
        name: "Viavia Airlines",
        iata: "V1",
        icao: "VIA",
        callsign: "VIABUS",
        slogan: "Your destination, via us!",
        pilotBases: ["DFW", "RSW", "SMF"]
    },

    operations: {
        gateAssignmentHours: 12,

        gatePendingText: "TBD — Gate assignment pending",

        gateRule:
            "Gates are not assigned until at least 12 hours before the scheduled aircraft departure."
    },

    airports: {

        DFW: {
            name: "Dallas Fort Worth International Airport",
            city: "Dallas–Fort Worth",
            country: "United States",
            pilotBase: true
        },

        RSW: {
            name: "Southwest Florida International Airport",
            city: "Fort Myers",
            country: "United States",
            pilotBase: true
        },

        SMF: {
            name: "Sacramento International Airport",
            city: "Sacramento",
            country: "United States",
            pilotBase: true
        }
    },

    flights: [

        /* ====================================================
           DFW OUTBOUND
        ==================================================== */

        {
            flightNumber: "VIA1361",
            origin: "DFW",
            destination: "ATL",
            departure: "08:32",
            arrival: "11:37",
            aircraft: "A320",
            base: "DFW"
        },

        {
            flightNumber: "VIA1469",
            origin: "DFW",
            destination: "ATL",
            departure: "14:28",
            arrival: "17:33",
            aircraft: "A320",
            base: "DFW"
        },

        {
            flightNumber: "VIA123",
            origin: "DFW",
            destination: "BWI",
            departure: "06:20",
            arrival: "10:20",
            aircraft: "A321",
            base: "DFW"
        },

        {
            flightNumber: "VIA2285",
            origin: "DFW",
            destination: "CLT",
            departure: "09:30",
            arrival: "12:55",
            aircraft: "A320",
            base: "DFW"
        },

        {
            flightNumber: "VIA1843",
            origin: "DFW",
            destination: "CMH",
            departure: "17:43",
            arrival: "21:13",
            aircraft: "A320",
            base: "DFW"
        },

        {
            flightNumber: "VIA1779",
            origin: "DFW",
            destination: "EYW",
            departure: "08:46",
            arrival: "12:31",
            aircraft: "A319",
            base: "DFW"
        },

        {
            flightNumber: "VIA119",
            origin: "DFW",
            destination: "FLL",
            departure: "21:11",
            arrival: "01:01",
            nextDay: true,
            aircraft: "A320",
            base: "DFW"
        },

        {
            flightNumber: "VIA1539",
            origin: "DFW",
            destination: "JAX",
            departure: "11:54",
            arrival: "14:19",
            aircraft: "A320",
            base: "DFW"
        },

        {
            flightNumber: "VIA333",
            origin: "DFW",
            destination: "JFK",
            departure: "20:59",
            arrival: "01:14",
            nextDay: true,
            aircraft: "A320",
            base: "DFW"
        },

        {
            flightNumber: "VIA2216",
            origin: "DFW",
            destination: "LAS",
            departure: "06:45",
            arrival: "07:55",
            aircraft: "A320",
            base: "DFW"
        },

        {
            flightNumber: "VIA2116",
            origin: "DFW",
            destination: "LAS",
            departure: "11:37",
            arrival: "12:47",
            aircraft: "A321",
            base: "DFW"
        },

        {
            flightNumber: "VIA1390",
            origin: "DFW",
            destination: "LAS",
            departure: "17:55",
            arrival: "19:05",
            aircraft: "A320",
            base: "DFW"
        },

        {
            flightNumber: "VIA1776",
            origin: "DFW",
            destination: "LAX",
            departure: "05:55",
            arrival: "07:25",
            aircraft: "A321",
            base: "DFW"
        },

        {
            flightNumber: "VIA2024",
            origin: "DFW",
            destination: "LAX",
            departure: "13:43",
            arrival: "15:13",
            aircraft: "A320",
            base: "DFW"
        },

        {
            flightNumber: "VIA428",
            origin: "DFW",
            destination: "LAX",
            departure: "20:17",
            arrival: "21:27",
            aircraft: "A319",
            base: "DFW"
        },

        {
            flightNumber: "VIA1922",
            origin: "DFW",
            destination: "LGA",
            departure: "05:05",
            arrival: "09:20",
            aircraft: "A321",
            base: "DFW"
        },

        {
            flightNumber: "VIA2213",
            origin: "DFW",
            destination: "MIA",
            departure: "07:05",
            arrival: "10:55",
            aircraft: "A321",
            base: "DFW"
        },

        {
            flightNumber: "VIA1337",
            origin: "DFW",
            destination: "MIA",
            departure: "16:02",
            arrival: "19:52",
            aircraft: "A320",
            base: "DFW"
        },

        {
            flightNumber: "VIA2365",
            origin: "DFW",
            destination: "MCO",
            departure: "08:10",
            arrival: "11:35",
            aircraft: "A321",
            base: "DFW"
        },

        {
            flightNumber: "VIA2459",
            origin: "DFW",
            destination: "MCO",
            departure: "17:22",
            arrival: "20:57",
            aircraft: "A319",
            base: "DFW"
        },

        {
            flightNumber: "VIA1409",
            origin: "DFW",
            destination: "MKE",
            departure: "15:15",
            arrival: "17:40",
            aircraft: "A320",
            base: "DFW"
        },

        {
            flightNumber: "VIA1470",
            origin: "DFW",
            destination: "SEA",
            departure: "07:46",
            arrival: "10:06",
            aircraft: "A320",
            base: "DFW"
        },

        {
            flightNumber: "VIA1672",
            origin: "DFW",
            destination: "SEA",
            departure: "14:59",
            arrival: "17:19",
            aircraft: "A320",
            base: "DFW"
        },

        {
            flightNumber: "VIA2222",
            origin: "DFW",
            destination: "SMF",
            departure: "05:55",
            arrival: "07:50",
            aircraft: "A321",
            base: "DFW"
        },

        {
            flightNumber: "VIA1180",
            origin: "DFW",
            destination: "SMF",
            departure: "10:17",
            arrival: "12:12",
            aircraft: "A319",
            base: "DFW"
        },

        {
            flightNumber: "VIA1744",
            origin: "DFW",
            destination: "SMF",
            departure: "20:11",
            arrival: "22:06",
            aircraft: "A320",
            base: "DFW"
        },

        {
            flightNumber: "VIA1241",
            origin: "DFW",
            destination: "SJU",
            departure: "05:00",
            arrival: "10:40",
            aircraft: "A321",
            base: "DFW"
        },

        {
            flightNumber: "VIA128",
            origin: "DFW",
            destination: "SNA",
            departure: "08:38",
            arrival: "10:08",
            aircraft: "A320",
            base: "DFW"
        },

        {
            flightNumber: "VIA1920",
            origin: "DFW",
            destination: "TUS",
            departure: "17:57",
            arrival: "19:32",
            aircraft: "A321",
            base: "DFW"
        },

        {
            flightNumber: "VIA101",
            origin: "DFW",
            destination: "VPS",
            departure: "09:20",
            arrival: "11:15",
            aircraft: "A320",
            base: "DFW"
        },


        /* ====================================================
           DFW INBOUND
        ==================================================== */

        {
            flightNumber: "VIA1362",
            origin: "ATL",
            destination: "DFW",
            departure: "12:37",
            arrival: "14:02",
            aircraft: "A320",
            base: "DFW"
        },

        {
            flightNumber: "VIA1482",
            origin: "ATL",
            destination: "DFW",
            departure: "18:33",
            arrival: "19:58",
            aircraft: "A320",
            base: "DFW"
        },

        {
            flightNumber: "VIA124",
            origin: "BWI",
            destination: "DFW",
            departure: "11:20",
            arrival: "13:50",
            aircraft: "A321",
            base: "DFW"
        },

        {
            flightNumber: "VIA2286",
            origin: "CLT",
            destination: "DFW",
            departure: "13:55",
            arrival: "15:45",
            aircraft: "A320",
            base: "DFW"
        },

        {
            flightNumber: "VIA1844",
            origin: "CMH",
            destination: "DFW",
            departure: "22:13",
            arrival: "00:13",
            nextDay: true,
            aircraft: "A320",
            base: "DFW"
        },

        {
            flightNumber: "VIA1780",
            origin: "EYW",
            destination: "DFW",
            departure: "13:31",
            arrival: "15:41",
            aircraft: "A319",
            base: "DFW"
        },

        {
            flightNumber: "VIA120",
            origin: "FLL",
            destination: "DFW",
            departure: "09:32",
            arrival: "11:47",
            aircraft: "A320",
            base: "DFW"
        },
               {
            flightNumber: "VIA1540",
            origin: "JAX",
            destination: "DFW",
            departure: "15:19",
            arrival: "17:04",
            aircraft: "A320",
            base: "DFW"
        },

        {
            flightNumber: "VIA334",
            origin: "JFK",
            destination: "DFW",
            departure: "21:01",
            arrival: "23:51",
            aircraft: "A320",
            base: "DFW"
        },

        {
            flightNumber: "VIA2117",
            origin: "LAS",
            destination: "DFW",
            departure: "13:47",
            arrival: "18:27",
            aircraft: "A321",
            base: "DFW"
        },

        {
            flightNumber: "VIA1391",
            origin: "LAS",
            destination: "DFW",
            departure: "20:05",
            arrival: "00:55",
            nextDay: true,
            aircraft: "A320",
            base: "DFW"
        },

        {
            flightNumber: "VIA1777",
            origin: "LAX",
            destination: "DFW",
            departure: "08:25",
            arrival: "13:25",
            aircraft: "A321",
            base: "DFW"
        },

        {
            flightNumber: "VIA2025",
            origin: "LAX",
            destination: "DFW",
            departure: "16:13",
            arrival: "21:13",
            aircraft: "A320",
            base: "DFW"
        },

        {
            flightNumber: "VIA429",
            origin: "LAX",
            destination: "DFW",
            departure: "00:27",
            arrival: "05:27",
            aircraft: "A319",
            base: "DFW"
        },

        {
            flightNumber: "VIA1923",
            origin: "LGA",
            destination: "DFW",
            departure: "10:20",
            arrival: "13:10",
            aircraft: "A321",
            base: "DFW"
        },

        {
            flightNumber: "VIA2214",
            origin: "MIA",
            destination: "DFW",
            departure: "11:55",
            arrival: "14:10",
            aircraft: "A321",
            base: "DFW"
        },

        {
            flightNumber: "VIA1336",
            origin: "MIA",
            destination: "DFW",
            departure: "20:52",
            arrival: "23:07",
            aircraft: "A320",
            base: "DFW"
        },

        {
            flightNumber: "VIA2366",
            origin: "MCO",
            destination: "DFW",
            departure: "12:35",
            arrival: "14:30",
            aircraft: "A321",
            base: "DFW"
        },

        {
            flightNumber: "VIA2460",
            origin: "MCO",
            destination: "DFW",
            departure: "21:57",
            arrival: "23:52",
            aircraft: "A319",
            base: "DFW"
        },

        {
            flightNumber: "VIA1410",
            origin: "MKE",
            destination: "DFW",
            departure: "18:40",
            arrival: "21:15",
            aircraft: "A320",
            base: "DFW"
        },

        {
            flightNumber: "VIA1471",
            origin: "SEA",
            destination: "DFW",
            departure: "11:06",
            arrival: "16:51",
            aircraft: "A320",
            base: "DFW"
        },

        {
            flightNumber: "VIA1673",
            origin: "SEA",
            destination: "DFW",
            departure: "18:19",
            arrival: "00:04",
            nextDay: true,
            aircraft: "A320",
            base: "DFW"
        },

        {
            flightNumber: "VIA2223",
            origin: "SMF",
            destination: "DFW",
            departure: "06:00",
            arrival: "11:20",
            aircraft: "A321",
            base: "DFW"
        },

        {
            flightNumber: "VIA1181",
            origin: "SMF",
            destination: "DFW",
            departure: "10:17",
            arrival: "15:37",
            aircraft: "A319",
            base: "DFW"
        },

        {
            flightNumber: "VIA1745",
            origin: "SMF",
            destination: "DFW",
            departure: "18:34",
            arrival: "23:54",
            aircraft: "A320",
            base: "DFW"
        },

        {
            flightNumber: "VIA1242",
            origin: "SJU",
            destination: "DFW",
            departure: "11:40",
            arrival: "16:05",
            aircraft: "A321",
            base: "DFW"
        },

        {
            flightNumber: "VIA129",
            origin: "SNA",
            destination: "DFW",
            departure: "11:08",
            arrival: "16:03",
            aircraft: "A320",
            base: "DFW"
        },

        {
            flightNumber: "VIA1921",
            origin: "TUS",
            destination: "DFW",
            departure: "20:32",
            arrival: "23:47",
            aircraft: "A321",
            base: "DFW"
        },

        {
            flightNumber: "VIA102",
            origin: "VPS",
            destination: "DFW",
            departure: "12:15",
            arrival: "14:25",
            aircraft: "A320",
            base: "DFW"
        },


        /* ====================================================
           RSW OUTBOUND
        ==================================================== */

        {
            flightNumber: "VIA1670",
            origin: "RSW",
            destination: "ATL",
            departure: "06:00",
            arrival: "07:50",
            aircraft: "A321",
            base: "RSW"
        },

        {
            flightNumber: "VIA354",
            origin: "RSW",
            destination: "ATL",
            departure: "20:55",
            arrival: "22:45",
            aircraft: "A319",
            base: "RSW"
        },

        {
            flightNumber: "VIA543",
            origin: "RSW",
            destination: "BWI",
            departure: "06:02",
            arrival: "08:37",
            aircraft: "A321",
            base: "RSW"
        },

        {
            flightNumber: "VIA1783",
            origin: "RSW",
            destination: "CLT",
            departure: "06:33",
            arrival: "08:33",
            aircraft: "A320",
            base: "RSW"
        },

        {
            flightNumber: "VIA1587",
            origin: "RSW",
            destination: "CMH",
            departure: "07:27",
            arrival: "10:07",
            aircraft: "A320",
            base: "RSW"
        },

        {
            flightNumber: "VIA953",
            origin: "RSW",
            destination: "CTG",
            departure: "16:45",
            arrival: "18:50",
            aircraft: "A321",
            base: "RSW"
        },

        {
            flightNumber: "VIA1678",
            origin: "RSW",
            destination: "DFW",
            departure: "06:13",
            arrival: "08:13",
            aircraft: "A319",
            base: "RSW"
        },

        {
            flightNumber: "VIA2324",
            origin: "RSW",
            destination: "DFW",
            departure: "10:05",
            arrival: "12:05",
            aircraft: "A320",
            base: "RSW"
        },

        {
            flightNumber: "VIA2430",
            origin: "RSW",
            destination: "DFW",
            departure: "15:54",
            arrival: "17:54",
            aircraft: "A320",
            base: "RSW"
        },

        {
            flightNumber: "VIA114",
            origin: "RSW",
            destination: "DFW",
            departure: "22:19",
            arrival: "00:19",
            nextDay: true,
            aircraft: "A321",
            base: "RSW"
        },

        {
            flightNumber: "VIA299",
            origin: "RSW",
            destination: "JAX",
            departure: "07:50",
            arrival: "09:10",
            aircraft: "A320",
            base: "RSW"
        },

        {
            flightNumber: "VIA1015",
            origin: "RSW",
            destination: "JAX",
            departure: "19:53",
            arrival: "21:13",
            aircraft: "A319",
            base: "RSW"
        },

        {
            flightNumber: "VIA2313",
            origin: "RSW",
            destination: "JFK",
            departure: "11:10",
            arrival: "14:00",
            aircraft: "A320",
            base: "RSW"
        },

        {
            flightNumber: "VIA776",
            origin: "RSW",
            destination: "LAS",
            departure: "08:05",
            arrival: "10:50",
            aircraft: "A320",
            base: "RSW"
        },

        {
            flightNumber: "VIA2119",
            origin: "RSW",
            destination: "LGA",
            departure: "20:20",
            arrival: "23:10",
            aircraft: "A320",
            base: "RSW"
        },

        {
            flightNumber: "VIA2382",
            origin: "RSW",
            destination: "LIT",
            departure: "07:00",
            arrival: "08:35",
            aircraft: "A321",
            base: "RSW"
        },

        {
            flightNumber: "VIA1757",
            origin: "RSW",
            destination: "MDE",
            departure: "15:56",
            arrival: "18:36",
            aircraft: "A320",
            base: "RSW"
        },

        {
            flightNumber: "VIA1392",
                       origin: "RSW",
            destination: "MIA",
            departure: "08:05",
            arrival: "09:05",
            aircraft: "A320",
            base: "RSW"
        },

        {
            flightNumber: "VIA1676",
            origin: "RSW",
            destination: "MIA",
            departure: "17:20",
            arrival: "18:20",
            aircraft: "A319",
            base: "RSW"
        },

        {
            flightNumber: "VIA2317",
            origin: "RSW",
            destination: "MKE",
            departure: "08:50",
            arrival: "11:45",
            aircraft: "A320",
            base: "RSW"
        },

        {
            flightNumber: "VIA2421",
            origin: "RSW",
            destination: "PTY",
            departure: "06:30",
            arrival: "09:05",
            aircraft: "A321",
            base: "RSW"
        },

        {
            flightNumber: "VIA461",
            origin: "RSW",
            destination: "PUJ",
            departure: "11:40",
            arrival: "14:15",
            aircraft: "A320",
            base: "RSW"
        },

        {
            flightNumber: "VIA1851",
            origin: "RSW",
            destination: "SDQ",
            departure: "07:35",
            arrival: "10:10",
            aircraft: "A321",
            base: "RSW"
        },

        {
            flightNumber: "VIA1907",
            origin: "RSW",
            destination: "SJU",
            departure: "12:05",
            arrival: "14:40",
            aircraft: "A320",
            base: "RSW"
        },

        {
            flightNumber: "VIA2031",
            origin: "RSW",
            destination: "SXM",
            departure: "09:15",
            arrival: "12:15",
            aircraft: "A320",
            base: "RSW"
        },

        {
            flightNumber: "VIA111",
            origin: "RSW",
            destination: "VPS",
            departure: "06:45",
            arrival: "07:55",
            aircraft: "A319",
            base: "RSW"
        },


        /* ====================================================
           RSW INBOUND
        ==================================================== */

        {
            flightNumber: "VIA1671",
            origin: "ATL",
            destination: "RSW",
            departure: "08:50",
            arrival: "10:35",
            aircraft: "A321",
            base: "RSW"
        },

        {
            flightNumber: "VIA355",
            origin: "ATL",
            destination: "RSW",
            departure: "23:45",
            arrival: "01:30",
            nextDay: true,
            aircraft: "A319",
            base: "RSW"
        },

        {
            flightNumber: "VIA544",
            origin: "BWI",
            destination: "RSW",
            departure: "09:37",
            arrival: "12:17",
            aircraft: "A321",
            base: "RSW"
        },

        {
            flightNumber: "VIA1784",
            origin: "CLT",
            destination: "RSW",
            departure: "09:33",
            arrival: "11:33",
            aircraft: "A320",
            base: "RSW"
        },

        {
            flightNumber: "VIA1588",
            origin: "CMH",
            destination: "RSW",
            departure: "11:07",
            arrival: "13:47",
            aircraft: "A320",
            base: "RSW"
        },

        {
            flightNumber: "VIA954",
            origin: "CTG",
            destination: "RSW",
            departure: "19:50",
            arrival: "23:00",
            aircraft: "A321",
            base: "RSW"
        },

        {
            flightNumber: "VIA1679",
            origin: "DFW",
            destination: "RSW",
            departure: "09:13",
            arrival: "12:53",
            aircraft: "A319",
            base: "RSW"
        },

        {
            flightNumber: "VIA2325",
            origin: "DFW",
            destination: "RSW",
            departure: "13:05",
            arrival: "16:45",
            aircraft: "A320",
            base: "RSW"
        },

        {
            flightNumber: "VIA2431",
            origin: "DFW",
            destination: "RSW",
            departure: "18:54",
            arrival: "22:34",
            aircraft: "A320",
            base: "RSW"
        },

        {
            flightNumber: "VIA115",
            origin: "DFW",
            destination: "RSW",
            departure: "06:15",
            arrival: "09:55",
            aircraft: "A321",
            base: "RSW"
        },

        {
            flightNumber: "VIA300",
            origin: "JAX",
            destination: "RSW",
            departure: "10:10",
            arrival: "11:30",
            aircraft: "A320",
            base: "RSW"
        },

        {
            flightNumber: "VIA1016",
            origin: "JAX",
            destination: "RSW",
            departure: "22:13",
            arrival: "23:33",
            aircraft: "A319",
            base: "RSW"
        },

        {
            flightNumber: "VIA2314",
            origin: "JFK",
            destination: "RSW",
            departure: "15:00",
            arrival: "18:10",
            aircraft: "A320",
            base: "RSW"
        },

        {
            flightNumber: "VIA777",
            origin: "LAS",
            destination: "RSW",
            departure: "11:50",
            arrival: "19:05",
            aircraft: "A320",
            base: "RSW"
        },

        {
            flightNumber: "VIA2120",
            origin: "LGA",
            destination: "RSW",
            departure: "06:00",
            arrival: "09:10",
            aircraft: "A320",
            base: "RSW"
        },

        {
            flightNumber: "VIA2383",
            origin: "LIT",
            destination: "RSW",
            departure: "09:35",
            arrival: "12:55",
            aircraft: "A321",
            base: "RSW"
        },

        {
            flightNumber: "VIA1758",
            origin: "MDE",
            destination: "RSW",
            departure: "19:36",
            arrival: "23:16",
            aircraft: "A320",
            base: "RSW"
        },

        {
            flightNumber: "VIA1393",
            origin: "MIA",
            destination: "RSW",
            departure: "10:05",
            arrival: "11:05",
            aircraft: "A320",
            base: "RSW"
        },

        {
            flightNumber: "VIA1677",
            origin: "MIA",
            destination: "RSW",
            departure: "19:20",
            arrival: "20:20",
            aircraft: "A319",
            base: "RSW"
        },

        {
            flightNumber: "VIA2318",
            origin: "MKE",
            destination: "RSW",
            departure: "12:45",
            arrival: "16:00",
            aircraft: "A320",
            base: "RSW"
        },

        {
            flightNumber: "VIA2422",
            origin: "PTY",
            destination: "RSW",
            departure: "10:05",
            arrival: "14:40",
            aircraft: "A321",
            base: "RSW"
        },

        {
            flightNumber: "VIA462",
            origin: "PUJ",
            destination: "RSW",
            departure: "15:15",
            arrival: "18:05",
            aircraft: "A320",
            base: "RSW"
        },

        {
            flightNumber: "VIA1852",
            origin: "SDQ",
            destination: "RSW",
            departure: "11:10",
            arrival: "13:55",
            aircraft: "A321",
            base: "RSW"
        },

        {
            flightNumber: "VIA1908",
            origin: "SJU",
            destination: "RSW",
            departure: "15:40",
            arrival: "18:25",
            aircraft: "A320",
            base: "RSW"
        },

        {
            flightNumber: "VIA2032",
            origin: "SXM",
            destination: "RSW",
            departure: "13:15",
            arrival: "16:20",
            aircraft: "A320",
            base: "RSW"
        },

        {
            flightNumber: "VIA112",
            origin: "VPS",
            destination: "RSW",
            departure: "08:55",
            arrival: "10:05",
            aircraft: "A319",
            base: "RSW"
        },


        /* ====================================================
           SMF OUTBOUND
        ==================================================== */

        {
            flightNumber: "VIA1301",
            origin: "SMF",
            destination: "DFW",
            departure: "06:00",
            arrival: "11:20",
            aircraft: "A320",
            base: "SMF"
        },

        {
            flightNumber: "VIA1303",
            origin: "SMF",
            destination: "DFW",
            departure: "14:25",
            arrival: "19:45",
            aircraft: "A321",
            base: "SMF"
        },

        {
            flightNumber: "VIA1415",
            origin: "SMF",
            destination: "LAS",
            departure: "08:55",
            arrival: "10:20",
            aircraft: "A319",
            base: "SMF"
        },

        {
            flightNumber: "VIA1417",
            origin: "SMF",
            destination: "LAS",
            departure: "18:30",
            arrival: "19:55",
            aircraft: "A320",
            base: "SMF"
        },

        {
            flightNumber: "VIA1501",
            origin: "SMF",
            destination: "LAX",
            departure: "07:10",
            arrival: "08:35",
            aircraft: "A320",
            base: "SMF"
        },

        {
            flightNumber: "VIA1503",
            origin: "SMF",
            destination: "LAX",
            departure: "16:15",
            arrival: "17:40",
            aircraft: "A321",
            base: "SMF"
        },

        {
            flightNumber: "VIA1601",
            origin: "SMF",
            destination: "SEA",
            departure: "06:35",
            arrival: "08:25",
            aircraft: "A320",
            base: "SMF"
        },

        {
            flightNumber: "VIA1603",
            origin: "SMF",
            destination: "SEA",
            departure: "17:10",
            arrival: "19:00",
            aircraft: "A319",
            base: "SMF"
        },

        {
            flightNumber: "VIA1701",
            origin: "SMF",
            destination: "SNA",
            departure: "09:35",
            arrival: "11:05",
            aircraft: "A320",
            base: "SMF"
        },

        {
            flightNumber: "VIA1801",
            origin: "SMF",
            destination: "TUS",
            departure: "12:20",
            arrival: "14:15",
            aircraft: "A320",
            base: "SMF"
        },


        /* ====================================================
           SMF INBOUND
        ==================================================== */

        {
            flightNumber: "VIA1302",
            origin: "DFW",
            destination: "SMF",
            departure: "12:20",
            arrival: "14:15",
            aircraft: "A320",
            base: "SMF"
        },

        {
            flightNumber: "VIA1304",
            origin: "DFW",
            destination: "SMF",
            departure: "20:45",
            arrival: "22:40",
            aircraft: "A321",
            base: "SMF"
        },

        {
            flightNumber: "VIA1416",
            origin: "LAS",
            destination: "SMF",
            departure: "11:20",
            arrival: "12:45",
            aircraft: "A319",
            base: "SMF"
        },

        {
            flightNumber: "VIA1418",
            origin: "LAS",
            destination: "SMF",
            departure: "20:55",
            arrival: "22:20",
            aircraft: "A320",
            base: "SMF"
        },

        {
            flightNumber: "VIA1502",
            origin: "LAX",
            destination: "SMF",
            departure: "09:35",
            arrival: "11:00",
            aircraft: "A320",
            base: "SMF"
        },

        {
            flightNumber: "VIA1504",
            origin: "LAX",
            destination: "SMF",
            departure: "18:40",
            arrival: "20:05",
            aircraft: "A321",
            base: "SMF"
        },

        {
            flightNumber: "VIA1602",
            origin: "SEA",
            destination: "SMF",
            departure: "09:25",
            arrival: "11:15",
            aircraft: "A320",
            base: "SMF"
        },

        {
            flightNumber: "VIA1604",
            origin: "SEA",
            destination: "SMF",
            departure: "20:00",
            arrival: "21:50",
            aircraft: "A319",
            base: "SMF"
        },

        {
            flightNumber: "VIA1702",
            origin: "SNA",
            destination: "SMF",
            departure: "12:05",
            arrival: "13:35",
            aircraft: "A320",
            base: "SMF"
        },

        {
            flightNumber: "VIA1802",
            origin: "TUS",
            destination: "SMF",
            departure: "15:15",
            arrival: "17:10",
            aircraft: "A320",
            base: "SMF"
        },


        /* ====================================================
           NETWORK / CROSS-BASE FLIGHTS
        ==================================================== */

        {
            flightNumber: "VIA2201",
            origin: "LAX",
            destination: "SEA",
            departure: "09:05",
            arrival: "11:45",
            aircraft: "A320",
            base: "DFW"
        },

        {
            flightNumber: "VIA2202",
            origin: "SEA",
            destination: "LAX",
            departure: "12:45",
            arrival: "15:25",
            aircraft: "A320",
            base: "DFW"
        },

        {
            flightNumber: "VIA2203",
            origin: "LAS",
            destination: "SMF",
            departure: "08:55",
            arrival: "10:35",
            aircraft: "A320",
            base: "DFW"
        },

        {
            flightNumber: "VIA2204",
            origin: "SMF",
            destination: "LAS",
            departure: "11:35",
            arrival: "13:15",
            aircraft: "A320",
            base: "DFW"
        },

        {
            flightNumber: "VIA2205",
            origin: "VPS",
            destination: "RSW",
            departure: "12:05",
            arrival: "13:15",
            aircraft: "A320",
            base: "DFW"
        },

        {
            flightNumber: "VIA2206",
            origin: "RSW",
            destination: "VPS",
            departure: "14:15",
            arrival: "15:25",
            aircraft: "A320",
            base: "DFW"
        },

        {
            flightNumber: "VIA2207",
            origin: "RSW",
            destination: "CTG",
            departure: "16:25",
            arrival: "18:30",
            aircraft: "A320",
            base: "DFW"
        },

        {
            flightNumber: "VIA2208",
            origin: "CTG",
            destination: "RSW",
            departure: "19:30",
            arrival: "22:40",
            aircraft: "A320",
            base: "DFW"
        }

    ]

};


/* ============================================================
   BASIC SCHEDULE HELPERS
============================================================ */

/**
 * Return all scheduled flights.
 */
function getViaviaFlights() {

    return VIAVIA_SCHEDULE.flights.slice();

}


/**
 * Find one scheduled flight by flight number.
 */
function getViaviaFlight(flightNumber) {

    return (
        VIAVIA_SCHEDULE.flights.find(
            flight =>
                flight.flightNumber === flightNumber
        ) ||
        null
    );

}


/**
 * Get all flights departing an airport.
 */
function getViaviaFlightsFrom(airport) {

    return VIAVIA_SCHEDULE.flights.filter(
        flight =>
            flight.origin === airport
    );

}


/**
 * Get all flights arriving at an airport.
 */
function getViaviaFlightsTo(airport) {

    return VIAVIA_SCHEDULE.flights.filter(
        flight =>
            flight.destination === airport
    );

}


/**
 * Get all flights associated with one
 * Viavia pilot base.
 */
function getViaviaBaseFlights(base) {

    return VIAVIA_SCHEDULE.flights.filter(
        flight =>
            flight.base === base
    );

}


/**
 * Return a human-readable route.
 */
function getViaviaRoute(flight) {

    return (
        `${flight.origin} → ${flight.destination}`
    );

}


/**
 * Return a formatted flight display.
 */
function getViaviaFlightLabel(flight) {

    return (
        `${flight.flightNumber} · ` +
        `${flight.origin} → ${flight.destination}`
    );

}


/* ============================================================
   GATE ASSIGNMENT
============================================================ */

/**
 * Determine the current gate status.
 *
 * More than 12 hours before departure:
 *
 *     TBD — Gate assignment pending
 *
 * Within 12 hours:
 *
 *     assignedGate is displayed when supplied.
 */
function getViaviaGateStatus(
    departureDateTime,
    assignedGate = null
) {

    const now =
        new Date();

    const departure =
        new Date(
            departureDateTime
        );

    const hoursUntilDeparture =
        (
            departure.getTime() -
            now.getTime()
        ) /
        (
            1000 *
            60 *
            60
        );


    if (
        hoursUntilDeparture >
        VIAVIA_SCHEDULE
            .operations
            .gateAssignmentHours
    ) {

        return (
            VIAVIA_SCHEDULE
                .operations
                .gatePendingText
        );

    }


    return (
        assignedGate ||
        VIAVIA_SCHEDULE
            .operations
            .gatePendingText
    );

}


/* ============================================================
   MULTI-DAY CREW PAIRING ENGINE
============================================================ */

/*
 * Viavia crew-pairing rules
 *
 * - Every pairing begins at DFW, RSW, or SMF.
 * - Every pairing ultimately returns to its starting base.
 * - 1-day turns are permitted.
 * - 2-day and 3-day trips are the normal pairing structure.
 * - 4-day trips are permitted but intentionally less common.
 * - A normal duty contains no more than 2 flight legs.
 * - A pairing may pass through its home base without ending.
 * - Overnight stations are permitted.
 * - Only actual flights from VIAVIA_SCHEDULE may be used.
 * - Pairings are deterministic.
 *
 * SAME-DAY CONNECTION RULE
 *
 * A crew transferring from one scheduled flight to another
 * must have at least 50 minutes between the first arrival
 * and the second departure.
 *
 * Example:
 *
 * DFW → LAS
 * arrives 07:55
 *
 * LAS → SMF
 * departs 08:55
 *
 * Connection = 60 minutes
 * VALID.
 */


/**
 * Minimum Viavia same-day connection.
 */
const VIAVIA_MIN_CONNECTION_MINUTES = 50;


/**
 * Maximum same-day sit we will normally consider part
 * of the same duty period.
 *
 * Anything longer ends the duty day. The crew overnights
 * at that station and resumes on the next pairing day.
 */
const VIAVIA_MAX_SAME_DAY_CONNECTION_MINUTES =
    2 * 60;


/**
 * Minimum overnight/rest interval used by the pairing
 * builder between duty periods.
 *
 * This is a pairing-generation value for the virtual
 * airline system. It is separate from the same-day
 * 50-minute connection rule.
 */
const VIAVIA_MIN_OVERNIGHT_MINUTES =
    9 * 60;


/**
 * Maximum number of pairing days.
 */
const VIAVIA_MAX_PAIRING_DAYS = 4;


/**
 * Normal maximum legs per duty day.
 *
 * Normal Viavia duty periods use no more than 2 legs.
 * A single long leg may form the entire duty day.
 */
const VIAVIA_MAX_LEGS_PER_DAY = 2;


/**
 * Maximum elapsed duty span from the first scheduled
 * departure to the final scheduled arrival on one pairing day.
 *
 * This is intentionally capped at 12 hours. The two-hour
 * connection limit normally keeps duties comfortably shorter.
 */
const VIAVIA_MAX_DUTY_MINUTES =
    12 * 60;


/**
 * Convert HH:MM into minutes after midnight.
 */
function getViaviaTimeMinutes(time) {

    if (
        typeof time !== "string" ||
        !time.includes(":")
    ) {

        return null;

    }


    const parts =
        time.split(":");


    const hours =
        Number(
            parts[0]
        );

    const minutes =
        Number(
            parts[1]
        );


    if (
        !Number.isFinite(hours) ||
        !Number.isFinite(minutes)
    ) {

        return null;

    }


    return (
        (hours * 60) +
        minutes
    );

}


/**
 * Return the scheduled duration of one flight in minutes.
 *
 * This works with the schedule's local clock values.
 * If arrival is earlier than departure, or nextDay is true,
 * the arrival is moved into the following calendar day.
 */
function getViaviaFlightDurationMinutes(flight) {

    if (!flight) {
        return null;
    }


    const departure =
        getViaviaTimeMinutes(
            flight.departure
        );

    let arrival =
        getViaviaTimeMinutes(
            flight.arrival
        );


    if (
        departure === null ||
        arrival === null
    ) {

        return null;

    }


    if (
        flight.nextDay ||
        arrival < departure
    ) {

        arrival +=
            24 * 60;

    }


    return (
        arrival -
        departure
    );

}


/**
 * Get an arrival time expressed in minutes relative
 * to the flight's departure calendar day.
 */
function getViaviaArrivalMinutes(flight) {

    if (!flight) {
        return null;
    }


    const departure =
        getViaviaTimeMinutes(
            flight.departure
        );

    let arrival =
        getViaviaTimeMinutes(
            flight.arrival
        );


    if (
        departure === null ||
        arrival === null
    ) {

        return null;

    }


    if (
        flight.nextDay ||
        arrival < departure
    ) {

        arrival +=
            24 * 60;

    }


    return arrival;

}


/**
 * Calculate the same-day connection between two flights.
 *
 * Returns null when the airports do not connect.
 *
 * This helper assumes both flight departures belong to the
 * same pairing calendar day. Overnight movement is handled
 * separately by the multi-day pairing builder.
 */
function getViaviaConnectionMinutes(
    firstFlight,
    secondFlight
) {

    if (
        !firstFlight ||
        !secondFlight ||
        firstFlight.destination !==
            secondFlight.origin
    ) {

        return null;

    }


    const arrival =
        getViaviaArrivalMinutes(
            firstFlight
        );

    let nextDeparture =
        getViaviaTimeMinutes(
            secondFlight.departure
        );


    if (
        arrival === null ||
        nextDeparture === null
    ) {

        return null;

    }


    /*
     * If the first flight itself arrived after midnight,
     * its arrival value is already above 1440.
     *
     * Move the second departure into that same relative
     * calendar day before calculating the connection.
     */

    if (
        arrival >= (24 * 60)
    ) {

        nextDeparture +=
            24 * 60;

    }


    return (
        nextDeparture -
        arrival
    );

}


/**
 * Test whether two flights form a valid SAME-DAY
 * Viavia crew connection.
 */
function isViaviaValidConnection(
    firstFlight,
    secondFlight
) {

    const connection =
        getViaviaConnectionMinutes(
            firstFlight,
            secondFlight
        );


    if (
        connection === null
    ) {

        return false;

    }


    return (
        connection >=
            VIAVIA_MIN_CONNECTION_MINUTES &&
        connection <=
            VIAVIA_MAX_SAME_DAY_CONNECTION_MINUTES
    );

}


/**
 * Clone a schedule flight for use inside a pairing.
 *
 * Pairing-specific properties are added to the cloned
 * object rather than modifying the master schedule.
 */
function cloneViaviaPairingFlight(
    flight,
    pairingDay
) {

    return {

        ...flight,

        pairingDay:
            pairingDay,

        day:
            pairingDay

    };

}


/**
 * Build a route string from pairing flights.
 */
function buildViaviaPairingRoute(
    flights
) {

    if (
        !Array.isArray(flights) ||
        flights.length === 0
    ) {

        return "";

    }


    const airports = [
        flights[0].origin
    ];


    flights.forEach(
        flight => {

            airports.push(
                flight.destination
            );

        }
    );


    return (
        airports.join(
            " → "
        )
    );

}


/**
 * Group pairing flights by duty / pairing day.
 */
function buildViaviaPairingDays(
    flights
) {

    const days = [];


    flights.forEach(
        flight => {

            const dayNumber =
                Number(
                    flight.pairingDay ||
                    flight.day ||
                    1
                );


            let day =
                days.find(
                    item =>
                        item.day ===
                        dayNumber
                );


            if (!day) {

                day = {

                    day:
                        dayNumber,

                    flights:
                        [],

                    startAirport:
                        flight.origin,

                    endAirport:
                        flight.destination

                };


                days.push(
                    day
                );

            }


            day.flights.push(
                flight
            );


            day.endAirport =
                flight.destination;

        }
    );


    days.sort(
        (a, b) =>
            a.day - b.day
    );


    days.forEach(
        day => {

            day.flightNumbers =
                day.flights.map(
                    flight =>
                        flight.flightNumber
                );


            day.route =
                buildViaviaPairingRoute(
                    day.flights
                );

        }
    );


    return days;

}


/**
 * Return the overnight stations for a pairing.
 *
 * A 3-day trip has two overnight stations.
 * A 4-day trip has three.
 */
function getViaviaPairingOvernights(
    pairingDays
) {

    if (
        !Array.isArray(pairingDays) ||
        pairingDays.length <= 1
    ) {

        return [];

    }


    return pairingDays
        .slice(
            0,
            -1
        )
        .map(
            day =>
                day.endAirport
        );

}


/**
 * Create the standardized pairing object consumed by
 * Available Trips, My Trips, Crew Calendar, Flight Planning,
 * and the rest of Viavia Operations.
 */
function createViaviaPairing(
    pairingId,
    base,
    flights
) {

    if (
        !Array.isArray(flights) ||
        flights.length === 0
    ) {

        return null;

    }


    const normalizedFlights =
        flights.map(
            flight => {

                if (
                    Number.isFinite(
                        Number(
                            flight.pairingDay
                        )
                    )
                ) {

                    return {
                        ...flight
                    };

                }


                return (
                    cloneViaviaPairingFlight(
                        flight,
                        1
                    )
                );

            }
        );


    const firstFlight =
        normalizedFlights[0];

    const lastFlight =
        normalizedFlights[
            normalizedFlights.length - 1
        ];


    const pairingDays =
        buildViaviaPairingDays(
            normalizedFlights
        );


    const overnights =
        getViaviaPairingOvernights(
            pairingDays
        );


    return {

        pairingId:
            pairingId,

        base:
            base,

        flights:
            normalizedFlights,

        flightNumbers:
            normalizedFlights.map(
                flight =>
                    flight.flightNumber
            ),

        legs:
            normalizedFlights.length,

        days:
            pairingDays.length,

        tripLength:
            pairingDays.length,

        dutyDays:
            pairingDays,

        overnights:
            overnights,

        route:
            buildViaviaPairingRoute(
                normalizedFlights
            ),

        aircraft:
            [
                ...new Set(
                    normalizedFlights
                        .map(
                            flight =>
                                flight.aircraft
                        )
                        .filter(
                            Boolean
                        )
                )
            ],

        startAirport:
            firstFlight.origin,

        endAirport:
            lastFlight.destination,

        closed:
            (
                firstFlight.origin ===
                lastFlight.destination
            ),

        gateStatus:
            VIAVIA_SCHEDULE
                .operations
                .gatePendingText

    };

}


/* ============================================================
   PAIRING GENERATOR INTERNAL HELPERS
============================================================ */

/**
 * Stable string hash.
 *
 * This gives us deterministic choices without Math.random().
 * The same schedule produces the same pairing set every time.
 */
function getViaviaStableHash(value) {

    const text =
        String(
            value || ""
        );


    let hash =
        2166136261;


    for (
        let index = 0;
        index < text.length;
        index++
    ) {

        hash ^=
            text.charCodeAt(
                index
            );


        hash =
            Math.imul(
                hash,
                16777619
            );

    }


    return (
        hash >>> 0
    );

}


/**
 * Stable sort helper used throughout pairing generation.
 */
function sortViaviaFlightsStable(
    flights
) {

    return flights
        .slice()
        .sort(
            (a, b) => {

                const aTime =
                    getViaviaTimeMinutes(
                        a.departure
                    ) ?? 0;

                const bTime =
                    getViaviaTimeMinutes(
                        b.departure
                    ) ?? 0;


                if (
                    aTime !==
                    bTime
                ) {

                    return (
                        aTime -
                        bTime
                    );

                }


                return (
                    String(
                        a.flightNumber
                    )
                        .localeCompare(
                            String(
                                b.flightNumber
                            ),
                            undefined,
                            {
                                numeric: true
                            }
                        )
                );

            }
        );

}


/**
 * Return all scheduled departures from an airport.
 */
function getViaviaPairingDepartures(
    airport
) {

    return (
        sortViaviaFlightsStable(
            VIAVIA_SCHEDULE
                .flights
                .filter(
                    flight =>
                        flight.origin ===
                        airport
                )
        )
    );

}


/**
 * Return a stable candidate score.
 *
 * Lower values are preferred.
 */
function getViaviaCandidateScore(
    flight,
    seed
) {

    return (
        getViaviaStableHash(
            [
                seed,
                flight.flightNumber,
                flight.origin,
                flight.destination,
                flight.departure
            ].join("|")
        )
    );

}


/**
 * Stable deterministic candidate ordering.
 */
function orderViaviaCandidates(
    flights,
    seed
) {

    return flights
        .slice()
        .sort(
            (a, b) => {

                const aScore =
                    getViaviaCandidateScore(
                        a,
                        seed
                    );

                const bScore =
                    getViaviaCandidateScore(
                        b,
                        seed
                    );


                if (
                    aScore !==
                    bScore
                ) {

                    return (
                        aScore -
                        bScore
                    );

                }


                return (
                    String(
                        a.flightNumber
                    )
                        .localeCompare(
                            String(
                                b.flightNumber
                            ),
                            undefined,
                            {
                                numeric: true
                            }
                        )
                );

            }
        );

}


/**
 * Check whether a flight number already exists in a
 * partially constructed pairing.
 */
function viaviaPairingContainsFlight(
    flights,
    candidate
) {

    return flights.some(
        flight =>
            flight.flightNumber ===
            candidate.flightNumber
    );

}


/**
 * Return the final airport of a partial pairing.
 */
function getViaviaPartialEndAirport(
    flights,
    base
) {

    if (
        !Array.isArray(flights) ||
        flights.length === 0
    ) {

        return base;

    }


    return (
        flights[
            flights.length - 1
        ].destination
    );

}


/**
 * Count how many legs are assigned to a particular day.
 */
function countViaviaDayLegs(
    flights,
    day
) {

    return flights.filter(
        flight =>
            Number(
                flight.pairingDay
            ) ===
            Number(
                day
            )
    ).length;

}


/**
 * Return the last flight flown on one pairing day.
 */
function getViaviaLastFlightForDay(
    flights,
    day
) {

    const dayFlights =
        flights.filter(
            flight =>
                Number(
                    flight.pairingDay
                ) ===
                Number(
                    day
                )
        );


    if (
        dayFlights.length === 0
    ) {

        return null;

    }


    return (
        dayFlights[
            dayFlights.length - 1
        ]
    );

}


/**
 * Return true if a candidate may follow the previous flight
 * during the SAME duty day.
 */
function getViaviaDutySpanWithCandidate(
    currentFlights,
    candidate,
    day
) {

    const dayFlights =
        currentFlights.filter(
            flight =>
                Number(
                    flight.pairingDay
                ) ===
                Number(
                    day
                )
        );


    const firstFlight =
        dayFlights[0] ||
        candidate;


    const dutyStart =
        getViaviaTimeMinutes(
            firstFlight.departure
        );

    let dutyEnd =
        getViaviaArrivalMinutes(
            candidate
        );


    if (
        dutyStart === null ||
        dutyEnd === null
    ) {

        return null;

    }


    /*
     * If the candidate arrives after midnight,
     * getViaviaArrivalMinutes already returns a value
     * greater than 1440.
     */
    if (
        dutyEnd < dutyStart
    ) {

        dutyEnd +=
            24 * 60;

    }


    return (
        dutyEnd -
        dutyStart
    );

}


/**
 * Return true if a candidate may follow the previous flight
 * during the SAME duty day.
 */
function canViaviaAddSameDayFlight(
    currentFlights,
    candidate,
    day
) {

    if (
        !candidate ||
        viaviaPairingContainsFlight(
            currentFlights,
            candidate
        )
    ) {

        return false;

    }


    if (
        countViaviaDayLegs(
            currentFlights,
            day
        ) >=
        VIAVIA_MAX_LEGS_PER_DAY
    ) {

        return false;

    }


    const previous =
        getViaviaLastFlightForDay(
            currentFlights,
            day
        );


    if (!previous) {

        return true;

    }


    if (
        previous.destination !==
        candidate.origin
    ) {

        return false;

    }


    const dutySpan =
        getViaviaDutySpanWithCandidate(
            currentFlights,
            candidate,
            day
        );


    if (
        dutySpan === null ||
        dutySpan >
            VIAVIA_MAX_DUTY_MINUTES
    ) {

        return false;

    }


    return (
        isViaviaValidConnection(
            previous,
            candidate
        )
    );

}
/**
 * Determine whether a candidate flight can begin a NEW
 * pairing duty day from the airport where the previous
 * duty ended.
 *
 * The schedule stores recurring local flight times rather
 * than dated timestamps, so an overnight connection is
 * represented by advancing the candidate departure to the
 * following calendar day.
 */
function canViaviaBeginNextDutyDay(
    currentFlights,
    candidate,
    currentDay
) {

    if (
        !candidate ||
        viaviaPairingContainsFlight(
            currentFlights,
            candidate
        )
    ) {

        return false;

    }


    const previous =
        getViaviaLastFlightForDay(
            currentFlights,
            currentDay
        );


    if (!previous) {

        return false;

    }


    if (
        previous.destination !==
        candidate.origin
    ) {

        return false;

    }


    const previousArrival =
        getViaviaArrivalMinutes(
            previous
        );

    const candidateDeparture =
        getViaviaTimeMinutes(
            candidate.departure
        );


    if (
        previousArrival === null ||
        candidateDeparture === null
    ) {

        return false;

    }


    /*
     * Candidate departure occurs on the following pairing
     * calendar day.
     */
    let restMinutes =
        (
            (24 * 60) +
            candidateDeparture
        ) -
        previousArrival;


    /*
     * A flight that arrived after midnight has an arrival
     * value above 1440. In that case, advance the next
     * departure by another day if necessary.
     */
    if (
        restMinutes < 0
    ) {

        restMinutes +=
            24 * 60;

    }


    return (
        restMinutes >=
        VIAVIA_MIN_OVERNIGHT_MINUTES
    );

}


/**
 * Find valid same-day continuation flights from the
 * current airport.
 */
function getViaviaSameDayCandidates(
    currentFlights,
    day,
    seed
) {

    const airport =
        getViaviaPartialEndAirport(
            currentFlights,
            null
        );


    if (!airport) {

        return [];

    }


    const departures =
        getViaviaPairingDepartures(
            airport
        )
        .filter(
            candidate =>
                canViaviaAddSameDayFlight(
                    currentFlights,
                    candidate,
                    day
                )
        );


    return (
        orderViaviaCandidates(
            departures,
            seed
        )
    );

}


/**
 * Find flights that can begin the next duty day from the
 * current overnight station.
 */
function getViaviaNextDayCandidates(
    currentFlights,
    currentDay,
    seed
) {

    const airport =
        getViaviaPartialEndAirport(
            currentFlights,
            null
        );


    if (!airport) {

        return [];

    }


    const departures =
        getViaviaPairingDepartures(
            airport
        )
        .filter(
            candidate =>
                canViaviaBeginNextDutyDay(
                    currentFlights,
                    candidate,
                    currentDay
                )
        );


    return (
        orderViaviaCandidates(
            departures,
            seed
        )
    );

}


/**
 * Return true when a partial pairing has returned to its
 * starting pilot base.
 */
function isViaviaPairingBackAtBase(
    flights,
    base
) {

    if (
        !Array.isArray(flights) ||
        flights.length === 0
    ) {

        return false;

    }


    return (
        flights[
            flights.length - 1
        ].destination ===
        base
    );

}


/**
 * Count the number of distinct pairing days represented
 * by a partial pairing.
 */
function getViaviaPartialDayCount(
    flights
) {

    if (
        !Array.isArray(flights) ||
        flights.length === 0
    ) {

        return 0;

    }


    return (
        Math.max(
            ...flights.map(
                flight =>
                    Number(
                        flight.pairingDay ||
                        1
                    )
            )
        )
    );

}


/**
 * Determine the minimum number of legs we expect for a
 * pairing of a particular length.
 *
 * This keeps multi-day pairings from becoming little more
 * than a single outbound flight, a long layover, and a
 * return flight several days later.
 */
function getViaviaMinimumLegsForDays(
    days
) {

    switch (
        Number(
            days
        )
    ) {

        case 1:
            return 2;

        case 2:
            return 2;

        case 3:
            return 3;

        case 4:
            return 4;

        default:
            return 2;

    }

}


/**
 * Check whether a completed partial pairing is suitable
 * for inclusion in the final pairing catalog.
 */
function isViaviaCompletePairing(
    flights,
    base,
    targetDays
) {

    if (
        !Array.isArray(flights) ||
        flights.length === 0
    ) {

        return false;

    }


    if (
        !isViaviaPairingBackAtBase(
            flights,
            base
        )
    ) {

        return false;

    }


    const days =
        getViaviaPartialDayCount(
            flights
        );


    if (
        days !==
        targetDays
    ) {

        return false;

    }


    if (
        flights.length <
        getViaviaMinimumLegsForDays(
            targetDays
        )
    ) {

        return false;

    }


    /*
     * Every pairing must physically begin at its pilot base.
     */
    if (
        flights[0].origin !==
        base
    ) {

        return false;

    }


    /*
     * And ultimately return to that same base.
     */
    if (
        flights[
            flights.length - 1
        ].destination !==
        base
    ) {

        return false;

    }


    return true;

}


/**
 * Create a unique signature for a pairing's exact sequence.
 */
function getViaviaPairingSignature(
    flights
) {

    return flights
        .map(
            flight =>
                (
                    `${flight.pairingDay}:` +
                    `${flight.flightNumber}`
                )
        )
        .join("|");

}


/**
 * Search recursively for a valid pairing.
 *
 * The search is intentionally bounded:
 *
 * - maximum 4 duty days
 * - maximum 2 legs per duty day
 * - maximum 8 total legs
 *
 * Candidates are deterministically ordered, so the same
 * schedule always produces the same pairings.
 */
function searchViaviaPairing(
    state,
    options
) {

    const {
        base,
        targetDays,
        seed,
        maximumTripLegs
    } = options;


    const flights =
        state.flights;


    const currentDay =
        state.currentDay;


    if (
        flights.length >
        maximumTripLegs
    ) {

        return null;

    }


    /*
     * Do not accept an early return to base unless this is
     * the target final day.
     *
     * Passing through base during a duty is still allowed
     * because the search can continue with another valid
     * same-day flight.
     */
    if (
        isViaviaCompletePairing(
            flights,
            base,
            targetDays
        )
    ) {

        return flights;

    }


    /*
     * If we are already on the target final day, only
     * same-day continuation can finish the trip.
     */
    const sameDayCandidates =
        getViaviaSameDayCandidates(
            flights,
            currentDay,
            `${seed}|DAY${currentDay}|SAME`
        );


    for (
        const candidate of
        sameDayCandidates
    ) {

        const nextFlights = [
            ...flights,
            cloneViaviaPairingFlight(
                candidate,
                currentDay
            )
        ];


        /*
         * Returning to base before the target day does not
         * automatically terminate the pairing. We permit
         * another same-day departure from base, which allows
         * realistic sequences such as:
         *
         * SEA → DFW → VPS
         */
        if (
            currentDay <
            targetDays &&
            isViaviaPairingBackAtBase(
                nextFlights,
                base
            )
        ) {

            const continuation =
                getViaviaSameDayCandidates(
                    nextFlights,
                    currentDay,
                    `${seed}|BASEPASS|${candidate.flightNumber}`
                );


            if (
                continuation.length === 0
            ) {

                continue;

            }

        }


        const result =
            searchViaviaPairing(
                {
                    flights:
                        nextFlights,

                    currentDay:
                        currentDay
                },
                options
            );


        if (result) {

            return result;

        }

    }


    /*
     * No more same-day flying is required. If there are
     * remaining pairing days, attempt an overnight and begin
     * a new duty the following day.
     */
    if (
        currentDay <
        targetDays
    ) {

        /*
         * We do not deliberately overnight at the home base.
         * If a duty returns to base before the trip's final
         * day, the pairing should continue from base during
         * that same duty instead.
         */
        if (
            isViaviaPairingBackAtBase(
                flights,
                base
            )
        ) {

            return null;

        }


        const nextDayCandidates =
            getViaviaNextDayCandidates(
                flights,
                currentDay,
                `${seed}|DAY${currentDay + 1}|START`
            );


        for (
            const candidate of
            nextDayCandidates
        ) {

            const nextFlights = [
                ...flights,
                cloneViaviaPairingFlight(
                    candidate,
                    currentDay + 1
                )
            ];


            const result =
                searchViaviaPairing(
                    {
                        flights:
                            nextFlights,

                        currentDay:
                            currentDay + 1
                    },
                    options
                );


            if (result) {

                return result;

            }

        }

    }


    return null;

}


/**
 * Build one deterministic multi-day pairing from a specific
 * base departure.
 */
function buildViaviaMultiDayPairing(
    firstFlight,
    base,
    targetDays,
    seed
) {

    if (
        !firstFlight ||
        firstFlight.origin !==
        base
    ) {

        return null;

    }


    if (
        targetDays < 2 ||
        targetDays >
        VIAVIA_MAX_PAIRING_DAYS
    ) {

        return null;

    }


    const initialFlights = [
        cloneViaviaPairingFlight(
            firstFlight,
            1
        )
    ];


    return (
        searchViaviaPairing(
            {
                flights:
                    initialFlights,

                currentDay:
                    1
            },
            {
                base:
                    base,

                targetDays:
                    targetDays,

                seed:
                    seed,

                maximumTripLegs:
                    8
            }
        )
    );

}


/**
 * Build a traditional one-day closed turn.
 *
 * The outbound flight must leave the pilot base and the
 * return flight must depart the destination at least
 * 50 minutes after arrival.
 */
function buildViaviaOneDayTurn(
    outbound,
    base,
    seed
) {

    if (
        !outbound ||
        outbound.origin !==
        base
    ) {

        return null;

    }


    const returnCandidates =
        orderViaviaCandidates(
            getViaviaPairingDepartures(
                outbound.destination
            )
            .filter(
                candidate =>
                    candidate.destination ===
                        base &&
                    candidate.flightNumber !==
                        outbound.flightNumber &&
                    isViaviaValidConnection(
                        outbound,
                        candidate
                    )
            ),
            `${seed}|RETURN`
        );


    if (
        returnCandidates.length === 0
    ) {

        return null;

    }


    return [
        cloneViaviaPairingFlight(
            outbound,
            1
        ),

        cloneViaviaPairingFlight(
            returnCandidates[0],
            1
        )
    ];

}


/* ============================================================
   PAIRING DISTRIBUTION
============================================================ */

/**
 * Desired pairing-length mix.
 *
 * 2-day and 3-day trips are the normal Viavia pairing.
 * 4-day trips exist but are deliberately less common.
 * A smaller collection of one-day turns remains available.
 */
const VIAVIA_PAIRING_DISTRIBUTION = Object.freeze({

    DFW: Object.freeze({
        oneDay: 6,
        twoDay: 8,
        threeDay: 20,
        fourDay: 5
    }),

    RSW: Object.freeze({
        oneDay: 5,
        twoDay: 6,
        threeDay: 13,
        fourDay: 3
    }),

    SMF: Object.freeze({
        oneDay: 3,
        twoDay: 4,
        threeDay: 8,
        fourDay: 1
    })

});


/**
 * Return the target count for a particular base and
 * pairing length.
 */
function getViaviaPairingTargetCount(
    base,
    days
) {

    const distribution =
        VIAVIA_PAIRING_DISTRIBUTION[
            base
        ];


    if (!distribution) {

        return 0;

    }


    switch (
        Number(
            days
        )
    ) {

        case 1:
            return distribution.oneDay;

        case 2:
            return distribution.twoDay;

        case 3:
            return distribution.threeDay;

        case 4:
            return distribution.fourDay;

        default:
            return 0;

    }

}


/**
 * Produce a deterministic list of outbound flights from
 * a pilot base for pairing construction.
 */
function getViaviaBasePairingStarts(
    base,
    seed
) {

    const flights =
        VIAVIA_SCHEDULE
            .flights
            .filter(
                flight =>
                    flight.origin ===
                    base
            );


    return (
        orderViaviaCandidates(
            flights,
            seed
        )
    );

}


/**
 * Attempt to build the requested number of pairings for
 * one base / trip-length combination.
 */
function generateViaviaPairingsForLength(
    base,
    targetDays,
    targetCount,
    existingSignatures
) {

    const results = [];


    if (
        targetCount <= 0
    ) {

        return results;

    }


    const starts =
        getViaviaBasePairingStarts(
            base,
            `${base}|${targetDays}|STARTS`
        );


    /*
     * We make several deterministic passes using different
     * seeds. This allows multiple valid pairings to originate
     * with the same flight while still producing different
     * downstream sequences.
     */
    const maximumPasses =
        18;


    for (
        let pass = 0;
        pass < maximumPasses;
        pass++
    ) {

        if (
            results.length >=
            targetCount
        ) {

            break;

        }


        const orderedStarts =
            orderViaviaCandidates(
                starts,
                `${base}|${targetDays}|PASS${pass}`
            );


        for (
            const firstFlight of
            orderedStarts
        ) {

            if (
                results.length >=
                targetCount
            ) {

                break;

            }


            let flights = null;


            if (
                targetDays === 1
            ) {

                flights =
                    buildViaviaOneDayTurn(
                        firstFlight,
                        base,
                        `${base}|1|${pass}|${firstFlight.flightNumber}`
                    );

            } else {

                flights =
                    buildViaviaMultiDayPairing(
                        firstFlight,
                        base,
                        targetDays,
                        `${base}|${targetDays}|${pass}|${firstFlight.flightNumber}`
                    );

            }


            if (
                !flights ||
                !isViaviaCompletePairing(
                    flights,
                    base,
                    targetDays
                )
            ) {

                continue;

            }


            const signature =
                getViaviaPairingSignature(
                    flights
                );


            if (
                existingSignatures.has(
                    signature
                )
            ) {

                continue;

            }


            existingSignatures.add(
                signature
            );


            results.push({
                base:
                    base,

                days:
                    targetDays,

                flights:
                    flights
            });

        }

    }


    return results;

}
/* ============================================================
   MASTER PAIRING GENERATOR
============================================================ */

/**
 * Generate the complete Viavia pairing catalog.
 *
 * Default:
 * - DFW / RSW / SMF
 * - up to 4 days
 * - deterministic
 *
 * The legacy maxLegs option is intentionally ignored.
 * Multi-day consumers should use maxDays.
 */
function generateViaviaPairings(options = {}) {

    const requestedBases =
        Array.isArray(
            options.bases
        ) &&
        options.bases.length > 0
            ? options.bases
            : VIAVIA_SCHEDULE
                .airline
                .pilotBases;


    const maximumDays =
        Math.min(
            Math.max(
                Number(
                    options.maxDays ||
                    VIAVIA_MAX_PAIRING_DAYS
                ),
                1
            ),
            VIAVIA_MAX_PAIRING_DAYS
        );


    const generated = [];

    const signatures =
        new Set();


    requestedBases.forEach(
        base => {

            for (
                let days = 1;
                days <= maximumDays;
                days++
            ) {

                const targetCount =
                    getViaviaPairingTargetCount(
                        base,
                        days
                    );


                const pairings =
                    generateViaviaPairingsForLength(
                        base,
                        days,
                        targetCount,
                        signatures
                    );


                pairings.forEach(
                    pairing => {

                        generated.push(
                            pairing
                        );

                    }
                );

            }

        }
    );


    /*
     * --------------------------------------------------------
     * TRIP-001
     * --------------------------------------------------------
     *
     * TRIP-001 is intentionally fixed as the original
     * RSW → MDE → RSW turn.
     *
     * This preserves compatibility with existing Viavia
     * trip assignments and previously tested backend data.
     */
    const via1757 =
        getViaviaFlight(
            "VIA1757"
        );

    const via1758 =
        getViaviaFlight(
            "VIA1758"
        );


    const fixedTrip001Flights =
        (
            via1757 &&
            via1758 &&
            isViaviaValidConnection(
                via1757,
                via1758
            )
        )
            ? [
                cloneViaviaPairingFlight(
                    via1757,
                    1
                ),

                cloneViaviaPairingFlight(
                    via1758,
                    1
                )
            ]
            : null;


    if (
        fixedTrip001Flights
    ) {

        const fixedSignature =
            getViaviaPairingSignature(
                fixedTrip001Flights
            );


        /*
         * Remove an automatically generated duplicate of the
         * fixed RSW-MDE-RSW sequence if one exists.
         */
        const duplicateIndex =
            generated.findIndex(
                item =>
                    getViaviaPairingSignature(
                        item.flights
                    ) ===
                    fixedSignature
            );


        if (
            duplicateIndex !== -1
        ) {

            generated.splice(
                duplicateIndex,
                1
            );

        }


        generated.unshift({

            base:
                "RSW",

            days:
                1,

            flights:
                fixedTrip001Flights

        });

    }


    /*
     * Stable final ordering:
     *
     * 1. TRIP-001 fixed RSW-MDE-RSW
     * 2. Remaining pairings by base
     * 3. Shorter trips before longer trips
     * 4. Stable route / flight-number ordering
     */
    const first =
        generated.length > 0
            ? generated[0]
            : null;


    const remainder =
        generated
            .slice(
                first ? 1 : 0
            )
            .sort(
                (a, b) => {

                    const baseOrder = {
                        DFW: 1,
                        RSW: 2,
                        SMF: 3
                    };


                    const aBase =
                        baseOrder[
                            a.base
                        ] || 99;

                    const bBase =
                        baseOrder[
                            b.base
                        ] || 99;


                    if (
                        aBase !==
                        bBase
                    ) {

                        return (
                            aBase -
                            bBase
                        );

                    }


                    if (
                        a.days !==
                        b.days
                    ) {

                        return (
                            a.days -
                            b.days
                        );

                    }


                    return (
                        getViaviaPairingSignature(
                            a.flights
                        )
                        .localeCompare(
                            getViaviaPairingSignature(
                                b.flights
                            ),
                            undefined,
                            {
                                numeric: true
                            }
                        )
                    );

                }
            );


    const ordered =
        first
            ? [
                first,
                ...remainder
            ]
            : remainder;


    return (
        ordered
            .map(
                (
                    item,
                    index
                ) => {

                    const pairingId =
                        `TRIP-${String(
                            index + 1
                        ).padStart(
                            3,
                            "0"
                        )}`;


                    return (
                        createViaviaPairing(
                            pairingId,
                            item.base,
                            item.flights
                        )
                    );

                }
            )
            .filter(
                Boolean
            )
    );

}


/* ============================================================
   PAIRING LOOKUP HELPERS
============================================================ */

/**
 * Find a pairing by its Viavia trip ID.
 */
function getViaviaPairing(
    pairingId,
    options = {}
) {

    const normalized =
        String(
            pairingId ||
            ""
        )
        .trim()
        .toUpperCase();


    if (!normalized) {

        return null;

    }


    return (
        generateViaviaPairings(
            options
        )
        .find(
            pairing =>
                pairing.pairingId ===
                normalized
        ) ||
        null
    );

}


/**
 * Return pairings for one pilot base.
 */
function getViaviaPairingsForBase(
    base,
    options = {}
) {

    const normalizedBase =
        String(
            base ||
            ""
        )
        .trim()
        .toUpperCase();


    return (
        generateViaviaPairings(
            options
        )
        .filter(
            pairing =>
                pairing.base ===
                normalizedBase
        )
    );

}


/**
 * Return pairings of a particular duration.
 */
function getViaviaPairingsByDays(
    days,
    options = {}
) {

    const normalizedDays =
        Number(
            days
        );


    return (
        generateViaviaPairings(
            options
        )
        .filter(
            pairing =>
                pairing.days ===
                normalizedDays
        )
    );

}


/* ============================================================
   VALIDATION
============================================================ */

/**
 * Validate the master flight schedule.
 */
function validateViaviaSchedule() {

    const flights =
        VIAVIA_SCHEDULE
            .flights;


    const flightNumbers =
        flights.map(
            flight =>
                flight.flightNumber
        );


    const duplicateFlightNumbers =
        flightNumbers.filter(
            (
                flightNumber,
                index
            ) =>
                flightNumbers.indexOf(
                    flightNumber
                ) !==
                index
        );


    const missingData =
        flights.filter(
            flight =>
                !flight.flightNumber ||
                !flight.origin ||
                !flight.destination ||
                !flight.departure ||
                !flight.arrival ||
                !flight.aircraft
        );


    const expectedFlights =
        131;


    return {

        totalFlights:
            flights.length,

        expectedFlights:
            expectedFlights,

        totalCorrect:
            flights.length ===
            expectedFlights,

        duplicateFlightNumbers:
            [
                ...new Set(
                    duplicateFlightNumbers
                )
            ],

        duplicatesCorrect:
            duplicateFlightNumbers.length ===
            0,

        missingData:
            missingData.map(
                flight =>
                    flight.flightNumber ||
                    "UNKNOWN"
            ),

        dataComplete:
            missingData.length ===
            0,

        valid:
            (
                flights.length ===
                    expectedFlights &&
                duplicateFlightNumbers.length ===
                    0 &&
                missingData.length ===
                    0
            )

    };

}


/**
 * Validate one generated pairing.
 */
function validateViaviaPairing(
    pairing
) {

    const errors = [];


    if (!pairing) {

        return {
            valid: false,
            errors: [
                "Pairing is missing."
            ]
        };

    }


    if (
        !VIAVIA_SCHEDULE
            .airline
            .pilotBases
            .includes(
                pairing.base
            )
    ) {

        errors.push(
            "Invalid pilot base."
        );

    }


    if (
        !Array.isArray(
            pairing.flights
        ) ||
        pairing.flights.length === 0
    ) {

        errors.push(
            "Pairing has no flights."
        );


        return {
            valid: false,
            errors:
                errors
        };

    }


    if (
        pairing.startAirport !==
        pairing.base
    ) {

        errors.push(
            "Pairing does not begin at its pilot base."
        );

    }


    if (
        pairing.endAirport !==
        pairing.base
    ) {

        errors.push(
            "Pairing does not return to its pilot base."
        );

    }


    if (
        pairing.days < 1 ||
        pairing.days >
            VIAVIA_MAX_PAIRING_DAYS
    ) {

        errors.push(
            "Pairing duration is outside the 1–4 day limit."
        );

    }


    /*
     * Confirm every pairing flight exists in the master
     * Viavia schedule.
     */
    pairing.flights.forEach(
        flight => {

            const scheduled =
                getViaviaFlight(
                    flight.flightNumber
                );


            if (!scheduled) {

                errors.push(
                    `${flight.flightNumber} is not in the master schedule.`
                );


                return;

            }


            if (
                scheduled.origin !==
                    flight.origin ||
                scheduled.destination !==
                    flight.destination
            ) {

                errors.push(
                    `${flight.flightNumber} route does not match the master schedule.`
                );

            }

        }
    );


    /*
     * Validate airport continuity.
     */
    for (
        let index = 1;
        index < pairing.flights.length;
        index++
    ) {

        const previous =
            pairing.flights[
                index - 1
            ];

        const current =
            pairing.flights[
                index
            ];


        if (
            previous.destination !==
            current.origin
        ) {

            errors.push(
                (
                    `Airport discontinuity between ` +
                    `${previous.flightNumber} and ` +
                    `${current.flightNumber}.`
                )
            );


            continue;

        }


        const previousDay =
            Number(
                previous.pairingDay ||
                1
            );

        const currentDay =
            Number(
                current.pairingDay ||
                1
            );


        if (
            currentDay ===
            previousDay
        ) {

            const connection =
                getViaviaConnectionMinutes(
                    previous,
                    current
                );


            if (
                connection === null ||
                connection <
                    VIAVIA_MIN_CONNECTION_MINUTES
            ) {

                errors.push(
                    (
                        `Invalid same-day connection between ` +
                        `${previous.flightNumber} and ` +
                        `${current.flightNumber}.`
                    )
                );

            }

        }


        if (
            currentDay <
            previousDay ||
            currentDay >
                previousDay + 1
        ) {

            errors.push(
                (
                    `Invalid pairing-day sequence between ` +
                    `${previous.flightNumber} and ` +
                    `${current.flightNumber}.`
                )
            );

        }

    }


    return {

        valid:
            errors.length ===
            0,

        errors:
            errors

    };

}


/**
 * Validate the complete generated pairing catalog.
 */
function validateViaviaPairings(
    options = {}
) {

    const pairings =
        generateViaviaPairings(
            options
        );


    const invalidPairings =
        [];


    pairings.forEach(
        pairing => {

            const result =
                validateViaviaPairing(
                    pairing
                );


            if (
                !result.valid
            ) {

                invalidPairings.push({

                    pairingId:
                        pairing.pairingId,

                    errors:
                        result.errors

                });

            }

        }
    );


    const trip001 =
        pairings.find(
            pairing =>
                pairing.pairingId ===
                "TRIP-001"
        );


    const trip001Exists =
        Boolean(
            trip001
        );


    const trip001Correct =
        Boolean(
            trip001 &&
            trip001.base ===
                "RSW" &&
            trip001.days ===
                1 &&
            trip001.flightNumbers.length ===
                2 &&
            trip001.flightNumbers[0] ===
                "VIA1757" &&
            trip001.flightNumbers[1] ===
                "VIA1758" &&
            trip001.aircraft.includes(
                "A320"
            )
        );


    return {

        totalPairings:
            pairings.length,

        invalidPairings:
            invalidPairings,

        trip001Exists:
            trip001Exists,

        trip001Correct:
            trip001Correct,

        valid:
            (
                invalidPairings.length ===
                    0 &&
                trip001Exists &&
                trip001Correct
            )

    };

}


/**
 * Run the complete schedule + pairing validation.
 */
function validateViaviaOperations() {

    const schedule =
        validateViaviaSchedule();

    const pairings =
        validateViaviaPairings();


    return {

        schedule:
            schedule,

        pairings:
            pairings,

        valid:
            (
                schedule.valid &&
                pairings.valid
            )

    };

}


/* ============================================================
   BROWSER GLOBALS
============================================================ */

/*
 * Expose Viavia schedule and pairing helpers globally so the
 * public site and Crew Portal pages can use one shared source.
 */
window.VIAVIA_SCHEDULE =
    VIAVIA_SCHEDULE;


window.VIAVIA_PAIRING_RULES =
    Object.freeze({

        minimumConnectionMinutes:
            VIAVIA_MIN_CONNECTION_MINUTES,

        minimumOvernightRestMinutes:
            VIAVIA_MIN_OVERNIGHT_MINUTES,

        maximumSameDayConnectionMinutes:
            VIAVIA_MAX_SAME_DAY_CONNECTION_MINUTES,

        maximumLegsPerDutyDay:
            VIAVIA_MAX_LEGS_PER_DAY,

        maximumTripDays:
            VIAVIA_MAX_PAIRING_DAYS,

        maximumTripLegs:
            9

    });


window.getViaviaFlights =
    getViaviaFlights;

window.getViaviaFlight =
    getViaviaFlight;

window.getViaviaFlightsFrom =
    getViaviaFlightsFrom;

window.getViaviaFlightsTo =
    getViaviaFlightsTo;

window.getViaviaBaseFlights =
    getViaviaBaseFlights;

window.getViaviaRoute =
    getViaviaRoute;

window.getViaviaFlightLabel =
    getViaviaFlightLabel;

window.getViaviaGateStatus =
    getViaviaGateStatus;

window.getViaviaTimeMinutes =
    getViaviaTimeMinutes;

window.getViaviaFlightDurationMinutes =
    getViaviaFlightDurationMinutes;

window.getViaviaArrivalMinutes =
    getViaviaArrivalMinutes;

window.getViaviaConnectionMinutes =
    getViaviaConnectionMinutes;

window.isViaviaValidConnection =
    isViaviaValidConnection;

window.buildViaviaPairingRoute =
    buildViaviaPairingRoute;

window.buildViaviaPairingDays =
    buildViaviaPairingDays;

window.getViaviaPairingOvernights =
    getViaviaPairingOvernights;

window.createViaviaPairing =
    createViaviaPairing;

window.generateViaviaPairings =
    generateViaviaPairings;

window.getViaviaPairing =
    getViaviaPairing;

window.getViaviaPairingsForBase =
    getViaviaPairingsForBase;

window.getViaviaPairingsByDays =
    getViaviaPairingsByDays;

window.validateViaviaSchedule =
    validateViaviaSchedule;

window.validateViaviaPairing =
    validateViaviaPairing;

window.validateViaviaPairings =
    validateViaviaPairings;

window.validateViaviaOperations =
    validateViaviaOperations;


/* ============================================================
   STARTUP VALIDATION
============================================================ */

const VIAVIA_VALIDATION =
    validateViaviaOperations();


window.VIAVIA_VALIDATION =
    VIAVIA_VALIDATION;


if (
    !VIAVIA_VALIDATION.valid
) {

    console.error(
        "Viavia Operations schedule validation failed.",
        VIAVIA_VALIDATION
    );

} else {

    console.log(
        "Viavia Operations schedule loaded.",
        {
            flights:
                VIAVIA_VALIDATION
                    .schedule
                    .totalFlights,

            pairings:
                VIAVIA_VALIDATION
                    .pairings
                    .totalPairings,

            callsign:
                VIAVIA_SCHEDULE
                    .airline
                    .callsign
        }
    );

}
