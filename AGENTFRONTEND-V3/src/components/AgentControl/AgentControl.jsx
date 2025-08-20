import { useState } from "react";
import { agentData, performanceData } from "./agentData";
import agentTabMapping from "./agentTabMapping";
import { Users, TrendingUp, AlertTriangle, CheckSquare, Clock, Zap, BarChart3, GitBranch } from "lucide-react";
import MyAssignedTasks from "./MyAssignedTasks";
import { MetricData } from "../../utils/metricData";
import AgentTabs from "./AgentTabs";
import AgentCard from "./AgentCard";
import AgentPerformanceCard from "./AgentPerformanceCard";
import TaskOverview from "./TaskOverview";
import ExceptionsCard from "./ExceptionsCard";
import NavigationTabs from "../cards/NavigationTabs";
import {
  AIAGENTSNAVTABS,
  LIFECYCLEMANAGEMENT,
  projectLifecycleData,
  tasks,
} from "../../utils/data";
import MetricCardList from "../UI/MetricCardList";
import AgentEcosystem from "../cards/AgentEcosystem";
import AutonomousAssisted from "../cards/AutonomousAssisted";
import ProjectDetailedCard from "../cards/ProjectDetailedCard";

const getInitialTab = (section) => {
  if (section === "agent-tasks" || section === "agent-exception") {
    return "lifecycle";
  }
  return "agents";
};

function AgentControl({ activeSection }) {
  const [activeTab, setActiveTab] = useState(() =>
    getInitialTab(activeSection)
  );
  const [activeAgentTab, setActiveAgentTab] = useState("all");
  // Filter agents based on active tab
  const getFilteredAgents = () => {
    if (!activeAgentTab || activeAgentTab === "all") return agentData;

    const mappedAgents = agentTabMapping[activeAgentTab] || [];

    return agentData.filter((agent) => mappedAgents.includes(agent.name));
  };

  const filteredAgents = getFilteredAgents();

  const handleSectionTabChange = (section) => {
    switch (section) {
      case "agent-tasks":
      case "agent-exception":
        return (
          <>
            <AutonomousAssisted />
            <NavigationTabs
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              tabs={LIFECYCLEMANAGEMENT}
            />
          </>
        );
      case "agent-control":
        return (
          <>
            <AgentEcosystem />
            <NavigationTabs
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              tabs={AIAGENTSNAVTABS}
            />
          </>
        );
      default:
        return (
          <>
            <AgentEcosystem />
            <NavigationTabs
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              tabs={AIAGENTSNAVTABS}
            />
          </>
        );
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Alert Notifications */}
      <div className="px-6 pt-4 flex gap-4">
        <div className="relative bg-white border border-gray-300 rounded-full flex items-center cursor-pointer hover:shadow-lg transition-shadow overflow-hidden">
          <div className="bg-red-500 px-4 py-3 rounded-l-full">
            <div className="w-6 h-6"></div>
          </div>
          <div className="px-4 py-2 flex items-center gap-3">
            <div className="flex flex-col">
              <span className="text-gray-800 font-semibold text-sm">Critical Issue</span>
              <span className="text-gray-600 text-xs">Immediate attention required</span>
            </div>
            <span className="text-red-500 font-bold text-xl mx-2">1</span>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
        <div className="relative bg-white border border-gray-300 rounded-full flex items-center cursor-pointer hover:shadow-lg transition-shadow overflow-hidden">
          <div className="bg-orange-500 px-4 py-3 rounded-l-full">
            <div className="w-6 h-6"></div>
          </div>
          <div className="px-4 py-2 flex items-center gap-3">
            <div className="flex flex-col">
              <span className="text-gray-800 font-semibold text-sm">Pending tasks</span>
              <span className="text-gray-600 text-xs">Immediate attention required</span>
            </div>
            <span className="text-orange-500 font-bold text-xl mx-2">2</span>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className=" px-6 mt-4">
        <div className="bg-custom-gradient rounded-3xl p-1" style={{ color:"white"}}>
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab("agents")}
              className={`px-6 py-2.5 rounded-3xl font-medium transition-all ${
                activeTab === "agents"
                  ? "bg-white text-blue-600"
                  : "text-white hover:bg-gray-100 hover:text-blue-600"
              }`}
            >
              Agents
            </button>
            <button
              onClick={() => setActiveTab("orchestrator")}
              className={`px-6 py-2.5 rounded-3xl font-medium transition-all ${
                activeTab === "orchestrator"
                  ? "bg-white text-blue-600"
                  : "text-white hover:bg-gray-100 hover:text-blue-600"
              }`}
            >
              Orchestrator
            </button>
            <button
              onClick={() => setActiveTab("lifecycle")}
              className={`px-6 py-2.5 rounded-3xl font-medium transition-all ${
                activeTab === "lifecycle"
                  ? "bg-white text-blue-600"
                  : "text-white hover:bg-gray-100 hover:text-blue-600"
              }`}
            >
              Lifecycle Management
            </button>
            <button
              onClick={() => setActiveTab("performance")}
              className={`px-6 py-2.5 rounded-3xl font-medium transition-all ${
                activeTab === "performance"
                  ? "bg-white text-blue-600"
                  : "text-white hover:bg-gray-100 hover:text-blue-600"
              }`}
            >
              Performance
            </button>
            <button
              onClick={() => setActiveTab("tasks")}
              className={`px-6 py-2.5 rounded-3xl font-medium transition-all ${
                activeTab === "tasks"
                  ? "bg-white text-blue-600"
                  : "text-white hover:bg-gray-100 hover:text-blue-600"
              }`}
            >
              Tasks & Workflows
            </button>
            <button
              onClick={() => setActiveTab("exceptions")}
              className={`px-6 py-2.5 rounded-3xl font-medium transition-all ${
                activeTab === "exceptions"
                  ? "bg-white text-blue-600"
                  : "text-white hover:bg-gray-100 hover:text-blue-600"
              }`}
            >
              Exceptions
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {activeTab === "agents" && (
          <div className="space-y-6">
            {/* Agent Control Header */}
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold text-gray-900">Agent Control</h2>
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            </div>

            {/* Sub-navigation Pills */}
            <AgentTabs
              activeTab={activeAgentTab}
              setActiveTab={setActiveAgentTab}
            />

            {/* Agent Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredAgents.map((agent) => (
                <AgentCard key={agent.id} agent={agent} />
              ))}
            </div>
          </div>
        )}

        {activeTab === "lifecycle" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Lifecycle Management</h2>
            {projectLifecycleData.map((data) => (
              <ProjectDetailedCard key={data.title} projectData={data} />
            ))}
          </div>
        )}
        {activeTab === "performance" && (
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-gray-700" />
              <h2 className="text-2xl font-bold text-gray-900">Agent Performance Overview</h2>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {performanceData.map((agent, index) => (
                  <AgentPerformanceCard key={index} agent={agent} />
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "orchestrator" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Orchestrator</h2>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <p className="text-gray-600">Orchestrator configuration and management</p>
            </div>
          </div>
        )}

        {activeTab === "tasks" && (
          <div className="space-y-6">
            {/* Status Cards */}
            <div className="grid grid-cols-4 gap-4">
              {/* Pending Tasks */}
              <div className="bg-white border border-gray-200 rounded-full py-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer relative overflow-hidden">
                <div className="absolute left-1 top-1 bottom-1 w-8 bg-blue-500 rounded-l-full"></div>
                <div className="flex items-center justify-between px-4 relative z-10">
                  <div className="flex items-center gap-2 ml-6">
                    <div>
                      <span className="text-xs text-blue-700 font-semibold">Pending Tasks</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-2xl font-bold text-blue-500">1</span>
                    <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* In Progress */}
              <div className="bg-white border border-gray-200 rounded-full py-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer relative overflow-hidden">
                <div className="absolute left-1 top-1 bottom-1 w-8 bg-orange-500 rounded-l-full"></div>
                <div className="flex items-center justify-between px-4 relative z-10">
                  <div className="flex items-center gap-2 ml-6">
                    <div>
                      <span className="text-xs text-orange-700 font-semibold">In Progress</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-2xl font-bold text-orange-500">1</span>
                    <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Blocked */}
              <div className="bg-white border border-gray-200 rounded-full py-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer relative overflow-hidden">
                <div className="absolute left-1 top-1 bottom-1 w-8 bg-red-500 rounded-l-full"></div>
                <div className="flex items-center justify-between px-4 relative z-10">
                  <div className="flex items-center gap-2 ml-6">
                    <div>
                      <span className="text-xs text-red-700 font-semibold">Blocked</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-2xl font-bold text-red-500">1</span>
                    <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Completed */}
              <div className="bg-white border border-gray-200 rounded-full py-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer relative overflow-hidden">
                <div className="absolute left-1 top-1 bottom-1 w-8 bg-green-500 rounded-l-full"></div>
                <div className="flex items-center justify-between px-4 relative z-10">
                  <div className="flex items-center gap-2 ml-6">
                    <div>
                      <span className="text-xs text-green-700 font-semibold">Completed</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-2xl font-bold text-green-500">1</span>
                    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900">Tasks & Workflows</h2>
            
            {/* Task Cards Grid */}
            <div className="grid grid-cols-2 gap-6">
              {/* Blocked Task - Configure Load Testing Environment */}
              <div className="bg-white rounded-3xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden border border-gray-200">
                <div className="absolute left-1 top-1 bottom-1 w-10 bg-red-500 rounded-l-2xl"></div>
                <div className="p-6 ml-8">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-2">
                      <span className="bg-red-500 text-white text-xs font-medium px-2.5 py-1 rounded-full">Blocked</span>
                      <span className="bg-gray-500 text-white text-xs font-medium px-2.5 py-1 rounded-full">high</span>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Configure Load Testing Environment</h3>
                  <p className="text-sm text-gray-600 mb-4">Setup and configuration of load testing environment - blocked by security review completion</p>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <div className="bg-blue-500 text-white text-xs font-medium px-3 py-2 rounded-full flex items-center gap-1">
                      <span>⚠️</span>
                      <span>Environment Readiness Agent</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                    <div>
                      <span className="text-gray-500 text-xs">Due Date</span>
                      <div className="font-medium text-gray-900">8/8/2025</div>
                    </div>
                    <div>
                      <span className="text-gray-500 text-xs">Estimated</span>
                      <div className="font-medium text-gray-900">6h</div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button className="flex items-center gap-1 text-xs bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 px-3 py-2 rounded-xl transition-colors">
                      <span className="text-gray-500">👁️</span>
                      <span>View Output</span>
                    </button>
                    <button className="flex items-center gap-1 text-xs bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 px-3 py-2 rounded-xl transition-colors">
                      <span className="text-gray-500">📝</span>
                      <span>Feedback</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Critical Task - Review Payment Gateway Security */}
              <div className="bg-white rounded-3xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden border border-gray-200">
                <div className="absolute left-1 top-1 bottom-1 w-10 bg-orange-500 rounded-l-2xl"></div>
                <div className="p-6 ml-8">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-2">
                      <span className="bg-orange-500 text-white text-xs font-medium px-2.5 py-1 rounded-full">Critical</span>
                      <span className="bg-blue-500 text-white text-xs font-medium px-2.5 py-1 rounded-full">needs approval</span>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Review payment gateway security test results</h3>
                  <p className="text-sm text-gray-600 mb-4">Critical security vulnerabilities detected in payment flow</p>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <div className="bg-blue-500 text-white text-xs font-medium px-3 py-2 rounded-full flex items-center gap-1">
                      <span>⚠️</span>
                      <span>Test Failure Analysis Agent</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-sm mb-4">
                    <div>
                      <span className="text-gray-500 text-xs">Due Date</span>
                      <div className="font-medium text-blue-600">August 9, 2025</div>
                    </div>
                    <div>
                      <span className="text-gray-500 text-xs">Estimated</span>
                      <div className="font-medium text-gray-900">4h</div>
                    </div>
                    <div>
                      <span className="text-gray-500 text-xs">Actual</span>
                      <div className="font-medium text-gray-900">2.5h</div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button className="flex items-center gap-1 text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-xl transition-colors">
                      <span>✓</span>
                      <span>Approve</span>
                    </button>
                    <button className="flex items-center gap-1 text-xs bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 px-3 py-2 rounded-xl transition-colors">
                      <span>✏️</span>
                      <span>Request Revision</span>
                    </button>
                    <button className="flex items-center gap-1 text-xs bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 px-3 py-2 rounded-xl transition-colors">
                      <span>🚫</span>
                      <span>Reject</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Medium Priority Task - Validate Mobile Regression */}
              <div className="bg-white rounded-3xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden border border-gray-200">
                <div className="absolute left-1 top-1 bottom-1 w-10 bg-blue-500 rounded-l-2xl"></div>
                <div className="p-6 ml-8">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-2">
                      <span className="bg-blue-500 text-white text-xs font-medium px-2.5 py-1 rounded-full">medium</span>
                      <span className="bg-yellow-500 text-white text-xs font-medium px-2.5 py-1 rounded-full">pending</span>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Validate Mobile Regression Test Cases</h3>
                  <p className="text-sm text-gray-600 mb-4">Review and validate generated test cases for mobile application regression testing</p>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <div className="bg-blue-500 text-white text-xs font-medium px-3 py-2 rounded-full flex items-center gap-1">
                      <span>⚠️</span>
                      <span>Smart Test Review Agent</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                    <div>
                      <span className="text-gray-500 text-xs">Due Date</span>
                      <div className="font-medium text-gray-900">8/12/2025</div>
                    </div>
                    <div>
                      <span className="text-gray-500 text-xs">Estimated</span>
                      <div className="font-medium text-gray-900">8h</div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button className="flex items-center gap-1 text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-xl transition-colors">
                      <span>▶️</span>
                      <span>Start</span>
                    </button>
                    <button className="flex items-center gap-1 text-xs bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 px-3 py-2 rounded-xl transition-colors">
                      <span className="text-gray-500">👁️</span>
                      <span>View Output</span>
                    </button>
                    <button className="flex items-center gap-1 text-xs bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 px-3 py-2 rounded-xl transition-colors">
                      <span className="text-gray-500">📝</span>
                      <span>Feedback</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* High Priority Task - Review API Performance */}
              <div className="bg-white rounded-3xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden border border-gray-200">
                <div className="absolute left-1 top-1 bottom-1 w-10 bg-blue-500 rounded-l-2xl"></div>
                <div className="p-6 ml-8">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-2">
                      <span className="bg-blue-500 text-white text-xs font-medium px-2.5 py-1 rounded-full">high</span>
                      <span className="bg-blue-500 text-white text-xs font-medium px-2.5 py-1 rounded-full">in progress</span>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Review API Performance Test Results</h3>
                  <p className="text-sm text-gray-600 mb-4">Analyze performance test results for API endpoints and identify bottlenecks</p>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <div className="bg-blue-500 text-white text-xs font-medium px-3 py-2 rounded-full flex items-center gap-1">
                      <span>⚠️</span>
                      <span>Test Execution Agent</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-sm mb-4">
                    <div>
                      <span className="text-gray-500 text-xs">Due Date</span>
                      <div className="font-medium text-gray-900">8/12/2025</div>
                    </div>
                    <div>
                      <span className="text-gray-500 text-xs">Estimated</span>
                      <div className="font-medium text-gray-900">3h</div>
                    </div>
                    <div>
                      <span className="text-gray-500 text-xs">Actual</span>
                      <div className="font-medium text-gray-900">1.5h</div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button className="flex items-center gap-1 text-xs bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-xl transition-colors">
                      <span>✓</span>
                      <span>Complete</span>
                    </button>
                    <button className="flex items-center gap-1 text-xs bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 px-3 py-2 rounded-xl transition-colors">
                      <span className="text-gray-500">👁️</span>
                      <span>View Output</span>
                    </button>
                    <button className="flex items-center gap-1 text-xs bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 px-3 py-2 rounded-xl transition-colors">
                      <span className="text-gray-500">📝</span>
                      <span>Feedback</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "exceptions" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Exceptions</h2>
            <ExceptionsCard />
          </div>
        )}
      </div>
    </div>
  );
}

export default AgentControl;
