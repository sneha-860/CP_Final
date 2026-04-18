import { useState } from 'react';
import { Plus } from 'lucide-react';
import Modal from '../../components/Modal';

const PostJob = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    skills: '',
    minCGPA: '',
    eligibleBranches: [],
    ctc: '',
    location: '',
    deadline: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Job posted successfully!');
    setFormData({
      title: '',
      description: '',
      skills: '',
      minCGPA: '',
      eligibleBranches: [],
      ctc: '',
      location: '',
      deadline: ''
    });
    setShowModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-gray-900 mb-2">Post a Job</h1>
          <p className="text-gray-600">Create a new job opening for your company</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
        >
          <Plus className="w-4 h-4" />
          Post New Job
        </button>
      </div>

      <div className="bg-white rounded-lg p-12 border border-gray-200 text-center">
        <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-heading font-semibold text-gray-900 mb-2">No Jobs Posted Yet</h3>
        <p className="text-gray-600 mb-6">Post your first job opening to start receiving applications</p>
        <button
          onClick={() => setShowModal(true)}
          className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
        >
          Post a Job
        </button>
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Post a New Job"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="e.g., Senior Software Engineer"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              rows="4"
              placeholder="Job description..."
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Required Skills</label>
              <input
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="React, Node.js, SQL"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Min CGPA</label>
              <input
                type="number"
                name="minCGPA"
                step="0.1"
                value={formData.minCGPA}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="7.5"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">CTC (LPA)</label>
              <input
                type="number"
                name="ctc"
                value={formData.ctc}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="12"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Bangalore"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Application Deadline</label>
              <input
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
            >
              Post Job
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

import { Briefcase } from 'lucide-react';
export default PostJob;