import { Bell, Search, User, LogOut, Menu, Settings } from 'lucide-react';

const Topbar = ({ userName, userRole, onMenuClick, onLogout }) => {
  return (
    <header className="bg-card border-b border-gray-200 shadow-sm">
      <div className="px-4 md:px-8 py-4 flex items-center justify-between">
        {/* Mobile Menu Button */}
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 hover:bg-gray-100 rounded-xl transition-colors"
        >
          <Menu className="w-6 h-6 text-text-muted" />
        </button>

        {/* Search Bar */}
        <div className="flex-1 max-w-xl mx-4 hidden md:block">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-muted" />
            <input
              type="text"
              placeholder="Search jobs, companies, students..."
              className="w-full pl-12 pr-4 py-3 bg-background border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 text-sm"
            />
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <button className="relative p-2 hover:bg-gray-100 rounded-xl transition-colors group">
            <Bell className="w-6 h-6 text-text-muted group-hover:text-primary transition-colors" />
            <span className="absolute top-1 right-1 w-3 h-3 bg-error rounded-full border-2 border-card animate-pulse-soft"></span>
          </button>

          {/* Settings */}
          <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors group">
            <Settings className="w-6 h-6 text-text-muted group-hover:text-primary transition-colors" />
          </button>

          {/* User Profile */}
          <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
            <div className="text-right hidden md:block">
              <p className="text-sm font-semibold text-text-primary">{userName}</p>
              <p className="text-xs text-text-muted capitalize">{userRole}</p>
            </div>
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-purple-600 rounded-full flex items-center justify-center shadow-md">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-success rounded-full border-2 border-card"></div>
            </div>

            {/* Logout Button */}
            <button
              onClick={onLogout}
              className="p-2 hover:bg-red-50 rounded-xl transition-colors group"
              title="Logout"
            >
              <LogOut className="w-5 h-5 text-text-muted group-hover:text-error transition-colors" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;