// Authentication logic for CampusPlacement System
import { mockCredentials, mockStudents, mockCompanies } from './data.js';

class Auth {
    constructor() {
        this.user = JSON.parse(localStorage.getItem('campusHireUser')) || null;
    }

    getUser() {
        return this.user;
    }

    isAuthenticated() {
        return !!this.user;
    }

    login(email, password, role) {
        let userData = null;

        if (role === 'student' && email === mockCredentials.student.email && password === mockCredentials.student.password) {
            const student = mockStudents.find(s => s.id === mockCredentials.student.defaultStudent);
            userData = {
                role: 'student',
                email,
                name: student.name,
                id: student.id,
                data: student
            };
        } else if (role === 'admin' && email === mockCredentials.admin.email && password === mockCredentials.admin.password) {
            userData = {
                role: 'admin',
                email,
                name: mockCredentials.admin.name,
                designation: mockCredentials.admin.designation
            };
        } else if (role === 'company' && email === mockCredentials.company.email && password === mockCredentials.company.password) {
            const company = mockCompanies.find(c => c.id === mockCredentials.company.defaultCompany);
            userData = {
                role: 'company',
                email,
                name: company.hrName,
                companyId: company.id,
                companyName: company.name,
                data: company
            };
        }

        if (userData) {
            this.user = userData;
            localStorage.setItem('campusHireUser', JSON.stringify(userData));
            return true;
        }
        return false;
    }

    logout() {
        this.user = null;
        localStorage.removeItem('campusHireUser');
    }
}

export const auth = new Auth();
