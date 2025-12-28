
import React from 'react';
import { Bell, Search, UserCircle, Shield, User } from 'lucide-react';
import { UserRole } from '../types';

interface HeaderProps {
  role: UserRole;
}

const Header: React.FC<HeaderProps> = ({ role }) => {
  return (
    <header className="h-16 border-b border-zinc-800 flex items-center justify-between px-8 bg-[#09090b]/80 backdrop-blur-md sticky top-0 z-10">
      <div className="flex items-center bg-zinc-900 rounded-full px-4 py-1.5 w-96 max-w-full">
        <Search className="w-4 h-4 text-zinc-500 mr-2" />
        <input 
          type="text" 
          placeholder="Search courses, analysis..." 
          className="bg-transparent border-none outline-none text-sm w-full text-zinc-300 placeholder-zinc-500"
        />
      </div>

      <div className="flex items-center gap-4">
        <span className={`px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 ${
          role === 'admin' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' : 'bg-green-500/10 text-green-400 border border-green-500/20'
        }`}>
          {role === 'admin' ? <Shield className="w-3 h-3" /> : <User className="w-3 h-3" />}
          {role} Portal
        </span>
        
        <button className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-full transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-[#09090b]"></span>
        </button>
        <div className="flex items-center gap-3 pl-4 border-l border-zinc-800">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium">{role === 'admin' ? 'Agency Owner' : 'Employee'}</p>
            <p className="text-xs text-zinc-500">{role === 'admin' ? 'Full Access' : 'Learning Access'}</p>
          </div>
          <UserCircle className="w-8 h-8 text-zinc-400" />
        </div>
      </div>
    </header>
  );
};

export default Header;
