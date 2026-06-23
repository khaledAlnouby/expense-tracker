# Expense Tracker Backend API

This is a Node.js REST API for an Expense Tracker application. It allows users to manage their expenses, track spending, and generate summaries. It is built using Express, MongoDB, and JSON Web Tokens (JWT) for authentication.

## Tech Stack

- **Runtime**: [Node.js](https://nodejs.org/) (v14.x or higher)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/)
- **ODM**: [Mongoose](https://mongoosejs.com/)
- **Authentication**: [JWT (jsonwebtoken)](https://jwt.io/)
- **Password Hashing**: [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- **Validation**: [express-validator](https://express-validator.github.io/)

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
