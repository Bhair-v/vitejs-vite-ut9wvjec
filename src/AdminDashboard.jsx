import React from 'react';
import {
  DownloadCloud,
  Users,
  Microscope,
  HardDrive,
  Activity,
  Server,
  Database,
  Clock,
  CheckCircle,
  XCircle,
  ShieldAlert,
  AlertTriangle,
} from 'lucide-react';

const recentUsers = [
  {
    id: 1,
    name: 'Dr. Emily Chen',
    email: 'emily.chen@utsw.edu',
    role: 'Researcher',
    status: 'Active',
    lastLogin: '2 mins ago',
    initials: 'EC',
    color: 'blue',
  },
  {
    id: 2,
    name: 'James Wilson',
    email: 'j.wilson@nsu.edu',
    role: 'Data Analyst',
    status: 'Offline',
    lastLogin: '1 hour ago',
    initials: 'JW',
    color: 'indigo',
  },
  {
    id: 3,
    name: 'Dr. Michael Chang',
    email: 'm.chang@hospital.org',
    role: 'Clinical Lead',
    status: 'Active',
    lastLogin: 'Just now',
    initials: 'MC',
    color: 'emerald',
  },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6 relative">
      {/* HEADER & ACTION */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            System Administration
          </h2>
          <p className="text-sm text-gray-500">
            Monitor platform health, manage user permissions, and review system logs.
          </p>
        </div>
        <button className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-5 py-2.5 rounded-lg font-medium flex items-center shadow-sm transition-colors shrink-0">
          <DownloadCloud className="h-5 w-5 mr-2 text-gray-500" />
          Generate System Report
        </button>
      </div>

      {/* QUICK STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: 'Total Users',
            value: '2,845',
            trend: '+12% this month',
            icon: Users,
            color: 'text-blue-600',
            bg: 'bg-blue-50',
          },
          {
            label: 'Active Researchers',
            value: '892',
            trend: '+5% this week',
            icon: Microscope,
            color: 'text-indigo-600',
            bg: 'bg-indigo-50',
          },
          {
            label: 'Storage Used',
            value: '8.4 TB',
            trend: '75% of capacity',
            icon: HardDrive,
            color: 'text-amber-600',
            bg: 'bg-amber-50',
          },
          {
            label: 'System Uptime',
            value: '99.9%',
            trend: 'All systems operational',
            icon: Activity,
            color: 'text-emerald-600',
            bg: 'bg-emerald-50',
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
              <p className="text-xs text-gray-400 mt-0.5">{stat.trend}</p>
            </div>
          </div>
        ))}
      </div>

      {/* MAIN GRID LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT COLUMN: User Activity & System Health */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Recent User Activity Table */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800">
                Recent User Activity
              </h3>
              <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
                View All Users
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider border-b border-gray-200">
                    <th className="px-6 py-3 font-medium">User</th>
                    <th className="px-6 py-3 font-medium">Role</th>
                    <th className="px-6 py-3 font-medium">Status</th>
                    <th className="px-6 py-3 font-medium">Last Login</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-gray-700 divide-y divide-gray-100">
                  {recentUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50/50">
                      <td className="px-6 py-4 flex items-center">
                        <div className={`h-8 w-8 rounded-full bg-${user.color}-100 flex items-center justify-center text-${user.color}-700 font-bold text-xs mr-3 shrink-0`}>
                          {user.initials}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{user.name}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2.5 py-1 rounded-md">
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className={`h-2 w-2 rounded-full mr-2 ${user.status === 'Active' ? 'bg-emerald-500' : 'bg-gray-300'}`}></div>
                          <span className={user.status === 'Active' ? 'text-emerald-700' : 'text-gray-500'}>
                            {user.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-500">{user.lastLogin}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* System Health Monitoring */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">
              System Health Monitoring
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* CPU Load */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-medium text-gray-700 flex items-center">
                    <Server className="h-4 w-4 mr-2 text-gray-400" /> Primary Cluster CPU
                  </span>
                  <span className="font-bold text-gray-900">68%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5">
                  <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '68%' }}></div>
                </div>
              </div>

              {/* DB I/O */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-medium text-gray-700 flex items-center">
                    <Database className="h-4 w-4 mr-2 text-gray-400" /> Storage Array I/O
                  </span>
                  <span className="font-bold text-gray-900">42%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5">
                  <div className="bg-indigo-500 h-2.5 rounded-full" style={{ width: '42%' }}></div>
                </div>
              </div>

              {/* API Latency */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-medium text-gray-700 flex items-center">
                    <Activity className="h-4 w-4 mr-2 text-gray-400" /> API Gateway Latency
                  </span>
                  <span className="font-bold text-emerald-600">124ms</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5">
                  <div className="bg-emerald-500 h-2.5 rounded-full" style={{ width: '15%' }}></div>
                </div>
              </div>

              {/* Memory */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-medium text-gray-700 flex items-center">
                    <HardDrive className="h-4 w-4 mr-2 text-gray-400" /> Memory Usage
                  </span>
                  <span className="font-bold text-amber-600">81%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5">
                  <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: '81%' }}></div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Approvals & Security */}
        <div className="space-y-6">
          
          {/* Pending Approvals */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Pending Approvals
            </h3>
            <div className="space-y-3">
              <div className="p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                <p className="text-sm font-semibold text-gray-900">Dr. Sarah Jenkins</p>
                <p className="text-xs text-gray-500 mb-3">Requested: Clinical Trial Access</p>
                <div className="flex gap-2">
                  <button className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-medium py-1.5 rounded flex items-center justify-center transition-colors">
                    <CheckCircle className="h-3.5 w-3.5 mr-1" /> Approve
                  </button>
                  <button className="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-600 text-xs font-medium py-1.5 rounded flex items-center justify-center transition-colors border border-gray-200">
                    <XCircle className="h-3.5 w-3.5 mr-1" /> Deny
                  </button>
                </div>
              </div>

              <div className="p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                <p className="text-sm font-semibold text-gray-900">Robert Taylor</p>
                <p className="text-xs text-gray-500 mb-3">Requested: UTSW-Glioma Dataset</p>
                <div className="flex gap-2">
                  <button className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-medium py-1.5 rounded flex items-center justify-center transition-colors">
                    <CheckCircle className="h-3.5 w-3.5 mr-1" /> Approve
                  </button>
                  <button className="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-600 text-xs font-medium py-1.5 rounded flex items-center justify-center transition-colors border border-gray-200">
                    <XCircle className="h-3.5 w-3.5 mr-1" /> Deny
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Security Alerts */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <ShieldAlert className="h-5 w-5 mr-2 text-red-500" />
              Security Alerts
            </h3>
            <div className="space-y-4">
              <div className="flex gap-3 items-start">
                <div className="mt-0.5">
                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Multiple Failed Logins</p>
                  <p className="text-xs text-gray-500">IP: 192.168.1.45 (Unknown)</p>
                  <p className="text-xs text-amber-600 mt-1 font-medium">10 mins ago</p>
                </div>
              </div>
              
              <div className="flex gap-3 items-start pt-3 border-t border-gray-100">
                <div className="mt-0.5">
                  <XCircle className="h-4 w-4 text-red-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Unauthorized API Access</p>
                  <p className="text-xs text-gray-500">Endpoint: /api/v1/patients</p>
                  <p className="text-xs text-red-600 mt-1 font-medium">1 hour ago</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}