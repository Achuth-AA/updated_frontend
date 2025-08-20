import TestExecutionAgentFeedback from "./DynamicFeedbacks/TestExecutionAgentFeedback";
import BugDetectorAgentFeedback from "./DynamicFeedbacks/BugDetectorAgentFeedback";
import GenericAgentFeedback from "./DynamicFeedbacks/GenericAgentFeedback";

// Agent type mapping for feedback routing (same as output mapping)
const AGENT_FEEDBACK_MAPPING = {
  "Test Script Generator": "TestScriptAgent",
  "Script Generator Agent": "TestScriptAgent", 
  "Test Case Generator": "TestCaseGeneratorAgent",
  "TestCase Generator Agent": "TestCaseGeneratorAgent",
  "Test Case Review Agent": "TestCaseGeneratorAgent",
  
  // Specific agent feedbacks
  "Test Execution Agent": "TestExecutionAgent",
  "Performance Monitor Agent": "PerformanceMonitorAgent", 
  "Bug Detector Agent": "BugDetectorAgent",
  "Environment Setup Agent": "EnvironmentSetupAgent",
  "Reporting Agent": "ReportingAgent",
  
  // Generic agents (will use generic feedback)
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

function AgentFeedbackManager({ agent, onClose }) {
  if (!agent) {
    return null;
  }

  // Determine agent type based on agent name
  const agentType = AGENT_FEEDBACK_MAPPING[agent.name] || "GenericAgent";
  
  // Route to appropriate feedback component based on agent type
  switch (agentType) {
    case "TestExecutionAgent":
      return <TestExecutionAgentFeedback agent={agent} onClose={onClose} />;
      
    case "BugDetectorAgent":
      return <BugDetectorAgentFeedback agent={agent} onClose={onClose} />;
      
    case "TestScriptAgent":
    case "TestCaseGeneratorAgent":
    case "PerformanceMonitorAgent":
    case "EnvironmentSetupAgent":
    case "ReportingAgent":
    case "GenericAgent":
    default:
      return <GenericAgentFeedback agentName={agent.name} onClose={onClose} />;
  }
}

export default AgentFeedbackManager;