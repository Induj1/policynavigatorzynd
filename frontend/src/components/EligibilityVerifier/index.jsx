import React, { useState } from 'react';
import { Shield, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { Card, Button, Input, Badge } from '../ui';
import { policyNavigatorAPI } from '../../services/api';
import toast from 'react-hot-toast';

const EligibilityVerifier = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  // Citizen Profile
  const [citizenProfile, setCitizenProfile] = useState({
    name: '',
    age: '',
    income: '',
    occupation: '',
    state: '',
    category: '',
  });

  // Scheme Criteria
  const [schemeCriteria, setSchemeCriteria] = useState({
    scheme_name: '',
    min_age: '',
    max_age: '',
    max_income: '',
    eligible_categories: '',
    eligible_states: '',
  });

  const handleVerify = async () => {
    // Basic validation
    if (!citizenProfile.age || !schemeCriteria.scheme_name) {
      toast.error('Please fill in required fields');
      return;
    }

    setLoading(true);
    try {
      // Convert string inputs to appropriate types
      const profile = {
        ...citizenProfile,
        age: parseInt(citizenProfile.age) || 0,
        income: parseFloat(citizenProfile.income) || 0,
      };

      const criteria = {
        ...schemeCriteria,
        min_age: parseInt(schemeCriteria.min_age) || 0,
        max_age: parseInt(schemeCriteria.max_age) || 999,
        max_income: parseFloat(schemeCriteria.max_income) || 0,
        eligible_categories: schemeCriteria.eligible_categories.split(',').map(c => c.trim()).filter(Boolean),
        eligible_states: schemeCriteria.eligible_states.split(',').map(s => s.trim()).filter(Boolean),
      };

      const response = await policyNavigatorAPI.verifyEligibility(profile, criteria);
      setResult(response.data);
      
      if (response.data.eligible) {
        toast.success('Citizen is eligible!');
      } else {
        toast.error('Citizen is not eligible');
      }
    } catch (error) {
      toast.error('Failed to verify eligibility: ' + (error.response?.data?.detail || error.message));
      console.error('Verification error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setCitizenProfile({
      name: '',
      age: '',
      income: '',
      occupation: '',
      state: '',
      category: '',
    });
    setSchemeCriteria({
      scheme_name: '',
      min_age: '',
      max_age: '',
      max_income: '',
      eligible_categories: '',
      eligible_states: '',
    });
    setResult(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-green-100 rounded-lg">
          <Shield className="w-6 h-6 text-green-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Eligibility Verifier</h2>
          <p className="text-gray-600">Check if a citizen qualifies for a government scheme</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Citizen Profile */}
        <Card>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span className="w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm">1</span>
            Citizen Profile
          </h3>

          <Input
            label="Name"
            placeholder="Enter citizen name"
            value={citizenProfile.name}
            onChange={(e) => setCitizenProfile({ ...citizenProfile, name: e.target.value })}
          />

          <Input
            label="Age *"
            type="number"
            placeholder="Enter age"
            value={citizenProfile.age}
            onChange={(e) => setCitizenProfile({ ...citizenProfile, age: e.target.value })}
          />

          <Input
            label="Annual Income (₹)"
            type="number"
            placeholder="Enter annual income"
            value={citizenProfile.income}
            onChange={(e) => setCitizenProfile({ ...citizenProfile, income: e.target.value })}
          />

          <Input
            label="Occupation"
            placeholder="e.g., Farmer, Student, Self-employed"
            value={citizenProfile.occupation}
            onChange={(e) => setCitizenProfile({ ...citizenProfile, occupation: e.target.value })}
          />

          <Input
            label="State"
            placeholder="e.g., Maharashtra, Delhi"
            value={citizenProfile.state}
            onChange={(e) => setCitizenProfile({ ...citizenProfile, state: e.target.value })}
          />

          <Input
            label="Category"
            placeholder="e.g., General, SC, ST, OBC"
            value={citizenProfile.category}
            onChange={(e) => setCitizenProfile({ ...citizenProfile, category: e.target.value })}
          />
        </Card>

        {/* Scheme Criteria */}
        <Card>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span className="w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm">2</span>
            Scheme Criteria
          </h3>

          <Input
            label="Scheme Name *"
            placeholder="Enter scheme name"
            value={schemeCriteria.scheme_name}
            onChange={(e) => setSchemeCriteria({ ...schemeCriteria, scheme_name: e.target.value })}
          />

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Min Age"
              type="number"
              placeholder="Min"
              value={schemeCriteria.min_age}
              onChange={(e) => setSchemeCriteria({ ...schemeCriteria, min_age: e.target.value })}
            />

            <Input
              label="Max Age"
              type="number"
              placeholder="Max"
              value={schemeCriteria.max_age}
              onChange={(e) => setSchemeCriteria({ ...schemeCriteria, max_age: e.target.value })}
            />
          </div>

          <Input
            label="Maximum Income (₹)"
            type="number"
            placeholder="Enter max income limit"
            value={schemeCriteria.max_income}
            onChange={(e) => setSchemeCriteria({ ...schemeCriteria, max_income: e.target.value })}
          />

          <Input
            label="Eligible Categories"
            placeholder="e.g., SC, ST, OBC (comma-separated)"
            value={schemeCriteria.eligible_categories}
            onChange={(e) => setSchemeCriteria({ ...schemeCriteria, eligible_categories: e.target.value })}
          />

          <Input
            label="Eligible States"
            placeholder="e.g., Maharashtra, Delhi (comma-separated)"
            value={schemeCriteria.eligible_states}
            onChange={(e) => setSchemeCriteria({ ...schemeCriteria, eligible_states: e.target.value })}
          />
        </Card>
      </div>

      <Card>
        <div className="flex gap-3">
          <Button onClick={handleVerify} loading={loading}>
            <Shield className="w-4 h-4" />
            Verify Eligibility
          </Button>
          <Button variant="secondary" onClick={handleClear} disabled={loading}>
            Clear Form
          </Button>
        </div>
      </Card>

      {result && (
        <Card className={`border-l-4 ${result.eligible ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'}`}>
          <div className="flex items-center gap-3 mb-4">
            {result.eligible ? (
              <>
                <CheckCircle2 className="w-8 h-8 text-green-600" />
                <div>
                  <h3 className="text-xl font-bold text-green-900">Eligible!</h3>
                  <p className="text-green-700">The citizen meets all eligibility criteria</p>
                </div>
              </>
            ) : (
              <>
                <XCircle className="w-8 h-8 text-red-600" />
                <div>
                  <h3 className="text-xl font-bold text-red-900">Not Eligible</h3>
                  <p className="text-red-700">The citizen does not meet the eligibility criteria</p>
                </div>
              </>
            )}
          </div>

          {result.reasons && result.reasons.length > 0 && (
            <div className="mt-4">
              <h4 className="font-medium text-gray-800 mb-2">
                {result.eligible ? 'Matching Criteria:' : 'Reasons for Ineligibility:'}
              </h4>
              <ul className="space-y-1">
                {result.reasons.map((reason, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <span className={result.eligible ? 'text-green-600' : 'text-red-600'}>•</span>
                    <span className="text-gray-800">{reason}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {result.details && (
            <div className="mt-4 pt-4 border-t">
              <details className="cursor-pointer">
                <summary className="font-medium text-gray-700">Full Details</summary>
                <pre className="mt-2 text-xs bg-white p-3 rounded overflow-x-auto">
                  {JSON.stringify(result, null, 2)}
                </pre>
              </details>
            </div>
          )}
        </Card>
      )}

      <Card className="bg-purple-50 border border-purple-200">
        <div className="flex items-start gap-2">
          <AlertCircle className="w-5 h-5 text-purple-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-purple-900 mb-1">How it works</h4>
            <p className="text-sm text-purple-800">
              The AI agent analyzes the citizen profile against scheme criteria and provides
              detailed reasoning for eligibility decisions. All criteria are evaluated including
              age, income, occupation, location, and category requirements.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default EligibilityVerifier;
