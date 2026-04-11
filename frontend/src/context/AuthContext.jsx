import { createContext, useContext, useState, useEffect } from 'react';
import { mockCredentials, mockStudents, mockCompanies } from '../data/mockData';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('campusHireUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password, role) => {
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
      setUser(userData);
      localStorage.setItem('campusHireUser', JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('campusHireUser');
  };

  const value = {
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
