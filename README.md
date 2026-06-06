# World Cup 2026 Predictor

A shared five-player World Cup group-stage predictor built with Next.js, Vercel, and Supabase.

## Features

- Open participant access without accounts or invite tokens
- Separate admin password and short-lived admin session
- Five selectable player score sheets
- Prediction editing automatically locks at each match's scheduled kickoff
- Admin-managed player names and official results
- Automatic scoring: 10 points exact, 5 points correct outcome
- Simulated tables for every player and official results
- Optimistic saves and 20-second cross-browser refresh
- Admin JSON export and destructive reset

## Local setup

1. Create a Supabase project.
2. Open the SQL editor and run the migrations in filename order:
   - [`202606060001_initial_schema.sql`](supabase/migrations/202606060001_initial_schema.sql)
   - [`202606060002_prediction_deadlines.sql`](supabase/migrations/202606060002_prediction_deadlines.sql)
3. Copy `.env.example` to `.env.local`.
4. Fill in the Supabase project URL and service-role key.
5. Generate the remaining credentials:

```bash
openssl rand -hex 32
node -e "console.log(require('bcryptjs').hashSync(process.argv[1], 12))" 'your-admin-password'
```

Use the random value for `SESSION_SECRET` and the bcrypt output for `ADMIN_PASSWORD_HASH`.

Then run:

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. The settings tab accepts the unhashed admin password used when generating `ADMIN_PASSWORD_HASH`.

## Vercel deployment

1. Push this directory to a Git repository and import it into Vercel as a Next.js project.
2. Add all five variables from `.env.example` to Production and Preview environments.
3. Deploy. No custom build configuration is required.
4. Share `https://YOUR_DOMAIN` with the participants.

`SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_PASSWORD_HASH`, and `SESSION_SECRET` are server-only. Never prefix them with `NEXT_PUBLIC_`.

## Database security

All application tables have Row Level Security enabled with no public policies. Browser clients cannot query Supabase directly. Next.js route handlers reject cross-origin mutations and use the service-role client server-side. Pool reads and prediction writes are intentionally public through the application; player names, official results, export, and reset remain protected by the signed admin session.

## Verification

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

The Supabase integration test is skipped unless `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are present in the environment. With those values configured, `npm test` also verifies the seeded pool, five players, and 72 matches.

## Data model

- `pools`: the single fixed private pool
- `players`: five ordered participant slots
- `matches`: the seeded 72-match group-stage schedule
- `predictions`: one optional score per player and match
- `match_results`: one admin-managed official score per match

The original standalone HTML file remains in the repository as a reference and is not used by the Next.js build.

Prediction deadlines use the `kickoff_at` timestamp generated in Supabase from
the displayed Eastern Time schedule. The API and a database trigger both reject
prediction inserts or updates at or after kickoff. Admin-managed official
results remain editable.
