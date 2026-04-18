// Lightweight Toast Notification System
export class Toast {
    constructor() {
        this.container = document.createElement('div');
        this.container.className = 'fixed bottom-8 right-8 z-[100] flex flex-col gap-3 pointer-events-none';
        document.body.appendChild(this.container);
    }

    show(message, type = 'success', duration = 3000) {
        const toast = document.createElement('div');
        toast.className = `
            flex items-center gap-3 px-6 py-4 rounded-2xl shadow-premium pointer-events-auto
            animate-fade-in-up transition-all duration-300 transform
            ${this.getStyles(type)}
        `;

        const icon = this.getIcon(type);
        
        toast.innerHTML = `
            <i data-lucide="${icon}" class="w-5 h-5"></i>
            <span class="font-bold text-sm tracking-wide">${message}</span>
        `;

        this.container.appendChild(toast);
        
        if (window.lucide) {
            window.lucide.createIcons({
                root: toast
            });
        }

        setTimeout(() => {
            toast.classList.add('opacity-0', 'translate-y-2');
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, duration);
    }

    getStyles(type) {
        switch (type) {
            case 'success': return 'bg-success text-white';
            case 'error': return 'bg-error text-white';
            case 'warning': return 'bg-secondary text-white';
            default: return 'bg-slate-800 text-white';
        }
    }

    getIcon(type) {
        switch (type) {
            case 'success': return 'check-circle';
            case 'error': return 'alert-circle';
            case 'warning': return 'alert-triangle';
            default: return 'info';
        }
    }
}

export const toast = new Toast();
