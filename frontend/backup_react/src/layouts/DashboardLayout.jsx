import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, Hop as Home, User, Briefcase, Award, Calendar, FileText, Settings, Users, Building2, ChartBar as BarChart3 } from 'lucide-react';
import Topbar from '../components/Topbar';
import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const getMenuItems = () => {
    if (user?.role === 'student') {
      return [
        { label: 'Dashboard', icon: Home, path: '/student/dashboard' },
        { label: 'My Profile', icon: User, path: '/student/profile' },
        { label: 'Browse Jobs', icon: Briefcase, path: '/student/jobs' },
        { label: 'My Applications', icon: FileText, path: '/student/applications' },
        { label: 'Interview Schedule', icon: Calendar, path: '/student/interviews' },
        { label: 'Results & Offers', icon: Award, path: '/student/offers' },
      ];
    } else if (user?.role === 'admin') {
      return [
        { label: 'Dashboard', icon: Home, path: '/admin/dashboard' },
        { label: 'Manage Students', icon: Users, path: '/admin/students' },
        { label: 'Manage Companies', icon: Building2, path: '/admin/companies' },
        { label: 'Job Postings', icon: Briefcase, path: '/admin/jobs' },
        { label: 'Applications', icon: FileText, path: '/admin/applications' },
        { label: 'Interview Schedules', icon: Calendar, path: '/admin/schedules' },
        { label: 'Reports & Analytics', icon: BarChart3, path: '/admin/reports' },
      ];
    } else if (user?.role === 'company') {
      return [
        { label: 'Dashboard', icon: Home, path: '/company/dashboard' },
        { label: 'Post a Job', icon: Briefcase, path: '/company/post-job' },
        { label: 'View Applicants', icon: Users, path: '/company/applicants' },
        { label: 'Schedule Interviews', icon: Calendar, path: '/company/interviews' },
        { label: 'Send Offers', icon: Award, path: '/company/offers' },
      ];
    }
    return [];
  };

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar
        isOpen={sidebarOpen}
        menuItems={getMenuItems()}
        userRole={user?.role}
        userName={user?.name}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col">
        <Topbar
          userName={user?.name}
          userRole={user?.role}
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          onLogout={() => {
            logout();
            navigate('/');
          }}
        />

        <main className="flex-1 overflow-auto">
          <div className="p-4 md:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;