import { useState } from 'react';
import { ListFilter as Filter, Search, X } from 'lucide-react';
import JobCard from '../../components/JobCard';
import Modal from '../../components/Modal';
import { mockJobs } from '../../data/mockData';

const BrowseJobs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [filters, setFilters] = useState({
    minCTC: '',
    maxCTC: '',
    location: '',
    minCGPA: '',
    status: 'Active'
  });

  const handleApply = (job) => {
    setSelectedJob(job);
  };

  const confirmApply = () => {
    alert(`Application submitted for ${selectedJob.title} at ${selectedJob.companyName}`);
    setSelectedJob(null);
  };

  const filteredJobs = mockJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.companyName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !filters.status || job.status === filters.status;
    const matchesMinCTC = !filters.minCTC || job.ctc >= parseFloat(filters.minCTC);
    const matchesMaxCTC = !filters.maxCTC || job.ctc <= parseFloat(filters.maxCTC);
    const matchesLocation = !filters.location || job.location.toLowerCase().includes(filters.location.toLowerCase());
    const matchesCGPA = !filters.minCGPA || job.minCGPA <= parseFloat(filters.minCGPA);

    return matchesSearch && matchesStatus && matchesMinCTC && matchesMaxCTC && matchesLocation && matchesCGPA;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-gray-900 mb-2">Browse Jobs</h1>
        <p className="text-gray-600">Explore available job opportunities</p>
      </div>

      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by job title or company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <Filter className="w-5 h-5" />
            Filters
          </button>
        </div>

        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Min CTC (LPA)</label>
                <input
                  type="number"
                  value={filters.minCTC}
                  onChange={(e) => setFilters({ ...filters, minCTC: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  placeholder="e.g., 10"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Max CTC (LPA)</label>
                <input
                  type="number"
                  value={filters.maxCTC}
                  onChange={(e) => setFilters({ ...filters, maxCTC: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  placeholder="e.g., 20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  value={filters.location}
                  onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  placeholder="e.g., Bangalore"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your CGPA</label>
                <input
                  type="number"
                  step="0.1"
                  value={filters.minCGPA}
                  onChange={(e) => setFilters({ ...filters, minCGPA: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  placeholder="e.g., 8.5"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={filters.status}
                  onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                >
                  <option value="">All</option>
                  <option value="Active">Active</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setFilters({ minCTC: '', maxCTC: '', location: '', minCGPA: '', status: 'Active' })}
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}
      </div>

      <div>
        <p className="text-sm text-gray-600 mb-4">
          Showing {filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''}
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredJobs.map(job => (
            <JobCard key={job.id} job={job} onApply={handleApply} />
          ))}
        </div>
      </div>

      <Modal
        isOpen={!!selectedJob}
        onClose={() => setSelectedJob(null)}
        title="Confirm Application"
      >
        {selectedJob && (
          <div>
            <p className="text-gray-600 mb-4">
              Are you sure you want to apply for the following position?
            </p>
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="font-semibold text-lg mb-2">{selectedJob.title}</h3>
              <p className="text-primary font-medium mb-2">{selectedJob.companyName}</p>
              <div className="text-sm text-gray-600 space-y-1">
                <p>CTC: {selectedJob.ctc} LPA</p>
                <p>Location: {selectedJob.location}</p>
                <p>Minimum CGPA: {selectedJob.minCGPA}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setSelectedJob(null)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmApply}
                className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
              >
                Confirm Application
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default BrowseJobs;
