import { useState } from "react";
import { X, TrendingUp, Zap, Clock, Activity } from "lucide-react";

const PerformanceMonitorAgentOutput = ({ agent, onClose }) => {
  const [activeTab, setActiveTab] = useState("metrics");
  
  const performanceData = {
    responseTime: "1.2s",
    throughput: "450 req/s",
    errorRate: "0.12%",
    cpuUsage: "67%",
    memoryUsage: "82%",
    uptime: "99.98%"
  };

  const performanceHistory = [
    { time: "10:00", responseTime: 1.1, throughput: 420, errorRate: 0.1 },
    { time: "10:15", responseTime: 1.3, throughput: 445, errorRate: 0.15 },
    { time: "10:30", responseTime: 1.2, throughput: 450, errorRate: 0.12 },
    { time: "10:45", responseTime: 1.4, throughput: 435, errorRate: 0.18 },
    { time: "11:00", responseTime: 1.1, throughput: 460, errorRate: 0.09 }
  ];

  const alerts = [
    { type: "warning", message: "High memory usage detected in search module", time: "12 minutes ago", severity: "medium" },
    { type: "info", message: "Performance baseline established for checkout flow", time: "25 minutes ago", severity: "low" },
    { type: "error", message: "Response time spike detected", time: "45 minutes ago", severity: "high" },
    { type: "success", message: "Database query optimization completed", time: "1 hour ago", severity: "low" }
  ];

  const getAlertColor = (type) => {
    switch (type) {
      case "error": return "text-red-600 bg-red-100";
      case "warning": return "text-yellow-600 bg-yellow-100";
      case "success": return "text-green-600 bg-green-100";
      case "info": return "text-blue-600 bg-blue-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 bg-green-600">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <TrendingUp className="h-6 w-6 text-white" />
              <div>
                <h2 className="text-xl font-semibold text-white">Performance Monitor Agent</h2>
                <p className="text-green-100 text-sm">Real-time system performance monitoring</p>
              </div>
            </div>
            <button onClick={onClose} className="text-white hover:text-green-200">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-6 py-3 border-b border-gray-200 bg-gray-50">
          <div className="flex space-x-6">
            {["metrics", "trends", "alerts"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-2 text-sm font-medium capitalize transition-all ${
                  activeTab === tab
                    ? "text-green-600 border-b-2 border-green-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {activeTab === "metrics" && (
            <div className="space-y-6">
              {/* Key Metrics */}
              <div className="grid grid-cols-3 gap-6">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-lg text-white">
                  <div className="flex items-center space-x-3">
                    <Clock className="h-8 w-8" />
                    <div>
                      <div className="text-2xl font-bold">{performanceData.responseTime}</div>
                      <div className="text-blue-100">Response Time</div>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-lg text-white">
                  <div className="flex items-center space-x-3">
                    <Zap className="h-8 w-8" />
                    <div>
                      <div className="text-2xl font-bold">{performanceData.throughput}</div>
                      <div className="text-green-100">Throughput</div>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-lg text-white">
                  <div className="flex items-center space-x-3">
                    <Activity className="h-8 w-8" />
                    <div>
                      <div className="text-2xl font-bold">{performanceData.uptime}</div>
                      <div className="text-purple-100">Uptime</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* System Resources */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">System Resources</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>CPU Usage</span>
                      <span>{performanceData.cpuUsage}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: performanceData.cpuUsage }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Memory Usage</span>
                      <span>{performanceData.memoryUsage}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: performanceData.memoryUsage }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Error Rate</span>
                      <span>{performanceData.errorRate}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-red-600 h-2 rounded-full" style={{ width: "12%" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "trends" && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Performance Trends</h3>
              
              {/* Mock Chart */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="font-medium text-gray-900 mb-4">Response Time Over Time</h4>
                <div className="h-64 bg-gray-50 rounded-lg flex items-end justify-around p-4">
                  {performanceHistory.map((point, index) => (
                    <div key={index} className="flex flex-col items-center space-y-2">
                      <div 
                        className="bg-blue-500 rounded-t" 
                        style={{ 
                          height: `${point.responseTime * 50}px`,
                          width: "30px"
                        }}
                      ></div>
                      <span className="text-xs text-gray-600">{point.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Throughput Chart */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="font-medium text-gray-900 mb-4">Throughput Over Time</h4>
                <div className="h-64 bg-gray-50 rounded-lg flex items-end justify-around p-4">
                  {performanceHistory.map((point, index) => (
                    <div key={index} className="flex flex-col items-center space-y-2">
                      <div 
                        className="bg-green-500 rounded-t" 
                        style={{ 
                          height: `${(point.throughput / 500) * 200}px`,
                          width: "30px"
                        }}
                      ></div>
                      <span className="text-xs text-gray-600">{point.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "alerts" && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Performance Alerts</h3>
              
              {alerts.map((alert, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <div className={`px-2 py-1 text-xs font-medium rounded-full ${getAlertColor(alert.type)}`}>
                      {alert.type.toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-900 font-medium">{alert.message}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm text-gray-500">{alert.time}</span>
                        <span className={`text-xs px-2 py-1 rounded ${
                          alert.severity === 'high' ? 'bg-red-100 text-red-800' :
                          alert.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {alert.severity} priority
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PerformanceMonitorAgentOutput;