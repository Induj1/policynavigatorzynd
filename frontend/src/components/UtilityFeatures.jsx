import React, { useState } from 'react';
import { Upload, Bookmark, Share2, Download, X, Check, Link2, Mail, MessageCircle } from 'lucide-react';
import { Button, Badge } from './ui';

// Document Upload Component
export const DocumentUpload = ({ onUpload, accept = '.pdf,.jpg,.jpeg,.png', language = 'en' }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files) => {
    const fileArray = Array.from(files).map(file => ({
      name: file.name,
      size: (file.size / 1024).toFixed(2) + ' KB',
      type: file.type,
      file: file
    }));
    setUploadedFiles(prev => [...prev, ...fileArray]);
    if (onUpload) {
      onUpload(fileArray);
    }
  };

  const removeFile = (index) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full">
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
          dragActive 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 hover:border-blue-400 bg-gray-50'
        }`}
      >
        <Upload className={`w-12 h-12 mx-auto mb-4 ${dragActive ? 'text-blue-500' : 'text-gray-400'}`} />
        <p className="text-gray-700 font-medium mb-2">
          {language === 'en' 
            ? 'Drag and drop files here, or click to browse' 
            : 'फ़ाइलें यहां खींचें और छोड़ें, या ब्राउज़ करने के लिए क्लिक करें'}
        </p>
        <p className="text-sm text-gray-500 mb-4">
          {language === 'en' 
            ? 'Supported formats: PDF, JPG, PNG (Max 5MB)' 
            : 'समर्थित प्रारूप: PDF, JPG, PNG (अधिकतम 5MB)'}
        </p>
        <input
          type="file"
          accept={accept}
          multiple
          onChange={handleChange}
          className="hidden"
          id="fileInput"
        />
        <Button
          variant="primary"
          onClick={() => document.getElementById('fileInput').click()}
        >
          <Upload className="w-4 h-4 mr-2" />
          {language === 'en' ? 'Choose Files' : 'फ़ाइलें चुनें'}
        </Button>
      </div>

      {/* Uploaded Files List */}
      {uploadedFiles.length > 0 && (
        <div className="mt-4 space-y-2">
          <h4 className="font-semibold text-gray-900">
            {language === 'en' ? 'Uploaded Files:' : 'अपलोड की गई फ़ाइलें:'}
          </h4>
          {uploadedFiles.map((file, index) => (
            <div key={index} className="flex items-center justify-between bg-white rounded-lg p-3 border border-gray-200">
              <div className="flex items-center gap-3 flex-1">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Check className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 text-sm">{file.name}</p>
                  <p className="text-xs text-gray-500">{file.size}</p>
                </div>
              </div>
              <button
                onClick={() => removeFile(index)}
                className="p-2 hover:bg-red-50 rounded-lg transition-colors"
              >
                <X className="w-4 h-4 text-red-500" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Bookmark Component
export const BookmarkButton = ({ itemId, itemName, isBookmarked: initialBookmarked = false, language = 'en' }) => {
  const [isBookmarked, setIsBookmarked] = useState(initialBookmarked);

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    // Save to localStorage
    const bookmarks = JSON.parse(localStorage.getItem('policyNavigatorBookmarks') || '[]');
    if (!isBookmarked) {
      bookmarks.push({ id: itemId, name: itemName, date: new Date().toISOString() });
      localStorage.setItem('policyNavigatorBookmarks', JSON.stringify(bookmarks));
    } else {
      const filtered = bookmarks.filter(b => b.id !== itemId);
      localStorage.setItem('policyNavigatorBookmarks', JSON.stringify(filtered));
    }
  };

  return (
    <button
      onClick={toggleBookmark}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
        isBookmarked
          ? 'bg-yellow-100 text-yellow-700 border-2 border-yellow-400'
          : 'bg-gray-100 text-gray-600 border-2 border-gray-300 hover:border-yellow-400'
      }`}
      title={language === 'en' ? (isBookmarked ? 'Remove bookmark' : 'Add bookmark') : (isBookmarked ? 'बुकमार्क हटाएं' : 'बुकमार्क जोड़ें')}
    >
      <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-yellow-600' : ''}`} />
      {isBookmarked 
        ? (language === 'en' ? 'Saved' : 'सहेजा गया') 
        : (language === 'en' ? 'Save' : 'सहेजें')}
    </button>
  );
};

// Share Component
export const ShareOptions = ({ title, description, url, language = 'en' }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareUrl = url || window.location.href;
  const shareText = `${title}\n${description}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareViaWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(shareText + '\n' + shareUrl)}`, '_blank');
  };

  const shareViaEmail = () => {
    window.location.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(shareText + '\n\n' + shareUrl)}`;
  };

  const shareViaSMS = () => {
    window.location.href = `sms:?body=${encodeURIComponent(shareText + '\n' + shareUrl)}`;
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowOptions(!showOptions)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-100 text-blue-700 border-2 border-blue-300 hover:bg-blue-200 transition-all"
      >
        <Share2 className="w-4 h-4" />
        {language === 'en' ? 'Share' : 'शेयर करें'}
      </button>

      {showOptions && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setShowOptions(false)}
          />
          <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border-2 border-gray-200 overflow-hidden z-50">
            <div className="p-3 bg-blue-50 border-b border-blue-200">
              <p className="font-semibold text-gray-900 text-sm">
                {language === 'en' ? 'Share this scheme' : 'इस योजना को साझा करें'}
              </p>
            </div>
            <div className="p-2">
              <button
                onClick={shareViaWhatsApp}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-green-50 transition-colors text-left"
              >
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">WhatsApp</p>
                  <p className="text-xs text-gray-600">{language === 'en' ? 'Share via WhatsApp' : 'WhatsApp के माध्यम से शेयर करें'}</p>
                </div>
              </button>

              <button
                onClick={shareViaEmail}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-50 transition-colors text-left"
              >
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Email</p>
                  <p className="text-xs text-gray-600">{language === 'en' ? 'Share via email' : 'ईमेल के माध्यम से शेयर करें'}</p>
                </div>
              </button>

              <button
                onClick={shareViaSMS}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-purple-50 transition-colors text-left"
              >
                <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">SMS</p>
                  <p className="text-xs text-gray-600">{language === 'en' ? 'Share via SMS' : 'SMS के माध्यम से शेयर करें'}</p>
                </div>
              </button>

              <button
                onClick={handleCopyLink}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors text-left border-t border-gray-200 mt-2"
              >
                <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
                  {copied ? <Check className="w-5 h-5 text-white" /> : <Link2 className="w-5 h-5 text-white" />}
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    {copied 
                      ? (language === 'en' ? 'Copied!' : 'कॉपी हो गया!') 
                      : (language === 'en' ? 'Copy Link' : 'लिंक कॉपी करें')}
                  </p>
                  <p className="text-xs text-gray-600">{language === 'en' ? 'Copy to clipboard' : 'क्लिपबोर्ड पर कॉपी करें'}</p>
                </div>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// PDF Download Component
export const PDFDownload = ({ data, filename, language = 'en' }) => {
  const handleDownload = () => {
    // Simple PDF generation (in production, use jsPDF or similar library)
    const content = JSON.stringify(data, null, 2);
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename || 'scheme-details'}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleDownload}
      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-100 text-green-700 border-2 border-green-300 hover:bg-green-200 transition-all"
    >
      <Download className="w-4 h-4" />
      {language === 'en' ? 'Download PDF' : 'PDF डाउनलोड करें'}
    </button>
  );
};

// Location Filter Component
export const LocationFilter = ({ onSelect, language = 'en' }) => {
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');

  const states = [
    'Andhra Pradesh', 'Bihar', 'Gujarat', 'Karnataka', 'Kerala', 
    'Maharashtra', 'Tamil Nadu', 'Uttar Pradesh', 'West Bengal'
  ];

  const handleStateChange = (state) => {
    setSelectedState(state);
    setSelectedDistrict('');
    if (onSelect) {
      onSelect({ state, district: '' });
    }
  };

  const handleDistrictChange = (district) => {
    setSelectedDistrict(district);
    if (onSelect) {
      onSelect({ state: selectedState, district });
    }
  };

  return (
    <div className="flex gap-4">
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {language === 'en' ? 'Select State' : 'राज्य चुनें'}
        </label>
        <select
          value={selectedState}
          onChange={(e) => handleStateChange(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
        >
          <option value="">{language === 'en' ? 'Choose state...' : 'राज्य चुनें...'}</option>
          {states.map(state => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>
      </div>

      {selectedState && (
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {language === 'en' ? 'Select District' : 'जिला चुनें'}
          </label>
          <select
            value={selectedDistrict}
            onChange={(e) => handleDistrictChange(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
          >
            <option value="">{language === 'en' ? 'Choose district...' : 'जिला चुनें...'}</option>
            <option value="District 1">District 1</option>
            <option value="District 2">District 2</option>
          </select>
        </div>
      )}
    </div>
  );
};

export default {
  DocumentUpload,
  BookmarkButton,
  ShareOptions,
  PDFDownload,
  LocationFilter
};
