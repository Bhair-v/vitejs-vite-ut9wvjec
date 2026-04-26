import React from 'react';
import { 
  FileText, 
  Activity, 
  Calendar, 
  Eye, 
  Download, 
  PlusCircle 
} from 'lucide-react';

export default function Reports() {
  const templates = [
    { title: 'Clinical Summary', desc: 'Comprehensive clinical trial summary report', icon: FileText },
    { title: 'Statistical Analysis', desc: 'Detailed statistical analysis with visualizations', icon: Activity },
    { title: 'Safety Report', desc: 'Adverse event and safety monitoring report', icon: FileText },
    { title: 'Custom Report', desc: 'Build a custom report from scratch', icon: FileText },
  ];

  const generatedReports = [
    {
      title: 'Q1 2026 Clinical Trial Summary',
      status: 'Published',
      statusTheme: 'bg-gray-900 text-white border-transparent',
      category: 'Clinical Report',
      author: 'Kamal Hossain',
      date: 'Mar 9, 2026',
      size: '3.2 MB'
    },
    {
      title: 'Patient Outcomes Analysis - February',
      status: 'Published',
      statusTheme: 'bg-gray-900 text-white border-transparent',
      category: 'Statistical Report',
      author: 'Kamal Hossain',
      date: 'Mar 1, 2026',
      size: '1.8 MB'
    },
    {
      title: 'Biomarker Trends Q4 2025',
      status: 'Published',
      statusTheme: 'bg-gray-900 text-white border-transparent',
      category: 'Data Analysis',
      author: 'Farida Rahman',
      date: 'Feb 25, 2026',
      size: '2.1 MB'
    },
    {
      title: 'Adverse Events Summary - 2025',
      status: 'Published',
      statusTheme: 'bg-gray-900 text-white border-transparent',
      category: 'Safety Report',
      author: 'Nadia Islam',
      date: 'Feb 20, 2026',
      size: '4.5 MB'
    },
    {
      title: 'Drug Efficacy Comparison Study',
      status: 'Draft',
      statusTheme: 'bg-white text-gray-700 border-gray-200',
      category: 'Research Report',
      author: 'Kamal Hossain',
      date: 'Feb 15, 2026',
      size: '5.8 MB'
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Reports</h2>
          <p className="text-sm text-gray-500 mt-1">Generate and manage analysis reports</p>
        </div>
        <button className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
          <FileText size={16} /> Generate Report
        </button>
      </div>

      {/* REPORT TEMPLATES */}
      <div className="space-y-4">
        <h3 className="text-base font-semibold text-gray-900">Report Templates</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {templates.map((template, index) => {
            const Icon = template.icon;
            return (
              <div key={index} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:border-gray-300 transition-colors cursor-pointer group">
                <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-500 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <Icon size={20} />
                </div>
                <h4 className="text-sm font-semibold text-gray-900 mb-1">{template.title}</h4>
                <p className="text-xs text-gray-500">{template.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* GENERATED REPORTS */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-base font-semibold text-gray-900">Generated Reports</h3>
          <button className="flex items-center gap-2 text-xs font-semibold text-gray-700 bg-white border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors">
            <Calendar size={14} /> Filter by Date
          </button>
        </div>

        <div className="space-y-3">
          {generatedReports.map((report, index) => (
            <div key={index} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-gray-300 transition-colors">
              
              {/* Left Side: Icon & Details */}
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-lg shrink-0">
                  <FileText size={20} />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h4 className="text-sm font-semibold text-gray-900">{report.title}</h4>
                    <span className={`text-[10px] border px-2 py-0.5 rounded-full font-bold ${report.statusTheme}`}>
                      {report.status}
                    </span>
                    <span className="text-[10px] border border-gray-200 text-gray-600 px-2 py-0.5 rounded-full font-medium">
                      {report.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>By {report.author}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                    <span>{report.date}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                    <span>{report.size}</span>
                  </div>
                </div>
              </div>

              {/* Right Side: Actions */}
              <div className="flex items-center gap-2 shrink-0">
                <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded transition-colors">
                  <Eye size={14} /> Preview
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded transition-colors border border-gray-200">
                  <Download size={14} /> Download
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
}