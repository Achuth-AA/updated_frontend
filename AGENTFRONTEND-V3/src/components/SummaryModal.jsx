// SummaryModal.jsx
import { X, TrendingUp, Clock, Zap, Calendar, FileText, RefreshCw, CheckCircle, AlertTriangle, Database } from "lucide-react";
import { useState, useEffect } from "react";

function SummaryModal({ onClose, agent }) {
  const [summaryData, setSummaryData] = useState(null);
  const [testCaseData, setTestCaseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFullSummary, setShowFullSummary] = useState(false);

  // Helper function to get database agent name (same as in AgentCard)
  const getDbAgentName = (displayName) => {
    const agentNameMapping = {
      "Jira Management Agent": "jira_mcp_agent",
      "Test Case Generator Agent": "test_case_generator_agent",
      "Test Data Agent": "test_data_root_agent",
      "Test Script Generator Agent": "test_script_root_agent",
      "Environment Readiness Agent": "env_readiness_agent",
      "Test Execution and DevOps Agent": "jenkins_automation_agent",
      "Test Reporting Agent": "Test_Report_generation_agent",
      "Test Failure Analysis Agent": "Test_Failure_Analysis_agent",
      "Self Healing Agent": "self_healing_root_agent",
      "Orchestration Agent": "orchestrator_agent",
    };
    
    return (
      agentNameMapping[displayName] ||
      displayName.toLowerCase().replace(/\s+/g, "_")
    );
  };

  // Check if current agent is Test Case Generator Agent
  const isTestCaseAgent = agent.name === "Test Case Generator Agent";

  // Fetch test case data for Test Case Generator Agent
  const fetchTestCaseData = async () => {
    try {
      const response = await fetch("http://10.107.45.12:8080/api/testcases/all");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setTestCaseData(data);
    } catch (err) {
      console.error("Error fetching test case data:", err);
      // Don't set error here as we still want to show regular summary if available
    }
  };

  // Fetch summary data using the same API as AgentCard
  useEffect(() => {
    const fetchSummaryData = async () => {
      const dbName = getDbAgentName(agent.name);
      try {
        setLoading(true);
        
        // Fetch regular summary data
        const response = await fetch(
          `http://10.107.45.12:8080/api/tokens/agent/${dbName}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setSummaryData(data);

        // If this is the test case agent, also fetch test case data
        if (isTestCaseAgent) {
          await fetchTestCaseData();
        }
      } catch (err) {
        console.error("Error fetching summary data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (agent?.name) {
      fetchSummaryData();
    }
  }, [agent, isTestCaseAgent]);

  // Helper functions for formatting
  const formatTokens = (tokens) => {
    if (!tokens) return "0";
    if (tokens >= 1000000) {
      return `${(tokens / 1000000).toFixed(1)}M`;
    }
    if (tokens >= 1000) {
      return `${(tokens / 1000).toFixed(1)}K`;
    }
    return tokens.toString();
  };

  const formatExecutionTime = (seconds) => {
    if (!seconds) return "0 min";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    if (minutes > 0) {
      return `${minutes}m ${remainingSeconds}s`;
    }
    return `${remainingSeconds}s`;
  };

  const formatTimeAgo = (dateString) => {
    if (!dateString) return "Unknown";
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.round((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Less than an hour ago";
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    const diffInDays = Math.round(diffInHours / 24);
    return `${diffInDays} days ago`;
  };

  const truncateText = (text, maxLength = 200) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  // Helper function to get latest test case execution data
  const getLatestTestCaseExecution = () => {
    if (!testCaseData || !Array.isArray(testCaseData) || testCaseData.length === 0) {
      return null;
    }
    // Return the first item as they appear to be sorted by date (most recent first)
    return testCaseData[0];
  };

  const renderTestCaseSpecificContent = () => {
    const latestExecution = getLatestTestCaseExecution();
    
    if (!latestExecution) {
      return (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center gap-2 text-yellow-700">
            <AlertTriangle className="w-5 h-5" />
            <span className="font-medium">No test case execution data available</span>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {/* Test Case Execution Overview */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle className="w-6 h-6 text-green-500" />
            <h3 className="text-lg font-semibold text-gray-800">Latest Test Case Execution</h3>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              latestExecution.status === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {latestExecution.status.toUpperCase()}
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="bg-white p-3 rounded border">
              <div className="text-sm text-gray-600">Total Test Cases</div>
              <div className="text-2xl font-bold text-blue-600">{latestExecution.count}</div>
            </div>
            <div className="bg-white p-3 rounded border">
              <div className="text-sm text-gray-600">Documents</div>
              <div className="text-2xl font-bold text-green-600">{latestExecution.statistics.total_documents}</div>
            </div>
            {/* <div className="bg-white p-3 rounded border">
              <div className="text-sm text-gray-600">Action</div>
              <div className="text-sm font-medium text-purple-600">{latestExecution.action_performed}</div>
            </div> */}
            <div className="bg-white p-3 rounded border">
              <div className="text-sm text-gray-600">Output File</div>
              <div className="text-xs text-gray-700 truncate" title={latestExecution.file_path}>
                {latestExecution.file_path?.split('/').pop() || 'N/A'}
              </div>
            </div>
          </div>

          <div className="text-sm text-gray-600">
            <strong>Message:</strong> {latestExecution.message}
          </div>
        </div>

        {/* Test Case Type Distribution */}
        <div className="bg-white border rounded-lg p-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Database className="w-5 h-5 text-blue-500" />
            Test Case Distribution
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* By Type */}
            <div>
              <h5 className="font-medium text-gray-700 mb-3">By Type</h5>
              <div className="space-y-2">
                {Object.entries(latestExecution.statistics.by_type).map(([type, count]) => (
                  <div key={type} className="flex justify-between items-center p-2 bg-blue-50 rounded">
                    <span className="text-sm font-medium text-blue-700">{type}</span>
                    <span className="text-sm font-bold text-blue-800">{count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* By Subtype */}
            <div>
              <h5 className="font-medium text-gray-700 mb-3">By Subtype</h5>
              <div className="space-y-2">
                {Object.entries(latestExecution.statistics.by_subtype).map(([subtype, count]) => (
                  <div key={subtype} className="flex justify-between items-center p-2 bg-green-50 rounded">
                    <span className="text-sm font-medium text-green-700 capitalize">{subtype}</span>
                    <span className="text-sm font-bold text-green-800">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Document-wise Test Cases */}
        {/* <div className="bg-white border rounded-lg p-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Test Cases by Document</h4>
          <div className="space-y-3 max-h-60 overflow-y-auto">
            {latestExecution.statistics.by_document.map((doc, index) => (
              <div key={doc.document_id || index} className="p-4 bg-gray-50 border rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div className="font-medium text-gray-700">Document {index + 1}</div>
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
                    {doc.test_cases_count} test cases
                  </span>
                </div>
                <div className="text-xs text-gray-600 mb-1">
                  <strong>ID:</strong> {doc.document_id}
                </div>
                <div className="text-xs text-gray-600 break-words">
                  <strong>Path:</strong> {doc.path}
                </div>
              </div>
            ))}
          </div>
        </div> */}

      
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 ${agent.iconBgColor} rounded-lg flex items-center justify-center`}>
              <agent.icon className={`w-5 h-5 ${agent.iconColor}`} />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                {agent.name} Summary
              </h2>
              <p className="text-sm text-gray-500">
                {isTestCaseAgent ? 'Performance Overview & Test Case Generation Summary' : 'Performance Overview & Execution Summary'}
              </p>
            </div>
          </div>
          <button
            onClick={() => onClose(false)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600"></div>
            <span className="ml-3 text-gray-600">Loading summary...</span>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="text-red-500 mb-2">Error loading summary</div>
            <div className="text-gray-500 text-sm">{error}</div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* ALWAYS show the Key Metrics Grid for ALL agents (including test case agent) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-5 h-5 text-blue-500" />
                  <span className="text-sm font-medium text-blue-700">Total Tokens</span>
                </div>
                <div className="text-2xl font-bold text-blue-800">
                  {formatTokens(summaryData?.tokensConsumed)}
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-green-500" />
                  <span className="text-sm font-medium text-green-700">Execution Time</span>
                </div>
                <div className="text-2xl font-bold text-green-800">
                  {formatExecutionTime(summaryData?.executionTime)}
                </div>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-purple-500" />
                  <span className="text-sm font-medium text-purple-700">Tokens/Sec</span>
                </div>
                <div className="text-2xl font-bold text-purple-800">
                  {summaryData?.tokensPerSecond || 0}
                </div>
              </div>

              <div className="bg-orange-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <RefreshCw className="w-5 h-5 text-orange-500" />
                  <span className="text-sm font-medium text-orange-700">Last Updated</span>
                </div>
                <div className="text-sm font-bold text-orange-800">
                  {formatTimeAgo(summaryData?.lastUpdated || summaryData?.lastEndTime)}
                </div>
              </div>
            </div>

            {/* Show test case specific content ADDITIONALLY for Test Case Generator Agent */}
            {isTestCaseAgent && (
              <div>
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Test Case Generation Details</h3>
                  {renderTestCaseSpecificContent()}
                </div>
              </div>
            )}

         

            {/* Execution Timeline - Show for ALL agents */}
            {summaryData?.lastStartTime && summaryData?.lastEndTime && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Last Execution Timeline</h3>
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-blue-700">Start Time:</span>
                      <span className="text-sm font-medium text-blue-800">
                        {new Date(summaryData.lastStartTime).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-blue-700">End Time:</span>
                      <span className="text-sm font-medium text-blue-800">
                        {new Date(summaryData.lastEndTime).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-blue-200">
                      <span className="text-sm text-blue-700">Duration:</span>
                      <span className="text-sm font-bold text-blue-900">
                        {formatExecutionTime(summaryData?.executionTime)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Additional computed stats - Show for ALL agents */}
            {/* <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Additional Statistics</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Estimated Word Count:</span>
                    <span className="text-sm font-medium text-gray-800">
                      {summaryData?.summaryLength ? Math.round(summaryData.summaryLength / 5) : 0}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Data Freshness:</span>
                    <span className="text-sm font-medium text-gray-800">
                      {summaryData?.lastUpdated ? 
                        `${Math.round((new Date() - new Date(summaryData.lastUpdated)) / (1000 * 60 * 60))}h ago` : 
                        "Unknown"
                      }
                    </span>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        )}
      </div>
    </div>
  );
}

export default SummaryModal;
