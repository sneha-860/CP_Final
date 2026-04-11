import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { GraduationCap, LogOut, User } from 'lucide-react';

const Sidebar = ({ isOpen, menuItems, userRole, userName, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(0);

  useEffect(() => {
    // Find active item based on current path
    const currentPath = location.pathname;
    const activeIndex = menuItems.findIndex(item => item.path === currentPath);
    if (activeIndex !== -1) {
      setActiveItem(activeIndex);
    }
  }, [location.pathname, menuItems]);

  const handleItemClick = (item, idx) => {
    setActiveItem(idx);
    navigate(item.path);
    onClose && onClose();
  };

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case 'student': return 'bg-primary/20 text-primary border border-primary/30';
      case 'admin': return 'bg-secondary/20 text-secondary border border-secondary/30';
      case 'company': return 'bg-success/20 text-success border border-success/30';
      default: return 'bg-gray-500/20 text-gray-400 border border-gray-500/30';
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed md:static inset-y-0 left-0 w-72 bg-sidebar text-white transform transition-all duration-300 z-40 md:z-0 shadow-sidebar ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Logo Section */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="font-heading font-bold text-xl">CampusHire</h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="px-2 py-0.5 bg-white/20 rounded-full text-xs font-medium backdrop-blur-glass">
                  v1.0
                </span>
                <span className="text-xs text-white/60 capitalize">{userRole} Portal</span>
              </div>
            </div>
          </div>
        </div>

        {/* User Profile Section */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-purple-600 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-sidebar"></div>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-white">{userName || 'User'}</p>
              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium mt-1 ${getRoleBadgeColor(userRole)}`}>
                {userRole?.charAt(0).toUpperCase() + userRole?.slice(1)}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item, idx) => {
            const Icon = item.icon;
            const isActive = activeItem === idx;
            
            return (
              <button
                key={idx}
                onClick={() => handleItemClick(item, idx)}
                className={`sidebar-nav-item w-full group ${
                  isActive ? 'active' : ''
                }`}
              >
                <Icon className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" />
                <span className="text-sm font-medium">{item.label}</span>
                {isActive && (
                  <div className="ml-auto w-2 h-2 bg-primary rounded-full animate-pulse-soft"></div>
                )}
              </button>
            );
          })}
        </nav>

        {/* Logout Section */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={() => {
              // This will be handled by the Topbar component
              navigate('/');
            }}
            className="sidebar-nav-item w-full group hover:bg-red-500/10 hover:text-red-400"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>

        {/* Bottom Gradient Accent */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-purple-600 to-secondary"></div>
      </aside>
    </>
  );
};

export default Sidebar;