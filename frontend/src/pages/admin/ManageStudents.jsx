import { Users, Briefcase, TrendingUp, Download } from 'lucide-react';
import DataTable from '../../components/DataTable';
import StatusBadge from '../../components/StatusBadge';
import { mockStudents } from '../../data/mockData';

const ManageStudents = () => {
  const columns = [
    { header: 'Roll No', accessor: 'rollNo', sortable: true },
    { header: 'Name', accessor: 'name', sortable: true },
    { header: 'Branch', accessor: 'branch', sortable: true },
    { header: 'CGPA', accessor: 'cgpa', sortable: true },
    {
      header: 'Status',
      accessor: 'status',
      render: (row) => <StatusBadge status={row.status} />
    },
    {
      header: 'Action',
      accessor: 'id',
      render: () => (
        <button className="px-3 py-1 text-sm text-primary hover:underline">
          View Profile
        </button>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-gray-900 mb-2">Manage Students</h1>
          <p className="text-gray-600">View and manage all registered students</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">Total Students</p>
          <p className="text-3xl font-bold text-gray-900">{mockStudents.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">Placed</p>
          <p className="text-3xl font-bold text-success">{mockStudents.filter(s => s.status === 'Placed').length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">Unplaced</p>
          <p className="text-3xl font-bold text-error">{mockStudents.filter(s => s.status === 'Unplaced').length}</p>
        </div>
      </div>

      <DataTable columns={columns} data={mockStudents} searchPlaceholder="Search by name or roll number..." />
    </div>
  );
};

export default ManageStudents;