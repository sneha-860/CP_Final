# CampusHire - College Placement Management System

A full-stack placement portal with separate portals for Students, Companies, and Administrators.

## Tech Stack
- **Frontend**: React 19, Vite, Tailwind CSS, Lucide Icons, Axios.
- **Backend**: PHP 8.2+, MySQL 8.0, JWT (HS256) Authentication, PDO.

## Features
- **Student Portal**: Profile management, resume uploads, browse & apply for jobs, track application status.
- **Company Portal**: Manage company profile, post job openings, review applicants, schedule interviews.
- **Admin Portal**: System dashboard, user management, verify companies, generate placement reports.
- **Security**: Stateless JWT auth, role-based access control (RBAC), secure file uploads, bcrypt password hashing.

## Setup Instructions

### 1. Database Setup
1. Create a MySQL database named `campus_placement`.
2. Import the schema: `backend/migrations/001_initial_schema.sql`.
3. Import the seed data: `backend/migrations/002_seed_data.sql`.

### 2. Backend Configuration
1. Navigate to `backend/`.
2. Copy `.env.example` to `.env`.
3. Update `DB_HOST`, `DB_NAME`, `DB_USER`, `DB_PASS`, and `JWT_SECRET`.
4. Ensure your web server (Apache/Nginx) is pointed to the `backend/` directory and has `mod_rewrite` enabled.

### 3. Frontend Configuration
1. Navigate to `Campus_Placement/` (Frontend directory).
2. Install dependencies: `npm install`.
3. Create a `.env` file (if not present) and set `VITE_API_URL` to your backend URL (e.g., `http://localhost/Campus_Placement/backend`).
4. Start the dev server: `npm run dev`.

## Default Credentials (Seed Data)
| Role | Email | Password |
|---|---|---|
| Admin | `admin@college.edu` | `student123` |
| Student | `arjun.sharma@college.edu` | `student123` |
| Company | `hr@cloudtech.com` | `student123` |

*Note: All passwords in the seed data are currently set to the same hash for testing.*

## Project Structure
- `backend/`: PHP REST API.
- `Campus_Placement/`: React Frontend.
- `uploads/`: Storage for resumes and offer letters (Ensure write permissions).
