# Approva Frontend

This is the frontend application for Approva, built with a modern React stack and scalable feature-based architecture.

## Tech Stack

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Routing**: [TanStack Router](https://tanstack.com/router) (File-based, type-safe routing)
- **State/Data Fetching**: [TanStack Query](https://tanstack.com/query)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Components**: [shadcn/ui](https://ui.shadcn.com/) (Radix UI + Tailwind)
- **HTTP Client**: Axios

## Getting Started

### Prerequisites

You need [Node.js](https://nodejs.org/) installed on your machine. We recommend using the latest LTS version.

### Installation

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure environment variables:
   Ensure your API URL is correctly set. Check your `.env` or configuration file (`src/env.ts`) matches your local backend URL. Defaults typically expect the backend at `http://localhost:8000`.

### Running Locally

Start the Vite development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## Architecture Overview

The application follows a **feature-based** folder structure to keep logic encapsulated and scalable:

```text
src/
 ├── features/
 │    └── auth/              # Feature module (e.g., authentication)
 │         ├── api/          # API endpoint calls
 │         ├── components/   # Feature-specific React components
 │         ├── hooks/        # React Query hooks specific to the feature
 │         └── types.ts      # TypeScript interfaces
 ├── components/             # Global, shared UI components (like shadcn buttons, inputs)
 ├── lib/                    # Global utilities and generic tools (e.g., API client config)
 └── routes/                 # Global page routes (TanStack Router)
```

By organizing code strictly around features rather than technical layers, the codebase remains easy to navigate as the project grows.

## Scripts & Commands

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the app for production into the `dist` folder.
- `npm run check`: Runs Prettier (formatting) and ESLint (linting / fixes).
- `npm run preview`: Locally previews the production build.
