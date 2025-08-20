const getProgressBarColor = (loadPercentage) => {
  if (loadPercentage < 40) return "bg-red-500";
  if (loadPercentage <= 70) return "bg-orange-500";
  return "bg-green-500";
};

const getStatusDotColor = (status) => {
  switch (status) {
    case "healthy":
      return "bg-green-500";
    case "warning":
      return "bg-orange-500";
    case "critical":
      return "bg-red-500";
    default:
      return "bg-blue-500";
  }
};

function AgentHealthCard({ agent }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-all duration-200 hover:scale-[1.02]">
      {/* Agent Name and Status */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-900">{agent.name}</h3>
        <div className={`w-3 h-3 rounded-full ${getStatusDotColor(agent.status)}`}></div>
      </div>

      {/* Health Percentage */}
      <div className="mb-4">
        <div className="text-2xl font-bold text-blue-600 mb-1">{agent.health}%</div>
        <div className="text-xs text-gray-500 font-medium">Health</div>
      </div>

      {/* Load Section */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs text-gray-500 font-medium">Load</span>
          <span className="text-xs font-semibold text-gray-700">{agent.load}%</span>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className={`h-2.5 rounded-full transition-all duration-500 ${getProgressBarColor(agent.load)}`}
            style={{ width: `${agent.load}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default AgentHealthCard;