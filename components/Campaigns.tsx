
import React, { useState, useRef } from 'react';
import { Campaign } from '../types';
import { 
  Plus, 
  MoreVertical, 
  Search, 
  Send, 
  CheckCircle2, 
  Clock, 
  FileEdit,
  Sparkles,
  ArrowRight,
  Upload,
  Trash2,
  Users
} from 'lucide-react';
import { generateCampaignTemplate } from '../services/geminiService';

const Campaigns: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'completed'>('all');
  const [showModal, setShowModal] = useState(false);
  const [templateTopic, setTemplateTopic] = useState('');
  const [generatedTemplate, setGeneratedTemplate] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [campaigns, setCampaigns] = useState<Campaign[]>([
    { id: '1', name: 'Annual IT Security Check', status: 'active', recipients: 450, clickRate: 2.4, reportRate: 94, date: '2023-11-20' },
    { id: '2', name: 'CEO Gift Card Scam Test', status: 'completed', recipients: 120, clickRate: 15.2, reportRate: 65, date: '2023-10-15' },
    { id: '3', name: 'Software Update Simulation', status: 'completed', recipients: 300, clickRate: 5.1, reportRate: 88, date: '2023-09-02' },
  ]);

  const handleGenerateTemplate = async () => {
    if (!templateTopic) return;
    setIsGenerating(true);
    const template = await generateCampaignTemplate(templateTopic);
    setGeneratedTemplate(template);
    setIsGenerating(false);
  };

  const handleAddCampaign = () => {
    const newCamp: Campaign = {
      id: Math.random().toString(36).substr(2, 9),
      name: templateTopic || 'Untitled Simulation',
      status: 'draft',
      recipients: 0,
      clickRate: 0,
      reportRate: 0,
      date: new Date().toISOString().split('T')[0]
    };
    setCampaigns([newCamp, ...campaigns]);
    setShowModal(false);
    setTemplateTopic('');
    setGeneratedTemplate('');
  };

  const handleDelete = (id: string) => {
    setCampaigns(campaigns.filter(c => c.id !== id));
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIsUploading(true);
      // Simulate CSV processing
      setTimeout(() => {
        alert(`${e.target.files?.[0].name} processed. 128 recipients added to database.`);
        setIsUploading(false);
      }, 1500);
    }
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Training Simulations</h1>
          <p className="text-zinc-500">Manage your agency's phishing simulations and target lists.</p>
        </div>
        <div className="flex gap-3">
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            className="hidden" 
            accept=".csv,.xlsx" 
          />
          <button 
            onClick={triggerUpload}
            disabled={isUploading}
            className="bg-zinc-800 hover:bg-zinc-700 text-white px-6 py-2.5 rounded-lg font-medium border border-zinc-700 transition-all flex items-center gap-2"
          >
            <Upload className="w-4 h-4" />
            {isUploading ? 'Uploading...' : 'Upload Recipients'}
          </button>
          <button 
            onClick={() => setShowModal(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg font-medium shadow-lg transition-all flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Create Campaign
          </button>
        </div>
      </div>

      <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-4 border-b border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex gap-2">
            {(['all', 'active', 'completed'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  activeTab === tab 
                    ? 'bg-zinc-100 text-zinc-900' 
                    : 'text-zinc-400 hover:text-zinc-100'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input 
              type="text" 
              placeholder="Filter simulations..." 
              className="bg-zinc-800/50 border border-zinc-700 rounded-lg pl-10 pr-4 py-2 text-sm w-full outline-none focus:border-indigo-500 transition-all"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-zinc-950 text-zinc-500 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-semibold">Simulation Name</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-center">Recipients</th>
                <th className="px-6 py-4 font-semibold text-center">Click Rate</th>
                <th className="px-6 py-4 font-semibold text-center">Report Rate</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {campaigns
                .filter(c => activeTab === 'all' || c.status === activeTab)
                .map((camp) => (
                <tr key={camp.id} className="hover:bg-zinc-800/30 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-medium text-zinc-100">{camp.name}</span>
                      <span className="text-xs text-zinc-500">Created {camp.date}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                      camp.status === 'active' ? 'bg-blue-500/10 text-blue-400' :
                      camp.status === 'completed' ? 'bg-green-500/10 text-green-400' :
                      'bg-zinc-500/10 text-zinc-400'
                    }`}>
                      {camp.status === 'active' ? <Send className="w-3 h-3" /> :
                       camp.status === 'completed' ? <CheckCircle2 className="w-3 h-3" /> :
                       <Clock className="w-3 h-3" />}
                      {camp.status.charAt(0).toUpperCase() + camp.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center font-mono text-sm">{camp.recipients}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`font-mono text-sm ${camp.clickRate > 10 ? 'text-red-400' : 'text-zinc-100'}`}>
                      {camp.clickRate}%
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`font-mono text-sm ${camp.reportRate > 90 ? 'text-green-400' : 'text-zinc-100'}`}>
                      {camp.reportRate}%
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-700 transition-colors">
                        <FileEdit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(camp.id)}
                        className="p-2 text-zinc-400 hover:text-red-400 rounded-lg hover:bg-red-400/10 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {campaigns.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-zinc-500 italic">
                    No simulations found. Create your first campaign to start training.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-zinc-900 border border-zinc-800 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-400" />
                Craft Training Simulation
              </h2>
              <button onClick={() => setShowModal(false)} className="text-zinc-500 hover:text-white">&times;</button>
            </div>
            
            <div className="p-6 space-y-4 overflow-y-auto">
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-400">Campaign Name / Topic</label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={templateTopic}
                    onChange={(e) => setTemplateTopic(e.target.value)}
                    placeholder="e.g., Microsoft 365 Password Reset Request"
                    className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <button 
                    onClick={handleGenerateTemplate}
                    disabled={isGenerating || !templateTopic}
                    className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2"
                  >
                    {isGenerating ? 'AI Writing...' : 'Draft Content'}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-400">Educational Draft Content</label>
                <textarea 
                  value={generatedTemplate}
                  onChange={(e) => setGeneratedTemplate(e.target.value)}
                  placeholder="The email body will appear here..."
                  className="w-full h-48 bg-zinc-950 border border-zinc-800 rounded-xl p-4 font-mono text-xs whitespace-pre-wrap leading-relaxed text-zinc-300 outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="p-6 bg-zinc-950 border-t border-zinc-800 flex justify-end gap-3">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 text-zinc-400 hover:text-white text-sm font-medium">
                Cancel
              </button>
              <button 
                onClick={handleAddCampaign}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg text-sm font-medium flex items-center gap-2 shadow-lg shadow-indigo-500/20"
              >
                Create Campaign <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Campaigns;
