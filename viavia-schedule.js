/* ============================================================
   VIAVIA AIRLINES — MASTER FLIGHT SCHEDULE
   IATA: V1
   ICAO: VIA
   Callsign: Nexus

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
   - Shared by Available Bids / Crew Calendar / Pilot Center
============================================================ */

const VIAVIA_SCHEDULE = {

    airline: {
        name: "Viavia Airlines",
        iata: "V1",
        icao: "VIA",
        callsign: "Nexus",
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
            aircraft: "A321",
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
            aircraft: "A321",
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
            destination: "MKE",
            departure: "12:17",
            arrival: "14:32",
            aircraft: "A320",
            base: "RSW"
        },

        {
            flightNumber: "VIA2073",
            origin: "RSW",
            destination: "PTY",
            departure: "20:58",
            arrival: "23:08",
            aircraft: "A321",
            base: "RSW"
        },

        {
            flightNumber: "VIA2317",
            origin: "RSW",
            destination: "PUJ",
            departure: "15:52",
            arrival: "18:32",
            aircraft: "A321",
            base: "RSW"
        },

        {
            flightNumber: "VIA571",
            origin: "RSW",
            destination: "SDQ",
            departure: "22:00",
            arrival: "00:30",
            nextDay: true,
            aircraft: "A320",
            base: "RSW"
        },

        {
            flightNumber: "VIA2203",
            origin: "RSW",
            destination: "SJU",
            departure: "15:55",
            arrival: "18:50",
            aircraft: "A321",
            base: "RSW"
        },

        {
            flightNumber: "VIA1819",
            origin: "RSW",
            destination: "SJU",
            departure: "21:40",
            arrival: "00:35",
            nextDay: true,
            aircraft: "A319",
            base: "RSW"
        },

        {
            flightNumber: "VIA1621",
            origin: "RSW",
            destination: "SXM",
            departure: "13:00",
            arrival: "16:15",
            aircraft: "A320",
            base: "RSW"
        },

        {
            flightNumber: "VIA360",
            origin: "RSW",
            destination: "VPS",
            departure: "14:11",
            arrival: "14:51",
            aircraft: "A320",
            base: "RSW"
        },

        {
            flightNumber: "VIA1428",
            origin: "RSW",
            destination: "XPL",
            departure: "16:27",
            arrival: "18:07",
            aircraft: "A320",
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
            arrival: "10:40",
            aircraft: "A321",
            base: "RSW"
        },

        {
            flightNumber: "VIA355",
            origin: "ATL",
            destination: "RSW",
            departure: "23:45",
            arrival: "01:35",
            nextDay: true,
            aircraft: "A321",
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
            arrival: "13:42",
            aircraft: "A320",
            base: "RSW"
        },

        {
            flightNumber: "VIA954",
            origin: "CTG",
            destination: "RSW",
            departure: "20:00",
            arrival: "00:10",
            nextDay: true,
            aircraft: "A321",
            base: "RSW"
        },

        {
            flightNumber: "VIA461",
            origin: "DFW",
            destination: "RSW",
            departure: "05:15",
            arrival: "08:55",
            aircraft: "A321",
            base: "RSW"
        },

        {
            flightNumber: "VIA2325",
            origin: "DFW",
            destination: "RSW",
            departure: "08:40",
            arrival: "12:20",
            aircraft: "A319",
            base: "RSW"
        },

        {
            flightNumber: "VIA1077",
            origin: "DFW",
            destination: "RSW",
            departure: "12:30",
            arrival: "16:10",
            aircraft: "A321",
            base: "RSW"
        },

        {
            flightNumber: "VIA115",
            origin: "DFW",
            destination: "RSW",
            departure: "21:00",
            arrival: "00:40",
            nextDay: true,
            aircraft: "A320",
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
            arrival: "18:00",
            aircraft: "A320",
            base: "RSW"
        },

        {
            flightNumber: "VIA777",
            origin: "LAS",
            destination: "RSW",
            departure: "11:50",
            arrival: "17:15",
            aircraft: "A320",
            base: "RSW"
        },

        {
            flightNumber: "VIA2120",
            origin: "LGA",
            destination: "RSW",
            departure: "07:05",
            arrival: "10:10",
            aircraft: "A320",
            base: "RSW"
        },

        {
            flightNumber: "VIA2383",
            origin: "LIT",
            destination: "RSW",
            departure: "19:40",
            arrival: "23:00",
            aircraft: "A321",
            base: "RSW"
        },

        {
            flightNumber: "VIA1758",
            origin: "MDE",
            destination: "RSW",
            departure: "19:46",
            arrival: "00:31",
            nextDay: true,
            aircraft: "A320",
            base: "RSW"
        },

        {
            flightNumber: "VIA1393",
            origin: "MKE",
            destination: "RSW",
            departure: "15:32",
            arrival: "19:37",
            aircraft: "A320",
            base: "RSW"
        },

        {
            flightNumber: "VIA2074",
            origin: "PTY",
            destination: "RSW",
            departure: "07:30",
            arrival: "11:45",
            aircraft: "A321",
            base: "RSW"
        },

        {
            flightNumber: "VIA2318",
            origin: "PUJ",
            destination: "RSW",
            departure: "19:42",
            arrival: "22:42",
            aircraft: "A321",
            base: "RSW"
        },

        {
            flightNumber: "VIA572",
            origin: "SDQ",
            destination: "RSW",
            departure: "08:20",
            arrival: "11:05",
            aircraft: "A320",
            base: "RSW"
        },

        {
            flightNumber: "VIA2204",
            origin: "SJU",
            destination: "RSW",
            departure: "19:50",
            arrival: "23:05",
            aircraft: "A321",
            base: "RSW"
        },

        {
            flightNumber: "VIA1820",
            origin: "SJU",
            destination: "RSW",
            departure: "07:43",
            arrival: "10:58",
            aircraft: "A319",
            base: "RSW"
        },

        {
            flightNumber: "VIA1622",
            origin: "SXM",
            destination: "RSW",
            departure: "17:25",
            arrival: "21:00",
            aircraft: "A320",
            base: "RSW"
        },

        {
            flightNumber: "VIA361",
            origin: "VPS",
            destination: "RSW",
            departure: "15:51",
            arrival: "18:26",
            aircraft: "A320",
            base: "RSW"
        },

        {
            flightNumber: "VIA1429",
            origin: "XPL",
            destination: "RSW",
            departure: "19:17",
            arrival: "23:52",
            aircraft: "A320",
            base: "RSW"
        },


        /* ====================================================
           SMF OUTBOUND
        ==================================================== */

        {
            flightNumber: "VIA743",
            origin: "SMF",
            destination: "LAS",
            departure: "06:59",
            arrival: "08:29",
            aircraft: "A320",
            base: "SMF"
        },

        {
            flightNumber: "VIA829",
            origin: "SMF",
            destination: "LAS",
            departure: "16:24",
            arrival: "17:54",
            aircraft: "A320",
            base: "SMF"
        },

        {
            flightNumber: "VIA1105",
            origin: "SMF",
            destination: "LAX",
            departure: "07:37",
            arrival: "09:07",
            aircraft: "A321",
            base: "SMF"
        },

        {
            flightNumber: "VIA1993",
            origin: "SMF",
            destination: "LAX",
            departure: "18:18",
            arrival: "19:48",
            aircraft: "A320",
            base: "SMF"
        },

        {
            flightNumber: "VIA1114",
            origin: "SMF",
            destination: "MFR",
            departure: "08:44",
            arrival: "10:54",
            aircraft: "A321",
            base: "SMF"
        },

        {
            flightNumber: "VIA1878",
            origin: "SMF",
            destination: "MFR",
            departure: "15:40",
            arrival: "17:00",
            aircraft: "A319",
            base: "SMF"
        },

        {
            flightNumber: "VIA1584",
            origin: "SMF",
            destination: "SEA",
            departure: "09:27",
            arrival: "11:27",
            aircraft: "A320",
            base: "SMF"
        },

        {
            flightNumber: "VIA269",
            origin: "SMF",
            destination: "SBA",
            departure: "07:12",
            arrival: "08:37",
            aircraft: "A319",
            base: "SMF"
        },

        {
            flightNumber: "VIA1334",
            origin: "SMF",
            destination: "SBA",
            departure: "19:05",
            arrival: "20:30",
            aircraft: "A319",
            base: "SMF"
        },

        {
            flightNumber: "VIA1869",
            origin: "SMF",
            destination: "LIT",
            departure: "13:00",
            arrival: "18:40",
            aircraft: "A321",
            base: "SMF"
        },


        /* ====================================================
           SMF INBOUND
        ==================================================== */

        {
            flightNumber: "VIA744",
            origin: "LAS",
            destination: "SMF",
            departure: "08:55",
            arrival: "10:35",
            aircraft: "A320",
            base: "SMF"
        },

        {
            flightNumber: "VIA830",
            origin: "LAS",
            destination: "SMF",
            departure: "18:54",
            arrival: "20:34",
            aircraft: "A320",
            base: "SMF"
        },

        {
            flightNumber: "VIA1106",
            origin: "LAX",
            destination: "SMF",
            departure: "10:07",
            arrival: "11:43",
            aircraft: "A321",
            base: "SMF"
        },

        {
            flightNumber: "VIA1994",
            origin: "LAX",
            destination: "SMF",
            departure: "20:48",
            arrival: "22:23",
            aircraft: "A320",
            base: "SMF"
        },

        {
            flightNumber: "VIA1115",
            origin: "MFR",
            destination: "SMF",
            departure: "11:54",
            arrival: "13:09",
            aircraft: "A321",
            base: "SMF"
        },

        {
            flightNumber: "VIA1879",
            origin: "MFR",
            destination: "SMF",
            departure: "18:00",
            arrival: "19:15",
            aircraft: "A319",
            base: "SMF"
        },

        {
            flightNumber: "VIA1585",
            origin: "SEA",
            destination: "SMF",
            departure: "12:27",
            arrival: "14:27",
            aircraft: "A320",
            base: "SMF"
        },

        {
            flightNumber: "VIA270",
            origin: "SBA",
            destination: "SMF",
            departure: "09:37",
            arrival: "11:02",
            aircraft: "A319",
            base: "SMF"
        },

        {
            flightNumber: "VIA1335",
            origin: "SBA",
            destination: "SMF",
            departure: "21:30",
            arrival: "22:55",
            aircraft: "A319",
            base: "SMF"
        },

        {
            flightNumber: "VIA1868",
            origin: "LIT",
            destination: "SMF",
            departure: "09:35",
            arrival: "12:00",
            aircraft: "A321",
            base: "SMF"
        }

    ]

};


/* ============================================================
   HELPER FUNCTIONS
============================================================ */

/**
 * Find one flight by flight number.
 */
function getViaviaFlight(flightNumber) {

    return VIAVIA_SCHEDULE.flights.find(
        flight => flight.flightNumber === flightNumber
    ) || null;
}


/**
 * Get all flights departing from an airport.
 */
function getViaviaFlightsFrom(airport) {

    return VIAVIA_SCHEDULE.flights.filter(
        flight => flight.origin === airport
    );
}


/**
 * Get all flights arriving at an airport.
 */
function getViaviaFlightsTo(airport) {

    return VIAVIA_SCHEDULE.flights.filter(
        flight => flight.destination === airport
    );
}


/**
 * Get all flights for a pilot base.
 */
function getViaviaBaseFlights(base) {

    return VIAVIA_SCHEDULE.flights.filter(
        flight => flight.base === base
    );
}


/**
 * Return a human-readable route.
 */
function getViaviaRoute(flight) {

    return `${flight.origin} → ${flight.destination}`;
}


/**
 * Return a formatted flight display.
 */
function getViaviaFlightLabel(flight) {

    return `${flight.flightNumber} · ${flight.origin} → ${flight.destination}`;
}


/* ============================================================
   GATE ASSIGNMENT
============================================================ */

/**
 * Determine the current gate status.
 *
 * More than 12 hours before departure:
 *     TBD — Gate assignment pending
 *
 * Within 12 hours:
 *     assignedGate is displayed when supplied.
 */
function getViaviaGateStatus(
    departureDateTime,
    assignedGate = null
) {

    const now = new Date();
    const departure = new Date(departureDateTime);

    const hoursUntilDeparture =
        (departure.getTime() - now.getTime()) /
        (1000 * 60 * 60);

    if (
        hoursUntilDeparture >
        VIAVIA_SCHEDULE.operations.gateAssignmentHours
    ) {
        return VIAVIA_SCHEDULE.operations.gatePendingText;
    }

    return (
        assignedGate ||
        VIAVIA_SCHEDULE.operations.gatePendingText
    );
}


/* ============================================================
   PAIRING ENGINE
============================================================ */

/**
 * Viavia Pairing Engine
 *
 * This is the single pairing generator for:
 *
 * - Available Bids
 * - Crew Calendar
 * - Pilot Center
 * - Future crew-management pages
 *
 * Rules:
 *
 * - Pilot bases are DFW / RSW / SMF.
 * - Pairings begin at a pilot base.
 * - Pairings normally contain 2 legs.
 * - Closed turns must return to their originating base.
 * - Maximum 3 legs.
 * - Minimum connection: 45 minutes.
 * - Maximum connection: 18 hours.
 * - Only actual master-schedule flights may be used.
 * - No invented flights.
 * - No random pairing generation.
 *
 * The current schedule primarily contains:
 *
 * BASE → DESTINATION
 * DESTINATION → BASE
 *
 * Therefore the normal valid pairing is a 2-leg turn.
 */


/**
 * Convert HH:MM into minutes after midnight.
 */
function getViaviaTimeMinutes(time) {

    const parts = time.split(":");

    const hours = Number(parts[0]);
    const minutes = Number(parts[1]);

    return (
        (hours * 60) +
        minutes
    );
}


/**
 * Get an arrival time in minutes.
 *
 * Overnight flights are moved into the next day.
 */
function getViaviaArrivalMinutes(flight) {

    let arrival =
        getViaviaTimeMinutes(
            flight.arrival
        );

    const departure =
        getViaviaTimeMinutes(
            flight.departure
        );

    if (
        flight.nextDay ||
        arrival < departure
    ) {
        arrival += 24 * 60;
    }

    return arrival;
}


/**
 * Get the connection time between two flights.
 *
 * Returns null if the second flight does not
 * depart from the first flight's destination.
 */
function getViaviaConnectionMinutes(
    firstFlight,
    secondFlight
) {

    if (
        firstFlight.destination !==
        secondFlight.origin
    ) {
        return null;
    }

    const firstArrival =
        getViaviaArrivalMinutes(
            firstFlight
        );

    let secondDeparture =
        getViaviaTimeMinutes(
            secondFlight.departure
        );

    while (
        secondDeparture < firstArrival
    ) {
        secondDeparture += 24 * 60;
    }

    return (
        secondDeparture -
        firstArrival
    );
}


/**
 * Determine whether two flights form a
 * valid connection.
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

    if (connection === null) {
        return false;
    }

    return (
        connection >= 45 &&
        connection <= (18 * 60)
    );
}


/**
 * Create a standardized pairing object.
 */
function createViaviaPairing(
    pairingId,
    base,
    flights
) {

    const firstFlight =
        flights[0];

    const lastFlight =
        flights[flights.length - 1];

    return {

        pairingId: pairingId,

        base: base,

        flights: flights,

        flightNumbers:
            flights.map(
                flight =>
                    flight.flightNumber
            ),

        legs: flights.length,

        route:
            flights
                .map(
                    flight =>
                        flight.origin
                )
                .concat(
                    lastFlight.destination
                )
                .join(" → "),

        aircraft:
            [
                ...new Set(
                    flights.map(
                        flight =>
                            flight.aircraft
                    )
                )
            ],

        startAirport:
            firstFlight.origin,

        endAirport:
            lastFlight.destination,

        closed:
            firstFlight.origin ===
            lastFlight.destination,

        gateStatus:
            VIAVIA_SCHEDULE
                .operations
                .gatePendingText
    };
}


/**
 * Generate valid 2-leg turns for a base.
 *
 * Example:
 *
 * RSW → MDE
 * MDE → RSW
 */
function generateViaviaTwoLegTurns(base) {

    const outboundFlights =
        VIAVIA_SCHEDULE.flights.filter(
            flight =>
                flight.base === base &&
                flight.origin === base
        );

    const inboundFlights =
        VIAVIA_SCHEDULE.flights.filter(
            flight =>
                flight.base === base &&
                flight.destination === base
        );

    const turns = [];

    outboundFlights.forEach(
        outbound => {

            inboundFlights.forEach(
                inbound => {

                    if (
                        outbound.destination !==
                        inbound.origin
                    ) {
                        return;
                    }

                    if (
                        !isViaviaValidConnection(
                            outbound,
                            inbound
                        )
                    ) {
                        return;
                    }

                    turns.push({
                        outbound:
                            outbound,

                        inbound:
                            inbound
                    });
                }
            );
        }
    );

    return turns;
}


/**
 * Generate the complete deterministic
 * Viavia pairing list.
 *
 * The same master schedule will always
 * produce the same pairing list.
 */
function generateViaviaPairings(
    options = {}
) {

    const requestedBase =
        options.base || null;

    const maxLegs =
        Math.min(
            Number(options.maxLegs) || 3,
            3
        );

    const bases =
        requestedBase
            ? VIAVIA_SCHEDULE
                .airline
                .pilotBases
                .filter(
                    base =>
                        base === requestedBase
                )
            : VIAVIA_SCHEDULE
                .airline
                .pilotBases
                .slice();

    const pairings = [];


    /* ========================================================
       TRIP 001 — PERMANENT PAIRING
    ======================================================== */

    if (
        maxLegs >= 2 &&
        (
            !requestedBase ||
            requestedBase === "RSW"
        )
    ) {

        const outbound =
            getViaviaFlight(
                "VIA1757"
            );

        const inbound =
            getViaviaFlight(
                "VIA1758"
            );

        if (
            outbound &&
            inbound &&
            isViaviaValidConnection(
                outbound,
                inbound
            )
        ) {

            pairings.push(
                createViaviaPairing(
                    "TRIP-001",
                    "RSW",
                    [
                        outbound,
                        inbound
                    ]
                )
            );
        }
    }


    /* ========================================================
       GENERATE ACTUAL CLOSED TURNS
    ======================================================== */

    bases.forEach(
        base => {

            const turns =
                generateViaviaTwoLegTurns(
                    base
                );

            turns.forEach(
                turn => {

                    const flightNumbers = [
                        turn.outbound.flightNumber,
                        turn.inbound.flightNumber
                    ];

                    /*
                     * Trip 001 is already present.
                     */
                    if (
                        flightNumbers.includes(
                            "VIA1757"
                        ) &&
                        flightNumbers.includes(
                            "VIA1758"
                        )
                    ) {
                        return;
                    }

                    pairings.push(
                        createViaviaPairing(
                            null,
                            base,
                            [
                                turn.outbound,
                                turn.inbound
                            ]
                        )
                    );
                }
            );
        }
    );


    /* ========================================================
       REMOVE DUPLICATES
    ======================================================== */

    const uniquePairings = [];

    const seen = new Set();

    pairings.forEach(
        pairing => {

            const key =
                pairing.flightNumbers.join(
                    "|"
                );

            if (
                seen.has(key)
            ) {
                return;
            }

            seen.add(key);

            uniquePairings.push(
                pairing
            );
        }
    );


    /* ========================================================
       DETERMINISTIC SORT
    ======================================================== */

    const baseOrder =
        VIAVIA_SCHEDULE
            .airline
            .pilotBases;

    uniquePairings.sort(
        (a, b) => {

            const baseDifference =
                baseOrder.indexOf(a.base) -
                baseOrder.indexOf(b.base);

            if (
                baseDifference !== 0
            ) {
                return baseDifference;
            }

            const aTime =
                getViaviaTimeMinutes(
                    a.flights[0].departure
                );

            const bTime =
                getViaviaTimeMinutes(
                    b.flights[0].departure
                );

            if (
                aTime !== bTime
            ) {
                return aTime - bTime;
            }

            return (
                a.flightNumbers[0]
                    .localeCompare(
                        b.flightNumbers[0],
                        undefined,
                        {
                            numeric: true
                        }
                    )
            );
        }
    );


    /* ========================================================
       ASSIGN STABLE PAIRING NUMBERS
    ======================================================== */

    let nextNumber = 2;

    uniquePairings.forEach(
        pairing => {

            if (
                pairing.pairingId ===
                "TRIP-001"
            ) {
                return;
            }

            pairing.pairingId =
                `TRIP-${String(
                    nextNumber
                ).padStart(3, "0")}`;

            nextNumber++;
        }
    );


    return uniquePairings;
}


/**
 * Find one pairing by ID.
 *
 * Example:
 * getViaviaPairing("TRIP-001")
 */
function getViaviaPairing(
    pairingId
) {

    return (
        generateViaviaPairings()
            .find(
                pairing =>
                    pairing.pairingId ===
                    pairingId
            ) ||
        null
    );
}


/**
 * Find the pairing containing a specific flight.
 *
 * Example:
 * getViaviaPairingForFlight("VIA1757")
 */
function getViaviaPairingForFlight(
    flightNumber
) {

    return (
        generateViaviaPairings()
            .find(
                pairing =>
                    pairing.flightNumbers
                        .includes(
                            flightNumber
                        )
            ) ||
        null
    );
}


/**
 * Get pairings for one pilot base.
 *
 * Example:
 * getViaviaPairingsForBase("RSW")
 */
function getViaviaPairingsForBase(
    base
) {

    return generateViaviaPairings({
        base: base
    });
}


/**
 * Get all pairings containing a flight.
 *
 * This returns an array rather than only the
 * first matching pairing.
 */
function getViaviaPairingsForFlight(
    flightNumber
) {

    return generateViaviaPairings()
        .filter(
            pairing =>
                pairing.flightNumbers
                    .includes(
                        flightNumber
                    )
        );
}


/* ============================================================
   SCHEDULE VALIDATION
============================================================ */

/**
 * Validate the master schedule.
 *
 * Checks:
 * - total flight count
 * - duplicate flight numbers
 * - missing flight numbers
 * - missing routes
 * - missing aircraft
 * - missing departure/arrival times
 */
function validateViaviaSchedule() {

    const flights =
        VIAVIA_SCHEDULE.flights;

    const flightNumbers =
        flights.map(
            flight =>
                flight.flightNumber
        );

    const duplicates =
        flightNumbers.filter(
            (number, index) =>
                flightNumbers.indexOf(
                    number
                ) !== index
        );

    const missingData =
        flights.filter(
            flight =>
                !flight.flightNumber ||
                !flight.origin ||
                !flight.destination ||
                !flight.departure ||
                !flight.arrival ||
                !flight.aircraft ||
                !flight.base
        );

    return {

        totalFlights:
            flights.length,

        expectedFlights:
            131,

        totalCorrect:
            flights.length === 131,

        duplicateFlightNumbers:
            [
                ...new Set(
                    duplicates
                )
            ],

        duplicatesCorrect:
            duplicates.length === 0,

        missingData:
            missingData.map(
                flight =>
                    flight.flightNumber ||
                    "(missing flight number)"
            ),

        dataComplete:
            missingData.length === 0,

        valid:
            flights.length === 131 &&
            duplicates.length === 0 &&
            missingData.length === 0
    };
}


/* ============================================================
   PAIRING VALIDATION
============================================================ */

/**
 * Validate the generated pairing system.
 *
 * This confirms:
 * - pairings exist
 * - every pairing has flights
 * - every pairing starts at a pilot base
 * - closed turns return to their base
 * - no pairing exceeds 3 legs
 * - Trip 001 exists
 */
function validateViaviaPairings() {

    const pairings =
        generateViaviaPairings();

    const bases =
        VIAVIA_SCHEDULE
            .airline
            .pilotBases;

    const invalidPairings =
        pairings.filter(
            pairing => {

                if (
                    !pairing.flights ||
                    pairing.flights.length === 0
                ) {
                    return true;
                }

                if (
                    pairing.flights.length > 3
                ) {
                    return true;
                }

                if (
                    !bases.includes(
                        pairing.base
                    )
                ) {
                    return true;
                }

                if (
                    pairing.flights[0].origin !==
                    pairing.base
                ) {
                    return true;
                }

                if (
                    pairing.closed &&
                    pairing.flights[
                        pairing.flights.length - 1
                    ].destination !==
                    pairing.base
                ) {
                    return true;
                }

                return false;
            }
        );

    const trip001 =
        pairings.find(
            pairing =>
                pairing.pairingId ===
                "TRIP-001"
        );

    const trip001Correct =
        !!trip001 &&
        trip001.flightNumbers.length === 2 &&
        trip001.flightNumbers[0] ===
            "VIA1757" &&
        trip001.flightNumbers[1] ===
            "VIA1758";

    return {

        totalPairings:
            pairings.length,

        invalidPairings:
            invalidPairings.map(
                pairing =>
                    pairing.pairingId ||
                    "(unnumbered pairing)"
            ),

        trip001Exists:
            !!trip001,

        trip001Correct:
            trip001Correct,

        valid:
            invalidPairings.length === 0 &&
            trip001Correct
    };
}


/* ============================================================
   DEVELOPMENT CHECK
============================================================ */

/*
   Browser console checks:

       validateViaviaSchedule()

   should return:

       totalFlights: 131
       expectedFlights: 131
       totalCorrect: true
       duplicateFlightNumbers: []
       duplicatesCorrect: true
       missingData: []
       dataComplete: true
       valid: true


   Then:

       validateViaviaPairings()

   should return:

       invalidPairings: []
       trip001Exists: true
       trip001Correct: true
       valid: true


   To see all generated pairings:

       generateViaviaPairings()


   To see only RSW pairings:

       getViaviaPairingsForBase("RSW")


   To find the pairing containing VIA1757:

       getViaviaPairingForFlight("VIA1757")


   To find Trip 001:

       getViaviaPairing("TRIP-001")
*/
