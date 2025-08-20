import { X, FileText, Download, BarChart, PieChart } from "lucide-react";

const ReportingAgentOutput = ({ onClose }) => {
  
  const reports = [
    { id: "RPT-001", name: "Weekly Test Summary", type: "PDF", size: "2.3 MB", generated: "2 hours ago", status: "ready" },
    { id: "RPT-002", name: "Bug Analysis Report", type: "Excel", size: "1.8 MB", generated: "5 hours ago", status: "ready" },
    { id: "RPT-003", name: "Performance Metrics", type: "PDF", size: "3.1 MB", generated: "1 day ago", status: "ready" },
    { id: "RPT-004", name: "Coverage Report", type: "HTML", size: "892 KB", generated: "2 days ago", status: "ready" },
    { id: "RPT-005", name: "Security Audit", type: "PDF", size: "4.2 MB", generated: "3 days ago", status: "archived" }
  ];

  const metrics = {
    reportsGenerated: 47,
    dataCoverage: "89.3%",
    exportSuccess: "100%",
    avgGenerationTime: "1.8s"
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "ready": return "text-green-600 bg-green-100";
      case "generating": return "text-blue-600 bg-blue-100";
      case "archived": return "text-gray-600 bg-gray-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const getFileIcon = (type) => {
    switch (type) {
      case "PDF": return "📄";
      case "Excel": return "📊";
      case "HTML": return "🌐";
      default: return "📄";
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-5xl max-h-[90vh] overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-orange-600">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FileText className="h-6 w-6 text-white" />
              <div>
                <h2 className="text-xl font-semibold text-white">Reporting Agent</h2>
                <p className="text-orange-100 text-sm">Automated report generation and analytics</p>
              </div>
            </div>
            <button onClick={onClose} className="text-white hover:text-orange-200">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="px-6 py-3 border-b border-gray-200 bg-gray-50">
          <div className="flex space-x-6">
            {["reports", "analytics", "schedule"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-2 text-sm font-medium capitalize transition-all ${
                  activeTab === tab
                    ? "text-orange-600 border-b-2 border-orange-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {activeTab === "reports" && (
            <div className="space-y-6">
              {/* Metrics */}
              <div className="grid grid-cols-4 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{metrics.reportsGenerated}</div>
                  <div className="text-sm text-blue-600">Reports Generated</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{metrics.dataCoverage}</div>
                  <div className="text-sm text-green-600">Data Coverage</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{metrics.exportSuccess}</div>
                  <div className="text-sm text-purple-600">Export Success</div>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">{metrics.avgGenerationTime}</div>
                  <div className="text-sm text-orange-600">Avg Gen Time</div>
                </div>
              </div>

              {/* Reports List */}
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold">Generated Reports</h3>
                </div>
                <div className="divide-y divide-gray-200">
                  {reports.map((report) => (
                    <div key={report.id} className="p-6 hover:bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <span className="text-2xl">{getFileIcon(report.type)}</span>
                          <div>
                            <div className="font-medium text-gray-900">{report.name}</div>
                            <div className="text-sm text-gray-600">
                              {report.type} • {report.size} • {report.generated}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(report.status)}`}>
                            {report.status}
                          </span>
                          <button className="text-blue-600 hover:text-blue-800 flex items-center space-x-1">
                            <Download className="h-4 w-4" />
                            <span className="text-sm">Download</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "analytics" && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Report Analytics</h3>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <BarChart className="h-5 w-5 text-blue-600" />
                    <h4 className="font-medium">Report Types Distribution</h4>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>PDF Reports</span>
                      <span className="font-medium">60%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: "60%" }}></div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span>Excel Reports</span>
                      <span className="font-medium">25%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: "25%" }}></div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span>HTML Reports</span>
                      <span className="font-medium">15%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full" style={{ width: "15%" }}></div>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <PieChart className="h-5 w-5 text-orange-600" />
                    <h4 className="font-medium">Usage Statistics</h4>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Downloads this week</span>
                      <span className="font-bold text-orange-600">142</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Most popular report</span>
                      <span className="font-medium">Test Summary</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Peak generation time</span>
                      <span className="font-medium">2:00 PM</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "schedule" && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Scheduled Reports</h3>
              
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                    <div>
                      <div className="font-medium">Weekly Test Summary</div>
                      <div className="text-sm text-gray-600">Every Monday at 9:00 AM</div>
                    </div>
                    <span className="text-blue-600 font-medium">Active</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                    <div>
                      <div className="font-medium">Monthly Performance Report</div>
                      <div className="text-sm text-gray-600">1st of every month at 8:00 AM</div>
                    </div>
                    <span className="text-green-600 font-medium">Active</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium">Daily Bug Summary</div>
                      <div className="text-sm text-gray-600">Every day at 6:00 PM</div>
                    </div>
                    <span className="text-gray-600 font-medium">Paused</span>
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

export default ReportingAgentOutput;