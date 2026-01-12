import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, Bot, User, AlertCircle } from 'lucide-react';
import { Card, Button, Badge } from '../ui';
import { policyNavigatorAPI } from '../../services/api';
import toast from 'react-hot-toast';

const ChatAdvocate = () => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hello! I\'m your Citizen Advocate AI assistant. I can help you understand government schemes, check eligibility, and guide you through the application process. How can I assist you today?',
      timestamp: new Date(),
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      role: 'user',
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setLoading(true);

    try {
      // Extract context from previous messages
      const context = {
        conversation_history: messages.slice(-5).map(m => ({
          role: m.role,
          content: m.content
        }))
      };

      const response = await policyNavigatorAPI.chat(inputMessage, context);
      
      const assistantMessage = {
        role: 'assistant',
        content: response.response || response.data?.response || 'I apologize, but I couldn\'t generate a response. Please try again.',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      toast.error('Failed to get response: ' + (error.response?.data?.detail || error.message));
      console.error('Chat error:', error);
      
      const errorMessage = {
        role: 'assistant',
        content: 'I apologize, but I encountered an error. Please try again or rephrase your question.',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        role: 'assistant',
        content: 'Chat cleared! How can I help you?',
        timestamp: new Date(),
      }
    ]);
  };

  const quickQuestions = [
    "What schemes are available for farmers?",
    "How do I apply for a scholarship?",
    "What documents do I need?",
    "Am I eligible for PM-KISAN?",
  ];

  const handleQuickQuestion = (question) => {
    setInputMessage(question);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-blue-100 rounded-lg">
          <MessageCircle className="w-6 h-6 text-blue-600" />
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-900">Citizen Advocate Chat</h2>
          <p className="text-gray-600">Get personalized assistance with government schemes and benefits</p>
        </div>
        <Button variant="secondary" onClick={handleClearChat} className="text-sm">
          Clear Chat
        </Button>
      </div>

      <Card className="h-[600px] flex flex-col">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                message.role === 'user' 
                  ? 'bg-primary-600' 
                  : 'bg-gradient-to-br from-blue-500 to-purple-600'
              }`}>
                {message.role === 'user' ? (
                  <User className="w-5 h-5 text-white" />
                ) : (
                  <Bot className="w-5 h-5 text-white" />
                )}
              </div>

              <div className={`flex-1 max-w-[80%] ${message.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`rounded-2xl px-4 py-3 ${
                  message.role === 'user'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}>
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
                <span className="text-xs text-gray-400 mt-1 px-2">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="bg-gray-100 rounded-2xl px-4 py-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Questions */}
        {messages.length <= 1 && (
          <div className="px-4 pb-2">
            <p className="text-xs text-gray-500 mb-2">Quick questions:</p>
            <div className="flex flex-wrap gap-2">
              {quickQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickQuestion(question)}
                  className="text-xs px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 transition-colors"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="border-t p-4">
          <div className="flex gap-2">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message here... (Press Enter to send)"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none resize-none"
              rows={2}
              disabled={loading}
            />
            <Button
              onClick={handleSend}
              disabled={!inputMessage.trim() || loading}
              className="self-end"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>

      <Card className="bg-teal-50 border border-teal-200">
        <div className="flex items-start gap-2">
          <AlertCircle className="w-5 h-5 text-teal-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-teal-900 mb-1">AI-Powered Guidance</h4>
            <p className="text-sm text-teal-800">
              This chat is powered by advanced AI that understands government schemes and policies.
              Ask about eligibility, application procedures, required documents, or any questions
              about benefits. The AI maintains context throughout the conversation for personalized assistance.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ChatAdvocate;
