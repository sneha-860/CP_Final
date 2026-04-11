import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import DataTable from '../../components/DataTable';
import StatusBadge from '../../components/StatusBadge';
import { mockJobs, mockApplications } from '../../data/mockData';
import { Download } from 'lucide-react';

const ViewApplicants = () => {
  const { user } = useAuth();
  const companyName = user?.companyName;
  const companyJobs = mockJobs.filter(job => job.companyName === companyName);
  const [selectedJob, setSelectedJob] = useState(companyJobs[0]?.id || '');

  const applicants = mockApplications.filter(
    app => app.companyName === companyName && (!selectedJob || app.jobId === selectedJob)
  );

  const handleStatusChange = (appId, newStatus) => {
    alert(`Application ${appId} status changed to ${newStatus}`);
  };

  const columns = [
    { header: 'Student Name', accessor: 'studentName', sortable: true },
    { header: 'Branch', accessor: 'studentBranch', sortable: true },
    { header: 'CGPA', accessor: 'studentCGPA', sortable: true },
    { header: 'Role', accessor: 'role', sortable: true },
    { header: 'Applied Date', accessor: 'appliedDate', sortable: true, render: (row) => new Date(row.appliedDate).toLocaleDateString() },
    {
      header: 'Status',
      accessor: 'status',
      render: (row) => <StatusBadge status={row.status} />
    },
    {
      header: 'Resume',
      accessor: 'id',
      render: () => (
        <button className="text-primary hover:underline flex items-center gap-1">
          <Download className="w-4 h-4" />
          View
        </button>
      )
    },
    {
      header: 'Action',
      accessor: 'id',
      render: (row) => (
        <select
          value={row.status}
          onChange={(e) => handleStatusChange(row.id, e.target.value)}
          className="px-2 py-1 border border-gray-300 rounded text-sm"
        >
          <option value="Applied">Applied</option>
          <option value="Shortlisted">Shortlist</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Reject</option>
        </select>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-gray-900 mb-2">View Applicants</h1>
        <p className="text-gray-600">Review and manage job applications</p>
      </div>

      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
        <label className="block text-sm font-medium text-gray-700 mb-2">Select Job Posting</label>
        <select
          value={selectedJob}
          onChange={(e) => setSelectedJob(e.target.value)}
          className="w-full md:w-96 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <option value="">All Jobs</option>
          {companyJobs.map(job => (
            <option key={job.id} value={job.id}>
              {job.title} ({mockApplications.filter(a => a.jobId === job.id).length} applicants)
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: 'Total', count: applicants.length, color: 'bg-gray-500' },
          { label: 'Applied', count: applicants.filter(a => a.status === 'Applied').length, color: 'bg-blue-500' },
          { label: 'Shortlisted', count: applicants.filter(a => a.status === 'Shortlisted').length, color: 'bg-accent' },
          { label: 'Interview', count: applicants.filter(a => a.status === 'Interview').length, color: 'bg-primary' },
          { label: 'Offers', count: applicants.filter(a => a.status === 'Offer').length, color: 'bg-success' },
        ].map(stat => (
          <div key={stat.label} className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${stat.color}`}></div>
              <p className="text-2xl font-bold text-gray-900">{stat.count}</p>
            </div>
          </div>
        ))}
      </div>

      <DataTable
        columns={columns}
        data={applicants}
        searchPlaceholder="Search applicants by name or branch..."
      />
    </div>
  );
};

export default ViewApplicants;
