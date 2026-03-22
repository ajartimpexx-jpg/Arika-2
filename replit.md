# Arika Handicrafts

A premium React + Vite + TypeScript e-commerce website for Arika Handicrafts — handcrafted furniture and decor from Jodhpur, India.

## Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite (port 5000)
- **Styling**: Tailwind CSS with shadcn/ui components
- **Routing**: React Router v6
- **State/Data**: TanStack React Query
- **Animation**: Framer Motion

## Project Structure

```
src/
  pages/
    Index.tsx            — Homepage with all sections
    CollectionPage.tsx   — Room-filtered collections with two-level filter bar
    ProductPage.tsx      — Full product detail page (/product/:slug)
    NotFound.tsx
  components/
    ArikaLogo.tsx        — Premium SVG logo (stacked / horizontal / icon)
    Navbar.tsx           — Sticky navbar with full-width mega menu
    PageLoader.tsx       — Cream loader with stacked ArikaLogo
    ProductCard.tsx      — Card linking to /product/:slug with icon watermark
    ProductsSection.tsx  — Best sellers grid
    CategoriesSection.tsx — 6 room-based cards, asymmetric layout
    ContactSection.tsx   — Rebuilt 2-col inquiry form
    FloatingButtons.tsx  — WhatsApp (pulsing) + back-to-top
    ScrollProgress.tsx   — Gold (#C9A84C) progress bar at top
    CustomCursor.tsx     — Custom dot cursor with ring expansion on hover
    ...other sections
  data/
    products.ts          — Full product catalog with slugs, rooms, subcategories,
                           INR prices, thumbnails, dimensions, descriptions
  assets/               — Product images and category images
```

## Routes

- `/` — Homepage
- `/collection` — All collections
- `/collection/:slug` — Room-filtered (living-room, bedroom, dining-room, seating, bar-furniture, outdoor, home-decor)
- `/product/:slug` — Individual product detail page

## Key Features

- **ArikaLogo**: SVG Rajasthani 8-pointed star rosette emblem with 3 variants (stacked/horizontal/icon)
- **Mega Menu**: Full-width 5-column collections dropdown on hover
- **Two-level filters**: Room tabs + subcategory pills with mouse-wheel horizontal scroll
- **Product Detail Page**: Image gallery, variant selectors, accordions, reviews, similar products, recently viewed
- **Custom Cursor**: Dot + expanding ring on hover (desktop only)
- **Scroll Progress**: Gold bar at top of browser
- **Frosted glass navbar**: Activates when scrolled >50px

## Running

The app runs via `npm run dev` on port 5000.

