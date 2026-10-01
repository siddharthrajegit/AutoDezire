import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  Bot,
  Send,
  Sparkles,
  User,
  Car,
  Bike,
  ChevronRight,
  RefreshCw,
  AlertTriangle,
  RotateCcw,
  SlidersHorizontal,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { sendAiAdvisorChat } from '../../services/api';

const CAR_QUICK_PROMPTS = [
  'Why did Auto Dezire recommend this car for me?',
  'Is this car suitable for my usage?',
  'Why is this better for my budget?',
  'What are the disadvantages for me?',
  'How does the alternative compare?',
  'Is this car good for my height?'
];

const BIKE_QUICK_PROMPTS = [
  'Why did Auto Dezire recommend this bike for me?',
  'Can I comfortably flat-foot this with my height?',
  'Is the kerb weight manageable for my weight?',
  'Is this suitable for my daily commute?',
  'What are the disadvantages for me?',
  'How does the alternative compare?'
];

export default function AIAdvisorView() {
  const {
    userProfile,
    bikeProfile,
    selectedVehicle,
    selectedVehicleType,
    evaluation,
    vehicles,
    bikes,
    setActiveTab,
    aiChatMessages,
    setAiChatMessages,
    clearAiChatMessages
  } = useApp();

  const isTwoWheeler =
    selectedVehicle?.category === 'Motorcycle' ||
    selectedVehicle?.category === 'Scooter' ||
    selectedVehicle?.category === 'Electric Scooter' ||
    selectedVehicleType === '2-wheeler';

  const activeProfile = isTwoWheeler ? bikeProfile : userProfile;
  const quickPrompts = isTwoWheeler ? BIKE_QUICK_PROMPTS : CAR_QUICK_PROMPTS;

  const vehicleName = selectedVehicle
    ? `${selectedVehicle.brand} ${selectedVehicle.model}`
    : isTwoWheeler ? 'Selected 2-Wheeler' : 'Selected Automobile';

  const initialWelcomeMessage = useMemo(() => ({
    id: 1,
    sender: 'ai',
    text: `Hello **${activeProfile.name || 'Friend'}**! I am your personalized AutoDezire AI Advisor.\n\nI have received your profile (**₹${activeProfile.budget}L budget, ${isTwoWheeler ? `${activeProfile.riderHeight || 172} cm height, ${activeProfile.riderWeight || 68} kg` : `${activeProfile.height || 175} cm height, ${activeProfile.dailyKm || 35} km daily commute`}**) and AutoDezire's recommendation of **${vehicleName} (Score: ${evaluation?.overallScore || 'N/A'}/100)**.\n\nFeel free to ask why this automobile was chosen, how it compares with alternatives, or whether it suits your daily commute and body ergonomics!`,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }), [activeProfile, vehicleName, evaluation, isTwoWheeler]);

  // Page Navigation Memory: initialize from sessionStorage / AppContext if user already chatted
  const [messages, setMessages] = useState(() => {
    if (aiChatMessages && Array.isArray(aiChatMessages) && aiChatMessages.length > 0) {
      return aiChatMessages;
    }
    return [initialWelcomeMessage];
  });

  // Sync to AppContext / sessionStorage across page navigations
  useEffect(() => {
    if (messages && messages.length > 0) {
      setAiChatMessages(messages);
    }
  }, [messages, setAiChatMessages]);

  // Refresh welcome message if no conversation has started yet and vehicle changes
  useEffect(() => {
    setMessages(prev => {
      if (prev.length === 1 && prev[0].id === 1) {
        return [initialWelcomeMessage];
      }
      return prev;
    });
  }, [initialWelcomeMessage]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [lastFailedQuery, setLastFailedQuery] = useState(null);
  const [activeModel, setActiveModel] = useState('google/gemma-4-26b-a4b-it');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend) => {
    const query = (textToSend || input || '').trim();
    if (!query || isLoading) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);
    setLastFailedQuery(null);

    const relevantAlternatives = (isTwoWheeler ? bikes : vehicles)
      .filter(v => (v.id || v._id) !== (selectedVehicle?.id || selectedVehicle?._id))
      .slice(0, 3);

    // Call backend API
    const response = await sendAiAdvisorChat({
      message: query,
      conversationHistory: messages,
      userProfile: activeProfile,
      selectedVehicle,
      suitabilityResult: evaluation,
      recommendedVehicles: relevantAlternatives
    });

    if (response.success) {
      if (response.model) setActiveModel(response.model);
      const aiMsg = {
        id: Date.now() + 1,
        sender: 'ai',
        text: response.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMsg]);
    } else {
      setLastFailedQuery(query);
      const errorMsg = {
        id: Date.now() + 1,
        sender: 'error',
        text: response.error || 'Unable to generate AI response. Please check your backend connection and OpenRouter API key.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    }

    setIsLoading(false);
  };

  const handleResetChat = () => {
    clearAiChatMessages();
    setMessages([initialWelcomeMessage]);
    setLastFailedQuery(null);
  };

  // Helper to parse simple bold and bullet points markdown
  const renderFormattedText = (txt) => {
    if (!txt) return null;
    const lines = txt.split('\n');

    return lines.map((line, lIdx) => {
      const isBullet = line.trim().startsWith('- ') || line.trim().startsWith('* ');
      const content = isBullet ? line.trim().slice(2) : line;

      const parts = content.split(/(\*\*.*?\*\*)/g);
      const renderedParts = parts.map((part, pIdx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={pIdx} className="font-bold text-gray-900 dark:text-white">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return part;
      });

      if (isBullet) {
        return (
          <li key={lIdx} className="ml-4 list-disc space-y-1">
            {renderedParts}
          </li>
        );
      }

      return (
        <p key={lIdx} className={line.trim() === '' ? 'h-2' : ''}>
          {renderedParts}
        </p>
      );
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-5 pb-16 animate-fadeIn">
      {/* Context Badge Header */}
      <div className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-800 rounded-3xl p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3.5">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-500 text-white flex items-center justify-center shadow-md flex-shrink-0">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-base font-black text-gray-900 dark:text-white">
                AutoDezire AI Assistant
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                Context Active
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20">
                Gemma 4 26B
              </span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              Evaluating: <strong className="text-orange-500">{vehicleName}</strong> (Score: {evaluation?.overallScore || 0}/100) for <strong className="text-gray-700 dark:text-gray-200">{activeProfile.name || 'User'}</strong>
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 self-start sm:self-auto">
          <button
            onClick={handleResetChat}
            className="flex items-center space-x-1 px-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-700 text-xs font-semibold text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:border-gray-400 transition-all"
            title="Clear and restart conversation"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>

          <button
            onClick={() => setActiveTab('evaluation')}
            className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl border border-gray-200 dark:border-gray-700 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:border-orange-500 hover:text-orange-500 transition-all"
          >
            {isTwoWheeler ? <Bike className="w-3.5 h-3.5 text-purple-500" /> : <Car className="w-3.5 h-3.5 text-orange-500" />}
            <span>View Specs</span>
          </button>
        </div>
      </div>

      {/* Chat Messages Container */}
      <div className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-800 rounded-3xl p-5 sm:p-6 shadow-sm min-h-[480px] max-h-[600px] flex flex-col justify-between overflow-hidden">
        {/* Messages Scroll Area */}
        <div className="overflow-y-auto space-y-4 pr-1 sm:pr-2 flex-1 mb-4 scrollbar-thin">
          {messages.map((msg) => {
            const isAI = msg.sender === 'ai';
            const isError = msg.sender === 'error';

            if (isError) {
              return (
                <div key={msg.id} className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-500 flex items-center justify-center flex-shrink-0">
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                  <div className="max-w-[85%] rounded-2xl p-4 text-xs bg-rose-500/10 border border-rose-500/30 text-rose-400 space-y-2">
                    <div className="font-semibold">{msg.text}</div>
                    {lastFailedQuery && (
                      <button
                        onClick={() => handleSendMessage(lastFailedQuery)}
                        className="inline-flex items-center space-x-1 text-[11px] font-bold text-white bg-rose-600 hover:bg-rose-700 px-3 py-1 rounded-lg transition-all"
                      >
                        <RefreshCw className="w-3 h-3" />
                        <span>Retry Question</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            }

            return (
              <div
                key={msg.id}
                className={`flex items-start space-x-3 ${isAI ? '' : 'flex-row-reverse space-x-reverse'}`}
              >
                {/* Avatar */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                    isAI
                      ? 'bg-gradient-to-tr from-purple-600 to-pink-500 text-white shadow-sm'
                      : 'bg-orange-500 text-white shadow-sm'
                  }`}
                >
                  {isAI ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                </div>

                {/* Message Bubble */}
                <div
                  className={`max-w-[85%] sm:max-w-[80%] rounded-2xl p-4 text-xs leading-relaxed ${
                    isAI
                      ? 'bg-gray-50 dark:bg-gray-800/70 border border-gray-200 dark:border-gray-700/80 text-gray-800 dark:text-gray-200'
                      : 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md'
                  }`}
                >
                  <div className="space-y-1.5">
                    {renderFormattedText(msg.text)}
                  </div>
                  <div className={`flex items-center justify-between mt-2 pt-1 border-t ${isAI ? 'border-gray-200/50 dark:border-gray-700/50 text-gray-400' : 'border-orange-400/50 text-orange-100'}`}>
                    <span className="text-[10px]">{msg.timestamp}</span>
                    {isAI && (
                      <span className="text-[9px] uppercase tracking-wider text-purple-400 dark:text-purple-300 font-semibold">
                        Gemma 4 26B
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex items-start space-x-3 animate-pulse">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 to-pink-500 text-white flex items-center justify-center text-xs">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-3.5 text-xs text-gray-600 dark:text-gray-300 flex items-center space-x-2 border border-gray-200 dark:border-gray-700">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-orange-500" />
                <span>Evaluating user profile & AutoDezire recommendation telemetry...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="pt-3 border-t border-gray-100 dark:border-gray-800/80">
          <p className="text-[11px] font-bold text-gray-400 dark:text-gray-500 mb-2 flex items-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5 text-orange-500" />
            <span>Suggested Questions for Your Profile:</span>
          </p>
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
            {quickPrompts.map((prompt, pIdx) => (
              <button
                key={pIdx}
                onClick={() => handleSendMessage(prompt)}
                disabled={isLoading}
                className="whitespace-nowrap px-3 py-1.5 rounded-full text-[11px] font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-orange-500 hover:text-white dark:hover:bg-orange-500 transition-all border border-gray-200 dark:border-gray-700 flex-shrink-0 disabled:opacity-50"
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
              placeholder={`Ask anything about ${selectedVehicle?.model || 'this automobile'} for your usage...`}
              disabled={isLoading}
              className="flex-1 px-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/80 text-xs text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="p-3 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 text-white disabled:opacity-40 disabled:cursor-not-allowed shadow-md hover:shadow-orange-500/25 transition-all flex items-center justify-center"
              title="Send question"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
