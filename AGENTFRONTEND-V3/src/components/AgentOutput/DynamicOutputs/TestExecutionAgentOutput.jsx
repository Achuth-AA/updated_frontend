import { useState } from "react";
import { X, Activity, PlayCircle, CheckCircle, AlertTriangle } from "lucide-react";

const TestExecutionAgentOutput = ({ agent, onClose }) => {
  
  const executionData = {
    totalTests: 156,
    passed: 147,
    failed: 6,
    skipped: 3,
    executionTime: "12m 34s",
    successRate: 94.2,
    environment: "Staging",
    testSuite: "Regression Suite v2.1"
  };

  const testCases = [
    { 
      id: "TC001", 
      title: "Valid user login with correct credentials",
      priority: "High",
      type: "Functional", 
      status: "Passed",
      testSteps: [
        "Navigate to login page",
        "Enter valid username",
        "Enter valid password", 
        "Click login button"
      ],
      expectedResult: "User should be redirected to dashboard",
      actualResult: "User successfully redirected to dashboard",
      executionTime: "2.1s"
    },
    {
      id: "TC002",
      title: "Payment processing with valid credit card",
      priority: "Critical",
      type: "Functional",
      status: "Passed", 
      testSteps: [
        "Add items to cart",
        "Proceed to checkout",
        "Enter valid credit card details",
        "Submit payment"
      ],
      expectedResult: "Payment should be processed successfully",
      actualResult: "Payment processed and confirmation received",
      executionTime: "4.8s"
    },
    {
      id: "TC003", 
      title: "Form validation with invalid data",
      priority: "Medium",
      type: "Validation",
      status: "Failed",
      testSteps: [
        "Navigate to registration form", 
        "Enter invalid email format",
        "Leave required fields empty",
        "Submit form"
      ],
      expectedResult: "Validation errors should be displayed",
      actualResult: "Form submitted without validation (Bug found)",
      executionTime: "1.2s"
    },
    {
      id: "TC004",
      title: "API endpoint response validation", 
      priority: "High",
      type: "API",
      status: "Passed",
      testSteps: [
        "Send GET request to /api/users",
        "Verify response status code", 
        "Validate response schema",
        "Check response time"
      ],
      expectedResult: "API should return 200 status with valid JSON",
      actualResult: "API returned 200 status with valid user data",
      executionTime: "3.5s"
    },
    {
      id: "TC005",
      title: "Mobile responsive design validation",
      priority: "Low", 
      type: "UI",
      status: "Skipped",
      testSteps: [
        "Open application on mobile browser",
        "Verify layout responsiveness",
        "Check touch interactions", 
        "Validate mobile-specific features"
      ],
      expectedResult: "Application should be fully responsive",
      actualResult: "Test skipped due to mobile environment unavailable",
      executionTime: "0s"
    }
  ];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "passed": return "text-green-600 bg-green-100";
      case "failed": return "text-red-600 bg-red-100";
      case "skipped": return "text-yellow-600 bg-yellow-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case "critical": return "text-red-700 bg-red-100 border-red-200";
      case "high": return "text-orange-700 bg-orange-100 border-orange-200";
      case "medium": return "text-yellow-700 bg-yellow-100 border-yellow-200";
      case "low": return "text-blue-700 bg-blue-100 border-blue-200";
      default: return "text-gray-700 bg-gray-100 border-gray-200";
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 bg-blue-600">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Activity className="h-6 w-6 text-white" />
              <div>
                <h2 className="text-xl font-semibold text-white">Test Execution Agent</h2>
                <p className="text-blue-100 text-sm">Automated test execution results</p>
              </div>
            </div>
            <button onClick={onClose} className="text-white hover:text-blue-200">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-150px)]">
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{executionData.passed}</div>
                <div className="text-sm text-green-600">Passed</div>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-red-600">{executionData.failed}</div>
                <div className="text-sm text-red-600">Failed</div>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">{executionData.skipped}</div>
                <div className="text-sm text-yellow-600">Skipped</div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{executionData.successRate}%</div>
                <div className="text-sm text-blue-600">Success Rate</div>
              </div>
            </div>

            {/* Execution Metrics */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900">Execution Time</h4>
                <p className="text-2xl font-bold text-blue-600">{executionData.executionTime}</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900">Environment</h4>
                <p className="text-2xl font-bold text-green-600">{executionData.environment}</p>
              </div>
            </div>

            {/* Test Cases Table */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold">Executed Test Cases</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Test ID</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Priority</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {testCases.map((testCase) => (
                      <tr key={testCase.id} className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm font-mono text-gray-900">{testCase.id}</td>
                        <td className="px-4 py-4 text-sm text-gray-900 max-w-xs">
                          <div className="truncate" title={testCase.title}>
                            {testCase.title}
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <span className={`px-2 py-1 text-xs font-medium rounded border ${getPriorityColor(testCase.priority)}`}>
                            {testCase.priority}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-700">{testCase.type}</td>
                        <td className="px-4 py-4">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(testCase.status)}`}>
                            {testCase.status}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-600 font-mono">{testCase.executionTime}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Test Case Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Test Case Details</h3>
              {testCases.map((testCase) => (
                <div key={testCase.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-gray-900">{testCase.id}: {testCase.title}</h4>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded border ${getPriorityColor(testCase.priority)}`}>
                          {testCase.priority}
                        </span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(testCase.status)}`}>
                          {testCase.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-medium text-gray-900 mb-2">Test Steps</h5>
                        <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700">
                          {testCase.testSteps.map((step, index) => (
                            <li key={index}>{step}</li>
                          ))}
                        </ol>
                      </div>
                      <div>
                        <div className="space-y-4">
                          <div>
                            <h5 className="font-medium text-gray-900 mb-1">Expected Result</h5>
                            <p className="text-sm text-gray-700">{testCase.expectedResult}</p>
                          </div>
                          <div>
                            <h5 className="font-medium text-gray-900 mb-1">Actual Result</h5>
                            <p className={`text-sm ${
                              testCase.status === 'Failed' ? 'text-red-700' : 'text-gray-700'
                            }`}>
                              {testCase.actualResult}
                            </p>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Execution Time:</span>
                            <span className="font-mono text-gray-900">{testCase.executionTime}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Execution Logs */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold">Execution Logs</h3>
              </div>
              <div className="p-4">
                <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                  <div>[2024-01-20 10:30:15] Starting test execution...</div>
                  <div>[2024-01-20 10:30:16] Loading test suite: {executionData.testSuite}</div>
                  <div>[2024-01-20 10:30:17] Environment: {executionData.environment}</div>
                  <div>[2024-01-20 10:30:18] Executing TC001: User Login Flow... PASSED</div>
                  <div>[2024-01-20 10:30:22] Executing TC002: Payment Processing... PASSED</div>
                  <div>[2024-01-20 10:30:26] Executing TC003: Data Validation... FAILED</div>
                  <div>[2024-01-20 10:30:27] Error: Element not found - xpath: //input[@id='validation']</div>
                  <div>[2024-01-20 10:30:28] Executing TC004: API Integration... PASSED</div>
                  <div>[2024-01-20 10:42:49] Test execution completed</div>
                  <div>[2024-01-20 10:42:49] Summary: {executionData.passed} passed, {executionData.failed} failed, {executionData.skipped} skipped</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestExecutionAgentOutput;