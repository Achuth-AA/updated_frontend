import TestScriptAgentOutput from "./DynamicOutputs/TestScriptAgentOutput";
import TestCaseGeneratorAgentOutput from "./DynamicOutputs/TestCaseGeneratorAgentOutput";
import GenericAgentOutput from "./DynamicOutputs/GenericAgentOutput";
import TestExecutionAgentOutput from "./DynamicOutputs/TestExecutionAgentOutput";
import PerformanceMonitorAgentOutput from "./DynamicOutputs/PerformanceMonitorAgentOutput";
import BugDetectorAgentOutput from "./DynamicOutputs/BugDetectorAgentOutput";
import EnvironmentSetupAgentOutput from "./DynamicOutputs/EnvironmentSetupAgentOutput";
import ReportingAgentOutput from "./DynamicOutputs/ReportingAgentOutput";

// Agent type mapping for dynamic routing
const AGENT_TYPE_MAPPING = {
  "Test Script Generator": "TestScriptAgent",
  "Script Generator Agent": "TestScriptAgent", 
  "Test Case Generator": "TestCaseGeneratorAgent",
  "TestCase Generator Agent": "TestCaseGeneratorAgent",
  "Test Case Review Agent": "TestCaseGeneratorAgent",
  
  // Specific agent outputs
  "Test Execution Agent": "TestExecutionAgent",
  "Performance Monitor Agent": "PerformanceMonitorAgent", 
  "Bug Detector Agent": "BugDetectorAgent",
  "Environment Setup Agent": "EnvironmentSetupAgent",
  "Reporting Agent": "ReportingAgent",
  
  // Generic agents (will use dummy data)
  "Data Validation Agent": "GenericAgent",
  "Connector Agent": "GenericAgent",
  "Test Review Agent": "GenericAgent",
  "Test Data Agent": "GenericAgent",
  "Failure Analysis Agent": "GenericAgent",
  "Defect Triaging Agent": "GenericAgent",
  "Self-healing Agent": "GenericAgent",
  "DevOps Connector Agent": "GenericAgent",
  "QA Env Readiness Agent": "GenericAgent",
  "Agent Orchestrator": "GenericAgent",
};

function AgentOutputManager({ agent, onClose }) {
  if (!agent) {
    return null;
  }

  // Determine agent type based on agent name
  const agentType = AGENT_TYPE_MAPPING[agent.name] || "GenericAgent";
  
  // Route to appropriate component based on agent type
  switch (agentType) {
    case "TestScriptAgent":
      return <TestScriptAgentOutput agent={agent} onClose={onClose} />;
      
    case "TestCaseGeneratorAgent":
      return <TestCaseGeneratorAgentOutput agent={agent} onClose={onClose} />;
      
    case "TestExecutionAgent":
      return <TestExecutionAgentOutput agent={agent} onClose={onClose} />;
      
    case "PerformanceMonitorAgent":
      return <PerformanceMonitorAgentOutput agent={agent} onClose={onClose} />;
      
    case "BugDetectorAgent":
      return <BugDetectorAgentOutput agent={agent} onClose={onClose} />;
      
    case "EnvironmentSetupAgent":
      return <EnvironmentSetupAgentOutput agent={agent} onClose={onClose} />;
      
    case "ReportingAgent":
      return <ReportingAgentOutput agent={agent} onClose={onClose} />;
      
    case "GenericAgent":
    default:
      return <GenericAgentOutput agentName={agent.name} onClose={onClose} />;
  }
}

export default AgentOutputManager;