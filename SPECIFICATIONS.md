# 🚀 Technical Challenge: Full Stack Developer - PITZ

## 1. Project Objective
Develop a complete web application for product management (CRUD) using Ruby on Rails for the backend and React for the frontend.

## 2. Tech Stack
* **Backend:** Ruby on Rails (API Mode) with PostgreSQL as the database.
* **Frontend:** React with TypeScript and Vite.
* **Styling:** TailwindCSS.
* **Testing:** * RSpec for backend unit tests.
    * React Testing Library for frontend unit tests.

## 3. Data Model Specification (`Product`)
The `Product` model must contain the following fields and validations:

| Field | Type | Required | Validations / Rules |
| :--- | :--- | :---: | :--- |
| `name` | String | Yes | Length: 3 - 100 characters. |
| `description` | Text | No | Maximum 1000 characters. |
| `price` | Decimal | Yes | Must be greater than 0. |
| `stock` | Integer | Yes | Cannot be negative (min: 0). |
| `sku` | String | Yes | Unique; only uppercase letters, numbers and hyphens. |
| `active` | Boolean | Yes | Default: `true`. |
| `created_at` | DateTime | Auto | Automatically generated. |
| `updated_at` | DateTime | Auto | Automatically updated. |

## 4. API Definition (Endpoints & Features)
The API must be implemented in **API Mode** using **PostgreSQL**.

### Key Features
* **Validations:** All data must be strictly validated before saving to the database.
* **Error Handling:** Provide appropriate JSON responses for errors such as 404 (Not Found), 422 (Unprocessable Entity), and 500 (Internal Server Error).
* **Pagination:** Product listings must be paginated with a default of 10 items per page.
* **Search & Filters:** Support for searching by product name and filtering by status (active/inactive).
* **CORS:** Properly configured to allow requests from the React frontend.

### Endpoints
* `GET /api/v1/products`: List products (paginated).
* `GET /api/v1/products/:id`: Retrieve a single product.
* `POST /api/v1/products`: Create a product.
* `PUT /api/v1/products/:id`: Update a product.
* `DELETE /api/v1/products/:id`: Remove a product.

## 5. Frontend Requirements & Validations
* **Product Listing:** Displayed in cards with functional pagination, search bar, and status filters.
* **Forms:** Modal for Create/Edit with real-time validation and clear error messages.
* **Specific Field Validations:**
    * **Name:** Min 3 chars, Max 100 chars.
    * **SKU:** Only uppercase letters, numbers, and hyphens (Regex validation).
    * **Price:** Decimal format, must be strictly greater than 0.
    * **Stock:** Non-negative integer (min: 0).
    * **Description:** Optional, max 1000 characters.
* **Feedback:** Confirmation dialogs before saving/deleting, loading states, and visual error handling (toast or field-level alerts).

## 6. Mandatory Testing Suite

### Backend (RSpec)
* **Models:** Test all validation constraints (presence, length, numericality, uniqueness) and custom scopes.
* **API Endpoints:** Integration tests for all CRUD operations and edge cases (boundary conditions and error status codes).

### Frontend (React Testing Library)
* **Unit/Integration:** * **Input Validation:** Ensure error messages appear for invalid SKU format, negative price, or short names.
    * **Form Submission:** Verify that the API is not called if local validations fail.
    * **Server Error Mapping:** Verify that 422 Unprocessable Entity errors from Rails are displayed correctly in the UI.

## 7. Evaluation Criteria
* **Functionality (30%):** All CRUD operations, validations, search, and filters are working correctly.
* **Backend Code (25%):** Proper structure, Rails conventions, error handling, and complete RSpec tests.
* **Frontend Code (25%):** Well-structured components, correct TypeScript usage, and intuitive UX.
* **Best Practices (20%):** Clean code, atomic commits, and a clear README with instructions.