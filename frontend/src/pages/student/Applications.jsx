import { useAuth } from '../../context/AuthContext';
import { mockApplications } from '../../data/mockData';
import DataTable from '../../components/DataTable';
import StatusBadge from '../../components/StatusBadge';
import EmptyState from '../../components/EmptyState';
import { Briefcase } from 'lucide-react';

const MyApplications = () => {
  const { user } = useAuth();
  const myApplications = mockApplications.filter(app => app.studentId === user?.id);

  const columns = [
    { header: 'Company', accessor: 'companyName', sortable: true },
    { header: 'Role', accessor: 'role', sortable: true },
    { header: 'Applied Date', accessor: 'appliedDate', sortable: true, render: (row) => new Date(row.appliedDate).toLocaleDateString() },
    { header: 'CTC (LPA)', accessor: 'ctc', sortable: true },
    {
      header: 'Status',
      accessor: 'status',
      render: (row) => <StatusBadge status={row.status} />
    },
    {
      header: 'Action',
      accessor: 'id',
      render: (row) => (
        <button className="px-3 py-1 text-sm bg-error/10 text-error rounded hover:bg-error/20">
          Withdraw
        </button>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-gray-900 mb-2">My Applications</h1>
        <p className="text-gray-600">Track your job applications</p>
      </div>

      {myApplications.length > 0 ? (
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { label: 'Total', count: myApplications.length, color: 'bg-gray-500' },
              { label: 'Applied', count: myApplications.filter(a => a.status === 'Applied').length, color: 'bg-blue-500' },
              { label: 'Shortlisted', count: myApplications.filter(a => a.status === 'Shortlisted').length, color: 'bg-accent' },
              { label: 'Interview', count: myApplications.filter(a => a.status === 'Interview').length, color: 'bg-primary' },
              { label: 'Offers', count: myApplications.filter(a => a.status === 'Offer').length, color: 'bg-success' },
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
          <DataTable columns={columns} data={myApplications} searchPlaceholder="Search by company or role..." />
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200">
          <EmptyState
            icon={Briefcase}
            title="No Applications Yet"
            message="Start applying to jobs to see your applications here"
          />
        </div>
      )}
    </div>
  );
};

export default MyApplications;
