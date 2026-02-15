import React, { useState } from 'react';
import { Target, Plus, Trash2, Sparkles, AlertCircle } from 'lucide-react';
import { Card, Button, Input, Badge } from '../ui';
import { policyNavigatorAPI } from '../../services/api';
import toast from 'react-hot-toast';

const BenefitMatcher = () => {
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
    education: '',
  });

  // Available Schemes
  const [schemes, setSchemes] = useState([
    {
      id: 1,
      name: '',
      description: '',
      benefits: '',
      min_age: '',
      max_age: '',
      max_income: '',
    }
  ]);

  const addScheme = () => {
    setSchemes([...schemes, {
      id: Date.now(),
      name: '',
      description: '',
      benefits: '',
      min_age: '',
      max_age: '',
      max_income: '',
    }]);
  };

  const removeScheme = (id) => {
    if (schemes.length > 1) {
      setSchemes(schemes.filter(s => s.id !== id));
    }
  };

  const updateScheme = (id, field, value) => {
    setSchemes(schemes.map(s => 
      s.id === id ? { ...s, [field]: value } : s
    ));
  };

  const handleFindBenefits = async () => {
    if (!citizenProfile.name || !citizenProfile.age) {
      toast.error('Please fill in at least your name and age');
      return;
    }

    setLoading(true);
    try {
      const profile = {
        ...citizenProfile,
        age: parseInt(citizenProfile.age) || 0,
        income: parseFloat(citizenProfile.income) || 0,
      };

      // Send empty schemes array - backend will use its own database
      const response = await policyNavigatorAPI.findBenefits(profile, []);
      setResult(response.data);
      
      const matchCount = response.data.recommendations?.length || 0;
      if (matchCount > 0) {
        toast.success(`Found ${matchCount} matching scheme(s)!`);
      } else {
        toast('No matching schemes found', {
          icon: 'ℹ️',
          style: {
            borderRadius: '10px',
            background: '#3b82f6',
            color: '#fff',
          },
        });
      }
    } catch (error) {
      toast.error('Failed to find benefits: ' + (error.response?.data?.detail || error.message));
      console.error('Benefit matching error:', error);
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
      education: '',
    });
    setSchemes([{
      id: 1,
      name: '',
      description: '',
      benefits: '',
      min_age: '',
      max_age: '',
      max_income: '',
    }]);
    setResult(null);
  };

  return (
    <>
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-purple-100 rounded-lg">
          <Target className="w-6 h-6 text-purple-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Benefit Matcher</h2>
          <p className="text-gray-600">Find the best matching schemes for a citizen's profile</p>
        </div>
      </div>

      {/* Citizen Profile */}
      <Card>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <span className="w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm">1</span>
          Citizen Profile
        </h3>

        <div className="grid md:grid-cols-2 gap-4">
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
            placeholder="e.g., Farmer, Student"
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

          <Input
            label="Education"
            placeholder="e.g., Graduate, 10th Pass"
            value={citizenProfile.education}
            onChange={(e) => setCitizenProfile({ ...citizenProfile, education: e.target.value })}
          />
        </div>
      </Card>

      {/* Action Buttons */}
      <Card>
        <div className="flex gap-3">
          <Button onClick={handleFindBenefits} loading={loading}>
            <Sparkles className="w-4 h-4" />
            Find Matching Benefits
          </Button>
          <Button variant="secondary" onClick={handleClear} disabled={loading}>
            Clear All
          </Button>
        </div>
      </Card>

      {result && (
        <div className="space-y-4">
          <Card className="border-l-4 border-purple-500">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-purple-600" />
              <h3 className="text-lg font-semibold">Matching Results</h3>
            </div>

            {result.recommendations && result.recommendations.length > 0 ? (
              <div className="space-y-4">
                {result.recommendations.map((match, index) => (
                  <div key={index} className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4 border border-purple-200">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-lg text-gray-900">{match.scheme_name}</h4>
                      <div className="flex flex-col items-end gap-1">
                        {match.relevance_score && (
                          <Badge variant="success">
                            {Math.round(match.relevance_score * 100)}% Match
                          </Badge>
                        )}
                        {match.priority && (
                          <Badge variant={match.priority === 'high' ? 'warning' : match.priority === 'medium' ? 'info' : 'secondary'}>
                            {match.priority.toUpperCase()}
                          </Badge>
                        )}
                      </div>
                    </div>

                    {match.estimated_benefit && (
                      <div className="mb-2 bg-green-50 border border-green-200 rounded p-2">
                        <span className="font-medium text-green-700">Benefit: </span>
                        <span className="text-green-900 font-semibold">{match.estimated_benefit}</span>
                      </div>
                    )}

                    {match.why_suitable && (
                      <div className="mt-3 pt-3 border-t border-purple-200">
                        <p className="text-sm font-medium text-gray-700 mb-1">Why this is suitable for you:</p>
                        <p className="text-sm text-gray-600">{match.why_suitable}</p>
                      </div>
                    )}

                    {match.application_process && (
                      <div className="mt-3 pt-3 border-t border-purple-200">
                        <p className="text-sm font-medium text-gray-700 mb-1">How to apply:</p>
                        <p className="text-sm text-gray-600">{match.application_process}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Target className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No matching schemes found for this profile</p>
              </div>
            )}

            {result.summary && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-medium text-blue-900 mb-2">Summary</h4>
                <p className="text-sm text-blue-800">{result.summary}</p>
              </div>
            )}

            {result.total_potential_benefit && (
              <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border-2 border-green-300">
                <h4 className="font-medium text-green-900 mb-2">Total Potential Benefit</h4>
                <p className="text-2xl font-bold text-green-700">{result.total_potential_benefit}</p>
              </div>
            )}
          </Card>
        </div>
      )}

      <Card className="bg-indigo-50 border border-indigo-200">
        <div className="flex items-start gap-2">
          <AlertCircle className="w-5 h-5 text-indigo-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-indigo-900 mb-1">AI-Powered Smart Matching</h4>
            <p className="text-sm text-indigo-700">
              Our AI analyzes your profile against 15+ real Indian Government schemes including PM-KISAN, Ayushman Bharat, 
              PM Awas Yojana, National Scholarship Portal, PM Mudra Yojana, and more. Just fill in your profile and click 
              'Find Matching Benefits' to get personalized recommendations!
            </p>
          </div>
        </div>
      </Card>
    </div>
    </>
  );
};

export default BenefitMatcher;
