import { useState } from "react";
import { Activity, AlertCircle, CheckCircle, Clock, Database, FileText, Settings, TrendingUp } from "lucide-react";

// Generic dummy data generator for different agent types
const generateAgentData = (agentType) => {
  const baseData = {
    "Test Execution Agent": {
      icon: Activity,
      color: "blue",
      metrics: [
        { label: "Tests Executed", value: "156", trend: "+12%" },
        { label: "Success Rate", value: "94.2%", trend: "+2.1%" },
        { label: "Avg Execution Time", value: "2.3s", trend: "-0.5s" },
        { label: "Environment Health", value: "Good", trend: "Stable" }
      ],
      activities: [
        { type: "success", message: "Executed payment flow test suite - 45 tests passed", time: "2 minutes ago" },
        { type: "warning", message: "Login test failed - retrying with different credentials", time: "8 minutes ago" },
        { type: "success", message: "API integration tests completed successfully", time: "15 minutes ago" },
        { type: "info", message: "Starting mobile app regression testing", time: "23 minutes ago" }
      ]
    },
    "Performance Monitor Agent": {
      icon: TrendingUp,
      color: "green",
      metrics: [
        { label: "Response Time", value: "1.2s", trend: "-0.3s" },
        { label: "Throughput", value: "450 req/s", trend: "+50 req/s" },
        { label: "Error Rate", value: "0.12%", trend: "-0.05%" },
        { label: "CPU Usage", value: "67%", trend: "+5%" }
      ],
      activities: [
        { type: "success", message: "Performance baseline established for checkout flow", time: "5 minutes ago" },
        { type: "warning", message: "High memory usage detected in search module", time: "12 minutes ago" },
        { type: "info", message: "Load testing initiated for 1000 concurrent users", time: "18 minutes ago" },
        { type: "success", message: "Database query optimization completed", time: "25 minutes ago" }
      ]
    },
    "Bug Detector Agent": {
      icon: AlertCircle,
      color: "red",
      metrics: [
        { label: "Bugs Detected", value: "23", trend: "+7" },
        { label: "Critical Issues", value: "3", trend: "+1" },
        { label: "False Positives", value: "5.2%", trend: "-1.1%" },
        { label: "Resolution Time", value: "4.5h", trend: "-0.8h" }
      ],
      activities: [
        { type: "error", message: "Critical SQL injection vulnerability found in user login", time: "1 minute ago" },
        { type: "warning", message: "XSS vulnerability detected in comment section", time: "7 minutes ago" },
        { type: "info", message: "Scanning shopping cart module for security issues", time: "14 minutes ago" },
        { type: "success", message: "Memory leak issue resolved in payment processor", time: "22 minutes ago" }
      ]
    },
    "Environment Setup Agent": {
      icon: Settings,
      color: "purple",
      metrics: [
        { label: "Environments", value: "8", trend: "+2" },
        { label: "Deployment Success", value: "98.5%", trend: "+1.2%" },
        { label: "Avg Setup Time", value: "4.2min", trend: "-1.1min" },
        { label: "Resource Usage", value: "72%", trend: "+8%" }
      ],
      activities: [
        { type: "success", message: "Staging environment deployed successfully", time: "3 minutes ago" },
        { type: "info", message: "Configuring test database for regression testing", time: "11 minutes ago" },
        { type: "warning", message: "Docker container startup taking longer than expected", time: "17 minutes ago" },
        { type: "success", message: "Load balancer configuration updated", time: "24 minutes ago" }
      ]
    },
    "Data Validation Agent": {
      icon: Database,
      color: "indigo",
      metrics: [
        { label: "Records Validated", value: "15,432", trend: "+2,341" },
        { label: "Data Quality", value: "96.8%", trend: "+1.4%" },
        { label: "Schema Violations", value: "12", trend: "-5" },
        { label: "Processing Speed", value: "2.1k/s", trend: "+0.3k/s" }
      ],
      activities: [
        { type: "success", message: "Customer data validation completed - 15,432 records processed", time: "4 minutes ago" },
        { type: "warning", message: "Duplicate entries found in product catalog", time: "9 minutes ago" },
        { type: "info", message: "Running data integrity checks on order history", time: "16 minutes ago" },
        { type: "success", message: "Database schema validation passed", time: "21 minutes ago" }
      ]
    },
    "Reporting Agent": {
      icon: FileText,
      color: "orange",
      metrics: [
        { label: "Reports Generated", value: "47", trend: "+12" },
        { label: "Data Coverage", value: "89.3%", trend: "+4.2%" },
        { label: "Export Success", value: "100%", trend: "0%" },
        { label: "Avg Generation Time", value: "1.8s", trend: "-0.4s" }
      ],
      activities: [
        { type: "success", message: "Weekly test summary report generated successfully", time: "6 minutes ago" },
        { type: "info", message: "Compiling performance metrics for dashboard", time: "13 minutes ago" },
        { type: "success", message: "Bug report exported to Excel format", time: "19 minutes ago" },
        { type: "info", message: "Generating trend analysis for past 30 days", time: "26 minutes ago" }
      ]
    }
  };

  return baseData[agentType] || baseData["Test Execution Agent"];
};

function GenericAgentOutput({ agentName, onClose }) {
  const [activeTab, setActiveTab] = useState("overview");
  const agentData = generateAgentData(agentName);

  const tabs = [
    { id: "overview", label: "Overview", icon: agentData.icon },
    { id: "metrics", label: "Metrics", icon: TrendingUp },
    { id: "activity", label: "Activity Log", icon: Clock },
  ];

  const getIconColor = (type) => {
    switch (type) {
      case "success": return "text-green-600";
      case "warning": return "text-yellow-600";
      case "error": return "text-red-600";
      case "info": return "text-blue-600";
      default: return "text-gray-600";
    }
  };

  const getStatusIcon = (type) => {
    switch (type) {
      case "success": return CheckCircle;
      case "warning": return AlertCircle;
      case "error": return AlertCircle;
      case "info": return Activity;
      default: return Activity;
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {agentData.metrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{metric.label}</p>
                <p className={`text-2xl font-bold text-${agentData.color}-600`}>{metric.value}</p>
                <p className="text-xs text-gray-500">{metric.trend}</p>
              </div>
              <agentData.icon className={`h-8 w-8 text-${agentData.color}-600`} />
            </div>
          </div>
        ))}
      </div>

      {/* Status Summary */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{agentName} Status</h3>
        <div className={`p-4 bg-${agentData.color}-50 rounded-lg border border-${agentData.color}-200`}>
          <div className="flex items-center space-x-2">
            <CheckCircle className={`h-5 w-5 text-${agentData.color}-600`} />
            <span className={`font-medium text-${agentData.color}-900`}>Agent is running optimally</span>
          </div>
          <p className={`text-sm text-${agentData.color}-700 mt-1`}>
            All systems are operational and performing within expected parameters
          </p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {agentData.activities.slice(0, 3).map((activity, index) => {
            const StatusIcon = getStatusIcon(activity.type);
            return (
              <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <StatusIcon className={`h-5 w-5 ${getIconColor(activity.type)} mt-0.5`} />
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{activity.message}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderMetrics = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Detailed Metrics</h3>
      
      {agentData.metrics.map((metric, index) => (
        <div key={index} className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium text-gray-900">{metric.label}</h4>
            <span className={`text-2xl font-bold text-${agentData.color}-600`}>{metric.value}</span>
          </div>
          
          <div className="mb-4">
            <div className={`bg-${agentData.color}-200 rounded-full h-2`}>
              <div 
                className={`bg-${agentData.color}-600 h-2 rounded-full transition-all duration-500`}
                style={{ width: `${Math.random() * 80 + 20}%` }}
              ></div>
            </div>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Trend: {metric.trend}</span>
            <span className={`text-${agentData.color}-600 font-medium`}>
              {Math.random() > 0.5 ? 'Improving' : 'Stable'}
            </span>
          </div>
        </div>
      ))}
    </div>
  );

  const renderActivity = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Activity Log</h3>
      
      {agentData.activities.map((activity, index) => {
        const StatusIcon = getStatusIcon(activity.type);
        return (
          <div key={index} className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-start space-x-3">
              <StatusIcon className={`h-5 w-5 ${getIconColor(activity.type)} mt-0.5 flex-shrink-0`} />
              <div className="flex-1">
                <p className="text-sm text-gray-900 mb-1">{activity.message}</p>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-500">{activity.time}</p>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    activity.type === 'success' ? 'bg-green-100 text-green-800' :
                    activity.type === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                    activity.type === 'error' ? 'bg-red-100 text-red-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {activity.type.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return renderOverview();
      case "metrics":
        return renderMetrics();
      case "activity":
        return renderActivity();
      default:
        return renderOverview();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className={`px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-${agentData.color}-500 to-${agentData.color}-600`}>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white">{agentName} Output</h2>
              <p className={`text-${agentData.color}-100 text-sm`}>Agent performance and activity summary</p>
            </div>
            <button
              onClick={onClose}
              className={`text-white hover:text-${agentData.color}-200 transition-colors`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-6 py-3 border-b border-gray-200 bg-gray-50">
          <div className="flex space-x-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 pb-2 text-sm font-medium transition-all relative ${
                  activeTab === tab.id
                    ? `text-${agentData.color}-600 border-b-2 border-${agentData.color}-600`
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default GenericAgentOutput;