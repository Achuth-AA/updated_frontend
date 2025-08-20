import TestScriptAgentOutput from "./DynamicOutputs/TestScriptAgentOutput";
import TestCaseGeneratorAgentOutput from "./DynamicOutputs/TestCaseGeneratorAgentOutput";
import GenericAgentOutput from "./DynamicOutputs/GenericAgentOutput";

// Agent type mapping for dynamic routing
const AGENT_TYPE_MAPPING = {
  "Test Script Generator": "TestScriptAgent",
  "Script Generator Agent": "TestScriptAgent", 
  "Test Case Generator": "TestCaseGeneratorAgent",
  "TestCase Generator Agent": "TestCaseGeneratorAgent",
  "Test Case Review Agent": "TestCaseGeneratorAgent",
  
  // Generic agents (will use dummy data)
  "Test Execution Agent": "GenericAgent",
  "Performance Monitor Agent": "GenericAgent", 
  "Bug Detector Agent": "GenericAgent",
  "Environment Setup Agent": "GenericAgent",
  "Data Validation Agent": "GenericAgent",
  "Reporting Agent": "GenericAgent",
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
      
    case "GenericAgent":
    default:
      return <GenericAgentOutput agentName={agent.name} onClose={onClose} />;
  }
}

export default AgentOutputManager;