import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const policyNavigatorAPI = {
  // Health check
  checkHealth: async () => {
    const response = await api.get('/health');
    return response.data;
  },

  // Get agents status
  getAgentsStatus: async () => {
    const response = await api.get('/agents/status');
    return response.data;
  },

  // Parse government scheme document
  parseScheme: async (documentText) => {
    const response = await api.post('/api/parse-scheme', {
      document_text: documentText,
    });
    return response.data;
  },

  // Verify citizen eligibility
  verifyEligibility: async (citizenProfile, schemeCriteria) => {
    const response = await api.post('/api/verify-eligibility', {
      citizen_profile: citizenProfile,
      scheme_criteria: schemeCriteria,
    });
    return response.data;
  },

  // Find matching benefits
  findBenefits: async (citizenProfile, availableSchemes) => {
    const response = await api.post('/api/find-benefits', {
      citizen_profile: citizenProfile,
      available_schemes: availableSchemes,
    });
    return response.data;
  },

  // Chat with Citizen Advocate Agent
  chat: async (message, context = null) => {
    const response = await api.post('/api/chat', {
      message,
      context,
    });
    return response.data;
  },
};

export default api;
