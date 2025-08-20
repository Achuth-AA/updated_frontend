import { useState } from "react";
import { X, Settings, Server, CheckCircle, AlertCircle } from "lucide-react";

const EnvironmentSetupAgentOutput = ({ agent, onClose }) => {
  const [activeTab, setActiveTab] = useState("environments");
  
  const environments = [
    { name: "Production", status: "active", health: "healthy", uptime: "99.9%", lastDeploy: "2 days ago" },
    { name: "Staging", status: "active", health: "healthy", uptime: "99.5%", lastDeploy: "3 hours ago" },
    { name: "Development", status: "active", health: "warning", uptime: "98.2%", lastDeploy: "1 hour ago" },
    { name: "Testing", status: "maintenance", health: "maintenance", uptime: "0%", lastDeploy: "1 week ago" }
  ];

  const deploymentHistory = [
    { id: "DEP-001", environment: "Staging", status: "success", duration: "4m 23s", time: "3 hours ago" },
    { id: "DEP-002", environment: "Development", status: "success", duration: "2m 15s", time: "1 hour ago" },
    { id: "DEP-003", environment: "Production", status: "success", duration: "6m 45s", time: "2 days ago" },
    { id: "DEP-004", environment: "Testing", status: "failed", duration: "1m 30s", time: "3 days ago" }
  ];

  const getHealthColor = (health) => {
    switch (health) {
      case "healthy": return "text-green-600 bg-green-100";
      case "warning": return "text-yellow-600 bg-yellow-100";
      case "error": return "text-red-600 bg-red-100";
      case "maintenance": return "text-gray-600 bg-gray-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-5xl max-h-[90vh] overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-purple-600">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Settings className="h-6 w-6 text-white" />
              <div>
                <h2 className="text-xl font-semibold text-white">Environment Setup Agent</h2>
                <p className="text-purple-100 text-sm">Environment management and deployment</p>
              </div>
            </div>
            <button onClick={onClose} className="text-white hover:text-purple-200">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="px-6 py-3 border-b border-gray-200 bg-gray-50">
          <div className="flex space-x-6">
            {["environments", "deployments", "logs"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-2 text-sm font-medium capitalize transition-all ${
                  activeTab === tab
                    ? "text-purple-600 border-b-2 border-purple-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {activeTab === "environments" && (
            <div className="space-y-4">
              {environments.map((env, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Server className="h-6 w-6 text-purple-600" />
                      <h3 className="text-lg font-semibold">{env.name}</h3>
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${getHealthColor(env.health)}`}>
                        {env.health}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">Uptime</div>
                      <div className="font-semibold">{env.uptime}</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Status:</span>
                      <span className="ml-2 font-medium">{env.status}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Last Deploy:</span>
                      <span className="ml-2 font-medium">{env.lastDeploy}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Health:</span>
                      <span className="ml-2 font-medium">{env.health}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "deployments" && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Deployment History</h3>
              {deploymentHistory.map((deploy) => (
                <div key={deploy.id} className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {deploy.status === 'success' ? 
                        <CheckCircle className="h-5 w-5 text-green-600" /> : 
                        <AlertCircle className="h-5 w-5 text-red-600" />
                      }
                      <div>
                        <div className="font-medium">{deploy.id} - {deploy.environment}</div>
                        <div className="text-sm text-gray-600">{deploy.time}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-sm font-medium ${
                        deploy.status === 'success' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {deploy.status.toUpperCase()}
                      </div>
                      <div className="text-xs text-gray-600">{deploy.duration}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "logs" && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Setup Logs</h3>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                <div>[2024-01-20 14:30:15] Environment setup initiated...</div>
                <div>[2024-01-20 14:30:16] Checking system requirements...</div>
                <div>[2024-01-20 14:30:17] Docker containers starting...</div>
                <div>[2024-01-20 14:30:20] Database connection established</div>
                <div>[2024-01-20 14:30:22] Load balancer configured</div>
                <div>[2024-01-20 14:30:25] Health checks passed</div>
                <div>[2024-01-20 14:30:26] Environment ready for deployment</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnvironmentSetupAgentOutput;