# CampusHire — Campus Placement Management System

A modern, production-grade full-stack web application for managing campus placement activities. Built with **React 19 + Vite** on the frontend and **PHP 8.2 + MySQL** on the backend, with JWT-based authentication and role-based access control for three user types: **Students**, **Placement Officers (Admin)**, and **Company HR Representatives**.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite, Tailwind CSS, React Router v6, Recharts, Lucide React, Axios |
| Backend | PHP 8.2+, MySQL 8.0, PDO |
| Authentication | JWT (HS256), bcrypt password hashing |
| State Management | React Context API |

---

## Features

### Student Portal
- Dashboard with overview of applications, interviews, and offers
- Profile management — edit personal details, skills, and resume
- Browse and filter job openings with eligibility criteria
- Track application status across all companies
- View upcoming and past interview schedules
- Manage job offers with CTC breakdown

### Admin Portal (Placement Officer)
- Analytics dashboard with placement statistics and charts
- Manage all registered students with status tracking
- Add and manage recruiting companies (with verification)
- Control all job listings and their status
- Review and shortlist candidates
- Department-wise and company-wise reports

### Company HR Portal
- Dashboard overview of posted jobs and applicants
- Post new job listings with detailed eligibility criteria
- Review applications with filtering options
- Organize interview rounds and schedules
- Manage offer letters and CTC details

### Security
- Stateless JWT authentication with role-based access control (RBAC)
- Protected routes per user role with automatic redirection
- Secure file uploads (resumes, offer letters)
- bcrypt password hashing
- Persistent session via localStorage

---

## Project Structure

```
CampusHire/
├── Campus_Placement/          # React Frontend
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Topbar.jsx
│   │   │   ├── StatsCard.jsx
│   │   │   ├── JobCard.jsx
│   │   │   ├── StatusBadge.jsx
│   │   │   ├── DataTable.jsx
│   │   │   ├── Modal.jsx
│   │   │   └── EmptyState.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── data/
│   │   │   └── mockData.js
│   │   ├── layouts/
│   │   │   └── DashboardLayout.jsx
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── student/
│   │   │   ├── admin/
│   │   │   └── company/
│   │   ├── App.jsx
│   │   └── index.css
│   ├── .env
│   └── package.json
│
├── backend/                   # PHP REST API
│   ├── migrations/
│   │   ├── 001_initial_schema.sql
│   │   └── 002_seed_data.sql
│   ├── .env
│   └── .env.example
│
└── uploads/                   # Resumes & offer letter storage
```

---

## Getting Started

### Prerequisites
- PHP 8.2+
- MySQL 8.0+
- Node.js v18+ and npm
- Apache or Nginx with `mod_rewrite` enabled

---

### 1. Database Setup

```bash
# Create the database
mysql -u root -p
CREATE DATABASE campus_placement;
exit;

# Import schema and seed data
mysql -u root -p campus_placement < backend/migrations/001_initial_schema.sql
mysql -u root -p campus_placement < backend/migrations/002_seed_data.sql
```

---

### 2. Backend Setup

```bash
cd backend/

# Copy and configure environment variables
cp .env.example .env
```

Edit `.env` with your values:

```env
DB_HOST=localhost
DB_NAME=campus_placement
DB_USER=root
DB_PASS=your_password
JWT_SECRET=your_secure_secret_key
```

Point your web server (Apache/Nginx) to the `backend/` directory and ensure `mod_rewrite` is enabled.

---

### 3. Frontend Setup

```bash
cd Campus_Placement/

# Install dependencies
npm install

# Create environment file
echo "VITE_API_URL=http://localhost/Campus_Placement/backend" > .env

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

---

### 4. File Upload Permissions

Ensure the `uploads/` directory has write permissions:

```bash
chmod -R 755 uploads/
```

---

## Default Credentials

| Role | Email | Password |
|---|---|---|
| Admin | admin@college.edu | student123 |
| Student | arjun.sharma@college.edu | student123 |
| Company HR | hr@cloudtech.com | student123 |

> **Note:** All seed data accounts share the same password for testing purposes. Change these before any production deployment.

---

## Routes

### Public
| Path | Description |
|---|---|
| `/` | Login / Landing page |

### Student Routes
| Path | Description |
|---|---|
| `/student/dashboard` | Student dashboard |
| `/student/profile` | Profile management |
| `/student/jobs` | Browse job openings |
| `/student/applications` | Application tracking |
| `/student/interviews` | Interview schedule |
| `/student/offers` | Offer management |

### Admin Routes
| Path | Description |
|---|---|
| `/admin/dashboard` | Analytics dashboard |
| `/admin/students` | Student management |
| `/admin/companies` | Company management |
| `/admin/jobs` | Job postings |
| `/admin/applications` | Application review |
| `/admin/schedules` | Interview scheduling |
| `/admin/reports` | Reports & analytics |

### Company Routes
| Path | Description |
|---|---|
| `/company/dashboard` | Company dashboard |
| `/company/post-job` | Create job posting |
| `/company/applicants` | Review applicants |
| `/company/interviews` | Schedule interviews |
| `/company/offers` | Send offers |

---

## Design System

| Token | Value |
|---|---|
| Primary | Deep Navy `#1A237E` |
| Accent | Amber/Gold `#FFB300` |
| Background | Light Gray `#F5F7FA` |
| Heading Font | Sora |
| Body Font | Inter |

---

## Mock Data (Frontend)

| Entity | Count |
|---|---|
| Students | 10 |
| Companies | 5 |
| Job Listings | 8 |
| Applications | 15 |
| Interview Schedules | 5 |
| Offer Letters | 4 |

---

## Build for Production

```bash
# Frontend
cd Campus_Placement/
npm run build
# Output in dist/
```

---

## Future Enhancements

- Real-time notifications via WebSockets
- Email integration for offer letters and interview alerts
- PDF resume viewer in-browser
- Calendar integration for interview scheduling
- Bulk operations for admin (shortlist, reject)
- Export functionality (CSV, PDF reports)
- Dark mode support
- Multi-language support
- Advanced analytics with more chart types

---

## License

This is a demo/educational project. Not intended for production use without security hardening.