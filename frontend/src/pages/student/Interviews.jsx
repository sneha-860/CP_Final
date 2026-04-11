import { useAuth } from '../../context/AuthContext';
import { mockInterviews } from '../../data/mockData';
import StatusBadge from '../../components/StatusBadge';
import EmptyState from '../../components/EmptyState';
import { Calendar, MapPin, Video } from 'lucide-react';

const InterviewSchedule = () => {
  const { user } = useAuth();
  const myInterviews = mockInterviews.filter(int => int.studentId === user?.id);

  const upcomingInterviews = myInterviews.filter(i => i.status === 'Scheduled').sort((a, b) => new Date(a.date) - new Date(b.date));
  const pastInterviews = myInterviews.filter(i => i.status === 'Completed').sort((a, b) => new Date(b.date) - new Date(a.date));

  const InterviewCard = ({ interview, past = false }) => (
    <div className={`bg-white border-2 rounded-lg p-6 ${past ? 'border-gray-200' : 'border-primary/20'}`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-heading font-semibold text-lg text-gray-900">{interview.companyName}</h3>
          <p className="text-gray-600">{interview.role}</p>
        </div>
        <StatusBadge status={interview.round} />
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-3 text-gray-700">
          <Calendar className="w-5 h-5 text-gray-400" />
          <span>{new Date(interview.date).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center gap-3 text-gray-700">
          <span>Time: {interview.time}</span>
        </div>
        <div className="flex items-center gap-3 text-gray-700">
          {interview.mode === 'Online' ? (
            <>
              <Video className="w-5 h-5 text-gray-400" />
              <span className="font-medium text-blue-600">{interview.mode}</span>
            </>
          ) : (
            <>
              <MapPin className="w-5 h-5 text-gray-400" />
              <span>{interview.venue}</span>
            </>
          )}
        </div>
      </div>

      {!past && interview.link && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-xs text-blue-600 mb-2">Meeting Link</p>
          <a href={interview.link} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline break-all">
            {interview.link}
          </a>
        </div>
      )}

      {!past && (
        <div className="flex gap-2">
          <button className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium">
            Reschedule
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-gray-900 mb-2">Interview Schedule</h1>
        <p className="text-gray-600">View your upcoming and past interviews</p>
      </div>

      {upcomingInterviews.length > 0 && (
        <div>
          <h2 className="text-lg font-heading font-semibold mb-4 text-gray-900">Upcoming Interviews</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {upcomingInterviews.map(interview => (
              <InterviewCard key={interview.id} interview={interview} />
            ))}
          </div>
        </div>
      )}

      {pastInterviews.length > 0 && (
        <div>
          <h2 className="text-lg font-heading font-semibold mb-4 text-gray-900">Past Interviews</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {pastInterviews.map(interview => (
              <InterviewCard key={interview.id} interview={interview} past={true} />
            ))}
          </div>
        </div>
      )}

      {myInterviews.length === 0 && (
        <div className="bg-white rounded-lg border border-gray-200">
          <EmptyState
            icon={Calendar}
            title="No Interviews Scheduled"
            message="Once you are shortlisted, your interviews will appear here"
          />
        </div>
      )}
    </div>
  );
};

export default InterviewSchedule;