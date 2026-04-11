import { Briefcase, Users, Send } from 'lucide-react';
import StatsCard from '../../components/StatsCard';
import { useAuth } from '../../context/AuthContext';
import { mockJobs, mockApplications } from '../../data/mockData';

const CompanyDashboard = () => {
  const { user } = useAuth();
  const companyName = user?.companyName;
  
  const companyJobs = mockJobs.filter(job => job.companyName === companyName);
  const companyApplications = mockApplications.filter(app => app.companyName === companyName);
  const shortlisted = companyApplications.filter(app => app.status === 'Shortlisted');
  const offers = companyApplications.filter(app => app.status === 'Offer');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-gray-900 mb-2">
          Welcome back, {user?.name}!
        </h1>
        <p className="text-gray-600">Manage your recruitment activities for {companyName}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          icon={Briefcase}
          label="Jobs Posted"
          value={companyJobs.length}
          color="primary"
        />
        <StatsCard
          icon={Users}
          label="Total Applicants"
          value={companyApplications.length}
          color="accent"
        />
        <StatsCard
          icon={Users}
          label="Shortlisted"
          value={shortlisted.length}
          color="primary"
        />
        <StatsCard
          icon={Send}
          label="Offers Sent"
          value={offers.length}
          color="success"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h2 className="text-lg font-heading font-semibold mb-4">Active Job Postings</h2>
          <div className="space-y-3">
            {companyJobs.filter(j => j.status === 'Active').map(job => (
              <div key={job.id} className="p-3 border border-gray-200 rounded-lg hover:border-primary transition-colors">
                <h3 className="font-semibold text-gray-900">{job.title}</h3>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm text-gray-600">Applicants: {companyApplications.filter(a => a.jobId === job.id).length}</span>
                  <span className="text-sm font-medium text-primary">{job.ctc} LPA</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h2 className="text-lg font-heading font-semibold mb-4">Recent Applications</h2>
          <div className="space-y-3">
            {companyApplications.slice(0, 5).map(app => (
              <div key={app.id} className="p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-900">{app.studentName}</p>
                    <p className="text-xs text-gray-600">{app.role}</p>
                  </div>
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                    {app.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;