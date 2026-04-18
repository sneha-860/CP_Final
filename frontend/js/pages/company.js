// Company Pages Rendering logic
import { auth } from '../auth.js';
import { mockJobs, mockApplications, mockStudents } from '../data.js';

export function renderCompanyPage(subroute) {
    const user = auth.getUser();
    
    switch (subroute) {
        case 'dashboard':
            return renderDashboard(user);
        case 'post-job':
            return renderPostJob(user);
        case 'applicants':
            return renderApplicants(user);
        case 'interviews':
            return renderInterviews(user);
        case 'offers':
            return renderOffers(user);
        default:
            return `<div class="p-8 text-center text-text-muted">Company page "${subroute}" coming soon...</div>`;
    }
}

function renderDashboard(user) {
    const companyJobs = mockJobs.filter(j => j.companyId === user.companyId);
    const companyApps = mockApplications.filter(a => a.companyName === user.companyName);
    
    const stats = [
        { label: 'Active Jobs', value: companyJobs.length, icon: 'briefcase', color: 'text-primary', bg: 'bg-primary/10' },
        { label: 'Total Applicants', value: companyApps.length, icon: 'users', color: 'text-secondary', bg: 'bg-secondary/10' },
        { label: 'Shortlisted', value: companyApps.filter(a => a.status === 'Shortlisted' || a.status === 'Interview').length, icon: 'check-circle', color: 'text-success', bg: 'bg-success/10' },
        { label: 'Offers Sent', value: companyApps.filter(a => a.status === 'Offer').length, icon: 'award', color: 'text-purple-600', bg: 'bg-purple-100' }
    ];

    return `
    <div class="space-y-10">
        <div class="animate-fade-in-up">
            <h1 class="text-4xl font-extrabold text-text-primary tracking-tight mb-2">Hiring Control Center</h1>
            <p class="text-lg text-text-muted font-medium italic">Managing talent acquisition for <span class="text-primary font-black underline decoration-primary/20 underline-offset-4">${user.companyName}</span></p>
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

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Active Jobs -->
            <div class="lg:col-span-2 bg-card rounded-[2.5rem] p-8 md:p-10 border border-slate-100 shadow-premium animate-fade-in-up" style="animation-delay: 400ms">
                <div class="flex items-center justify-between mb-10">
                    <div>
                        <h3 class="text-2xl font-black text-text-primary tracking-tight">Active Opportunities</h3>
                        <p class="text-sm text-text-muted font-medium mt-1">Currently accepting applications</p>
                    </div>
                    <a href="#company/post-job" class="px-6 py-3 bg-primary text-white text-xs font-black rounded-2xl flex items-center gap-2 shadow-xl shadow-primary/20 hover:-translate-y-1 transition-all">
                        <i data-lucide="plus" class="w-4 h-4"></i> Post Opening
                    </a>
                </div>
                <div class="space-y-5">
                    ${companyJobs.length > 0 ? companyJobs.map(job => `
                        <div class="p-7 bg-slate-50/50 hover:bg-slate-50 rounded-3xl border border-transparent hover:border-slate-200 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 group">
                            <div class="flex items-center gap-5">
                                <div class="w-14 h-14 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center text-primary-dark font-black text-xl group-hover:scale-110 transition-transform">
                                    ${job.title[0]}
                                </div>
                                <div>
                                    <h4 class="font-black text-text-primary text-lg leading-tight group-hover:text-primary transition-colors">${job.title}</h4>
                                    <p class="text-[10px] font-black text-text-muted uppercase tracking-[0.15em] mt-1">${job.location} • ${job.type}</p>
                                </div>
                            </div>
                            <div class="flex items-center gap-10">
                                <div class="text-center">
                                    <p class="text-xl font-black text-text-primary">${mockApplications.filter(a => a.jobId === job.id).length}</p>
                                    <p class="text-[9px] uppercase font-black text-text-muted tracking-widest mt-0.5">Pool Size</p>
                                </div>
                                <span class="px-4 py-1.5 bg-emerald-100 text-emerald-600 text-[9px] font-black uppercase tracking-widest rounded-full shadow-sm">
                                    ${job.status}
                                </span>
                                <button class="p-3 hover:bg-white hover:shadow-md border border-transparent hover:border-slate-100 rounded-2xl text-slate-400 hover:text-primary transition-all active:scale-90">
                                    <i data-lucide="settings-2" class="w-5 h-5"></i>
                                </button>
                            </div>
                        </div>
                    `).join('') : `
                        <div class="text-center py-10 opacity-50">
                            <i data-lucide="folder-plus" class="w-12 h-12 mx-auto mb-4"></i>
                            <p class="font-bold">No active jobs found.</p>
                        </div>
                    `}
                </div>
            </div>

            <!-- Recent Applicants -->
            <div class="bg-card rounded-[2.5rem] p-8 md:p-10 border border-slate-100 shadow-premium animate-fade-in-up" style="animation-delay: 500ms">
                <div class="flex items-center justify-between mb-8">
                    <h3 class="text-2xl font-black text-text-primary tracking-tight">Recent Profiles</h3>
                    <a href="#company/applicants" class="text-xs font-black uppercase tracking-widest text-secondary hover:underline">Review All</a>
                </div>
                <div class="space-y-4">
                    ${companyApps.slice(0, 5).map(app => `
                        <div class="flex items-center gap-4 p-5 bg-slate-50/50 hover:bg-slate-50 rounded-3xl border border-transparent hover:border-slate-200 transition-all group">
                            <div class="relative">
                                <div class="w-12 h-12 bg-white border border-slate-100 rounded-xl flex items-center justify-center font-black text-primary shadow-sm group-hover:scale-110 transition-transform">
                                    ${app.studentName[0]}
                                </div>
                                <div class="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 border-2 border-white rounded-full"></div>
                            </div>
                            <div class="flex-1 min-w-0">
                                <h4 class="font-bold text-text-primary truncate text-sm">${app.studentName}</h4>
                                <p class="text-[9px] text-text-muted font-black uppercase tracking-widest truncate mt-0.5">${app.role}</p>
                            </div>
                            <button class="p-2.5 bg-white shadow-sm border border-slate-100 rounded-xl text-primary transform group-hover:translate-x-1 transition-all active:scale-90">
                                <i data-lucide="chevron-right" class="w-4 h-4"></i>
                            </button>
                        </div>
                    `).join('')}
                </div>
                <a href="#company/applicants" class="w-full mt-8 py-4 border-2 border-dashed border-slate-200 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] rounded-[1.5rem] flex items-center justify-center gap-3 hover:border-primary hover:text-primary transition-all group">
                    View Talent Pool <i data-lucide="layers" class="w-4 h-4 transition-transform group-hover:rotate-12"></i>
                </a>
            </div>
        </div>
    </div>
    `;
}

function renderPostJob(user) {
    return `
    <div class="max-w-4xl mx-auto space-y-8">
        <div>
            <h1 class="text-3xl font-bold text-text-primary mb-2">Post a New Job</h1>
            <p class="text-text-muted">Fill in the details to create a new job opportunity.</p>
        </div>

        <div class="bg-card rounded-3xl p-10 border border-gray-100 shadow-sm">
            <form class="space-y-8">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-2">
                        <label class="text-sm font-bold text-text-primary ml-1">Job Title</label>
                        <input type="text" placeholder="e.g. Senior Software Engineer" 
                               class="w-full px-5 py-4 bg-background border border-gray-200 rounded-2xl outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all">
                    </div>
                    <div class="space-y-2">
                        <label class="text-sm font-bold text-text-primary ml-1">Location</label>
                        <input type="text" placeholder="e.g. Bangalore, Remote" 
                               class="w-full px-5 py-4 bg-background border border-gray-200 rounded-2xl outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all">
                    </div>
                    <div class="space-y-2">
                        <label class="text-sm font-bold text-text-primary ml-1">Job Type</label>
                        <select class="w-full px-5 py-4 bg-background border border-gray-200 rounded-2xl outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all appearance-none">
                            <option>Full-time</option>
                            <option>Internship</option>
                            <option>Contract</option>
                        </select>
                    </div>
                    <div class="space-y-2">
                        <label class="text-sm font-bold text-text-primary ml-1">Package (LPA)</label>
                        <input type="number" placeholder="e.g. 12" 
                               class="w-full px-5 py-4 bg-background border border-gray-200 rounded-2xl outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all">
                    </div>
                </div>

                <div class="space-y-2">
                    <label class="text-sm font-bold text-text-primary ml-1">Job Description</label>
                    <textarea placeholder="Describe the role, responsibilities, and expectations..." rows="5"
                              class="w-full px-5 py-4 bg-background border border-gray-200 rounded-2xl outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all resize-none"></textarea>
                </div>

                <div class="space-y-4">
                    <label class="text-sm font-bold text-text-primary ml-1">Required Skills</label>
                    <div class="flex flex-wrap gap-2 mb-4" id="skill-tags">
                        <span class="px-4 py-2 bg-primary/10 text-primary border border-primary/20 rounded-xl flex items-center gap-2 text-sm font-bold">
                            React <i data-lucide="x" class="w-3 h-3 cursor-pointer"></i>
                        </span>
                        <span class="px-4 py-2 bg-primary/10 text-primary border border-primary/20 rounded-xl flex items-center gap-2 text-sm font-bold">
                            Node.js <i data-lucide="x" class="w-3 h-3 cursor-pointer"></i>
                        </span>
                        <button type="button" class="px-4 py-2 border-2 border-dashed border-gray-200 rounded-xl text-text-muted text-sm font-bold hover:border-primary hover:text-primary">+ Add Skill</button>
                    </div>
                </div>

                <div class="pt-6 border-t border-gray-100 flex gap-4">
                    <button type="submit" class="flex-1 py-5 bg-primary text-white font-bold rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all text-lg">
                        Publish Job Posting
                    </button>
                    <button type="button" class="px-10 py-5 bg-gray-100 text-text-primary font-bold rounded-2xl hover:bg-gray-200 transition-colors">
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    </div>
    `;
}

function renderApplicants(user) {
    const companyApps = mockApplications.filter(a => a.companyName === user.companyName);
    return `
    <div class="space-y-10">
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 animate-fade-in-up">
            <div>
                <h1 class="text-4xl font-extrabold text-text-primary tracking-tight mb-2">Talent Review</h1>
                <p class="text-lg text-text-muted font-medium">Filtering through ${companyApps.length} active applications.</p>
            </div>
            <div class="flex gap-3">
                <div class="relative group">
                    <i data-lucide="search" class="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-text-muted"></i>
                    <input type="text" placeholder="Search pool..." 
                           class="pl-11 pr-4 py-3 text-sm bg-white border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all min-w-[300px]">
                </div>
            </div>
        </div>

        <div class="bg-card rounded-[2.5rem] border border-slate-100 shadow-premium overflow-hidden animate-fade-in-up" style="animation-delay: 200ms">
            <div class="overflow-x-auto">
                <table class="w-full text-left">
                    <thead>
                        <tr class="bg-slate-50/50 border-b border-slate-100">
                            <th class="px-8 py-6 text-[11px] uppercase font-black text-slate-400 tracking-[0.20em]">The Applicant</th>
                            <th class="px-8 py-6 text-[11px] uppercase font-black text-slate-400 tracking-[0.20em]">Target Designation</th>
                            <th class="px-8 py-6 text-[11px] uppercase font-black text-slate-400 tracking-[0.20em] text-center">Score (CGPA)</th>
                            <th class="px-8 py-6 text-[11px] uppercase font-black text-slate-400 tracking-[0.20em]">Hiring State</th>
                            <th class="px-8 py-6 text-[11px] uppercase font-black text-slate-400 tracking-[0.20em] text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-50/80">
                        ${companyApps.map(app => `
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
                                    <p class="text-sm font-bold text-text-primary leading-tight">${app.role}</p>
                                    <p class="text-[10px] text-text-muted font-black uppercase tracking-tighter mt-1">Submitted: ${app.appliedDate}</p>
                                </td>
                                <td class="px-8 py-6 text-center">
                                    <span class="font-black text-text-primary px-4 py-1.5 bg-slate-100 rounded-xl text-xs border border-slate-200/50">${app.studentCGPA}</span>
                                </td>
                                <td class="px-8 py-6">
                                    <span class="px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${getStatusColor(app.status)} shadow-sm border border-transparent">
                                        ${app.status}
                                    </span>
                                </td>
                                <td class="px-8 py-6 text-right">
                                    <div class="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button class="px-5 py-2.5 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-1 transition-all">Deep Review</button>
                                        <button class="p-3 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-primary transition-all active:scale-90 shadow-sm">
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

function renderInterviews(user) {
    const companyInterviews = mockInterviews.filter(i => i.companyName === user.companyName);
    return `
    <div class="space-y-8">
        <div class="flex items-center justify-between">
            <div>
                <h1 class="text-3xl font-bold text-text-primary mb-2">Interview Schedule</h1>
                <p class="text-text-muted">Manage upcoming and past interviews for ${user.companyName}.</p>
            </div>
            <button class="px-6 py-3 bg-primary text-white font-bold rounded-2xl shadow-lg shadow-primary/20 flex items-center gap-2">
                <i data-lucide="plus" class="w-5 h-5"></i> Schedule New
            </button>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            ${companyInterviews.map(i => `
                <div class="bg-card rounded-3xl p-8 border border-gray-100 shadow-sm relative overflow-hidden group">
                    <div class="absolute top-0 right-0 p-4">
                         <span class="px-3 py-1 bg-yellow-100 text-yellow-600 text-[10px] font-bold uppercase tracking-widest rounded-full border border-yellow-200">
                            ${i.status}
                        </span>
                    </div>
                    
                    <div class="flex items-center gap-4 mb-8">
                        <div class="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-2xl font-bold text-primary">
                            ${i.studentName[0]}
                        </div>
                        <div>
                            <h3 class="text-xl font-bold text-text-primary mb-1">${i.studentName}</h3>
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
                    </div>

                    <div class="flex gap-2">
                        <button class="flex-1 py-4 bg-primary text-white font-bold rounded-2xl hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-primary/20">
                            Join Meeting
                        </button>
                        <button class="px-6 py-4 bg-gray-100 text-text-primary font-bold rounded-2xl hover:bg-gray-200 transition-colors">
                            Reschedule
                        </button>
                    </div>
                </div>
            `).join('')}
        </div>
    </div>
    `;
}

function renderOffers(user) {
    const companyOffers = mockOffers.filter(o => o.companyName === user.companyName);
    return `
    <div class="space-y-8">
        <div>
            <h1 class="text-3xl font-bold text-text-primary mb-2">Offers Sent</h1>
            <p class="text-text-muted">Track and manage employment offers sent to students.</p>
        </div>

        <div class="bg-card rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div class="overflow-x-auto">
                <table class="w-full text-left">
                    <thead class="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th class="px-6 py-4 text-[10px] uppercase font-bold text-text-muted tracking-widest">Student</th>
                            <th class="px-6 py-4 text-[10px] uppercase font-bold text-text-muted tracking-widest">Role</th>
                            <th class="px-6 py-4 text-[10px] uppercase font-bold text-text-muted tracking-widest">CTC</th>
                            <th class="px-6 py-4 text-[10px] uppercase font-bold text-text-muted tracking-widest">Status</th>
                            <th class="px-6 py-4 text-[10px] uppercase font-bold text-text-muted tracking-widest text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-100">
                        ${companyOffers.map(o => `
                            <tr class="hover:bg-gray-50/50 transition-colors">
                                <td class="px-6 py-5">
                                    <div class="flex items-center gap-3">
                                        <div class="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center font-bold text-primary">
                                            ${o.studentName[0]}
                                        </div>
                                        <p class="font-bold text-text-primary">${o.studentName}</p>
                                    </div>
                                </td>
                                <td class="px-6 py-5 font-medium text-text-primary">${o.role}</td>
                                <td class="px-6 py-5 font-bold text-emerald-600">${o.ctc} LPA</td>
                                <td class="px-6 py-5">
                                    <span class="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${o.status === 'Accepted' ? 'bg-emerald-100 text-emerald-600' : 'bg-yellow-100 text-yellow-600'}">
                                        ${o.status}
                                    </span>
                                </td>
                                <td class="px-6 py-5 text-right">
                                    <button class="p-2 hover:bg-gray-100 rounded-lg text-primary"><i data-lucide="file-text" class="w-4 h-4"></i></button>
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
