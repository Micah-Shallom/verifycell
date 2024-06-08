---

# VerifyCell 
### FastAPI User Management API

## Project Overview

This project implements a user management API using FastAPI, SQLAlchemy for database interaction, JWT tokens for authentication, and various utilities for handling user registration, login, profile management, OTP verification, and token refreshing. It provides endpoints to register new users, authenticate users via login, refresh authentication tokens, send and verify OTPs, and fetch user profiles.

### Features

- **User Registration**: Endpoint to create a new user with fields such as firstname, lastname, username, email, password, and phone_number.
- **User Authentication**: Login endpoint to authenticate users using email and password, returning JWT tokens (access_token and refresh_token) upon successful authentication.
- **Token Refreshing**: Endpoint to refresh the access_token using a refresh_token.
- **OTP Management**: Endpoints to send OTPs to users for phone number verification and verify OTPs entered by users, using Sendchamp API (VerifyCell).
- **User Profile**: Endpoint to fetch user profile information by username.
- **Security**: Utilizes JWT (JSON Web Tokens) for secure authentication and authorization.

## Installation and Setup

### Prerequisites

- Python 3.7+
- pip package manager
- PostgreSQL database (or change the database URL in configuration)

### Installation Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/Micah-Shallom/verifycell.git
   cd repository
   ```

2. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

3. Set up environment variables:
   
   Create a `.env` file in the root directory with the following variables:

   ```plaintext
   SQLALCHEMY_DATABASE_URI=postgresql://user:password@localhost/dbname
   SENDCHAMP_API_KEY=<your_sendchamp_api_key>
   ACCESS_TOKEN_EXPIRE_MINUTES=30
   REFRESH_TOKEN_EXPIRE_MINUTES=720
   JWT_SECRET_KEY=<your_jwt_secret_key>
   JWT_REFRESH_SECRET_KEY=<your_jwt_refresh_secret_key>
   ```

   Adjust `SQLALCHEMY_DATABASE_URI` according to your PostgreSQL setup.

4. Apply database migrations:

   ```bash
   alembic upgrade head
   ```

5. Start the FastAPI server:

   ```bash
   uvicorn app.main:app --reload
   ```

   The API server should now be running on `http://localhost:8000`.

## Endpoints

### User Management

- **Register User**: `POST /api/users/register`
  - Creates a new user with provided details (firstname, lastname, username, email, password, phone_number).

- **Login User**: `POST /api/users/login`
  - Authenticates user based on email and password, returns access_token and refresh_token.

- **Refresh Token**: `POST /api/users/refresh`
  - Refreshes the access_token using a refresh_token.

### OTP Management

- **Send OTP**: `POST /api/users/send-otp`
  - Sends OTP to user's phone number for verification, using Sendchamp API (VerifyCell).

- **Verify OTP**: `POST /api/users/verify-otp`
  - Verifies OTP entered by the user, using Sendchamp API (VerifyCell).

### User Profile

- **Get User Profile**: `GET /api/users/profile/{username}`
  - Fetches user profile information by username.

### Utility

- **Test Authentication**: `GET /api/users/test-auth`
  - Simple endpoint to test authentication by returning request headers.

## Dependencies

- **FastAPI**: Modern web framework for building APIs with Python 3.7+.
- **SQLAlchemy**: SQL toolkit and ORM for interacting with databases.
- **Pydantic**: Data validation and settings management using Python type annotations.
- **Passlib**: Password hashing library (used via `werkzeug.security`).
- **JWT**: JSON Web Tokens for secure authentication.
- **uvicorn**: ASGI server for running FastAPI applications.
- **alembic**: Database migrations tool for SQLAlchemy.

## Contributing

- Fork the repository.
- Create a new branch (`git checkout -b feature/fooBar`).
- Commit your changes (`git commit -am 'Add some fooBar'`).
- Push to the branch (`git push origin feature/fooBar`).
- Create a new Pull Request.

