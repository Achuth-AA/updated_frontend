import { useState } from "react";
import { X, AlertTriangle, Bug, Shield, Search } from "lucide-react";

const BugDetectorAgentOutput = ({ agent, onClose }) => {
  const [activeTab, setActiveTab] = useState("detected");
  
  const bugData = {
    total: 23,
    critical: 3,
    high: 8,
    medium: 9,
    low: 3,
    resolved: 15,
    falsePositives: "5.2%"
  };

  const detectedBugs = [
    { id: "BUG-001", title: "SQL Injection in Login Form", severity: "critical", status: "open", component: "auth/login.js", line: 45 },
    { id: "BUG-002", title: "XSS Vulnerability in Comments", severity: "high", status: "open", component: "comments/form.jsx", line: 128 },
    { id: "BUG-003", title: "Memory Leak in Data Processing", severity: "medium", status: "investigating", component: "utils/processor.js", line: 203 },
    { id: "BUG-004", title: "Buffer Overflow Risk", severity: "high", status: "resolved", component: "api/upload.js", line: 67 },
    { id: "BUG-005", title: "Unhandled Promise Rejection", severity: "low", status: "open", component: "services/api.js", line: 156 }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "critical": return "text-red-700 bg-red-100 border-red-200";
      case "high": return "text-orange-700 bg-orange-100 border-orange-200";
      case "medium": return "text-yellow-700 bg-yellow-100 border-yellow-200";
      case "low": return "text-blue-700 bg-blue-100 border-blue-200";
      default: return "text-gray-700 bg-gray-100 border-gray-200";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "resolved": return "text-green-700 bg-green-100";
      case "investigating": return "text-blue-700 bg-blue-100";
      case "open": return "text-red-700 bg-red-100";
      default: return "text-gray-700 bg-gray-100";
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 bg-red-600">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Bug className="h-6 w-6 text-white" />
              <div>
                <h2 className="text-xl font-semibold text-white">Bug Detector Agent</h2>
                <p className="text-red-100 text-sm">Automated vulnerability and bug detection</p>
              </div>
            </div>
            <button onClick={onClose} className="text-white hover:text-red-200">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-6 py-3 border-b border-gray-200 bg-gray-50">
          <div className="flex space-x-6">
            {["detected", "analysis", "reports"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-2 text-sm font-medium capitalize transition-all ${
                  activeTab === tab
                    ? "text-red-600 border-b-2 border-red-600"
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
          {activeTab === "detected" && (
            <div className="space-y-6">
              {/* Summary */}
              <div className="grid grid-cols-5 gap-4">
                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <div className="text-2xl font-bold text-red-600">{bugData.critical}</div>
                  <div className="text-sm text-red-600">Critical</div>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                  <div className="text-2xl font-bold text-orange-600">{bugData.high}</div>
                  <div className="text-sm text-orange-600">High</div>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <div className="text-2xl font-bold text-yellow-600">{bugData.medium}</div>
                  <div className="text-sm text-yellow-600">Medium</div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="text-2xl font-bold text-blue-600">{bugData.low}</div>
                  <div className="text-sm text-blue-600">Low</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <div className="text-2xl font-bold text-green-600">{bugData.resolved}</div>
                  <div className="text-sm text-green-600">Resolved</div>
                </div>
              </div>

              {/* Bug List */}
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold flex items-center space-x-2">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                    <span>Detected Bugs & Vulnerabilities</span>
                  </h3>
                </div>
                <div className="divide-y divide-gray-200">
                  {detectedBugs.map((bug) => (
                    <div key={bug.id} className="p-6 hover:bg-gray-50">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <span className="font-mono text-sm text-gray-600">{bug.id}</span>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getSeverityColor(bug.severity)}`}>
                              {bug.severity.toUpperCase()}
                            </span>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(bug.status)}`}>
                              {bug.status}
                            </span>
                          </div>
                          <h4 className="font-semibold text-gray-900 mb-2">{bug.title}</h4>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span>📁 {bug.component}</span>
                            <span>📍 Line {bug.line}</span>
                          </div>
                        </div>
                        <button className="text-gray-400 hover:text-gray-600">
                          <Search className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "analysis" && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Security Analysis</h3>
              
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="font-medium text-gray-900 mb-4">Vulnerability Assessment</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Code Coverage</span>
                    <span className="font-semibold">87.3%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: "87.3%" }}></div>
                  </div>
                </div>
                
                <div className="mt-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Security Score</span>
                    <span className="font-semibold text-yellow-600">B+</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "75%" }}></div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="font-medium text-gray-900 mb-4">Risk Categories</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                    <span className="flex items-center space-x-2">
                      <Shield className="h-4 w-4 text-red-600" />
                      <span>Injection Attacks</span>
                    </span>
                    <span className="font-semibold text-red-600">High Risk</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <span className="flex items-center space-x-2">
                      <Shield className="h-4 w-4 text-yellow-600" />
                      <span>Cross-Site Scripting</span>
                    </span>
                    <span className="font-semibold text-yellow-600">Medium Risk</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <span className="flex items-center space-x-2">
                      <Shield className="h-4 w-4 text-green-600" />
                      <span>Authentication</span>
                    </span>
                    <span className="font-semibold text-green-600">Low Risk</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "reports" && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Security Reports</h3>
              
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="font-medium text-gray-900 mb-4">Generated Reports</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div>
                      <div className="font-medium">Security Audit Report</div>
                      <div className="text-sm text-gray-600">Generated 2 hours ago</div>
                    </div>
                    <button className="text-blue-600 hover:text-blue-800">Download</button>
                  </div>
                  <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div>
                      <div className="font-medium">Vulnerability Summary</div>
                      <div className="text-sm text-gray-600">Generated 1 day ago</div>
                    </div>
                    <button className="text-blue-600 hover:text-blue-800">Download</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BugDetectorAgentOutput;