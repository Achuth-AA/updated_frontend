import { useState } from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import WorkflowTracker from "./WorkflowTracker";
import AgentHealthCard from "./AgentHealthCard";

const orchestratorMetrics = [
  { 
    label: "Active Agents", 
    value: "13", 
    color: "text-blue-600",
    bgColor: "bg-blue-50"
  },
  { 
    label: "Active Workflows", 
    value: "3", 
    color: "text-purple-600",
    bgColor: "bg-purple-50"
  },
  { 
    label: "Completed today", 
    value: "8", 
    color: "text-green-600",
    bgColor: "bg-green-50"
  },
  { 
    label: "Success Rate", 
    value: "94%", 
    color: "text-emerald-600",
    bgColor: "bg-emerald-50"
  },
  { 
    label: "Resource Usage", 
    value: "58%", 
    color: "text-orange-600",
    bgColor: "bg-orange-50"
  },
];

const subNavTabs = [
  { id: "workflow-tracker", label: "Workflow Tracker" },
  { id: "agent-health", label: "Agent Health" },
  { id: "active-workflows", label: "Active Workflows" },
  { id: "system-monitoring", label: "System Monitoring" },
];

const agentHealthData = [
  {
    name: "Connector Agent",
    health: 98,
    load: 45,
    status: "healthy"
  },
  {
    name: "Test Review Agent",
    health: 96,
    load: 62,
    status: "healthy"
  },
  {
    name: "Test Generator Agent",
    health: 94,
    load: 78,
    status: "healthy"
  },
  {
    name: "Test Data Agent",
    health: 99,
    load: 33,
    status: "healthy"
  },
  {
    name: "Script Generator Agent",
    health: 92,
    load: 89,
    status: "warning"
  },
  {
    name: "Test Execution Agent",
    health: 100,
    load: 12,
    status: "healthy"
  },
  {
    name: "Reporting Agent",
    health: 100,
    load: 8,
    status: "healthy"
  },
  {
    name: "Failure Analysis Agent",
    health: 98,
    load: 15,
    status: "healthy"
  },
  {
    name: "Defect Triaging Agent",
    health: 97,
    load: 22,
    status: "healthy"
  },
  {
    name: "Self-healing Agent",
    health: 100,
    load: 5,
    status: "healthy"
  },
  {
    name: "DevOps Connector Agent",
    health: 95,
    load: 56,
    status: "healthy"
  },
  {
    name: "QA Env Readiness Agent",
    health: 92,
    load: 51,
    status: "warning"
  },
  {
    name: "Agent Orchestrator",
    health: 93,
    load: 67,
    status: "healthy"
  }
];

function OrchestratorTab() {
  const [activeSubTab, setActiveSubTab] = useState("workflow-tracker");

  const renderContent = () => {
    switch (activeSubTab) {
      case "workflow-tracker":
        return <WorkflowTracker />;
      case "agent-health":
        return (
          <div className="bg-gray-50 min-h-full p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Agent Health</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {agentHealthData.map((agent, index) => (
                <AgentHealthCard key={index} agent={agent} />
              ))}
            </div>
          </div>
        );
      case "active-workflows":
        return (
          <div className="bg-gray-50 min-h-full p-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Workflows</h3>
              <p className="text-gray-600">Active workflows view coming soon...</p>
            </div>
          </div>
        );
      case "system-monitoring":
        return (
          <div className="bg-gray-50 min-h-full p-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">System Monitoring</h3>
              <p className="text-gray-600">System monitoring dashboard coming soon...</p>
            </div>
          </div>
        );
      default:
        return <WorkflowTracker />;
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Metrics Bar */}
      <div className="px-6 py-4 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between">
          {orchestratorMetrics.map((metric, index) => (
            <div key={index} className="flex items-center">
              <div className="flex items-center gap-2">
                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-1">{metric.label}</p>
                  <p className={`text-3xl font-bold ${metric.color}`}>{metric.value}</p>
                </div>
                {index < orchestratorMetrics.length - 1 && (
                  <ArrowRight className="w-5 h-5 text-blue-400 mx-4" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sub Navigation */}
      <div className="px-6 py-3 bg-white border-b border-gray-200">
        <div className="flex gap-6">
          {subNavTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id)}
              className={`pb-2 text-sm font-medium transition-all relative ${
                activeSubTab === tab.id
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 bg-gray-50 overflow-auto">
        {renderContent()}
      </div>
    </div>
  );
}

export default OrchestratorTab;