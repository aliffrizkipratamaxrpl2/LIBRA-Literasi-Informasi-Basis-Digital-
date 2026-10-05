# LIBRA — Agent Context

## 0. Purpose

This file is the primary context for an AI coding agent working on the LIBRA library web application.

The agent's current responsibility is **frontend implementation with Next.js**, based on the supplied desktop design PDF and the existing backend project.

Do not treat this document as permission to invent features. When something is not supported by the design or backend, identify the gap and ask/flag it instead of silently making assumptions.

---

# 1. Project Identity

- Product: **LIBRA**
- Product type: Digital library / e-book reading platform
- Frontend target: **Next.js / React**
- Backend: **Express.js**
- Database: **MySQL**, database name `libra_db`
- Backend API prefix: `/api/v1`
- Backend port currently configured: `3000`
- Backend package type: ES Modules (`"type": "module"`)
- Current design scope: **Desktop first**

The visual direction is a premium, cozy, editorial digital-library experience.

Core design principles:

- clean
- editorial
- calm
- premium
- cozy
- readable
- book/content focused
- generous whitespace
- consistent reusable components

Avoid turning the interface into a generic admin dashboard or a visually aggressive SaaS interface.

---

# 2. Source of Truth

There are three different kinds of information. Keep them separate.

## 2.1 Visual source of truth

`Untitled.pdf` is the primary source for the UI design.

It contains 20 pages/screens/states representing desktop designs and variants for:

- public landing page
- reader dashboard
- book of the month/discovery
- browse/search
- categories
- book detail
- reader
- my library
- profile
- pricing
- filtered/empty states

The PDF's visual hierarchy, section order, copy, and demonstrated UI states should be followed.

## 2.2 Backend source of truth

The uploaded `backend.zip` is the current backend implementation.

Current backend files inspected:

```text
backend/
├── README.md
├── package.json
└── src/
    ├── app.js
    └── db/
        └── config.js
```

The backend is currently small and should **not** be assumed to provide every feature shown in the design.

## 2.3 Agent recommendations

Any component architecture, route naming, TypeScript types, state-management approach, or UI abstraction that is not explicitly present in the design/backend is an implementation recommendation.

Recommendations must not be presented as existing requirements.

---

# 3. Existing Backend Facts

## 3.1 Dependencies

Current `package.json` includes:

- express `^5.2.1`
- cors `^2.8.6`
- dotenv `^18.0.5`
- jsonwebtoken `^9.0.3`
- multer `^2.4.0`
- multer-storage-cloudinary `^4.0.0`
- cloudinary `^1.41.3`
- mysql2 `^3.24.5`
- zod `^4.6.5`

Backend command:

```bash
npm run dev
```

which currently runs:

```bash
node src/app.js
```

## 3.2 Database connection

Current MySQL configuration:

```text
host: localhost
user: root
database: libra_db
```

The backend creates a MySQL connection pool with `mysql2/promise`.

## 3.3 Server

Current server:

```text
http://localhost:3000
```

CORS is enabled globally and JSON request parsing is enabled.

---

# 4. Existing API Endpoints

Current endpoints in `backend/src/app.js`:

## Books

### GET `/api/v1/books`

Returns all books from the `books` table.

Success shape currently:

```json
{
  "books": []
}
```

If no books exist, current backend returns HTTP 404.

### POST `/api/v1/post-books`

Creates a book.

Uses multipart upload for `cover` through Cloudinary.

Validation fields:

```text
category_id: integer >= 1
title: required string
writer: required string
cover: optional string
synopsis: required string
content: required string
```

This endpoint is currently intended for creating book records.

---

## Categories

### GET `/api/v1/categories`

Returns all categories.

Success shape:

```json
{
  "categories": []
}
```

If no categories exist, backend returns HTTP 404.

---

## Plans

### GET `/api/v1/plans`

Returns all plans.

Success shape:

```json
{
  "plans": []
}
```

If no plans exist, backend returns HTTP 404.

---

## Profile

### PUT `/api/v1/users/:id`

Requires JWT authentication.

Uses multipart upload for profile image `img` through Cloudinary.

Current validation requires:

```text
username: required, max 15 characters
email: valid email
pass: required, minimum 6 characters
img: required string
```

The implementation updates:

```text
username
pass
img
```

Note: the backend currently validates `email`, but the SQL UPDATE shown does not update the email column.

Do not silently redesign this backend behavior from the frontend.

---

# 5. Authentication Facts

The backend contains JWT authentication middleware.

Expected request format:

```http
Authorization: Bearer <token>
```

Missing token:

```text
401 Token tidak ditemukan
```

Invalid token:

```text
403 Token tidak valid
```

The current backend source shown in `app.js` does not expose login/register endpoints even though Zod schemas for `users` and `login` exist.

Therefore:

**Do not assume login/register API endpoints currently exist.**

If authentication UI is implemented before those endpoints exist, keep the frontend boundary clear and do not fake successful authentication as a real backend integration.

---

# 6. Existing Validation Schemas

The backend defines these Zod schemas:

```text
users
login
categories
plans
books
saved
subscriptions
```

Important fields:

### users

```text
username
email
pass
img
```

### login

```text
email
pass
```

### categories

```text
category
```

### plans

```text
plan
price
cycle
descriptions
```

### books

```text
category_id
title
writer
cover
synopsis
content
```

### saved

```text
users_id
book_id
```

### subscriptions

```text
user_id
plan_id
status
start_date
end_date
```

The presence of a schema does **not** mean a corresponding API endpoint currently exists.

---

# 7. Desktop Pages Required by the Design

Use these conceptual routes unless the existing Next.js project already has a different established routing convention:

```text
/
/home
/browse
/categories
/books/[slug]
/read/[bookId]
/library
/profile
/pricing
```

Authentication routes may be added only when supported by the actual project/backend requirements.

---

# 8. Page Context

## 8.1 Public Home

Main content:

- Navbar
- Hero
- CTA buttons
- Statistics
- Trending Books
- Browse by Category
- Recently Added
- Footer

Hero copy:

```text
Your ultimate gateway to
endless stories
```

CTA:

```text
Start Reading Free
Explore Library
```

Statistics:

```text
10K+ E-Books & Audiobooks
50K+ Active Readers
500+ Renowned Authors
4.8★ App Store Rating
```

Do not invent additional marketing sections.

---

## 8.2 Reader Dashboard / Home

Contains:

- greeting
- date/subtitle
- search
- category quick filters
- Continue Reading
- October Reading Stats
- Yearly Goal Progress
- Recommended For You
- Footer

Example greeting:

```text
Good Morning, Khall
```

Search:

```text
Search books, authors, categories, or quotes...
```

---

## 8.3 Discovery / Book of the Month

Contains:

- Book of the Month hero
- book metadata
- rating
- synopsis
- Read Now
- Add to Shelf
- Trending Now
- Popular This Month
- Staff Picks / Staff Spotlight
- Footer

Featured book shown in the design:

```text
The Midnight Library
Matt Haig
```

---

## 8.4 Browse

Contains:

- search/result heading
- filter controls
- sorting
- book result grid
- pagination
- empty result state
- footer

Filter groups shown:

```text
Categories
Format
Language
Rating Range
Publication Year
```

Formats:

```text
eBook
Audiobook
PDF
```

Sorting shown:

```text
Popularity
```

Pagination shown:

```text
Previous 1 2 3 ... 8 Next
```

---

## 8.5 Browse Empty State

The design explicitly contains an empty state.

Title:

```text
No results found
```

Description explains that no books match the current search parameters.

Recovery action:

```text
Clear All Filters
```

Do not remove this state from the implementation.

---

## 8.6 Categories

Heading:

```text
Explore your interests across our genres
```

Categories shown include:

- Fiction
- Romance
- Mystery
- Fantasy
- Science
- Technology
- History
- Education
- Psychology
- Self Development
- Biography
- Art

Each category has a title count in the design.

---

## 8.7 Book Detail

Contains:

- category/type metadata
- cover/book visual area
- title
- author
- publication year
- rating
- synopsis
- book details
- audiobook availability
- Read Now
- Save to Library
- community reviews
- related books

Example book:

```text
Designing the Humane
Clementine Dupont
Published in 2021
4.8
```

Book details shown:

```text
340 pages
English
Cozy Craft Press
October 12, 2021
978-3-16-148410-0
eBook, Hardcover, Audio
```

---

## 8.8 Reader

The reader is a focused reading interface.

Shown content:

```text
Beyond the Grid
Klaus Van Der Meer
Chapter 4: The Silent Algorithm
```

Reader controls:

- Theme: Light / Sepia / Dark
- Font Family: Sans-Serif / Serif
- Font Size
- Line Spacing
- Screen Brightness

Navigation:

```text
Previous Chapter
Page 42 of 318
13% completed
Next Chapter
```

Do not treat the reader as a normal catalog page.

---

## 8.9 My Library

Contains tabs:

```text
All
Currently Reading
Saved
Completed
```

View modes:

```text
Grid View
List View
```

Currently Reading uses reading progress.

Saved E-Books use normal book-card metadata.

Completed has an explicit empty state:

```text
No completed books yet
```

---

## 8.10 Profile

Contains:

- user identity
- Edit Profile
- reading statistics
- personal information
- notifications
- reading preferences
- privacy/security
- account actions

Example statistics:

```text
24 Books Completed
5,840 Pages Read
12 Days Streak Count
86h Time Invested
```

Settings include:

```text
Daily Reading Reminders
New Book Alerts
Weekly Reading Summary
Public Profile Visibility
Share Reading History
```

---

## 8.11 Pricing

Three plans are shown:

### Free

```text
$0/month
```

### Reader

```text
$9.99/month
```

### Premium

```text
$19.99/month
```

Premium is visually marked as the most popular plan in the supplied design.

The page also contains:

- plan feature lists
- CTA buttons
- comparison table
- FAQ

The plan data should eventually come from `/api/v1/plans` when appropriate rather than being permanently duplicated in JSX.

---

# 9. Reusable Frontend Components

Recommended component architecture:

```text
components/
├── layout/
│   ├── Navbar
│   ├── Footer
│   └── PageContainer
│
├── books/
│   ├── BookCard
│   ├── BookGrid
│   ├── BookMeta
│   ├── Rating
│   └── ProgressCard
│
├── navigation/
│   ├── SectionHeader
│   ├── Pagination
│   └── Tabs
│
├── search/
│   ├── SearchBar
│   ├── FilterPanel
│   └── EmptyState
│
├── reader/
│   ├── ReaderLayout
│   ├── ReaderContent
│   ├── ReaderPreferences
│   └── ReaderNavigation
│
├── profile/
│   ├── StatCard
│   ├── SettingRow
│   └── ProfileSection
│
└── pricing/
    ├── PricingCard
    ├── PricingComparison
    └── FAQ
```

This is a recommended architecture, not existing code.

Before creating a component, inspect the existing Next.js project. Reuse existing components if they already provide the required behavior.

---

# 10. Book Data Contract

A useful frontend abstraction is:

```ts
type Book = {
  id: string;
  title: string;
  author: string;
  rating?: number;
  cover?: string;
  category?: string;
  progress?: number;
};
```

But the current backend actually names the author field:

```text
writer
```

Therefore, when integrating API data, do not silently change backend field names. Either use `writer` directly or create an explicit frontend mapping layer.

Detailed book data currently corresponds to:

```text
category_id
title
writer
cover
synopsis
content
```

---

# 11. API Integration Rules

## Rule 1 — Do not invent API endpoints

Only these endpoints are currently confirmed:

```text
GET  /api/v1/books
POST /api/v1/post-books
GET  /api/v1/plans
GET  /api/v1/categories
PUT  /api/v1/users/:id
```

## Rule 2 — Missing functionality must be flagged

The design contains functionality that the current backend does not yet expose, such as potentially:

- login/register endpoints
- book detail endpoint
- save-to-library endpoint
- reading progress persistence
- library endpoint
- review endpoint
- search/filter endpoint
- subscription creation endpoint
- profile GET endpoint

Do not fake these APIs as if they exist.

## Rule 3 — Mock data is allowed only when explicitly isolated

If UI work needs data that the backend does not currently provide, use a clearly isolated mock/data file and mark it as temporary.

Example:

```text
src/data/mockBooks.ts
```

Do not mix temporary mock behavior into API utilities.

## Rule 4 — Handle backend response states

The frontend must account for:

- loading
- success
- empty
- HTTP 404 for empty resources
- HTTP 400 validation errors
- HTTP 401 authentication failure
- HTTP 403 invalid token
- HTTP 500 server errors

---

# 12. Visual Implementation Rules

1. Desktop is the first target.
2. Match the PDF before adding abstractions.
3. Use reusable components for repeated patterns.
4. Do not duplicate book-card markup across pages when one reusable component can represent it.
5. Do not invent visual sections.
6. Do not remove visible design sections without a reason.
7. Preserve content hierarchy.
8. Preserve whitespace and layout rhythm.
9. Use semantic HTML where possible.
10. Avoid excessive absolute positioning.
11. Use CSS layout systems such as Grid/Flex for normal page structure.
12. Keep interactive behavior separate from presentational components when practical.
13. Do not hard-code API data inside reusable components.
14. Keep backend integration inside a clear data/API layer.

---

# 13. Design Tokens

The exact HEX values, font family, shadows, radius, and pixel measurements must be derived from visual inspection of the supplied design during implementation.

Do not invent exact values and call them design requirements.

Use semantic CSS variables such as:

```css
:root {
  --background: ...;
  --surface: ...;
  --surface-muted: ...;
  --foreground: ...;
  --foreground-muted: ...;
  --border: ...;
  --accent: ...;
  --accent-foreground: ...;
}
```

Recommended spacing scale:

```text
4
8
12
16
24
32
48
64
80
96
```

These are implementation baselines, not measured values from the PDF.

---

# 14. Footer Context

The supplied design repeatedly uses this footer structure:

### Brand

LIBRA

```text
A premium, cozy space for lifelong learners and modern bibliophiles.
Immerse yourself in our beautifully crafted digital library.
```

### Navigation

```text
Home
Browse
Categories
Pricing
About
```

### Legal

```text
Terms of Service
Privacy Policy
Cookie Policy
Licensing
```

### Stay Updated

```text
Your email address
```

The PDF contains the copyright text:

```text
© 2026 Readly Inc. All rights reserved.
```

Do not change supplied copy merely to make it more generic.

---

# 15. Implementation Order

Follow this order unless the existing project requires a different dependency order.

## Phase 1 — Foundation

1. Inspect existing Next.js project.
2. Identify existing styling system.
3. Configure fonts.
4. Configure global design tokens.
5. Build PageContainer.
6. Build Navbar.
7. Build Footer.
8. Build buttons.
9. Build BookCard.
10. Build Rating.
11. Build SectionHeader.

## Phase 2 — Main catalog UI

12. Home
13. Dashboard
14. Categories
15. Browse
16. Browse empty state
17. Book Detail

## Phase 3 — Reading

18. Reader
19. Reader preferences
20. Reader progress/navigation

## Phase 4 — User

21. My Library
22. Profile

## Phase 5 — Monetization

23. Pricing
24. Comparison table
25. FAQ

## Phase 6 — Integration

26. Connect `/api/v1/books`.
27. Connect `/api/v1/categories`.
28. Connect `/api/v1/plans`.
29. Connect profile endpoint when authentication/session handling is available.
30. Identify and document missing APIs required by the UI.

---

# 16. Quality Rules for the Coding Agent

Before changing code:

- inspect the current project structure
- inspect existing components
- inspect installed dependencies
- identify whether App Router or Pages Router is used
- identify existing styling solution
- do not overwrite working code without checking dependencies

When implementing a page:

- build the page skeleton first
- implement the visual hierarchy
- use real/reusable components
- add data wiring after layout is stable
- handle loading/error/empty states
- verify desktop layout

When integrating APIs:

- keep API calls outside presentational components when possible
- centralize base URL/configuration
- type API responses
- handle non-2xx responses
- never expose secrets in client-side code
- do not place Cloudinary credentials or JWT secrets in frontend code

---

# 17. Important Backend Security Boundary

The backend currently uses:

- JWT
- Cloudinary
- MySQL
- Zod

The frontend must never receive or contain:

```text
JWT_SECRET
CLOUDINARY_API_SECRET
CLOUDINARY_API_KEY
```

Only public image URLs returned by the backend/Cloudinary should reach normal client-side UI.

---

# 18. Known Gaps / Risks

These are known from the current backend inspection and should be tracked rather than hidden:

### Authentication gap

Zod schemas and JWT middleware exist, but login/register endpoints are not currently present in `app.js`.

### Library gap

The backend defines a `saved` schema but currently exposes no saved-library CRUD endpoint.

### Subscription gap

The backend defines a `subscriptions` schema but currently exposes no subscription creation/read/update endpoint.

### Reading-progress gap

The design contains reading progress, but the current backend code does not expose a reading-progress endpoint.

### Reviews gap

The design contains community reviews, but no review endpoint is currently exposed.

### Book-detail gap

The backend currently exposes all books through `GET /api/v1/books`, but no dedicated `GET /api/v1/books/:id` endpoint is currently shown.

### Search/filter gap

The design contains search, sorting, category/format/language/rating/year filters, but the current backend only exposes an unfiltered books endpoint.

### Profile read gap

A profile update endpoint exists, but a profile GET endpoint is not currently shown.

These gaps should be reported to the project owner rather than hidden behind fake frontend behavior.

---

# 19. Definition of Done — Desktop Frontend

A page is ready when:

- it follows the corresponding PDF screen
- major sections are present
- typography hierarchy is correct
- layout alignment is consistent
- book cards are reusable and consistent
- buttons have correct hierarchy
- empty/loading/error states are considered
- API data is separated from UI components
- no backend secrets are exposed
- no unsupported API calls are assumed to exist
- desktop viewport has been visually checked

---

# 20. Agent Behavior

When asked to implement a feature:

1. Read this context.
2. Inspect the existing codebase before editing.
3. Identify whether the requested behavior is supported by the design.
4. Identify whether the required API already exists.
5. If it exists, integrate it cleanly.
6. If it does not exist, do not fabricate it as a real endpoint.
7. If mock data is necessary for visual implementation, isolate it clearly.
8. Prefer simple, maintainable Next.js/React code.
9. Preserve existing project conventions.
10. Do not refactor unrelated code.
11. After implementation, verify the requested screen rather than changing unrelated screens.
12. Report important gaps or assumptions explicitly.

The goal is **high visual fidelity + maintainable frontend code + honest backend integration**, not merely producing a page that looks approximately correct.
