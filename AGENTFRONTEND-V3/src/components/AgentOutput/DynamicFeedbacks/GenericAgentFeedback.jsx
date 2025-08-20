import { useState } from "react";
import { X, CheckCircle, AlertTriangle, MessageSquare } from "lucide-react";

const GenericAgentFeedback = ({ agentName, onClose }) => {
  const [feedbackType, setFeedbackType] = useState("approve");
  const [comments, setComments] = useState("");
  const [rating, setRating] = useState(5);
  
  const handleSubmitFeedback = () => {
    console.log("Generic Agent Feedback:", {
      type: feedbackType,
      comments,
      rating,
      agentName
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-blue-600">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white">{agentName} Feedback</h2>
              <p className="text-blue-100 text-sm">Provide feedback on agent performance</p>
            </div>
            <button onClick={onClose} className="text-white hover:text-blue-200">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-150px)]">
          <div className="space-y-6">
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
                  <div className="font-medium">Approve</div>
                  <div className="text-sm text-gray-600">Agent performed well</div>
                </button>
                
                <button
                  onClick={() => setFeedbackType("improve")}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    feedbackType === "improve"
                      ? "border-yellow-500 bg-yellow-50 text-yellow-700"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <AlertTriangle className="h-6 w-6 mx-auto mb-2" />
                  <div className="font-medium">Needs Improvement</div>
                  <div className="text-sm text-gray-600">Suggest improvements</div>
                </button>
                
                <button
                  onClick={() => setFeedbackType("discuss")}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    feedbackType === "discuss"
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <MessageSquare className="h-6 w-6 mx-auto mb-2" />
                  <div className="font-medium">Discuss</div>
                  <div className="text-sm text-gray-600">Request clarification</div>
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Rating</h3>
              <div className="flex items-center space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className={`text-2xl transition-colors ${
                      star <= rating ? "text-yellow-400" : "text-gray-300"
                    }`}
                  >
                    ★
                  </button>
                ))}
                <span className="ml-3 text-sm text-gray-600">({rating}/5 stars)</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Comments & Suggestions
              </label>
              <textarea
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder="Provide detailed feedback about the agent's performance..."
                className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={8}
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
                  feedbackType === "improve" ? "bg-yellow-600 hover:bg-yellow-700" :
                  "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                Submit Feedback
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenericAgentFeedback;