# Date With Me ❤️

A cute, romantic, mobile-friendly date invitation web app built with Next.js 15, React, TypeScript, Tailwind CSS, Prisma, and Neon PostgreSQL.

## Features

- 5-step romantic invitation flow with progress indicator
- Playful "No" button that avoids the cursor on desktop
- Activity selection with animated cards
- Auto-save progress to PostgreSQL on each step
- Confetti and floating hearts on confirmation
- Dark mode support
- OpenGraph image for shareable links
- URL-safe custom invitation IDs

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion
- **Database:** PostgreSQL (Neon)
- **ORM:** Prisma
- **Validation:** Zod
- **Deployment:** Vercel

## Project Structure

```
├── app/
│   ├── invite/[id]/          # 5-step invitation flow
│   │   ├── page.tsx          # Step 1: Date invitation
│   │   ├── datetime/         # Step 2: Date & time
│   │   ├── activity/         # Step 3: Activity type
│   │   ├── activity-details/ # Step 4: Activity details
│   │   └── confirmation/     # Step 5: Thank you
│   ├── api/og/               # OpenGraph image generation
│   └── page.tsx              # Home — create invitation
├── components/               # UI components
├── lib/
│   ├── prisma.ts             # Prisma singleton client
│   ├── actions.ts            # Server actions
│   ├── validations.ts        # Zod schemas
│   └── activities.ts         # Activity mappings
└── prisma/
    ├── schema.prisma
    └── migrations/
```

## Local Development Setup

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm
- A [Neon](https://neon.tech) PostgreSQL database (free tier works)

### Step 1: Clone and install

```bash
cd DateWithMe
npm install
```

### Step 2: Set up Neon PostgreSQL

1. Go to [https://console.neon.tech](https://console.neon.tech) and create a free account
2. Create a new project (e.g. `date-with-me`)
3. Copy the **connection string** from the dashboard (Connection Details → Connection string)
4. It looks like:
   ```
   postgresql://user:password@ep-xxx.region.aws.neon.tech/neondb?sslmode=require
   ```

### Step 3: Configure environment variables

```bash
cp .env.example .env
```

Edit `.env`:

```env
DATABASE_URL="postgresql://user:password@ep-xxx.region.aws.neon.tech/neondb?sslmode=require"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### Step 4: Run database migration

```bash
npx prisma migrate deploy
```

For development with schema changes:

```bash
npm run db:migrate
```

Or push schema directly (dev only):

```bash
npm run db:push
```

### Step 5: Generate Prisma client

```bash
npx prisma generate
```

### Step 6: Start the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## User Flow

| Step | Route | Description |
|------|-------|-------------|
| 1 | `/invite/[id]` | "Will you go on a date with me?" |
| 2 | `/invite/[id]/datetime` | Date and time picker |
| 3 | `/invite/[id]/activity` | Choose activity type |
| 4 | `/invite/[id]/activity-details` | Choose specific option |
| 5 | `/invite/[id]/confirmation` | Thank you + summary |

### Creating invitations

- **Auto-generated ID:** Click "Create Invitation" on the home page
- **Custom ID:** Share `/invite/your-custom-id` — the record is created on first visit

## Database Schema

```prisma
model DateResponse {
  id             String    @id @default(cuid())
  accepted       Boolean   @default(false)
  dateTime       DateTime?
  activity       String?
  activityOption String?
  createdAt      DateTime  @default(now())
  updatedAt      DateTime  @updatedAt
}
```

## Server Actions

| Action | Description |
|--------|-------------|
| `createInvitation()` | Creates a new invitation with optional custom ID |
| `getInvitation(id)` | Fetches or creates invitation by ID |
| `updateInvitation(input)` | Updates invitation fields (auto-save) |

All actions use Zod validation.

## Deploy to Vercel

### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: Date With Me app"
git remote add origin https://github.com/your-username/date-with-me.git
git push -u origin main
```

### Step 2: Import to Vercel

1. Go to [https://vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Vercel auto-detects Next.js — no build config changes needed

### Step 3: Add environment variables in Vercel

In **Project Settings → Environment Variables**, add:

| Variable | Value |
|----------|-------|
| `DATABASE_URL` | Your Neon connection string |
| `NEXT_PUBLIC_APP_URL` | `https://your-app.vercel.app` |

### Step 4: Deploy

Vercel runs `npm run build` which includes `prisma generate`. After deploy, run migrations against production:

```bash
DATABASE_URL="your-production-url" npx prisma migrate deploy
```

Or add a build script that runs migrate deploy (Neon supports this on Vercel).

### Neon + Vercel integration

Neon offers a [Vercel integration](https://neon.tech/docs/guides/vercel) that auto-injects `DATABASE_URL` — recommended for production.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run db:migrate` | Run Prisma migrations (dev) |
| `npm run db:push` | Push schema to DB (dev) |
| `npm run db:studio` | Open Prisma Studio |

## License

MIT
