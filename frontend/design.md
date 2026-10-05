# LIBRA — Desktop Design Specification

> **Source:** `Untitled.pdf`
> **Scope:** Desktop UI only
> **Purpose:** Frontend implementation reference for Next.js/React
> **Status:** Design specification derived from the supplied PDF

---

## 1. Design Overview

LIBRA is a premium digital-library interface for readers. The supplied design uses a clean editorial aesthetic focused on books, reading progress, discovery, and a cozy/premium reading experience.

The desktop design contains these primary screens/states:

1. Public Home / Landing Page
2. Reader Home / Dashboard
3. Book of the Month / Discovery Home
4. Browse / Search Results
5. Categories
6. Book Detail
7. Reader
8. My Library
9. Profile
10. Pricing
11. Empty Search Result State
12. Filtered Search Result State

The PDF also contains alternate/duplicate visual states of several screens. These should be treated as variations of the same page rather than separate routes unless the application requirements later require otherwise.

---

# 2. Global Design System

## 2.1 Brand

**Product name:** LIBRA

The footer describes LIBRA as:

> A premium, cozy space for lifelong learners and modern bibliophiles.

The overall visual direction should therefore remain:

- Editorial
- Calm
- Premium
- Cozy
- Reading-focused
- Minimal rather than highly decorative

Do not introduce a visually aggressive SaaS/dashboard style that conflicts with the supplied design.

---

## 2.2 Global Navigation

Desktop public navigation:

- LIBRA
- Home
- Browse
- Categories
- Pricing
- Sign In
- Get Started

Authenticated navigation shown in the dashboard-style screens:

- LIBRA
- Home
- Browse
- Categories
- Pricing

The exact active-navigation treatment should follow the supplied visual design.

### Navigation implementation

Recommended React component:

```text
<Navbar />
  <Logo />
  <NavLinks />
  <AuthActions />
```

The navigation should be reusable across public and authenticated pages.

---

# 3. Global Layout

## 3.1 Desktop Container

Use a centered content container for the main page content.

Recommended implementation baseline:

```css
.container {
  width: min(100% - 48px, 1200px);
  margin-inline: auto;
}
```

The exact pixel values can be tuned against the supplied design during visual implementation.

### Layout principles

- Large horizontal whitespace
- Clear content hierarchy
- Sections separated by generous vertical spacing
- Book grids use consistent card widths
- Text blocks should not become excessively wide
- Hero sections should have a clear visual focal point

---

# 4. Typography

The PDF establishes a modern editorial interface with:

- Large display headings
- Medium section headings
- Compact metadata
- Readable body copy
- Small labels/captions

Recommended semantic hierarchy:

| Token | Usage |
|---|---|
| Display | Hero headline / major page headline |
| H1 | Main page title |
| H2 | Major section heading |
| H3 | Card or subsection heading |
| Body | Descriptions and supporting copy |
| Small | Metadata, filters, labels |
| Caption | Secondary information |

Typography must prioritize readability over decorative effects.

### Book typography

Book titles should have stronger visual weight than author names.

Typical hierarchy:

```text
Book Title
Author
Rating / Metadata
```

---

# 5. Color System

The PDF presents a light, warm/cozy visual direction rather than a dark UI.

Create semantic color tokens rather than hard-coding colors throughout components.

Suggested token structure:

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
  --success: ...;
  --warning: ...;
}
```

**Important:** exact color values should be sampled from the PDF/design during visual implementation rather than invented at this documentation stage.

---

# 6. Spacing

Use a consistent spacing scale.

Recommended implementation tokens:

```text
4px
8px
12px
16px
24px
32px
48px
64px
80px
96px
```

Use:

- 16–24px for compact component spacing
- 24–32px between related content groups
- 48–80px between major sections
- Larger spacing around hero sections

Exact values should be adjusted after comparing the Next.js implementation with the PDF.

---

# 7. Components

## 7.1 Book Card

Book cards are used throughout:

- Trending Books
- Recently Added
- Recommended For You
- Trending Now
- Popular This Month
- Staff Picks
- Related Books
- Category collections
- Browse results

Typical structure:

```text
Book Cover
Book Title
Author
Rating
```

Some contexts add:

- Category
- Progress
- Resume action
- Staff Spotlight information

Recommended component:

```text
<BookCard
  title=""
  author=""
  rating=""
  cover=""
  variant=""
/>
```

Variants should be implemented only when the design requires a different presentation.

---

## 7.2 Section Header

Repeated pattern:

```text
Section Title
Supporting Description
                         View All
```

Examples:

- Trending Books
- Recently Added
- Recommended For You
- Trending Now
- Popular This Month
- Staff Picks

Recommended:

```text
<SectionHeader
  title=""
  description=""
  actionLabel="View All"
/>
```

---

## 7.3 Rating

Ratings appear beside book metadata.

Example:

```text
4.8
```

Some views visually pair the value with a star.

Recommended:

```text
<Rating value={4.8} />
```

---

## 7.4 Buttons

Primary actions visible in the design include:

- Start Reading Free
- Explore Library
- Read Now
- Add to Shelf
- Save to Library
- Resume
- Get Started
- Start 14-Day Free Trial
- Join Free Plan
- Clear All Filters
- Browse Library

Recommended button hierarchy:

```text
Primary
Secondary
Text / Link
Destructive / Account action
```

Do not create additional button styles unless required.

---

## 7.5 Search

Search is used on the reader dashboard and browsing experience.

Dashboard placeholder:

```text
Search books, authors, categories, or quotes...
```

Other variants:

```text
Search books, authors, categories...
```

The search component should support a visually distinct input state and search affordance.

---

# 8. Footer

The footer is repeated across the supplied screens.

Main footer content:

### Brand

LIBRA

Description:

> A premium, cozy space for lifelong learners and modern bibliophiles. Immerse yourself in our beautifully crafted digital library.

### Navigation

- Home
- Browse
- Categories
- Pricing
- About

### Legal

- Terms of Service
- Privacy Policy
- Cookie Policy
- Licensing

### Stay Updated

Description:

> Receive updates about new releases, curation logs, and literary spotlights.

Input:

```text
Your email address
```

### Copyright

```text
© 2026 Readly Inc. All rights reserved.
```

The PDF uses both LIBRA branding and the Readly copyright text. Preserve the supplied design text during visual implementation unless the project specification later changes the product/legal identity.

---

# 9. Page Specifications

# 9.1 Public Home / Landing Page

### Route

Recommended:

```text
/
```

### Header

```text
LIBRA
Home
Browse
Categories
Pricing
Sign In
Get Started
```

### Hero

Main headline:

```text
Your ultimate gateway to
endless stories
```

Supporting copy:

```text
Explore a meticulously curated ecosystem of literary masterpieces,
textbooks, and contemporary fiction. Perfect for eager students
and passionate bibliophiles alike.
```

Actions:

```text
Start Reading Free
Explore Library
```

### Statistics

Four statistics are displayed:

```text
10K+     E-Books & Audiobooks
50K+     Active Readers
500+     Renowned Authors
4.8★     App Store Rating
```

### Trending Books

Title:

```text
Trending Books
```

Description:

```text
The books capturing minds and leading discussions this week
```

Action:

```text
View All
```

Books:

- The Echo of Silence — Marcia Sterling — 4.8
- Beyond the Grid — Klaus Van Der Meer — 4.9
- Midsummer Wanderlust — Celia Harlow — 4.6
- The Algorithms of Joy — Dr. Arthur Pendelton — 4.7
- Contours of Memory — Siddharth Mehta — 4.5
- Echoes of the Renaissance — Elena Rostova — 4.8

### Browse by Category

Description:

```text
Explore your interest across our vast catalog of genres
```

Categories shown:

- Fiction — 3,240 titles
- Romance — 1,850 titles
- Mystery — 1,210 titles
- Science — 980 titles
- Technology — 1,150 titles
- History — 1,420 titles
- Self-Development — 2,100 titles
- Art — 890 titles

### Recently Added

Description:

```text
Fresh arrivals added to our growing catalog today
```

Action:

```text
View All
```

Books:

- The Algorithms of Joy — Dr. Arthur Pendelton — 4.7
- Contours of Memory — Siddharth Mehta — 4.5
- Echoes of the Renaissance — Elena Rostova — 4.8
- The Echo of Silence — Marcia Sterling — 4.8
- Beyond the Grid — Klaus Van Der Meer — 4.9
- Midsummer Wanderlust — Celia Harlow — 4.6

---

# 9.2 Reader Home / Dashboard

### Route

Recommended:

```text
/home
```

### Greeting

```text
Good Morning, Khall
```

Supporting text:

```text
Thursday, October 24 • Let's explore some new literature today.
```

### Search

```text
Search books, authors, categories, or quotes...
```

### Category quick filters

```text
All
Fiction
Self-Dev
Romance
Technology
History
Science
Art
```

### Continue Reading

Contains progress-oriented book cards.

Example:

```text
Contours of Memory
Siddharth Mehta
64% completed

Beyond the Grid
Klaus Van Der Meer
28% completed
```

### Reading Stats

Title:

```text
Your October Reading Stats
```

Metrics:

```text
4        Books Completed
1,240    Pages Read
12 Days  Reading Streak
18.5h    Time Spent
```

### Yearly Goal

```text
Yearly Goal Progress
75% Completed
18 of 24 books
```

Implement as a progress visualization matching the design.

### Recommended For You

Books:

- Lessons of Time — Prof. Alistair Finch — 4.9
- Whispers of Kyoto — Sayuri Haruki — 4.8
- Designing the Humane — Clementine Dupont — 4.7
- The Cozy Cabin Guide — Arthur Wood — 4.6

---

# 9.3 Book of the Month / Discovery Home

### Route

Can be implemented as the discovery/home variation represented in the PDF.

### Featured section

Label:

```text
BOOK OF THE MONTH
```

Title:

```text
The Midnight Library
```

Metadata:

```text
By Matt Haig • 2020 • Fiction, Philosophy
```

Rating:

```text
4.9
```

Description:

The PDF provides a synopsis describing the infinite library concept, alternate lives, regret, paths not taken, and discovering what makes life worth living.

Actions:

```text
Read Now
Add to Shelf
```

### Trending Now

Books:

- Whispers of Kyoto — Sayuri Haruki — 4.8
- Lessons of Time — Prof. Alistair Finch — 4.9
- Midsummer Wanderlust — Celia Harlow — 4.6
- Beyond the Grid — Klaus Van Der Meer — 4.8
- The Echo of Silence — Marcia Sterling — 4.8
- Echoes of the Renaissance — Elena Rostova — 4.8

### Popular This Month

Examples:

- Designing the Humane — Clementine Dupont — 4.8
- Lessons of Time — Prof. Alistair Finch — 4.9
- The Echo of Silence — Marcia Sterling — 4.8
- Echoes of the Renaissance — Elena Rostova — 4.8

### Staff Picks / Staff Spotlight

Staff spotlight content is attached to selected books.

Example:

```text
The Cozy Cabin Guide
Arthur Wood
4.7
```

Supporting description references cabin lifestyle, cozy architecture, and rustic simplicity.

---

# 9.4 Browse / Search Results

### Route

Recommended:

```text
/browse
```

### Search result heading

Example:

```text
Design History and Systems
```

Supporting text:

```text
Showing 8 results for "Design History and Systems"
```

### Toolbar

```text
Filters
Reset All
Sorted by: Popularity
```

### Filters

#### Categories

- Fiction
- Technology
- Design & Art
- Science
- History

#### Format

- eBook
- Audiobook
- PDF

#### Language

- English
- Spanish
- French

#### Rating Range

- 4.5 ★ & above
- 4.0 ★ & above
- 3.5 ★ & above

#### Publication Year

- 2024 Releases
- 2020–2023
- Before 2020

### Results

Books:

- The Echo of Silence — Marcia Sterling — 4.8
- Contours of Memory — Siddharth Mehta — 4.5
- Beyond the Grid — Klaus Van Der Meer — 4.9
- Echoes of the Renaissance — Elena Rostova — 4.8
- Midsummer Wanderlust — Celia Harlow — 4.6
- Design Systems — Clementine Dupont — 4.9
- The Algorithms of Joy — Dr. Arthur Pendelton — 4.7
- Cozy Cabin Living — Arthur Wood — 4.7

### Pagination

```text
Previous
1
2
3
...
8
Next
```

Implement as a reusable pagination component.

---

# 9.5 Browse — Empty State

The design explicitly includes an empty result state.

Title:

```text
No results found
```

Description:

```text
We couldn't find any books matching your current search parameters.
Try clearing some filters or using different keywords.
```

Suggestions:

- Check spelling of title or author name.
- Broaden categories.

Action:

```text
Clear All Filters
```

### Implementation

Create a reusable:

```text
<EmptyState />
```

with:

- Icon/illustration area if present in the visual design
- Title
- Description
- Suggestions
- Primary recovery action

---

# 9.6 Categories

### Route

```text
/categories
```

### Page heading

```text
Explore your interests across our genres
```

Description:

```text
Discover carefully compiled collections across major literary,
scientific, and technical disciplines.
```

### Category collection

- Fiction — 3,240 titles
- Romance — 1,850 titles
- Mystery — 1,210 titles
- Fantasy — 2,050 titles
- Science — 980 titles
- Technology — 1,150 titles
- History — 1,420 titles
- Education — 2,300 titles
- Psychology — 1,670 titles
- Self Development — 2,100 titles
- Biography — 1,340 titles
- Art — 890 titles

### Featured category

The PDF demonstrates:

```text
Popular in Fiction
```

Supporting text:

```text
The novels currently captivating our reading community
```

Action:

```text
Explore Fiction
```

Associated books include:

- The Echo of Silence — Marcia Sterling — 4.8
- Beyond the Grid — Klaus Van Der Meer — 4.9

---

# 9.7 Book Detail

### Route

Recommended:

```text
/books/[slug]
```

### Book metadata

Example:

```text
Design
Technology
Non-Fiction

Designing the Humane

Clementine Dupont • Published in 2021

4.8
```

### Synopsis

Heading:

```text
Synopsis
```

The design contains a longer synopsis and a:

```text
Read More...
```

interaction.

### Book Details

Fields:

```text
Pages
340 pages

Language
English

Publisher
Cozy Craft Press

Published Date
October 12, 2021

ISBN
978-3-16-148410-0

Format
eBook, Hardcover, Audio
```

### Availability

```text
Audiobook Available • 8h 45m narration
```

### Actions

```text
Read Now
Save to Library
```

### Community Reviews

Example review structure:

```text
User
Rating
Time
Review text
```

Reviews visible in the PDF include:

- Ikan Cupang — 5 — 2 weeks ago
- Mie Ayam — 4 — 1 month ago

### Related Books

- Contours of Memory — Siddharth Mehta — 4.5
- Echoes of the Renaissance — Elena Rostova — 4.8
- Design Systems — Clementine Dupont — 4.9
- Cozy Cabin Living — Arthur Wood — 4.7

---

# 9.8 Reader

### Route

Recommended:

```text
/read/[bookId]
```

This is a focused reading interface and should not use the normal content-heavy page layout.

### Book information

```text
Beyond the Grid
Klaus Van Der Meer
Chapter 4: The Silent Algorithm
```

### Reading content

Heading:

```text
IV. The Silent Algorithm
```

The PDF shows long-form reading content with paragraph-based typography.

### Reader Preferences

The reader provides controls for:

#### Theme

```text
Light
Sepia
Dark
```

#### Font Family

```text
Sans-Serif
Serif
```

#### Font Size

Example:

```text
20px
```

#### Line Spacing

```text
Tight
Comfortable
Spacious
```

#### Screen Brightness

Example:

```text
80%
```

### Reader navigation

```text
Previous Chapter
Page 42 of 318
13% completed
Next Chapter
```

### Implementation principle

The reader should be isolated from the normal site navigation where appropriate.

Recommended structure:

```text
<ReaderLayout>
  <ReaderHeader />
  <ReaderContent />
  <ReaderPreferences />
  <ReaderFooterNavigation />
</ReaderLayout>
```

---

# 9.9 My Library

### Route

```text
/library
```

### Heading

```text
My Library
```

Description:

```text
Manage and track your reading journey, bookmarks, and completions.
```

### Tabs

```text
All
Currently Reading
Saved
Completed
```

### View controls

```text
Grid View
List View
```

### Currently Reading

Example:

```text
Currently Reading (3)

Contours of Memory
Siddharth Mehta
64% completed
Resume →

Beyond the Grid
Klaus Van Der Meer
28% completed
Resume →

The Midsummer Wanderlust
Celia Harlow
82% completed
Resume →
```

### Saved E-Books

Example:

```text
Saved E-Books (2)

The Echo of Silence
Marcia Sterling
4.8

The Algorithms of Joy
Dr. Arthur Pendelton
4.7
```

### Completed empty state

The design explicitly includes:

```text
No completed books yet
```

Description:

```text
Start reading and tracking your process. Once you reach
the last page of any book, it will appear here.
```

Action:

```text
Browse Library Books
```

---

# 9.10 Profile

### Route

```text
/profile
```

### User identity

Example:

```text
Sarah Johnson
sarah.j@libra.com
```

Action:

```text
Edit Profile
```

### Reading Statistics

Metrics:

```text
24
Books Completed

5,840
Pages Read

12 Days
Streak Count

86h
Time Invested
```

### Personal Information

Fields:

```text
Full Name
Sarah Johnson

Date of Birth
March 14, 1995

Email Address
sarah.j@libra.com

Location
Boston, MA
```

### Notifications

Settings:

```text
Daily Reading Reminders
New Book Alerts
Weekly Reading Summary
```

Descriptions explain the purpose of each notification.

### Reading Preferences

Fields:

```text
Favorite Genres
Fiction
Technology
History
Science
Self-Dev

Default Interface Language
English (US)

Daily Reading Goal
45 minutes
```

### Privacy & Security

Settings:

```text
Public Profile Visibility
Share Reading History
```

### Account Actions

Description:

```text
Signing out will end your current active session on this device.
Your offline downloads and local catalog logs will be preserved safely.
```

Action:

```text
Log Out of Session
```

---

# 9.11 Pricing

### Route

```text
/pricing
```

### Heading

```text
Choose Your Reading Plan
```

Description:

```text
Unlock endless literary journeys tailored beautifully to your reading
style and active devices.
```

### Plans

The desktop PDF shows three tiers:

## Free

```text
$0/month
```

Includes:

- Access to 500+ free digital books
- Standard reader customization tools
- Active device sync (1 device maximum)
- Ad-supported interface log
- Standard community forum access

Action:

```text
Get Started Free
```

## Reader

```text
$9.99/month
```

Includes:

- Unlimited catalog access (10K+ titles)
- Completely ad-free cozy environment
- Sync up to 3 devices simultaneously
- Offline reading with local downloads
- Full annotations, notes, and highlights
- Cozy audiobooks integrated seamlessly

Action:

```text
Start 14-Day Free Trial
```

## Premium

```text
$19.99/month
```

Includes:

- Everything included in Reader tier
- Sync unlimited devices simultaneously
- Early access to newly curated editions
- Premium priority support SLA
- Seamless digital family logs (5 members)
- Personalized monthly reading spotlight

Action:

```text
Start 14-Day Free Trial
```

The design marks Premium as:

```text
MOST POPULAR
```

### Comparison table

Columns:

```text
FEATURES
FREE
READER
PREMIUM
```

Rows:

```text
Catalog Size
Offline Reading
Simultaneous Devices
Highlighting & Notes
Audiobooks included
Priority Curation Logs
```

### FAQ

Visible questions:

- Can I switch plans or cancel at any time?
- How do offline downloads work?
- What is our refund policy?
- Do you have options for institutions or classrooms?

FAQ should be implemented as an expandable accordion if the interaction is not otherwise specified.

---

# 10. Responsive Boundary

This document is **desktop-first**.

Do not design mobile behavior yet.

For the first implementation pass, prioritize:

```text
Desktop width
Large navigation
Multi-column book grids
Sidebar filters
Wide pricing comparison
Reader layout
```

Responsive breakpoints can be documented in a separate `responsive-design.md` after the desktop implementation is visually stable.

---

# 11. Next.js Component Architecture

Recommended initial component structure:

```text
components/
├── layout/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── PageContainer.tsx
│
├── books/
│   ├── BookCard.tsx
│   ├── BookGrid.tsx
│   ├── Rating.tsx
│   ├── BookMeta.tsx
│   └── ProgressCard.tsx
│
├── navigation/
│   ├── SectionHeader.tsx
│   ├── Pagination.tsx
│   └── Tabs.tsx
│
├── search/
│   ├── SearchBar.tsx
│   ├── FilterPanel.tsx
│   └── EmptyState.tsx
│
├── reader/
│   ├── ReaderLayout.tsx
│   ├── ReaderContent.tsx
│   ├── ReaderPreferences.tsx
│   └── ReaderNavigation.tsx
│
├── profile/
│   ├── StatCard.tsx
│   ├── SettingRow.tsx
│   └── ProfileSection.tsx
│
└── pricing/
    ├── PricingCard.tsx
    ├── PricingComparison.tsx
    └── FAQ.tsx
```

This is a recommended implementation structure, not a requirement explicitly stated by the PDF.

---

# 12. Suggested Route Structure

```text
/
├── /home
├── /browse
├── /categories
├── /books/[slug]
├── /read/[bookId]
├── /library
├── /profile
└── /pricing
```

Authentication routes can be added later if the actual application requirements require them.

---

# 13. Data Model for UI Components

The frontend should avoid hard-coding book information directly into repeated JSX.

Recommended conceptual object:

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

For detailed book pages:

```ts
type BookDetail = Book & {
  synopsis: string;
  pages: number;
  language: string;
  publisher: string;
  publishedDate: string;
  isbn: string;
  formats: string[];
  audiobook?: {
    available: boolean;
    duration?: string;
  };
};
```

These types are implementation recommendations and are not database requirements from the PDF.

---

# 14. UI States That Must Be Implemented

The PDF explicitly demonstrates more than only the default happy path.

Required visual states:

### Browse

- Results
- Active filters
- Pagination
- Empty results

### Library

- Currently reading
- Saved books
- Empty completed state

### Reader

- Reading content
- Preferences panel
- Progress/navigation

### Profile

- Normal profile
- Notification/preferences settings
- Account action

### Pricing

- Multiple plans
- Recommended/most-popular treatment
- Comparison table
- FAQ

---

# 15. Implementation Priorities

Implement in this order:

## Phase 1 — Foundation

1. Global CSS / design tokens
2. Font setup
3. Page container
4. Navbar
5. Footer
6. Button variants
7. Typography
8. BookCard

## Phase 2 — Discovery

9. Landing page
10. Dashboard
11. Book of the Month / discovery sections
12. Categories

## Phase 3 — Catalog

13. Browse page
14. Filters
15. Pagination
16. Empty state
17. Book detail

## Phase 4 — Reading

18. Reader
19. Reader preferences
20. Reading progress/navigation

## Phase 5 — User

21. My Library
22. Profile

## Phase 6 — Monetization

23. Pricing
24. Comparison table
25. FAQ

---

# 16. Source Fidelity Rules

When implementing the Next.js UI:

1. Treat the PDF as the visual source of truth.
2. Do not add new sections simply because they are common in library applications.
3. Do not remove visible sections without a project requirement.
4. Preserve the hierarchy of headings, descriptions, metadata, and actions.
5. Reuse components for repeated book/card patterns.
6. Keep desktop layout as the first target.
7. Do not invent exact colors, font names, shadows, or pixel measurements when they cannot be reliably established from the source.
8. Validate the implementation visually against the PDF after each major page.
9. Separate visual implementation decisions from backend/business-logic decisions.
10. Treat sample names and book data in the PDF as design/demo content unless the project specification says otherwise.

---

# 17. Desktop Definition of Done

A desktop page is considered visually implemented when:

- Navigation hierarchy matches the PDF.
- Main container width and horizontal alignment match the design.
- Typography hierarchy is visually consistent.
- Book-card proportions are consistent.
- Section spacing is consistent.
- Buttons follow the same hierarchy.
- Images/covers occupy the intended visual area.
- Filters and pagination match the Browse design.
- Empty states are represented.
- Progress indicators match the intended reading UX.
- Footer structure is consistent.
- No major section from the corresponding PDF screen is missing.
- The page has been checked at a desktop viewport against the supplied design.

---

## 18. Notes

The PDF contains several duplicate or alternate representations of the same conceptual pages. They should be consolidated into reusable page components and state variants rather than copied into independent implementations.

Exact visual tokens such as RGB/HEX colors, font family, exact spacing, border radius, shadow parameters, and image dimensions should be finalized through visual inspection/sampling during the implementation pass.

This document intentionally does not define backend APIs, database schema, authentication logic, or business rules because those are not established by the supplied visual design.
