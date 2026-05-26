# MPloyChek - Internship Assignment

An Angular SPA with Node.js backend for role-based user management and background verification records.

## Tech Stack
- Frontend: Angular 17+, TypeScript
- Backend: Node.js, Express.js
- Storage: In-memory (array-based)

## Features
- Login with User ID, Password and Role
- Role-based access (Admin / General User)
- Dashboard with user details and records table
- Async loading with spinner (2 second API delay)
- Admin panel — add and delete users
- Route guard protecting authenticated pages
- AuthService and UserService for modular architecture

## How to Run

### Backend
```
cd mploychek-backend
npm install
node server.js
```
Backend runs on http://localhost:3000

### Frontend
```
npm install
ng serve
```
Frontend runs on http://localhost:4200

## Login Credentials
| User ID | Password | Role |
|---------|----------|------|
| admin | admin123 | Admin |
| varun | varun123 | General User |
