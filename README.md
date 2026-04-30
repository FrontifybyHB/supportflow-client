# SupportFlow Client

Production-oriented React + TypeScript starter using Vite, Redux Toolkit,
redux-persist, TanStack Query, axios, React Router, react-hook-form, Tailwind,
sonner, react-hot-toast, lucide-react, framer-motion, and js-cookie.

## Scripts

```bash
npm install
npm run dev
npm run build
npm run lint
```

## Folder Structure

```text
src/
  app/                 App shell, providers, routes, route guards
  config/              Environment and runtime config
  features/            Feature-based modules
    auth/              Example auth feature
    dashboard/         Example protected dashboard
  lib/                 API, Redux, React Query setup
  shared/              Reusable UI, hooks, types, utilities
  styles/              Global styles
```

## Environment

Create `.env.local` when you connect a backend:

```bash
VITE_API_BASE_URL=http://localhost:4000/api
VITE_APP_NAME=SupportFlow
```

The login flow returns a mocked session in development so the base app can run
before the backend is ready.
