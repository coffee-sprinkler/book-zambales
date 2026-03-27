# Book Zambales — Full Project Plan

> Tourism booking and listing marketplace for Zambales, Philippines
> Stack: Next.js 14 · Supabase · Tailwind CSS

---

## 1. Product Overview

### What It Does

- Public marketplace for tourism listings in Zambales
- Hosts list resorts, activities, hiking trips, services, and tour packages
- Travelers browse, filter, and send booking requests
- Hosts manage listings and respond to inquiries manually

### Who Uses It

| Role     | Description                                     |
| -------- | ----------------------------------------------- |
| Traveler | Browses listings, sends booking requests        |
| Host     | Creates and manages listings, handles inquiries |
| Admin    | Manages users, listings, featured slots         |
| Guest    | Browses publicly, cannot book                   |

### Core Value

- For **travelers**: discover and book Zambales experiences in one place
- For **hosts**: free or low-cost way to reach more tourists online
- For **the region**: digital infrastructure for Zambales tourism

---

## 2. MVP Scope Definition

### ✅ Included in MVP

- User and host registration + login (Supabase Auth)
- Public listing pages (resorts, activities, hiking, tours, services)
- Search by category, location keyword, price range
- Listing detail page (images, description, inclusions, pricing)
- Host dashboard: create, edit, delete listings + upload images
- Booking inquiry form (name, email, dates, message)
- Inquiry management for hosts (view, mark handled)
- Basic mobile-responsive UI

### ❌ Excluded from MVP

- Online payments
- Reviews and ratings
- Availability calendar
- Messaging system
- Map-based search
- Featured/paid listings
- Admin dashboard UI
- Email notifications (optional stretch goal)

---

## 3. System Architecture

### Frontend Pages

```
/ (Home)                  → hero, categories, featured listings
/listings                 → browse + filter all listings
/listings/[slug]          → listing detail page
/host/register            → host signup
/dashboard                → host dashboard (listings overview)
/dashboard/listings/new   → create listing form
/dashboard/listings/[id]  → edit listing form
/dashboard/inquiries      → view all booking requests
/login                    → Supabase Auth login
/signup                   → Supabase Auth signup
/profile                  → traveler profile settings
```

### Key Components

```
components/
├── listings/
│   ├── ListingCard.tsx
│   ├── ListingGrid.tsx
│   ├── ListingFilters.tsx
│   └── ListingDetail.tsx
├── bookings/
│   ├── InquiryForm.tsx
│   └── InquiryCard.tsx
├── dashboard/
│   ├── ListingForm.tsx
│   ├── ImageUploader.tsx
│   └── InquiryTable.tsx
├── ui/
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Modal.tsx
│   └── Badge.tsx
└── layout/
    ├── Navbar.tsx
    ├── Footer.tsx
    └── Container.tsx
```

### Backend — Supabase

| Service      | Usage                                     |
| ------------ | ----------------------------------------- |
| **Auth**     | Email/password + optional social login    |
| **Database** | PostgreSQL — listings, bookings, profiles |
| **Storage**  | Listing images bucket (public CDN)        |
| **RLS**      | Row Level Security per role               |

### Server Actions Structure

```
actions/
├── listingActions.ts     → create, update, delete listing
├── bookingActions.ts     → submit inquiry, update status
├── profileActions.ts     → update user/host profile
└── uploadActions.ts      → image upload to Supabase storage
```

---

## 4. Supabase Database Design

### Enum Types

```sql
-- User roles
CREATE TYPE user_role AS ENUM ('traveler', 'host', 'admin');

-- Listing categories
CREATE TYPE listing_category AS ENUM (
  'resort',
  'activity',
  'hiking',
  'tour_package',
  'service'
);

-- Listing status
CREATE TYPE listing_status AS ENUM ('draft', 'active', 'archived');

-- Inquiry/booking status
CREATE TYPE inquiry_status AS ENUM ('pending', 'responded', 'confirmed', 'cancelled');
```

---

### Table: `profiles`

> Extends Supabase `auth.users`. Created automatically on user signup via trigger.

```sql
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

-- Index
CREATE INDEX idx_profiles_role ON profiles(role);
```

**Why:** Supabase Auth only stores email. This table stores display info and role.
**Link:** `profiles.id` → `auth.users.id` (1:1)

---

### Table: `listings`

> Core table. Each row is one listing created by a host.

```sql
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

-- Indexes
CREATE INDEX idx_listings_host_id   ON listings(host_id);
CREATE INDEX idx_listings_category  ON listings(category);
CREATE INDEX idx_listings_status    ON listings(status);
CREATE INDEX idx_listings_location  ON listings(location);
CREATE INDEX idx_listings_slug      ON listings(slug);
```

**Why:** Central table for all tourism listings.
**Link:** `host_id` → `profiles.id` (many listings per host)

---

### Table: `listing_images`

> Stores image URLs for each listing. Supports multiple images per listing.

```sql
CREATE TABLE listing_images (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id   UUID NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
  url          TEXT NOT NULL,
  is_cover     BOOLEAN DEFAULT FALSE,
  sort_order   INT DEFAULT 0,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index
CREATE INDEX idx_listing_images_listing_id ON listing_images(listing_id);
```

**Why:** One listing can have many images. Keeps `listings` table clean.
**Link:** `listing_id` → `listings.id` (1:many)

---

### Table: `inquiries`

> Booking requests sent by travelers to hosts.

```sql
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

-- Indexes
CREATE INDEX idx_inquiries_listing_id  ON inquiries(listing_id);
CREATE INDEX idx_inquiries_traveler_id ON inquiries(traveler_id);
CREATE INDEX idx_inquiries_status      ON inquiries(status);
```

**Why:** Tracks all booking requests. Guests can inquire without an account (`traveler_id` nullable).
**Links:** `listing_id` → `listings.id`, `traveler_id` → `profiles.id`

---

### Relationships Summary

```
auth.users
  └── profiles (1:1)
        └── listings (1:many via host_id)
              └── listing_images (1:many)
              └── inquiries (1:many)
                    └── profiles (optional traveler_id)
```

---

### RLS Policies (Key Rules)

```sql
-- listings: anyone can read active listings
CREATE POLICY "public read active listings"
  ON listings FOR SELECT
  USING (status = 'active');

-- listings: host can manage own listings
CREATE POLICY "host manage own listings"
  ON listings FOR ALL
  USING (host_id = auth.uid());

-- inquiries: host sees inquiries for their listings
CREATE POLICY "host see own inquiries"
  ON inquiries FOR SELECT
  USING (
    listing_id IN (
      SELECT id FROM listings WHERE host_id = auth.uid()
    )
  );

-- inquiries: anyone can insert (even guests)
CREATE POLICY "anyone can create inquiry"
  ON inquiries FOR INSERT
  WITH CHECK (true);
```

---

### Auto-create Profile on Signup (Trigger)

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

---

## 5. User Roles and Permissions

| Action              | Guest | Traveler | Host | Admin |
| ------------------- | ----- | -------- | ---- | ----- |
| Browse listings     | ✅    | ✅       | ✅   | ✅    |
| Send inquiry        | ✅    | ✅       | ✅   | ✅    |
| Save favorites      | ❌    | ✅       | ✅   | ✅    |
| Create listing      | ❌    | ❌       | ✅   | ✅    |
| Edit own listing    | ❌    | ❌       | ✅   | ✅    |
| View own inquiries  | ❌    | ✅       | ✅   | ✅    |
| Manage all listings | ❌    | ❌       | ❌   | ✅    |
| Feature a listing   | ❌    | ❌       | ❌   | ✅    |

**Role assignment:** Set in `profiles.role`. Default is `traveler`. Hosts must register with host intent (set role to `host` on signup).

---

## 6. Feature Breakdown

### 6.1 Authentication

**UI:** Login page, Signup page, role selection on signup (traveler vs host)
**Backend:**

- Supabase Auth email/password
- Trigger creates `profiles` row on signup
- Middleware checks session and role for protected routes

**Edge cases:**

- Host accessing traveler-only pages → redirect to dashboard
- Unauthenticated user trying to access dashboard → redirect to login
- Duplicate email → Supabase returns error, show user-friendly message

---

### 6.2 Public Listings

**UI:** Grid of `ListingCard` components with image, title, category badge, price from
**Backend:**

- Query `listings` where `status = 'active'`
- Join `listing_images` where `is_cover = true`
- Paginate with `.range()`

**Edge cases:**

- No listings yet → show empty state with CTA
- Image fails to load → fallback placeholder image

---

### 6.3 Search and Filters

**UI:** Filter bar with category dropdown, location text input, price range slider
**Backend:**

- Supabase query with conditional `.eq()`, `.ilike()`, `.gte()`, `.lte()`
- All filters are optional — build query dynamically

```ts
let query = supabase
  .from('listings')
  .select('*, listing_images(url, is_cover)')
  .eq('status', 'active');
if (category) query = query.eq('category', category);
if (location) query = query.ilike('location', `%${location}%`);
if (priceMin) query = query.gte('price_from', priceMin);
if (priceMax) query = query.lte('price_from', priceMax);
```

**Edge cases:**

- No results → show "No listings found" with reset filters button
- Invalid price range (min > max) → validate before querying

---

### 6.4 Listing Detail Page

**UI:** Image gallery, title, category, location, price range, description, inclusions, inquiry CTA
**Backend:**

- Fetch by `slug` from `listings`
- Fetch all `listing_images` for that listing
- Render with `generateStaticParams` for SEO (or ISR)

**Edge cases:**

- Listing not found → show 404
- No images → show placeholder
- Listing archived → redirect to /listings

---

### 6.5 Host Dashboard — Listings

**UI:** Table of host's listings with status badges, edit/delete actions, "New Listing" button
**Backend:**

- Query `listings` where `host_id = auth.uid()`
- Delete uses soft delete (set status to 'archived') — optional but safer

**Edge cases:**

- Host has no listings yet → show empty state with prompt to create first listing
- Delete confirmation modal before permanent delete

---

### 6.6 Create / Edit Listing

**UI:** Multi-section form: basic info → description → images → pricing → publish
**Backend:**

- Server action `createListing()` / `updateListing()`
- Validate with Zod before DB insert
- Generate slug from title using `slugify`
- Upload images to Supabase Storage bucket `listing-images`
- Insert image URLs into `listing_images` table

**Edge cases:**

- Duplicate slug → append random suffix
- Image upload fails → show error, don't save listing yet
- Max image limit (suggest 10) → validate on client

---

### 6.7 Booking Inquiry Form

**UI:** Modal or section on listing detail: name, email, phone, message, check-in/out, pax count
**Backend:**

- Server action `submitInquiry()`
- Insert into `inquiries` table
- No auth required (guest inquiries allowed)
- Send confirmation email via Resend (optional stretch)

**Edge cases:**

- Same user sending duplicate inquiries → allow, no dedup
- Invalid email format → Zod validation
- Listing archived mid-session → show error on submit

---

### 6.8 Host Inquiry Management

**UI:** Table of inquiries with guest info, dates, status dropdown
**Backend:**

- Query `inquiries` joined with `listings` where `listings.host_id = auth.uid()`
- Host can update `status` and add `host_notes`

**Edge cases:**

- Inquiry for deleted listing → still show with listing name cached
- No inquiries → empty state

---

## 7. Step-by-Step Development Plan

### Phase 1 — Foundation (Days 1–5)

- [ ] Initialize Next.js 14 project with Tailwind
- [ ] Set up Supabase project, get keys
- [ ] Create all DB tables + enums + RLS + trigger
- [ ] Generate Supabase types: `npx supabase gen types typescript`
- [ ] Set up Supabase client (server + browser)
- [ ] Set up middleware for auth protection
- [ ] Build Navbar, Footer, Container layout components

### Phase 2 — Auth (Days 6–8)

- [ ] Build `/signup` page with role selection (traveler vs host)
- [ ] Build `/login` page
- [ ] Confirm profile trigger works on signup
- [ ] Protect `/dashboard` routes with middleware

### Phase 3 — Host Dashboard + Listings CRUD (Days 9–16)

- [ ] Build `/dashboard` page (listing overview table)
- [ ] Build listing create form + `createListing` server action
- [ ] Build image uploader → Supabase Storage
- [ ] Build listing edit form + `updateListing` action
- [ ] Build delete/archive listing action
- [ ] Test full CRUD flow

### Phase 4 — Public Listings (Days 17–22)

- [ ] Build `/listings` page with ListingGrid + ListingFilters
- [ ] Build `/listings/[slug]` detail page
- [ ] Connect image gallery, inclusions, pricing display
- [ ] Add category + location + price filters

### Phase 5 — Inquiry System (Days 23–27)

- [ ] Build InquiryForm component on listing detail page
- [ ] Build `submitInquiry` server action
- [ ] Build `/dashboard/inquiries` page for hosts
- [ ] Host can update inquiry status + add notes

### Phase 6 — Polish + Launch (Days 28–35)

- [ ] Add loading states, error handling, empty states
- [ ] SEO: meta tags, OG images per listing
- [ ] Mobile responsiveness check
- [ ] Seed real listings from local hosts
- [ ] Deploy to Vercel + configure production env vars
- [ ] Final testing + bug fixes

---

## 8. Folder Structure

```
book-zambales/
├── app/
│   ├── (public)/
│   │   ├── page.tsx               ← Home
│   │   ├── listings/
│   │   │   ├── page.tsx           ← Browse listings
│   │   │   └── [slug]/page.tsx    ← Listing detail
│   │   ├── login/page.tsx
│   │   └── signup/page.tsx
│   ├── (dashboard)/
│   │   ├── layout.tsx             ← Auth guard layout
│   │   ├── dashboard/
│   │   │   ├── page.tsx
│   │   │   ├── listings/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── new/page.tsx
│   │   │   │   └── [id]/page.tsx
│   │   │   └── inquiries/page.tsx
│   │   └── profile/page.tsx
│   ├── api/                       ← Only if server actions aren't enough
│   ├── globals.css
│   └── layout.tsx
├── actions/
│   ├── listingActions.ts
│   ├── bookingActions.ts
│   ├── profileActions.ts
│   └── uploadActions.ts
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Badge.tsx
│   │   └── Modal.tsx
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── Container.tsx
│   ├── listings/
│   │   ├── ListingCard.tsx
│   │   ├── ListingGrid.tsx
│   │   ├── ListingFilters.tsx
│   │   └── ListingDetail.tsx
│   ├── bookings/
│   │   ├── InquiryForm.tsx
│   │   └── InquiryCard.tsx
│   └── dashboard/
│       ├── ListingForm.tsx
│       ├── ImageUploader.tsx
│       └── InquiryTable.tsx
├── hooks/
│   ├── useAuth.ts
│   └── useListings.ts
├── lib/
│   ├── supabase/
│   │   ├── server.ts
│   │   └── client.ts
│   └── slugify.ts
├── services/
│   ├── listingService.ts
│   ├── inquiryService.ts
│   └── profileService.ts
├── validations/
│   ├── listingValidation.ts
│   └── inquiryValidation.ts
├── types/
│   ├── supabase.ts                ← Generated types
│   └── index.ts                  ← Custom types
├── constants/
│   ├── routes.ts
│   ├── categories.ts
│   └── config.ts
├── utils/
│   └── formatPrice.ts
├── middleware.ts
└── public/
    └── images/
```

---

## 9. Deployment Plan

### Supabase Setup

1. Create project at supabase.com
2. Run all SQL (tables, enums, RLS, trigger) in SQL Editor
3. Create Storage bucket `listing-images` → set to **public**
4. Get `SUPABASE_URL` and `SUPABASE_ANON_KEY` from Project Settings

### Vercel Setup

1. Push code to GitHub
2. Import repo to Vercel
3. Add environment variables:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=      # Server-side only, never expose to client
NEXT_PUBLIC_SITE_URL=https://bookzambales.com
```

4. Deploy — Vercel auto-builds on push to `main`

### Domain

- Register `bookzambales.com` (or `.ph`)
- Point DNS to Vercel
- Add custom domain in Vercel dashboard

### Supabase Auth Config

- Set Site URL to your production URL
- Add redirect URLs for auth callbacks

---

## 10. Monetization Strategy

### MVP (Free Launch)

- All listings free — focus on getting real hosts onboard
- Builds trust and real content fast

### Phase 2 — Light Monetization

| Model                  | Details                                          |
| ---------------------- | ------------------------------------------------ |
| **Listing fee**        | ₱299–₱999/month per active listing               |
| **Featured listing**   | ₱500–₱1,500/month to appear at top               |
| **Booking commission** | 5–10% of booking value (requires payment system) |

### Phase 3 — Grow Revenue

- Verified host badge (paid)
- Banner ads for local tourism businesses
- Package deals with local transport or guides

---

## 11. Future Scaling Plan

| Feature                   | Why + When                                           |
| ------------------------- | ---------------------------------------------------- |
| **Supabase Realtime**     | Live inquiry notifications for hosts (Phase 2)       |
| **Email notifications**   | Auto-email on new inquiry via Resend (early Phase 2) |
| **Reviews + ratings**     | Adds trust — after first 50+ bookings                |
| **Availability calendar** | Prevents double bookings — after payment             |
| **Online payments**       | PayMongo (PH-local) or Stripe — Phase 3              |
| **Map-based search**      | Google Maps or Mapbox — after strong listings volume |
| **Mobile app**            | React Native / Expo — after web is stable            |
| **Admin dashboard**       | Manage users, feature listings, analytics — Phase 2  |
| **SEO / blog**            | Zambales travel guides → organic traffic             |

---

## Quick Reference Checklist

### Before You Write Any Code

- [ ] Supabase project created
- [ ] All SQL executed (tables + enums + RLS + trigger)
- [ ] Types generated
- [ ] `.env.local` filled in
- [ ] Supabase Storage bucket created

### MVP Definition of Done

- [ ] Host can sign up, create listing, upload images
- [ ] Traveler can browse, filter, view listing detail
- [ ] Anyone can submit an inquiry
- [ ] Host can see and respond to inquiries
- [ ] Deployed and accessible on custom domain

---

_Plan version: 1.0 — Book Zambales MVP_
