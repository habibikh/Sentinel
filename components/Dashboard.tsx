
import React, { useEffect, useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { ShieldCheck, Target, MousePointer2, AlertTriangle, Sparkles, GraduationCap } from 'lucide-react';
import { generateSecurityAdvice } from '../services/geminiService';
import { SecurityTip, UserRole } from '../types';

const data = [
  { name: 'Jan', clicks: 12, reports: 45 },
  { name: 'Feb', clicks: 18, reports: 52 },
  { name: 'Mar', clicks: 8, reports: 61 },
  { name: 'Apr', clicks: 5, reports: 72 },
  { name: 'May', clicks: 2, reports: 85 },
];

interface DashboardProps {
  role: UserRole;
}

const Dashboard: React.FC<DashboardProps> = ({ role }) => {
  const [tips, setTips] = useState<SecurityTip[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTips = async () => {
      const advice = await generateSecurityAdvice(role === 'admin' ? "Agency Security Management" : "Employee Daily Safety");
      setTips(advice);
      setLoading(false);
    };
    fetchTips();
  }, [role]);

  const adminStats = [
    { label: 'Agency Score', value: '84/100', icon: ShieldCheck, color: 'text-green-400' },
    { label: 'Total Simulations', value: '12', icon: Target, color: 'text-blue-400' },
    { label: 'Avg Click Rate', value: '4.2%', icon: MousePointer2, color: 'text-yellow-400' },
    { label: 'Reporting Rate', value: '92%', icon: AlertTriangle, color: 'text-purple-400' },
  ];

  const userStats = [
    { label: 'Personal Progress', value: '75%', icon: GraduationCap, color: 'text-indigo-400' },
    { label: 'Simulations Faced', value: '3', icon: Target, color: 'text-blue-400' },
    { label: 'Simulations Reported', value: '100%', icon: ShieldCheck, color: 'text-green-400' },
    { label: 'Current Streak', value: '12 Days', icon: Sparkles, color: 'text-yellow-400' },
  ];

  const stats = role === 'admin' ? adminStats : userStats;

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">{role === 'admin' ? 'Security Operations' : 'Welcome back, Safety First!'}</h1>
          <p className="text-zinc-500">{role === 'admin' ? 'Overview of agency-wide resilience and threat levels.' : 'Your personal security training progress and insights.'}</p>
        </div>
        {role === 'admin' && (
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg font-medium shadow-lg shadow-indigo-500/20 transition-all flex items-center gap-2">
            <Target className="w-4 h-4" />
            Launch Simulation
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl hover:border-zinc-700 transition-colors group">
            <div className="flex items-center justify-between mb-4">
              <stat.icon className={`w-8 h-8 ${stat.color} p-1.5 bg-zinc-800 rounded-lg`} />
              <span className="text-xs text-green-500 bg-green-500/10 px-2 py-0.5 rounded-full">+12%</span>
            </div>
            <p className="text-zinc-500 text-sm">{stat.label}</p>
            <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl h-[400px]">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-semibold">{role === 'admin' ? 'Agency Resilience Trend' : 'Module Completion History'}</h2>
          </div>
          <ResponsiveContainer width="100%" height="80%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorReports" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
              <XAxis dataKey="name" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#18181b', border: '1px solid #3f3f46', borderRadius: '8px' }}
                itemStyle={{ color: '#fafafa' }}
              />
              <Area type="monotone" dataKey="reports" stroke="#6366f1" fillOpacity={1} fill="url(#colorReports)" />
              {role === 'admin' && <Area type="monotone" dataKey="clicks" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.1} />}
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl flex flex-col">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            <h2 className="text-xl font-semibold">AI Security Feed</h2>
          </div>
          <div className="space-y-4 flex-1 overflow-y-auto pr-2">
            {loading ? (
              <div className="animate-pulse space-y-4">
                {[1, 2, 3].map(i => <div key={i} className="h-20 bg-zinc-800 rounded-xl"></div>)}
              </div>
            ) : (
              tips.map((tip, idx) => (
                <div key={idx} className="p-4 bg-zinc-800/50 border border-zinc-700/50 rounded-xl hover:border-indigo-500/50 transition-all cursor-default">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-sm text-indigo-300">{tip.title}</h4>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider ${
                      tip.urgency === 'high' ? 'bg-red-500/20 text-red-400' : 
                      tip.urgency === 'medium' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-green-500/20 text-green-400'
                    }`}>
                      {tip.urgency}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">{tip.content}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
