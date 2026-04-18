// Admin Pages Rendering logic
import { auth } from '../auth.js';
import { mockStudents, mockCompanies, mockJobs, mockApplications } from '../data.js';

export function renderAdminPage(subroute) {
    const user = auth.getUser();
    
    switch (subroute) {
        case 'dashboard':
            return renderDashboard(user);
        case 'students':
            return renderStudents(user);
        case 'companies':
            return renderCompanies(user);
        case 'jobs':
            return renderJobs(user);
        case 'applications':
            return renderApplications(user);
        default:
            return `<div class="p-8 text-center text-text-muted">Admin page "${subroute}" coming soon...</div>`;
    }
}

function renderDashboard(user) {
    const stats = [
        { label: 'Total Students', value: mockStudents.length, icon: 'users', color: 'text-primary', bg: 'bg-primary/10' },
        { label: 'Companies', value: mockCompanies.length, icon: 'building-2', color: 'text-secondary', bg: 'bg-secondary/10' },
        { label: 'Job Postings', value: mockJobs.length, icon: 'briefcase', color: 'text-success', bg: 'bg-success/10' },
        { label: 'Placed', value: mockStudents.filter(s => s.status === 'Placed').length, icon: 'award', color: 'text-purple-600', bg: 'bg-purple-100' }
    ];

    return `
    <div class="space-y-10">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 animate-fade-in-up">
            <div>
                <h1 class="text-4xl font-extrabold text-text-primary tracking-tight mb-2">Internal Analytics</h1>
                <p class="text-lg text-text-muted font-medium">Real-time overview of college placement metrics.</p>
            </div>
            <button class="px-8 py-4 bg-primary text-white font-black rounded-2xl shadow-xl shadow-primary/20 flex items-center gap-3 hover:-translate-y-1 active:scale-95 transition-all">
                <i data-lucide="bar-chart-3" class="w-5 h-5"></i> Generate Full Report
            </button>
        </div>

        <!-- Stats Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            ${stats.map((stat, index) => `
                <div class="bg-card p-7 rounded-[2.5rem] shadow-premium card-p border border-slate-100/50 animate-fade-in-up" style="animation-delay: ${index * 100}ms">
                    <div class="flex items-center gap-5">
                        <div class="w-16 h-16 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center shadow-inner">
                            <i data-lucide="${stat.icon}" class="w-8 h-8"></i>
                        </div>
                        <div>
                            <p class="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted mb-1.5">${stat.label}</p>
                            <p class="text-3xl font-black text-text-primary">${stat.value}</p>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- Student Activity -->
            <div class="bg-card rounded-[2.5rem] p-8 md:p-10 border border-slate-100 shadow-premium animate-fade-in-up" style="animation-delay: 400ms">
                <div class="flex items-center justify-between mb-8">
                    <h3 class="text-2xl font-black text-text-primary tracking-tight">Recent Students</h3>
                    <a href="#admin/students" class="text-xs font-black uppercase tracking-widest text-primary hover:underline">Manage All</a>
                </div>
                <div class="space-y-4">
                    ${mockStudents.slice(0, 5).map(student => `
                        <div class="flex items-center justify-between p-5 bg-slate-50/50 hover:bg-slate-50 rounded-3xl border border-transparent hover:border-slate-200 transition-all group">
                            <div class="flex items-center gap-5">
                                <div class="w-12 h-12 bg-white rounded-xl border border-slate-100 flex items-center justify-center font-black text-primary shadow-sm group-hover:scale-110 transition-transform">
                                    ${student.name[0]}
                                </div>
                                <div>
                                    <h4 class="font-bold text-text-primary">${student.name}</h4>
                                    <p class="text-[10px] text-text-muted font-black uppercase tracking-widest">${student.branch}</p>
                                </div>
                            </div>
                            <span class="px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${student.status === 'Placed' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-200 text-slate-500'}">
                                ${student.status}
                            </span>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- Company Activity -->
            <div class="bg-card rounded-[2.5rem] p-8 md:p-10 border border-slate-100 shadow-premium animate-fade-in-up" style="animation-delay: 500ms">
                <div class="flex items-center justify-between mb-8">
                    <h3 class="text-2xl font-black text-text-primary tracking-tight">Partner Entities</h3>
                    <a href="#admin/companies" class="text-xs font-black uppercase tracking-widest text-secondary hover:underline">View CRM</a>
                </div>
                <div class="space-y-4">
                    ${mockCompanies.slice(0, 5).map(company => `
                        <div class="flex items-center justify-between p-5 bg-slate-50/50 hover:bg-slate-50 rounded-3xl border border-transparent hover:border-slate-200 transition-all group">
                            <div class="flex items-center gap-5">
                                <div class="w-12 h-12 bg-white rounded-xl border border-slate-100 flex items-center justify-center font-black text-secondary shadow-sm group-hover:scale-110 transition-transform">
                                    ${company.name[0]}
                                </div>
                                <div>
                                    <h4 class="font-bold text-text-primary">${company.name}</h4>
                                    <p class="text-[10px] text-text-muted font-black uppercase tracking-widest">${company.industry}</p>
                                </div>
                            </div>
                            <div class="text-right">
                                <p class="text-sm font-bold text-text-primary">${company.visitDate}</p>
                                <p class="text-[9px] text-text-muted font-black uppercase tracking-tighter">${company.status}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    </div>
    `;
}

function renderStudents(user) {
    return `
    <div class="space-y-10">
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 animate-fade-in-up">
            <div>
                <h1 class="text-4xl font-extrabold text-text-primary tracking-tight mb-2">Manage Students</h1>
                <p class="text-lg text-text-muted font-medium">Monitoring ${mockStudents.length} academic profiles.</p>
            </div>
            <div class="flex gap-3">
                <button class="px-5 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-black flex items-center gap-2 shadow-sm hover:bg-slate-50 transition-all active:scale-95">
                    <i data-lucide="upload-cloud" class="w-5 h-5"></i> Bulk Import
                </button>
                <button class="px-6 py-3 bg-primary text-white rounded-2xl text-sm font-black flex items-center gap-2 shadow-xl shadow-primary/20 hover:-translate-y-1 transition-all">
                    <i data-lucide="user-plus" class="w-5 h-5"></i> New Entry
                </button>
            </div>
        </div>

        <div class="bg-card rounded-[2.5rem] border border-slate-100 shadow-premium overflow-hidden animate-fade-in-up" style="animation-delay: 200ms">
            <div class="p-8 border-b border-slate-100 bg-slate-50/30 flex flex-wrap gap-4">
                <div class="relative flex-1 min-w-[240px]">
                    <i data-lucide="search" class="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-text-muted"></i>
                    <input type="text" placeholder="Search by name, roll, or branch..." 
                           class="w-full pl-11 pr-4 py-3 text-sm bg-white border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all">
                </div>
                <select class="px-6 py-3 text-sm bg-white border border-slate-200 rounded-2xl outline-none font-bold text-text-primary focus:border-primary cursor-pointer hover:border-slate-300 transition-all appearance-none">
                    <option>All Specializations</option>
                    <option>Computer Science</option>
                    <option>Data Science</option>
                </select>
            </div>
            
            <div class="overflow-x-auto">
                <table class="w-full text-left">
                    <thead>
                        <tr class="bg-slate-50/50 border-b border-slate-100">
                            <th class="px-8 py-6 text-[11px] uppercase font-black text-slate-400 tracking-[0.2em]">Full Portrait</th>
                            <th class="px-8 py-6 text-[11px] uppercase font-black text-slate-400 tracking-[0.2em]">Specialization</th>
                            <th class="px-8 py-6 text-[11px] uppercase font-black text-slate-400 tracking-[0.2em] text-center">Efficiency (CGPA)</th>
                            <th class="px-8 py-6 text-[11px] uppercase font-black text-slate-400 tracking-[0.2em]">Outcome</th>
                            <th class="px-8 py-6 text-[11px] uppercase font-black text-slate-400 tracking-[0.2em] text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-50">
                        ${mockStudents.map(student => `
                            <tr class="hover:bg-slate-50/50 transition-all group">
                                <td class="px-8 py-6">
                                    <div class="flex items-center gap-4">
                                        <div class="w-12 h-12 bg-white border border-slate-100 rounded-2xl flex items-center justify-center font-black text-primary shadow-sm group-hover:scale-110 transition-transform">
                                            ${student.name[0]}
                                        </div>
                                        <div>
                                            <p class="font-black text-text-primary tracking-tight">${student.name}</p>
                                            <p class="text-[10px] text-text-muted font-black tracking-widest uppercase mt-0.5">${student.rollNo}</p>
                                        </div>
                                    </div>
                                </td>
                                <td class="px-8 py-6">
                                    <p class="text-sm font-bold text-text-primary">${student.branch}</p>
                                    <p class="text-[10px] text-text-muted font-bold tracking-tight mt-0.5">Enrollment Year: ${student.year}</p>
                                </td>
                                <td class="px-8 py-6 text-center">
                                    <span class="font-black text-text-primary px-4 py-1.5 bg-slate-100 rounded-xl text-xs border border-slate-200/50 underline decoration-primary/30 decoration-2 underline-offset-4">${student.cgpa}</span>
                                </td>
                                <td class="px-8 py-6">
                                    <span class="px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${student.status === 'Placed' ? 'bg-emerald-100 text-emerald-600 shadow-emerald-100' : (student.status === 'Unplaced' ? 'bg-rose-100 text-rose-600 shadow-rose-100' : 'bg-amber-100 text-amber-600 shadow-amber-100')} shadow-sm border border-transparent">
                                        ${student.status}
                                    </span>
                                </td>
                                <td class="px-8 py-6 text-right">
                                    <div class="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button class="p-3 bg-white hover:bg-primary-light/10 border border-slate-100 rounded-xl text-primary transition-all active:scale-90">
                                            <i data-lucide="pencil" class="w-4 h-4"></i>
                                        </button>
                                        <button class="p-3 bg-white hover:bg-rose-50 border border-slate-100 rounded-xl text-rose-500 transition-all active:scale-90">
                                            <i data-lucide="trash-2" class="w-4 h-4"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    `;

function renderCompanies(user) {
    return `
    <div class="space-y-10">
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 animate-fade-in-up">
            <div>
                <h1 class="text-4xl font-extrabold text-text-primary tracking-tight mb-2">Partner Ecosystem</h1>
                <p class="text-lg text-text-muted font-medium">Managing ${mockCompanies.length} strategic corporate alliances.</p>
            </div>
            <button class="px-8 py-4 bg-secondary text-white font-black rounded-2xl shadow-xl shadow-secondary/20 flex items-center gap-3 hover:-translate-y-1 active:scale-95 transition-all">
                <i data-lucide="plus" class="w-5 h-5"></i> New Corporate Partner
            </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in-up" style="animation-delay: 200ms">
            ${mockCompanies.map(company => `
                <div class="bg-card rounded-[2.5rem] border border-slate-100 shadow-premium p-10 hover:shadow-2xl transition-all group overflow-hidden relative">
                    <div class="absolute -top-12 -right-12 w-24 h-24 bg-secondary/5 rounded-full blur-2xl group-hover:bg-secondary/10 transition-colors"></div>
                    
                    <div class="flex items-center justify-between mb-10 relative">
                        <div class="w-20 h-20 bg-white border border-slate-100 rounded-[1.5rem] flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                            <span class="text-3xl font-black text-secondary/30">${company.name[0]}</span>
                        </div>
                        <span class="px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${company.status === 'Active' ? 'bg-emerald-100 text-emerald-600 shadow-emerald-100' : 'bg-slate-200 text-slate-500'} shadow-sm">
                            ${company.status}
                        </span>
                    </div>

                    <h3 class="text-2xl font-black text-text-primary mb-1 tracking-tight group-hover:text-secondary transition-colors">${company.name}</h3>
                    <p class="text-sm font-black text-text-muted uppercase tracking-[0.1em] mb-8">${company.industry}</p>

                    <div class="space-y-5 mb-10">
                        <div class="flex items-center gap-4 text-sm font-medium">
                            <div class="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:text-secondary group-hover:bg-secondary/5 transition-all">
                                <i data-lucide="calendar" class="w-5 h-5"></i>
                            </div>
                            <span class="text-text-muted">Visitation: <span class="text-text-primary font-black ml-1">${company.visitDate}</span></span>
                        </div>
                        <div class="flex items-center gap-4 text-sm font-medium">
                            <div class="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:text-secondary group-hover:bg-secondary/5 transition-all">
                                <i data-lucide="user-check" class="w-5 h-5"></i>
                            </div>
                            <span class="text-text-muted">Account Lead: <span class="text-text-primary font-black ml-1">${company.hrName}</span></span>
                        </div>
                        <div class="flex items-center gap-4 text-sm font-medium">
                            <div class="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:text-secondary group-hover:bg-secondary/5 transition-all">
                                <i data-lucide="layers" class="w-5 h-5"></i>
                            </div>
                            <span class="text-text-muted">Active Roles: <span class="text-secondary font-black ml-1 underline underline-offset-4 decoration-secondary/30">${company.rolesOffered.length} Openings</span></span>
                        </div>
                    </div>

                    <div class="flex gap-3 relative">
                        <button class="flex-1 py-4 bg-secondary/5 text-secondary text-[11px] font-black uppercase tracking-widest rounded-2xl hover:bg-secondary hover:text-white transition-all active:scale-95">Modify Profile</button>
                        <button class="px-5 py-4 bg-slate-50 text-text-muted rounded-2xl hover:bg-slate-100 transition-all active:scale-95">
                            <i data-lucide="external-link" class="w-5 h-5"></i>
                        </button>
                    </div>
                </div>
            `).join('')}
        </div>
    </div>
    `;
}

function renderJobs(user) {
    return `
    <div class="space-y-10">
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 animate-fade-in-up">
            <div>
                <h1 class="text-4xl font-extrabold text-text-primary tracking-tight mb-2">Drive Management</h1>
                <p class="text-lg text-text-muted font-medium">Monitoring active and historical recruitment opportunities.</p>
            </div>
            <button class="px-8 py-4 bg-primary text-white font-black rounded-2xl shadow-xl shadow-primary/20 flex items-center gap-3 hover:-translate-y-1 active:scale-95 transition-all">
                <i data-lucide="plus" class="w-5 h-5"></i> Initialize Recruitment Drive
            </button>
        </div>

        <div class="bg-card rounded-[2.5rem] border border-slate-100 shadow-premium overflow-hidden animate-fade-in-up" style="animation-delay: 200ms">
            <div class="overflow-x-auto">
                <table class="w-full text-left">
                    <thead>
                        <tr class="bg-slate-50/50 border-b border-slate-100">
                            <th class="px-8 py-6 text-[11px] uppercase font-black text-slate-400 tracking-[0.2em]">Partner Entity</th>
                            <th class="px-8 py-6 text-[11px] uppercase font-black text-slate-400 tracking-[0.2em]">Target Role</th>
                            <th class="px-8 py-6 text-[11px] uppercase font-black text-slate-400 tracking-[0.2em] text-center">Headcount</th>
                            <th class="px-8 py-6 text-[11px] uppercase font-black text-slate-400 tracking-[0.2em]">Drive Integrity</th>
                            <th class="px-8 py-6 text-[11px] uppercase font-black text-slate-400 tracking-[0.2em] text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-50">
                        ${mockJobs.slice(0, 10).map(job => `
                            <tr class="hover:bg-slate-50/50 transition-all group">
                                <td class="px-8 py-6">
                                    <div class="flex items-center gap-4">
                                        <div class="w-12 h-12 bg-white border border-slate-100 rounded-2xl flex items-center justify-center font-black text-primary shadow-sm group-hover:scale-110 transition-transform">
                                            ${job.companyName[0]}
                                        </div>
                                        <span class="font-black text-text-primary tracking-tight">${job.companyName}</span>
                                    </div>
                                </td>
                                <td class="px-8 py-6">
                                    <p class="font-black text-text-primary text-sm leading-tight group-hover:text-primary transition-colors">${job.title}</p>
                                    <p class="text-[10px] text-text-muted font-black tracking-widest uppercase mt-0.5">${job.location} • ${job.type}</p>
                                </td>
                                <td class="px-8 py-6 text-center">
                                    <span class="px-4 py-1.5 bg-slate-100 rounded-xl text-xs font-black text-text-primary border border-slate-200/50">${job.openings} Units</span>
                                </td>
                                <td class="px-8 py-6">
                                    <span class="px-4 py-1.5 bg-emerald-100 text-emerald-600 text-[9px] font-black uppercase tracking-widest rounded-full shadow-sm">
                                        ${job.status}
                                    </span>
                                </td>
                                <td class="px-8 py-6 text-right">
                                    <div class="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button class="p-3 bg-white hover:bg-slate-50 border border-slate-100 rounded-xl text-text-muted transition-all active:scale-90">
                                            <i data-lucide="more-horizontal" class="w-5 h-5"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    `;
}

function renderApplications(user) {
    return `
    <div class="space-y-10">
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 animate-fade-in-up">
            <div>
                <h1 class="text-4xl font-extrabold text-text-primary tracking-tight mb-2">Centralized Applications</h1>
                <p class="text-lg text-text-muted font-medium">Real-time audit log of all placement interactions.</p>
            </div>
            <div class="flex gap-3">
                <button class="px-6 py-4 bg-white border border-slate-200 rounded-2xl text-sm font-black flex items-center gap-3 shadow-sm hover:bg-slate-50 transition-all active:scale-95">
                    <i data-lucide="download-cloud" class="w-5 h-5"></i> Export Detailed Log
                </button>
            </div>
        </div>

        <div class="bg-card rounded-[2.5rem] border border-slate-100 shadow-premium overflow-hidden animate-fade-in-up" style="animation-delay: 200ms">
            <div class="overflow-x-auto">
                <table class="w-full text-left">
                    <thead>
                        <tr class="bg-slate-50/50 border-b border-slate-100">
                            <th class="px-8 py-6 text-[11px] uppercase font-black text-slate-400 tracking-[0.2em]">Scholar Identity</th>
                            <th class="px-8 py-6 text-[11px] uppercase font-black text-slate-400 tracking-[0.2em]">Target Designation</th>
                            <th class="px-8 py-6 text-[11px] uppercase font-black text-slate-400 tracking-[0.2em]">Submission Timestamp</th>
                            <th class="px-8 py-6 text-[11px] uppercase font-black text-slate-400 tracking-[0.2em]">Pipeline State</th>
                            <th class="px-8 py-6 text-[11px] uppercase font-black text-slate-400 tracking-[0.2em] text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-50">
                        ${mockApplications.slice(0, 15).map(app => `
                            <tr class="hover:bg-slate-50/50 transition-all group">
                                <td class="px-8 py-6">
                                    <div class="flex items-center gap-4">
                                        <div class="w-12 h-12 bg-white border border-slate-100 rounded-2xl flex items-center justify-center font-black text-primary shadow-sm group-hover:scale-110 transition-transform">
                                            ${app.studentName[0]}
                                        </div>
                                        <div>
                                            <p class="font-black text-text-primary tracking-tight">${app.studentName}</p>
                                            <p class="text-[10px] text-text-muted font-black tracking-widest uppercase mt-0.5">${app.studentBranch}</p>
                                        </div>
                                    </div>
                                </td>
                                <td class="px-8 py-6">
                                    <p class="font-black text-text-primary text-sm leading-tight group-hover:text-primary transition-colors">${app.role}</p>
                                    <p class="text-[10px] text-text-muted font-black uppercase mt-1 tracking-tighter">${app.companyName}</p>
                                </td>
                                <td class="px-8 py-6 text-sm font-bold text-text-muted">${app.appliedDate}</td>
                                <td class="px-8 py-6">
                                    <span class="px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${getStatusColor(app.status)} shadow-sm border border-transparent">
                                        ${app.status}
                                    </span>
                                </td>
                                <td class="px-8 py-6 text-right">
                                    <div class="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button class="p-3 bg-white hover:bg-primary/5 border border-slate-100 rounded-xl text-primary transition-all active:scale-90">
                                            <i data-lucide="eye" class="w-5 h-5"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    `;
}

function getStatusColor(status) {
    switch (status.toLowerCase()) {
        case 'applied': return 'bg-blue-100 text-blue-600 border border-blue-200';
        case 'shortlisted': return 'bg-yellow-100 text-yellow-600 border border-yellow-200';
        case 'interview': return 'bg-purple-100 text-purple-600 border border-purple-200';
        case 'offer': return 'bg-emerald-100 text-emerald-600 border border-emerald-200';
        case 'rejected': return 'bg-red-100 text-red-600 border border-red-200';
        default: return 'bg-gray-100 text-gray-600 border border-gray-200';
    }
}
