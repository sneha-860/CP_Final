import { Users, Building2, Briefcase, Award, TrendingUp } from 'lucide-react';
import StatsCard from '../../components/StatsCard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { mockStudents, mockCompanies, mockJobs, mockOffers, mockApplications } from '../../data/mockData';

const AdminDashboard = () => {
  const totalStudents = mockStudents.length;
  const placedStudents = mockStudents.filter(s => s.status === 'Placed').length;
  const activeCompanies = mockCompanies.filter(c => c.status === 'Active').length;
  const totalJobs = mockJobs.filter(j => j.status === 'Active').length;
  const totalOffers = mockOffers.length;
  const placementRate = ((placedStudents / totalStudents) * 100).toFixed(1);

  const branchData = [
    { branch: 'CSE', placed: 4, total: 4 },
    { branch: 'ECE', placed: 0, total: 2 },
    { branch: 'IT', placed: 0, total: 2 },
    { branch: 'ME', placed: 0, total: 2 },
  ];

  const offerDistribution = [
    { name: 'Computer Science', value: 4, color: '#1A237E' },
    { name: 'Electronics', value: 0, color: '#FFB300' },
    { name: 'Information Tech', value: 0, color: '#2E7D32' },
    { name: 'Mechanical', value: 0, color: '#F57C00' },
  ];

  const recentActivities = [
    { id: 1, type: 'offer', message: 'Aditya Gupta received offer from SecureNet Systems', time: '2 hours ago' },
    { id: 2, type: 'interview', message: '5 interviews scheduled for CloudTech Solutions', time: '5 hours ago' },
    { id: 3, type: 'application', message: '12 new applications received', time: '1 day ago' },
    { id: 4, type: 'company', message: 'DataDriven Analytics registered for campus recruitment', time: '2 days ago' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-gray-900 mb-2">
          Placement Dashboard
        </h1>
        <p className="text-gray-600">Overview of campus placement activities</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <StatsCard
          icon={Users}
          label="Registered Students"
          value={totalStudents}
          color="primary"
        />
        <StatsCard
          icon={Building2}
          label="Active Companies"
          value={activeCompanies}
          color="accent"
        />
        <StatsCard
          icon={Briefcase}
          label="Active Jobs"
          value={totalJobs}
          color="success"
        />
        <StatsCard
          icon={Award}
          label="Total Offers"
          value={totalOffers}
          color="primary"
        />
        <StatsCard
          icon={TrendingUp}
          label="Placement Rate"
          value={`${placementRate}%`}
          color="success"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h2 className="text-lg font-heading font-semibold mb-4">Branch-wise Placement Stats</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={branchData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="branch" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="placed" fill="#2E7D32" name="Placed" />
              <Bar dataKey="total" fill="#1A237E" name="Total Students" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h2 className="text-lg font-heading font-semibold mb-4">Branch-wise Offer Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={offerDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => value > 0 ? `${name}: ${value}` : ''}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {offerDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h2 className="text-lg font-heading font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivities.map(activity => (
              <div key={activity.id} className="flex items-start gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  activity.type === 'offer' ? 'bg-success/10 text-success' :
                  activity.type === 'interview' ? 'bg-blue-100 text-blue-600' :
                  activity.type === 'application' ? 'bg-accent/10 text-accent' :
                  'bg-primary/10 text-primary'
                }`}>
                  {activity.type === 'offer' && <Award className="w-5 h-5" />}
                  {activity.type === 'interview' && <Briefcase className="w-5 h-5" />}
                  {activity.type === 'application' && <Users className="w-5 h-5" />}
                  {activity.type === 'company' && <Building2 className="w-5 h-5" />}
                </div>
                <div className="flex-1">
                  <p className="text-gray-900">{activity.message}</p>
                  <p className="text-sm text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h2 className="text-lg font-heading font-semibold mb-4">Quick Stats</h2>
          <div className="space-y-4">
            <div className="p-4 bg-primary/5 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Students In Process</p>
              <p className="text-2xl font-bold text-primary">
                {mockStudents.filter(s => s.status === 'In Process').length}
              </p>
            </div>
            <div className="p-4 bg-success/5 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Total Applications</p>
              <p className="text-2xl font-bold text-success">{mockApplications.length}</p>
            </div>
            <div className="p-4 bg-accent/5 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Avg CTC</p>
              <p className="text-2xl font-bold text-amber-700">
                {(mockOffers.reduce((sum, o) => sum + o.ctc, 0) / mockOffers.length).toFixed(1)} LPA
              </p>
            </div>
            <div className="p-4 bg-error/5 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Unplaced Students</p>
              <p className="text-2xl font-bold text-error">
                {mockStudents.filter(s => s.status === 'Unplaced').length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
