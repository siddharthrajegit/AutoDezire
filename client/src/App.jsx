import React from 'react';
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

function MainLayout() {
  const { activeTab } = useApp();

  const renderActiveView = () => {
    switch (activeTab) {
      case 'home':
        return <HomeView />;
      case 'profile':
        return <QuestionnaireView />;
      case 'recommendations':
        return <RecommendationsView />;
      case 'search':
        return <SearchVehicleView />;
      case 'evaluation':
        return <EvaluationView />;
      case 'compare':
        return <CompareView />;
      case 'ai-advisor':
        return <AIAdvisorView />;
      case 'saved':
        return <SavedVehiclesView />;
      case 'settings':
        return <SettingsView />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <EvaluationView />;
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-[#0b0f19] text-gray-900 dark:text-gray-100 transition-colors duration-200">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header />

        <main className="flex-1 p-6 sm:p-8 overflow-y-auto">
          {renderActiveView()}
        </main>
      </div>

      {/* Global Auth Modal */}
      <AuthModal />
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
