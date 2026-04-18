// Student Pages Rendering logic
import { auth } from '../auth.js';
import { mockJobs, mockApplications, mockInterviews, mockOffers } from '../data.js';

export function renderStudentPage(subroute) {
    const user = auth.getUser();
    
    switch (subroute) {
        case 'dashboard':
            return renderDashboard(user);
        case 'jobs':
            return renderJobs(user);
        case 'applications':
            return renderApplications(user);
        case 'profile':
            return renderProfile(user);
        case 'interviews':
            return renderInterviews(user);
        case 'offers':
            return renderOffers(user);
        default:
            return `<div class="p-8 text-center text-text-muted">Page ${subroute} coming soon...</div>`;
    }
}

function renderDashboard(user) {
    const studentApps = mockApplications.filter(app => app.studentId === user.id);
    const stats = [
        { label: 'Applications', value: studentApps.length, icon: 'file-text', color: 'text-primary', bg: 'bg-primary/10' },
        { label: 'Shortlisted', value: studentApps.filter(a => a.status === 'Shortlisted').length, icon: 'check-circle', color: 'text-secondary', bg: 'bg-secondary/10' },
        { label: 'Interviews', value: mockInterviews.filter(i => i.studentId === user.id).length, icon: 'calendar', color: 'text-success', bg: 'bg-success/10' },
        { label: 'Offers', value: mockOffers.filter(o => o.studentId === user.id).length, icon: 'award', color: 'text-purple-600', bg: 'bg-purple-100' }
    ];

    return `
    <div class="space-y-10">
        <div class="animate-fade-in-up">
            <h1 class="text-4xl font-extrabold text-text-primary tracking-tight mb-2">Welcome back, ${user.name}! 👋</h1>
            <p class="text-lg text-text-muted font-medium">Keep track of your career journey and upcoming opportunities.</p>
        </div>

        <!-- Stats Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            ${stats.map((stat, index) => `
                <div class="bg-card p-6 rounded-[2rem] shadow-premium card-p border border-slate-100/50 animate-fade-in-up" style="animation-delay: ${index * 100}ms">
                    <div class="flex items-center gap-5">
                        <div class="w-14 h-14 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center shadow-inner">
                            <i data-lucide="${stat.icon}" class="w-7 h-7"></i>
                        </div>
                        <div>
                            <p class="text-xs font-black uppercase tracking-widest text-text-muted mb-1">${stat.label}</p>
                            <p class="text-3xl font-black text-text-primary">${stat.value}</p>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Recent Applications -->
            <div class="lg:col-span-2 bg-card rounded-[2.5rem] p-8 md:p-10 border border-slate-100 shadow-premium animate-fade-in-up" style="animation-delay: 400ms">
                <div class="flex items-center justify-between mb-10">
                    <div>
                        <h2 class="text-2xl font-black text-text-primary tracking-tight">Recent Applications</h2>
                        <p class="text-sm text-text-muted font-medium mt-1">Status of your latest submissions</p>
                    </div>
                    <a href="#student/applications" class="flex items-center gap-2 text-primary font-black text-sm group">
                        View All <i data-lucide="arrow-right" class="w-4 h-4 transition-transform group-hover:translate-x-1"></i>
                    </a>
                </div>
                <div class="space-y-4">
                    ${studentApps.length > 0 ? studentApps.slice(0, 4).map(app => `
                        <div class="flex items-center justify-between p-5 bg-slate-50/50 hover:bg-slate-50 rounded-3xl border border-transparent hover:border-slate-200 transition-all group">
                            <div class="flex items-center gap-5">
                                <div class="w-14 h-14 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center text-primary-dark font-black text-xl group-hover:scale-110 transition-transform">
                                    ${app.companyName[0]}
                                </div>
                                <div>
                                    <h4 class="font-bold text-text-primary text-lg">${app.role}</h4>
                                    <p class="text-sm text-text-muted font-medium">${app.companyName} • ${app.appliedDate}</p>
                                </div>
                            </div>
                            <span class="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${getStatusColor(app.status)} shadow-sm">
                                ${app.status}
                            </span>
                        </div>
                    `).join('') : `
                        <div class="text-center py-10">
                            <i data-lucide="inbox" class="w-12 h-12 text-slate-300 mx-auto mb-4"></i>
                            <p class="text-text-muted font-medium">No applications found.</p>
                        </div>
                    `}
                </div>
            </div>

            <!-- Profile Completion -->
            <div class="bg-card rounded-[2.5rem] p-8 md:p-10 border border-slate-100 shadow-premium flex flex-col items-center justify-center text-center animate-fade-in-up" style="animation-delay: 500ms">
                <div class="relative w-40 h-40 mb-8">
                    <svg class="w-full h-full transform -rotate-90">
                        <circle cx="80" cy="80" r="72" stroke="currentColor" stroke-width="12" fill="transparent" class="text-slate-100" />
                        <circle cx="80" cy="80" r="72" stroke="currentColor" stroke-width="12" fill="transparent" class="text-primary" stroke-linecap="round" stroke-dasharray="452.4" stroke-dashoffset="${452.4 * (1 - (user.data?.profileComplete || 0) / 100)}" />
                    </svg>
                    <div class="absolute inset-0 flex flex-col items-center justify-center">
                        <span class="text-4xl font-black text-text-primary">${user.data?.profileComplete}%</span>
                        <span class="text-[10px] font-black uppercase text-text-muted tracking-widest">Done</span>
                    </div>
                </div>
                <h3 class="text-xl font-black text-text-primary mb-2">Profile Integrity</h3>
                <p class="text-sm text-text-muted font-medium mb-8 leading-relaxed">A complete profile increases your chances of getting shortlisted by <span class="text-primary font-bold">40%</span>.</p>
                <a href="#student/profile" class="w-full py-4 bg-primary/10 text-primary rounded-2xl font-black text-sm hover:bg-primary hover:text-white transition-all duration-300 shadow-lg shadow-primary/5 active:scale-95">Complete Your Profile</a>
            </div>
        </div>
    </div>
    `;
}

function renderJobs(user) {
    return `
    <div class="space-y-10">
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 animate-fade-in-up">
            <div>
                <h1 class="text-4xl font-extrabold text-text-primary tracking-tight mb-2">Explore Opportunities</h1>
                <p class="text-lg text-text-muted font-medium italic">"Luck is what happens when preparation meets opportunity."</p>
            </div>
            <div class="flex gap-3">
                <div class="relative group">
                    <i data-lucide="filter" class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted group-focus-within:text-primary transition-colors"></i>
                    <select class="pl-10 pr-8 py-2.5 bg-white border border-slate-200 rounded-2xl text-sm font-bold shadow-sm focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none appearance-none cursor-pointer hover:border-slate-300 transition-all">
                        <option>All Industries</option>
                        <option>Tech</option>
                        <option>Finance</option>
                    </select>
                </div>
                <button class="px-5 py-2.5 bg-white border border-slate-200 rounded-2xl text-sm font-bold flex items-center gap-2 shadow-sm hover:bg-slate-50 transition-all active:scale-95">
                    <i data-lucide="arrow-up-down" class="w-4 h-4"></i> Sort
                </button>
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            ${mockJobs.filter(j => j.status === 'Active').map((job, index) => `
                <div class="bg-card p-8 rounded-[2.5rem] border border-slate-100 shadow-premium card-p animate-fade-in-up group" style="animation-delay: ${index * 100}ms">
                    <div class="flex items-center justify-between mb-8">
                        <div class="w-16 h-16 bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl flex items-center justify-center text-2xl font-black text-primary shadow-inner group-hover:scale-110 transition-transform">
                            ${job.companyName[0]}
                        </div>
                        <div class="flex flex-col items-end gap-2">
                            <span class="px-4 py-1.5 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest rounded-full border border-emerald-100 shadow-sm">
                                ${job.type}
                            </span>
                            <span class="text-[10px] font-bold text-text-muted">Posted 2d ago</span>
                        </div>
                    </div>
                    
                    <h3 class="text-2xl font-black text-text-primary leading-tight mb-1 group-hover:text-primary transition-colors">${job.title}</h3>
                    <p class="text-text-muted font-bold text-sm mb-6 flex items-center gap-2">
                        <i data-lucide="building" class="w-4 h-4"></i> ${job.companyName}
                    </p>
                    
                    <div class="flex flex-wrap gap-2 mb-8">
                        ${job.requiredSkills.slice(0, 3).map(skill => `
                            <span class="px-3 py-1.5 bg-slate-100/50 rounded-xl text-[10px] font-black text-slate-500 uppercase tracking-wide border border-slate-100">${skill}</span>
                        `).join('')}
                    </div>

                    <div class="grid grid-cols-2 gap-6 p-6 bg-slate-50/80 rounded-[2rem] mb-8 border border-slate-100/50">
                        <div>
                            <p class="text-[10px] uppercase text-text-muted font-black tracking-[0.15em] mb-1">Package</p>
                            <p class="text-xl font-black text-emerald-600">${job.ctc} <span class="text-xs font-bold text-emerald-600/60 tracking-normal">LPA</span></p>
                        </div>
                        <div>
                            <p class="text-[10px] uppercase text-text-muted font-black tracking-[0.15em] mb-1">Locality</p>
                            <p class="text-sm font-black text-text-primary truncate">${job.location}</p>
                        </div>
                    </div>

                    <button class="w-full py-4.5 bg-primary text-white font-black rounded-2xl shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1 active:scale-95 transition-all duration-300">
                        Secure Spot
                    </button>
                </div>
            `).join('')}
        </div>
    </div>
    `;
}

function renderApplications(user) {
    const apps = mockApplications.filter(app => app.studentId === user.id);
    return `
    <div class="space-y-10">
        <div class="animate-fade-in-up">
            <h1 class="text-4xl font-extrabold text-text-primary tracking-tight mb-2">My Applications</h1>
            <p class="text-lg text-text-muted font-medium">Tracking ${apps.length} active submissions.</p>
        </div>

        <div class="bg-card rounded-[2.5rem] border border-slate-100 shadow-premium overflow-hidden animate-fade-in-up" style="animation-delay: 200ms">
            <div class="overflow-x-auto">
                <table class="w-full text-left">
                    <thead>
                        <tr class="bg-slate-50/80 border-b border-slate-100">
                            <th class="px-8 py-6 text-[11px] uppercase font-black text-slate-400 tracking-[0.2em]">Company</th>
                            <th class="px-8 py-6 text-[11px] uppercase font-black text-slate-400 tracking-[0.2em]">Designation</th>
                            <th class="px-8 py-6 text-[11px] uppercase font-black text-slate-400 tracking-[0.2em]">Applied On</th>
                            <th class="px-8 py-6 text-[11px] uppercase font-black text-slate-400 tracking-[0.2em]">Current Status</th>
                            <th class="px-8 py-6 text-[11px] uppercase font-black text-slate-400 tracking-[0.2em] text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-50">
                        ${apps.length > 0 ? apps.map(app => `
                            <tr class="hover:bg-slate-50/50 transition-all group">
                                <td class="px-8 py-6">
                                    <div class="flex items-center gap-4">
                                        <div class="w-12 h-12 bg-white border border-slate-100 rounded-2xl flex items-center justify-center font-black text-primary shadow-sm group-hover:scale-110 transition-transform">
                                            ${app.companyName[0]}
                                        </div>
                                        <span class="font-black text-text-primary">${app.companyName}</span>
                                    </div>
                                </td>
                                <td class="px-8 py-6">
                                    <p class="font-bold text-text-primary">${app.role}</p>
                                    <p class="text-[10px] text-text-muted uppercase font-bold tracking-widest mt-0.5">Full Time</p>
                                </td>
                                <td class="px-8 py-6">
                                    <div class="flex items-center gap-2 text-text-muted font-medium">
                                        <i data-lucide="calendar" class="w-3.5 h-3.5 text-slate-300"></i>
                                        <span class="text-sm">${app.appliedDate}</span>
                                    </div>
                                </td>
                                <td class="px-8 py-6">
                                    <span class="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${getStatusColor(app.status)} shadow-sm">
                                        ${app.status}
                                    </span>
                                </td>
                                <td class="px-8 py-6 text-right">
                                    <button class="p-3 hover:bg-white hover:shadow-md border border-transparent hover:border-slate-100 rounded-2xl text-primary transition-all active:scale-90">
                                        <i data-lucide="eye" class="w-5 h-5"></i>
                                    </button>
                                </td>
                            </tr>
                        `).join('') : `
                            <tr>
                                <td colspan="5" class="py-20 text-center">
                                    <div class="flex flex-col items-center">
                                        <i data-lucide="layers" class="w-16 h-16 text-slate-200 mb-6"></i>
                                        <h3 class="text-xl font-black text-text-primary mb-1">No applications yet</h3>
                                        <p class="text-text-muted font-medium">Start applying to jobs to track them here.</p>
                                        <a href="#student/jobs" class="mt-6 px-8 py-3 bg-primary text-white rounded-2xl font-black text-sm shadow-xl shadow-primary/20 hover:-translate-y-1 transition-all">Browse Jobs</a>
                                    </div>
                                </td>
                            </tr>
                        `}
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

function renderProfile(user) {
    const student = user.data;
    return `
    <div class="max-w-4xl mx-auto space-y-8">
        <div class="bg-card rounded-3xl p-8 border border-gray-100 shadow-sm">
            <div class="flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
                <div class="relative">
                    <div class="w-32 h-32 bg-gradient-to-br from-primary to-purple-600 rounded-3xl flex items-center justify-center">
                        <i data-lucide="user" class="w-16 h-16 text-white"></i>
                    </div>
                </div>
                <div class="flex-1">
                    <h1 class="text-3xl font-bold text-text-primary mb-2">${student.name}</h1>
                    <p class="text-text-muted mb-4 font-medium">${student.branch} • Year ${student.year} • Roll: ${student.rollNo}</p>
                    <div class="flex flex-wrap justify-center md:justify-start gap-4">
                        <div class="flex items-center gap-2 text-sm text-text-muted">
                            <i data-lucide="mail" class="w-4 h-4"></i> ${student.email}
                        </div>
                        <div class="flex items-center gap-2 text-sm text-text-muted">
                            <i data-lucide="phone" class="w-4 h-4"></i> ${student.phone}
                        </div>
                    </div>
                </div>
                <button class="px-6 py-3 bg-primary text-white font-bold rounded-2xl hover:scale-105 active:scale-95 transition-all">
                    Edit Profile
                </button>
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="md:col-span-2 space-y-8">
                <div class="bg-card rounded-3xl p-8 border border-gray-100 shadow-sm">
                    <h3 class="text-xl font-bold text-text-primary mb-6">Skills & Expertise</h3>
                    <div class="flex flex-wrap gap-3">
                        ${student.skills.map(skill => `
                            <span class="px-4 py-2 bg-background rounded-xl text-sm font-bold text-text-primary border border-gray-100 transition-hover hover:border-primary hover:text-primary cursor-default">
                                ${skill}
                            </span>
                        `).join('')}
                    </div>
                </div>
            </div>
            
            <div class="space-y-8">
                <div class="bg-card rounded-3xl p-8 border border-gray-100 shadow-sm">
                    <h3 class="text-xl font-bold text-text-primary mb-6">Academic Stats</h3>
                    <div class="p-6 bg-primary/5 rounded-2xl text-center border border-primary/10">
                        <p class="text-3xl font-black text-primary mb-1">${student.cgpa}</p>
                        <p class="text-xs uppercase font-bold text-primary/60 tracking-widest">Average CGPA</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
}

function renderInterviews(user) {
    const activeInterviews = mockInterviews.filter(i => i.studentId === user.id);
    return `
    <div class="space-y-8">
        <div>
            <h1 class="text-3xl font-bold text-text-primary mb-2">Interview Schedule</h1>
            <p class="text-text-muted">Keep track of your upcoming and past interview rounds.</p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            ${activeInterviews.map(i => `
                <div class="bg-card rounded-3xl p-8 border border-gray-100 shadow-sm relative overflow-hidden group">
                    <div class="absolute top-0 right-0 p-4">
                         <span class="px-3 py-1 bg-yellow-100 text-yellow-600 text-[10px] font-bold uppercase tracking-widest rounded-full border border-yellow-200">
                            ${i.status}
                        </span>
                    </div>
                    
                    <div class="flex items-center gap-4 mb-8">
                        <div class="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-2xl font-bold text-primary">
                            ${i.companyName[0]}
                        </div>
                        <div>
                            <h3 class="text-xl font-bold text-text-primary mb-1">${i.companyName}</h3>
                            <p class="text-sm font-medium text-text-muted">${i.role} • ${i.round}</p>
                        </div>
                    </div>

                    <div class="grid grid-cols-2 gap-4 mb-8">
                        <div class="flex items-center gap-3 text-text-muted">
                            <i data-lucide="calendar" class="w-5 h-5 text-primary"></i>
                            <span class="text-sm font-bold text-text-primary">${i.date}</span>
                        </div>
                        <div class="flex items-center gap-3 text-text-muted">
                            <i data-lucide="clock" class="w-5 h-5 text-primary"></i>
                            <span class="text-sm font-bold text-text-primary">${i.time}</span>
                        </div>
                        <div class="flex items-center gap-3 text-text-muted">
                            <i data-lucide="video" class="w-5 h-5 text-primary"></i>
                            <span class="text-sm font-bold text-text-primary">${i.mode}</span>
                        </div>
                    </div>

                    <a href="${i.link || '#'}" target="_blank" class="w-full inline-block text-center py-4 bg-primary text-white font-bold rounded-2xl hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-primary/20">
                        Join Meeting
                    </a>
                </div>
            `).join('')}
        </div>
    </div>
    `;
}

function renderOffers(user) {
    const studentOffers = mockOffers.filter(o => o.studentId === user.id);
    return `
    <div class="space-y-8">
        <div>
            <h1 class="text-3xl font-bold text-text-primary mb-2">Results & Offers</h1>
            <p class="text-text-muted">Congratulations on your achievements! Manage your offers here.</p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            ${studentOffers.map(o => `
                <div class="bg-white rounded-3xl border-2 border-emerald-100 p-8 shadow-sm relative overflow-hidden">
                    <div class="absolute top-0 right-0 p-4">
                         <span class="px-4 py-1 bg-emerald-100 text-emerald-600 text-[10px] font-bold uppercase tracking-widest rounded-full border border-emerald-200">
                            ${o.status}
                        </span>
                    </div>

                    <div class="flex items-center gap-6 mb-8">
                        <div class="w-20 h-20 bg-emerald-50 rounded-3xl flex items-center justify-center text-3xl font-bold text-emerald-600">
                            ${o.companyName[0]}
                        </div>
                        <div>
                            <h3 class="text-2xl font-bold text-text-primary mb-1">${o.companyName}</h3>
                            <p class="text-lg font-medium text-emerald-600">${o.ctc} LPA • ${o.role}</p>
                        </div>
                    </div>

                    <div class="space-y-4 mb-8">
                        <div class="flex justify-between items-center py-3 border-b border-gray-100">
                            <span class="text-sm text-text-muted">Joining Date</span>
                            <span class="text-sm font-bold text-text-primary">${o.joiningDate}</span>
                        </div>
                        <div class="flex justify-between items-center py-3 border-b border-gray-100">
                            <span class="text-sm text-text-muted">Location</span>
                            <span class="text-sm font-bold text-text-primary">${o.location}</span>
                        </div>
                        <div class="flex justify-between items-center py-3">
                            <span class="text-sm text-text-muted">Offer Date</span>
                            <span class="text-sm font-bold text-text-primary">${o.offerDate}</span>
                        </div>
                    </div>

                    <div class="flex gap-4">
                        <button class="flex-1 py-4 bg-emerald-600 text-white font-bold rounded-2xl hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-100">View Offer Letter</button>
                        <button class="flex-1 py-4 bg-gray-100 text-text-primary font-bold rounded-2xl hover:bg-gray-200 transition-colors">Details</button>
                    </div>
                </div>
            `).join('')}
        </div>
    </div>
    `;
}
