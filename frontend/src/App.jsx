import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { 
  FileText, 
  Shield, 
  Target, 
  MessageCircle, 
  Activity,
  Menu,
  X,
  Network,
  ChevronRight,
  Sparkles,
  Heart,
  Search,
  Globe,
  TrendingUp,
  Users,
  Award,
  BookOpen,
  Upload,
  Bookmark,
  Share2,
  Download,
  Mic,
  MapPin,
  HelpCircle,
  PlayCircle,
  CheckCircle,
  FileCheck,
  Bell,
  Star,
  Calendar,
  Phone,
  Home,
  Briefcase,
  GraduationCap,
  Baby,
  Wheat
} from 'lucide-react';
import PolicyParser from './components/PolicyParser';
import EligibilityVerifier from './components/EligibilityVerifier';
import BenefitMatcher from './components/BenefitMatcher';
import ChatAdvocate from './components/ChatAdvocate';
import AgentNetwork from './components/AgentNetwork';
import HomePage from './components/HomePage';
import { Badge } from './components/ui';
import { policyNavigatorAPI } from './services/api';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [backendStatus, setBackendStatus] = useState('checking');
  const [language, setLanguage] = useState('en'); // 'en' or 'hi'
  const [searchQuery, setSearchQuery] = useState('');
  const [fontSize, setFontSize] = useState('normal'); // 'small', 'normal', 'large'
  const [bookmarks, setBookmarks] = useState([]);
  const [showAnnouncements, setShowAnnouncements] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');

  useEffect(() => {
    checkBackendHealth();
  }, []);

  const checkBackendHealth = async () => {
    try {
      await policyNavigatorAPI.checkHealth();
      setBackendStatus('healthy');
    } catch (error) {
      setBackendStatus('error');
    }
  };

  const tabs = [
    {
      id: 'home',
      name: 'होम',
      nameEn: 'Home',
      icon: Home,
      component: null,
      color: 'from-blue-500 to-blue-600',
      description: 'Dashboard',
      emoji: '🏠'
    },
    {
      id: 'chat',
      name: 'सहायता चैट',
      nameEn: 'Help Chat',
      icon: MessageCircle,
      component: ChatAdvocate,
      color: 'from-blue-500 to-blue-600',
      description: 'Get instant help',
      emoji: '💬'
    },
    {
      id: 'parser',
      name: 'योजना देखें',
      nameEn: 'View Scheme',
      icon: FileText,
      component: PolicyParser,
      color: 'from-green-500 to-green-600',
      description: 'Understand schemes',
      emoji: '📋'
    },
    {
      id: 'verifier',
      name: 'पात्रता जांचें',
      nameEn: 'Check Eligibility',
      icon: Shield,
      component: EligibilityVerifier,
      color: 'from-purple-500 to-purple-600',
      description: 'Am I eligible?',
      emoji: '✅'
    },
    {
      id: 'matcher',
      name: 'लाभ खोजें',
      nameEn: 'Find Benefits',
      icon: Target,
      component: BenefitMatcher,
      color: 'from-orange-500 to-orange-600',
      description: 'Discover benefits',
      emoji: '🎯'
    },
    {
      id: 'network',
      name: 'नेटवर्क',
      nameEn: 'Network',
      icon: Network,
      component: AgentNetwork,
      color: 'from-pink-500 to-pink-600',
      description: 'System status',
      emoji: '🌐'
    },
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component;
  const activeTabInfo = tabs.find(tab => tab.id === activeTab);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-orange-50/30 to-green-50/30">
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#fff',
            color: '#374151',
            padding: '16px',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          },
        }}
      />

      {/* Government Tricolor Top Bar */}
      <div className="h-1 bg-gradient-to-r from-orange-400 via-white to-green-500 opacity-80"></div>

      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20 lg:h-24">
            {/* Logo & Title with Official Logo */}
            <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
              {/* Official Policy Navigator Logo */}
              <img 
                src="/logo.png" 
                alt="Policy Navigator Logo" 
                className="w-10 h-10 sm:w-14 sm:h-14 lg:w-20 lg:h-20 object-contain bg-white rounded-full p-1 sm:p-1.5 shadow-lg border border-orange-300 sm:border-2"
                onError={(e) => {
                  // Fallback to emblem if logo not found
                  e.target.style.display = 'none';
                  e.target.nextElementSibling.style.display = 'flex';
                }}
              />
              {/* Fallback Emblem (hidden by default) */}
              <div className="hidden relative w-10 h-10 sm:w-14 sm:h-14 lg:w-20 lg:h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full items-center justify-center shadow-lg sm:shadow-xl border-2 sm:border-4 border-white">
                <div className="absolute inset-0 bg-white rounded-full opacity-20"></div>
                <svg className="w-8 h-8 text-blue-900" fill="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="2" />
                  <circle cx="12" cy="6" r="1" />
                  <circle cx="12" cy="18" r="1" />
                  <circle cx="6" cy="12" r="1" />
                  <circle cx="18" cy="12" r="1" />
                  <circle cx="8.5" cy="8.5" r="1" />
                  <circle cx="15.5" cy="15.5" r="1" />
                  <circle cx="15.5" cy="8.5" r="1" />
                  <circle cx="8.5" cy="15.5" r="1" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1 sm:gap-2">
                  <h1 className="text-sm sm:text-xl lg:text-2xl font-bold text-white truncate">Policy Navigator</h1>
                </div>
                <p className="text-[10px] sm:text-xs text-orange-300 font-medium hidden sm:block">भारत सरकार | Government of India</p>
                <p className="text-[10px] sm:text-xs text-blue-200 hidden md:block">सरकारी योजना सहायक पोर्टल</p>
              </div>
            </div>

            {/* Accessibility & Language Controls */}
            <div className="flex items-center gap-1.5 sm:gap-2 lg:gap-3">
              {/* Font Size Control */}
              <div className="hidden xl:flex items-center gap-1 bg-white/10 px-2 py-1 rounded-lg">
                <button onClick={() => setFontSize('small')} className={`px-2 py-1 text-xs rounded ${fontSize === 'small' ? 'bg-white/20 text-white' : 'text-white/60 hover:text-white'}`}>A</button>
                <button onClick={() => setFontSize('normal')} className={`px-2 py-1 text-sm rounded ${fontSize === 'normal' ? 'bg-white/20 text-white' : 'text-white/60 hover:text-white'}`}>A</button>
                <button onClick={() => setFontSize('large')} className={`px-2 py-1 text-base rounded ${fontSize === 'large' ? 'bg-white/20 text-white font-bold' : 'text-white/60 hover:text-white'}`}>A</button>
              </div>

              {/* Language Switcher */}
              <button 
                onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
                className="flex items-center gap-1 sm:gap-2 bg-white/20 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg hover:bg-white/30 transition-all border border-white/30"
              >
                <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                <span className="text-xs sm:text-sm font-medium text-white hidden sm:inline">{language === 'en' ? 'हिंदी' : 'English'}</span>
              </button>

              {/* Status Badge */}
              <div className="hidden lg:flex items-center gap-2 bg-white/20 px-3 lg:px-4 py-2 lg:py-2.5 rounded-full backdrop-blur-md border border-white/30 shadow-sm">
                <div className={`w-2 h-2 rounded-full ${
                  backendStatus === 'healthy' ? 'bg-green-300 animate-pulse shadow-lg shadow-green-400/50' : 
                  backendStatus === 'checking' ? 'bg-yellow-300 animate-pulse shadow-lg shadow-yellow-400/50' : 
                  'bg-red-300 shadow-lg shadow-red-400/50'
                }`}></div>
                <span className="text-sm font-medium text-white/90">
                  {backendStatus === 'healthy' ? (language === 'en' ? 'System Online' : 'ऑनलाइन') : backendStatus === 'checking' ? (language === 'en' ? 'Connecting...' : 'कनेक्ट हो रहा है...') : (language === 'en' ? 'Offline' : 'ऑफलाइन')}
                </span>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-white/20 active:bg-white/30 transition-colors touch-manipulation"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-white" />}
            </button>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex border-t border-blue-400/30 mt-2 sm:mt-4 pt-2 sm:pt-4 gap-2 sm:gap-3 pb-3 sm:pb-4 overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 lg:px-5 py-2 sm:py-2.5 lg:py-3 rounded-lg transition-all duration-200 border whitespace-nowrap ${
                    isActive
                      ? 'bg-white text-blue-700 border-orange-300 shadow-md'
                      : 'bg-white/10 border-white/20 hover:bg-white/20 text-white backdrop-blur-sm'
                  }`}
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                  <div className="text-left min-w-0">
                    <div className="font-semibold text-xs sm:text-sm leading-tight truncate">{tab.nameEn}</div>
                    <div className={`text-[10px] sm:text-xs mt-0.5 truncate ${
                      isActive ? 'text-blue-600/80' : 'text-white/70'
                    }`}>{tab.name}</div>
                  </div>
                </button>
              );
            })}
          </nav>

          {/* Navigation - Mobile */}
          {mobileMenuOpen && (
            <nav className="md:hidden pb-3 space-y-1.5 border-t border-blue-400/30 pt-2 animate-fade-in">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-lg transition-all border touch-manipulation active:scale-98 ${
                      isActive
                        ? 'bg-white text-blue-700 border-orange-300 shadow-md'
                        : 'bg-white/10 border-white/20 active:bg-white/20 text-white backdrop-blur-sm'
                    }`}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <div className="flex-1 text-left min-w-0">
                      <div className="font-semibold text-base">{tab.nameEn}</div>
                      <div className={`text-sm mt-0.5 ${
                        isActive ? 'text-blue-600/80' : 'text-white/70'
                      }`}>{tab.name}</div>
                    </div>
                  </button>
                );
              })}
            </nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 py-4 sm:py-6 lg:py-8">
        <div className={`${activeTab === 'home' ? '' : 'bg-white/60 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-sm border border-white/50 p-4 sm:p-5 lg:p-6'}`}>
          {activeTab === 'home' ? (
            <HomePage language={language} fontSize={fontSize} onNavigate={(tabId) => setActiveTab(tabId)} />
          ) : (
            ActiveComponent && <ActiveComponent />
          )}
        </div>
      </main>

      {/* Government Footer */}
      <footer className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 border-t-2 border-orange-400/50 mt-8 sm:mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 text-white">
            <div>
              <h3 className="font-bold text-orange-200 mb-2 sm:mb-3 text-base sm:text-lg">योजना सहायता | Scheme Assistance</h3>
              <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
                Digital India Initiative for accessible government scheme information and benefits delivery.
              </p>
              <div className="mt-4 flex items-center gap-2">
                <div className="w-8 h-8 bg-orange-400/80 rounded-full flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <span className="text-xs text-blue-100">Secure & Verified Platform</span>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-orange-200 mb-2 sm:mb-3 text-base sm:text-lg">Quick Links</h3>
              <ul className="text-xs sm:text-sm space-y-1.5 sm:space-y-2 text-blue-100">
                <li className="flex items-center gap-1.5 sm:gap-2 hover:text-orange-200 transition-colors cursor-pointer touch-manipulation active:text-orange-300">
                  <ChevronRight className="w-3 h-3 flex-shrink-0" /> <span className="truncate">Government Schemes Portal</span>
                </li>
                <li className="flex items-center gap-2 hover:text-orange-200 transition-colors cursor-pointer">
                  <ChevronRight className="w-3 h-3" /> Digital India
                </li>
                <li className="flex items-center gap-2 hover:text-orange-200 transition-colors cursor-pointer">
                  <ChevronRight className="w-3 h-3" /> MyGov India
                </li>
                <li className="flex items-center gap-2 hover:text-orange-200 transition-colors cursor-pointer">
                  <ChevronRight className="w-3 h-3" /> Help & Support
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-orange-200 mb-3 text-lg">Contact Information</h3>
              <div className="text-sm space-y-2 text-blue-100">
                <p className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-green-300" /> AI-Powered Service
                </p>
                <p className="flex items-center gap-2">
                  <Network className="w-4 h-4 text-green-300" /> 24x7 Online Support
                </p>
                <p className="mt-3 text-xs text-blue-100">
                  For technical support: support@policynavigator.gov.in
                </p>
              </div>
            </div>
          </div>
          <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-blue-400/30">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 text-xs sm:text-sm">
              <div className="text-blue-50">
                <p>© 2026 Policy Navigator - भारत सरकार | Government of India</p>
                <p className="text-xs text-blue-200 mt-1">National Informatics Centre | Digital India Initiative</p>
              </div>
              <div className="flex gap-4 text-xs text-blue-100">
                <a href="#" className="hover:text-orange-200 transition-colors">Privacy Policy</a>
                <span>|</span>
                <a href="#" className="hover:text-orange-200 transition-colors">Terms of Use</a>
                <span>|</span>
                <a href="#" className="hover:text-orange-200 transition-colors">Accessibility</a>
              </div>
            </div>
          </div>
        </div>
        {/* Bottom Tricolor Stripe */}
        <div className="h-1 bg-gradient-to-r from-orange-400 via-white to-green-500 opacity-80"></div>
      </footer>
    </div>
  );
}

export default App;
