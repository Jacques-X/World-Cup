import type { Match, Team } from "@/lib/types";

export const TEAMS: Record<string, Team> = {
  "Mexico": {
    "name": "Mexico",
    "flag": "mx",
    "group": "A"
  },
  "South Africa": {
    "name": "South Africa",
    "flag": "za",
    "group": "A"
  },
  "South Korea": {
    "name": "South Korea",
    "flag": "kr",
    "group": "A"
  },
  "Czechia": {
    "name": "Czechia",
    "flag": "cz",
    "group": "A"
  },
  "Canada": {
    "name": "Canada",
    "flag": "ca",
    "group": "B"
  },
  "Bosnia and Herzegovina": {
    "name": "Bosnia and Herzegovina",
    "flag": "ba",
    "group": "B"
  },
  "Qatar": {
    "name": "Qatar",
    "flag": "qa",
    "group": "B"
  },
  "Switzerland": {
    "name": "Switzerland",
    "flag": "ch",
    "group": "B"
  },
  "Brazil": {
    "name": "Brazil",
    "flag": "br",
    "group": "C"
  },
  "Morocco": {
    "name": "Morocco",
    "flag": "ma",
    "group": "C"
  },
  "Haiti": {
    "name": "Haiti",
    "flag": "ht",
    "group": "C"
  },
  "Scotland": {
    "name": "Scotland",
    "flag": "gb-sct",
    "group": "C"
  },
  "United States": {
    "name": "United States",
    "flag": "us",
    "group": "D"
  },
  "Paraguay": {
    "name": "Paraguay",
    "flag": "py",
    "group": "D"
  },
  "Australia": {
    "name": "Australia",
    "flag": "au",
    "group": "D"
  },
  "Turkey": {
    "name": "Turkey",
    "flag": "tr",
    "group": "D"
  },
  "Germany": {
    "name": "Germany",
    "flag": "de",
    "group": "E"
  },
  "Curaçao": {
    "name": "Curaçao",
    "flag": "cw",
    "group": "E"
  },
  "Ivory Coast": {
    "name": "Ivory Coast",
    "flag": "ci",
    "group": "E"
  },
  "Ecuador": {
    "name": "Ecuador",
    "flag": "ec",
    "group": "E"
  },
  "Netherlands": {
    "name": "Netherlands",
    "flag": "nl",
    "group": "F"
  },
  "Japan": {
    "name": "Japan",
    "flag": "jp",
    "group": "F"
  },
  "Sweden": {
    "name": "Sweden",
    "flag": "se",
    "group": "F"
  },
  "Tunisia": {
    "name": "Tunisia",
    "flag": "tn",
    "group": "F"
  },
  "Belgium": {
    "name": "Belgium",
    "flag": "be",
    "group": "G"
  },
  "Egypt": {
    "name": "Egypt",
    "flag": "eg",
    "group": "G"
  },
  "Iran": {
    "name": "Iran",
    "flag": "ir",
    "group": "G"
  },
  "New Zealand": {
    "name": "New Zealand",
    "flag": "nz",
    "group": "G"
  },
  "Spain": {
    "name": "Spain",
    "flag": "es",
    "group": "H"
  },
  "Cape Verde": {
    "name": "Cape Verde",
    "flag": "cv",
    "group": "H"
  },
  "Saudi Arabia": {
    "name": "Saudi Arabia",
    "flag": "sa",
    "group": "H"
  },
  "Uruguay": {
    "name": "Uruguay",
    "flag": "uy",
    "group": "H"
  },
  "France": {
    "name": "France",
    "flag": "fr",
    "group": "I"
  },
  "Senegal": {
    "name": "Senegal",
    "flag": "sn",
    "group": "I"
  },
  "Iraq": {
    "name": "Iraq",
    "flag": "iq",
    "group": "I"
  },
  "Norway": {
    "name": "Norway",
    "flag": "no",
    "group": "I"
  },
  "Argentina": {
    "name": "Argentina",
    "flag": "ar",
    "group": "J"
  },
  "Algeria": {
    "name": "Algeria",
    "flag": "dz",
    "group": "J"
  },
  "Austria": {
    "name": "Austria",
    "flag": "at",
    "group": "J"
  },
  "Jordan": {
    "name": "Jordan",
    "flag": "jo",
    "group": "J"
  },
  "Portugal": {
    "name": "Portugal",
    "flag": "pt",
    "group": "K"
  },
  "Congo DR": {
    "name": "Congo DR",
    "flag": "cd",
    "group": "K"
  },
  "Uzbekistan": {
    "name": "Uzbekistan",
    "flag": "uz",
    "group": "K"
  },
  "Colombia": {
    "name": "Colombia",
    "flag": "co",
    "group": "K"
  },
  "England": {
    "name": "England",
    "flag": "gb-eng",
    "group": "L"
  },
  "Croatia": {
    "name": "Croatia",
    "flag": "hr",
    "group": "L"
  },
  "Ghana": {
    "name": "Ghana",
    "flag": "gh",
    "group": "L"
  },
  "Panama": {
    "name": "Panama",
    "flag": "pa",
    "group": "L"
  }
};

const MATCH_DATA: Array<Omit<Match, "kickoffAt">> = [
  {
    "id": "00000000-0000-4000-8000-000000000001",
    "matchNumber": 1,
    "group": "A",
    "date": "2026-06-11",
    "time": "14:00",
    "venue": "Estadio Azteca, Mexico City",
    "home": "Mexico",
    "away": "South Africa"
  },
  {
    "id": "00000000-0000-4000-8000-000000000002",
    "matchNumber": 2,
    "group": "A",
    "date": "2026-06-11",
    "time": "21:00",
    "venue": "Estadio Guadalajara, Zapopan",
    "home": "South Korea",
    "away": "Czechia"
  },
  {
    "id": "00000000-0000-4000-8000-000000000003",
    "matchNumber": 3,
    "group": "B",
    "date": "2026-06-12",
    "time": "14:00",
    "venue": "Toronto Stadium, Toronto",
    "home": "Canada",
    "away": "Bosnia and Herzegovina"
  },
  {
    "id": "00000000-0000-4000-8000-000000000004",
    "matchNumber": 4,
    "group": "D",
    "date": "2026-06-12",
    "time": "20:00",
    "venue": "Los Angeles Stadium, Inglewood",
    "home": "United States",
    "away": "Paraguay"
  },
  {
    "id": "00000000-0000-4000-8000-000000000005",
    "matchNumber": 5,
    "group": "B",
    "date": "2026-06-13",
    "time": "14:00",
    "venue": "San Francisco Bay Area Stadium, Santa Clara",
    "home": "Qatar",
    "away": "Switzerland"
  },
  {
    "id": "00000000-0000-4000-8000-000000000006",
    "matchNumber": 6,
    "group": "C",
    "date": "2026-06-13",
    "time": "17:00",
    "venue": "New York New Jersey Stadium, East Rutherford",
    "home": "Brazil",
    "away": "Morocco"
  },
  {
    "id": "00000000-0000-4000-8000-000000000007",
    "matchNumber": 7,
    "group": "C",
    "date": "2026-06-13",
    "time": "20:00",
    "venue": "Boston Stadium, Foxborough",
    "home": "Haiti",
    "away": "Scotland"
  },
  {
    "id": "00000000-0000-4000-8000-000000000008",
    "matchNumber": 8,
    "group": "D",
    "date": "2026-06-13",
    "time": "23:00",
    "venue": "BC Place, Vancouver",
    "home": "Australia",
    "away": "Turkey"
  },
  {
    "id": "00000000-0000-4000-8000-000000000009",
    "matchNumber": 9,
    "group": "E",
    "date": "2026-06-14",
    "time": "12:00",
    "venue": "Houston Stadium, Houston",
    "home": "Germany",
    "away": "Curaçao"
  },
  {
    "id": "00000000-0000-4000-8000-000000000010",
    "matchNumber": 10,
    "group": "F",
    "date": "2026-06-14",
    "time": "15:00",
    "venue": "Dallas Stadium, Arlington",
    "home": "Netherlands",
    "away": "Japan"
  },
  {
    "id": "00000000-0000-4000-8000-000000000011",
    "matchNumber": 11,
    "group": "E",
    "date": "2026-06-14",
    "time": "18:00",
    "venue": "Philadelphia Stadium, Philadelphia",
    "home": "Ivory Coast",
    "away": "Ecuador"
  },
  {
    "id": "00000000-0000-4000-8000-000000000012",
    "matchNumber": 12,
    "group": "F",
    "date": "2026-06-14",
    "time": "21:00",
    "venue": "Estadio Monterrey, Guadalupe",
    "home": "Sweden",
    "away": "Tunisia"
  },
  {
    "id": "00000000-0000-4000-8000-000000000013",
    "matchNumber": 13,
    "group": "H",
    "date": "2026-06-15",
    "time": "11:00",
    "venue": "Atlanta Stadium, Atlanta",
    "home": "Spain",
    "away": "Cape Verde"
  },
  {
    "id": "00000000-0000-4000-8000-000000000014",
    "matchNumber": 14,
    "group": "G",
    "date": "2026-06-15",
    "time": "14:00",
    "venue": "Seattle Stadium, Seattle",
    "home": "Belgium",
    "away": "Egypt"
  },
  {
    "id": "00000000-0000-4000-8000-000000000015",
    "matchNumber": 15,
    "group": "H",
    "date": "2026-06-15",
    "time": "17:00",
    "venue": "Miami Stadium, Miami Gardens",
    "home": "Saudi Arabia",
    "away": "Uruguay"
  },
  {
    "id": "00000000-0000-4000-8000-000000000016",
    "matchNumber": 16,
    "group": "G",
    "date": "2026-06-15",
    "time": "20:00",
    "venue": "Los Angeles Stadium, Inglewood",
    "home": "Iran",
    "away": "New Zealand"
  },
  {
    "id": "00000000-0000-4000-8000-000000000017",
    "matchNumber": 17,
    "group": "I",
    "date": "2026-06-16",
    "time": "14:00",
    "venue": "New York New Jersey Stadium, East Rutherford",
    "home": "France",
    "away": "Senegal"
  },
  {
    "id": "00000000-0000-4000-8000-000000000018",
    "matchNumber": 18,
    "group": "I",
    "date": "2026-06-16",
    "time": "17:00",
    "venue": "Boston Stadium, Foxborough",
    "home": "Iraq",
    "away": "Norway"
  },
  {
    "id": "00000000-0000-4000-8000-000000000019",
    "matchNumber": 19,
    "group": "J",
    "date": "2026-06-16",
    "time": "20:00",
    "venue": "Kansas City Stadium, Kansas City",
    "home": "Argentina",
    "away": "Algeria"
  },
  {
    "id": "00000000-0000-4000-8000-000000000020",
    "matchNumber": 20,
    "group": "J",
    "date": "2026-06-16",
    "time": "23:00",
    "venue": "San Francisco Bay Area Stadium, Santa Clara",
    "home": "Austria",
    "away": "Jordan"
  },
  {
    "id": "00000000-0000-4000-8000-000000000021",
    "matchNumber": 21,
    "group": "K",
    "date": "2026-06-17",
    "time": "12:00",
    "venue": "Houston Stadium, Houston",
    "home": "Portugal",
    "away": "Congo DR"
  },
  {
    "id": "00000000-0000-4000-8000-000000000022",
    "matchNumber": 22,
    "group": "L",
    "date": "2026-06-17",
    "time": "15:00",
    "venue": "Dallas Stadium, Arlington",
    "home": "England",
    "away": "Croatia"
  },
  {
    "id": "00000000-0000-4000-8000-000000000023",
    "matchNumber": 23,
    "group": "L",
    "date": "2026-06-17",
    "time": "18:00",
    "venue": "Toronto Stadium, Toronto",
    "home": "Ghana",
    "away": "Panama"
  },
  {
    "id": "00000000-0000-4000-8000-000000000024",
    "matchNumber": 24,
    "group": "K",
    "date": "2026-06-17",
    "time": "21:00",
    "venue": "Estadio Azteca, Mexico City",
    "home": "Uzbekistan",
    "away": "Colombia"
  },
  {
    "id": "00000000-0000-4000-8000-000000000025",
    "matchNumber": 25,
    "group": "A",
    "date": "2026-06-18",
    "time": "12:00",
    "venue": "Atlanta Stadium, Atlanta",
    "home": "Czechia",
    "away": "South Africa"
  },
  {
    "id": "00000000-0000-4000-8000-000000000026",
    "matchNumber": 26,
    "group": "B",
    "date": "2026-06-18",
    "time": "15:00",
    "venue": "Los Angeles Stadium, Inglewood",
    "home": "Switzerland",
    "away": "Bosnia and Herzegovina"
  },
  {
    "id": "00000000-0000-4000-8000-000000000027",
    "matchNumber": 27,
    "group": "B",
    "date": "2026-06-18",
    "time": "18:00",
    "venue": "BC Place, Vancouver",
    "home": "Canada",
    "away": "Qatar"
  },
  {
    "id": "00000000-0000-4000-8000-000000000028",
    "matchNumber": 28,
    "group": "A",
    "date": "2026-06-18",
    "time": "21:00",
    "venue": "Estadio Guadalajara, Zapopan",
    "home": "Mexico",
    "away": "South Korea"
  },
  {
    "id": "00000000-0000-4000-8000-000000000029",
    "matchNumber": 29,
    "group": "D",
    "date": "2026-06-19",
    "time": "12:00",
    "venue": "Seattle Stadium, Seattle",
    "home": "United States",
    "away": "Australia"
  },
  {
    "id": "00000000-0000-4000-8000-000000000030",
    "matchNumber": 30,
    "group": "D",
    "date": "2026-06-19",
    "time": "15:00",
    "venue": "San Francisco Bay Area Stadium, Santa Clara",
    "home": "Turkey",
    "away": "Paraguay"
  },
  {
    "id": "00000000-0000-4000-8000-000000000031",
    "matchNumber": 31,
    "group": "C",
    "date": "2026-06-19",
    "time": "18:00",
    "venue": "Boston Stadium, Foxborough",
    "home": "Scotland",
    "away": "Morocco"
  },
  {
    "id": "00000000-0000-4000-8000-000000000032",
    "matchNumber": 32,
    "group": "C",
    "date": "2026-06-19",
    "time": "21:00",
    "venue": "Philadelphia Stadium, Philadelphia",
    "home": "Brazil",
    "away": "Haiti"
  },
  {
    "id": "00000000-0000-4000-8000-000000000033",
    "matchNumber": 33,
    "group": "E",
    "date": "2026-06-20",
    "time": "12:00",
    "venue": "Toronto Stadium, Toronto",
    "home": "Germany",
    "away": "Ivory Coast"
  },
  {
    "id": "00000000-0000-4000-8000-000000000034",
    "matchNumber": 34,
    "group": "E",
    "date": "2026-06-20",
    "time": "15:00",
    "venue": "Kansas City Stadium, Kansas City",
    "home": "Ecuador",
    "away": "Curaçao"
  },
  {
    "id": "00000000-0000-4000-8000-000000000035",
    "matchNumber": 35,
    "group": "F",
    "date": "2026-06-20",
    "time": "18:00",
    "venue": "Houston Stadium, Houston",
    "home": "Netherlands",
    "away": "Sweden"
  },
  {
    "id": "00000000-0000-4000-8000-000000000036",
    "matchNumber": 36,
    "group": "F",
    "date": "2026-06-20",
    "time": "21:00",
    "venue": "Estadio Monterrey, Guadalupe",
    "home": "Tunisia",
    "away": "Japan"
  },
  {
    "id": "00000000-0000-4000-8000-000000000037",
    "matchNumber": 37,
    "group": "H",
    "date": "2026-06-21",
    "time": "12:00",
    "venue": "Atlanta Stadium, Atlanta",
    "home": "Spain",
    "away": "Saudi Arabia"
  },
  {
    "id": "00000000-0000-4000-8000-000000000038",
    "matchNumber": 38,
    "group": "G",
    "date": "2026-06-21",
    "time": "15:00",
    "venue": "Los Angeles Stadium, Inglewood",
    "home": "Belgium",
    "away": "Iran"
  },
  {
    "id": "00000000-0000-4000-8000-000000000039",
    "matchNumber": 39,
    "group": "H",
    "date": "2026-06-21",
    "time": "18:00",
    "venue": "Miami Stadium, Miami Gardens",
    "home": "Uruguay",
    "away": "Cape Verde"
  },
  {
    "id": "00000000-0000-4000-8000-000000000040",
    "matchNumber": 40,
    "group": "G",
    "date": "2026-06-21",
    "time": "21:00",
    "venue": "BC Place, Vancouver",
    "home": "New Zealand",
    "away": "Egypt"
  },
  {
    "id": "00000000-0000-4000-8000-000000000041",
    "matchNumber": 41,
    "group": "I",
    "date": "2026-06-22",
    "time": "12:00",
    "venue": "Philadelphia Stadium, Philadelphia",
    "home": "France",
    "away": "Iraq"
  },
  {
    "id": "00000000-0000-4000-8000-000000000042",
    "matchNumber": 42,
    "group": "I",
    "date": "2026-06-22",
    "time": "15:00",
    "venue": "New York New Jersey Stadium, East Rutherford",
    "home": "Norway",
    "away": "Senegal"
  },
  {
    "id": "00000000-0000-4000-8000-000000000043",
    "matchNumber": 43,
    "group": "J",
    "date": "2026-06-22",
    "time": "18:00",
    "venue": "Dallas Stadium, Arlington",
    "home": "Argentina",
    "away": "Austria"
  },
  {
    "id": "00000000-0000-4000-8000-000000000044",
    "matchNumber": 44,
    "group": "J",
    "date": "2026-06-22",
    "time": "21:00",
    "venue": "Kansas City Stadium, Kansas City",
    "home": "Jordan",
    "away": "Algeria"
  },
  {
    "id": "00000000-0000-4000-8000-000000000045",
    "matchNumber": 45,
    "group": "K",
    "date": "2026-06-23",
    "time": "12:00",
    "venue": "Boston Stadium, Foxborough",
    "home": "Portugal",
    "away": "Uzbekistan"
  },
  {
    "id": "00000000-0000-4000-8000-000000000046",
    "matchNumber": 46,
    "group": "K",
    "date": "2026-06-23",
    "time": "15:00",
    "venue": "Miami Stadium, Miami Gardens",
    "home": "Colombia",
    "away": "Congo DR"
  },
  {
    "id": "00000000-0000-4000-8000-000000000047",
    "matchNumber": 47,
    "group": "L",
    "date": "2026-06-23",
    "time": "18:00",
    "venue": "New York New Jersey Stadium, East Rutherford",
    "home": "England",
    "away": "Ghana"
  },
  {
    "id": "00000000-0000-4000-8000-000000000048",
    "matchNumber": 48,
    "group": "L",
    "date": "2026-06-23",
    "time": "21:00",
    "venue": "Atlanta Stadium, Atlanta",
    "home": "Panama",
    "away": "Croatia"
  },
  {
    "id": "00000000-0000-4000-8000-000000000049",
    "matchNumber": 49,
    "group": "A",
    "date": "2026-06-24",
    "time": "15:00",
    "venue": "Estadio Azteca, Mexico City",
    "home": "Czechia",
    "away": "Mexico"
  },
  {
    "id": "00000000-0000-4000-8000-000000000050",
    "matchNumber": 50,
    "group": "A",
    "date": "2026-06-24",
    "time": "15:00",
    "venue": "Estadio Monterrey, Guadalupe",
    "home": "South Africa",
    "away": "South Korea"
  },
  {
    "id": "00000000-0000-4000-8000-000000000051",
    "matchNumber": 51,
    "group": "B",
    "date": "2026-06-24",
    "time": "19:00",
    "venue": "BC Place, Vancouver",
    "home": "Switzerland",
    "away": "Canada"
  },
  {
    "id": "00000000-0000-4000-8000-000000000052",
    "matchNumber": 52,
    "group": "B",
    "date": "2026-06-24",
    "time": "19:00",
    "venue": "Boston Stadium, Foxborough",
    "home": "Bosnia and Herzegovina",
    "away": "Qatar"
  },
  {
    "id": "00000000-0000-4000-8000-000000000053",
    "matchNumber": 53,
    "group": "C",
    "date": "2026-06-24",
    "time": "22:00",
    "venue": "Miami Stadium, Miami Gardens",
    "home": "Scotland",
    "away": "Brazil"
  },
  {
    "id": "00000000-0000-4000-8000-000000000054",
    "matchNumber": 54,
    "group": "C",
    "date": "2026-06-24",
    "time": "22:00",
    "venue": "Atlanta Stadium, Atlanta",
    "home": "Morocco",
    "away": "Haiti"
  },
  {
    "id": "00000000-0000-4000-8000-000000000055",
    "matchNumber": 55,
    "group": "D",
    "date": "2026-06-25",
    "time": "14:00",
    "venue": "Los Angeles Stadium, Inglewood",
    "home": "Turkey",
    "away": "United States"
  },
  {
    "id": "00000000-0000-4000-8000-000000000056",
    "matchNumber": 56,
    "group": "D",
    "date": "2026-06-25",
    "time": "14:00",
    "venue": "San Francisco Bay Area Stadium, Santa Clara",
    "home": "Paraguay",
    "away": "Australia"
  },
  {
    "id": "00000000-0000-4000-8000-000000000057",
    "matchNumber": 57,
    "group": "E",
    "date": "2026-06-25",
    "time": "18:00",
    "venue": "Philadelphia Stadium, Philadelphia",
    "home": "Curaçao",
    "away": "Ivory Coast"
  },
  {
    "id": "00000000-0000-4000-8000-000000000058",
    "matchNumber": 58,
    "group": "E",
    "date": "2026-06-25",
    "time": "18:00",
    "venue": "New York New Jersey Stadium, East Rutherford",
    "home": "Ecuador",
    "away": "Germany"
  },
  {
    "id": "00000000-0000-4000-8000-000000000059",
    "matchNumber": 59,
    "group": "F",
    "date": "2026-06-25",
    "time": "21:00",
    "venue": "Dallas Stadium, Arlington",
    "home": "Japan",
    "away": "Sweden"
  },
  {
    "id": "00000000-0000-4000-8000-000000000060",
    "matchNumber": 60,
    "group": "F",
    "date": "2026-06-25",
    "time": "21:00",
    "venue": "Kansas City Stadium, Kansas City",
    "home": "Tunisia",
    "away": "Netherlands"
  },
  {
    "id": "00000000-0000-4000-8000-000000000061",
    "matchNumber": 61,
    "group": "G",
    "date": "2026-06-26",
    "time": "14:00",
    "venue": "Seattle Stadium, Seattle",
    "home": "Egypt",
    "away": "Iran"
  },
  {
    "id": "00000000-0000-4000-8000-000000000062",
    "matchNumber": 62,
    "group": "G",
    "date": "2026-06-26",
    "time": "14:00",
    "venue": "BC Place, Vancouver",
    "home": "New Zealand",
    "away": "Belgium"
  },
  {
    "id": "00000000-0000-4000-8000-000000000063",
    "matchNumber": 63,
    "group": "H",
    "date": "2026-06-26",
    "time": "18:00",
    "venue": "Houston Stadium, Houston",
    "home": "Cape Verde",
    "away": "Saudi Arabia"
  },
  {
    "id": "00000000-0000-4000-8000-000000000064",
    "matchNumber": 64,
    "group": "H",
    "date": "2026-06-26",
    "time": "18:00",
    "venue": "Estadio Guadalajara, Zapopan",
    "home": "Uruguay",
    "away": "Spain"
  },
  {
    "id": "00000000-0000-4000-8000-000000000065",
    "matchNumber": 65,
    "group": "I",
    "date": "2026-06-26",
    "time": "21:00",
    "venue": "Boston Stadium, Foxborough",
    "home": "Norway",
    "away": "France"
  },
  {
    "id": "00000000-0000-4000-8000-000000000066",
    "matchNumber": 66,
    "group": "I",
    "date": "2026-06-26",
    "time": "21:00",
    "venue": "Toronto Stadium, Toronto",
    "home": "Senegal",
    "away": "Iraq"
  },
  {
    "id": "00000000-0000-4000-8000-000000000067",
    "matchNumber": 67,
    "group": "J",
    "date": "2026-06-27",
    "time": "14:00",
    "venue": "Los Angeles Stadium, Inglewood",
    "home": "Jordan",
    "away": "Argentina"
  },
  {
    "id": "00000000-0000-4000-8000-000000000068",
    "matchNumber": 68,
    "group": "J",
    "date": "2026-06-27",
    "time": "14:00",
    "venue": "San Francisco Bay Area Stadium, Santa Clara",
    "home": "Algeria",
    "away": "Austria"
  },
  {
    "id": "00000000-0000-4000-8000-000000000069",
    "matchNumber": 69,
    "group": "K",
    "date": "2026-06-27",
    "time": "18:00",
    "venue": "Houston Stadium, Houston",
    "home": "Congo DR",
    "away": "Uzbekistan"
  },
  {
    "id": "00000000-0000-4000-8000-000000000070",
    "matchNumber": 70,
    "group": "K",
    "date": "2026-06-27",
    "time": "18:00",
    "venue": "Dallas Stadium, Arlington",
    "home": "Colombia",
    "away": "Portugal"
  },
  {
    "id": "00000000-0000-4000-8000-000000000071",
    "matchNumber": 71,
    "group": "L",
    "date": "2026-06-27",
    "time": "21:00",
    "venue": "Seattle Stadium, Seattle",
    "home": "Panama",
    "away": "England"
  },
  {
    "id": "00000000-0000-4000-8000-000000000072",
    "matchNumber": 72,
    "group": "L",
    "date": "2026-06-27",
    "time": "21:00",
    "venue": "Toronto Stadium, Toronto",
    "home": "Croatia",
    "away": "Ghana"
  }
];

export const MATCHES: Match[] = MATCH_DATA.map((match) => ({
  ...match,
  // Every seeded group-stage match is in June, when Eastern Time is UTC-4.
  kickoffAt: new Date(`${match.date}T${match.time}:00-04:00`).toISOString(),
}));
