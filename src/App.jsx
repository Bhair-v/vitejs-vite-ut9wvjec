import React, { useState, useEffect } from 'react';
import ResearcherDashboard from './ResearcherDashboard';
import DataAnalystDashboard from './DataAnalystDashboard';
import DataAnalysisTools from './DataAnalysisTools';
import AvailableDatasets from './AvailableDatasets';
import Visualization from './Visualization';
import Reports from './Reports';
import ExportResults from './ExportResults';
import ClinicalResearcherDashboard from './ClinicalResearcherDashboard';
import AdminDashboard from './AdminDashboard';
import Messages from './Messages'; // <-- NEW: Imported Messages Component

import {
  LayoutDashboard,
  Users,
  Database,
  Activity,
  FileText,
  MessageSquare,
  Settings,
  BarChart2,
  Upload
} from 'lucide-react';

export default function App() {
  // 1. App State
  const [currentRole, setCurrentRole] = useState('Administrator');
  const [activeTab, setActiveTab] = useState('Dashboard');

  // Reset to 'Dashboard' whenever the user switches roles
  useEffect(() => {
    setActiveTab('Dashboard');
  }, [currentRole]);

  // 2. Dynamic Sidebar Menu based on Role
  const getSidebarMenu = () => {
    switch (currentRole) {
      case 'Administrator':
        return [
          { name: 'Dashboard', icon: LayoutDashboard },
          { name: 'Messages / Discussions', icon: MessageSquare }, // <-- ADDED
          { name: 'User Management', icon: Users },
          { name: 'Dataset Monitoring', icon: Database },
          { name: 'System Settings', icon: Settings },
        ];
      case 'Researcher':
        return [
          { name: 'Dashboard', icon: LayoutDashboard }, // Added to match other layouts
          { name: 'Messages / Discussions', icon: MessageSquare }, // <-- ADDED
          { name: 'My Projects', icon: FileText },
          { name: 'Upload Dataset', icon: Database },
        ];
      case 'Data Analyst':
        return [
          { name: 'Dashboard', icon: LayoutDashboard },
          { name: 'Messages / Discussions', icon: MessageSquare }, // <-- ADDED
          { name: 'Available Datasets', icon: Database },
          { name: 'Data Analysis Tools', icon: Activity },
          { name: 'Visualization', icon: BarChart2 },
          { name: 'Reports', icon: FileText },
          { name: 'Export Results', icon: Upload },
        ];
      case 'Clinical Researcher':
        return [
          { name: 'Dashboard', icon: LayoutDashboard }, // Added to match other layouts
          { name: 'Messages / Discussions', icon: MessageSquare }, // <-- ADDED
          { name: 'Clinical Trials', icon: Activity },
          { name: 'Patient Records', icon: Users },
          { name: 'Adverse Events', icon: FileText },
        ];
      default:
        return [];
    }
  };

  const menuItems = getSidebarMenu();

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      {/* LEFT SIDEBAR */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <span className="text-xl font-bold text-blue-600">ForgeRx</span>
          <span className="ml-2 text-xs font-semibold text-gray-500 uppercase">
            R&D
          </span>
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = activeTab === item.name;

              return (
                <li key={index}>
                  <button 
                    onClick={() => setActiveTab(item.name)}
                    className={`w-full flex items-center px-6 py-3 transition-colors ${
                      isActive 
                        ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <Icon className={`h-5 w-5 mr-3 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
                    <span className="font-medium text-sm">{item.name}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* TOP NAVIGATION BAR */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8">
          <h1 className="text-xl font-semibold text-gray-800">
            {currentRole} Dashboard
          </h1>

          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500">Sandbox Mode:</span>
            <select
              className="bg-gray-100 border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2"
              value={currentRole}
              onChange={(e) => setCurrentRole(e.target.value)}
            >
              {/* UPDATED: Added team member names based on your image */}
              <option value="Administrator">Rashid Ahmed (Admin)</option>
              <option value="Researcher">Farida Rahman (Researcher)</option>
              <option value="Data Analyst">Kamal Hossain (Data Analyst)</option>
              <option value="Clinical Researcher">Nadia Islam (Clinical Researcher)</option>
            </select>
          </div>
        </header>

        {/* MAIN DASHBOARD SPACE */}
        <main className="flex-1 overflow-y-auto p-8 bg-gray-50">
          
          {/* GLOBAL CHECK: If the active tab is Messages, show the chat regardless of role */}
          {activeTab === 'Messages / Discussions' ? (
            <Messages currentRole={currentRole} />
          ) : currentRole === 'Administrator' ? (
            <AdminDashboard />
          ) : currentRole === 'Researcher' ? (
            <ResearcherDashboard />
          ) : currentRole === 'Data Analyst' ? (
            
            /* -------- ROUTING FOR DATA ANALYST TABS -------- */
            activeTab === 'Dashboard' ? (
              <DataAnalystDashboard />
            ) : activeTab === 'Data Analysis Tools' ? (
              <DataAnalysisTools />
            ) : activeTab === 'Available Datasets' ? (
              <AvailableDatasets />
            ) : activeTab === 'Visualization' ? (
              <Visualization />
            ) : activeTab === 'Reports' ? (
              <Reports />
            ) : activeTab === 'Export Results' ? (
              <ExportResults />
            ) : (
              <div className="flex flex-col items-center justify-center h-full border-2 border-dashed border-gray-300 rounded-3xl opacity-50 bg-white">
                <Activity className="h-12 w-12 text-gray-300 mb-4" />
                <p className="text-gray-400 font-medium italic">
                  Building the {activeTab} view...
                </p>
              </div>
            )

          ) : currentRole === 'Clinical Researcher' ? (
            <ClinicalResearcherDashboard />
          ) : (
            <div className="flex flex-col items-center justify-center h-full border-2 border-dashed border-gray-300 rounded-3xl opacity-50 bg-white">
              <Activity className="h-12 w-12 text-gray-300 mb-4" />
              <p className="text-gray-400 font-medium italic">
                Building {currentRole} widgets...
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}