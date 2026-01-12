import React, { useState, useEffect } from 'react';
import { Network, Check, AlertCircle, Radio, Users } from 'lucide-react';
import { Card, Button, Badge } from '../ui';
import { policyNavigatorAPI } from '../../services/api';
import toast from 'react-hot-toast';

const AgentNetwork = () => {
  const [networkStatus, setNetworkStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [testingCommunication, setTestingCommunication] = useState(false);
  const [communicationResult, setCommunicationResult] = useState(null);

  useEffect(() => {
    fetchNetworkStatus();
  }, []);

  const fetchNetworkStatus = async () => {
    setLoading(true);
    try {
      const response = await policyNavigatorAPI.getAgentsStatus();
      setNetworkStatus(response);
    } catch (error) {
      toast.error('Failed to fetch network status');
      console.error('Status error:', error);
    } finally {
      setLoading(false);
    }
  };

  const testCommunication = async () => {
    setTestingCommunication(true);
    try {
      const response = await fetch('http://localhost:8000/api/agents/test-communication', {
        method: 'POST',
      });
      const result = await response.json();
      setCommunicationResult(result);
      toast.success('Agent communication test successful!');
    } catch (error) {
      toast.error('Communication test failed');
      console.error('Test error:', error);
    } finally {
      setTestingCommunication(false);
    }
  };

  const getStatusColor = (mode) => {
    if (mode === 'simulation') return 'bg-yellow-500';
    if (mode === 'real_network' || mode === 'real') return 'bg-green-500';
    return 'bg-gray-500';
  };

  const getStatusText = (mode) => {
    if (mode === 'simulation') return 'Simulation';
    if (mode === 'real_network' || mode === 'real') return 'Live Network';
    return 'Unknown';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-primary-100 rounded-lg">
          <Network className="w-6 h-6 text-primary-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Agent Network</h2>
          <p className="text-gray-600">Monitor and test multi-agent communication</p>
        </div>
      </div>

      {/* Network Overview */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Users className="w-5 h-5" />
            Network Status
          </h3>
          <Button 
            variant="secondary" 
            size="sm" 
            onClick={fetchNetworkStatus}
            loading={loading}
          >
            Refresh
          </Button>
        </div>

        {networkStatus && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Policy Parser */}
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">Policy Parser</h4>
                  {networkStatus.agents?.policy_parser && (
                    <Badge variant={networkStatus.agents.policy_parser.mode === 'simulation' ? 'warning' : 'success'}>
                      {getStatusText(networkStatus.agents.policy_parser.mode)}
                    </Badge>
                  )}
                </div>
                {networkStatus.agents?.policy_parser && (
                  <div className="text-sm text-gray-600">
                    <div className="flex items-center gap-2 mt-1">
                      <div className={`w-2 h-2 rounded-full ${getStatusColor(networkStatus.agents.policy_parser.mode)}`} />
                      <span>Connected</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Eligibility Verifier */}
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">Eligibility Verifier</h4>
                  {networkStatus.agents?.eligibility_verifier && (
                    <Badge variant={networkStatus.agents.eligibility_verifier.mode === 'simulation' ? 'warning' : 'success'}>
                      {getStatusText(networkStatus.agents.eligibility_verifier.mode)}
                    </Badge>
                  )}
                </div>
                {networkStatus.agents?.eligibility_verifier && (
                  <div className="text-sm text-gray-600">
                    <div className="flex items-center gap-2 mt-1">
                      <div className={`w-2 h-2 rounded-full ${getStatusColor(networkStatus.agents.eligibility_verifier.mode)}`} />
                      <span>Connected</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Benefit Matcher */}
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">Benefit Matcher</h4>
                  {networkStatus.agents?.benefit_matcher && (
                    <Badge variant={networkStatus.agents.benefit_matcher.mode === 'simulation' ? 'warning' : 'success'}>
                      {getStatusText(networkStatus.agents.benefit_matcher.mode)}
                    </Badge>
                  )}
                </div>
                {networkStatus.agents?.benefit_matcher && (
                  <div className="text-sm text-gray-600">
                    <div className="flex items-center gap-2 mt-1">
                      <div className={`w-2 h-2 rounded-full ${getStatusColor(networkStatus.agents.benefit_matcher.mode)}`} />
                      <span>Connected</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Citizen Advocate */}
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">Citizen Advocate</h4>
                  {networkStatus.agents?.citizen_advocate && (
                    <Badge variant={networkStatus.agents.citizen_advocate.mode === 'simulation' ? 'warning' : 'success'}>
                      {getStatusText(networkStatus.agents.citizen_advocate.mode)}
                    </Badge>
                  )}
                </div>
                {networkStatus.agents?.citizen_advocate && (
                  <div className="text-sm text-gray-600">
                    <div className="flex items-center gap-2 mt-1">
                      <div className={`w-2 h-2 rounded-full ${getStatusColor(networkStatus.agents.citizen_advocate.mode)}`} />
                      <span>Connected</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {networkStatus.network && (
              <div className="bg-gray-50 rounded-lg p-4 mt-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Communication Mode:</span>
                  <Badge variant={networkStatus.network.communication_mode === 'simulation' ? 'warning' : 'success'}>
                    {networkStatus.network.communication_mode === 'simulation' ? 'Simulation Mode' : 'MQTT Network'}
                  </Badge>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm font-medium text-gray-700">Total Agents:</span>
                  <span className="text-sm text-gray-900">{networkStatus.total_agents || 4}</span>
                </div>
              </div>
            )}
          </div>
        )}
      </Card>

      {/* Test Communication */}
      <Card>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Radio className="w-5 h-5" />
          Test Agent Communication
        </h3>
        
        <p className="text-gray-600 mb-4">
          Run a test workflow that involves all 4 agents communicating in sequence:
        </p>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <div className="flex items-center gap-2 text-blue-900 font-medium mb-2">
            <Network className="w-4 h-4" />
            Test Workflow
          </div>
          <div className="text-sm text-blue-800 space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-blue-600">1.</span>
              <span>Policy Parser analyzes document</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-blue-600">2.</span>
              <span>Eligibility Verifier checks criteria</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-blue-600">3.</span>
              <span>Benefit Matcher finds schemes</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-blue-600">4.</span>
              <span>Citizen Advocate generates guidance</span>
            </div>
          </div>
        </div>

        <Button onClick={testCommunication} loading={testingCommunication}>
          <Radio className="w-4 h-4" />
          Run Communication Test
        </Button>

        {communicationResult && (
          <div className="mt-4 border-l-4 border-green-500 bg-green-50 p-4 rounded">
            <div className="flex items-center gap-2 mb-2">
              <Check className="w-5 h-5 text-green-600" />
              <span className="font-semibold text-green-900">
                {communicationResult.message || 'Test completed successfully!'}
              </span>
            </div>
            
            {communicationResult.test_result?.steps && (
              <div className="mt-3 space-y-2">
                <p className="text-sm font-medium text-green-900">Execution Steps:</p>
                {communicationResult.test_result.steps.map((step, idx) => (
                  <div key={idx} className="text-sm text-green-800 flex items-center gap-2">
                    <Check className="w-3 h-3" />
                    <span>{step.agent}</span>
                    <Badge variant={step.mode === 'simulation' ? 'warning' : 'success'} size="sm">
                      {step.mode}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </Card>

      {/* Info Card */}
      <Card className="bg-yellow-50 border border-yellow-200">
        <div className="flex items-start gap-2">
          <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-yellow-900 mb-1">About Agent Modes</h4>
            <ul className="text-sm text-yellow-800 space-y-1">
              <li><strong>Simulation Mode:</strong> Agents run locally, communication is simulated. Fully functional for development.</li>
              <li><strong>MQTT Network:</strong> Agents communicate via distributed MQTT protocol for real-world deployment.</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AgentNetwork;
