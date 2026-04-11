# CampusHire - Campus Placement Management System

A modern, production-grade web application for managing campus placement activities. Built with React, Tailwind CSS, and designed for three user roles: Students, Placement Officers (Admin), and Company HR Representatives.

## Features

### Student Portal
- **Dashboard**: Overview of applications, interviews, and offers
- **Profile Management**: Edit personal details, skills, and resume
- **Browse Jobs**: Search and filter job openings with eligibility criteria
- **My Applications**: Track application status across all companies
- **Interview Schedule**: View upcoming and past interview details
- **Results & Offers**: Manage job offers with CTC breakdown

### Admin Portal (Placement Officer)
- **Dashboard**: Complete analytics with charts and placement statistics
- **Manage Students**: View all registered students with status tracking
- **Manage Companies**: Add and manage recruiting companies
- **Job Postings**: Control all job listings and their status
- **Applications Management**: Review and shortlist candidates
- **Reports & Analytics**: Department-wise and company-wise insights

### Company HR Portal
- **Dashboard**: Overview of posted jobs and applicants
- **Post a Job**: Create new job listings with detailed criteria
- **View Applicants**: Review applications with filtering options
- **Schedule Interviews**: Organize interview rounds
- **Send Offers**: Manage offer letters and CTC details

## Design System

- **Primary Color**: Deep Navy (#1A237E)
- **Accent Color**: Amber/Gold (#FFB300)
- **Background**: Light Gray (#F5F7FA)
- **Typography**:
  - Headings: Sora
  - Body: Inter

## Tech Stack

- **Framework**: React.js with Vite
- **Routing**: React Router v6
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Charts**: Recharts
- **State Management**: React Context API

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The application will open at `http://localhost:5173`

### Build

```bash
npm run build
```

## Demo Credentials

### Student Login
- **Email**: student@college.edu
- **Password**: student123
- **Profile**: Arjun Sharma (CS, CGPA: 8.9)

### Admin Login
- **Email**: admin@college.edu
- **Password**: admin123
- **Name**: Dr. Ramesh Kumar (Placement Officer)

### Company HR Login
- **Email**: hr@cloudtech.com
- **Password**: company123
- **Company**: CloudTech Solutions

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Sidebar.jsx
│   ├── Topbar.jsx
│   ├── StatsCard.jsx
│   ├── JobCard.jsx
│   ├── StatusBadge.jsx
│   ├── DataTable.jsx
│   ├── Modal.jsx
│   └── EmptyState.jsx
├── context/            # React Context providers
│   └── AuthContext.jsx
├── data/               # Mock data
│   └── mockData.js
├── layouts/            # Layout components
│   └── DashboardLayout.jsx
├── pages/              # Page components
│   ├── Login.jsx
│   ├── student/        # Student pages
│   ├── admin/          # Admin pages
│   └── company/        # Company pages
├── App.jsx            # Main app with routing
└── index.css          # Global styles
```

## Key Features

### Authentication & Authorization
- Role-based authentication system
- Protected routes for each user role
- Persistent session with localStorage
- Automatic redirection based on role

### Responsive Design
- Fully responsive across mobile, tablet, and desktop
- Collapsible sidebar for mobile navigation
- Adaptive layouts for all screen sizes

### Data Management
- Comprehensive mock data for 10 students, 5 companies, 8 jobs
- 15 applications with various statuses
- 5 interview schedules
- 4 offer letters

### UI/UX Excellence
- Modern, clean interface with corporate-academic aesthetic
- Smooth transitions and hover effects
- Status-based color coding
- Interactive charts and statistics
- Toast notifications and modals
- Search, filter, and pagination functionality

## Component Library

### Shared Components

1. **Sidebar**: Role-aware navigation with icons
2. **Topbar**: User info, notifications, and logout
3. **StatsCard**: Metric display with icons and trends
4. **JobCard**: Rich job listing with apply functionality
5. **StatusBadge**: Color-coded status indicators
6. **DataTable**: Sortable, searchable, paginated tables
7. **Modal**: Generic modal for forms and details
8. **EmptyState**: Friendly empty state messages

## Routes

### Public Routes
- `/` - Login/Landing page

### Student Routes
- `/student/dashboard` - Student dashboard
- `/student/profile` - Profile management
- `/student/jobs` - Browse job openings
- `/student/applications` - Application tracking
- `/student/interviews` - Interview schedule
- `/student/offers` - Offer management

### Admin Routes
- `/admin/dashboard` - Analytics dashboard
- `/admin/students` - Student management
- `/admin/companies` - Company management
- `/admin/jobs` - Job postings
- `/admin/applications` - Application review
- `/admin/schedules` - Interview scheduling
- `/admin/reports` - Reports & analytics

### Company Routes
- `/company/dashboard` - Company dashboard
- `/company/post-job` - Create job posting
- `/company/applicants` - Review applicants
- `/company/interviews` - Schedule interviews
- `/company/offers` - Send offers

## Future Enhancements

- Real-time notifications
- Email integration
- PDF resume viewer
- Calendar integration for interviews
- Advanced analytics with more charts
- Bulk operations for admin
- Export functionality (CSV, PDF)
- Dark mode support
- Multi-language support

## License

This is a demo project for educational purposes.

## Support

For any questions or issues, please contact the development team.
