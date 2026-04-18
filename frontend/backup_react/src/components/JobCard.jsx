import { Star, MapPin, Clock, DollarSign, Calendar } from 'lucide-react';

const JobCard = ({ job, onApply, showApplyButton = true }) => {
  const getCompanyLogo = (companyName) => {
    // Generate initials from company name
    const initials = companyName.split(' ').map(word => word.charAt(0)).join('').toUpperCase().slice(0, 2);
    return initials;
  };

  const getDeadlineColor = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const daysLeft = Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24));
    
    if (daysLeft <= 3) return 'bg-error/10 text-error border-error/20';
    if (daysLeft <= 7) return 'bg-secondary/10 text-secondary border-secondary/20';
    return 'bg-success/10 text-success border-success/20';
  };

  const getDeadlineText = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const daysLeft = Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24));
    
    if (daysLeft < 0) return 'Expired';
    if (daysLeft === 0) return 'Today';
    if (daysLeft === 1) return 'Tomorrow';
    return `${daysLeft} days left`;
  };

  return (
    <div className="stat-card group hover:shadow-card-hover animate-fade-in">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 bg-gradient-to-br from-primary to-purple-600 rounded-xl flex items-center justify-center shadow-md">
            <span className="text-white font-bold text-lg">{getCompanyLogo(job.companyName)}</span>
          </div>
          <div className="flex-1">
            <h3 className="font-heading font-semibold text-lg text-text-primary mb-1 group-hover:text-primary transition-colors">
              {job.title}
            </h3>
            <p className="text-primary font-medium text-sm">{job.companyName}</p>
          </div>
        </div>
        <button className="text-text-muted hover:text-secondary transition-colors">
          <Star className="w-6 h-6" />
        </button>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-text-muted">
            <DollarSign className="w-4 h-4" />
            <span>CTC:</span>
          </div>
          <span className="font-semibold text-success">{job.ctc} LPA</span>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-text-muted">
            <MapPin className="w-4 h-4" />
            <span>Location:</span>
          </div>
          <span className="font-medium text-text-primary">{job.location}</span>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-text-muted">
            <span className="text-xs">🎓</span>
            <span>Min CGPA:</span>
          </div>
          <span className="font-medium text-text-primary">{job.minCGPA}</span>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-text-muted">
            <Calendar className="w-4 h-4" />
            <span>Deadline:</span>
          </div>
          <span className={`status-badge ${getDeadlineColor(job.applicationDeadline)}`}>
            {getDeadlineText(job.applicationDeadline)}
          </span>
        </div>
      </div>

      <div className="mb-4 p-3 bg-background rounded-lg border border-gray-100">
        <p className="text-xs font-semibold text-text-muted mb-2">Eligible Branches:</p>
        <div className="flex flex-wrap gap-1">
          {job.eligibleBranches.map((branch, idx) => (
            <span key={idx} className="px-2 py-1 bg-primary/5 text-primary border border-primary/20 rounded-md text-xs font-medium">
              {branch}
            </span>
          ))}
        </div>
      </div>

      {showApplyButton && (
        <button
          onClick={() => onApply && onApply(job)}
          className="btn-primary w-full group"
        >
          Apply Now
        </button>
      )}
    </div>
  );
};

export default JobCard;