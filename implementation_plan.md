# Beyond Intern — Full-Stack EdTech Platform Build Plan

## Current State

The project at `c:\beyondinternn` is a **fresh Next.js 16 scaffold** with the core dependencies already installed:

| Dependency | Version | Status |
|---|---|---|
| Next.js | 16.2.1 | ✅ Installed |
| React | 19.2.4 | ✅ Installed |
| Tailwind CSS | v4 | ✅ Installed |
| Framer Motion | 12.38 | ✅ Installed |
| NextAuth | 4.24 | ✅ Installed |
| Stripe + @stripe/stripe-js | 20.4 / 8.11 | ✅ Installed |
| Shadcn (base-nova) | 4.1 | ✅ Installed |
| Lucide React | 1.6 | ✅ Installed |

Only boilerplate files exist — no application code has been written yet.

---

## Numbered Execution Plan

### Phase 1 — Foundation & Design System
> *Sets the visual DNA for the entire app.*

1. **Install additional Shadcn components** — `card`, `input`, `badge`, `avatar`, `dialog`, `sheet`, `separator`, `progress`, `tabs`, `tooltip`, `dropdown-menu`, `scroll-area`.
2. **Create `globals.css` design tokens** — Define the Beyond Intern color palette (Deep Navy `#0A1628`, Electric Blue `#3B82F6`, Gold Accent `#F59E0B`), glassmorphism utility classes, gradient backgrounds, and custom scrollbar styling.
3. **Create shared layout components:**
   - `src/components/layout/navbar.tsx` — Sticky glassmorphism nav with logo, links (Courses, Webinars, About, Login), mobile hamburger menu via Shadcn `Sheet`.
   - `src/components/layout/footer.tsx` — Multi-column footer with links, socials, and newsletter.
4. **Update `src/app/layout.tsx`** — Wire up Inter/Outfit fonts from Google Fonts, metadata, Navbar, Footer, and a `<Providers>` wrapper for NextAuth session.

---

### Phase 2 — Public Landing Page (`/`)
> *The money page. 6 distinct sections, each a standalone component.*

5. **`src/components/landing/hero-section.tsx`** — Full-viewport hero with animated headline, dual CTAs ("Explore Courses" / "Watch Demo"), floating glassmorphism stat cards (e.g., "10K+ Students", "50+ Courses"), and a subtle particle/gradient background using Framer Motion.
6. **`src/components/landing/video-carousel.tsx`** — Horizontal scroll carousel of short-form video cards (webinar clips + student reviews). Each card has a play overlay, title, and duration badge. Uses Framer Motion drag gestures.
7. **`src/components/landing/course-grid.tsx`** — Responsive 3-column grid of `CourseCard` components showing thumbnail (generated image), category badge, title, instructor, star rating, and **£ price**. "Enroll Now" CTA on each.
8. **`src/components/landing/webinar-section.tsx`** — Split layout: left side is an embedded video player (iframe or HTML5 `<video>`), right side lists upcoming webinars with dates and "Join Live" buttons.
9. **`src/components/landing/testimonials.tsx`** — Masonry/grid of text review cards with avatars, names, roles, and star ratings. Plus a "Submit Your Review" form at the bottom.
10. **`src/components/landing/newsletter.tsx`** — Clean centered section with gradient background, headline, email `<Input>`, and submit `<Button>`.
11. **`src/app/page.tsx`** — Compose all 6 sections above into the landing page.

---

### Phase 3 — Authentication (`/login`)
> *Liquid-glass login with Google OAuth.*

12. **`src/app/api/auth/[...nextauth]/route.ts`** — NextAuth API route config with Google Provider (using env variables `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`).
13. **`src/app/login/page.tsx`** — "Liquid Glass" login UI: centered glassmorphism card with animated gradient border, Beyond Intern logo, "Continue with Google" prominent button (using `signIn("google")`), email/password fields, and subtle animated background blobs.
14. **`src/components/providers.tsx`** — `SessionProvider` wrapper for NextAuth.

---

### Phase 4 — Checkout & Payments
> *Stripe-powered checkout.*

15. **`src/app/api/checkout/route.ts`** — API route that creates a Stripe Checkout Session with course info (name, £ price, image).
16. **`src/app/checkout/page.tsx`** — Premium checkout UI: order summary card, course thumbnail, price in GBP (£), and "Pay Now" button that redirects to Stripe Checkout.
17. **`src/app/checkout/success/page.tsx`** — Post-payment success page with confetti animation and "Go to Dashboard" CTA.

---

### Phase 5 — Student Dashboard (`/dashboard`)
> *The core learning portal after login.*

18. **`src/app/dashboard/layout.tsx`** — Dashboard shell with persistent **side navigation** (Home, My Courses, Achievements, Certifications, Settings) and a **top header** (search bar, notification bell, user avatar dropdown).
19. **`src/components/dashboard/sidebar.tsx`** — Collapsible glassmorphism sidebar with Lucide icons and active-link highlighting.
20. **`src/components/dashboard/top-header.tsx`** — Search input, notification badge, and user avatar with dropdown menu.
21. **`src/app/dashboard/page.tsx`** — Main dashboard view with:
    - **Active Courses** section (cards with progress bars via Shadcn `Progress`)
    - **Notifications** panel
    - **Achievements/Badges** grid with unlockable badges
    - **Certifications** section with download links
22. **`src/app/dashboard/course/[id]/page.tsx`** — Individual course view with embedded video player, module sidebar, and progress tracking.

---

### Phase 6 — AI Chatbot
> *Floating assistant in the bottom-right corner.*

23. **`src/components/chatbot/chat-bubble.tsx`** — Floating circular button with a bubbly animated icon (pulse + bounce on idle). Fixed position bottom-right.
24. **`src/components/chatbot/chat-window.tsx`** — Expandable chat panel with:
    - Glassmorphism container
    - Message bubbles (user vs. AI styled differently)
    - Input field with send button
    - Typing indicator animation
    - Framer Motion open/close transitions

---

### Phase 7 — SEO & Responsive Polish

25. **SEO metadata** — Add proper `<title>`, `<meta description>`, Open Graph tags, and structured data (`JSON-LD`) to every page.
26. **Responsive audit** — Ensure every component works flawlessly on mobile (375px), tablet (768px), and desktop (1440px+).
27. **Accessibility** — Keyboard navigation, focus rings, ARIA labels, alt text on all images.

---

### Phase 8 — Asset Generation & Final Polish

28. **Generate images** — Use the `generate_image` tool to create:
    - Course thumbnails (3–4)
    - Hero section background or decorative elements
    - Chatbot avatar/icon
29. **Final integration test** — Run `npm run build` and resolve any errors.

---

## File Manifest (New Files)

```
src/
├── app/
│   ├── layout.tsx                          [MODIFY]
│   ├── page.tsx                            [MODIFY]
│   ├── globals.css                         [MODIFY]
│   ├── login/
│   │   └── page.tsx                        [NEW]
│   ├── checkout/
│   │   ├── page.tsx                        [NEW]
│   │   └── success/
│   │       └── page.tsx                    [NEW]
│   ├── dashboard/
│   │   ├── layout.tsx                      [NEW]
│   │   ├── page.tsx                        [NEW]
│   │   └── course/
│   │       └── [id]/
│   │           └── page.tsx                [NEW]
│   └── api/
│       ├── auth/
│       │   └── [...nextauth]/
│       │       └── route.ts                [NEW]
│       └── checkout/
│           └── route.ts                    [NEW]
├── components/
│   ├── providers.tsx                       [NEW]
│   ├── layout/
│   │   ├── navbar.tsx                      [NEW]
│   │   └── footer.tsx                      [NEW]
│   ├── landing/
│   │   ├── hero-section.tsx                [NEW]
│   │   ├── video-carousel.tsx              [NEW]
│   │   ├── course-grid.tsx                 [NEW]
│   │   ├── webinar-section.tsx             [NEW]
│   │   ├── testimonials.tsx                [NEW]
│   │   └── newsletter.tsx                  [NEW]
│   ├── dashboard/
│   │   ├── sidebar.tsx                     [NEW]
│   │   └── top-header.tsx                  [NEW]
│   └── chatbot/
│       ├── chat-bubble.tsx                 [NEW]
│       └── chat-window.tsx                 [NEW]
└── lib/
    └── utils.ts                            [EXISTS]
```

**~25 new files** + 3 modified files.

---

## Verification Plan

### Automated
- **`npm run build`** — Full production build to catch type errors, missing imports, and build failures.
- **`npm run lint`** — ESLint check across all files.

### Browser Verification
- Launch `npm run dev` and visually inspect every route (`/`, `/login`, `/checkout`, `/dashboard`) on both desktop and mobile viewport using the browser tool.
- Verify Framer Motion animations render correctly.
- Verify glassmorphism effects and gradients render properly.

### Manual (User)
- **Google Auth flow** — Requires real `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` env vars. User to test in their own browser.
- **Stripe checkout** — Requires `STRIPE_SECRET_KEY` / `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`. User to test with Stripe test mode keys.

---

> [!IMPORTANT]
> **Say "GO" to begin Phase 1.** I will build incrementally, phase by phase, previewing the UI in-browser at each milestone.
