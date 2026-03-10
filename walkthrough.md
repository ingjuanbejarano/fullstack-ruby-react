# PITZ Challenge - Full Stack Implementation Walkthrough

## Overview

The PITZ Challenge has been successfully completed! A complete full-stack web application for product management has been implemented, featuring a robust Ruby on Rails backend API and a highly responsive, modern React frontend built with Vite, TypeScript, and TailwindCSS.

## Architecture & Implementation Highlights

### Backend (Ruby on Rails)

1. **Clean Architecture**: 
   - Business logic for creating, updating, and deleting products has been extracted into Service Objects (`Products::CreateService`, `Products::UpdateService`, `Products::DestroyService`).
   - Controllers remain extremely thin, handling only HTTP request routing and parameters.

2. **Database & Validations**:
   - PostgreSQL is used as the database with strict constraints applied at the migration level (e.g., `CHECK (price > 0)` and `UNIQUE(sku)`).
   - ActiveRecord validations align with database constraints, preventing invalid states before hitting the DB.

3. **Global Error Handling**:
   - An `ErrorHandler` concern intercepts `ActiveRecord::RecordNotFound` and `ActiveRecord::RecordInvalid` exceptions.
   - It formats standard JSON responses: `404 Not Found` for missing resources and `422 Unprocessable Entity` with an array of specific error messages for failed validations (e.g., duplicate SKUs).

4. **Testing**:
   - Model and Request specs have been implemented using RSpec, FactoryBot, and Faker.
   - 100% of the required validation and endpoints tests pass.

### Frontend (React + TypeScript + Vite)

1. **Modern UI/UX & Premium Feel**:
   - Built an aesthetically pleasing interface using TailwindCSS and Lucide-react icons. 
   - **Skeleton Loaders**: Implemented a modern loading state using animated skeletons (`ProductSkeleton`) that match the card structure, providing a smooth transition.
   - **Success Notifications**: Integrated a real-time notification system (Toasts) that provides immediate feedback upon creating, updating, or deleting products.

2. **SOLID Component Architecture**:
   - Refactored frontend components to strictly follow DRY, KISS, and SOLID principles.
   - Separate responsibilities: `ProductCard` (Presentation), `Pagination` (Navigation), `ProductModal` (Form Logic), and `ProductList` (Orchestration).
   - Used Semantic HTML5 tags (`<article>`, `<search>`, `<header>`, `<footer>`, etc.) for maximum accessibility.

3. **Custom Hooks & API Integration**:
   - A `useProducts` custom hook handles all API communication, state management (loading, error tracking), and abstracts the fetch logic.
   - Debounced search ensures the API is efficiently queried while users type.

## Validations & Verification Performed

- **Backend Robustness**:
  - `curl` requests with duplicated SKUs gracefully return `{"error": "Validation failed", "messages": ["Sku has already been taken"]}`.
  - **Global Error Handler**: Standardized responses for 404, 422, and 500 status codes.

- **Frontend Features Tested**:
  - **Pagination**: The UI dynamically paginates results into sets of 10.
  - **Filters**: Searching by name and filtering by "Active/Inactive" status work in real-time.
  - **Real-time Validation**: Form fields validate on-the-fly, preventing submission if requirements are not met.

## Instructions to Run

1. **Start Backend**: `cd backend && bin/rails server`
2. **Start Frontend**: `cd frontend && pnpm run dev`
3. Enjoy the Pitz Inventory platform!
