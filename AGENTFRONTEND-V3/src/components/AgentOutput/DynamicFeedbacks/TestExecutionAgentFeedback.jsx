import { useState } from "react";
import { X, Activity, CheckCircle, AlertCircle, MessageSquare } from "lucide-react";

const TestExecutionAgentFeedback = ({ agent, onClose }) => {
  const [feedbackType, setFeedbackType] = useState("approve");
  const [comments, setComments] = useState("");
  const [selectedTests, setSelectedTests] = useState([]);
  
  const testCategories = [
    { id: "functional", name: "Functional Tests", count: 89, status: "passed" },
    { id: "integration", name: "Integration Tests", count: 34, status: "passed" },
    { id: "performance", name: "Performance Tests", count: 12, status: "failed" },
    { id: "security", name: "Security Tests", count: 21, status: "passed" }
  ];

  const handleSubmitFeedback = () => {
    console.log("Test Execution Feedback:", {
      type: feedbackType,
      comments,
      selectedTests,
      agent: agent.name
    });
    onClose();
  };

  const toggleTestSelection = (testId) => {
    setSelectedTests(prev => 
      prev.includes(testId) 
        ? prev.filter(id => id !== testId)
        : [...prev, testId]
    );
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
                <h2 className="text-xl font-semibold text-white">Test Execution Feedback</h2>
                <p className="text-blue-100 text-sm">Provide feedback on test execution results</p>
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
            {/* Feedback Options */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Feedback Type</h3>
              <div className="grid grid-cols-3 gap-4">
                <button
                  onClick={() => setFeedbackType("approve")}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    feedbackType === "approve"
                      ? "border-green-500 bg-green-50 text-green-700"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <CheckCircle className="h-6 w-6 mx-auto mb-2" />
                  <div className="font-medium">Approve Results</div>
                  <div className="text-sm text-gray-600">Tests executed successfully</div>
                </button>
                
                <button
                  onClick={() => setFeedbackType("rerun")}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    feedbackType === "rerun"
                      ? "border-yellow-500 bg-yellow-50 text-yellow-700"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <AlertCircle className="h-6 w-6 mx-auto mb-2" />
                  <div className="font-medium">Request Rerun</div>
                  <div className="text-sm text-gray-600">Rerun specific tests</div>
                </button>
                
                <button
                  onClick={() => setFeedbackType("investigate")}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    feedbackType === "investigate"
                      ? "border-red-500 bg-red-50 text-red-700"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <MessageSquare className="h-6 w-6 mx-auto mb-2" />
                  <div className="font-medium">Investigate</div>
                  <div className="text-sm text-gray-600">Review failed tests</div>
                </button>
              </div>
            </div>

            {/* Test Categories Selection */}
            {(feedbackType === "rerun" || feedbackType === "investigate") && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Test Categories</h3>
                <div className="space-y-3">
                  {testCategories.map((category) => (
                    <div
                      key={category.id}
                      onClick={() => toggleTestSelection(category.id)}
                      className={`p-4 rounded-lg border cursor-pointer transition-all ${
                        selectedTests.includes(category.id)
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            checked={selectedTests.includes(category.id)}
                            onChange={() => {}}
                            className="w-4 h-4"
                          />
                          <div>
                            <div className="font-medium">{category.name}</div>
                            <div className="text-sm text-gray-600">{category.count} tests</div>
                          </div>
                        </div>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          category.status === 'passed' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {category.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Comments */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Comments & Instructions
              </label>
              <textarea
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder={
                  feedbackType === "approve" ? "Add any approval notes..." :
                  feedbackType === "rerun" ? "Specify rerun requirements..." :
                  "Describe investigation requirements..."
                }
                className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={6}
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <button
                onClick={onClose}
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitFeedback}
                className={`px-6 py-3 rounded-lg text-white font-medium transition-colors ${
                  feedbackType === "approve" ? "bg-green-600 hover:bg-green-700" :
                  feedbackType === "rerun" ? "bg-yellow-600 hover:bg-yellow-700" :
                  "bg-red-600 hover:bg-red-700"
                }`}
              >
                Submit {feedbackType === "approve" ? "Approval" : feedbackType === "rerun" ? "Rerun Request" : "Investigation"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestExecutionAgentFeedback;