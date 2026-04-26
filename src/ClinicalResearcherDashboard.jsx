import React from 'react';
import {
  UploadCloud,
  Users,
  Activity,
  ClipboardList,
  ShieldAlert,
  Folder,
  CheckCircle,
  Clock,
  AlertTriangle,
  Stethoscope,
  ChevronRight,
  FileText // <--- Added missing FileText import here!
} from 'lucide-react';

const activeTrials = [
  {
    id: 1,
    name: 'Phase III Glioma Study',
    status: 'Recruiting',
    progress: 75,
    colorClass: 'blue',
  },
  {
    id: 2,
    name: 'Phase II Pediatric Tumor',
    status: 'Active',
    progress: 40,
    colorClass: 'emerald',
  },
  {
    id: 3,
    name: 'Phase I Immunotherapy',
    status: 'Data Lock',
    progress: 90,
    colorClass: 'indigo',
  },
];

export default function ClinicalResearcherDashboard() {
  return (
    <div className="space-y-6 relative">
      {/* HEADER & UPLOAD ACTION */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Clinical Trial Workspace
          </h2>
          <p className="text-sm text-gray-500">
            Manage clinical trials, track patient records, and monitor regulatory submissions.
          </p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium flex items-center shadow-sm transition-colors shrink-0">
          <UploadCloud className="h-5 w-5 mr-2" />
          Upload New Trial Data
        </button>
      </div>

      {/* QUICK STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: 'Active Clinical Trials',
            value: '12',
            icon: Stethoscope,
            color: 'text-blue-600',
            bg: 'bg-blue-50',
          },
          {
            label: 'Patient Records',
            value: '1,248',
            icon: Users,
            color: 'text-indigo-600',
            bg: 'bg-indigo-50',
          },
          {
            label: 'Pending Reviews',
            value: '5',
            icon: ClipboardList,
            color: 'text-amber-600',
            bg: 'bg-amber-50',
          },
          {
            label: 'Regulatory Alerts',
            value: '2',
            icon: ShieldAlert,
            color: 'text-red-600',
            bg: 'bg-red-50',
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
        {/* LEFT COLUMN: Trials & Uploads */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Active Clinical Trials Cards */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Active Clinical Trials
              </h3>
              <button className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center">
                View All <ChevronRight className="h-4 w-4 ml-1" />
              </button>
            </div>
            <div className="space-y-4">
              {activeTrials.map((trial) => (
                <div
                  key={trial.id}
                  className="border border-gray-100 rounded-lg p-4 bg-gray-50 hover:bg-gray-100/50 transition-colors"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-gray-800">
                      {trial.name}
                    </span>
                    <span
                      className={`text-xs font-bold text-${trial.colorClass}-700 bg-${trial.colorClass}-100 px-2.5 py-1 rounded-full`}
                    >
                      {trial.status}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2 mt-3">
                    <div
                      className={`bg-${trial.colorClass}-500 h-2 rounded-full`}
                      style={{ width: `${trial.progress}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-gray-500 font-medium">
                      Trial Completion: {trial.progress}%
                    </p>
                    <button className="text-xs text-gray-600 hover:text-gray-900 font-medium underline underline-offset-2">
                      Manage Cohort
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Trial Data Uploads Table */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">
                Recent Trial Data Uploads
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider border-b border-gray-200">
                    <th className="px-6 py-3 font-medium">Dataset Name</th>
                    <th className="px-6 py-3 font-medium">Size</th>
                    <th className="px-6 py-3 font-medium">Status</th>
                    <th className="px-6 py-3 font-medium">Date</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-gray-700 divide-y divide-gray-100">
                  <tr className="hover:bg-gray-50/50">
                    <td className="px-6 py-4 flex items-center font-medium">
                      <FileText className="h-4 w-4 mr-2 text-gray-400" />
                      Patient-Cohort-A.csv
                    </td>
                    <td className="px-6 py-4 text-gray-500">24 MB</td>
                    <td className="px-6 py-4">
                      <span className="text-emerald-600 flex items-center font-medium bg-emerald-50 w-fit px-2.5 py-1 rounded-full">
                        <CheckCircle className="h-3.5 w-3.5 mr-1.5" /> Processed
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500">Today, 09:15 AM</td>
                  </tr>
                  <tr className="hover:bg-gray-50/50">
                    <td className="px-6 py-4 flex items-center font-medium">
                      <Folder className="h-4 w-4 mr-2 text-gray-400" />
                      MRI-Scans-Batch3.zip
                    </td>
                    <td className="px-6 py-4 text-gray-500">4.2 GB</td>
                    <td className="px-6 py-4">
                      <span className="text-blue-600 flex items-center font-medium bg-blue-50 w-fit px-2.5 py-1 rounded-full">
                        <Clock className="h-3.5 w-3.5 mr-1.5 animate-pulse" /> Uploading...
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500">Today, 08:30 AM</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Alerts & Submissions */}
        <div className="space-y-6">
          
          {/* Adverse Event Alerts */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 text-amber-500" />
              Adverse Event Alerts
            </h3>
            <div className="space-y-3">
              <div className="p-4 border border-red-100 bg-red-50/50 rounded-lg">
                <div className="flex justify-between items-start mb-1">
                  <p className="text-sm font-semibold text-gray-900">
                    Patient #402
                  </p>
                  <span className="text-[10px] font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded uppercase tracking-wider">
                    High
                  </span>
                </div>
                <p className="text-sm text-gray-800 font-medium mb-2">
                  Elevated Liver Enzymes
                </p>
                <div className="flex justify-between items-center text-xs">
                  <p className="text-gray-500">2 hours ago</p>
                  <button className="text-red-600 hover:text-red-700 font-medium">
                    Review Case
                  </button>
                </div>
              </div>

              <div className="p-4 border border-amber-100 bg-amber-50/50 rounded-lg">
                <div className="flex justify-between items-start mb-1">
                  <p className="text-sm font-semibold text-gray-900">
                    Patient #118
                  </p>
                  <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded uppercase tracking-wider">
                    Low
                  </span>
                </div>
                <p className="text-sm text-gray-800 font-medium mb-2">
                  Mild Allergic Reaction
                </p>
                <div className="flex justify-between items-center text-xs">
                  <p className="text-gray-500">5 hours ago</p>
                  <button className="text-amber-600 hover:text-amber-700 font-medium">
                    Review Case
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Regulatory Submissions */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Regulatory Submissions
            </h3>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="mt-1">
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <Clock className="h-4 w-4" />
                  </div>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    FDA Interim Report
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5 mb-1.5">
                    Phase III Glioma Study
                  </p>
                  <span className="text-xs font-medium text-blue-700 bg-blue-50 px-2 py-1 rounded">
                    In Review
                  </span>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="mt-1">
                  <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                    <CheckCircle className="h-4 w-4" />
                  </div>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    IRB Amendment #3
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5 mb-1.5">
                    Phase II Pediatric Tumor
                  </p>
                  <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-1 rounded">
                    Approved
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}