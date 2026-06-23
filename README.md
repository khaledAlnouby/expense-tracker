# Expense Tracker Backend API

This is a Node.js REST API for an Expense Tracker application. It allows users to manage their expenses, track spending, and generate summaries. It is built using Express, MongoDB, and JSON Web Tokens (JWT) for authentication.

## Project Structure Explained

- **`src/app.js`**: Initializes the Express application, sets up middleware (CORS, JSON body parser), and mounts the main API routes.
- **`src/server.js`**: The entry point for the application. It connects to the MongoDB database and starts the server on the specified port.
- **`src/config/db.js`**: Contains the logic to connect to the MongoDB database using Mongoose.
- **`src/models/`**: Contains the Mongoose schemas that define the structure of data in the database.
  - `user.model.js`: Schema for users (name, email, hashed password).
  - `expense.model.js`: Schema for expenses (title, amount, category, date, description, and reference to the user who created it).
- **`src/controllers/`**: Contains the business logic for handling requests.
  - `auth.controller.js`: Logic for registering and logging in users.
  - `expense.controller.js`: Logic for CRUD operations on expenses, generating summaries, and exporting data.
- **`src/routes/`**: Defines the API endpoints and maps them to controller functions.
  - `auth.routes.js`: Endpoints for `/api/auth`.
  - `expense.routes.js`: Endpoints for `/api/expenses`.
- **`src/middlewares/`**: Contains custom middleware functions.
  - `auth.middleware.js`: Verifies the JWT token to protect private routes.
  - `error.middleware.js`: Catches errors and returns them in a consistent JSON format.

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Authenticate user & get token

### Expenses (Requires JWT Token)
- `GET /api/expenses` - Get all expenses (Supports query params: `category`, `minAmount`, `maxAmount`, `startDate`, `endDate`)
- `POST /api/expenses` - Create a new expense
- `PUT /api/expenses/:id` - Update an expense
- `DELETE /api/expenses/:id` - Delete an expense
- `GET /api/expenses/summary` - Get monthly summary aggregated by category (Supports query params: `year`, `month`)
- `GET /api/expenses/export` - Export expenses to CSV

## Getting Started

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Set up a `.env` file with `PORT`, `MONGODB_URI`, and `JWT_SECRET`.
4. Run `node src/server.js` to start the server.
