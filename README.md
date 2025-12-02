This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

Views:
<img width="1548" height="934" alt="2025-12-02-11:07:25" src="https://github.com/user-attachments/assets/0741c712-7bd7-4c33-9aa9-cbdecf8270e2" />

<img width="1433" height="899" alt="2025-12-02-11:07:49" src="https://github.com/user-attachments/assets/ca76eb3b-1696-429a-9c5b-7f3f6a8bf70c" />

Add/Edit Modal:
<img width="1681" height="934" alt="2025-12-02-11:07:36" src="https://github.com/user-attachments/assets/c547da4c-170e-4b8b-84f4-29f62a543d4e" />

## Getting Started
I have the frontend pointed to 5001, please start the server there. Use `npm run dev` to start the frontend.

## What I did to modernize this project
  1. Entity-Agnostic DataTable Component - A generic, reusable DataTable<T> component that handles any entity type (Patients,
  Doctors, Appointments) with configurable columns, forms, and CRUD operations via props
  2. Configuration-Driven Entity Management (entityConfigs.tsx) - Declarative column definitions, form field specs, and data
  transformers for each entity - add a new entity type without touching component code
  3. Next.js API Routes as BFF (Backend-for-Frontend) - Frontend routes (/api/patients, etc.) proxy to the Express backend,
  decoupling client from direct backend access
  5. Shared Type Definitions (shared/types.ts) - Single source of truth TypeScript interfaces used by both frontend and backend
  6. Generic TypeScript API Client (lib/api.ts) - Fully typed fetchApi<T> wrapper with type-safe CRUD operations for all entities
  7. Reusable UI Components:
    - Modal - Generic modal dialog
    - Tabs - Tab navigation component
    - Pagination - Client-side pagination
  7. Tailwind CSS 4 - Modern utility-first styling
  8. Vitest Testing - Modern test runner configured for React components

## Improvements to be made
  ### Backend/API

  - Database integration - Replace in-memory data with PostgreSQL/SQLite for persistence
  - Input validation - Add Zod or Joi schemas for request validation
  - Error handling middleware - Centralized error handling with proper HTTP status codes
  - Authentication/Authorization - JWT or session-based auth with role-based access (admin, doctor, patient)
  ### Frontend
  - Server Components - Move data fetching to React Server Components (reduce client bundle)
  - Optimistic updates - Update UI before API confirms for snappier UX
  - Form validation - Client-side validation with react-hook-form + Zod
  - Error boundaries - Graceful error handling with fallback UI
  - Loading skeletons - Replace "Loading..." with skeleton components

  ### Features
  - Patient-Doctor relationship view - See all appointments for a patient/doctor
  - Dashboard with stats - Total patients, upcoming appointments, etc.

This is basic start to being able to view organize patients, appointments, and doctors. Further integration would be needed to make this a streamline experience to maintain the relationship between these entities. I'm happy to further extend on the work setup here, wasn't sure how in-depth we wanted to go from the instructions. Also, I had better commits messages showing my thought processes throughout, I had to create a new repo to keep the server code out and didn't keep my git commit history saved. Happy to talk through any of my thoughts while building this.
