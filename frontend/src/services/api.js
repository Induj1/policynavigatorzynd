import axios from 'axios';
import * as pdfjsLib from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

let pdfWorkerSet = false;
function setPdfWorker() {
  if (pdfWorkerSet) return;
  pdfWorkerSet = true;
  pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;
}

async function extractTextFromPdf(arrayBuffer) {
  setPdfWorker();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  const numPages = pdf.numPages;
  const parts = [];
  for (let i = 1; i <= numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const text = content.items.map((item) => item.str).join(' ');
    if (text) parts.push(text);
  }
  return parts.join('\n\n');
}

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

  // Parse government scheme document (text)
  parseScheme: async (documentText) => {
    const response = await api.post('/api/parse-scheme', {
      document_text: documentText,
    });
    return response.data;
  },

  // Parse from file: extract text in browser and call parse-scheme (no parse-scheme-file call = no 404).
  parseSchemeFile: async (file) => {
    const name = (file.name || '').toLowerCase();
    let text;
    if (name.endsWith('.txt')) {
      text = await file.text();
    } else if (name.endsWith('.pdf')) {
      const buffer = await file.arrayBuffer();
      text = await extractTextFromPdf(buffer);
    } else {
      throw new Error('Unsupported file type. Use .txt or .pdf');
    }
    const data = await api.post('/api/parse-scheme', { document_text: text });
    return data.data;
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
