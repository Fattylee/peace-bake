# Peace Bake Bakery - AI Coding Instructions

## Project Overview

This is a **Next.js 16** landing page for Peace Bake Bakery built with React 19, TypeScript, and Tailwind CSS. The project is a single-page application (SPA) showcasing bakery services and enabling customer contact/ordering.

**Stack**: Next.js 16 (App Router) | React 19 | TypeScript 5 | Tailwind CSS v4 | Lucide React icons

## Key Architecture Decisions

### App Router Structure

- Uses Next.js **App Router** (`app/` directory) exclusively - NOT Pages Router
- Single entry point: [app/page.tsx](app/page.tsx) (home/landing page)
- Root layout in [app/layout.tsx](app/layout.tsx) - manages metadata, fonts (Geist), and global CSS
- Mark components with `"use client"` at the top for client-side interactivity

### Styling Approach

- **Tailwind CSS v4** with `@import "tailwindcss"` syntax in [app/globals.css](app/globals.css)
- Custom theme variables in `:root` (background/foreground colors)
- No component-level CSS files - all styling via Tailwind classes
- Color scheme: warm bakery tones (amber/orange palette) in light mode, auto dark mode support

### Component Pattern

The main page is a **single exported function component** with "use client" directive. No separate component files currently exist - all UI in [app/page.tsx](app/page.tsx).

## Development Workflow

### Essential Commands

```bash
npm run dev      # Start development server (http://localhost:3000)
npm run build    # Build for production
npm start        # Run production build
npm run lint     # Run ESLint (TypeScript + Next.js configs)
```

### Building & Testing

- ESLint uses `eslint-config-next` (core-web-vitals + typescript) defined in [eslint.config.mjs](eslint.config.mjs)
- No Jest/test framework configured
- Type checking integrated via TypeScript (`"strict": true`)
- Path alias `@/*` available for imports from root

## Code Patterns & Conventions

### React/Next.js Patterns

1. **Functional components** with TypeScript for type safety
2. **Client components** when using hooks/interactivity (add `"use client"` directive)
3. **External links** use `target="_blank" rel="noopener noreferrer"` security attributes
4. **Icons**: Import from `lucide-react` (e.g., `Phone`, `MapPin`)
5. **Layout**: Use Tailwind grid/flexbox with mobile-first responsive design

### Contact Integration

The page includes hardcoded contact methods:

- **Phone**: `+2348062870354` (tel: links)
- **WhatsApp**: Same number with pre-formatted message link
- **Location**: Anchor to `#location` section ID

### Image Assets

Static images stored in [public/landing-page/](public/landing-page/):

- Use relative `/landing-page/` paths in `<img src>` attributes
- Images are referenced by bakery product names (e.g., "Family and Family-Mini.jpg")

## Common Tasks

### Adding a New Section

1. Add a `<section>` element with an `id` (for anchor links) in [app/page.tsx](app/page.tsx)
2. Style using Tailwind: start with background color, grid/flex layout, spacing
3. Use semantic HTML: `<h2>` for section titles, lists for product features
4. Ensure responsive design with `md:` breakpoint prefixes

### Updating Styling

- Modify Tailwind classes directly in components
- Change theme colors in [app/globals.css](app/globals.css) CSS variables
- Test with `npm run dev` (HMR enabled)

### Modifying Metadata

- Edit `metadata` object in [app/layout.tsx](app/layout.tsx)
- Update title, description, favicon as needed

## Linting & Code Quality

- Run `npm run lint` before committing
- ESLint auto-configured with Next.js + TypeScript best practices
- Fix issues with `eslint --fix`

## Deployment Notes

- Build output in `.next/` directory
- Ready to deploy to Vercel (Next.js creators' platform)
- Environment variables can be added via `.env.local` (not tracked in git)
