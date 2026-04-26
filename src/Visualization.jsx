import React from 'react';
import { 
  BarChart2, 
  LineChart, 
  PieChart, 
  Activity, 
  Share2, 
  Download, 
  Eye,
  Plus
} from 'lucide-react';

export default function Visualization() {
  const chartTypes = [
    { title: 'Bar Chart', desc: 'Create a new bar chart', icon: BarChart2, color: 'text-blue-600', bg: 'bg-blue-50' },
    { title: 'Line Chart', desc: 'Create a new line chart', icon: LineChart, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { title: 'Pie Chart', desc: 'Create a new pie chart', icon: PieChart, color: 'text-purple-600', bg: 'bg-purple-50' },
    { title: 'Scatter Plot', desc: 'Create a new scatter plot', icon: Activity, color: 'text-orange-500', bg: 'bg-orange-50' },
  ];

  const recentVisualizations = [
    {
      title: 'Patient Demographics Distribution',
      type: 'Pie Chart',
      dataset: 'Patient Records Q1 2026',
      date: 'Mar 9, 2026',
      icon: PieChart
    },
    {
      title: 'Treatment Efficacy Over Time',
      type: 'Line Chart',
      dataset: 'Clinical Trial Data',
      date: 'Mar 8, 2026',
      icon: LineChart
    },
    {
      title: 'Adverse Events by Severity',
      type: 'Bar Chart',
      dataset: 'Adverse Event Reports',
      date: 'Mar 7, 2026',
      icon: BarChart2
    },
    {
      title: 'Biomarker Trends Analysis',
      type: 'Line Chart',
      dataset: 'Biomarker Results',
      date: 'Mar 6, 2026',
      icon: Activity
    },
    {
      title: 'Trial Site Performance',
      type: 'Bar Chart',
      dataset: 'Multi-site Trial Data',
      date: 'Mar 5, 2026',
      icon: BarChart2
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Visualization</h2>
          <p className="text-sm text-gray-500 mt-1">Create and manage data visualizations</p>
        </div>
        <button className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
          <Activity size={16} /> New Visualization
        </button>
      </div>

      {/* CHART TYPES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {chartTypes.map((chart, index) => {
          const Icon = chart.icon;
          return (
            <div key={index} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:border-gray-300 transition-colors cursor-pointer group">
              <div className={`w-10 h-10 rounded-lg ${chart.bg} ${chart.color} flex items-center justify-center mb-4 group-hover:scale-105 transition-transform`}>
                <Icon size={20} />
              </div>
              <h3 className="text-sm font-semibold text-gray-900 mb-1">{chart.title}</h3>
              <p className="text-xs text-gray-500">{chart.desc}</p>
            </div>
          );
        })}
      </div>

      {/* RECENT VISUALIZATIONS SECTION */}
      <div className="space-y-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-base font-semibold text-gray-900">Recent Visualizations</h3>
          <button className="text-xs font-semibold text-gray-700 bg-white border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors">
            View All
          </button>
        </div>

        <div className="space-y-3">
          {recentVisualizations.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-gray-300 transition-colors">
                
                {/* Left Side: Icon & Details */}
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-lg shrink-0">
                    <Icon size={20} />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h4 className="text-sm font-semibold text-gray-900">{item.title}</h4>
                      <span className="text-[10px] border border-gray-200 text-gray-600 px-2 py-0.5 rounded-full font-medium">
                        {item.type}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span>Dataset: {item.dataset}</span>
                      <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                      <span>Created {item.date}</span>
                    </div>
                  </div>
                </div>

                {/* Right Side: Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded transition-colors">
                    <Share2 size={14} /> Share
                  </button>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded transition-colors">
                    <Download size={14} /> Export
                  </button>
                  <button className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors ml-2">
                    View
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}