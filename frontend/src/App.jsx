import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginTest from './pages/LoginTest';
import DashboardLayout from './layouts/DashboardLayout';

import StudentDashboard from './pages/student/Dashboard';
import StudentProfile from './pages/student/Profile';
import BrowseJobs from './pages/student/BrowseJobs';
import MyApplications from './pages/student/Applications';
import InterviewSchedule from './pages/student/Interviews';
import ResultsOffers from './pages/student/Offers';

import AdminDashboard from './pages/admin/Dashboard';
import ManageStudents from './pages/admin/ManageStudents';
import ManageCompanies from './pages/admin/ManageCompanies';

import CompanyDashboard from './pages/company/Dashboard';
import PostJob from './pages/company/PostJob';
import ViewApplicants from './pages/company/ViewApplicants';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to={`/${user.role}/dashboard`} replace />;
  }

  return children;
};

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to={`/${user.role}/dashboard`} replace /> : <LoginTest />} />

      <Route path="/student" element={<ProtectedRoute allowedRoles={['student']}><DashboardLayout /></ProtectedRoute>}>
        <Route path="dashboard" element={<StudentDashboard />} />
        <Route path="profile" element={<StudentProfile />} />
        <Route path="jobs" element={<BrowseJobs />} />
        <Route path="applications" element={<MyApplications />} />
        <Route path="interviews" element={<InterviewSchedule />} />
        <Route path="offers" element={<ResultsOffers />} />
      </Route>

      <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']}><DashboardLayout /></ProtectedRoute>}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="students" element={<ManageStudents />} />
        <Route path="companies" element={<ManageCompanies />} />
        <Route path="jobs" element={<div className="text-center py-12 text-gray-500">Job Postings Page - Coming Soon</div>} />
        <Route path="applications" element={<div className="text-center py-12 text-gray-500">Applications Page - Coming Soon</div>} />
        <Route path="schedules" element={<div className="text-center py-12 text-gray-500">Interview Schedules Page - Coming Soon</div>} />
        <Route path="reports" element={<div className="text-center py-12 text-gray-500">Reports & Analytics Page - Coming Soon</div>} />
      </Route>

      <Route path="/company" element={<ProtectedRoute allowedRoles={['company']}><DashboardLayout /></ProtectedRoute>}>
        <Route path="dashboard" element={<CompanyDashboard />} />
        <Route path="post-job" element={<PostJob />} />
        <Route path="applicants" element={<ViewApplicants />} />
        <Route path="interviews" element={<div className="text-center py-12 text-gray-500">Schedule Interviews Page - Coming Soon</div>} />
        <Route path="offers" element={<div className="text-center py-12 text-gray-500">Send Offers Page - Coming Soon</div>} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
