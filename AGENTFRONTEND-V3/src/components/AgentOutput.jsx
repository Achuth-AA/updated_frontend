import { useState, useEffect } from "react";
import { X, ChevronDown } from "lucide-react";

// Test Script Agent data
const testScriptAgentData = {
  "_id": {
    "$oid": "68a30c205f4002b786bbf906"
  },
  "test_metrics": {
    "total_test_cases": 32,
    "automatable_tests": 28,
    "automation_feasibility": 4,
    "automation_coverage": 87.5,
    "scripts_generated": {
      "total": 10,
      "web": 10,
      "mobile": 0,
      "api": 0
    }
  }
};

// Test Case Generator data
const testCaseGeneratorData = [
  {
    "_id": "68a1c68c288ddc2502c07ad7",
    "status": "success",
    "action_performed": "export_all",
    "file_path": "server/outputs/test-design/Testcases_20250817_120947.xlsx",
    "count": 27,
    "statistics": {
      "total_documents": 5,
      "total_test_cases": 27,
      "by_type": {
        "Functional": 27
      },
      "by_subtype": {
        "happy": 7,
        "error": 9,
        "exception": 6,
        "exploratory": 5
      },
      "by_document": [
        {
          "document_id": "68a1c68a288ddc2502c07ad0",
          "test_cases_count": 5,
          "path": "LoggedInUser [Entity, \"Authenticated user with dashboard access\"] --(SEES)--> UploadInvoiceButton [E..."
        },
        {
          "document_id": "68a1c68a288ddc2502c07ad1",
          "test_cases_count": 5,
          "path": "LoggedInUser [Entity] --(SEES)--> UploadInvoiceButton [Entity] --(TRIGGERS)--> InvoiceFileSelector [..."
        },
        {
          "document_id": "68a1c68a288ddc2502c07ad2",
          "test_cases_count": 4,
          "path": "DashboardPage [Entity, \"Accessible only if the user is logged in\"] --(SHOWS)--> UploadInvoiceButton ..."
        },
        {
          "document_id": "68a1c68a288ddc2502c07ad3",
          "test_cases_count": 4,
          "path": "InvoiceUploadService [Entity] --(ON_SUCCESS)--> UploadConfirmation [Entity, \"Displays 'Invoice uploa..."
        },
        {
          "document_id": "68a1c68a288ddc2502c07ad4",
          "test_cases_count": 9,
          "path": "UploadInvoiceButton [Entity] --(TRIGGERS)--> SystemFileDialog [Entity, \"Native file browser for sele..."
        }
      ]
    },
    "filters": {},
    "message": "Successfully exported 27 test cases"
  },
  {
    "_id": "68a1c3a1decb82c4b636a73f",
    "status": "success",
    "action_performed": "export_all",
    "file_path": "server/outputs/test-design/TestCases_InvoiceUpload",
    "count": 24,
    "statistics": {
      "total_documents": 5,
      "total_test_cases": 24,
      "by_type": {
        "Functional": 24
      },
      "by_subtype": {
        "happy": 5,
        "error": 9,
        "exception": 5,
        "exploratory": 5
      }
    },
    "filters": {},
    "message": "Successfully exported 24 test cases"
  },
  {
    "_id": "68a1c251c8db78d071ed47ae",
    "status": "success",
    "action_performed": "export_all",
    "file_path": "server/outputs/test-design/Testcases_20250817_115145.xlsx",
    "count": 23,
    "statistics": {
      "total_documents": 5,
      "total_test_cases": 23,
      "by_type": {
        "Functional": 23
      },
      "by_subtype": {
        "happy": 5,
        "error": 8,
        "exception": 5,
        "exploratory": 5
      }
    },
    "filters": {},
    "message": "Successfully exported 23 test cases"
  }
];

// ----- Function to extract statistics from real API JSON ------
function extractStatistics(data) {
  if (!Array.isArray(data) || !data.length || !data[0].statistics) {
    return { total: "-", functional: "-", nonFunctional: "-", coverage: "-", accuracy: "-" };
  }
  const stats = data.statistics;
  let total = stats.total_test_cases ?? "-";
  let functional = stats.by_type?.Functional ?? 0;
  let nonFunctional = 0; // No non-functional in schema
  let coverage = total === "-" ? "-" : "82%"; // fallback or replace logic as needed
  let accuracy = "100%";
  return { total, functional, nonFunctional, coverage, accuracy };
}

// ----- Mock Test Cases -----
const mockTestCases = [
  {
    id: "TC_HAPPY_001",
    title: "Valid invoice upload with dashboard update",
    complexity: "Medium complexity",
    duration: "15 mins",
    status: "approved",
    statusColor: "blue",
    description: "Verify that uploading a valid invoice file successfully updates the dashboard so that the new invoice is reflected",
    tags: ["upload", "happy path", "critical", "dashboard"],
    preconditions: "Browser: Chrome v122, OS: Windows 11, User logged in as johndoe@virtusa.com with upload permission, Valid invoice file available",
    dependencies: "Dashboard access, Upload permission",
    testSteps: [
      "Navigate to the Dashboard Page",
      "Locate and click the 'Upload Invoice' button",
      "In the native System File Dialog, select 'Invoice_Q4_2023.pdf' and click 'Open'",
      "Observe the upload progress indicator",
      "Wait for the upload confirmation message to appear"
    ],
    expectedResult: "Confirmation message 'Invoice uploaded successfully' displayed, and 'Invoice_Q4_2023.pdf' visible on Dashboard Page"
  },
  {
    id: "TC_ERROR_001",
    title: "Upload unsupported file type (.exe)",
    complexity: "Low complexity",
    duration: "10 mins",
    status: "approved",
    statusColor: "blue",
    description: "Verify that uploading an unsupported .exe file type triggers an error so that invalid formats are rejected",
    tags: ["upload", "validation", "error handling", "security"],
    preconditions: "Browser: Chrome v122, OS: Windows 11, User logged in as janedoe@virtusa.com with upload permission, Unsupported file available",
    dependencies: "Upload permission",
    testSteps: [
      "Navigate to the Dashboard Page",
      "Click the 'Upload Invoice' button",
      "In the native System File Dialog, select 'malware.exe' and click 'Open'"
    ],
    expectedResult: "Error message 'Unsupported file type. Please upload only PDF, JPG, or PNG files.' displayed, file not uploaded"
  },
  // Add more mock cases here as needed...
];

function AgentOutput({ onClose, agent }) {
  const { name } = agent;

  const [isVisible, setIsVisible] = useState(false);
  const [expandedTestCase, setExpandedTestCase] = useState(null);
  const [activeTab, setActiveTab] = useState("output");
  const [feedbackOption, setFeedbackOption] = useState("approve");
  const [comments, setComments] = useState("");
  const [statistics, setStatistics] = useState({
    total: "27",
    functional: "27",
    nonFunctional: "0",
    coverage: "82%",
    accuracy: "100%"
  });
  const [loadingStats, setLoadingStats] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    setExpandedTestCase(null);
    setActiveTab("output");
    setFeedbackOption("approve");
    setComments("");
    
    // Set statistics based on agent type
    if (name === "Test Case Generator Agent" || name === "Test Case Generator") {
      const totalExports = testCaseGeneratorData.reduce((sum, item) => sum + item.count, 0);
      setStatistics({
        total: totalExports.toString(),
        functional: totalExports.toString(),
        nonFunctional: "0",
        coverage: "89%",
        accuracy: "100%"
      });
    } else if (name === "Test Script Generator Agent" || name === "Script Generator Agent") {
      const scriptData = testScriptAgentData.test_metrics;
      setStatistics({
        total: scriptData.total_test_cases.toString(),
        functional: scriptData.automatable_tests.toString(),
        nonFunctional: "0",
        coverage: scriptData.automation_coverage + "%",
        accuracy: "94%"
      });
    } else {
      setStatistics({
        total: "-", functional: "-", nonFunctional: "-", coverage: "-", accuracy: "-"
      });
    }
  }, [name]);

  function getStatusBgColor(color) {
    switch (color) {
      case "orange": return "bg-orange-500";
      case "blue": return "bg-blue-500";
      case "red": return "bg-red-500";
      case "green": return "bg-green-500";
      default: return "bg-gray-500";
    }
  }
  
  function handleClose() {
    setIsVisible(false);
    setTimeout(() => onClose(false), 300);
  }
  
  function handleSubmitFeedback() {
    console.log("Feedback submitted:", { feedbackOption, comments });
    setFeedbackOption("approve");
    setComments("");
    onClose(false);
  }

  // Output Tab Content
  let outputTabContent;
  
  if (name === "Test Case Generator Agent" || name === "Test Case Generator") {
    outputTabContent = (
      <>
        {/* Statistics Grid */}
        <div className="bg-blue-50 rounded-2xl p-6 mb-4">
          <div className="grid grid-cols-5 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">
                {loadingStats ? <span className="animate-pulse">--</span> : statistics.coverage}
              </div>
              <div className="text-sm text-gray-600 mt-1">Coverage</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">
                {loadingStats ? <span className="animate-pulse">--</span> : statistics.total}
              </div>
              <div className="text-sm text-gray-600 mt-1">Total Cases</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">
                {loadingStats ? <span className="animate-pulse">--</span> : statistics.accuracy}
              </div>
              <div className="text-sm text-gray-600 mt-1">Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">
                {loadingStats ? <span className="animate-pulse">--</span> : statistics.functional}
              </div>
              <div className="text-sm text-gray-600 mt-1">Functional</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">
                {loadingStats ? <span className="animate-pulse">--</span> : statistics.nonFunctional}
              </div>
              <div className="text-sm text-gray-600 mt-1">Non-functional</div>
            </div>
          </div>
        </div>

        {/* Test Case Generator Data Display */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Export History</h3>
          {testCaseGeneratorData.map((exportData, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-2xl p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-medium text-gray-900">Export #{index + 1}</h4>
                  <p className="text-sm text-gray-600">{exportData.message}</p>
                </div>
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-1 rounded-full">
                  {exportData.status.toUpperCase()}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                <div>
                  <span className="text-gray-600">Test Cases:</span>
                  <span className="font-medium text-gray-900 ml-2">{exportData.count}</span>
                </div>
                <div>
                  <span className="text-gray-600">Documents:</span>
                  <span className="font-medium text-gray-900 ml-2">{exportData.statistics.total_documents}</span>
                </div>
              </div>

              <div className="flex justify-between text-xs bg-gray-50 rounded-lg p-3">
                {Object.entries(exportData.statistics.by_subtype).map(([type, count]) => (
                  <div key={type} className="text-center">
                    <div className="font-medium text-gray-900">{count}</div>
                    <div className="text-gray-600 capitalize">{type}</div>
                  </div>
                ))}
              </div>

              <p className="text-xs text-gray-500 mt-2">{exportData.file_path}</p>
            </div>
          ))}
        </div>
      </>
    );
  } else if (name === "Test Script Generator Agent" || name === "Script Generator Agent") {
    outputTabContent = (
      <>
        {/* Statistics Grid */}
        <div className="bg-blue-50 rounded-2xl p-6 mb-4">
          <div className="grid grid-cols-5 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">
                {statistics.coverage}
              </div>
              <div className="text-sm text-gray-600 mt-1">Coverage</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">
                {statistics.total}
              </div>
              <div className="text-sm text-gray-600 mt-1">Total Cases</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">
                {statistics.accuracy}
              </div>
              <div className="text-sm text-gray-600 mt-1">Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">
                {statistics.functional}
              </div>
              <div className="text-sm text-gray-600 mt-1">Automatable</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">
                {testScriptAgentData.test_metrics.scripts_generated.total}
              </div>
              <div className="text-sm text-gray-600 mt-1">Scripts Generated</div>
            </div>
          </div>
        </div>

        {/* Test Script Data Display */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Script Generation Summary</h3>
          
          <div className="bg-white border border-gray-200 rounded-2xl p-4">
            <div className="grid grid-cols-2 gap-6 mb-4">
              <div>
                <span className="text-sm text-gray-600">Automation Feasibility:</span>
                <div className="flex items-center mt-1">
                  <div className="flex-1 bg-gray-200 rounded-full h-2 mr-3">
                    <div 
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${(testScriptAgentData.test_metrics.automation_feasibility / 5) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{testScriptAgentData.test_metrics.automation_feasibility}/5</span>
                </div>
              </div>
              <div>
                <span className="text-sm text-gray-600">Automation Coverage:</span>
                <p className="text-xl font-bold text-green-600">{testScriptAgentData.test_metrics.automation_coverage}%</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-3">
              <h4 className="font-medium text-gray-900 mb-2">Generated Scripts Breakdown</h4>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-lg font-bold text-blue-600">{testScriptAgentData.test_metrics.scripts_generated.web}</div>
                  <div className="text-xs text-gray-600">Web Scripts</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-green-600">{testScriptAgentData.test_metrics.scripts_generated.mobile}</div>
                  <div className="text-xs text-gray-600">Mobile Scripts</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-purple-600">{testScriptAgentData.test_metrics.scripts_generated.api}</div>
                  <div className="text-xs text-gray-600">API Scripts</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    // Original fallback for other agents
    outputTabContent = (
      <>
        {/* Statistics Grid */}
        <div className="bg-blue-50 rounded-2xl p-6 mb-4">
          <div className="grid grid-cols-5 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">
                {loadingStats ? <span className="animate-pulse">--</span> : statistics.coverage}
              </div>
              <div className="text-sm text-gray-600 mt-1">Coverage</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">
                {loadingStats ? <span className="animate-pulse">--</span> : statistics.total}
              </div>
              <div className="text-sm text-gray-600 mt-1">Total Cases</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">
                {loadingStats ? <span className="animate-pulse">--</span> : statistics.accuracy}
              </div>
              <div className="text-sm text-gray-600 mt-1">Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">
                {loadingStats ? <span className="animate-pulse">--</span> : statistics.functional}
              </div>
              <div className="text-sm text-gray-600 mt-1">Functional</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">
                {loadingStats ? <span className="animate-pulse">--</span> : statistics.nonFunctional}
              </div>
              <div className="text-sm text-gray-600 mt-1">Non-functional</div>
            </div>
          </div>
        </div>
        {/* Mock Test Cases for other agents */}
        <div>
          {mockTestCases.length === 0 ? (
            <div className="text-gray-400 text-center py-12">No test cases available for this agent.</div>
          ) : (
            <div className="space-y-3">
              {mockTestCases.map((testCase) => (
                <div key={testCase.id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
                  {/* Collapsed View */}
                  <div
                    className="p-4 relative cursor-pointer"
                    onClick={() => setExpandedTestCase(expandedTestCase === testCase.id ? null : testCase.id)}
                  >
                    <div className={`absolute left-0 top-1 bottom-1 w-8 ${getStatusBgColor(testCase.statusColor)} rounded-l-2xl`}></div>
                    <div className="flex items-center justify-between ml-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-medium text-gray-900">{testCase.id}:</span>
                          <span className="text-gray-900">{testCase.title}</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span>{testCase.duration}</span>
                          <span>•</span>
                          <span>{testCase.complexity}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`${getStatusBgColor(testCase.statusColor)} text-white text-xs font-medium px-3 py-1 rounded-full`}>
                          {testCase.status}
                        </span>
                        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${expandedTestCase === testCase.id ? 'rotate-180' : 'rotate-[-90deg]'}`} />
                      </div>
                    </div>
                  </div>
                  {/* Expanded View */}
                  {expandedTestCase === testCase.id && (
                    <div className="border-t border-gray-200 bg-gray-50 relative">
                      <div className={`absolute left-0 top-0 bottom-0 w-8 ${getStatusBgColor(testCase.statusColor)}`}></div>
                      <div className="p-6 ml-8">
                        {/* Tags */}
                        <div className="flex gap-2 mb-4">
                          {testCase.tags.map((tag, idx) => (
                            <span key={idx} className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded">{tag}</span>
                          ))}
                        </div>
                        {/* Description */}
                        <div className="mb-4">
                          <p className="text-gray-800 text-sm">{testCase.description}</p>
                        </div>
                        {/* Preconditions and Dependencies */}
                        <div className="grid grid-cols-2 gap-6 mb-4">
                          <div>
                            <h4 className="font-medium text-gray-900 text-sm mb-1">Preconditions</h4>
                            <p className="text-gray-600 text-sm">{testCase.preconditions}</p>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 text-sm mb-1">Dependencies</h4>
                            <p className="text-gray-600 text-sm">{testCase.dependencies}</p>
                          </div>
                        </div>
                        {/* Test Steps */}
                        <div className="mb-4">
                          <h4 className="font-medium text-gray-900 text-sm mb-2">Test Steps</h4>
                          <ol className="list-decimal list-inside space-y-1">
                            {testCase.testSteps.map((step, idx) => (
                              <li key={idx} className="text-gray-600 text-sm">{step}</li>
                            ))}
                          </ol>
                        </div>
                        {/* Expected Result */}
                        <div className="mb-6">
                          <h4 className="font-medium text-gray-900 text-sm mb-1">Expected Result</h4>
                          <p className="text-gray-600 text-sm">{testCase.expectedResult}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </>
    );
  }

  return (
    <div className={`fixed inset-0 z-50 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      ></div>
      {/* Panel */}
      <div className={`absolute right-0 top-0 h-full w-[600px] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${isVisible ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h1 className="text-xl font-semibold text-gray-900">
            {name}: Output Review
          </h1>
          <button onClick={handleClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>
        {/* Tab Navigation */}
        <div className="flex gap-2 px-6 py-2 border-b border-gray-100">
          <button
            onClick={() => setActiveTab("output")}
            className={`px-4 py-2 rounded-full font-medium text-sm transition-all ${activeTab === "output" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
          >Output</button>
          <button
            onClick={() => setActiveTab("feedback")}
            className={`px-4 py-2 rounded-full font-medium text-sm transition-all ${activeTab === "feedback" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
          >Feedback</button>
          <button
            onClick={() => setActiveTab("history")}
            className={`px-4 py-2 rounded-full font-medium text-sm transition-all ${activeTab === "history" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
          >History</button>
        </div>
        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-6 h-[calc(100vh-200px)]">
          {activeTab === "output" && outputTabContent}

          {activeTab === "feedback" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Provide Feedback</h2>
                <p className="text-gray-600 text-sm mb-6">
                  Review the agent's work and provide guidance for improvement.
                </p>
                {/* Feedback Action Buttons */}
                <div className="flex gap-3 mb-6">
                  <button
                    onClick={() => setFeedbackOption("approve")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      feedbackOption === "approve"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    ✓ Approve
                  </button>
                  <button
                    onClick={() => setFeedbackOption("revision")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      feedbackOption === "revision"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    ✏️ Request Revision
                  </button>
                  <button
                    onClick={() => setFeedbackOption("reject")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      feedbackOption === "reject"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    🚫 Reject
                  </button>
                </div>
                {/* Comments Section */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Comments (optional)
                  </label>
                  <textarea
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    placeholder="Add any comments or approval notes..."
                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    rows={8}
                  />
                </div>
                {/* Submit Button */}
                <button
                  onClick={handleSubmitFeedback}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  ✓ Submit Approval
                </button>
              </div>
            </div>
          )}

          {activeTab === "history" && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">History</h2>
              <div className="text-center py-8 text-gray-500">
                <p>No history available</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AgentOutput;
