import React, { useState } from 'react';
import { 
  BarChart2, 
  Settings, 
  Play, 
  Activity, 
  TrendingUp,
  X // <-- Imported X icon for the modal close button
} from 'lucide-react';

export default function DataAnalysisTools() {
  // --- STATE FOR MODALS ---
  const [activeModal, setActiveModal] = useState(null); // 't-Test' | 'Pearson Correlation' | null
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState(null);

  // t-Test Inputs
  const [list1, setList1] = useState('');
  const [list2, setList2] = useState('');

  // Pearson Inputs
  const [metric1, setMetric1] = useState('Age at Imaging');
  const [metric2, setMetric2] = useState('Tumor Grade');

  const pearsonMetrics = [
    'Age at Imaging', 'Race', 'Ethnicity', 'Tumor Type', 
    'Pathology Information', 'Tumor Grade', 'IDH', 'IDH_Testing Method', 
    '1p19Q', 'CODEL', 'MGMT', 'Operation Status', 'T1', 'T1GD', 'T2', 'T2FLAIR'
  ];

  // Original tools + The 2 new ones at the top
  const tools = [
    { title: 't-Test', category: 'Statistics', priority: 'High', pColor: 'bg-gray-900 text-white', desc: 'Compare means between two groups to determine if they are significantly different', date: 'Just now' },
    { title: 'Pearson Correlation', category: 'Statistics', priority: 'High', pColor: 'bg-gray-900 text-white', desc: 'Measure the linear correlation between two sets of data', date: 'Just now' },
    { title: 'Statistical Analysis', category: 'Statistics', priority: 'High', pColor: 'bg-gray-900 text-white', desc: 'Perform statistical tests and hypothesis validation', date: 'Mar 9, 2026' },
    { title: 'Regression Analysis', category: 'Modeling', priority: 'High', pColor: 'bg-gray-900 text-white', desc: 'Linear, logistic, and multivariate regression models', date: 'Mar 8, 2026' },
    { title: 'Clustering & Classification', category: 'Machine Learning', priority: 'Medium', pColor: 'bg-gray-100 text-gray-600', desc: 'K-means, hierarchical clustering, and classification algorithms', date: 'Mar 7, 2026' },
    { title: 'Time Series Analysis', category: 'Forecasting', priority: 'Medium', pColor: 'bg-gray-100 text-gray-600', desc: 'Analyze temporal data patterns and forecasting', date: 'Mar 5, 2026' },
    { title: 'Correlation Matrix', category: 'Statistics', priority: 'High', pColor: 'bg-gray-900 text-white', desc: 'Calculate and visualize correlations between variables', date: 'Mar 4, 2026' },
    { title: 'Survival Analysis', category: 'Clinical', priority: 'Low', pColor: 'bg-white border border-gray-200 text-gray-600', desc: 'Cox regression and Kaplan-Meier analysis', date: 'Mar 3, 2026' },
  ];

  const recentAnalyses = [
    { title: 'Q1 2026 Patient Outcomes', type: 'Statistical Analysis', date: 'Mar 9, 2026', status: 'Completed', statusStyle: 'bg-gray-900 text-white' },
    { title: 'Drug Efficacy Regression', type: 'Regression Analysis', date: 'Mar 8, 2026', status: 'Completed', statusStyle: 'bg-gray-900 text-white' },
    { title: 'Patient Segmentation', type: 'Clustering & Classification', date: 'Mar 7, 2026', status: 'In Progress', statusStyle: 'bg-gray-100 text-gray-600' },
  ];

  // --- HANDLERS ---
  const handleOpenModal = (title) => {
    if (title === 't-Test' || title === 'Pearson Correlation') {
      setActiveModal(title);
      setResult(null); // Reset results when opening
    }
  };

  const handleCloseModal = () => {
    setActiveModal(null);
    setResult(null);
    setIsProcessing(false);
  };

  const runDummyAnalysis = () => {
    setIsProcessing(true);
    setResult(null);

    // Simulate an API call / computation delay of 1.5 seconds
    setTimeout(() => {
      if (activeModal === 't-Test') {
        // Generate random p-value between 0.0001 and 0.2000
        const randomP = (Math.random() * 0.2).toFixed(4);
        // Generate random mean difference between -5.00 and 5.00
        const randomDiff = (Math.random() * 10 - 5).toFixed(2);
        
        setResult({
          pValue: randomP,
          meanDiff: randomDiff
        });

      } else if (activeModal === 'Pearson Correlation') {
        // Generate random r coefficient between -1.00 and 1.00
        const r = (Math.random() * 2 - 1).toFixed(2);
        
        // Determine interpretation
        const absR = Math.abs(r);
        let strength = absR >= 0.7 ? 'strong' : absR >= 0.4 ? 'moderate' : 'weak';
        let direction = r >= 0 ? 'positive' : 'negative';
        if (absR < 0.1) {
          strength = 'negligible';
          direction = '';
        }

        setResult({
          coefficient: r,
          comment: `There is a ${strength} ${direction} relationship between ${metric1} and ${metric2}.`
        });
      }
      setIsProcessing(false);
    }, 1500);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 relative">
      
      {/* HEADER */}
      <div className="flex justify-between items-center mb-2">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Data Analysis Tools</h2>
          <p className="text-sm text-gray-500 mt-1">Advanced analytics and statistical tools for research</p>
        </div>
        <button className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
          <Activity size={16} /> New Analysis
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN: Available Tools */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-base font-semibold text-gray-900 mb-2">Available Tools</h3>
          
          <div className="space-y-4">
            {tools.map((tool, index) => (
              <div key={index} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between hover:border-gray-300 transition-colors">
                
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-50 text-blue-500 rounded-lg shrink-0 mt-1">
                    <BarChart2 size={24} />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h4 className="text-sm font-semibold text-gray-900">{tool.title}</h4>
                      <span className="text-[10px] border border-gray-200 text-gray-600 px-2 py-0.5 rounded font-medium">
                        {tool.category}
                      </span>
                      <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wide ${tool.pColor}`}>
                        {tool.priority}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mb-1.5">{tool.desc}</p>
                    <p className="text-[10px] text-gray-400">Last used: {tool.date}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <Settings size={14} /> Configure
                  </button>
                  {/* The RUN Button */}
                  <button 
                    onClick={() => handleOpenModal(tool.title)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    <Play size={14} fill="currentColor" /> Run
                  </button>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: Sidebar Stats */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mt-8">
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-gray-900">Recent Analyses</h3>
              <p className="text-[11px] text-gray-500 mt-0.5">Your latest analysis runs</p>
            </div>
            <div className="space-y-4">
              {recentAnalyses.map((run, i) => (
                <div key={i} className="pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                  <div className="flex justify-between items-start mb-1">
                    <p className="text-sm font-medium text-gray-900">{run.title}</p>
                    <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase ${run.statusStyle}`}>
                      {run.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-500">{run.type}</p>
                  <p className="text-[10px] text-gray-400 mt-1">{run.date}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
             <h3 className="text-sm font-semibold text-gray-900 mb-4">Quick Stats</h3>
             <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                  <span className="text-sm text-gray-600">Total Analyses</span>
                  <span className="text-sm font-bold text-gray-900">127</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                  <span className="text-sm text-gray-600">This Month</span>
                  <span className="text-sm font-bold text-gray-900">18</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Success Rate</span>
                  <span className="text-sm font-bold text-gray-900 flex items-center gap-1">
                    96% <TrendingUp size={14} className="text-emerald-500" />
                  </span>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* ================= MODAL OVERLAY ================= */}
      {activeModal && (
        <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50">
              <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                <Activity size={18} className="text-blue-600" />
                Run {activeModal}
              </h3>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-900 transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5">
              
              {/* --- t-Test Inputs --- */}
              {activeModal === 't-Test' && (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">Group 1 Data</label>
                    <textarea 
                      rows="2"
                      placeholder="e.g. 1.2, 3.4, 2.1, 5.6..."
                      value={list1}
                      onChange={(e) => setList1(e.target.value)}
                      className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">Group 2 Data</label>
                    <textarea 
                      rows="2"
                      placeholder="e.g. 4.5, 6.7, 3.2, 8.9..."
                      value={list2}
                      onChange={(e) => setList2(e.target.value)}
                      className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                    />
                  </div>
                </>
              )}

              {/* --- Pearson Correlation Inputs --- */}
              {activeModal === 'Pearson Correlation' && (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">Variable 1</label>
                    <select 
                      value={metric1}
                      onChange={(e) => setMetric1(e.target.value)}
                      className="w-full border border-gray-200 rounded-lg p-3 text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    >
                      {pearsonMetrics.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">Variable 2</label>
                    <select 
                      value={metric2}
                      onChange={(e) => setMetric2(e.target.value)}
                      className="w-full border border-gray-200 rounded-lg p-3 text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    >
                      {pearsonMetrics.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                  </div>
                </>
              )}

              {/* Modal Run Button */}
              <button 
                onClick={runDummyAnalysis}
                disabled={isProcessing}
                className={`w-full py-3 rounded-lg font-bold text-sm flex items-center justify-center transition-colors ${
                  isProcessing ? 'bg-blue-100 text-blue-600 cursor-wait' : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md'
                }`}
              >
                {isProcessing ? 'Computing...' : 'Run Analysis'}
              </button>

              {/* --- Result Displays --- */}
              {result && activeModal === 't-Test' && (
                <div className="mt-4 p-4 bg-emerald-50 border border-emerald-100 rounded-lg animate-in slide-in-from-bottom-2">
                  <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wide mb-3 border-b border-emerald-200 pb-2">Results</h4>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-emerald-900">p-value:</span>
                    <span className="text-sm font-bold text-emerald-700 font-mono">{result.pValue}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-emerald-900">Mean Difference:</span>
                    <span className="text-sm font-bold text-emerald-700 font-mono">{result.meanDiff}</span>
                  </div>
                </div>
              )}

              {result && activeModal === 'Pearson Correlation' && (
                <div className="mt-4 p-4 bg-emerald-50 border border-emerald-100 rounded-lg animate-in slide-in-from-bottom-2">
                  <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wide mb-3 border-b border-emerald-200 pb-2">Results</h4>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-emerald-900">Coefficient (r):</span>
                    <span className="text-sm font-bold text-emerald-700 font-mono">{result.coefficient}</span>
                  </div>
                  <p className="text-xs font-medium text-emerald-800 mt-3 leading-relaxed bg-white/50 p-2 rounded">
                    {result.comment}
                  </p>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

    </div>
  );
}