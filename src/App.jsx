import ResearcherDashboard from './ResearcherDashboard';
import DataAnalystDashboard from './DataAnalystDashboard';

import React, { useState } from 'react';
import {
  LayoutDashboard,
  Users,
  Database,
  Activity,
  FileText,
  MessageSquare,
  Settings,
} from 'lucide-react';

export default function App() {
  // 1. The "Sandbox" State: This controls the entire app
  const [currentRole, setCurrentRole] = useState('Administrator');

  // 2. Dynamic Sidebar Menu based on Role
  const getSidebarMenu = () => {
    switch (currentRole) {
      case 'Administrator':
        return [
          { name: 'Dashboard', icon: LayoutDashboard },
          { name: 'User Management', icon: Users },
          { name: 'Dataset Monitoring', icon: Database },
          { name: 'System Settings', icon: Settings },
        ];
      case 'Researcher':
        return [
          { name: 'My Projects', icon: FileText },
          { name: 'Upload Dataset', icon: Database },
          { name: 'Discussions', icon: MessageSquare },
        ];
      case 'Data Analyst':
        return [
          { name: 'Analysis Tools', icon: Activity },
          { name: 'Available Datasets', icon: Database },
          { name: 'Export Reports', icon: FileText },
        ];
      case 'Clinical Researcher':
        return [
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
              return (
                <li key={index}>
                  <button className="w-full flex items-center px-6 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                    <Icon className="h-5 w-5 mr-3" />
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
              <option value="Administrator">Administrator</option>
              <option value="Researcher">Researcher</option>
              <option value="Data Analyst">Data Analyst</option>
              <option value="Clinical Researcher">Clinical Researcher</option>
            </select>
          </div>
        </header>

        {/* MAIN DASHBOARD SPACE */}
        <main className="flex-1 overflow-y-auto p-8 bg-gray-50">
          {currentRole === 'Researcher' ? (
            <ResearcherDashboard />
          ) : currentRole === 'Data Analyst' ? (
            <DataAnalystDashboard />
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
