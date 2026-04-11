import { useState } from 'react';
import { Plus, Eye, CreditCard as Edit2 } from 'lucide-react';
import { mockCompanies } from '../../data/mockData';
import StatusBadge from '../../components/StatusBadge';
import Modal from '../../components/Modal';

const ManageCompanies = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);

  const CompanyCard = ({ company }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
            <img src={company.logo} alt={company.name} className="w-12 h-12 object-contain" />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-lg text-gray-900">{company.name}</h3>
            <p className="text-sm text-gray-600">{company.industry}</p>
          </div>
        </div>
        <StatusBadge status={company.status} />
      </div>

      <div className="space-y-2 text-sm mb-4">
        <div className="flex justify-between">
          <span className="text-gray-600">Visit Date:</span>
          <span className="font-medium">{new Date(company.visitDate).toLocaleDateString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">CTC Range:</span>
          <span className="font-medium">{company.ctcRange}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Roles:</span>
          <span className="font-medium">{company.rolesOffered.length}</span>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setSelectedCompany(company)}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2"
        >
          <Eye className="w-4 h-4" />
          View
        </button>
        <button className="flex-1 px-3 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 flex items-center justify-center gap-2">
          <Edit2 className="w-4 h-4" />
          Edit
        </button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-gray-900 mb-2">Manage Companies</h1>
          <p className="text-gray-600">View and manage recruiting companies</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
        >
          <Plus className="w-4 h-4" />
          Add New Company
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Total Companies', value: mockCompanies.length, color: 'bg-primary' },
          { label: 'Active', value: mockCompanies.filter(c => c.status === 'Active').length, color: 'bg-success' },
          { label: 'Upcoming', value: mockCompanies.filter(c => c.status === 'Upcoming').length, color: 'bg-accent' },
        ].map(stat => (
          <div key={stat.label} className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mockCompanies.map(company => (
          <CompanyCard key={company.id} company={company} />
        ))}
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Add New Company"
      >
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
              <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
              <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">HR Name</label>
              <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">HR Email</label>
              <input type="email" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Visit Date</label>
              <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">CTC Range</label>
              <input type="text" placeholder="e.g., 10-15 LPA" className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4">
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
              Add Company
            </button>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={!!selectedCompany}
        onClose={() => setSelectedCompany(null)}
        title="Company Details"
      >
        {selectedCompany && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Company Name</p>
                <p className="font-semibold">{selectedCompany.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Industry</p>
                <p className="font-semibold">{selectedCompany.industry}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">HR Name</p>
                <p className="font-semibold">{selectedCompany.hrName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">HR Email</p>
                <p className="font-semibold">{selectedCompany.hrEmail}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Visit Date</p>
                <p className="font-semibold">{new Date(selectedCompany.visitDate).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Status</p>
                <StatusBadge status={selectedCompany.status} />
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2">Description</p>
              <p className="text-gray-900">{selectedCompany.description}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2">Roles Offered</p>
              <div className="flex flex-wrap gap-2">
                {selectedCompany.rolesOffered.map((role, idx) => (
                  <span key={idx} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                    {role}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ManageCompanies;
