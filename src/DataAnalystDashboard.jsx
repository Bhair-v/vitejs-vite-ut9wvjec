import React, { useState } from 'react';
import {
  Activity,
  Database,
  FileText,
  Sliders,
  Play,
  CheckCircle,
  Clock,
  BarChart2,
} from 'lucide-react';

export default function DataAnalystDashboard() {
  const [threshold, setThreshold] = useState(0.65);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleRunAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => setIsAnalyzing(false), 2000); // Mocks a 2-second analysis delay
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Analysis Workspace
          </h2>
          <p className="text-sm text-gray-500">
            Run volumetric analysis, monitor processing queues, and export
            reports.
          </p>
        </div>
      </div>

      {/* QUICK STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          {
            label: 'Available Datasets',
            value: '4',
            icon: Database,
            color: 'text-blue-600',
            bg: 'bg-blue-50',
          },
          {
            label: 'Active Jobs',
            value: isAnalyzing ? '1' : '0',
            icon: Activity,
            color: 'text-amber-600',
            bg: 'bg-amber-50',
          },
          {
            label: 'Completed Reports',
            value: '12',
            icon: FileText,
            color: 'text-emerald-600',
            bg: 'bg-emerald-50',
          },
          {
            label: 'Storage Used',
            value: '48%',
            icon: BarChart2,
            color: 'text-indigo-600',
            bg: 'bg-indigo-50',
          },
        ].map((stat, index) => (
          <div
            key={index}
            className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center space-x-4"
          >
            <div className={`p-3 rounded-lg ${stat.bg}`}>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* MAIN GRID LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT COLUMN: The Volumetric Tool (Takes up 2 columns) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                <Sliders className="h-5 w-5 mr-2 text-blue-600" />
                Volumetric Segmentation Tool
              </h3>
              <span className="text-xs font-bold text-blue-600 bg-blue-100 px-2 py-1 rounded">
                Target: UTSW-Glioma
              </span>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {/* Controls */}
              <div className="space-y-6 bg-gray-50 p-4 rounded-lg border border-gray-100">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Segmentation Threshold:{' '}
                    <span className="text-blue-600 font-bold">{threshold}</span>
                  </label>
                  <input
                    type="range"
                    min="0.0"
                    max="1.0"
                    step="0.05"
                    value={threshold}
                    onChange={(e) => setThreshold(e.target.value)}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <p className="text-xs text-gray-400 mt-2">
                    Adjust probability threshold for voxel inclusion.
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <button
                    onClick={handleRunAnalysis}
                    disabled={isAnalyzing}
                    className={`w-full py-2.5 rounded-lg font-medium flex items-center justify-center transition-colors ${
                      isAnalyzing
                        ? 'bg-amber-100 text-amber-700 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm'
                    }`}
                  >
                    {isAnalyzing ? (
                      <>
                        <Clock className="h-4 w-4 mr-2 animate-spin" />{' '}
                        Processing Volume...
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4 mr-2" /> Run Analysis
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Mock Visualizer / Output */}
              <div className="border border-gray-200 rounded-lg bg-gray-900 flex flex-col items-center justify-center h-48 relative overflow-hidden">
                {/* Simulated Grid Background */}
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage:
                      'linear-gradient(#374151 1px, transparent 1px), linear-gradient(90deg, #374151 1px, transparent 1px)',
                    backgroundSize: '20px 20px',
                  }}
                ></div>

                {isAnalyzing ? (
                  <div className="text-blue-400 animate-pulse z-10 flex flex-col items-center">
                    <Activity className="h-8 w-8 mb-2" />
                    <span className="text-sm font-mono">
                      Calculating Voxels...
                    </span>
                  </div>
                ) : (
                  <div className="z-10 text-center">
                    <div className="text-emerald-400 text-3xl font-bold font-mono">
                      14.2 cm³
                    </div>
                    <div className="text-gray-400 text-xs mt-1 uppercase tracking-widest">
                      Tumor Volume
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Data Processing Queue */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 h-full">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Data Processing Queue
            </h3>

            <div className="space-y-4">
              <div className="p-3 border border-emerald-100 bg-emerald-50 rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold text-gray-800">
                    RadGAT Feature Extraction
                  </span>
                  <CheckCircle className="h-4 w-4 text-emerald-600" />
                </div>
                <p className="text-xs text-gray-500">Completed in 4m 12s</p>
              </div>

              <div className="p-3 border border-amber-100 bg-amber-50 rounded-lg relative overflow-hidden">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold text-gray-800">
                    Swin UNETR Pre-processing
                  </span>
                  <Activity className="h-4 w-4 text-amber-600 animate-pulse" />
                </div>
                <p className="text-xs text-gray-500">
                  Running: Modality Alignment
                </p>
                {/* Mini progress bar */}
                <div className="w-full bg-amber-200 rounded-full h-1 mt-2">
                  <div
                    className="bg-amber-500 h-1 rounded-full"
                    style={{ width: '45%' }}
                  ></div>
                </div>
              </div>

              <div className="p-3 border border-gray-100 bg-gray-50 rounded-lg opacity-60">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold text-gray-800">
                    UDA Domain Alignment
                  </span>
                  <Clock className="h-4 w-4 text-gray-400" />
                </div>
                <p className="text-xs text-gray-500">Queued</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
