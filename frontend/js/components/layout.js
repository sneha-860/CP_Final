// Main Layout Component for CampusPlacement System
import { auth } from '../auth.js';

export function renderLayout(content) {
    const user = auth.getUser();
    if (!user) return content;

    return `
    <div class="min-h-screen flex bg-background selection:bg-primary/10 selection:text-primary">
        <!-- Sidebar Overlay (Mobile) -->
        <div id="sidebar-overlay" class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-30 transition-opacity hidden md:hidden"></div>

        <!-- Sidebar -->
        <aside id="sidebar" class="fixed md:static inset-y-0 left-0 w-72 bg-sidebar text-white transform -translate-x-full md:translate-x-0 transition-all duration-300 ease-in-out z-40 shadow-sidebar flex flex-col border-r border-white/5">
            ${renderSidebar(user)}
        </aside>

        <!-- Main Content Area -->
        <div class="flex-1 flex flex-col min-w-0 overflow-hidden">
            ${renderTopbar(user)}
            
            <main class="flex-1 overflow-auto p-4 md:p-8 lg:p-10">
                <div class="max-w-7xl mx-auto animate-fade-in-up">
                    ${content}
                </div>
            </main>
        </div>
    </div>
    `;
}

function renderSidebar(user) {
    const role = user.role;
    const menuItems = getMenuItems(role);
    const activePath = window.location.hash;

    return `
    <!-- Logo Section -->
    <div class="p-8">
        <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-gradient-to-tr from-primary to-primary-light rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20">
                <i data-lucide="graduation-cap" class="w-6 h-6 text-white"></i>
            </div>
            <div class="flex-1">
                <h1 class="font-heading font-extrabold text-2xl tracking-tight">CampusHire</h1>
                <div class="flex items-center gap-2 mt-0.5">
                    <span class="text-[10px] uppercase font-black text-primary-light tracking-widest whitespace-nowrap">${role} Portal</span>
                </div>
            </div>
        </div>
    </div>

    <!-- User Profile Section -->
    <div class="px-6 mb-6">
        <div class="p-4 bg-white/5 rounded-2xl border border-white/10">
            <div class="flex items-center gap-4">
                <div class="relative">
                    <div class="w-12 h-12 bg-gradient-to-br from-slate-700 to-slate-800 rounded-full flex items-center justify-center border border-white/10 ring-2 ring-white/5">
                        <i data-lucide="user" class="w-6 h-6 text-white/80"></i>
                    </div>
                    <div class="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-success rounded-full border-2 border-sidebar"></div>
                </div>
                <div class="flex-1 min-w-0">
                    <p class="font-bold text-white truncate text-sm">${user.name || 'User'}</p>
                    <p class="text-[10px] text-white/40 uppercase font-black tracking-widest mt-0.5">${role}</p>
                </div>
            </div>
        </div>
    </div>

    <!-- Navigation -->
    <div class="flex-1 px-4 space-y-1.5 overflow-y-auto">
        <p class="px-4 text-[10px] font-black text-white/20 uppercase tracking-[0.2em] mb-4">Main Menu</p>
        ${menuItems.map(item => `
            <a href="${item.path}" class="sidebar-nav-item ${activePath === item.path ? 'active' : ''}">
                <i data-lucide="${item.icon}" class="w-5 h-5"></i>
                <span class="font-bold text-sm tracking-wide">${item.label}</span>
            </a>
        `).join('')}
    </div>

    <!-- Logout -->
    <div class="mt-auto p-6">
        <button id="logout-btn" class="flex items-center gap-3 w-full px-4 py-3.5 bg-red-500/5 hover:bg-red-500/10 text-red-400/80 hover:text-red-400 rounded-2xl transition-all duration-200 group border border-red-500/10 hover:border-red-500/20">
            <i data-lucide="log-out" class="w-5 h-5 transition-transform group-hover:-translate-x-1"></i>
            <span class="font-bold text-sm">Logout Session</span>
        </button>
    </div>
    `;
}

function renderTopbar(user) {
    return `
    <header class="glass-effect sticky top-0 z-20 border-b border-slate-200/60 shadow-sm backdrop-blur-md">
        <div class="px-4 md:px-8 py-4 flex items-center justify-between">
            <!-- Mobile Menu Toggle -->
            <button id="mobile-menu-btn" class="md:hidden p-3 hover:bg-slate-100 rounded-xl transition-colors border border-transparent active:border-slate-200">
                <i data-lucide="menu" class="w-6 h-6 text-text-muted"></i>
            </button>

            <!-- Search Bar -->
            <div class="flex-1 max-w-xl mx-4 hidden md:block group">
                <div class="relative">
                    <i data-lucide="search" class="absolute left-4 top-1/2 transform -translate-y-1/2 w-4.5 h-4.5 text-text-muted transition-colors group-focus-within:text-primary"></i>
                    <input type="text" placeholder="Search for anything..." 
                           class="w-full pl-11 pr-4 py-2.5 bg-slate-100/50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-primary/5 focus:border-primary focus:bg-white outline-none transition-all text-sm font-medium placeholder:text-slate-400">
                </div>
            </div>

            <!-- Right Side -->
            <div class="flex items-center gap-2 md:gap-4">
                <button class="relative p-2.5 hover:bg-slate-100 rounded-xl transition-all group active:scale-95">
                    <i data-lucide="bell" class="w-5.5 h-5.5 text-text-muted group-hover:text-primary"></i>
                    <span class="absolute top-2.5 right-2.5 w-2 h-2 bg-error rounded-full ring-2 ring-white animate-pulse"></span>
                </button>

                <div class="h-8 w-[1px] bg-slate-200 mx-2 hidden sm:block"></div>

                <div class="flex items-center gap-3">
                    <div class="text-right hidden sm:block">
                        <p class="text-xs font-black text-text-primary tracking-tight">${user.name}</p>
                        <p class="text-[9px] text-text-muted uppercase font-black tracking-widest leading-none mt-1">${user.role}</p>
                    </div>
                    <button class="w-10 h-10 bg-gradient-to-tr from-slate-100 to-slate-200 border border-slate-200 rounded-full flex items-center justify-center shadow-sm hover:shadow active:scale-95 transition-all">
                        <i data-lucide="user" class="w-5 h-5 text-slate-600"></i>
                    </button>
                </div>
            </div>
        </div>
    </header>
    `;
}

function getMenuItems(role) {
    if (role === 'student') {
        return [
            { label: 'Dashboard', icon: 'home', path: '#student/dashboard' },
            { label: 'My Profile', icon: 'user', path: '#student/profile' },
            { label: 'Browse Jobs', icon: 'briefcase', path: '#student/jobs' },
            { label: 'My Applications', icon: 'file-text', path: '#student/applications' },
            { label: 'Interview Schedule', icon: 'calendar', path: '#student/interviews' },
            { label: 'Results & Offers', icon: 'award', path: '#student/offers' },
        ];
    } else if (role === 'admin') {
        return [
            { label: 'Dashboard', icon: 'home', path: '#admin/dashboard' },
            { label: 'Manage Students', icon: 'users', path: '#admin/students' },
            { label: 'Manage Companies', icon: 'building-2', path: '#admin/companies' },
            { label: 'Job Postings', icon: 'briefcase', path: '#admin/jobs' },
            { label: 'Applications', icon: 'file-text', path: '#admin/applications' },
        ];
    } else if (role === 'company') {
        return [
            { label: 'Dashboard', icon: 'home', path: '#company/dashboard' },
            { label: 'Post a Job', icon: 'briefcase', path: '#company/post-job' },
            { label: 'View Applicants', icon: 'users', path: '#company/applicants' },
        ];
    }
    return [];
}

function getRoleBadgeColor(role) {
    switch (role) {
        case 'student': return 'bg-primary/20 text-primary border border-primary/30';
        case 'admin': return 'bg-secondary/20 text-secondary border border-secondary/30';
        case 'company': return 'bg-success/20 text-success border border-success/30';
        default: return 'bg-gray-500/20 text-gray-400 border border-gray-500/30';
    }
}
