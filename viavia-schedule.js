"use strict";

/* ============================================================
   VIAVIA AIRLINES — MASTER SCHEDULE
   IATA: V1
   ICAO: VIA
   Callsign: NEXUS

   Complete replacement viavia-schedule.js
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
        gatePendingText: "TBD — Gate assignment pending"
    },

    flights: [

        /* =====================================================
           DFW OUTBOUND
           ===================================================== */

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


        /* =====================================================
           DFW INBOUND
           ===================================================== */

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

        {
            flightNumber: "VIA1336",
            origin: "MIA",
            destination: "DFW",
            departure: "20:52",
            arrival: "23:07",
            aircraft: "A320",
            base: "DFW"
        },


        /* =====================================================
           RSW OUTBOUND
           ===================================================== */

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
            aircraft: "A320",
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


        /* =====================================================
           RSW INBOUND
           ===================================================== */

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
            aircraft: "A320",
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
            aircraft: "A320",
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


        /* =====================================================
           SMF OUTBOUND
           ===================================================== */

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


        /* =====================================================
           SMF INBOUND
           ===================================================== */

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
   FLIGHT LOOKUPS
   ============================================================ */

function getViaviaFlight(flightNumber) {

    const target =
        String(flightNumber || "")
            .trim()
            .toUpperCase();

    return VIAVIA_SCHEDULE.flights.find(
        flight =>
            String(flight.flightNumber)
                .toUpperCase() === target
    ) || null;
}


function getViaviaFlightsFrom(airport) {

    const target =
        String(airport || "")
            .trim()
            .toUpperCase();

    return VIAVIA_SCHEDULE.flights.filter(
        flight =>
            flight.origin === target
    );
}


function getViaviaFlightsTo(airport) {

    const target =
        String(airport || "")
            .trim()
            .toUpperCase();

    return VIAVIA_SCHEDULE.flights.filter(
        flight =>
            flight.destination === target
    );
}


function getViaviaBaseFlights(base) {

    const target =
        String(base || "")
            .trim()
            .toUpperCase();

    return VIAVIA_SCHEDULE.flights.filter(
        flight =>
            flight.base === target
    );
}


function getViaviaRoute(flight) {

    if (!flight) {
        return "—";
    }

    return `${flight.origin} → ${flight.destination}`;
}


function getViaviaFlightLabel(flight) {

    if (!flight) {
        return "Unknown Flight";
    }

    return (
        `${flight.flightNumber} · ` +
        `${flight.origin} → ${flight.destination} · ` +
        `${flight.departure}–${flight.arrival}` +
        `${flight.nextDay ? " +1" : ""}`
    );
}


/* ============================================================
   GATE STATUS
   ============================================================ */

function getViaviaGateStatus() {

    return (
        VIAVIA_SCHEDULE.operations.gatePendingText ||
        "TBD — Gate assignment pending"
    );
}


/* ============================================================
   TIME HELPERS
   ============================================================ */

function getViaviaTimeMinutes(value) {

    if (!value) {
        return null;
    }

    const parts =
        String(value).split(":");

    if (parts.length !== 2) {
        return null;
    }

    const hours =
        Number(parts[0]);

    const minutes =
        Number(parts[1]);

    if (
        !Number.isFinite(hours) ||
        !Number.isFinite(minutes)
    ) {
        return null;
    }

    return hours * 60 + minutes;
}


function getViaviaArrivalMinutes(flight) {

    if (!flight) {
        return null;
    }

    let arrival =
        getViaviaTimeMinutes(
            flight.arrival
        );

    if (arrival === null) {
        return null;
    }

    if (flight.nextDay) {
        arrival += 1440;
    }

    return arrival;
}


function getViaviaConnectionMinutes(
    firstFlight,
    secondFlight
) {

    if (
        !firstFlight ||
        !secondFlight
    ) {
        return null;
    }

    if (
        firstFlight.destination !==
        secondFlight.origin
    ) {
        return null;
    }

    const arrival =
        getViaviaArrivalMinutes(
            firstFlight
        );

    let departure =
        getViaviaTimeMinutes(
            secondFlight.departure
        );

    if (
        arrival === null ||
        departure === null
    ) {
        return null;
    }

    while (departure < arrival) {
        departure += 1440;
    }

    return departure - arrival;
}


/* ============================================================
   CONNECTION VALIDATION

   Pairings use practical same-day connections.
   Minimum connection: 30 minutes
   Maximum connection: 8 hours
   ============================================================ */

function isViaviaValidConnection(
    firstFlight,
    secondFlight
) {

    if (
        !firstFlight ||
        !secondFlight
    ) {
        return false;
    }

    if (
        firstFlight.destination !==
        secondFlight.origin
    ) {
        return false;
    }

    const connection =
        getViaviaConnectionMinutes(
            firstFlight,
            secondFlight
        );

    if (connection === null) {
        return false;
    }

    return (
        connection >= 30 &&
        connection <= 480
    );
}


/* ============================================================
   CREATE PAIRING
   ============================================================ */

function createViaviaPairing(
    pairingId,
    base,
    flights
) {

    const validFlights =
        Array.isArray(flights)
            ? flights.filter(Boolean)
            : [];

    const flightNumbers =
        validFlights.map(
            flight =>
                flight.flightNumber
        );

    const routeAirports = [];

    if (validFlights.length) {

        routeAirports.push(
            validFlights[0].origin
        );

        validFlights.forEach(
            flight => {
                routeAirports.push(
                    flight.destination
                );
            }
        );
    }

    const aircraft =
        [
            ...new Set(
                validFlights
                    .map(
                        flight =>
                            flight.aircraft
                    )
                    .filter(Boolean)
            )
        ];

    const startAirport =
        validFlights.length
            ? validFlights[0].origin
            : base;

    const endAirport =
        validFlights.length
            ? validFlights[
                validFlights.length - 1
            ].destination
            : base;

    return {

        pairingId,

        base,

        flights:
            validFlights,

        flightNumbers,

        legs:
            validFlights.length,

        route:
            routeAirports.join(" → "),

        aircraft,

        startAirport,

        endAirport,

        closed:
            startAirport === base &&
            endAirport === base,

        gateStatus:
            getViaviaGateStatus()

    };
}


/* ============================================================
   TWO-LEG BASE TURNS

   Creates:
   BASE → DESTINATION → BASE

   The outbound and return flights must:
   - belong to the same pilot base
   - physically connect
   - use the same aircraft family
   - have a valid connection
   ============================================================ */

function generateViaviaTwoLegTurns(
    base
) {

    const targetBase =
        String(base || "")
            .trim()
            .toUpperCase();

    const flights =
        getViaviaBaseFlights(
            targetBase
        );

    const outbound =
        flights.filter(
            flight =>
                flight.origin === targetBase
        );

    const inbound =
        flights.filter(
            flight =>
                flight.destination === targetBase
        );

    const turns = [];

    outbound.forEach(
        firstFlight => {

            const possibleReturns =
                inbound
                    .filter(
                        secondFlight =>

                            secondFlight.origin ===
                                firstFlight.destination &&

                            secondFlight.aircraft ===
                                firstFlight.aircraft &&

                            isViaviaValidConnection(
                                firstFlight,
                                secondFlight
                            )
                    )
                    .sort(
                        (a, b) => {

                            const connectionA =
                                getViaviaConnectionMinutes(
                                    firstFlight,
                                    a
                                );

                            const connectionB =
                                getViaviaConnectionMinutes(
                                    firstFlight,
                                    b
                                );

                            return (
                                connectionA -
                                connectionB
                            );
                        }
                    );

            if (
                possibleReturns.length
            ) {

                turns.push(
                    [
                        firstFlight,
                        possibleReturns[0]
                    ]
                );
            }

        }
    );

    return turns;
}


/* ============================================================
   GENERATE PAIRINGS

   TRIP-001 is permanently:
   RSW → MDE → RSW
   VIA1757 / VIA1758

   All other pairings receive deterministic IDs beginning
   with TRIP-002.
   ============================================================ */

function generateViaviaPairings(
    options = {}
) {

    const maxLegs =
        Number(
            options.maxLegs || 3
        );

    const pairings = [];

    const usedSignatures =
        new Set();


    /* --------------------------------------------------------
       PERMANENT TRIP-001
       -------------------------------------------------------- */

    const trip001Flights =
        [
            getViaviaFlight("VIA1757"),
            getViaviaFlight("VIA1758")
        ]
            .filter(Boolean);

    if (
        trip001Flights.length === 2
    ) {

        pairings.push(
            createViaviaPairing(
                "TRIP-001",
                "RSW",
                trip001Flights
            )
        );

        usedSignatures.add(
            trip001Flights
                .map(
                    flight =>
                        flight.flightNumber
                )
                .join("|")
        );
    }


    /* --------------------------------------------------------
       GENERATE BASE TURNS
       -------------------------------------------------------- */

    const generatedTurns = [];

    VIAVIA_SCHEDULE.airline
        .pilotBases
        .forEach(
            base => {

                generateViaviaTwoLegTurns(
                    base
                )
                    .forEach(
                        flights => {

                            if (
                                flights.length >
                                maxLegs
                            ) {
                                return;
                            }

                            const signature =
                                flights
                                    .map(
                                        flight =>
                                            flight.flightNumber
                                    )
                                    .join("|");

                            if (
                                usedSignatures.has(
                                    signature
                                )
                            ) {
                                return;
                            }

                            generatedTurns.push({
                                base,
                                flights,
                                signature
                            });

                            usedSignatures.add(
                                signature
                            );

                        }
                    );

            }
        );


    /* --------------------------------------------------------
       DETERMINISTIC SORT

       This prevents trip IDs from changing merely because the
       source array happens to be reordered.
       -------------------------------------------------------- */

    generatedTurns.sort(
        (a, b) => {

            const baseCompare =
                a.base.localeCompare(
                    b.base
                );

            if (baseCompare !== 0) {
                return baseCompare;
            }

            const firstA =
                a.flights[0]
                    ?.departure || "";

            const firstB =
                b.flights[0]
                    ?.departure || "";

            const timeCompare =
                firstA.localeCompare(
                    firstB
                );

            if (timeCompare !== 0) {
                return timeCompare;
            }

            return (
                a.signature.localeCompare(
                    b.signature
                )
            );
        }
    );


    let tripNumber = 2;

    generatedTurns.forEach(
        item => {

            const pairingId =
                `TRIP-${String(
                    tripNumber
                ).padStart(3, "0")}`;

            pairings.push(
                createViaviaPairing(
                    pairingId,
                    item.base,
                    item.flights
                )
            );

            tripNumber += 1;

        }
    );

    return pairings;
}


/* ============================================================
   PAIRING LOOKUPS
   ============================================================ */

function getViaviaPairing(
    pairingId
) {

    const target =
        String(pairingId || "")
            .trim()
            .toUpperCase();

    return (
        generateViaviaPairings({
            maxLegs: 3
        })
            .find(
                pairing =>
                    String(
                        pairing.pairingId
                    ).toUpperCase() ===
                    target
            ) ||
        null
    );
}


function getViaviaPairingForFlight(
    flightNumber
) {

    const target =
        String(flightNumber || "")
            .trim()
            .toUpperCase();

    return (
        generateViaviaPairings({
            maxLegs: 3
        })
            .find(
                pairing =>
                    pairing.flightNumbers
                        .some(
                            number =>
                                String(number)
                                    .toUpperCase() ===
                                target
                        )
            ) ||
        null
    );
}


function getViaviaPairingsForBase(
    base
) {

    const target =
        String(base || "")
            .trim()
            .toUpperCase();

    return (
        generateViaviaPairings({
            maxLegs: 3
        })
            .filter(
                pairing =>
                    pairing.base === target
            )
    );
}


function getViaviaPairingsForFlight(
    flightNumber
) {

    const target =
        String(flightNumber || "")
            .trim()
            .toUpperCase();

    return (
        generateViaviaPairings({
            maxLegs: 3
        })
            .filter(
                pairing =>
                    pairing.flightNumbers
                        .some(
                            number =>
                                String(number)
                                    .toUpperCase() ===
                                target
                        )
            )
    );
}


/* ============================================================
   SCHEDULE VALIDATION
   ============================================================ */

function validateViaviaSchedule() {

    const errors = [];

    const flights =
        VIAVIA_SCHEDULE.flights;

    if (!Array.isArray(flights)) {

        errors.push(
            "VIAVIA_SCHEDULE.flights is not an array."
        );

        return {
            valid: false,
            errors
        };
    }


    const seenNumbers =
        new Set();


    flights.forEach(
        (flight, index) => {

            if (!flight.flightNumber) {

                errors.push(
                    `Flight at index ${index} has no flight number.`
                );

                return;
            }


            if (
                seenNumbers.has(
                    flight.flightNumber
                )
            ) {

                errors.push(
                    `Duplicate flight number: ${flight.flightNumber}`
                );

            }


            seenNumbers.add(
                flight.flightNumber
            );


            if (
                !flight.origin ||
                !flight.destination
            ) {

                errors.push(
                    `${flight.flightNumber} has an invalid route.`
                );
            }


            if (
                !flight.departure ||
                !flight.arrival
            ) {

                errors.push(
                    `${flight.flightNumber} is missing scheduled times.`
                );
            }


            if (
                ![
                    "A319",
                    "A320",
                    "A321"
                ].includes(
                    flight.aircraft
                )
            ) {

                errors.push(
                    `${flight.flightNumber} has invalid aircraft ${flight.aircraft}.`
                );
            }


            if (
                ![
                    "DFW",
                    "RSW",
                    "SMF"
                ].includes(
                    flight.base
                )
            ) {

                errors.push(
                    `${flight.flightNumber} has invalid base ${flight.base}.`
                );
            }

        }
    );


    return {

        valid:
            errors.length === 0,

        flightCount:
            flights.length,

        uniqueFlightNumbers:
            seenNumbers.size,

        errors

    };
}


/* ============================================================
   PAIRING VALIDATION
   ============================================================ */

function validateViaviaPairings() {

    const errors = [];

    let pairings = [];

    try {

        pairings =
            generateViaviaPairings({
                maxLegs: 3
            });

    } catch (error) {

        errors.push(
            error?.message ||
            "Pairing generation failed."
        );

        return {
            valid: false,
            pairingCount: 0,
            errors
        };
    }


    const seenIds =
        new Set();


    pairings.forEach(
        pairing => {

            if (
                !/^TRIP-\d{3}$/.test(
                    pairing.pairingId
                )
            ) {

                errors.push(
                    `Invalid pairing ID: ${pairing.pairingId}`
                );
            }


            if (
                seenIds.has(
                    pairing.pairingId
                )
            ) {

                errors.push(
                    `Duplicate pairing ID: ${pairing.pairingId}`
                );
            }


            seenIds.add(
                pairing.pairingId
            );


            if (
                !Array.isArray(
                    pairing.flights
                ) ||
                !pairing.flights.length
            ) {

                errors.push(
                    `${pairing.pairingId} has no flights.`
                );

                return;
            }


            if (
                pairing.startAirport !==
                pairing.base
            ) {

                errors.push(
                    `${pairing.pairingId} does not begin at ${pairing.base}.`
                );
            }


            if (
                pairing.endAirport !==
                pairing.base
            ) {

                errors.push(
                    `${pairing.pairingId} does not return to ${pairing.base}.`
                );
            }


            for (
                let i = 0;
                i < pairing.flights.length - 1;
                i++
            ) {

                const first =
                    pairing.flights[i];

                const second =
                    pairing.flights[i + 1];

                if (
                    first.destination !==
                    second.origin
                ) {

                    errors.push(
                        `${pairing.pairingId} has a broken connection between ${first.flightNumber} and ${second.flightNumber}.`
                    );
                }

            }

        }
    );


    return {

        valid:
            errors.length === 0,

        pairingCount:
            pairings.length,

        errors

    };
}


/* ============================================================
   GLOBAL EXPORTS

   Explicitly expose everything because the website uses
   ordinary browser script tags rather than ES modules.
   ============================================================ */

window.VIAVIA_SCHEDULE =
    VIAVIA_SCHEDULE;

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

window.getViaviaArrivalMinutes =
    getViaviaArrivalMinutes;

window.getViaviaConnectionMinutes =
    getViaviaConnectionMinutes;

window.isViaviaValidConnection =
    isViaviaValidConnection;

window.createViaviaPairing =
    createViaviaPairing;

window.generateViaviaTwoLegTurns =
    generateViaviaTwoLegTurns;

window.generateViaviaPairings =
    generateViaviaPairings;

window.getViaviaPairing =
    getViaviaPairing;

window.getViaviaPairingForFlight =
    getViaviaPairingForFlight;

window.getViaviaPairingsForBase =
    getViaviaPairingsForBase;

window.getViaviaPairingsForFlight =
    getViaviaPairingsForFlight;

window.validateViaviaSchedule =
    validateViaviaSchedule;

window.validateViaviaPairings =
    validateViaviaPairings;


/* ============================================================
   STARTUP VALIDATION
   ============================================================ */

const VIAVIA_SCHEDULE_VALIDATION =
    validateViaviaSchedule();

const VIAVIA_PAIRING_VALIDATION =
    validateViaviaPairings();


if (
    !VIAVIA_SCHEDULE_VALIDATION.valid
) {

    console.error(
        "Viavia schedule validation failed:",
        VIAVIA_SCHEDULE_VALIDATION.errors
    );

} else {

    console.log(
        `Viavia master schedule loaded: ${VIAVIA_SCHEDULE_VALIDATION.flightCount} flights.`
    );

}


if (
    !VIAVIA_PAIRING_VALIDATION.valid
) {

    console.error(
        "Viavia pairing validation failed:",
        VIAVIA_PAIRING_VALIDATION.errors
    );

} else {

    console.log(
        `Viavia pairings loaded: ${VIAVIA_PAIRING_VALIDATION.pairingCount} pairings.`
    );

}
