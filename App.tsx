
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Campaigns from './components/Campaigns';
import Training from './components/Training';
import EmailAnalyzer from './components/EmailAnalyzer';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Chatbot from './components/Chatbot';
import Login from './components/Login';
import { UserRole } from './types';

const App: React.FC = () => {
  const [role, setRole] = useState<UserRole | null>(() => {
    const saved = localStorage.getItem('sentinel_role');
    return saved as UserRole | null;
  });

  const handleLogin = (userRole: UserRole) => {
    setRole(userRole);
    localStorage.setItem('sentinel_role', userRole);
    localStorage.setItem('sentinel_auth', 'true');
  };

  const handleLogout = () => {
    setRole(null);
    localStorage.removeItem('sentinel_role');
    localStorage.removeItem('sentinel_auth');
  };

  if (!role) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <HashRouter>
      <div className="flex h-screen bg-[#09090b] text-zinc-100 overflow-hidden">
        <Sidebar onLogout={handleLogout} role={role} />
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
          <Header role={role} />
          <main className="flex-1 overflow-y-auto p-4 md:p-8">
            <Routes>
              <Route path="/" element={<Dashboard role={role} />} />
              {role === 'admin' && <Route path="/campaigns" element={<Campaigns />} />}
              <Route path="/analyzer" element={<EmailAnalyzer />} />
              <Route path="/training" element={<Training role={role} />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Chatbot />
        </div>
      </div>
    </HashRouter>
  );
};

export default App;
