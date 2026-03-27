# 🏖️ Book Zambales

> A tourism booking and listing marketplace for Zambales, Philippines.
> Hosts list resorts, activities, hiking trips, and tour packages. Travelers browse, filter, and send booking requests.

---

## 🛠 Tech Stack

| Layer      | Technology              |
| ---------- | ----------------------- |
| Framework  | Next.js 16 (App Router) |
| Database   | Supabase (PostgreSQL)   |
| Auth       | Supabase Auth           |
| Storage    | Supabase Storage        |
| Styling    | Tailwind CSS            |
| Validation | Zod                     |
| Deployment | Vercel                  |

---

## ✨ Features (MVP)

- 🔐 User and host authentication (email/password)
- 🏕️ Public listings: resorts, activities, hiking, tours, services
- 🔍 Search and filter by category, location, and price range
- 🖼️ Listing detail pages with image gallery, inclusions, and pricing
- 🧑‍💼 Host dashboard: create, edit, delete listings + image uploads
- 📩 Booking inquiry form — no account required to inquire
- 📋 Inquiry management for hosts (view, respond, update status)
- 📱 Mobile-responsive UI

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com) account
- A [Vercel](https://vercel.com) account (for deployment)

### 1. Clone the repository

```bash
git clone https://github.com/coffee-sprinkler/book-zambales.git
cd book-zambales
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

> ⚠️ Never expose `SUPABASE_SERVICE_ROLE_KEY` to the client. Server-side only.

### 4. Set up the Supabase database

In your Supabase project, open the **SQL Editor** and run the following in order:

#### Enum types

```sql
CREATE TYPE user_role AS ENUM ('user', 'host', 'admin');
CREATE TYPE listing_category AS ENUM ('resort', 'activity', 'hiking', 'tour_package', 'service', 'destination');
CREATE TYPE listing_status AS ENUM ('draft', 'active', 'archived');
CREATE TYPE inquiry_status AS ENUM ('pending', 'responded', 'confirmed', 'cancelled');
```

#### Tables

```sql
-- Profiles (extends auth.users)
CREATE TABLE profiles (
  id           UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role         user_role NOT NULL DEFAULT 'traveler',
  full_name    TEXT,
  avatar_url   TEXT,
  phone        TEXT,
  bio          TEXT,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Listings
CREATE TABLE listings (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  host_id       UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title         TEXT NOT NULL,
  slug          TEXT UNIQUE NOT NULL,
  category      listing_category NOT NULL,
  description   TEXT,
  inclusions    TEXT,
  location      TEXT NOT NULL,
  price_from    NUMERIC(10, 2),
  price_to      NUMERIC(10, 2),
  status        listing_status NOT NULL DEFAULT 'draft',
  is_featured   BOOLEAN DEFAULT FALSE,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Listing images
CREATE TABLE listing_images (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id   UUID NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
  url          TEXT NOT NULL,
  is_cover     BOOLEAN DEFAULT FALSE,
  sort_order   INT DEFAULT 0,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Inquiries (booking requests)
CREATE TABLE inquiries (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id     UUID NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
  traveler_id    UUID REFERENCES profiles(id) ON DELETE SET NULL,
  guest_name     TEXT NOT NULL,
  guest_email    TEXT NOT NULL,
  guest_phone    TEXT,
  message        TEXT,
  check_in       DATE,
  check_out      DATE,
  pax_count      INT DEFAULT 1,
  status         inquiry_status NOT NULL DEFAULT 'pending',
  host_notes     TEXT,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

#### Indexes

```sql
CREATE INDEX idx_profiles_role             ON profiles(role);
CREATE INDEX idx_listings_host_id          ON listings(host_id);
CREATE INDEX idx_listings_category         ON listings(category);
CREATE INDEX idx_listings_status           ON listings(status);
CREATE INDEX idx_listings_location         ON listings(location);
CREATE INDEX idx_listings_slug             ON listings(slug);
CREATE INDEX idx_listing_images_listing_id ON listing_images(listing_id);
CREATE INDEX idx_inquiries_listing_id      ON inquiries(listing_id);
CREATE INDEX idx_inquiries_traveler_id     ON inquiries(traveler_id);
CREATE INDEX idx_inquiries_status          ON inquiries(status);
```

#### Auto-create profile on signup (trigger)

```sql
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE handle_new_user();
```

#### RLS Policies

```sql
ALTER TABLE listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE listing_images ENABLE ROW LEVEL SECURITY;

-- Public can read active listings
CREATE POLICY "public read active listings"
  ON listings FOR SELECT USING (status = 'active');

-- Hosts manage their own listings
CREATE POLICY "host manage own listings"
  ON listings FOR ALL USING (host_id = auth.uid());

-- Hosts see inquiries for their listings
CREATE POLICY "host see own inquiries"
  ON inquiries FOR SELECT
  USING (listing_id IN (SELECT id FROM listings WHERE host_id = auth.uid()));

-- Anyone can submit an inquiry
CREATE POLICY "anyone can create inquiry"
  ON inquiries FOR INSERT WITH CHECK (true);
```

### 5. Set up Supabase Storage

In your Supabase project:

1. Go to **Storage** → Create a new bucket named `listing-images`
2. Set the bucket to **Public**

### 6. Generate TypeScript types

```bash
npx supabase gen types typescript --project-id your_project_id > types/supabase.ts
```

> Re-run this every time you change the database schema.

### 7. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
book-zambales/
├── app/
│   ├── (public)/           ← Public-facing pages
│   │   ├── page.tsx        ← Home
│   │   ├── listings/
│   │   │   ├── page.tsx    ← Browse listings
│   │   │   └── [slug]/     ← Listing detail
│   │   ├── login/
│   │   └── signup/
│   ├── (dashboard)/        ← Auth-protected pages
│   │   ├── layout.tsx      ← Auth guard
│   │   └── dashboard/
│   │       ├── listings/   ← Manage listings
│   │       └── inquiries/  ← View booking requests
│   └── layout.tsx
├── actions/                ← Next.js Server Actions
├── components/             ← UI components
│   ├── ui/                 ← Generic (Button, Input, Modal)
│   ├── layout/             ← Navbar, Footer, Container
│   ├── listings/           ← Listing-specific components
│   ├── bookings/           ← Inquiry form and cards
│   └── dashboard/          ← Host dashboard components
├── hooks/                  ← Custom React hooks
├── lib/
│   └── supabase/           ← Supabase server + client setup
├── services/               ← Data fetching logic
├── validations/            ← Zod schemas
├── types/                  ← TypeScript types (incl. generated)
├── constants/              ← Routes, config, categories
├── utils/                  ← Pure helper functions
└── middleware.ts            ← Auth route protection
```

---

## 👥 User Roles

| Role         | Permissions                                                  |
| ------------ | ------------------------------------------------------------ |
| **Guest**    | Browse and search listings, submit inquiries                 |
| **Traveler** | All guest permissions + profile management                   |
| **Host**     | Create and manage listings, view and respond to inquiries    |
| **Admin**    | Full access — manage all users, listings, and featured slots |

---

## 🗺️ Roadmap

### ✅ MVP (Current)

- Auth, listings CRUD, inquiry system, host dashboard

### 🔜 Phase 2

- [ ] Email notifications on new inquiry (Resend)
- [ ] Reviews and ratings
- [ ] Availability calendar
- [ ] Real-time inquiry notifications (Supabase Realtime)
- [ ] Admin dashboard

### 🔮 Phase 3

- [ ] Online payments (PayMongo)
- [ ] In-app messaging
- [ ] Map-based search (Google Maps / Mapbox)
- [ ] Featured/paid listings
- [ ] Mobile app (React Native / Expo)

---

## 🌐 Deployment

This project is deployed on **Vercel** with **Supabase** as the backend.

1. Push to GitHub
2. Import the repo on [vercel.com](https://vercel.com)
3. Add your environment variables in Vercel project settings
4. Deploy — auto-deploys on every push to `main`

For the Supabase Auth config:

- Set **Site URL** to your production domain
- Add your production domain to **Redirect URLs**

---

## 🤝 Contributing

This is currently a solo project. If you'd like to contribute or report issues, open an issue or pull request.

---

## 📄 License

MIT — feel free to use this as a base for your own regional tourism marketplace.

---

> Built for Zambales 🌊 — by a developer who wants to see local tourism thrive online.
