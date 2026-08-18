import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  Send,
  Sparkles,
  User,
  Zap,
  Info,
  Car,
  ChevronRight,
  RefreshCw
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { sendAiAdvisorChat } from '../../services/api';

const QUICK_PROMPTS = [
  'Why did you recommend this car to me?',
  "Why didn't you recommend the Thar?",
  'I mostly travel on highways. Is this really suitable?',
  'What are the biggest disadvantages for my usage?',
  'What happens if I increase my budget by ₹2 lakh?',
  'I am 6\'2". Will this vehicle be comfortable for me?',
  'Which one is better for me between Nexon and Creta?'
];

export default function AIAdvisorView() {
  const {
    userProfile,
    selectedVehicle,
    evaluation,
    vehicles,
    setActiveTab
  } = useApp();

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: `Hello **${userProfile.name || 'Aryan'}**! I am your personalized AutoDezire AI Advisor.\n\nI have loaded your profile (**₹${userProfile.budget}L budget, ${userProfile.dailyKm} km daily commute, ${userProfile.highwayPercent}% highway**) and the current evaluation of **${selectedVehicle?.brand} ${selectedVehicle?.model} (Score: ${evaluation?.overallScore}/100)**.\n\nHow can I help you evaluate your ride today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    // Call AI service
    const reply = await sendAiAdvisorChat({
      message: query,
      conversationHistory: messages,
      userProfile,
      selectedVehicle,
      suitabilityResult: evaluation,
      recommendedVehicles: vehicles.slice(0, 3)
    });

    const aiMsg = {
      id: Date.now() + 1,
      sender: 'ai',
      text: reply || 'I evaluated your query with your driving profile.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, aiMsg]);
    setIsLoading(false);
  };

  // Helper to parse simple bold markdown
  const renderFormattedText = (txt) => {
    const parts = txt.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-bold text-gray-900 dark:text-white">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16 animate-fadeIn">
      {/* Context Badge Header */}
      <div className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-800 rounded-3xl p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3.5">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-500 text-white flex items-center justify-center shadow-md">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-base font-black text-gray-900 dark:text-white">
                Personalized AutoDezire Advisor
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                Context Active
              </span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Evaluating: <strong className="text-orange-500">{selectedVehicle?.brand} {selectedVehicle?.model}</strong> (Score: {evaluation?.overallScore}/100) for <strong className="text-gray-700 dark:text-gray-200">{userProfile.name}</strong>
            </p>
          </div>
        </div>

        <button
          onClick={() => setActiveTab('evaluation')}
          className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl border border-gray-200 dark:border-gray-700 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:border-orange-500 transition-all self-start sm:self-auto"
        >
          <Car className="w-3.5 h-3.5 text-orange-500" />
          <span>View Spec Sheet</span>
        </button>
      </div>

      {/* Chat Messages Container */}
      <div className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm min-h-[460px] max-h-[560px] flex flex-col justify-between overflow-hidden">
        {/* Messages Scroll Area */}
        <div className="overflow-y-auto space-y-4 pr-2 flex-1 mb-4">
          {messages.map((msg) => {
            const isAI = msg.sender === 'ai';
            return (
              <div
                key={msg.id}
                className={`flex items-start space-x-3 ${isAI ? '' : 'flex-row-reverse space-x-reverse'}`}
              >
                {/* Avatar */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                  isAI
                    ? 'bg-gradient-to-tr from-purple-600 to-pink-500 text-white shadow-sm'
                    : 'bg-orange-500 text-white'
                }`}>
                  {isAI ? <Bot className="w-4 h-4" /> : 'U'}
                </div>

                {/* Message Bubble */}
                <div className={`max-w-[80%] rounded-2xl p-4 text-xs leading-relaxed ${
                  isAI
                    ? 'bg-gray-50 dark:bg-gray-800/70 border border-gray-200 dark:border-gray-700/80 text-gray-800 dark:text-gray-200'
                    : 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md'
                }`}>
                  <div className="whitespace-pre-line">
                    {renderFormattedText(msg.text)}
                  </div>
                  <span className={`block text-[10px] mt-2 ${isAI ? 'text-gray-400' : 'text-orange-100'}`}>
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex items-start space-x-3 animate-pulse">
              <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-3 text-xs text-gray-500 flex items-center space-x-2">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-orange-500" />
                <span>Evaluating profile & vehicle telemetry...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="pt-2 border-t border-gray-100 dark:border-gray-800/80">
          <p className="text-[11px] font-bold text-gray-400 dark:text-gray-500 mb-2 flex items-center space-x-1">
            <Sparkles className="w-3 h-3 text-orange-500" />
            <span>Suggested Questions for Your Profile:</span>
          </p>
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
            {QUICK_PROMPTS.map((prompt, pIdx) => (
              <button
                key={pIdx}
                onClick={() => handleSendMessage(prompt)}
                disabled={isLoading}
                className="whitespace-nowrap px-3 py-1.5 rounded-full text-[11px] font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-orange-500 hover:text-white dark:hover:bg-orange-500 transition-all border border-gray-200 dark:border-gray-700 flex-shrink-0"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Message Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center space-x-2 mt-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Ask anything about ${selectedVehicle?.model || 'this car'} for your usage...`}
              disabled={isLoading}
              className="flex-1 px-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/80 text-xs text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="p-3 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 text-white disabled:opacity-50 shadow-md transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
