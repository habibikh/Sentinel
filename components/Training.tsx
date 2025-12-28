
import React, { useState } from 'react';
import { TrainingModule, UserRole } from '../types';
import { PlayCircle, Clock, BookOpen, Trophy, Star, Plus, X, Trash2, ExternalLink } from 'lucide-react';

interface TrainingProps {
  role: UserRole;
}

const Training: React.FC<TrainingProps> = ({ role }) => {
  const [showAddModule, setShowAddModule] = useState(false);
  const [newModule, setNewModule] = useState<Partial<TrainingModule>>({ title: '', category: '', duration: '', difficulty: 'Beginner', link: '' });
  const [modules, setModules] = useState<TrainingModule[]>([
    { id: '1', title: 'Recognizing Malicious Attachments', category: 'Email Security', duration: '15 mins', difficulty: 'Beginner' },
    { id: '2', title: 'Two-Factor Authentication Setup', category: 'Account Safety', duration: '10 mins', difficulty: 'Beginner' },
    { id: '3', title: 'Deepfakes and Social Engineering', category: 'Advanced Threats', duration: '25 mins', difficulty: 'Advanced', link: 'https://example.com/deepfake-training' },
    { id: '4', title: 'Secure Remote Work Practices', category: 'Infrastructure', duration: '20 mins', difficulty: 'Intermediate' },
  ]);

  const handleAddModule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newModule.title) return;
    
    const module: TrainingModule = {
      title: newModule.title!,
      category: newModule.category!,
      duration: newModule.duration!,
      difficulty: newModule.difficulty as any,
      link: newModule.link,
      id: Math.random().toString(36).substr(2, 9)
    };
    
    setModules([module, ...modules]);
    setShowAddModule(false);
    setNewModule({ title: '', category: '', duration: '', difficulty: 'Beginner', link: '' });
  };

  const removeModule = (id: string) => {
    setModules(modules.filter(m => m.id !== id));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Training Academy</h1>
          <p className="text-zinc-500">
            {role === 'admin' ? 'Manage curriculum and external course links.' : 'Complete your assigned security training modules.'}
          </p>
        </div>
        {role === 'admin' && (
          <button 
            onClick={() => setShowAddModule(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg font-medium shadow-lg transition-all flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Training Link
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-indigo-900/40 to-purple-900/20 border border-indigo-500/20 p-8 rounded-3xl relative overflow-hidden group">
          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-2">Continue Learning</h2>
            <p className="text-indigo-200/70 mb-6 max-w-sm">You've completed 75% of the "Advanced Spear Phishing" certification.</p>
            <button className="bg-white text-indigo-900 px-6 py-2.5 rounded-full font-bold flex items-center gap-2 hover:scale-105 transition-transform">
              <PlayCircle className="w-5 h-5" />
              Resume Module
            </button>
          </div>
          <Trophy className="absolute -right-12 -bottom-12 w-64 h-64 text-indigo-500/10 group-hover:text-indigo-500/20 transition-all rotate-12" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl shadow-sm hover:border-zinc-700 transition-colors">
            <div className="w-10 h-10 bg-yellow-500/10 rounded-lg flex items-center justify-center mb-4">
              <Star className="w-5 h-5 text-yellow-400" />
            </div>
            <p className="text-zinc-500 text-sm">Average Score</p>
            <h3 className="text-2xl font-bold">94%</h3>
          </div>
          <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl shadow-sm hover:border-zinc-700 transition-colors">
            <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center mb-4">
              <BookOpen className="w-5 h-5 text-green-400" />
            </div>
            <p className="text-zinc-500 text-sm">Completed</p>
            <h3 className="text-2xl font-bold">{modules.length + 24}</h3>
          </div>
        </div>
      </div>

      <h2 className="text-xl font-bold mt-12 mb-4">Module Library</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {modules.map((module) => (
          <div 
            key={module.id} 
            onClick={() => module.link && window.open(module.link, '_blank')}
            className={`bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl flex items-center gap-6 hover:border-zinc-700 transition-colors group relative ${module.link ? 'cursor-pointer' : 'cursor-default'}`}
          >
            <div className={`w-16 h-16 bg-zinc-800 rounded-xl flex-shrink-0 flex items-center justify-center group-hover:bg-indigo-600 transition-colors`}>
              {module.link ? <ExternalLink className="w-8 h-8 text-zinc-400 group-hover:text-white" /> : <PlayCircle className="w-8 h-8 text-zinc-400 group-hover:text-white" />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] uppercase font-bold tracking-widest text-indigo-400">{module.category || 'General'}</span>
                {module.link && <span className="text-[10px] uppercase font-bold tracking-widest text-green-500 bg-green-500/10 px-1.5 rounded">External Course</span>}
                <span className={`text-[10px] uppercase font-bold tracking-widest ${
                  module.difficulty === 'Beginner' ? 'text-green-400' :
                  module.difficulty === 'Intermediate' ? 'text-yellow-400' : 'text-red-400'
                }`}>{module.difficulty}</span>
              </div>
              <h3 className="font-semibold text-lg truncate pr-8">{module.title}</h3>
              <div className="flex items-center gap-4 mt-2 text-zinc-500 text-sm">
                <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {module.duration || 'N/A'}</span>
                <span className="flex items-center gap-1"><BookOpen className="w-4 h-4" /> {module.link ? 'External Portal' : 'Internal Content'}</span>
              </div>
            </div>
            {role === 'admin' && (
              <button 
                onClick={(e) => { e.stopPropagation(); removeModule(module.id); }}
                className="absolute top-4 right-4 p-2 text-zinc-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Add Module Modal */}
      {showAddModule && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-zinc-900 border border-zinc-800 w-full max-w-lg rounded-3xl shadow-2xl p-8 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">New Training Module</h2>
              <button onClick={() => setShowAddModule(false)} className="text-zinc-500 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleAddModule} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-400">Title</label>
                <input 
                  autoFocus
                  required
                  value={newModule.title}
                  onChange={e => setNewModule({...newModule, title: e.target.value})}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2 text-sm outline-none focus:border-indigo-500 text-zinc-200"
                  placeholder="e.g. Advanced Spear Phishing"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-400">External Portal Link (Optional)</label>
                <div className="relative">
                  <ExternalLink className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input 
                    value={newModule.link}
                    onChange={e => setNewModule({...newModule, link: e.target.value})}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-4 py-2 text-sm outline-none focus:border-indigo-500 text-zinc-200"
                    placeholder="https://training.external.com/course-123"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-400">Category</label>
                  <input 
                    required
                    value={newModule.category}
                    onChange={e => setNewModule({...newModule, category: e.target.value})}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2 text-sm outline-none focus:border-indigo-500 text-zinc-200"
                    placeholder="e.g. Email Safety"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-400">Duration</label>
                  <input 
                    required
                    value={newModule.duration}
                    onChange={e => setNewModule({...newModule, duration: e.target.value})}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2 text-sm outline-none focus:border-indigo-500 text-zinc-200"
                    placeholder="e.g. 15 mins"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-400">Difficulty</label>
                <select 
                  value={newModule.difficulty}
                  onChange={e => setNewModule({...newModule, difficulty: e.target.value as any})}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2 text-sm outline-none focus:border-indigo-500 text-zinc-200"
                >
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </div>
              <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-indigo-500/20">
                Publish Training Module
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Training;
