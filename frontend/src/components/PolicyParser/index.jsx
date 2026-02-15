import React, { useState, useRef } from 'react';
import { FileText, CheckCircle, AlertCircle, Upload } from 'lucide-react';
import { Card, Button, TextArea, Badge } from '../ui';
import { policyNavigatorAPI } from '../../services/api';
import toast from 'react-hot-toast';

const ALLOWED_FILE_TYPES = '.pdf,.txt';
const MAX_FILE_MB = 10;

const PolicyParser = () => {
  const [documentText, setDocumentText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleParse = async () => {
    if (!documentText.trim()) {
      toast.error('Please enter a scheme document to parse');
      return;
    }

    setLoading(true);
    try {
      const response = await policyNavigatorAPI.parseScheme(documentText);
      setResult(response.data);
      toast.success('Scheme parsed successfully!');
    } catch (error) {
      toast.error('Failed to parse scheme: ' + (error.response?.data?.detail || error.message));
      console.error('Parse error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (file) => {
    if (!file) return;
    const ext = '.' + (file.name.split('.').pop() || '').toLowerCase();
    if (!['.pdf', '.txt'].includes(ext)) {
      toast.error('Please upload a PDF or TXT file');
      return;
    }
    if (file.size > MAX_FILE_MB * 1024 * 1024) {
      toast.error(`File must be under ${MAX_FILE_MB} MB`);
      return;
    }
    setSelectedFile(file);
  };

  const handleParseFile = async () => {
    if (!selectedFile) {
      toast.error('Please select a file first');
      return;
    }
    setLoading(true);
    setResult(null);
    try {
      const response = await policyNavigatorAPI.parseSchemeFile(selectedFile);
      setResult(response.data);
      toast.success('Document parsed successfully!');
    } catch (error) {
      const status = error.response?.status;
      const detail = error.response?.data?.detail || error.message;
      if (status === 404) {
        toast.error(
          'PDF file upload is not available on this server. Paste the document text above and parse, or run the backend locally for file upload.'
        );
      } else {
        toast.error('Failed to parse file: ' + detail);
      }
      console.error('Parse file error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setDocumentText('');
    setResult(null);
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer?.files?.[0];
    if (file) handleFileSelect(file);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === 'dragenter' || e.type === 'dragover');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-primary-100 rounded-lg">
          <FileText className="w-6 h-6 text-primary-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Policy Parser</h2>
          <p className="text-gray-600">Extract structured information from government scheme documents</p>
        </div>
      </div>

      {/* File upload */}
      <Card>
        <h3 className="text-lg font-semibold mb-2">Upload document</h3>
        <p className="text-sm text-gray-600 mb-3">Upload a PDF or TXT file (max {MAX_FILE_MB} MB) to parse as a scheme document.</p>
        <input
          ref={fileInputRef}
          type="file"
          accept={ALLOWED_FILE_TYPES}
          className="hidden"
          onChange={(e) => handleFileSelect(e.target.files?.[0])}
        />
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
            dragActive ? 'border-primary-500 bg-primary-50' : 'border-gray-300 hover:border-primary-400 hover:bg-gray-50'
          }`}
        >
          <Upload className="w-10 h-10 mx-auto text-gray-400 mb-2" />
          <p className="text-gray-600">
            {selectedFile ? (
              <span className="font-medium text-primary-600">{selectedFile.name}</span>
            ) : (
              <>Drag and drop a file here, or click to choose</>
            )}
          </p>
        </div>
        <div className="flex gap-3 mt-4">
          <Button onClick={handleParseFile} loading={loading} disabled={!selectedFile}>
            <FileText className="w-4 h-4" />
            Parse from file
          </Button>
          {selectedFile && (
            <Button variant="secondary" onClick={() => { setSelectedFile(null); if (fileInputRef.current) fileInputRef.current.value = ''; }}>
              Remove file
            </Button>
          )}
        </div>
      </Card>

      <Card>
        <TextArea
          label="Or paste scheme document text"
          placeholder="Paste the government scheme document text here... (e.g., eligibility criteria, benefits, application process)"
          value={documentText}
          onChange={(e) => setDocumentText(e.target.value)}
          rows={8}
        />

        <div className="flex gap-3">
          <Button onClick={handleParse} loading={loading}>
            <FileText className="w-4 h-4" />
            Parse from text
          </Button>
          <Button variant="secondary" onClick={handleClear} disabled={loading}>
            Clear
          </Button>
        </div>
      </Card>

      {result && (
        <Card className="border-l-4 border-primary-500">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <h3 className="text-lg font-semibold">Parsed Results</h3>
          </div>

          <div className="space-y-4">
            {result.scheme_name && (
              <div>
                <h4 className="font-medium text-gray-700 mb-1">Scheme Name</h4>
                <p className="text-gray-900">{result.scheme_name}</p>
              </div>
            )}

            {result.department && (
              <div>
                <h4 className="font-medium text-gray-700 mb-1">Department</h4>
                <p className="text-gray-900">{result.department}</p>
              </div>
            )}

            {result.eligibility_criteria && (
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Eligibility Criteria</h4>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  {typeof result.eligibility_criteria === 'object' ? (
                    <>
                      {result.eligibility_criteria.age && (
                        <div className="flex gap-2">
                          <span className="font-medium text-gray-700">Age:</span>
                          <span className="text-gray-900">
                            {result.eligibility_criteria.age.min && `Min: ${result.eligibility_criteria.age.min}`}
                            {result.eligibility_criteria.age.min && result.eligibility_criteria.age.max && ', '}
                            {result.eligibility_criteria.age.max && `Max: ${result.eligibility_criteria.age.max}`}
                          </span>
                        </div>
                      )}
                      {result.eligibility_criteria.income && (
                        <div className="flex gap-2">
                          <span className="font-medium text-gray-700">Income:</span>
                          <span className="text-gray-900">
                            {result.eligibility_criteria.income.max && `Max: ${result.eligibility_criteria.income.max}`}
                            {result.eligibility_criteria.income.unit && ` (${result.eligibility_criteria.income.unit})`}
                          </span>
                        </div>
                      )}
                      {result.eligibility_criteria.location && (
                        <div className="flex gap-2">
                          <span className="font-medium text-gray-700">Location:</span>
                          <span className="text-gray-900">
                            {Array.isArray(result.eligibility_criteria.location) 
                              ? result.eligibility_criteria.location.join(', ') 
                              : result.eligibility_criteria.location}
                          </span>
                        </div>
                      )}
                      {result.eligibility_criteria.other && Array.isArray(result.eligibility_criteria.other) && (
                        <div className="flex gap-2">
                          <span className="font-medium text-gray-700">Other:</span>
                          <div className="flex-1">
                            {result.eligibility_criteria.other.map((item, idx) => (
                              <Badge key={idx} className="mr-2 mb-1">{item}</Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <p className="text-gray-900">{result.eligibility_criteria}</p>
                  )}
                </div>
              </div>
            )}

            {result.benefits && (
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Benefits</h4>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  {typeof result.benefits === 'object' ? (
                    <>
                      {result.benefits.type && (
                        <div className="flex gap-2">
                          <span className="font-medium text-gray-700">Type:</span>
                          <Badge variant="success">{result.benefits.type}</Badge>
                        </div>
                      )}
                      {result.benefits.amount && (
                        <div className="flex gap-2">
                          <span className="font-medium text-gray-700">Amount:</span>
                          <span className="text-gray-900">{result.benefits.amount}</span>
                        </div>
                      )}
                      {result.benefits.description && (
                        <div className="flex gap-2">
                          <span className="font-medium text-gray-700">Description:</span>
                          <span className="text-gray-900">{result.benefits.description}</span>
                        </div>
                      )}
                    </>
                  ) : (
                    <p className="text-gray-900">{result.benefits}</p>
                  )}
                </div>
              </div>
            )}

            {result.required_documents && Array.isArray(result.required_documents) && (
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Required Documents</h4>
                <div className="bg-gray-50 rounded-lg p-4">
                  <ul className="list-disc list-inside space-y-1">
                    {result.required_documents.map((doc, idx) => (
                      <li key={idx} className="text-gray-900">{doc}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {result.application_process && (
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Application Process</h4>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-gray-900 whitespace-pre-wrap">{result.application_process}</p>
                </div>
              </div>
            )}

            {/* Display any other fields in the result */}
            <div className="mt-4">
              <details className="cursor-pointer">
                <summary className="font-medium text-gray-700">Full Response</summary>
                <pre className="mt-2 text-xs bg-gray-50 p-3 rounded overflow-x-auto">
                  {JSON.stringify(result, null, 2)}
                </pre>
              </details>
            </div>
          </div>
        </Card>
      )}

      {/* Example section */}
      <Card className="bg-blue-50 border border-blue-200">
        <div className="flex items-start gap-2">
          <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-900 mb-1">Example Input</h4>
            <p className="text-sm text-blue-800 mb-2">
              Try pasting a government scheme document with details about:
            </p>
            <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
              <li>Scheme name and purpose</li>
              <li>Eligibility requirements (age, income, occupation)</li>
              <li>Benefits provided (financial assistance, subsidies)</li>
              <li>Application process and required documents</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PolicyParser;
