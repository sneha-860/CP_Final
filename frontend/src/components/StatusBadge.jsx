const StatusBadge = ({ status }) => {
  const getStatusStyles = (status) => {
    switch (status) {
      case 'Applied':
        return 'bg-blue-100 text-blue-700';
      case 'Shortlisted':
        return 'bg-accent/10 text-accent';
      case 'Interview':
        return 'bg-primary/10 text-primary';
      case 'Offer':
        return 'bg-success/10 text-success';
      case 'Rejected':
        return 'bg-error/10 text-error';
      case 'Placed':
        return 'bg-success/10 text-success';
      case 'Unplaced':
        return 'bg-error/10 text-error';
      case 'In Process':
        return 'bg-accent/10 text-accent';
      case 'Active':
        return 'bg-success/10 text-success';
      case 'Completed':
        return 'bg-gray-100 text-gray-700';
      case 'Upcoming':
        return 'bg-blue-100 text-blue-700';
      case 'Accepted':
        return 'bg-success/10 text-success';
      case 'Pending':
        return 'bg-accent/10 text-accent';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyles(status)}`}>
      {status}
    </span>
  );
};

export default StatusBadge;