import React, { useState } from 'react';
import { 
  FileText, 
  Database, 
  FileSpreadsheet, 
  File, 
  Download, 
  CheckCircle, 
  Clock 
} from 'lucide-react';

export default function ExportResults() {
  const [selectedFormat, setSelectedFormat] = useState('CSV');

  const exportFormats = [
    { id: 'CSV', title: 'CSV', desc: 'Comma-separated values', icon: FileText, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { id: 'Excel', title: 'Excel', desc: 'Microsoft Excel format', icon: FileSpreadsheet, color: 'text-blue-500', bg: 'bg-blue-50' },
    { id: 'JSON', title: 'JSON', desc: 'JavaScript Object Notation', icon: Database, color: 'text-purple-500', bg: 'bg-purple-50' },
    { id: 'PDF', title: 'PDF', desc: 'Portable Document Format', icon: File, color: 'text-red-500', bg: 'bg-red-50' },
  ];

  const exportHistory = [
    { title: 'Patient Demographics Analysis - Q1 2026', format: 'CSV', status: 'Completed', size: '2.4 MB', date: 'Mar 9, 2026' },
    { title: 'Clinical Trial Results Summary', format: 'PDF', status: 'Completed', size: '5.8 MB', date: 'Mar 8, 2026' },
    { title: 'Biomarker Dataset Export', format: 'Excel', status: 'Completed', size: '12.3 MB', date: 'Mar 7, 2026' },
    { title: 'Statistical Analysis Results', format: 'JSON', status: 'Completed', size: '892 KB', date: 'Mar 6, 2026' },
    { title: 'Adverse Events Data Export', format: 'CSV', status: 'Processing', size: '1.5 MB', date: 'Mar 5, 2026' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* HEADER */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Export Results</h2>
        <p className="text-sm text-gray-500 mt-1">Export your analysis results and datasets</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN: Export Configuration */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <div className="mb-6">
            <h3 className="text-base font-semibold text-gray-900">Export Data</h3>
            <p className="text-xs text-gray-500 mt-1">Choose a format to export your analysis results</p>
          </div>

          {/* Format Selection Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {exportFormats.map((format) => {
              const Icon = format.icon;
              const isSelected = selectedFormat === format.id;
              
              return (
                <div 
                  key={format.id}
                  onClick={() => setSelectedFormat(format.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    isSelected ? 'border-blue-500 bg-blue-50/30 shadow-sm ring-1 ring-blue-500' : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${format.bg} ${format.color}`}>
                      <Icon size={20} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-900">{format.title}</h4>
                      <p className="text-xs text-gray-500 mt-0.5">{format.desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Export Settings Info Box */}
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
            <h4 className="text-xs font-semibold text-blue-800 mb-2">Export Settings</h4>
            <ul className="text-xs text-blue-700 space-y-1.5 list-disc list-inside">
              <li>Include all data fields and metadata</li>
              <li>Apply current filters and selections</li>
              <li>Maintain data formatting and structure</li>
            </ul>
          </div>

          {/* Export Action Button */}
          <button className="w-full py-3 bg-gray-900 text-white text-sm font-semibold rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 shadow-sm">
            <Download size={16} /> Export Selected Data
          </button>
        </div>

        {/* RIGHT COLUMN: Quick Stats */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 h-fit">
          <h3 className="text-base font-semibold text-gray-900 mb-6">Quick Stats</h3>
          
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
              <p className="text-xs text-gray-500 font-medium mb-1">Total Exports</p>
              <p className="text-xl font-bold text-gray-900">142</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
              <p className="text-xs text-gray-500 font-medium mb-1">This Month</p>
              <p className="text-xl font-bold text-gray-900">24</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
              <p className="text-xs text-gray-500 font-medium mb-1">Total Size</p>
              <p className="text-xl font-bold text-gray-900">3.2 GB</p>
            </div>
          </div>
        </div>

      </div>

      {/* BOTTOM SECTION: Export History */}
      <div className="space-y-4">
        <h3 className="text-base font-semibold text-gray-900">Export History</h3>
        
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm divide-y divide-gray-100">
          {exportHistory.map((item, index) => (
            <div key={index} className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-gray-50 transition-colors">
              
              <div className="flex items-center gap-4">
                <div className="p-2.5 bg-blue-50 text-blue-500 rounded-lg shrink-0">
                  <FileText size={18} />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h4 className="text-sm font-semibold text-gray-900">{item.title}</h4>
                    <span className="text-[10px] font-bold border border-gray-200 px-2 py-0.5 rounded text-gray-600 uppercase tracking-wide">
                      {item.format}
                    </span>
                    
                    {item.status === 'Completed' ? (
                      <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                        <CheckCircle size={10} /> Completed
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-[10px] font-semibold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">
                        <Clock size={10} /> Processing
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>{item.size}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                    <span>{item.date}</span>
                  </div>
                </div>
              </div>

              <button className="flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors shrink-0">
                <Download size={14} /> Download
              </button>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
}