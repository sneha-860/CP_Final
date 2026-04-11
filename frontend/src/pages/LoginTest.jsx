import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GraduationCap, User, Building2, Shield } from 'lucide-react';

const LoginTest = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const roles = [
    {
      id: 'student',
      title: 'Student',
      icon: User,
      defaultCreds: { email: 'student@college.edu', password: 'student123' }
    },
    {
      id: 'admin',
      title: 'Placement Officer',
      icon: Shield,
      defaultCreds: { email: 'admin@college.edu', password: 'admin123' }
    },
    {
      id: 'company',
      title: 'Company HR',
      icon: Building2,
      defaultCreds: { email: 'hr@cloudtech.com', password: 'company123' }
    }
  ];

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setEmail(role.defaultCreds.email);
    setPassword(role.defaultCreds.password);
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!selectedRole) {
      setError('Please select a role');
      return;
    }

    const success = login(email, password, selectedRole.id);

    if (success) {
      navigate(`/${selectedRole.id}/dashboard`);
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f3f4f6' }}>
      <div style={{ maxWidth: '400px', width: '100%', padding: '2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '3rem', height: '3rem', backgroundColor: '#6366f1', borderRadius: '0.5rem', marginBottom: '1rem' }}>
            <GraduationCap style={{ width: '1.5rem', height: '1.5rem', color: 'white' }} />
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '0.5rem' }}>
            CampusHire
          </h1>
          <p style={{ color: '#6b7280' }}>
            Campus Placement Management System
          </p>
        </div>

        <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '1rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
          {!selectedRole ? (
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '600', textAlign: 'center', marginBottom: '1rem', color: '#1f2937' }}>
                Select Your Role
              </h2>
              <p style={{ textAlign: 'center', marginBottom: '2rem', color: '#6b7280' }}>
                Choose how you want to access the system
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {roles.map((role) => {
                  const Icon = role.icon;
                  return (
                    <button
                      key={role.id}
                      onClick={() => handleRoleSelect(role)}
                      style={{
                        padding: '1.5rem',
                        border: '2px solid #e5e7eb',
                        borderRadius: '0.75rem',
                        backgroundColor: 'white',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.borderColor = '#6366f1';
                        e.target.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.borderColor = '#e5e7eb';
                        e.target.style.boxShadow = 'none';
                      }}
                    >
                      <div style={{ width: '3rem', height: '3rem', backgroundColor: '#6366f1', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Icon style={{ width: '1.5rem', height: '1.5rem', color: 'white' }} />
                      </div>
                      <div style={{ textAlign: 'left' }}>
                        <h3 style={{ fontWeight: '600', fontSize: '1.125rem', color: '#1f2937', marginBottom: '0.25rem' }}>
                          {role.title}
                        </h3>
                        <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                          Access as {role.title.toLowerCase()}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div>
              <button
                onClick={() => {
                  setSelectedRole(null);
                  setEmail('');
                  setPassword('');
                  setError('');
                }}
                style={{ marginBottom: '1.5rem', color: '#6b7280', cursor: 'pointer' }}
              >
                ← Back to role selection
              </button>

              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <div style={{ width: '4rem', height: '4rem', backgroundColor: '#6366f1', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                  <selectedRole.icon style={{ width: '2rem', height: '2rem', color: 'white' }} />
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1f2937', marginBottom: '0.5rem' }}>
                  {selectedRole.title} Login
                </h3>
                <p style={{ color: '#6b7280' }}>
                  Enter your credentials to access your dashboard
                </p>
              </div>

              {error && (
                <div style={{ marginBottom: '1rem', padding: '0.75rem', backgroundColor: '#fef2f2', border: '1px solid #fecaca', borderRadius: '0.5rem', color: '#dc2626' }}>
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.5rem',
                      fontSize: '1rem'
                    }}
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.5rem',
                      fontSize: '1rem'
                    }}
                    placeholder="Enter your password"
                    required
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    backgroundColor: '#6366f1',
                    color: 'white',
                    padding: '0.75rem',
                    borderRadius: '0.5rem',
                    fontSize: '1rem',
                    fontWeight: '500',
                    cursor: 'pointer',
                    border: 'none',
                    marginTop: '1rem'
                  }}
                >
                  Sign In
                </button>
              </form>
            </div>
          )}
        </div>

        <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '0.5rem' }}>
          <h4 style={{ fontSize: '0.875rem', fontWeight: '600', color: '#1e40af', marginBottom: '0.5rem' }}>Demo Credentials:</h4>
          <div style={{ fontSize: '0.75rem', color: '#1e40af' }}>
            {roles.map(role => (
              <div key={role.id} style={{ marginBottom: '0.25rem' }}>
                <strong>{role.title}:</strong> {role.defaultCreds.email} / {role.defaultCreds.password}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginTest;
