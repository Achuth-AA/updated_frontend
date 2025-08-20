import { useState } from "react";
import { Check, ChevronDown, RefreshCw, Settings } from "lucide-react";

const workflowSteps = [
  { id: 1, name: "Story Scanning", completed: true, active: false },
  { id: 2, name: "Test Case Review", completed: true, active: false },
  { id: 3, name: "Test Case Generation", completed: true, active: false },
  { id: 4, name: "Test Data Preparation", completed: true, active: false },
  { id: 5, name: "Initial Review", completed: false, active: true },
  { id: 6, name: "Script Generation", completed: false, active: false },
  { id: 7, name: "Script Validation", completed: false, active: false },
  { id: 8, name: "Environment Readiness", completed: false, active: false },
  { id: 9, name: "DevOps Integration", completed: false, active: false },
  { id: 10, name: "Test Execution", completed: false, active: false },
  { id: 11, name: "Test Reporting", completed: false, active: false },
  { id: 12, name: "Failure Analysis", completed: false, active: false },
  { id: 13, name: "Defect Triage", completed: false, active: false },
  { id: 14, name: "Self Healing", completed: false, active: false },
  { id: 15, name: "Gen Tests Notification", completed: false, active: false },
];

function WorkflowTracker() {
  const [selectedSprint, setSelectedSprint] = useState("1");
  const [selectedFeature, setSelectedFeature] = useState("User Registration");

  return (
    <div className="bg-gray-50 min-h-full p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Workflow Tracker</h2>
      
      <div className="grid grid-cols-12 gap-6">
        {/* Left Column - Workflow Steps List */}
        <div className="col-span-3">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            {/* Dropdowns */}
            <div className="space-y-3 mb-6">
              <div className="relative">
                <button className="w-full flex items-center justify-between px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
                  <span className="font-medium text-gray-700">Sprint</span>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-900">{selectedSprint}</span>
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  </div>
                </button>
              </div>
              <div className="relative">
                <button className="w-full flex items-center justify-between px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
                  <span className="font-medium text-gray-700">Feature</span>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-900">{selectedFeature}</span>
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  </div>
                </button>
              </div>
            </div>

            {/* Workflow Steps */}
            <div className="space-y-2">
              {workflowSteps.map((step) => (
                <div
                  key={step.id}
                  className={`flex items-center gap-3 p-2 rounded-lg transition-all ${
                    step.active ? "bg-blue-50 border border-blue-200" : "hover:bg-gray-50"
                  }`}
                >
                  {/* Step Number Circle */}
                  <div className="flex-shrink-0">
                    {step.completed ? (
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    ) : step.active ? (
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-xs text-white font-semibold">{step.id}</span>
                      </div>
                    ) : (
                      <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                        <span className="text-xs text-gray-600 font-semibold">{step.id}</span>
                      </div>
                    )}
                  </div>

                  {/* Step Name */}
                  <span className={`text-sm ${
                    step.completed 
                      ? "text-gray-700 font-medium" 
                      : step.active
                      ? "text-blue-700 font-medium"
                      : "text-gray-500"
                  }`}>
                    {step.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Center Column - Current Step Details */}
        <div className="col-span-5">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="bg-blue-50 rounded-xl border border-blue-200 p-6">
              {/* Step Header */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-semibold text-gray-700">Step 1:</span>
                  <span className="text-lg font-semibold text-blue-700">Story Scanning</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>connector_agent</span>
                </div>
              </div>
              
              {/* Description */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Description</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Scans Jira® (JIRA) for new/modified stories related to use case
                </p>
              </div>

              {/* Status */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Status</h4>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  completed
                </span>
              </div>

              {/* Human Review Actions */}
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Human Review Actions</h4>
                <div className="flex gap-3">
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                    View Details
                  </button>
                  <button className="px-4 py-2 bg-white border border-blue-600 text-blue-600 text-sm font-medium rounded-lg hover:bg-blue-50 transition-colors">
                    Give Feedback
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - AI Workflow Visualization */}
        <div className="col-span-4">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            {/* Header */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Agent Workflow Visualisation</h3>
              <p className="text-sm text-gray-600 mb-1">
                Real-time 15-step testing automation process
              </p>
              <p className="text-xs text-gray-500">ID: workflow-001</p>
            </div>

            {/* Progress Info */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-xs text-gray-500">Agent Progress</p>
                <p className="text-2xl font-bold text-gray-900">4/15 steps</p>
              </div>
              <div className="flex items-center gap-1 text-xs">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-gray-500">live</span>
              </div>
            </div>

            {/* Currently Active Card */}
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-3">Currently Active:</h4>
              <div className="bg-blue-50 rounded-xl border border-blue-200 p-4">
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h5 className="text-base font-semibold text-gray-900 mb-1">Initial Review</h5>
                    <p className="text-sm text-gray-600">Step 5: Agent Orchestrator</p>
                  </div>
                  <span className="text-xs text-blue-600 font-medium bg-blue-100 px-2 py-1 rounded">In progress</span>
                </div>
                
                {/* Timer */}
                <div className="text-center mb-4">
                  <p className="text-3xl font-bold text-gray-900">30:90</p>
                  <p className="text-xs text-gray-500">seconds</p>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  Orchestrates review with SME for generated test cases
                </p>

                {/* Status Footer */}
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 text-blue-600 animate-spin" />
                    <span className="text-blue-600 font-medium">Processing</span>
                  </div>
                  <span className="text-gray-500">Latest update: 8:20:19 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WorkflowTracker;