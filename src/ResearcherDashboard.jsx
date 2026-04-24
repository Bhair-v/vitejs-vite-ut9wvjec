import React, { useState } from 'react';
import {
  UploadCloud,
  Folder,
  FileText,
  Users,
  Activity,
  Clock,
  CheckCircle,
  PlayCircle,
  X,
  Upload,
} from 'lucide-react';

// ============================================================================
// ⚠️ REPLACE THIS WITH YOUR LOCALTUNNEL URL FROM GOOGLE COLAB
// ============================================================================
const COLAB_API_URL = 'https://rude-mammals-unite.loca.lt';

const activeProjects = [
  {
    id: 'radgat',
    name: 'RadGAT IDH Prediction Model',
    phase: 'Validation Phase',
    progress: 85,
    colorClass: 'blue',
  },
  {
    id: 'multiswin',
    name: 'Multi-Task Swin UNETR Segmentation',
    phase: 'Testing Phase',
    progress: 92,
    colorClass: 'emerald',
  },
  {
    id: 'uda',
    name: 'Unsupervised Domain Adaptation',
    phase: 'Alignment Phase',
    progress: 42,
    colorClass: 'emerald',
  },
];

export default function ResearcherDashboard() {
  // Modal & API State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState(null);
  const [files, setFiles] = useState({
    t1: null,
    t1ce: null,
    t2: null,
    flair: null,
    mask: null,
  });
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState(null);

  // Open the Modal and clear previous data
  const openTestModal = (model) => {
    setSelectedModel(model);
    setFiles({ t1: null, t1ce: null, t2: null, flair: null, mask: null });
    setTestResult(null);
    setIsModalOpen(true);
  };

  // Handle file selection
  const handleFileChange = (e, modality) => {
    setFiles((prev) => ({ ...prev, [modality]: e.target.files[0] }));
  };

  // Send the files to Colab via LocalTunnel
  const handleRunTest = async () => {
    if (!files.t1 || !files.t1ce || !files.t2 || !files.flair) {
      alert('Please upload at least the T1, T1ce, T2, and FLAIR images.');
      return;
    }

    setIsTesting(true);
    setTestResult(null);

    const formData = new FormData();
    formData.append('t1', files.t1);
    formData.append('t1ce', files.t1ce);
    formData.append('t2', files.t2);
    formData.append('flair', files.flair);
    if (files.mask) formData.append('mask', files.mask);

    try {
      const response = await fetch(
        `${COLAB_API_URL}/run-inference/${selectedModel.id}`,
        {
          method: 'POST',
          headers: {
            'Bypass-Tunnel-Reminder': 'true', // CRITICAL: Tells LocalTunnel we are an API request
          },
          body: formData,
        }
      );

      const data = await response.json();
      setTestResult(data);
    } catch (error) {
      console.error('API Error:', error);
      setTestResult({
        error:
          'Failed to connect to Colab. Check the URL and ensure the notebook server is running.',
      });
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div className="space-y-6 relative">
      {/* HEADER & UPLOAD ACTION */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Researcher Workspace
          </h2>
          <p className="text-sm text-gray-500">
            Manage your active models, datasets, and collaborations.
          </p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium flex items-center shadow-sm transition-colors">
          <UploadCloud className="h-5 w-5 mr-2" />
          Upload New Dataset
        </button>
      </div>

      {/* QUICK STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          {
            label: 'Active Projects',
            value: '3',
            icon: Activity,
            color: 'text-blue-600',
            bg: 'bg-blue-50',
          },
          {
            label: 'Datasets Uploaded',
            value: '12',
            icon: Folder,
            color: 'text-indigo-600',
            bg: 'bg-indigo-50',
          },
          {
            label: 'Shared Documents',
            value: '8',
            icon: FileText,
            color: 'text-emerald-600',
            bg: 'bg-emerald-50',
          },
          {
            label: 'Pending Collabs',
            value: '2',
            icon: Users,
            color: 'text-amber-600',
            bg: 'bg-amber-50',
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
        {/* LEFT COLUMN: Projects & Datasets */}
        <div className="lg:col-span-2 space-y-6">
          {/* Project Progress Cards */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              My Active Projects
            </h3>
            <div className="space-y-4">
              {activeProjects.map((project) => (
                <div
                  key={project.id}
                  className="border border-gray-100 rounded-lg p-4 bg-gray-50"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-gray-800">
                      {project.name}
                    </span>
                    <span
                      className={`text-xs font-bold text-${project.colorClass}-600 bg-${project.colorClass}-100 px-2 py-1 rounded`}
                    >
                      {project.phase}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                    <div
                      className={`bg-${project.colorClass}-600 h-2 rounded-full`}
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between items-center mt-3">
                    <p className="text-xs text-gray-500">
                      {project.progress}% Complete
                    </p>

                    {/* LIVE INFERENCE TEST BUTTON */}
                    <button
                      onClick={() => openTestModal(project)}
                      className="text-xs bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 px-3 py-1.5 rounded flex items-center transition-colors"
                    >
                      <PlayCircle className="h-3 w-3 mr-1 text-blue-600" />
                      Test Model
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Dataset Uploads Table */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">
                Recent Dataset Uploads
              </h3>
            </div>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-500 text-xs uppercase">
                  <th className="px-6 py-3 font-medium">Dataset Name</th>
                  <th className="px-6 py-3 font-medium">Size</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                  <th className="px-6 py-3 font-medium">Date</th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-700 divide-y divide-gray-100">
                <tr>
                  <td className="px-6 py-4 flex items-center font-medium">
                    <Folder className="h-4 w-4 mr-2 text-gray-400" />{' '}
                    UTSW-Glioma-T1ce.nii.gz
                  </td>
                  <td className="px-6 py-4">42 MB</td>
                  <td className="px-6 py-4">
                    <span className="text-emerald-600 flex items-center">
                      <CheckCircle className="h-4 w-4 mr-1" /> Processed
                    </span>
                  </td>
                  <td className="px-6 py-4">Today, 10:42 AM</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 flex items-center font-medium">
                    <Folder className="h-4 w-4 mr-2 text-gray-400" />{' '}
                    GE-3T-Target-Cohort.zip
                  </td>
                  <td className="px-6 py-4">1.2 GB</td>
                  <td className="px-6 py-4">
                    <span className="text-blue-600 flex items-center">
                      <Clock className="h-4 w-4 mr-1" /> Extracting...
                    </span>
                  </td>
                  <td className="px-6 py-4">Yesterday, 3:15 PM</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* RIGHT COLUMN: Collaborations & Discussions */}
        <div className="space-y-6">
          {/* Collaboration Requests */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Collaboration Requests
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-3">
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
                    AS
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      Atique Sharier
                    </p>
                    <p className="text-xs text-gray-500">RadGAT Project</p>
                  </div>
                </div>
                <button className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded font-medium hover:bg-blue-100">
                  Accept
                </button>
              </div>
              <div className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-3">
                  <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-xs">
                    SP
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      Sadia Sintia
                    </p>
                    <p className="text-xs text-gray-500">UDA Analysis</p>
                  </div>
                </div>
                <button className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded font-medium hover:bg-blue-100">
                  Accept
                </button>
              </div>
            </div>
          </div>

          {/* Recent Discussions */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Research Updates
            </h3>
            <div className="space-y-4">
              <div className="border-l-2 border-blue-500 pl-3">
                <p className="text-sm font-medium text-gray-800">
                  Model accuracy reached 84.7%
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  GNN 5-Fold Cross-Validation completed successfully.
                </p>
                <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
              </div>
              <div className="border-l-2 border-emerald-500 pl-3">
                <p className="text-sm font-medium text-gray-800">
                  Dataset UTSW-Glioma Synced
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  All 4 modalities (T1, T1ce, T2, FLAIR) are ready for Swin
                  UNETR.
                </p>
                <p className="text-xs text-gray-400 mt-1">5 hours ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- THE INFERENCE MODAL POPUP --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-lg rounded-xl shadow-2xl p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-3">
              <h2 className="text-xl font-bold text-gray-900 flex items-center">
                <Activity className="w-5 h-5 mr-2 text-blue-600" />
                Test: {selectedModel?.name}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="size-5" />
              </button>
            </div>

            <p className="text-sm text-gray-500 mb-6">
              Upload .nii.gz files to send to the Colab LocalTunnel runtime.
            </p>

            <div className="space-y-4 bg-gray-50 p-4 rounded-lg border border-gray-100">
              {['t1', 't1ce', 't2', 'flair'].map((modality) => (
                <div
                  key={modality}
                  className="flex items-center justify-between"
                >
                  <span className="font-semibold text-sm text-gray-700 uppercase w-20">
                    {modality}:
                  </span>
                  <input
                    type="file"
                    accept=".nii.gz"
                    onChange={(e) => handleFileChange(e, modality)}
                    className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 cursor-pointer w-full max-w-[250px]"
                  />
                </div>
              ))}

              {/* Dynamic rendering: Only show MASK upload if RadGAT is selected */}
              {selectedModel?.id === 'radgat' && (
                <div className="flex items-center justify-between pt-3 border-t border-gray-200 mt-3">
                  <span className="font-semibold text-sm text-purple-700 uppercase w-20">
                    MASK:
                  </span>
                  <input
                    type="file"
                    accept=".nii.gz"
                    onChange={(e) => handleFileChange(e, 'mask')}
                    className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-purple-100 file:text-purple-700 hover:file:bg-purple-200 cursor-pointer w-full max-w-[250px]"
                  />
                </div>
              )}
            </div>

            {/* RESULTS UI - UPDATED TO HANDLE TEXT AND IMAGES */}
            {testResult && (
              <div
                className={`mt-6 p-5 rounded-lg ${
                  testResult.error
                    ? 'bg-red-50 border border-red-200'
                    : 'bg-emerald-50 border border-emerald-200'
                }`}
              >
                {testResult.error ? (
                  <p className="text-sm font-medium text-red-700 flex items-center">
                    <X className="w-4 h-4 mr-2" /> {testResult.error}
                  </p>
                ) : (
                  <div className="flex flex-col md:flex-row gap-4 items-start">
                    {/* Left: Text Data */}
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-emerald-800 mb-3 flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2" /> Inference
                        Complete
                      </h4>
                      {testResult.prediction && (
                        <p className="text-sm text-emerald-800 mb-1">
                          Prediction:{' '}
                          <span className="font-bold">
                            {testResult.prediction}
                          </span>
                        </p>
                      )}
                      {testResult.confidence && (
                        <p className="text-sm text-emerald-800">
                          Confidence:{' '}
                          <span className="font-bold">
                            {testResult.confidence}%
                          </span>
                        </p>
                      )}
                    </div>

                    {/* Right: Render Base64 Image if it exists */}
                    {testResult.image_base64 && (
                      <div className="bg-white p-2 rounded border border-emerald-200 shadow-sm w-32 h-32 flex-shrink-0 flex items-center justify-center relative overflow-hidden">
                        <img
                          src={`data:image/png;base64,${testResult.image_base64}`}
                          alt="Segmentation Mask"
                          className="object-cover w-full h-full"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-[10px] text-center py-0.5">
                          Center Slice
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            <div className="mt-6 flex justify-end gap-3">
              <button
                className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                onClick={handleRunTest}
                disabled={isTesting}
                className={`px-4 py-2 text-sm font-medium text-white rounded-lg flex items-center transition-colors ${
                  isTesting
                    ? 'bg-blue-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {isTesting ? (
                  <>
                    <Clock className="size-4 mr-2 animate-spin" /> Processing...
                  </>
                ) : (
                  <>
                    <Upload className="size-4 mr-2" /> Run Inference
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
