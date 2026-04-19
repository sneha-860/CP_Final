// Main Application Logic and Router for CampusPlacement System
import { auth } from './auth.js';
import { toast } from './components/toast.js';

window.toast = toast;

class App {
    constructor() {
        this.appElement = document.getElementById('app');
        this.currentRoute = '';
        this.init();
    }

    async init() {
        // Handle initial route
        this.handleRoute();

        // Listen for route changes
        window.addEventListener('hashchange', () => {
            // Add a small delay for smoother transition effect
            this.appElement.classList.add('opacity-0', 'translate-y-2');
            setTimeout(() => {
                this.handleRoute();
                this.appElement.classList.remove('opacity-0', 'translate-y-2');
            }, 100);
        });
        
        // Global click listener for navigation
        document.addEventListener('click', (e) => {
            const anchor = e.target.closest('a');
            if (anchor && anchor.getAttribute('href')?.startsWith('#')) {
                // Let hashchange handle it
            }
        });
    }

    async handleRoute() {
        const hash = window.location.hash || '#';
        this.currentRoute = hash.substring(1);

        // Auth guard
        const user = auth.getUser();
        if (!user && this.currentRoute !== '' && !this.currentRoute.startsWith('login')) {
            window.location.hash = '#';
            return;
        }

        if (user && (this.currentRoute === '' || this.currentRoute === 'login')) {
            window.location.hash = `#${user.role}/dashboard`;
            return;
        }

        // Route mapping
        if (this.currentRoute === '') {
            await this.renderLoginPage();
        } else if (this.currentRoute.startsWith('student/')) {
            if (user.role !== 'student') {
                window.location.hash = `#${user.role}/dashboard`;
                return;
            }
            await this.renderStudentPage();
        } else if (this.currentRoute.startsWith('admin/')) {
            if (user.role !== 'admin') {
                window.location.hash = `#${user.role}/dashboard`;
                return;
            }
            await this.renderAdminPage();
        } else if (this.currentRoute.startsWith('company/')) {
            if (user.role !== 'company') {
                window.location.hash = `#${user.role}/dashboard`;
                return;
            }
            await this.renderCompanyPage();
        } else {
            this.renderNotFound();
        }

        // Re-initialize Lucide icons
        if (window.lucide) {
            window.lucide.createIcons();
        }
    }

    async renderLoginPage() {
        const { renderLogin } = await import('./pages/login.js');
        this.appElement.innerHTML = renderLogin();
        // Add event listeners for login
        this.attachLoginListeners();
    }

    attachLoginListeners() {
        const loginForm = document.getElementById('login-form');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const role = document.getElementById('selected-role').value;
                const email = document.getElementById('email').value;
                const password = document.getElementById('password').value;
                
                if (auth.login(email, password, role)) {
                    toast.show(`Welcome back, ${email.split('@')[0]}!`, 'success');
                    window.location.hash = `#${role}/dashboard`;
                } else {
                    toast.show('Invalid credentials. Please try again.', 'error');
                    const errorEl = document.getElementById('login-error');
                    errorEl.textContent = 'Invalid credentials';
                    errorEl.classList.remove('hidden');
                }
            });
        }

        // Role selection logic
        const roleButtons = document.querySelectorAll('.role-btn');
        roleButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const role = btn.dataset.role;
                const title = btn.dataset.title;
                const email = btn.dataset.email;
                const password = btn.dataset.password;

                document.getElementById('role-selection').classList.add('hidden');
                document.getElementById('login-section').classList.remove('hidden');
                document.getElementById('selected-role').value = role;
                document.getElementById('role-title').textContent = title + ' Login';
                document.getElementById('email').value = email;
                document.getElementById('password').value = password;
                
                // Set icon
                const iconContainer = document.getElementById('selected-role-icon');
                const icons = {
                    student: 'user',
                    admin: 'shield',
                    company: 'building-2'
                };
                iconContainer.innerHTML = `<i data-lucide="${icons[role]}" class="w-8 h-8 text-white"></i>`;
                window.lucide.createIcons();
            });
        });

        const backBtn = document.getElementById('back-to-roles');
        if (backBtn) {
            backBtn.addEventListener('click', () => {
                document.getElementById('role-selection').classList.remove('hidden');
                document.getElementById('login-section').classList.add('hidden');
            });
        }
    }

    async renderStudentPage() {
        const { renderLayout } = await import('./components/layout.js');
        const subroute = this.currentRoute.split('/')[1] || 'dashboard';
        const { renderStudentPage } = await import('./pages/student.js');
        
        const content = renderStudentPage(subroute);
        this.appElement.innerHTML = renderLayout(content);
        this.attachLayoutListeners();
    }

    async renderAdminPage() {
        const { renderLayout } = await import('./components/layout.js');
        const subroute = this.currentRoute.split('/')[1] || 'dashboard';
        const { renderAdminPage } = await import('./pages/admin.js');
        
        const content = renderAdminPage(subroute);
        this.appElement.innerHTML = renderLayout(content);
        this.attachLayoutListeners();
    }

    async renderCompanyPage() {
        const { renderLayout } = await import('./components/layout.js');
        const subroute = this.currentRoute.split('/')[1] || 'dashboard';
        const { renderCompanyPage } = await import('./pages/company.js');
        
        const content = renderCompanyPage(subroute);
        this.appElement.innerHTML = renderLayout(content);
        this.attachLayoutListeners();
    }

    attachLayoutListeners() {
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                auth.logout();
                toast.show('You have been logged out safely.', 'info');
                window.location.hash = '#';
            });
        }

        const menuBtn = document.getElementById('mobile-menu-btn');
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('sidebar-overlay');
        
        if (menuBtn && sidebar && overlay) {
            const toggleSidebar = () => {
                sidebar.classList.toggle('-translate-x-full');
                overlay.classList.toggle('hidden');
            };
            menuBtn.addEventListener('click', toggleSidebar);
            overlay.addEventListener('click', toggleSidebar);
        }
    }

    renderNotFound() {
        this.appElement.innerHTML = `
            <div class="min-h-screen flex items-center justify-center">
                <div class="text-center">
                    <h1 class="text-6xl font-bold text-primary mb-4">404</h1>
                    <p class="text-xl text-text-muted mb-8">Page not found</p>
                    <a href="#" class="px-6 py-3 bg-primary text-white rounded-xl">Go Home</a>
                </div>
            </div>
        `;
    }
}

// Global instance
window.app = new App();

window.editStudentProfile = () => {
    const skillForm = document.getElementById('add-skill-form');
    const isEditing = skillForm && skillForm.classList.contains('hidden');
    
    if (skillForm) {
        skillForm.classList.toggle('hidden');
        if (!skillForm.classList.contains('hidden')) {
            document.getElementById('new-skill-input').focus();
        }
    }

    // Toggle contenteditable for profile fields
    const fields = ['profile-name', 'profile-branch', 'profile-phone', 'profile-email'];
    fields.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            if (isEditing) {
                el.contentEditable = "true";
                el.classList.add('border-b', 'border-primary/50', 'outline-none', 'bg-slate-50', 'px-2', 'rounded-lg');
            } else {
                el.contentEditable = "false";
                el.classList.remove('border-b', 'border-primary/50', 'outline-none', 'bg-slate-50', 'px-2', 'rounded-lg');
                
                // Keep the underlying mock data updated in memory session
                const user = auth.getUser();
                if (user && user.data) {
                    if (id === 'profile-name') user.data.name = el.innerText.trim();
                    if (id === 'profile-branch') user.data.branch = el.innerText.trim();
                    if (id === 'profile-phone') user.data.phone = el.innerText.trim();
                    if (id === 'profile-email') user.data.email = el.innerText.trim();
                }
            }
        }
    });

    const btn = document.getElementById('edit-profile-btn');
    if (isEditing) {
        if(btn) {
            btn.innerHTML = 'Save Profile <i data-lucide="check" class="w-4 h-4 inline ml-2"></i>';
            btn.classList.replace('bg-primary', 'bg-success');
            if(window.lucide) window.lucide.createIcons({ root: btn });
        }
        window.toast?.show('You can now edit your profile and add skills.', 'info');
    } else {
        if(btn) {
            btn.innerText = "Edit Profile";
            btn.classList.replace('bg-success', 'bg-primary');
        }
        window.toast?.show('Profile saved successfully.', 'success');
    }
};

window.addStudentSkill = (skill) => {
    if (!skill.trim()) return;
    const container = document.getElementById('skills-container');
    const span = document.createElement('span');
    span.className = 'px-4 py-2 bg-background rounded-xl text-sm font-bold text-text-primary border border-gray-100 transition-hover hover:border-primary hover:text-primary cursor-default';
    span.textContent = skill.trim();
    container.appendChild(span);
    
    // Attempt to update mock data object memory
    const user = auth.getUser();
    if (user && user.data && user.data.skills) {
        user.data.skills.push(skill.trim());
    }
    window.toast?.show(`Added skill: ${skill.trim()}`, 'success') || console.log('Skill added');
};
