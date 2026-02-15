import React, { useState, useEffect } from 'react';
import { 
  Search, TrendingUp, Users, Award, BookOpen, Upload, Bookmark, 
  Share2, Download, Mic, MapPin, HelpCircle, PlayCircle, 
  CheckCircle, FileCheck, Bell, Star, Calendar, Phone,
  GraduationCap, Baby, Wheat, Briefcase, Heart, Home as HomeIcon,
  ChevronRight, ExternalLink, X, Target
} from 'lucide-react';

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

  const docList = [language === 'en' ? 'Aadhaar Card' : 'आधार कार्ड', language === 'en' ? 'Bank account details' : 'बैंक खाता', language === 'en' ? 'Income certificate' : 'आय प्रमाण पत्र', language === 'en' ? 'Address proof' : 'पता प्रमाण', language === 'en' ? 'Education certificates' : 'शैक्षिक प्रमाण', language === 'en' ? 'Mobile number' : 'मोबाइल नंबर'];

  return (
    <div className={`${fontSize === 'large' ? 'text-lg' : fontSize === 'small' ? 'text-sm' : 'text-base'}`}>
      {/* Announcement banner */}
      <div className="flex items-center gap-3 rounded-xl bg-emerald-50 border border-emerald-100 px-4 py-3 mb-8">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-100">
          <Bell className="h-4 w-4 text-emerald-700" />
        </div>
        <p className="min-w-0 flex-1 text-sm font-medium text-emerald-900">{announcements[currentAnnouncement].text}</p>
        <div className="flex gap-1.5">
          {announcements.map((_, i) => (
            <button key={i} onClick={() => setCurrentAnnouncement(i)} className={`rounded-full ${i === currentAnnouncement ? 'h-2 w-5 bg-emerald-500' : 'h-2 w-2 bg-emerald-200'}`} aria-label="Announcement" />
          ))}
        </div>
      </div>

      {/* Hero */}
      <section className="rounded-2xl bg-gradient-to-br from-slate-50 to-emerald-50/50 border border-slate-100 p-6 sm:p-8 lg:p-10 mb-10">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
          {language === 'en' ? 'Find schemes that are right for you' : 'आपके लिए सही योजनाएं खोजें'}
        </h1>
        <p className="mt-2 max-w-xl text-slate-600 sm:text-lg">
          {language === 'en' ? 'Search by keyword or use the tools below. Available in English and Hindi.' : 'कीवर्ड से खोजें या नीचे दिए टूल इस्तेमाल करें। अंग्रेजी और हिंदी में उपलब्ध।'}
        </p>
        <div className="relative mt-6 max-w-2xl">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={language === 'en' ? 'e.g. scholarship, PM Kisan, Ayushman Bharat…' : 'जैसे छात्रवृत्ति, पीएम किसान…'}
            className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-12 pr-28 text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          />
          <button onClick={handleVoiceSearch} className={`absolute right-14 top-1/2 -translate-y-1/2 rounded-lg p-2 ${isListening ? 'bg-red-100 text-red-600' : 'text-slate-400 hover:bg-slate-100 hover:text-slate-600'}`} title={language === 'en' ? 'Voice search' : 'वॉइस खोज'}>
            <Mic className="h-5 w-5" />
          </button>
          <button className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700">
            {language === 'en' ? 'Search' : 'खोजें'}
          </button>
        </div>
      </section>

      {/* Categories */}
      <section className="mb-10">
        <h2 className="mb-4 text-lg font-semibold text-slate-900">
          {language === 'en' ? 'Browse by category' : 'श्रेणी के अनुसार ब्राउज़ करें'}
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex flex-col items-center gap-3 rounded-xl border-2 bg-white p-4 text-center shadow-sm transition-all hover:shadow-md ${
                  selectedCategory === cat.id ? 'border-emerald-500 bg-emerald-50/50' : 'border-slate-100 hover:border-slate-200'
                }`}
              >
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${cat.color}`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <span className="text-sm font-medium text-slate-900">{cat.name}</span>
                <span className="text-xs text-slate-500">{cat.count} {language === 'en' ? 'schemes' : 'योजनाएं'}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Primary actions */}
      <section className="mb-10">
        <h2 className="mb-4 text-lg font-semibold text-slate-900">
          {language === 'en' ? 'Get started' : 'शुरू करें'}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <button
            onClick={() => onNavigate && onNavigate('verifier')}
            className="group flex items-start gap-4 rounded-xl border-2 border-slate-100 bg-white p-5 text-left shadow-sm transition-all hover:border-emerald-200 hover:shadow-md"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-100">
              <CheckCircle className="h-6 w-6 text-emerald-600" />
            </div>
            <div>
              <span className="font-semibold text-slate-900">{language === 'en' ? 'Check eligibility' : 'पात्रता जांचें'}</span>
              <p className="mt-0.5 text-sm text-slate-500">{language === 'en' ? 'See if you qualify for a scheme' : 'देखें कि आप योजना के योग्य हैं'}</p>
            </div>
            <ChevronRight className="ml-auto h-5 w-5 text-slate-300 group-hover:text-emerald-500" />
          </button>
          <button
            onClick={() => onNavigate && onNavigate('matcher')}
            className="group flex items-start gap-4 rounded-xl border-2 border-slate-100 bg-white p-5 text-left shadow-sm transition-all hover:border-emerald-200 hover:shadow-md"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100">
              <Target className="h-6 w-6 text-slate-600" />
            </div>
            <div>
              <span className="font-semibold text-slate-900">{language === 'en' ? 'Find schemes for me' : 'मेरे लिए योजनाएं खोजें'}</span>
              <p className="mt-0.5 text-sm text-slate-500">{language === 'en' ? 'Get personalised recommendations' : 'व्यक्तिगत सिफारिशें प्राप्त करें'}</p>
            </div>
            <ChevronRight className="ml-auto h-5 w-5 text-slate-300 group-hover:text-emerald-500" />
          </button>
        </div>
        <div className="mt-3 flex gap-4">
          <button onClick={() => setShowFAQ(true)} className="text-sm font-medium text-emerald-600 hover:text-emerald-700 hover:underline">
            {language === 'en' ? 'FAQs' : 'सवाल-जवाब'}
          </button>
          <button onClick={() => onNavigate && onNavigate('chat')} className="text-sm font-medium text-emerald-600 hover:text-emerald-700 hover:underline">
            {language === 'en' ? 'Help' : 'सहायता'}
          </button>
        </div>
      </section>

      {/* Popular schemes */}
      <section className="mb-10">
        <h2 className="mb-4 text-lg font-semibold text-slate-900">
          {language === 'en' ? 'Often applied for' : 'अक्सर आवेदन'}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {popularSchemes.map((scheme) => (
            <div key={scheme.id} className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-semibold text-slate-900">{language === 'en' ? scheme.name : scheme.nameHi}</h3>
                  <p className="mt-0.5 text-sm text-slate-500">{scheme.description}</p>
                </div>
                {scheme.trending && (
                  <span className="shrink-0 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">
                    {language === 'en' ? 'Popular' : 'लोकप्रिय'}
                  </span>
                )}
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-slate-50 pt-4">
                <span className="font-semibold text-emerald-600">{scheme.benefits}</span>
                <button onClick={() => onNavigate && onNavigate('parser')} className="text-sm font-medium text-emerald-600 hover:text-emerald-700 hover:underline">
                  {language === 'en' ? 'View details' : 'विवरण देखें'} →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Documents */}
      <section className="mb-10 rounded-xl border border-slate-100 bg-slate-50/50 p-6">
        <h2 className="mb-4 text-lg font-semibold text-slate-900">
          {language === 'en' ? 'Documents you may need' : 'जरूरी दस्तावेज़'}
        </h2>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {docList.map((text, i) => (
            <div key={i} className="flex items-center gap-3 rounded-lg bg-white px-3 py-2.5 shadow-sm">
              <CheckCircle className="h-5 w-5 shrink-0 text-emerald-500" />
              <span className="text-sm font-medium text-slate-700">{text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Guides */}
      <section className="mb-8">
        <h2 className="mb-4 text-lg font-semibold text-slate-900">
          {language === 'en' ? 'Guides' : 'गाइड'}
        </h2>
        <div className="flex flex-wrap gap-4">
          <a href="https://www.youtube.com/watch?v=bo47QgbMXNA" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm hover:border-emerald-200 hover:bg-emerald-50/50 hover:text-emerald-700">
            <PlayCircle className="h-4 w-4" />
            {language === 'en' ? 'How to apply for schemes' : 'योजनाओं के लिए आवेदन'}
          </a>
          <a href="https://www.youtube.com/watch?v=gqZAGf97AM8" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm hover:border-emerald-200 hover:bg-emerald-50/50 hover:text-emerald-700">
            <PlayCircle className="h-4 w-4" />
            {language === 'en' ? 'Digital India guide' : 'डिजिटल इंडिया गाइड'}
          </a>
          <a href="https://www.youtube.com/watch?v=OpK6tX05fmE" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm hover:border-emerald-200 hover:bg-emerald-50/50 hover:text-emerald-700">
            <PlayCircle className="h-4 w-4" />
            {language === 'en' ? 'Track application status' : 'आवेदन स्थिति'}
          </a>
        </div>
      </section>

      {/* FAQ Modal */}
      {showFAQ && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-slate-200 bg-white p-6 shadow-xl sm:p-8">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-slate-900">{language === 'en' ? 'Frequently asked questions' : 'अक्सर पूछे जाने वाले प्रश्न'}</h3>
              <button onClick={() => setShowFAQ(false)} className="rounded-lg p-2 hover:bg-slate-100" aria-label="Close">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="rounded-xl border border-slate-100 bg-slate-50/50 p-4">
                  <h4 className="font-medium text-slate-900">{faq.q}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{faq.a}</p>
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
