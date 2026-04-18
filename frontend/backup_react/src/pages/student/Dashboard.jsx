import { Briefcase, Calendar, Award, TrendingUp, Clock, Users, Building2, MapPin } from 'lucide-react';
import StatsCard from '../../components/StatsCard';
import JobCard from '../../components/JobCard';
import { useAuth } from '../../context/AuthContext';
import { mockApplications, mockInterviews, mockJobs, mockOffers } from '../../data/mockData';

const StudentDashboard = () => {
  const { user } = useAuth();
  const studentId = user?.id;

  const myApplications = mockApplications.filter(app => app.studentId === studentId);
  const myInterviews = mockInterviews.filter(int => int.studentId === studentId && int.status === 'Scheduled');
  const myOffers = mockOffers.filter(offer => offer.studentId === studentId);
  const shortlisted = myApplications.filter(app => app.status === 'Shortlisted' || app.status === 'Interview');

  const recentJobs = mockJobs.filter(job => job.status === 'Active').slice(0, 3);
  const upcomingInterviews = myInterviews.slice(0, 3);

  const getDaysToNextInterview = () => {
    if (upcomingInterviews.length === 0) return null;
    const nextInterview = upcomingInterviews[0];
    const today = new Date();
    const interviewDate = new Date(nextInterview.date);
    const daysLeft = Math.ceil((interviewDate - today) / (1000 * 60 * 60 * 24));
    return daysLeft;
  };

  const daysToNextInterview = getDaysToNextInterview();

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Welcome Banner */}
      <div className="bg-gradient-to-r from-primary via-purple-600 to-secondary rounded-2xl p-8 text-white shadow-card-hover relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full blur-2xl"></div>
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-heading font-bold mb-2">
                Welcome back, {user?.name}! 👋
              </h1>
              <p className="text-white/90 text-lg mb-4">Your placement journey is in full swing</p>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
                <div className="glass-effect rounded-lg p-4">
                  <p className="text-white/80 text-sm mb-1">Branch</p>
                  <p className="font-semibold text-lg">{user?.data?.branch}</p>
                </div>
                <div className="glass-effect rounded-lg p-4">
                  <p className="text-white/80 text-sm mb-1">Year</p>
                  <p className="font-semibold text-lg">{user?.data?.year}th Year</p>
                </div>
                <div className="glass-effect rounded-lg p-4">
                  <p className="text-white/80 text-sm mb-1">CGPA</p>
                  <p className="font-semibold text-lg">{user?.data?.cgpa}</p>
                </div>
                <div className="glass-effect rounded-lg p-4">
                  <p className="text-white/80 text-sm mb-1">Status</p>
                  <p className="font-semibold text-lg">{user?.data?.status}</p>
                </div>
              </div>
            </div>
            
            {daysToNextInterview !== null && (
              <div className="hidden md:block text-center">
                <div className="w-24 h-24 bg-white/20 rounded-full flex flex-col items-center justify-center backdrop-blur-glass border-2 border-white/30">
                  <Clock className="w-8 h-8 mb-1" />
                  <div className="text-2xl font-bold">{daysToNextInterview}</div>
                  <div className="text-xs">days to interview</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Action Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button className="p-4 bg-card rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 group">
          <Briefcase className="w-6 h-6 text-primary mb-2 group-hover:scale-110 transition-transform" />
          <p className="text-sm font-medium text-text-primary">Browse Jobs</p>
        </button>
        <button className="p-4 bg-card rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 group">
          <Award className="w-6 h-6 text-secondary mb-2 group-hover:scale-110 transition-transform" />
          <p className="text-sm font-medium text-text-primary">My Applications</p>
        </button>
        <button className="p-4 bg-card rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 group">
          <Calendar className="w-6 h-6 text-success mb-2 group-hover:scale-110 transition-transform" />
          <p className="text-sm font-medium text-text-primary">Interview Schedule</p>
        </button>
        <button className="p-4 bg-card rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 group">
          <Users className="w-6 h-6 text-info mb-2 group-hover:scale-110 transition-transform" />
          <p className="text-sm font-medium text-text-primary">My Profile</p>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          icon={Briefcase}
          label="Total Applications"
          value={myApplications.length}
          color="primary"
          trend={12}
        />
        <StatsCard
          icon={Calendar}
          label="Interviews Scheduled"
          value={myInterviews.length}
          color="secondary"
          trend={8}
        />
        <StatsCard
          icon={Award}
          label="Offers Received"
          value={myOffers.length}
          color="success"
          trend={25}
        />
        <StatsCard
          icon={TrendingUp}
          label="Shortlisted"
          value={shortlisted.length}
          color="info"
          trend={15}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upcoming Interviews */}
        <div className="stat-card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-heading font-bold text-text-primary flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Upcoming Interviews
            </h2>
            <span className="status-badge info">{upcomingInterviews.length} scheduled</span>
          </div>
          
          {upcomingInterviews.length > 0 ? (
            <div className="space-y-4">
              {upcomingInterviews.map((interview, index) => (
                <div key={interview.id} className={`p-4 bg-background rounded-xl border border-gray-100 hover:border-primary transition-all duration-300 animate-slide-up`} style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-text-primary mb-1">{interview.companyName}</h3>
                      <p className="text-sm text-text-muted">{interview.role}</p>
                    </div>
                    <span className="status-badge warning">
                      {interview.round}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1 text-text-muted">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(interview.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1 text-text-muted">
                      <Clock className="w-4 h-4" />
                      <span>{interview.time}</span>
                    </div>
                    <span className="status-badge info">
                      {interview.mode}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-text-muted">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-gray-400" />
              </div>
              <p className="font-medium">No upcoming interviews</p>
              <p className="text-sm mt-1">Keep applying to get scheduled!</p>
            </div>
          )}
        </div>

        {/* Application Status */}
        <div className="stat-card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-heading font-bold text-text-primary flex items-center gap-2">
              <Award className="w-5 h-5 text-secondary" />
              Application Status
            </h2>
            <span className="status-badge primary">{myApplications.length} total</span>
          </div>
          
          <div className="space-y-3">
            {[
              { status: 'Offer', count: myApplications.filter(a => a.status === 'Offer').length, color: 'success', icon: Award },
              { status: 'Interview', count: myApplications.filter(a => a.status === 'Interview').length, color: 'info', icon: Calendar },
              { status: 'Shortlisted', count: myApplications.filter(a => a.status === 'Shortlisted').length, color: 'secondary', icon: TrendingUp },
              { status: 'Applied', count: myApplications.filter(a => a.status === 'Applied').length, color: 'primary', icon: Briefcase },
              { status: 'Rejected', count: myApplications.filter(a => a.status === 'Rejected').length, color: 'error', icon: Award },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={item.status} className={`flex items-center justify-between p-4 bg-background rounded-xl border border-gray-100 hover:shadow-card transition-all duration-300 animate-slide-up`} style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 bg-${item.color}/10 rounded-lg flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 text-${item.color}`} />
                    </div>
                    <span className="font-medium text-text-primary">{item.status}</span>
                  </div>
                  <span className="font-bold text-text-primary text-lg">{item.count}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent Job Openings */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-heading font-bold text-text-primary flex items-center gap-2">
            <Building2 className="w-5 h-5 text-primary" />
            Recent Job Openings
          </h2>
          <a href="/student/jobs" className="text-primary hover:text-purple-600 font-medium transition-colors flex items-center gap-1">
            View All
            <MapPin className="w-4 h-4" />
          </a>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {recentJobs.map((job, index) => (
            <div key={job.id} style={{ animationDelay: `${index * 0.1}s` }}>
              <JobCard job={job} showApplyButton={false} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
