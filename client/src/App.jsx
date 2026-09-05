import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import EvaluationView from './components/Evaluation/EvaluationView';
import HomeView from './components/Dashboard/HomeView';
import QuestionnaireView from './components/Profile/QuestionnaireView';
import RecommendationsView from './components/Recommendations/RecommendationsView';
import SearchVehicleView from './components/Search/SearchVehicleView';
import CompareView from './components/Compare/CompareView';
import AIAdvisorView from './components/AIAdvisor/AIAdvisorView';
import SavedVehiclesView from './components/Saved/SavedVehiclesView';
import SettingsView from './components/Settings/SettingsView';
import AdminDashboard from './components/Admin/AdminDashboard';
import AuthModal from './components/Auth/AuthModal';
import ScrollScrubbingLanding from './components/Entry/ScrollScrubbingLanding';

function MainLayout() {
  const { showScrollScrubbing, setShowScrollScrubbing } = useApp();

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-[#0b0f19] text-gray-900 dark:text-gray-100 transition-colors duration-200">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <Routes>
            <Route path="/" element={<HomeView />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/profile" element={<QuestionnaireView />} />
            <Route path="/recommendations" element={<RecommendationsView />} />
            <Route path="/search" element={<SearchVehicleView />} />
            <Route path="/evaluation" element={<EvaluationView />} />
            <Route path="/evaluation/:id" element={<EvaluationView />} />
            <Route path="/compare" element={<CompareView />} />
            <Route path="/ai-advisor" element={<AIAdvisorView />} />
            <Route path="/saved" element={<SavedVehiclesView />} />
            <Route path="/settings" element={<SettingsView />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>

      {/* Global Auth Modal */}
      <AuthModal />

      {/* Interactive Scroll-Scrubbed Video Overlay */}
      {showScrollScrubbing && (
        <ScrollScrubbingLanding onClose={() => setShowScrollScrubbing(false)} />
      )}
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
