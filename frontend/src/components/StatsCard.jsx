import { ArrowUpRight, ArrowDownRight, TrendingUp } from 'lucide-react';

const StatsCard = ({ icon: Icon, label, value, trend, color = 'primary' }) => {
  const colorClasses = {
    primary: 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white',
    secondary: 'bg-gradient-to-br from-amber-500 to-orange-600 text-white',
    success: 'bg-gradient-to-br from-emerald-500 to-green-600 text-white',
    error: 'bg-gradient-to-br from-red-500 to-red-600 text-white',
    info: 'bg-gradient-to-br from-blue-500 to-blue-600 text-white',
  };

  const borderClasses = {
    primary: 'border-l-4 border-indigo-500',
    secondary: 'border-l-4 border-amber-500', 
    success: 'border-l-4 border-emerald-500',
    error: 'border-l-4 border-red-500',
    info: 'border-l-4 border-blue-500',
  };

  return (
    <div className={`bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in ${borderClasses[color]}`}>
      <div className="flex items-center justify-between mb-4">
        <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${colorClasses[color]} shadow-lg`}>
          <Icon className="w-7 h-7" />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-sm font-semibold ${trend > 0 ? 'text-emerald-600' : 'text-red-600'} bg-${trend > 0 ? 'emerald' : 'red'}-50 px-2 py-1 rounded-lg`}>
            {trend > 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
            {Math.abs(trend)}%
          </div>
        )}
      </div>
      <p className="text-sm text-gray-600 mb-2 font-medium">{label}</p>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
    </div>
  );
};

export default StatsCard;