
import React, { useState } from 'react';
import { ShieldAlert, Search, AlertCircle, CheckCircle2, ListChecks, Info, ArrowRight } from 'lucide-react';
import { analyzeEmail } from '../services/geminiService';
import { EmailAnalysisResult } from '../types';

const EmailAnalyzer: React.FC = () => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<EmailAnalysisResult | null>(null);

  const handleAnalyze = async () => {
    if (!content.trim()) return;
    setLoading(true);
    const analysis = await analyzeEmail(content);
    setResult(analysis);
    setLoading(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold">Email Risk Analysis</h1>
        <p className="text-zinc-500 text-lg">Paste email content or headers for an immediate AI security assessment.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
            <label className="block text-sm font-medium text-zinc-400 mb-4">Input Email Data</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Paste raw email body, suspicious links, or full email headers here..."
              className="w-full h-80 bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-sm font-mono text-zinc-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all resize-none"
            />
            <button
              onClick={handleAnalyze}
              disabled={loading || !content.trim()}
              className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/10"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Performing Deep Analysis...
                </>
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  Run Risk Analysis
                </>
              )}
            </button>
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl">
            <h3 className="flex items-center gap-2 font-semibold mb-2 text-zinc-300">
              <Info className="w-4 h-4 text-blue-400" />
              Why Analyze?
            </h3>
            <p className="text-sm text-zinc-500 leading-relaxed">
              Our AI engine inspects psychological triggers, linguistic patterns, and technical inconsistencies that signature-based filters often miss. Help your agency reduce incidents by 40% through proactive analysis.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {!result && !loading && (
            <div className="h-full border-2 border-dashed border-zinc-800 rounded-3xl flex flex-col items-center justify-center p-12 text-center opacity-50">
              <ShieldAlert className="w-16 h-16 text-zinc-700 mb-4" />
              <p className="text-zinc-500">Analysis results will appear here after scanning the email content.</p>
            </div>
          )}

          {loading && (
            <div className="space-y-6 animate-pulse">
              <div className="h-32 bg-zinc-900 rounded-2xl"></div>
              <div className="h-64 bg-zinc-900 rounded-2xl"></div>
            </div>
          )}

          {result && !loading && (
            <div className="space-y-6 animate-in zoom-in-95 duration-300">
              {/* Score & Level Card */}
              <div className={`p-6 rounded-2xl border flex items-center justify-between ${
                result.threatLevel === 'Critical' || result.threatLevel === 'High' 
                ? 'bg-red-500/10 border-red-500/30' 
                : 'bg-zinc-900 border-zinc-800'
              }`}>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">Risk Assessment</span>
                  <h2 className={`text-4xl font-black mt-1 ${
                    result.threatLevel === 'Critical' || result.threatLevel === 'High' ? 'text-red-400' : 'text-green-400'
                  }`}>
                    {result.riskScore}/100
                  </h2>
                </div>
                <div className="text-right">
                  <span className={`px-4 py-1.5 rounded-full text-sm font-bold ${
                    result.threatLevel === 'Critical' || result.threatLevel === 'High' 
                    ? 'bg-red-500 text-white' 
                    : 'bg-zinc-800 text-zinc-300'
                  }`}>
                    {result.threatLevel}
                  </span>
                  <p className="text-xs text-zinc-500 mt-2">{result.classification}</p>
                </div>
              </div>

              {/* Findings */}
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
                <h3 className="flex items-center gap-2 font-bold mb-4 text-zinc-100">
                  <AlertCircle className="w-5 h-5 text-yellow-500" />
                  Key Findings
                </h3>
                <ul className="space-y-3">
                  {result.findings.map((finding, idx) => (
                    <li key={idx} className="flex gap-3 text-sm text-zinc-400 bg-zinc-950/50 p-3 rounded-lg border border-zinc-800">
                      <div className="mt-1 flex-shrink-0 w-1.5 h-1.5 bg-yellow-500 rounded-full"></div>
                      {finding}
                    </li>
                  ))}
                </ul>
              </div>

              {/* AI Explanation */}
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
                <h3 className="flex items-center gap-2 font-bold mb-3 text-zinc-100">
                  <Info className="w-5 h-5 text-indigo-400" />
                  AI Reasoning
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed italic">
                  "{result.explanation}"
                </p>
              </div>

              {/* Recommendations */}
              <div className="bg-indigo-600/10 border border-indigo-500/20 rounded-2xl p-6">
                <h3 className="flex items-center gap-2 font-bold mb-4 text-indigo-300">
                  <ListChecks className="w-5 h-5" />
                  Action Items
                </h3>
                <div className="grid gap-3">
                  {result.recommendations.map((rec, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-sm text-indigo-100/80 bg-indigo-500/5 p-3 rounded-xl">
                      <CheckCircle2 className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                      {rec}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailAnalyzer;
