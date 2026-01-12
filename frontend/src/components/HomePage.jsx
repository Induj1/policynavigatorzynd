import React, { useState, useEffect } from 'react';
import { 
  Search, TrendingUp, Users, Award, BookOpen, Upload, Bookmark, 
  Share2, Download, Mic, MapPin, HelpCircle, PlayCircle, 
  CheckCircle, FileCheck, Bell, Star, Calendar, Phone,
  GraduationCap, Baby, Wheat, Briefcase, Heart, Home as HomeIcon,
  ChevronRight, ExternalLink, X, Target
} from 'lucide-react';
import { Card, Button, Input, Badge } from './ui';

const HomePage = ({ language = 'en', fontSize = 'normal', onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showFAQ, setShowFAQ] = useState(false);
  const [isListening, setIsListening] = useState(false);

  // Announcement Data
  const announcements = [
    { id: 1, text: language === 'en' ? 'New PM Kisan Scheme benefits announced' : 'नई पीएम किसान योजना लाभ की घोषणा', type: 'new' },
    { id: 2, text: language === 'en' ? 'Extended deadline for scholarship applications' : 'छात्रवृत्ति आवेदन के लिए विस्तारित समय सीमा', type: 'update' },
    { id: 3, text: language === 'en' ? 'Digital India portal integration completed' : 'डिजिटल इंडिया पोर्टल एकीकरण पूर्ण', type: 'success' }
  ];

  const [currentAnnouncement, setCurrentAnnouncement] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentAnnouncement((prev) => (prev + 1) % announcements.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Scheme Categories
  const categories = [
    {
      id: 'education',
      name: language === 'en' ? 'Education' : 'शिक्षा',
      icon: GraduationCap,
      color: 'from-blue-500 to-blue-600',
      count: 234
    },
    {
      id: 'healthcare',
      name: language === 'en' ? 'Healthcare' : 'स्वास्थ्य',
      icon: Heart,
      color: 'from-red-500 to-pink-600',
      count: 189
    },
    {
      id: 'agriculture',
      name: language === 'en' ? 'Agriculture' : 'कृषि',
      icon: Wheat,
      color: 'from-green-500 to-green-600',
      count: 156
    },
    {
      id: 'women',
      name: language === 'en' ? 'Women & Child' : 'महिला एवं बाल',
      icon: Baby,
      color: 'from-purple-500 to-purple-600',
      count: 198
    },
    {
      id: 'employment',
      name: language === 'en' ? 'Employment' : 'रोजगार',
      icon: Briefcase,
      color: 'from-orange-500 to-orange-600',
      count: 142
    },
    {
      id: 'housing',
      name: language === 'en' ? 'Housing' : 'आवास',
      icon: HomeIcon,
      color: 'from-indigo-500 to-indigo-600',
      count: 87
    }
  ];

  // Popular Schemes
  const popularSchemes = [
    {
      id: 1,
      name: 'PM-KISAN',
      nameHi: 'पीएम-किसान',
      description: language === 'en' ? 'Income support for farmers' : 'किसानों के लिए आय सहायता',
      benefits: language === 'en' ? '₹6,000/year' : '₹6,000/वर्ष',
      category: 'agriculture',
      trending: true
    },
    {
      id: 2,
      name: 'Ayushman Bharat',
      nameHi: 'आयुष्मान भारत',
      description: language === 'en' ? 'Health insurance scheme' : 'स्वास्थ्य बीमा योजना',
      benefits: language === 'en' ? '₹5 Lakh coverage' : '₹5 लाख कवरेज',
      category: 'healthcare',
      trending: true
    },
    {
      id: 3,
      name: 'PM Scholarship',
      nameHi: 'पीएम छात्रवृत्ति',
      description: language === 'en' ? 'Scholarships for students' : 'छात्रों के लिए छात्रवृत्ति',
      benefits: language === 'en' ? '₹2,500/month' : '₹2,500/महीना',
      category: 'education',
      trending: false
    },
    {
      id: 4,
      name: 'PMAY',
      nameHi: 'पीएमएवाई',
      description: language === 'en' ? 'Affordable housing for all' : 'सभी के लिए किफायती आवास',
      benefits: language === 'en' ? 'Up to ₹2.67L subsidy' : '₹2.67L तक सब्सिडी',
      category: 'housing',
      trending: true
    }
  ];

  // FAQs
  const faqs = [
    {
      q: language === 'en' ? 'How do I check my eligibility?' : 'मैं अपनी पात्रता कैसे जांचूं?',
      a: language === 'en' ? 'Go to "Check Eligibility" tab and enter your details. Our AI will verify your eligibility instantly.' : '"पात्रता जांचें" टैब पर जाएं और अपना विवरण दर्ज करें। हमारी AI तुरंत आपकी पात्रता की पुष्टि करेगी।'
    },
    {
      q: language === 'en' ? 'What documents do I need?' : 'मुझे कौन से दस्तावेज़ चाहिए?',
      a: language === 'en' ? 'Common documents: Aadhar Card, Income Certificate, Bank Account, Address Proof. Specific requirements vary by scheme.' : 'सामान्य दस्तावेज़: आधार कार्ड, आय प्रमाण पत्र, बैंक खाता, पता प्रमाण। विशिष्ट आवश्यकताएं योजना के अनुसार भिन्न होती हैं।'
    },
    {
      q: language === 'en' ? 'How long does approval take?' : 'अनुमोदन में कितना समय लगता है?',
      a: language === 'en' ? 'Processing time varies from 7 to 45 days depending on the scheme. You can track status in real-time.' : 'प्रसंस्करण समय योजना के आधार पर 7 से 45 दिनों तक भिन्न होता है। आप वास्तविक समय में स्थिति ट्रैक कर सकते हैं।'
    },
    {
      q: language === 'en' ? 'Can I apply for multiple schemes?' : 'क्या मैं कई योजनाओं के लिए आवेदन कर सकता हूं?',
      a: language === 'en' ? 'Yes! You can apply for multiple schemes if you meet their eligibility criteria. Use our "Find Benefits" feature to discover all schemes you qualify for.' : 'हां! यदि आप उनकी पात्रता मानदंडों को पूरा करते हैं तो आप कई योजनाओं के लिए आवेदन कर सकते हैं। आप जिन योजनाओं के लिए योग्य हैं, उन सभी को खोजने के लिए हमारी "लाभ खोजें" सुविधा का उपयोग करें।'
    }
  ];

  const handleVoiceSearch = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = language === 'hi' ? 'hi-IN' : 'en-IN';
      
      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setSearchQuery(transcript);
      };
      
      recognition.start();
    } else {
      alert(language === 'en' ? 'Voice search not supported in this browser' : 'इस ब्राउज़र में वॉइस खोज समर्थित नहीं है');
    }
  };

  return (
    <div className={`space-y-6 ${fontSize === 'large' ? 'text-lg' : fontSize === 'small' ? 'text-sm' : 'text-base'}`}>
      {/* Announcements Banner */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1">
            <Bell className="w-5 h-5 text-white animate-pulse" />
            <p className="text-white font-medium">{announcements[currentAnnouncement].text}</p>
            <Badge variant={announcements[currentAnnouncement].type === 'new' ? 'success' : 'info'} size="sm">
              {announcements[currentAnnouncement].type === 'new' ? (language === 'en' ? 'NEW' : 'नया') : (language === 'en' ? 'UPDATE' : 'अपडेट')}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            {announcements.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentAnnouncement ? 'bg-white w-4' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Hero Section with Statistics */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 rounded-2xl p-8 shadow-xl text-white">
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">
            {language === 'en' ? 'Welcome to Policy Navigator' : 'पॉलिसी नेविगेटर में आपका स्वागत है'}
          </h2>
          <p className="text-blue-100 text-lg">
            {language === 'en' ? 'Your AI-powered guide to government schemes and benefits' : 'सरकारी योजनाओं और लाभों के लिए आपका AI-संचालित मार्गदर्शक'}
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === 'en' ? 'Search for schemes, benefits, eligibility...' : 'योजनाओं, लाभों, पात्रता के लिए खोजें...'}
              className="w-full pl-12 pr-24 py-4 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-orange-300 shadow-lg text-lg"
            />
            <button
              onClick={handleVoiceSearch}
              className={`absolute right-16 top-1/2 -translate-y-1/2 p-2 rounded-lg transition-all ${
                isListening ? 'bg-red-500 text-white animate-pulse' : 'hover:bg-gray-100 text-gray-600'
              }`}
              title={language === 'en' ? 'Voice Search' : 'वॉइस खोज'}
            >
              <Mic className="w-5 h-5" />
            </button>
            <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg transition-all shadow-md">
              {language === 'en' ? 'Search' : 'खोजें'}
            </button>
          </div>
          <div className="mt-3 text-center text-blue-100 text-sm">
            💡 {language === 'en' ? 'Try: "education scholarship", "farmer scheme", "housing loan"' : 'आजमाएं: "शिक्षा छात्रवृत्ति", "किसान योजना", "आवास ऋण"'}
          </div>
        </div>
      </div>

      {/* Scheme Categories */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-blue-600" />
          {language === 'en' ? 'Browse by Category' : 'श्रेणी के अनुसार ब्राउज़ करें'}
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-4 rounded-xl border-2 transition-all hover:scale-105 ${
                  selectedCategory === category.id
                    ? 'border-orange-400 bg-orange-50 shadow-lg'
                    : 'border-gray-200 bg-white hover:border-blue-300 shadow-sm'
                }`}
              >
                <div className={`w-12 h-12 mx-auto mb-2 rounded-full bg-gradient-to-br ${category.color} flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-center">
                  <div className="font-semibold text-gray-900 text-sm mb-1">{category.name}</div>
                  <div className="text-xs text-gray-600">{category.count} {language === 'en' ? 'schemes' : 'योजनाएं'}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Popular Schemes */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-orange-600" />
          {language === 'en' ? 'Popular Schemes' : 'लोकप्रिय योजनाएं'}
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {popularSchemes.map((scheme) => (
            <div key={scheme.id} className="bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="text-lg font-bold text-gray-900">{language === 'en' ? scheme.name : scheme.nameHi}</h4>
                  <p className="text-sm text-gray-600 mt-1">{scheme.description}</p>
                </div>
                {scheme.trending && (
                  <Badge variant="warning" size="sm">
                    <Star className="w-3 h-3 mr-1" />
                    {language === 'en' ? 'Trending' : 'ट्रेंडिंग'}
                  </Badge>
                )}
              </div>
              <div className="flex items-center justify-between">
                <div className="text-green-600 font-bold text-lg">{scheme.benefits}</div>
                <Button variant="primary" size="sm" onClick={() => onNavigate && onNavigate('parser')}>
                  {language === 'en' ? 'View Details' : 'विवरण देखें'}
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-4 gap-4">
        <button
          onClick={() => onNavigate && onNavigate('verifier')}
          className="bg-purple-50 border-2 border-purple-200 rounded-xl p-6 hover:border-purple-400 hover:shadow-lg transition-all text-left"
        >
          <CheckCircle className="w-10 h-10 text-purple-600 mb-3" />
          <h4 className="font-bold text-gray-900 mb-1">{language === 'en' ? 'Check Eligibility' : 'पात्रता जांचें'}</h4>
          <p className="text-sm text-gray-600">{language === 'en' ? 'Verify if you qualify' : 'सत्यापित करें कि आप योग्य हैं'}</p>
        </button>

        <button
          onClick={() => onNavigate && onNavigate('matcher')}
          className="bg-orange-50 border-2 border-orange-200 rounded-xl p-6 hover:border-orange-400 hover:shadow-lg transition-all text-left"
        >
          <Target className="w-10 h-10 text-orange-600 mb-3" />
          <h4 className="font-bold text-gray-900 mb-1">{language === 'en' ? 'Find Benefits' : 'लाभ खोजें'}</h4>
          <p className="text-sm text-gray-600">{language === 'en' ? 'Discover all schemes' : 'सभी योजनाएं खोजें'}</p>
        </button>

        <button
          onClick={() => setShowFAQ(true)}
          className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 hover:border-blue-400 hover:shadow-lg transition-all text-left"
        >
          <HelpCircle className="w-10 h-10 text-blue-600 mb-3" />
          <h4 className="font-bold text-gray-900 mb-1">{language === 'en' ? 'FAQs' : 'अक्सर पूछे जाने वाले प्रश्न'}</h4>
          <p className="text-sm text-gray-600">{language === 'en' ? 'Get quick answers' : 'त्वरित उत्तर प्राप्त करें'}</p>
        </button>

        <button
          onClick={() => onNavigate && onNavigate('chat')}
          className="bg-green-50 border-2 border-green-200 rounded-xl p-6 hover:border-green-400 hover:shadow-lg transition-all text-left"
        >
          <Phone className="w-10 h-10 text-green-600 mb-3" />
          <h4 className="font-bold text-gray-900 mb-1">{language === 'en' ? 'Get Help' : 'सहायता प्राप्त करें'}</h4>
          <p className="text-sm text-gray-600">{language === 'en' ? 'Chat with AI assistant' : 'AI सहायक से चैट करें'}</p>
        </button>
      </div>

      {/* Document Checklist */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <FileCheck className="w-6 h-6 text-blue-600" />
          {language === 'en' ? 'Common Documents Required' : 'आवश्यक सामान्य दस्तावेज़'}
        </h3>
        <div className="grid md:grid-cols-2 gap-3">
          {[
            { icon: '', text: language === 'en' ? 'Aadhar Card' : 'आधार कार्ड' },
            { icon: '', text: language === 'en' ? 'Bank Account Details' : 'बैंक खाता विवरण' },
            { icon: '', text: language === 'en' ? 'Income Certificate' : 'आय प्रमाण पत्र' },
            { icon: '', text: language === 'en' ? 'Address Proof' : 'पता प्रमाण' },
            { icon: '', text: language === 'en' ? 'Educational Certificates' : 'शैक्षिक प्रमाणपत्र' },
            { icon: '', text: language === 'en' ? 'Mobile Number' : 'मोबाइल नंबर' }
          ].map((doc, index) => (
            <div key={index} className="flex items-center gap-3 bg-white rounded-lg p-3 border border-blue-100">
              <span className="text-2xl">{doc.icon}</span>
              <span className="text-gray-700 font-medium">{doc.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Video Tutorials */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <PlayCircle className="w-6 h-6 text-red-600" />
          {language === 'en' ? 'Video Tutorials' : 'वीडियो ट्यूटोरियल'}
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { 
              title: language === 'en' ? 'How to Apply for Government Schemes' : 'सरकारी योजनाओं के लिए आवेदन कैसे करें',
              url: 'https://www.youtube.com/embed/bo47QgbMXNA',
              duration: '8:45',
              views: '1.2M'
            },
            { 
              title: language === 'en' ? 'Digital India Services Guide' : 'डिजिटल इंडिया सेवा गाइड',
              url: 'https://www.youtube.com/embed/gqZAGf97AM8',
              duration: '6:30',
              views: '856K'
            },
            { 
              title: language === 'en' ? 'How to Track Aadhaar Application Status' : 'आवेदन स्थिति ट्रैक करें',
              url: 'https://www.youtube.com/embed/OpK6tX05fmE',
              duration: '4:15',
              views: '645K'
            }
          ].map((video, index) => (
            <div key={index} className="bg-white rounded-xl overflow-hidden border-2 border-gray-200 hover:border-red-300 hover:shadow-lg transition-all">
              <div className="relative h-48 bg-black">
                <iframe
                  className="w-full h-full"
                  src={video.url}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="p-4">
                <h4 className="font-bold text-gray-900 mb-2 line-clamp-2">{video.title}</h4>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>⏱️ {video.duration}</span>
                  <span>👁️ {video.views}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Modal */}
      {showFAQ && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <HelpCircle className="w-7 h-7 text-blue-600" />
                {language === 'en' ? 'Frequently Asked Questions' : 'अक्सर पूछे जाने वाले प्रश्न'}
              </h3>
              <button
                onClick={() => setShowFAQ(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-blue-50 rounded-xl p-5 border border-blue-200">
                  <h4 className="font-bold text-gray-900 mb-2 flex items-start gap-2">
                    <span className="text-blue-600 text-lg">Q{index + 1}.</span>
                    {faq.q}
                  </h4>
                  <p className="text-gray-700 ml-7">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
