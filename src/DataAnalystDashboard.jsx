import {
    Database,
    FileText,
    Clock,
    Download,
    CheckCircle,
    MoreVertical,
    PlusCircle,
    BarChart2,
    PlayCircle,
    Activity // <--- Add this right here!
  } from 'lucide-react';

export default function DataAnalystDashboard() {
  const stats = [
    { label: 'Datasets Available', value: '23', icon: Database, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Jobs Running', value: '3', icon: PlayCircle, color: 'text-orange-500', bg: 'bg-orange-50' },
    { label: 'Completed Reports', value: '47', icon: FileText, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { label: 'Queue Items', value: '3', icon: Clock, color: 'text-purple-500', bg: 'bg-purple-50' },
  ];

  const datasets = [
    { title: 'Dengue Cases - Dhaka Division', status: 'Ready', statusTheme: 'bg-gray-900 text-white', records: '15,420', author: 'Dr. Tahmina Begum' },
    { title: 'Air Quality Measurements', status: 'Ready', statusTheme: 'bg-gray-900 text-white', records: '8,760', author: 'Environmental Team' },
    { title: 'Patient Survey Responses', status: 'Processing', statusTheme: 'bg-gray-100 text-gray-600', records: '3,240', author: 'Farida Rahman' },
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-screen font-sans text-gray-900">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Data Analyst Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Welcome back, Kamal Hossain</p>
        </div>
        <button className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
          <PlusCircle size={16} /> Start New Analysis
        </button>
      </div>

      {/* TOP STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
            <div className={`p-3 rounded-lg ${stat.bg}`}>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-xs text-gray-500 font-medium">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT COLUMN */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* RECENT DATASETS */}
          <section className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="mb-6">
              <h3 className="text-base font-semibold text-gray-900">Recent Datasets Available</h3>
              <p className="text-xs text-gray-500">Latest datasets ready for analysis</p>
            </div>
            <div className="space-y-4">
              {datasets.map((ds, i) => (
                <div key={i} className="p-4 rounded-lg border border-gray-200 flex justify-between items-center hover:bg-gray-50 transition-colors">
                  <div>
                    <div className="flex items-center gap-3 mb-1.5">
                      <span className="font-semibold text-gray-900">{ds.title}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wide ${ds.statusTheme}`}>
                        {ds.status}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">{ds.records} records • Uploaded by {ds.author}</p>
                    <div className="flex gap-4 mt-3">
                      <button className="text-xs font-semibold flex items-center gap-1.5 text-gray-700 hover:text-blue-600 bg-white border border-gray-200 px-3 py-1.5 rounded">
                        <BarChart2 size={14} /> Analyze
                      </button>
                      <button className="text-xs font-semibold flex items-center gap-1.5 text-gray-700 hover:text-blue-600 bg-white border border-gray-200 px-3 py-1.5 rounded">
                        <Download size={14} /> Download
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ANALYSIS JOBS RUNNING */}
          <section className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="mb-6">
              <h3 className="text-base font-semibold text-gray-900">Analysis Jobs Running</h3>
              <p className="text-xs text-gray-500">Currently processing tasks</p>
            </div>
            <div className="space-y-6">
              {[
                { name: 'Statistical Analysis - Dengue Correlation', progress: 75, eta: '10 min' },
                { name: 'Machine Learning Model Training', progress: 45, eta: '25 min' },
                { name: 'Data Cleaning & Validation', progress: 90, eta: '5 min' },
              ].map((job, i) => (
                <div key={i}>
                  <div className="flex justify-between items-end mb-2">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{job.name}</p>
                      <p className="text-[11px] text-gray-500 mt-0.5">ETA: {job.eta}</p>
                    </div>
                    <span className="text-[10px] font-bold bg-gray-900 text-white px-2 py-0.5 rounded uppercase tracking-wide">Running</span>
                  </div>
                  <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden mt-2">
                    <div className="bg-gray-900 h-full transition-all duration-500" style={{ width: `${job.progress}%` }}></div>
                  </div>
                  <p className="text-right text-[11px] text-gray-500 mt-1">{job.progress}%</p>
                </div>
              ))}
            </div>
          </section>

          {/* ACTIVITY TRENDS CHART */}
          <section className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
             <div className="mb-6">
              <h3 className="text-base font-semibold text-gray-900">Analysis Activity Trends</h3>
              <p className="text-xs text-gray-500">Your analysis and dataset usage over time</p>
            </div>
            <div className="h-48 w-full relative pt-4">
              {/* Simple SVG Chart Representation */}
              <svg className="w-full h-full overflow-visible" viewBox="0 0 600 160" preserveAspectRatio="none">
                  {/* Grid Lines */}
                {[0, 1, 2, 3, 4].map(i => (
                  <line key={i} x1="0" y1={i * 40} x2="100%" y2={i * 40} stroke="#f3f4f6" strokeWidth="1" strokeDasharray="4 4" />
                ))}
                {/* Y-Axis Labels */}
                <text x="-15" y="5" className="text-[10px] fill-gray-400">28</text>
                <text x="-15" y="45" className="text-[10px] fill-gray-400">21</text>
                <text x="-15" y="85" className="text-[10px] fill-gray-400">14</text>
                <text x="-15" y="125" className="text-[10px] fill-gray-400">7</text>
                <text x="-15" y="165" className="text-[10px] fill-gray-400">0</text>
                
                {/* The Trend Line */}
                <path 
                  d="M0,130 L120,110 L240,95 L360,75 L480,55 L600,40" 
                  fill="none" stroke="#8b5cf6" strokeWidth="2" 
                  vectorEffect="non-scaling-stroke"
                />
                {/* Data Points */}
                <circle cx="0" cy="130" r="4" fill="white" stroke="#8b5cf6" strokeWidth="2" />
                <circle cx="120" cy="110" r="4" fill="white" stroke="#8b5cf6" strokeWidth="2" />
                <circle cx="240" cy="95" r="4" fill="white" stroke="#8b5cf6" strokeWidth="2" />
                <circle cx="360" cy="75" r="4" fill="white" stroke="#8b5cf6" strokeWidth="2" />
                <circle cx="480" cy="55" r="4" fill="white" stroke="#8b5cf6" strokeWidth="2" />
                <circle cx="600" cy="40" r="4" fill="white" stroke="#8b5cf6" strokeWidth="2" />
              </svg>
              {/* X-Axis Labels */}
              <div className="flex justify-between mt-4 text-[11px] text-gray-500">
                <span>Oct</span><span>Nov</span><span>Dec</span><span>Jan</span><span>Feb</span><span>Mar</span>
              </div>
              <div className="flex justify-center gap-4 mt-4 text-[11px] text-gray-500">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full border-2 border-purple-500"></span> Analyses</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full border-2 border-blue-400"></span> Datasets</span>
              </div>
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6">
          
          {/* COMPLETED REPORTS */}
          <section className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="mb-6">
              <h3 className="text-base font-semibold text-gray-900">Completed Reports</h3>
              <p className="text-xs text-gray-500">Recent analysis outputs</p>
            </div>
            <div className="space-y-4">
              {[
                { title: 'Dengue Outbreak Analysis Report', date: 'Mar 7, 2026', size: '2.4 MB' },
                { title: 'Air Quality Trends Q1 2026', date: 'Mar 5, 2026', size: '1.8 MB' },
                { title: 'Patient Demographics Summary', date: 'Mar 3, 2026', size: '890 KB' },
              ].map((report, i) => (
                <div key={i} className="pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                  <div className="flex items-start gap-3 mb-3">
                    <FileText className="text-emerald-500 mt-0.5" size={16} />
                    <div>
                      <p className="text-sm font-medium text-gray-900 leading-tight">{report.title}</p>
                      <p className="text-[11px] text-gray-500 mt-1">{report.date} • {report.size}</p>
                    </div>
                  </div>
                  <button className="w-full py-2 border border-gray-200 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-gray-50 text-gray-700 transition-colors">
                    <Download size={14} /> Download
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* DATA PROCESSING QUEUE */}
          <section className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="mb-6">
              <h3 className="text-base font-semibold text-gray-900">Data Processing Queue</h3>
              <p className="text-xs text-gray-500">Pending tasks</p>
            </div>
            <div className="space-y-4">
              {[
                { id: 1, task: 'Import CSV - Patient Records', priority: 'High', pColor: 'bg-red-600 text-white' },
                { id: 2, task: 'Data Validation - Lab Results', priority: 'Medium', pColor: 'bg-gray-900 text-white' },
                { id: 3, task: 'Export Report - Monthly Summary', priority: 'Low', pColor: 'bg-white border border-gray-200 text-gray-600' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3 border border-gray-100 rounded-lg">
                  <div className="h-5 w-5 mt-0.5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-[10px] font-bold">
                    {item.id}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{item.task}</p>
                    <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wide mt-2 inline-block ${item.pColor}`}>
                      {item.priority}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* PERFORMANCE SUMMARY */}
          <section className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="mb-6">
              <h3 className="text-base font-semibold text-gray-900">Performance Summary</h3>
              <p className="text-xs text-gray-500">This month's highlights</p>
            </div>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="p-2.5 bg-blue-50 rounded-lg"><Activity size={20} className="text-blue-500" /></div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Avg. Processing Time</p>
                  <p className="text-lg font-bold text-gray-900">12 min</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-2.5 bg-emerald-50 rounded-lg"><FileText size={20} className="text-emerald-500" /></div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Success Rate</p>
                  <p className="text-lg font-bold text-gray-900">98.5%</p>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}