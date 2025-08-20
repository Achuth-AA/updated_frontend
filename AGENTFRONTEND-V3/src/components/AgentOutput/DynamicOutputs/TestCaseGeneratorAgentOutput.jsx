import { Download, FileText, BarChart3, CheckCircle, FolderOpen, Users } from "lucide-react";

const generatedTestCases = [
  {
    id: "TC_GEN_001",
    title: "Valid invoice upload with successful dashboard update",
    module: "Invoice Management",
    type: "Functional",
    subtype: "Happy Path",
    priority: "High",
    complexity: "Medium",
    preconditions: "User logged in with upload permissions, valid invoice file available",
    testSteps: [
      "Navigate to Dashboard Page",
      "Click 'Upload Invoice' button",
      "Select valid invoice file (Invoice_Q4_2023.pdf)",
      "Click 'Upload' button",
      "Wait for upload completion"
    ],
    expectedResult: "Invoice uploaded successfully and visible on dashboard",
    testData: "Invoice_Q4_2023.pdf (valid PDF format, size < 10MB)",
    estimatedTime: "5 minutes",
    generatedBy: "AI Test Generator v2.1",
    status: "Generated"
  },
  {
    id: "TC_GEN_002", 
    title: "Upload invalid file format and verify error handling",
    module: "Invoice Management",
    type: "Functional",
    subtype: "Error Handling",
    priority: "Medium",
    complexity: "Low",
    preconditions: "User logged in, invalid file format available",
    testSteps: [
      "Navigate to Dashboard Page",
      "Click 'Upload Invoice' button", 
      "Select invalid file format (.exe file)",
      "Attempt to upload",
      "Verify error message"
    ],
    expectedResult: "Error message 'Invalid file format. Please upload PDF, JPG, or PNG files only.'",
    testData: "malware.exe (executable file)",
    estimatedTime: "3 minutes",
    generatedBy: "AI Test Generator v2.1",
    status: "Generated"
  },
  {
    id: "TC_GEN_003",
    title: "Upload oversized file and verify size validation", 
    module: "Invoice Management",
    type: "Functional",
    subtype: "Exception Handling",
    priority: "Medium",
    complexity: "Low",
    preconditions: "User logged in, oversized file available",
    testSteps: [
      "Navigate to Dashboard Page",
      "Click 'Upload Invoice' button",
      "Select oversized file (>10MB)",
      "Attempt to upload", 
      "Verify size limit error"
    ],
    expectedResult: "Error message 'File size exceeds 10MB limit. Please select a smaller file.'",
    testData: "large_invoice.pdf (15MB PDF file)",
    estimatedTime: "4 minutes", 
    generatedBy: "AI Test Generator v2.1",
    status: "Generated"
  },
  {
    id: "TC_GEN_004",
    title: "Verify upload progress indicator functionality",
    module: "Invoice Management", 
    type: "Functional",
    subtype: "UI Validation",
    priority: "Low",
    complexity: "Medium",
    preconditions: "User logged in, valid file available, stable internet connection",
    testSteps: [
      "Navigate to Dashboard Page",
      "Click 'Upload Invoice' button",
      "Select valid invoice file",
      "Click 'Upload' and immediately observe progress",
      "Verify progress indicator shows completion"
    ],
    expectedResult: "Progress indicator shows 0-100% upload progress and completion message",
    testData: "invoice_medium.pdf (5MB PDF file)",
    estimatedTime: "6 minutes",
    generatedBy: "AI Test Generator v2.1", 
    status: "Generated"
  },
  {
    id: "TC_GEN_005",
    title: "Test concurrent file uploads limitation",
    module: "Invoice Management",
    type: "Functional", 
    subtype: "Boundary Testing",
    priority: "Low",
    complexity: "High",
    preconditions: "User logged in, multiple valid files available",
    testSteps: [
      "Navigate to Dashboard Page",
      "Attempt to upload multiple files simultaneously", 
      "Verify system behavior",
      "Check for proper error handling",
      "Verify file queue management"
    ],
    expectedResult: "System allows only one upload at a time with proper queue management",
    testData: "Multiple invoice files (invoice1.pdf, invoice2.pdf, invoice3.pdf)",
    estimatedTime: "10 minutes",
    generatedBy: "AI Test Generator v2.1",
    status: "Generated"
  }
];

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
      },
      "by_document": [
        {
          "document_id": "68a1c39fdecb82c4b636a738",
          "test_cases_count": 6,
          "path": "LoggedInUser [Entity, \"Authenticated user with dashboard access\"] --(SEES)--> UploadInvoiceButton [E..."
        },
        {
          "document_id": "68a1c39fdecb82c4b636a739",
          "test_cases_count": 5,
          "path": "LoggedInUser [Entity] --(SEES)--> UploadInvoiceButton [Entity] --(TRIGGERS)--> InvoiceFileSelector [..."
        },
        {
          "document_id": "68a1c39fdecb82c4b636a73a",
          "test_cases_count": 4,
          "path": "DashboardPage [Entity, \"Accessible only if the user is logged in\"] --(SHOWS)--> UploadInvoiceButton ..."
        },
        {
          "document_id": "68a1c39fdecb82c4b636a73b",
          "test_cases_count": 4,
          "path": "InvoiceUploadService [Entity] --(ON_SUCCESS)--> UploadConfirmation [Entity, \"Displays 'Invoice uploa..."
        },
        {
          "document_id": "68a1c39fdecb82c4b636a73c",
          "test_cases_count": 5,
          "path": "UploadInvoiceButton [Entity] --(TRIGGERS)--> SystemFileDialog [Entity, \"Native file browser for sele..."
        }
      ]
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
      },
      "by_document": [
        {
          "document_id": "68a1c250c8db78d071ed47a7",
          "test_cases_count": 5,
          "path": "LoggedInUser [Entity, \"Authenticated user with dashboard access\"] --(SEES)--> UploadInvoiceButton [E..."
        },
        {
          "document_id": "68a1c250c8db78d071ed47a8",
          "test_cases_count": 5,
          "path": "LoggedInUser [Entity] --(SEES)--> UploadInvoiceButton [Entity] --(TRIGGERS)--> InvoiceFileSelector [..."
        },
        {
          "document_id": "68a1c250c8db78d071ed47a9",
          "test_cases_count": 4,
          "path": "DashboardPage [Entity, \"Accessible only if the user is logged in\"] --(SHOWS)--> UploadInvoiceButton ..."
        },
        {
          "document_id": "68a1c250c8db78d071ed47aa",
          "test_cases_count": 4,
          "path": "InvoiceUploadService [Entity] --(ON_SUCCESS)--> UploadConfirmation [Entity, \"Displays 'Invoice uploa..."
        },
        {
          "document_id": "68a1c250c8db78d071ed47ab",
          "test_cases_count": 5,
          "path": "UploadInvoiceButton [Entity] --(TRIGGERS)--> SystemFileDialog [Entity, \"Native file browser for sele..."
        }
      ]
    },
    "filters": {},
    "message": "Successfully exported 23 test cases"
  }
];

function TestCaseGeneratorAgentOutput({ onClose }) {
  const [activeTab, setActiveTab] = useState("summary");
  const [selectedExport, setSelectedExport] = useState(0);

  const tabs = [
    { id: "summary", label: "Summary", icon: BarChart3 },
    { id: "exports", label: "Export History", icon: FolderOpen },
    { id: "breakdown", label: "Test Breakdown", icon: FileText },
  ];

  const currentData = testCaseGeneratorData[selectedExport];
  const totalTestCases = testCaseGeneratorData.reduce((sum, item) => sum + item.count, 0);

  const renderSummary = () => (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Exports</p>
              <p className="text-2xl font-bold text-gray-900">{testCaseGeneratorData.length}</p>
            </div>
            <FolderOpen className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Test Cases</p>
              <p className="text-2xl font-bold text-green-600">{totalTestCases}</p>
            </div>
            <FileText className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Documents Processed</p>
              <p className="text-2xl font-bold text-purple-600">{currentData.statistics.total_documents}</p>
            </div>
            <Users className="h-8 w-8 text-purple-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Success Rate</p>
              <p className="text-2xl font-bold text-orange-600">100%</p>
            </div>
            <CheckCircle className="h-8 w-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Test Case Distribution */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Test Case Distribution by Type</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(currentData.statistics.by_subtype).map(([type, count]) => (
            <div key={type} className="text-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{count}</div>
              <div className="text-sm text-gray-600 capitalize">{type}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Latest Export Details */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Latest Export Details</h3>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="font-medium text-green-900">{currentData.message}</span>
            </div>
            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
              {currentData.status.toUpperCase()}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">File Path:</span>
              <p className="font-medium text-gray-900 break-all">{currentData.file_path}</p>
            </div>
            <div>
              <span className="text-gray-600">Test Cases Generated:</span>
              <p className="font-medium text-gray-900">{currentData.count}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderExports = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Export History</h3>
        <select 
          value={selectedExport} 
          onChange={(e) => setSelectedExport(parseInt(e.target.value))}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
        >
          {testCaseGeneratorData.map((item, index) => (
            <option key={index} value={index}>
              Export {index + 1} - {item.count} test cases
            </option>
          ))}
        </select>
      </div>

      {testCaseGeneratorData.map((exportItem, index) => (
        <div key={index} className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="font-medium text-gray-900">Export #{index + 1}</h4>
              <p className="text-sm text-gray-600">{exportItem.file_path}</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                {exportItem.status.toUpperCase()}
              </span>
              <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors">
                <Download className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Test Cases:</span>
              <p className="font-medium text-gray-900">{exportItem.count}</p>
            </div>
            <div>
              <span className="text-gray-600">Documents:</span>
              <p className="font-medium text-gray-900">{exportItem.statistics.total_documents}</p>
            </div>
            <div>
              <span className="text-gray-600">Action:</span>
              <p className="font-medium text-gray-900">{exportItem.action_performed.replace('_', ' ').toUpperCase()}</p>
            </div>
          </div>

          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <div className="flex justify-between text-sm">
              {Object.entries(exportItem.statistics.by_subtype).map(([type, count]) => (
                <div key={type} className="text-center">
                  <div className="font-medium text-gray-900">{count}</div>
                  <div className="text-gray-600 capitalize">{type}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderBreakdown = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Test Cases by Document</h3>
      
      {currentData.statistics.by_document.map((doc, index) => (
        <div key={index} className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <FileText className="h-5 w-5 text-blue-600" />
              <div>
                <h4 className="font-medium text-gray-900">Document #{index + 1}</h4>
                <p className="text-sm text-gray-600">{doc.document_id}</p>
              </div>
            </div>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
              {doc.test_cases_count} test cases
            </span>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-sm text-gray-700 leading-relaxed">
              {doc.path}
            </p>
          </div>
        </div>
      ))}
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "summary":
        return renderSummary();
      case "exports":
        return renderExports();
      case "breakdown":
        return renderBreakdown();
      default:
        return renderSummary();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-green-500 to-green-600">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white">Test Case Generator Agent Output</h2>
              <p className="text-green-100 text-sm">Generated test cases and export summary</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-green-200 transition-colors"
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
                    ? "text-green-600 border-b-2 border-green-600"
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

export default TestCaseGeneratorAgentOutput;