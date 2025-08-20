import { useState } from "react";
import { Download, FileText, BarChart3, CheckCircle, Play } from "lucide-react";

const testScriptAgentData = [
  {
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
  }
];

function TestScriptAgentOutput({ onClose }) {
  const [activeTab, setActiveTab] = useState("overview");
  const data = testScriptAgentData[0];

  const tabs = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "scripts", label: "Generated Scripts", icon: FileText },
    { id: "execution", label: "Execution Results", icon: Play },
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Test Cases</p>
              <p className="text-2xl font-bold text-gray-900">{data.test_metrics.total_test_cases}</p>
            </div>
            <FileText className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Automatable Tests</p>
              <p className="text-2xl font-bold text-green-600">{data.test_metrics.automatable_tests}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Automation Coverage</p>
              <p className="text-2xl font-bold text-purple-600">{data.test_metrics.automation_coverage}%</p>
            </div>
            <BarChart3 className="h-8 w-8 text-purple-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Scripts Generated</p>
              <p className="text-2xl font-bold text-orange-600">{data.test_metrics.scripts_generated.total}</p>
            </div>
            <Play className="h-8 w-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Automation Feasibility */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Automation Feasibility Score</h3>
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <div className="bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${(data.test_metrics.automation_feasibility / 5) * 100}%` }}
              ></div>
            </div>
          </div>
          <span className="text-xl font-bold text-green-600">
            {data.test_metrics.automation_feasibility}/5
          </span>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          High automation feasibility indicates most test cases can be successfully automated
        </p>
      </div>

      {/* Scripts Breakdown */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Generated Scripts Breakdown</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{data.test_metrics.scripts_generated.web}</div>
            <div className="text-sm text-gray-600">Web Scripts</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{data.test_metrics.scripts_generated.mobile}</div>
            <div className="text-sm text-gray-600">Mobile Scripts</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">{data.test_metrics.scripts_generated.api}</div>
            <div className="text-sm text-gray-600">API Scripts</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderScripts = () => (
    <div className="space-y-4">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Generated Test Scripts</h3>
        
        {/* Web Scripts */}
        <div className="space-y-3">
          {Array.from({ length: data.test_metrics.scripts_generated.web }, (_, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center space-x-3">
                <FileText className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium text-gray-900">Web_Test_Script_{index + 1}.js</p>
                  <p className="text-sm text-gray-600">Selenium WebDriver script for UI automation</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                  Generated
                </span>
                <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors">
                  <Download className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {data.test_metrics.scripts_generated.mobile === 0 && data.test_metrics.scripts_generated.api === 0 && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              Mobile and API scripts not generated for this test suite. Focus was on web automation.
            </p>
          </div>
        )}
      </div>
    </div>
  );

  const renderExecution = () => (
    <div className="space-y-4">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Script Execution Status</h3>
        
        <div className="space-y-3">
          {Array.from({ length: Math.min(5, data.test_metrics.scripts_generated.total) }, (_, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Play className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium text-gray-900">Web_Test_Script_{index + 1}.js</p>
                  <p className="text-sm text-gray-600">Executed successfully - {Math.floor(Math.random() * 30) + 10} test cases passed</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                  Passed
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span className="font-medium text-green-900">Automation Success Rate: 94.3%</span>
          </div>
          <p className="text-sm text-green-700 mt-1">
            {data.test_metrics.automatable_tests} out of {data.test_metrics.total_test_cases} test cases successfully automated
          </p>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return renderOverview();
      case "scripts":
        return renderScripts();
      case "execution":
        return renderExecution();
      default:
        return renderOverview();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-500 to-blue-600">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white">Test Script Agent Output</h2>
              <p className="text-blue-100 text-sm">Script generation and automation metrics</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-blue-200 transition-colors"
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
                    ? "text-blue-600 border-b-2 border-blue-600"
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

export default TestScriptAgentOutput;