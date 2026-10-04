# Chennai Jothi Matrimony - Monorepo Platform

An authentic Tamil Matrimony application built with a modern monorepo architecture, featuring Thirukanitham Panchangam automatic horoscope calculation, dual Rasi & Navamsam chart generation, multi-step profile registration, and membership access control.

## Repository Architecture

```
jothi-matrimony/
├── apps/
│   ├── web/            # Next.js App Router Frontend
│   └── api/            # Node.js / NestJS API Backend
├── packages/
│   └── shared/         # Shared Horoscope Engine, Matchers, DTOs & Mock Data
├── supabase/
│   └── migrations/     # PostgreSQL Schemas, Tables & RLS Policies
├── src/                # Vite SPA Frontend (Dual App Support)
├── package.json
└── README.md
```

## Key Features

- **Thirukanitham Panchangam Engine**: Automatic planetary longitude calculation, Rasi (D1) & Navamsam (D9) chart auto-generation, Moon Sign (Rasi), Nakshatra & Padam, Lagnam, and Porutham matchmaking.
- **Registration Access Gate**: 
  - **Step 1**: Free Profile Registration
  - **Step 2**: ₹1,000 Registration Fee Payment (1-Year Membership)
  - **Step 3**: Full Alliance Profile & Contact Details Access
- **Dual South Indian Horoscope Charts**: Side-by-side Rasi (D1) & Navamsam (D9) visual chart display with Laknam indicators and planetary placement.
- **Dynamic Stats Dashboard**: Real-time counter metrics calculated directly from active database profiles.
- **Responsive Navigation**: Header layout optimized for mobile and desktop screens with seamless language toggling (Tamil / English).

## Getting Started

### Prerequisites
- Node.js >= 18.x
- npm >= 9.x

### Run Web Application (Next.js)
```bash
npm run dev
# or
npm run dev:web
```

### Run API Backend (NestJS)
```bash
npm run dev:api
```

### Build Workspace Packages & Next.js App
```bash
npm run build:web
```

### Push Changes to GitHub
```bash
git add .
git commit -m "feat: your commit message"
git push origin main
```
