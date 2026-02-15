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

export default function App() {
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
    <div className="min-h-screen bg-gradient-to-br from-warm-50 via-amber-50/40 to-earth-50">
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#fff',
            color: '#374151',
            padding: '16px',
            borderRadius: '16px',
            boxShadow: '0 10px 40px -10px rgba(245, 158, 11, 0.15)',
          },
        }}
      />

      {/* Tricolor */}
      <div className="h-1 bg-gradient-to-r from-[#FF9933] via-white to-[#138808]"></div>

      {/* Header – clean, editorial (no pill dashboard look) */}
      <header className="bg-white sticky top-0 z-40 border-b border-gray-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Top row: logo + tagline + utils */}
          <div className="flex justify-between items-center h-14 sm:h-16">
            <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('home'); }} className="flex items-center gap-3 min-w-0">
              <img
                src="/logo.png"
                alt=""
                className="w-9 h-9 sm:w-10 sm:h-10 object-contain rounded-sm border border-gray-200"
                onError={(e) => {
                  e.target.style.display = 'none';
                  const next = e.target.nextElementSibling;
                  if (next) { next.classList.remove('hidden'); next.classList.add('flex'); }
                }}
              />
              <div className="hidden w-9 h-9 sm:w-10 sm:h-10 rounded-sm bg-amber-100 border border-amber-200 items-center justify-center">
                <svg className="w-5 h-5 text-amber-700" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.18l6.9 3.45L12 11.09 5.1 7.63 12 4.18zM4 8.82l7 3.5v7.36l-7-3.5V8.82zm9 10.86v-7.36l7-3.5v7.36l-7 3.5z"/></svg>
              </div>
              <div className="min-w-0">
                <h1 className="text-base sm:text-lg font-semibold text-gray-900 truncate">Policy Navigator</h1>
                <p className="text-[10px] sm:text-xs text-gray-500 truncate hidden sm:block">भारत सरकार · Scheme Assistant</p>
              </div>
            </a>

            <div className="flex items-center gap-3 sm:gap-4">
              <div className="hidden sm:flex items-center gap-0.5 text-gray-500">
                <button onClick={() => setFontSize('small')} className={`px-1.5 py-0.5 text-xs ${fontSize === 'small' ? 'text-gray-900 font-medium' : 'hover:text-gray-700'}`} title="Small text">A</button>
                <button onClick={() => setFontSize('normal')} className={`px-1.5 py-0.5 text-sm ${fontSize === 'normal' ? 'text-gray-900 font-medium' : 'hover:text-gray-700'}`} title="Normal text">A</button>
                <button onClick={() => setFontSize('large')} className={`px-1.5 py-0.5 text-base ${fontSize === 'large' ? 'text-gray-900 font-medium' : 'hover:text-gray-700'}`} title="Large text">A</button>
              </div>
              <button
                onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
                className="text-xs sm:text-sm text-gray-600 hover:text-gray-900 border-b border-transparent hover:border-gray-400 transition-colors"
              >
                {language === 'en' ? 'हिंदी' : 'English'}
              </button>
              <span className="hidden lg:inline-flex items-center gap-1.5 text-xs text-gray-500">
                <span className={`w-1.5 h-1.5 rounded-full ${backendStatus === 'healthy' ? 'bg-green-500' : backendStatus === 'checking' ? 'bg-amber-400 animate-pulse' : 'bg-red-500'}`} />
                {backendStatus === 'healthy' ? 'Online' : backendStatus === 'checking' ? '…' : 'Offline'}
              </span>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 -mr-2 text-gray-600 hover:text-gray-900"
                aria-label="Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Nav: simple text links with underline for active */}
          <nav className="hidden md:flex gap-0 border-t border-gray-100">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 -mb-px transition-colors whitespace-nowrap ${
                    isActive
                      ? 'text-amber-700 border-amber-500'
                      : 'text-gray-600 border-transparent hover:text-gray-900 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4 opacity-80" />
                  {tab.nameEn}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Mobile nav */}
        {mobileMenuOpen && (
          <nav className="md:hidden border-t border-gray-100 bg-gray-50/80 py-2 animate-fade-in">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => { setActiveTab(tab.id); setMobileMenuOpen(false); }}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left text-sm ${
                    isActive ? 'bg-amber-50 text-amber-800 font-medium' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.nameEn} <span className="text-gray-400 font-normal">— {tab.name}</span>
                </button>
              );
            })}
          </nav>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 py-4 sm:py-6 lg:py-8">
        <div className={`${activeTab === 'home' ? '' : 'bg-white/80 backdrop-blur-sm rounded-2xl shadow-soft border border-amber-100/60 p-4 sm:p-6 lg:p-8'}`}>
          {activeTab === 'home' ? (
            <HomePage language={language} fontSize={fontSize} onNavigate={(tabId) => setActiveTab(tabId)} />
          ) : (
            ActiveComponent && <ActiveComponent />
          )}
        </div>
      </main>

      {/* Footer - warm */}
      <footer className="bg-gradient-to-r from-amber-700 via-amber-600 to-orange-600 border-t border-amber-500/50 mt-10 sm:mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-white">
            <div>
              <h3 className="font-bold text-amber-100 mb-3 text-lg">योजना सहायता | Scheme Assistance</h3>
              <p className="text-sm text-amber-50/90 leading-relaxed">
                Part of Digital India — helping every citizen find the right schemes. Free, simple, and in your language.
              </p>
              <div className="mt-4 flex items-center gap-2">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <span className="text-sm text-amber-50/90">Secure & verified</span>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-amber-100 mb-3 text-lg">Quick links</h3>
              <ul className="text-sm space-y-2 text-amber-50/90">
                <li className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer"><ChevronRight className="w-3 h-3" /> Government Schemes Portal</li>
                <li className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer"><ChevronRight className="w-3 h-3" /> Digital India</li>
                <li className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer"><ChevronRight className="w-3 h-3" /> MyGov India</li>
                <li className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer"><ChevronRight className="w-3 h-3" /> Help & Support</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-amber-100 mb-3 text-lg">Contact</h3>
              <div className="text-sm space-y-2 text-amber-50/90">
                <p className="flex items-center gap-2"><Activity className="w-4 h-4 text-emerald-200" /> AI-assisted service</p>
                <p className="flex items-center gap-2"><Network className="w-4 h-4 text-emerald-200" /> 24×7 online</p>
                <p className="mt-3 text-xs">support@policynavigator.gov.in</p>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-amber-500/40 flex flex-col sm:flex-row justify-between items-center gap-3 text-sm text-amber-50/80">
            <p>© 2026 Policy Navigator — भारत सरकार | Government of India</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <span>|</span>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <span>|</span>
              <a href="#" className="hover:text-white transition-colors">Accessibility</a>
            </div>
          </div>
        </div>
        <div className="h-1.5 bg-gradient-to-r from-amber-500 via-white to-emerald-500"></div>
      </footer>
    </div>
  );
}
