import { useState } from "react";
import { X, Bug, CheckCircle, AlertTriangle, Shield } from "lucide-react";

const BugDetectorAgentFeedback = ({ agent, onClose }) => {
  const [feedbackType, setFeedbackType] = useState("approve");
  const [comments, setComments] = useState("");
  const [selectedBugs, setSelectedBugs] = useState([]);
  
  const bugCategories = [
    { id: "critical", name: "Critical Vulnerabilities", count: 3, severity: "critical" },
    { id: "high", name: "High Priority Bugs", count: 8, severity: "high" },
    { id: "medium", name: "Medium Issues", count: 9, severity: "medium" },
    { id: "false-positive", name: "False Positives", count: 2, severity: "low" }
  ];

  const handleSubmitFeedback = () => {
    console.log("Bug Detector Feedback:", {
      type: feedbackType,
      comments,
      selectedBugs,
      agent: agent.name
    });
    onClose();
  };

  const toggleBugSelection = (bugId) => {
    setSelectedBugs(prev => 
      prev.includes(bugId) 
        ? prev.filter(id => id !== bugId)
        : [...prev, bugId]
    );
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "critical": return "bg-red-100 text-red-800";
      case "high": return "bg-orange-100 text-orange-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "low": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-red-600">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Bug className="h-6 w-6 text-white" />
              <div>
                <h2 className="text-xl font-semibold text-white">Bug Detection Feedback</h2>
                <p className="text-red-100 text-sm">Review and provide feedback on detected issues</p>
              </div>
            </div>
            <button onClick={onClose} className="text-white hover:text-red-200">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-150px)]">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Action Required</h3>
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
                  <div className="font-medium">Approve Findings</div>
                  <div className="text-sm text-gray-600">Confirm detected issues</div>
                </button>
                
                <button
                  onClick={() => setFeedbackType("prioritize")}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    feedbackType === "prioritize"
                      ? "border-yellow-500 bg-yellow-50 text-yellow-700"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <AlertTriangle className="h-6 w-6 mx-auto mb-2" />
                  <div className="font-medium">Prioritize Fixes</div>
                  <div className="text-sm text-gray-600">Set fix priorities</div>
                </button>
                
                <button
                  onClick={() => setFeedbackType("dispute")}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    feedbackType === "dispute"
                      ? "border-red-500 bg-red-50 text-red-700"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <Shield className="h-6 w-6 mx-auto mb-2" />
                  <div className="font-medium">Dispute Issues</div>
                  <div className="text-sm text-gray-600">Mark false positives</div>
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Issue Categories</h3>
              <div className="space-y-3">
                {bugCategories.map((category) => (
                  <div
                    key={category.id}
                    onClick={() => toggleBugSelection(category.id)}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      selectedBugs.includes(category.id)
                        ? "border-red-500 bg-red-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={selectedBugs.includes(category.id)}
                          onChange={() => {}}
                          className="w-4 h-4"
                        />
                        <div>
                          <div className="font-medium">{category.name}</div>
                          <div className="text-sm text-gray-600">{category.count} issues detected</div>
                        </div>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getSeverityColor(category.severity)}`}>
                        {category.severity}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Security Review Comments
              </label>
              <textarea
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder="Add security review notes, fix recommendations, or dispute reasoning..."
                className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                rows={6}
              />
            </div>

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
                  feedbackType === "prioritize" ? "bg-yellow-600 hover:bg-yellow-700" :
                  "bg-red-600 hover:bg-red-700"
                }`}
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BugDetectorAgentFeedback;