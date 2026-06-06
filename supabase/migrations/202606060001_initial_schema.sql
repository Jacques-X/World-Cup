-- Generated seed values are sourced from the original dashboard.
create extension if not exists pgcrypto;

create table public.pools (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 100),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.players (
  id uuid primary key default gen_random_uuid(),
  pool_id uuid not null references public.pools(id) on delete cascade,
  slot smallint not null check (slot between 1 and 5),
  name text not null check (char_length(name) between 1 and 40),
  color text not null check (color in ('emerald', 'blue', 'indigo', 'amber', 'pink')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (pool_id, slot),
  unique (id, pool_id)
);

create table public.matches (
  id uuid primary key default gen_random_uuid(),
  pool_id uuid not null references public.pools(id) on delete cascade,
  match_number smallint not null check (match_number between 1 and 72),
  group_code char(1) not null check (group_code between 'A' and 'L'),
  match_date date not null,
  match_time time not null,
  venue text not null,
  home_team text not null,
  away_team text not null check (away_team <> home_team),
  unique (pool_id, match_number),
  unique (id, pool_id)
);

create table public.predictions (
  id uuid primary key default gen_random_uuid(),
  pool_id uuid not null references public.pools(id) on delete cascade,
  player_id uuid not null,
  match_id uuid not null,
  home_score smallint check (home_score between 0 and 99),
  away_score smallint check (away_score between 0 and 99),
  updated_at timestamptz not null default now(),
  foreign key (player_id, pool_id) references public.players(id, pool_id) on delete cascade,
  foreign key (match_id, pool_id) references public.matches(id, pool_id) on delete cascade,
  unique (pool_id, player_id, match_id)
);

create table public.match_results (
  id uuid primary key default gen_random_uuid(),
  pool_id uuid not null references public.pools(id) on delete cascade,
  match_id uuid not null,
  home_score smallint check (home_score between 0 and 99),
  away_score smallint check (away_score between 0 and 99),
  updated_at timestamptz not null default now(),
  foreign key (match_id, pool_id) references public.matches(id, pool_id) on delete cascade,
  unique (pool_id, match_id)
);

create index predictions_pool_id_idx on public.predictions(pool_id);
create index match_results_pool_id_idx on public.match_results(pool_id);

alter table public.pools enable row level security;
alter table public.players enable row level security;
alter table public.matches enable row level security;
alter table public.predictions enable row level security;
alter table public.match_results enable row level security;

-- No public policies are intentional: the Next.js server uses the service role.

insert into public.pools (id, name) values
  ('00000000-0000-4000-8000-000000000001', 'World Cup 2026 Predictor');

insert into public.players (id, pool_id, slot, name, color) values
  ('00000000-0000-4000-9000-000000000001', '00000000-0000-4000-8000-000000000001', 1, 'Player 1', 'emerald'),
  ('00000000-0000-4000-9000-000000000002', '00000000-0000-4000-8000-000000000001', 2, 'Player 2', 'blue'),
  ('00000000-0000-4000-9000-000000000003', '00000000-0000-4000-8000-000000000001', 3, 'Player 3', 'indigo'),
  ('00000000-0000-4000-9000-000000000004', '00000000-0000-4000-8000-000000000001', 4, 'Player 4', 'amber'),
  ('00000000-0000-4000-9000-000000000005', '00000000-0000-4000-8000-000000000001', 5, 'Player 5', 'pink');

insert into public.matches (id, pool_id, match_number, group_code, match_date, match_time, venue, home_team, away_team) values
  ('00000000-0000-4000-8000-000000000001', '00000000-0000-4000-8000-000000000001', 1, 'A', '2026-06-11', '14:00', 'Estadio Azteca, Mexico City', 'Mexico', 'South Africa'),
  ('00000000-0000-4000-8000-000000000002', '00000000-0000-4000-8000-000000000001', 2, 'A', '2026-06-11', '21:00', 'Estadio Guadalajara, Zapopan', 'South Korea', 'Czechia'),
  ('00000000-0000-4000-8000-000000000003', '00000000-0000-4000-8000-000000000001', 3, 'B', '2026-06-12', '14:00', 'Toronto Stadium, Toronto', 'Canada', 'Bosnia and Herzegovina'),
  ('00000000-0000-4000-8000-000000000004', '00000000-0000-4000-8000-000000000001', 4, 'D', '2026-06-12', '20:00', 'Los Angeles Stadium, Inglewood', 'United States', 'Paraguay'),
  ('00000000-0000-4000-8000-000000000005', '00000000-0000-4000-8000-000000000001', 5, 'B', '2026-06-13', '14:00', 'San Francisco Bay Area Stadium, Santa Clara', 'Qatar', 'Switzerland'),
  ('00000000-0000-4000-8000-000000000006', '00000000-0000-4000-8000-000000000001', 6, 'C', '2026-06-13', '17:00', 'New York New Jersey Stadium, East Rutherford', 'Brazil', 'Morocco'),
  ('00000000-0000-4000-8000-000000000007', '00000000-0000-4000-8000-000000000001', 7, 'C', '2026-06-13', '20:00', 'Boston Stadium, Foxborough', 'Haiti', 'Scotland'),
  ('00000000-0000-4000-8000-000000000008', '00000000-0000-4000-8000-000000000001', 8, 'D', '2026-06-13', '23:00', 'BC Place, Vancouver', 'Australia', 'Turkey'),
  ('00000000-0000-4000-8000-000000000009', '00000000-0000-4000-8000-000000000001', 9, 'E', '2026-06-14', '12:00', 'Houston Stadium, Houston', 'Germany', 'Curaçao'),
  ('00000000-0000-4000-8000-000000000010', '00000000-0000-4000-8000-000000000001', 10, 'F', '2026-06-14', '15:00', 'Dallas Stadium, Arlington', 'Netherlands', 'Japan'),
  ('00000000-0000-4000-8000-000000000011', '00000000-0000-4000-8000-000000000001', 11, 'E', '2026-06-14', '18:00', 'Philadelphia Stadium, Philadelphia', 'Ivory Coast', 'Ecuador'),
  ('00000000-0000-4000-8000-000000000012', '00000000-0000-4000-8000-000000000001', 12, 'F', '2026-06-14', '21:00', 'Estadio Monterrey, Guadalupe', 'Sweden', 'Tunisia'),
  ('00000000-0000-4000-8000-000000000013', '00000000-0000-4000-8000-000000000001', 13, 'H', '2026-06-15', '11:00', 'Atlanta Stadium, Atlanta', 'Spain', 'Cape Verde'),
  ('00000000-0000-4000-8000-000000000014', '00000000-0000-4000-8000-000000000001', 14, 'G', '2026-06-15', '14:00', 'Seattle Stadium, Seattle', 'Belgium', 'Egypt'),
  ('00000000-0000-4000-8000-000000000015', '00000000-0000-4000-8000-000000000001', 15, 'H', '2026-06-15', '17:00', 'Miami Stadium, Miami Gardens', 'Saudi Arabia', 'Uruguay'),
  ('00000000-0000-4000-8000-000000000016', '00000000-0000-4000-8000-000000000001', 16, 'G', '2026-06-15', '20:00', 'Los Angeles Stadium, Inglewood', 'Iran', 'New Zealand'),
  ('00000000-0000-4000-8000-000000000017', '00000000-0000-4000-8000-000000000001', 17, 'I', '2026-06-16', '14:00', 'New York New Jersey Stadium, East Rutherford', 'France', 'Senegal'),
  ('00000000-0000-4000-8000-000000000018', '00000000-0000-4000-8000-000000000001', 18, 'I', '2026-06-16', '17:00', 'Boston Stadium, Foxborough', 'Iraq', 'Norway'),
  ('00000000-0000-4000-8000-000000000019', '00000000-0000-4000-8000-000000000001', 19, 'J', '2026-06-16', '20:00', 'Kansas City Stadium, Kansas City', 'Argentina', 'Algeria'),
  ('00000000-0000-4000-8000-000000000020', '00000000-0000-4000-8000-000000000001', 20, 'J', '2026-06-16', '23:00', 'San Francisco Bay Area Stadium, Santa Clara', 'Austria', 'Jordan'),
  ('00000000-0000-4000-8000-000000000021', '00000000-0000-4000-8000-000000000001', 21, 'K', '2026-06-17', '12:00', 'Houston Stadium, Houston', 'Portugal', 'Congo DR'),
  ('00000000-0000-4000-8000-000000000022', '00000000-0000-4000-8000-000000000001', 22, 'L', '2026-06-17', '15:00', 'Dallas Stadium, Arlington', 'England', 'Croatia'),
  ('00000000-0000-4000-8000-000000000023', '00000000-0000-4000-8000-000000000001', 23, 'L', '2026-06-17', '18:00', 'Toronto Stadium, Toronto', 'Ghana', 'Panama'),
  ('00000000-0000-4000-8000-000000000024', '00000000-0000-4000-8000-000000000001', 24, 'K', '2026-06-17', '21:00', 'Estadio Azteca, Mexico City', 'Uzbekistan', 'Colombia'),
  ('00000000-0000-4000-8000-000000000025', '00000000-0000-4000-8000-000000000001', 25, 'A', '2026-06-18', '12:00', 'Atlanta Stadium, Atlanta', 'Czechia', 'South Africa'),
  ('00000000-0000-4000-8000-000000000026', '00000000-0000-4000-8000-000000000001', 26, 'B', '2026-06-18', '15:00', 'Los Angeles Stadium, Inglewood', 'Switzerland', 'Bosnia and Herzegovina'),
  ('00000000-0000-4000-8000-000000000027', '00000000-0000-4000-8000-000000000001', 27, 'B', '2026-06-18', '18:00', 'BC Place, Vancouver', 'Canada', 'Qatar'),
  ('00000000-0000-4000-8000-000000000028', '00000000-0000-4000-8000-000000000001', 28, 'A', '2026-06-18', '21:00', 'Estadio Guadalajara, Zapopan', 'Mexico', 'South Korea'),
  ('00000000-0000-4000-8000-000000000029', '00000000-0000-4000-8000-000000000001', 29, 'D', '2026-06-19', '12:00', 'Seattle Stadium, Seattle', 'United States', 'Australia'),
  ('00000000-0000-4000-8000-000000000030', '00000000-0000-4000-8000-000000000001', 30, 'D', '2026-06-19', '15:00', 'San Francisco Bay Area Stadium, Santa Clara', 'Turkey', 'Paraguay'),
  ('00000000-0000-4000-8000-000000000031', '00000000-0000-4000-8000-000000000001', 31, 'C', '2026-06-19', '18:00', 'Boston Stadium, Foxborough', 'Scotland', 'Morocco'),
  ('00000000-0000-4000-8000-000000000032', '00000000-0000-4000-8000-000000000001', 32, 'C', '2026-06-19', '21:00', 'Philadelphia Stadium, Philadelphia', 'Brazil', 'Haiti'),
  ('00000000-0000-4000-8000-000000000033', '00000000-0000-4000-8000-000000000001', 33, 'E', '2026-06-20', '12:00', 'Toronto Stadium, Toronto', 'Germany', 'Ivory Coast'),
  ('00000000-0000-4000-8000-000000000034', '00000000-0000-4000-8000-000000000001', 34, 'E', '2026-06-20', '15:00', 'Kansas City Stadium, Kansas City', 'Ecuador', 'Curaçao'),
  ('00000000-0000-4000-8000-000000000035', '00000000-0000-4000-8000-000000000001', 35, 'F', '2026-06-20', '18:00', 'Houston Stadium, Houston', 'Netherlands', 'Sweden'),
  ('00000000-0000-4000-8000-000000000036', '00000000-0000-4000-8000-000000000001', 36, 'F', '2026-06-20', '21:00', 'Estadio Monterrey, Guadalupe', 'Tunisia', 'Japan'),
  ('00000000-0000-4000-8000-000000000037', '00000000-0000-4000-8000-000000000001', 37, 'H', '2026-06-21', '12:00', 'Atlanta Stadium, Atlanta', 'Spain', 'Saudi Arabia'),
  ('00000000-0000-4000-8000-000000000038', '00000000-0000-4000-8000-000000000001', 38, 'G', '2026-06-21', '15:00', 'Los Angeles Stadium, Inglewood', 'Belgium', 'Iran'),
  ('00000000-0000-4000-8000-000000000039', '00000000-0000-4000-8000-000000000001', 39, 'H', '2026-06-21', '18:00', 'Miami Stadium, Miami Gardens', 'Uruguay', 'Cape Verde'),
  ('00000000-0000-4000-8000-000000000040', '00000000-0000-4000-8000-000000000001', 40, 'G', '2026-06-21', '21:00', 'BC Place, Vancouver', 'New Zealand', 'Egypt'),
  ('00000000-0000-4000-8000-000000000041', '00000000-0000-4000-8000-000000000001', 41, 'I', '2026-06-22', '12:00', 'Philadelphia Stadium, Philadelphia', 'France', 'Iraq'),
  ('00000000-0000-4000-8000-000000000042', '00000000-0000-4000-8000-000000000001', 42, 'I', '2026-06-22', '15:00', 'New York New Jersey Stadium, East Rutherford', 'Norway', 'Senegal'),
  ('00000000-0000-4000-8000-000000000043', '00000000-0000-4000-8000-000000000001', 43, 'J', '2026-06-22', '18:00', 'Dallas Stadium, Arlington', 'Argentina', 'Austria'),
  ('00000000-0000-4000-8000-000000000044', '00000000-0000-4000-8000-000000000001', 44, 'J', '2026-06-22', '21:00', 'Kansas City Stadium, Kansas City', 'Jordan', 'Algeria'),
  ('00000000-0000-4000-8000-000000000045', '00000000-0000-4000-8000-000000000001', 45, 'K', '2026-06-23', '12:00', 'Boston Stadium, Foxborough', 'Portugal', 'Uzbekistan'),
  ('00000000-0000-4000-8000-000000000046', '00000000-0000-4000-8000-000000000001', 46, 'K', '2026-06-23', '15:00', 'Miami Stadium, Miami Gardens', 'Colombia', 'Congo DR'),
  ('00000000-0000-4000-8000-000000000047', '00000000-0000-4000-8000-000000000001', 47, 'L', '2026-06-23', '18:00', 'New York New Jersey Stadium, East Rutherford', 'England', 'Ghana'),
  ('00000000-0000-4000-8000-000000000048', '00000000-0000-4000-8000-000000000001', 48, 'L', '2026-06-23', '21:00', 'Atlanta Stadium, Atlanta', 'Panama', 'Croatia'),
  ('00000000-0000-4000-8000-000000000049', '00000000-0000-4000-8000-000000000001', 49, 'A', '2026-06-24', '15:00', 'Estadio Azteca, Mexico City', 'Czechia', 'Mexico'),
  ('00000000-0000-4000-8000-000000000050', '00000000-0000-4000-8000-000000000001', 50, 'A', '2026-06-24', '15:00', 'Estadio Monterrey, Guadalupe', 'South Africa', 'South Korea'),
  ('00000000-0000-4000-8000-000000000051', '00000000-0000-4000-8000-000000000001', 51, 'B', '2026-06-24', '19:00', 'BC Place, Vancouver', 'Switzerland', 'Canada'),
  ('00000000-0000-4000-8000-000000000052', '00000000-0000-4000-8000-000000000001', 52, 'B', '2026-06-24', '19:00', 'Boston Stadium, Foxborough', 'Bosnia and Herzegovina', 'Qatar'),
  ('00000000-0000-4000-8000-000000000053', '00000000-0000-4000-8000-000000000001', 53, 'C', '2026-06-24', '22:00', 'Miami Stadium, Miami Gardens', 'Scotland', 'Brazil'),
  ('00000000-0000-4000-8000-000000000054', '00000000-0000-4000-8000-000000000001', 54, 'C', '2026-06-24', '22:00', 'Atlanta Stadium, Atlanta', 'Morocco', 'Haiti'),
  ('00000000-0000-4000-8000-000000000055', '00000000-0000-4000-8000-000000000001', 55, 'D', '2026-06-25', '14:00', 'Los Angeles Stadium, Inglewood', 'Turkey', 'United States'),
  ('00000000-0000-4000-8000-000000000056', '00000000-0000-4000-8000-000000000001', 56, 'D', '2026-06-25', '14:00', 'San Francisco Bay Area Stadium, Santa Clara', 'Paraguay', 'Australia'),
  ('00000000-0000-4000-8000-000000000057', '00000000-0000-4000-8000-000000000001', 57, 'E', '2026-06-25', '18:00', 'Philadelphia Stadium, Philadelphia', 'Curaçao', 'Ivory Coast'),
  ('00000000-0000-4000-8000-000000000058', '00000000-0000-4000-8000-000000000001', 58, 'E', '2026-06-25', '18:00', 'New York New Jersey Stadium, East Rutherford', 'Ecuador', 'Germany'),
  ('00000000-0000-4000-8000-000000000059', '00000000-0000-4000-8000-000000000001', 59, 'F', '2026-06-25', '21:00', 'Dallas Stadium, Arlington', 'Japan', 'Sweden'),
  ('00000000-0000-4000-8000-000000000060', '00000000-0000-4000-8000-000000000001', 60, 'F', '2026-06-25', '21:00', 'Kansas City Stadium, Kansas City', 'Tunisia', 'Netherlands'),
  ('00000000-0000-4000-8000-000000000061', '00000000-0000-4000-8000-000000000001', 61, 'G', '2026-06-26', '14:00', 'Seattle Stadium, Seattle', 'Egypt', 'Iran'),
  ('00000000-0000-4000-8000-000000000062', '00000000-0000-4000-8000-000000000001', 62, 'G', '2026-06-26', '14:00', 'BC Place, Vancouver', 'New Zealand', 'Belgium'),
  ('00000000-0000-4000-8000-000000000063', '00000000-0000-4000-8000-000000000001', 63, 'H', '2026-06-26', '18:00', 'Houston Stadium, Houston', 'Cape Verde', 'Saudi Arabia'),
  ('00000000-0000-4000-8000-000000000064', '00000000-0000-4000-8000-000000000001', 64, 'H', '2026-06-26', '18:00', 'Estadio Guadalajara, Zapopan', 'Uruguay', 'Spain'),
  ('00000000-0000-4000-8000-000000000065', '00000000-0000-4000-8000-000000000001', 65, 'I', '2026-06-26', '21:00', 'Boston Stadium, Foxborough', 'Norway', 'France'),
  ('00000000-0000-4000-8000-000000000066', '00000000-0000-4000-8000-000000000001', 66, 'I', '2026-06-26', '21:00', 'Toronto Stadium, Toronto', 'Senegal', 'Iraq'),
  ('00000000-0000-4000-8000-000000000067', '00000000-0000-4000-8000-000000000001', 67, 'J', '2026-06-27', '14:00', 'Los Angeles Stadium, Inglewood', 'Jordan', 'Argentina'),
  ('00000000-0000-4000-8000-000000000068', '00000000-0000-4000-8000-000000000001', 68, 'J', '2026-06-27', '14:00', 'San Francisco Bay Area Stadium, Santa Clara', 'Algeria', 'Austria'),
  ('00000000-0000-4000-8000-000000000069', '00000000-0000-4000-8000-000000000001', 69, 'K', '2026-06-27', '18:00', 'Houston Stadium, Houston', 'Congo DR', 'Uzbekistan'),
  ('00000000-0000-4000-8000-000000000070', '00000000-0000-4000-8000-000000000001', 70, 'K', '2026-06-27', '18:00', 'Dallas Stadium, Arlington', 'Colombia', 'Portugal'),
  ('00000000-0000-4000-8000-000000000071', '00000000-0000-4000-8000-000000000001', 71, 'L', '2026-06-27', '21:00', 'Seattle Stadium, Seattle', 'Panama', 'England'),
  ('00000000-0000-4000-8000-000000000072', '00000000-0000-4000-8000-000000000001', 72, 'L', '2026-06-27', '21:00', 'Toronto Stadium, Toronto', 'Croatia', 'Ghana');
