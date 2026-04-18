// Login Page Template for CampusPlacement System
import { mockCredentials } from '../data.js';

export function renderLogin() {
    return `
    <div class="min-h-screen flex items-center justify-center p-6 bg-slate-50 selection:bg-primary/20">
        <div class="max-w-xl w-full">
            <div class="text-center mb-12 animate-fade-in-up">
                <div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-tr from-primary to-primary-light rounded-[2rem] mb-6 shadow-2xl shadow-primary/30 transform hover:rotate-6 transition-transform">
                    <i data-lucide="graduation-cap" class="w-10 h-10 text-white"></i>
                </div>
                <h1 class="text-5xl font-black text-text-primary mb-3 font-heading tracking-tight leading-none">CampusHire</h1>
                <p class="text-lg text-text-muted font-medium">The Next-Generation Placement Ecosystem</p>
            </div>

            <div class="bg-card p-10 md:p-12 rounded-[3.5rem] shadow-premium border border-slate-100/50 animate-fade-in-up relative overflow-hidden backdrop-blur-xl" style="animation-delay: 100ms">
                <!-- Decorative Elements -->
                <div class="absolute -top-24 -right-24 w-48 h-48 bg-primary/5 rounded-full blur-3xl"></div>
                <div class="absolute -bottom-24 -left-24 w-48 h-48 bg-secondary/5 rounded-full blur-3xl"></div>
                <!-- Role Selection -->
                <div id="role-selection" class="space-y-6 relative">
                    <div class="text-center mb-10">
                        <h2 class="text-3xl font-black text-text-primary mb-2 tracking-tight">Portal Gateway</h2>
                        <p class="text-text-muted font-medium">Identified yourself to proceed</p>
                    </div>
                    
                    <div class="grid grid-cols-1 gap-5">
                        <button class="role-btn p-6 border border-slate-100 rounded-[2rem] bg-white card-p flex items-center gap-6 text-left group transition-all" 
                                data-role="student" data-title="Scholar Access" data-email="${mockCredentials.student.email}" data-password="${mockCredentials.student.password}">
                            <div class="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center group-hover:bg-primary transition-colors duration-500 shadow-inner">
                                <i data-lucide="user" class="w-8 h-8 text-primary group-hover:text-white transition-colors"></i>
                            </div>
                            <div>
                                <h3 class="text-xl font-black text-text-primary">Student Scholar</h3>
                                <p class="text-sm text-text-muted font-medium">Manage your professional destiny</p>
                            </div>
                        </button>

                        <button class="role-btn p-6 border border-slate-100 rounded-[2rem] bg-white card-p flex items-center gap-6 text-left group transition-all"
                                data-role="admin" data-title="Executive Access" data-email="${mockCredentials.admin.email}" data-password="${mockCredentials.admin.password}">
                            <div class="w-16 h-16 bg-secondary/5 rounded-2xl flex items-center justify-center group-hover:bg-secondary transition-colors duration-500 shadow-inner">
                                <i data-lucide="shield" class="w-8 h-8 text-secondary group-hover:text-white transition-colors"></i>
                            </div>
                            <div>
                                <h3 class="text-xl font-black text-text-primary">Placement Officer</h3>
                                <p class="text-sm text-text-muted font-medium">Govern the ecosystem metrics</p>
                            </div>
                        </button>

                        <button class="role-btn p-6 border border-slate-100 rounded-[2rem] bg-white card-p flex items-center gap-6 text-left group transition-all"
                                data-role="company" data-title="Partner Access" data-email="${mockCredentials.company.email}" data-password="${mockCredentials.company.password}">
                            <div class="w-16 h-16 bg-success/5 rounded-2xl flex items-center justify-center group-hover:bg-success transition-colors duration-500 shadow-inner">
                                <i data-lucide="building-2" class="w-8 h-8 text-success group-hover:text-white transition-colors"></i>
                            </div>
                            <div>
                                <h3 class="text-xl font-black text-text-primary">Enterprise Partner</h3>
                                <p class="text-sm text-text-muted font-medium">Acquire the brightest minds</p>
                            </div>
                        </button>
                    </div>
                </div>

                <!-- Login Form (Hidden by default) -->
                <div id="login-section" class="hidden relative">
                    <button id="back-to-roles" class="text-text-muted hover:text-primary mb-10 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:-translate-x-1 group">
                        <i data-lucide="arrow-left" class="w-4 h-4 transition-transform group-hover:-translate-x-1"></i>
                        Gateway
                    </button>

                    <div class="text-center mb-10">
                        <div id="selected-role-icon" class="w-20 h-20 bg-primary rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-primary/30"></div>
                        <h3 id="role-title" class="text-3xl font-black text-text-primary mb-2 tracking-tight">Login</h3>
                        <p class="text-text-muted font-medium">Authorized credentials required</p>
                    </div>

                    <form id="login-form" class="space-y-6">
                        <input type="hidden" id="selected-role">
                        
                        <div class="space-y-3">
                            <label class="text-[10px] font-black text-text-primary uppercase tracking-[0.2em] ml-1">Identity Endpoint</label>
                            <input type="email" id="email" required placeholder="identifier@network.edu" 
                                class="w-full px-6 py-4.5 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all outline-none font-medium">
                        </div>

                        <div class="space-y-3">
                            <label class="text-[10px] font-black text-text-primary uppercase tracking-[0.2em] ml-1">Access Protocol</label>
                            <input type="password" id="password" required placeholder="Keyphrase" 
                                class="w-full px-6 py-4.5 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all outline-none font-medium">
                        </div>

                        <div id="login-error" class="hidden p-4 bg-error/5 border border-error/10 text-error text-[11px] font-black uppercase tracking-wider rounded-2xl text-center animate-pulse"></div>

                        <button type="submit" class="w-full bg-primary text-white py-5 rounded-2xl font-black shadow-2xl shadow-primary/30 hover:-translate-y-1 active:scale-95 transition-all text-sm uppercase tracking-[0.2em] mt-6">
                            Secure Entry
                        </button>
                    </form>
                </div>
            </div>

            <div class="mt-10 p-8 bg-white/50 backdrop-blur-sm border border-slate-100 rounded-[2.5rem] shadow-sm animate-fade-in-up" style="animation-delay: 200ms">
                <h4 class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                    <i data-lucide="terminal" class="w-4 h-4"></i>
                    Development Bypass Protocol
                </h4>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-[10px] uppercase font-black tracking-widest leading-relaxed">
                    <div class="p-4 bg-slate-50/50 rounded-2xl border border-slate-100">
                        <p class="text-primary mb-1">Scholar</p>
                        <p class="text-text-primary truncate">${mockCredentials.student.email}</p>
                    </div>
                    <div class="p-4 bg-slate-50/50 rounded-2xl border border-slate-100">
                        <p class="text-secondary mb-1">Executive</p>
                        <p class="text-text-primary truncate">${mockCredentials.admin.email}</p>
                    </div>
                    <div class="p-4 bg-slate-50/50 rounded-2xl border border-slate-100">
                        <p class="text-success mb-1">Partner</p>
                        <p class="text-text-primary truncate">${mockCredentials.company.email}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
}
