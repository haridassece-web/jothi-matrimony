# Jothi Matrimony - Monorepo Platform

A high-performance Tamil Matrimony application built with a modern Monorepo architecture.

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
├── package.json
└── README.md
```

## Getting Started

### Prerequisites
- Node.js >= 18.x
- npm >= 9.x

### Run Web Application (Next.js)
```bash
npm run dev:web
```

### Run API Backend (NestJS)
```bash
npm run dev:api
```

### Build Workspace Packages
```bash
npm run build
```
