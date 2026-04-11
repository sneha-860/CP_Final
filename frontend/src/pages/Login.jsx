import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GraduationCap, User, Building2, Shield, CircleAlert as AlertCircle, ArrowRight, TrendingUp, Users, DollarSign, MapPin, Clock, CheckCircle2 } from 'lucide-react';

const Login = () => {
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
      color: 'from-primary to-purple-600',
      bgColor: 'bg-primary/10',
      borderColor: 'border-primary/20',
      description: 'Browse jobs, track applications, manage interviews',
      defaultCreds: { email: 'student@college.edu', password: 'student123' }
    },
    {
      id: 'admin',
      title: 'Placement Officer',
      icon: Shield,
      color: 'from-secondary to-orange-600',
      bgColor: 'bg-secondary/10',
      borderColor: 'border-secondary/20',
      description: 'Manage students, companies, and placement activities',
      defaultCreds: { email: 'admin@college.edu', password: 'admin123' }
    },
    {
      id: 'company',
      title: 'Company HR',
      icon: Building2,
      color: 'from-success to-emerald-600',
      bgColor: 'bg-success/10',
      borderColor: 'border-success/20',
      description: 'Post jobs, review applicants, schedule interviews',
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
    <div className="min-h-screen flex">
      {/* Left Panel - Hero Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-sidebar via-sidebar/95 to-sidebar/90 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 right-10 w-48 h-48 bg-secondary/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-1/3 w-40 h-40 bg-success/20 rounded-full blur-3xl"></div>
        </div>

        {/* Geometric Pattern */}
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center h-full px-12 text-white">
          {/* College Logo Area */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold font-heading">CampusHire</span>
              <span className="px-2 py-1 bg-white bg-opacity-20 rounded-full text-xs font-medium backdrop-blur-lg">v1.0</span>
            </div>
          </div>

          {/* Hero Text */}
          <div className="mb-12">
            <h1 className="text-5xl font-bold font-heading mb-6 animate-fade-in">
              Your Career Starts Here
            </h1>
            <p className="text-xl text-white/80 mb-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              Connect with top companies. Land your dream job.
            </p>
          </div>

          {/* Floating Stat Cards */}
          <div className="space-y-6">
            <div className="bg-white bg-opacity-80 backdrop-blur-lg rounded-xl p-6 animate-slide-up border border-white border-opacity-20" style={{ animationDelay: '0.4s' }}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-3xl font-bold animate-count-up">500+</div>
                  <div className="text-white/70">Students Placed</div>
                </div>
              </div>
            </div>

            <div className="bg-white bg-opacity-80 backdrop-blur-lg rounded-xl p-6 animate-slide-up border border-white border-opacity-20" style={{ animationDelay: '0.6s' }}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-secondary to-orange-600 rounded-lg flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-3xl font-bold animate-count-up" style={{ animationDelay: '0.8s' }}>80+</div>
                  <div className="text-white/70">Companies</div>
                </div>
              </div>
            </div>

            <div className="bg-white bg-opacity-80 backdrop-blur-lg rounded-xl p-6 animate-slide-up border border-white border-opacity-20" style={{ animationDelay: '0.8s' }}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-success to-emerald-600 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-3xl font-bold animate-count-up" style={{ animationDelay: '1s' }}>₹12 LPA</div>
                  <div className="text-white/70">Avg CTC</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 bg-gray-50 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Logo for mobile */}
          <div className="flex lg:hidden items-center gap-3 mb-8 justify-center">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold font-heading text-gray-900">CampusHire</span>
                    <span className="px-2 py-1 bg-indigo-50 rounded-full text-xs font-medium text-indigo-600">v1.0</span>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            {!selectedRole ? (
              <div className="animate-fade-in">
                <h2 className="text-3xl font-bold font-heading text-gray-900 mb-2 text-center">
                  Welcome to CampusHire
                </h2>
                <p className="text-gray-600 text-center mb-8">
                  Select your role to continue
                </p>

                <div className="space-y-4">
                  {roles.map((role, index) => {
                    const Icon = role.icon;
                    return (
                      <button
                        key={role.id}
                        onClick={() => handleRoleSelect(role)}
                        className={`group w-full p-6 border-2 ${role.borderColor} ${role.bgColor} rounded-xl hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 animate-slide-up`}
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-14 h-14 bg-gradient-to-br ${role.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1 text-left">
                            <h3 className="font-heading font-semibold text-lg text-gray-900 mb-1">
                              {role.title}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {role.description}
                            </p>
                          </div>
                          <ArrowRight className="w-5 h-5 text-gray-600 group-hover:text-indigo-500 transition-colors" />
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Demo Credentials */}
                <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-semibold text-sm text-blue-900 mb-3 flex items-center gap-2">
                    <CircleAlert className="w-4 h-4" />
                    Demo Credentials
                  </h4>
                  <div className="space-y-2 text-xs">
                    {roles.map(role => (
                      <div key={role.id} className="flex items-center justify-between">
                        <span className="font-medium text-gray-900">{role.title}:</span>
                        <span className="text-gray-600">{role.defaultCreds.email} / {role.defaultCreds.password}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="animate-slide-in-right">
                <button
                  onClick={() => {
                    setSelectedRole(null);
                    setEmail('');
                    setPassword('');
                    setError('');
                  }}
                  className="mb-6 text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium flex items-center gap-2"
                >
                  ← Back to role selection
                </button>

                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <selectedRole.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold font-heading text-gray-900 mb-2">
                    {selectedRole.title} Login
                  </h3>
                  <p className="text-gray-600">
                    Enter your credentials to access your dashboard
                  </p>
                </div>

                {error && (
                  <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-600 animate-slide-up">
                    <AlertCircle className="w-5 h-5" />
                    <span className="text-sm font-medium">{error}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                      placeholder="Enter your email"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Password
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                      placeholder="Enter your password"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full btn-primary flex items-center justify-center gap-2 mt-6"
                  >
                    Sign In
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>

                {/* Quick Demo Info */}
                <div className="mt-6 p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-text-muted text-center">
                    Demo: {selectedRole.defaultCreds.email} / {selectedRole.defaultCreds.password}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
