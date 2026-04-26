import React from 'react';
import { 
  Database, 
  Search, 
  Filter, 
  Lock, 
  Unlock, 
  Eye, 
  Download,
  FileText
} from 'lucide-react';

export default function AvailableDatasets() {
  const datasets = [
    {
      title: 'Clinical Trial Phase III - Cardiovascular',
      access: 'Public',
      description: 'Patient data from cardiovascular drug trial',
      size: '45.2 GB',
      records: '12,450',
      updated: 'Mar 9, 2026',
      owner: 'Nadia Islam'
    },
    {
      title: 'Genomic Sequencing Dataset',
      access: 'Restricted',
      description: 'DNA sequencing results from research cohort',
      size: '128 GB',
      records: '8,920',
      updated: 'Mar 7, 2026',
      owner: 'Farida Rahman'
    },
    {
      title: 'Patient Demographics - Q1 2026',
      access: 'Public',
      description: 'Anonymized demographic data for statistical analysis',
      size: '2.1 GB',
      records: '25,300',
      updated: 'Mar 5, 2026',
      owner: 'Kamal Hossain'
    },
    {
      title: 'Adverse Event Reports - 2025',
      access: 'Restricted',
      description: 'Comprehensive adverse event tracking data',
      size: '892 MB',
      records: '1,245',
      updated: 'Feb 28, 2026',
      owner: 'Nadia Islam'
    },
    {
      title: 'Biomarker Analysis Results',
      access: 'Public',
      description: 'Laboratory biomarker test results and analysis',
      size: '5.7 GB',
      records: '18,650',
      updated: 'Feb 25, 2026',
      owner: 'Farida Rahman'
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Datasets</h2>
          <p className="text-sm text-gray-500 mt-1">Browse and access shared research datasets</p>
        </div>
        <button className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
          <FileText size={16} /> Request Access
        </button>
      </div>

      {/* SEARCH AND FILTER BAR */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search datasets by name, owner, or description..." 
            className="w-full bg-white border border-gray-200 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>
        <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors shrink-0">
          <Filter size={16} /> Filter
        </button>
      </div>

      {/* DATASET LIST */}
      <div className="space-y-4">
        {datasets.map((dataset, index) => (
          <div key={index} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-gray-300 transition-colors">
            
            {/* Left Section: Icon & Info */}
            <div className="flex items-start gap-5">
              <div className="p-3.5 bg-blue-50 text-blue-500 rounded-xl shrink-0 mt-0.5">
                <Database size={24} />
              </div>
              
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-base font-semibold text-gray-900">{dataset.title}</h3>
                  
                  {/* Dynamic Access Badge */}
                  {dataset.access === 'Public' ? (
                    <span className="flex items-center gap-1.5 text-[11px] bg-gray-900 text-white px-2.5 py-0.5 rounded-full font-medium">
                      <Unlock size={10} /> Public
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 text-[11px] bg-gray-100 text-gray-600 px-2.5 py-0.5 rounded-full font-medium">
                      <Lock size={10} /> Restricted
                    </span>
                  )}
                </div>
                
                <p className="text-sm text-gray-600 mb-2">{dataset.description}</p>
                
                <div className="flex flex-wrap items-center gap-3 text-[11px] text-gray-500 font-medium">
                  <span>{dataset.size}</span>
                  <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                  <span>{dataset.records} records</span>
                  <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                  <span>Updated {dataset.updated}</span>
                  <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                  <span>Owner: {dataset.owner}</span>
                </div>
              </div>
            </div>

            {/* Right Section: Action Buttons */}
            <div className="flex items-center gap-3 shrink-0 ml-14 md:ml-0">
              <button className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Eye size={14} /> Preview
              </button>
              <button className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors">
                <Download size={14} /> Download
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}