/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Layout from './components/Layout';
import HomeView from './components/HomeView';
import OilShopView from './components/OilShopView';
import PaintRequestView from './components/PaintRequestView';
import QuoteRequestView from './components/QuoteRequestView';
import AboutView from './components/AboutView';
import ContactView from './components/ContactView';
import DashboardView from './components/DashboardView';
import { EngineOil } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');

  const handleSelectOilForEnquiry = (oil: EngineOil) => {
    // Navigate straight to combined quotation page and prepopulate
    setActiveTab('quote');
  };

  const renderActiveView = () => {
    switch (activeTab) {
      case 'home':
        return (
          <HomeView
            onNavigate={setActiveTab}
            onSelectOilForEnquiry={handleSelectOilForEnquiry}
          />
        );
      case 'oil':
        return <OilShopView onSelectOilForEnquiry={handleSelectOilForEnquiry} />;
      case 'paint':
        return <PaintRequestView />;
      case 'quote':
        return <QuoteRequestView />;
      case 'about':
        return <AboutView />;
      case 'contact':
        return <ContactView />;
      case 'dashboard':
        return <DashboardView />;
      default:
        return (
          <HomeView
            onNavigate={setActiveTab}
            onSelectOilForEnquiry={handleSelectOilForEnquiry}
          />
        );
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      <div id="view-transition-container" className="flex-grow flex flex-col">
        {renderActiveView()}
      </div>
    </Layout>
  );
}
