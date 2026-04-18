import { Award, Download, CircleCheck as CheckCircle, Clock, MapPin, Calendar, DollarSign } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { mockOffers } from '../../data/mockData';
import StatusBadge from '../../components/StatusBadge';
import EmptyState from '../../components/EmptyState';

const ResultsOffers = () => {
  const { user } = useAuth();
  const myOffers = mockOffers.filter(offer => offer.studentId === user?.id);

  const OfferCard = ({ offer }) => (
    <div className="bg-white border-2 border-success/20 rounded-lg p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
            <Award className="w-6 h-6 text-success" />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-xl text-gray-900">{offer.companyName}</h3>
            <p className="text-gray-600">{offer.role}</p>
          </div>
        </div>
        <StatusBadge status={offer.status} />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-primary/5 p-4 rounded-lg">
          <div className="flex items-center gap-2 text-primary mb-1">
            <DollarSign className="w-4 h-4" />
            <p className="text-sm font-medium">CTC</p>
          </div>
          <p className="text-2xl font-bold text-primary">{offer.ctc} LPA</p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 text-gray-600 mb-1">
            <Calendar className="w-4 h-4" />
            <p className="text-sm font-medium">Joining Date</p>
          </div>
          <p className="text-lg font-semibold text-gray-900">
            {new Date(offer.joiningDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-gray-700">
          <MapPin className="w-4 h-4 text-gray-400" />
          <span className="text-sm">Location: <span className="font-medium">{offer.location}</span></span>
        </div>
        <div className="flex items-center gap-2 text-gray-700">
          <Clock className="w-4 h-4 text-gray-400" />
          <span className="text-sm">Offer Received: <span className="font-medium">{new Date(offer.offerDate).toLocaleDateString()}</span></span>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg mb-4">
        <h4 className="font-semibold text-sm text-gray-900 mb-3">CTC Breakdown</h4>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-xs text-gray-600 mb-1">Base Salary</p>
            <p className="font-semibold text-gray-900">{offer.breakdown.base} LPA</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-1">Bonus</p>
            <p className="font-semibold text-gray-900">{offer.breakdown.bonus} LPA</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-1">Stocks/Other</p>
            <p className="font-semibold text-gray-900">{offer.breakdown.stocks} LPA</p>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 flex items-center justify-center gap-2">
          <Download className="w-4 h-4" />
          Download Letter
        </button>
        {offer.status === 'Pending' && (
          <button className="flex-1 px-4 py-2 bg-success text-white rounded-lg hover:bg-success/90 flex items-center justify-center gap-2">
            <CheckCircle className="w-4 h-4" />
            Accept Offer
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-gray-900 mb-2">Results & Offers</h1>
        <p className="text-gray-600">View and manage your job offers</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Offers</p>
              <p className="text-3xl font-bold text-gray-900">{myOffers.length}</p>
            </div>
            <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
              <Award className="w-6 h-6 text-success" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Accepted</p>
              <p className="text-3xl font-bold text-success">{myOffers.filter(o => o.status === 'Accepted').length}</p>
            </div>
            <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-success" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Highest CTC</p>
              <p className="text-3xl font-bold text-primary">
                {myOffers.length > 0 ? Math.max(...myOffers.map(o => o.ctc)) : 0} LPA
              </p>
            </div>
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-primary" />
            </div>
          </div>
        </div>
      </div>

      {myOffers.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {myOffers.map(offer => (
            <OfferCard key={offer.id} offer={offer} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200">
          <EmptyState
            icon={Award}
            title="No Offers Yet"
            message="You haven't received any job offers yet. Keep applying and attending interviews!"
          />
        </div>
      )}
    </div>
  );
};

export default ResultsOffers;
