
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Send, 
  GraduationCap, 
  ShieldAlert, 
  Settings,
  Users,
  SearchCode,
  LogOut
} from 'lucide-react';
import { UserRole } from '../types';

interface SidebarProps {
  onLogout: () => void;
  role: UserRole;
}

const Sidebar: React.FC<SidebarProps> = ({ onLogout, role }) => {
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/', roles: ['admin', 'user'] },
    { name: 'Simulations', icon: Send, path: '/campaigns', roles: ['admin'] },
    { name: 'Email Analyzer', icon: SearchCode, path: '/analyzer', roles: ['admin', 'user'] },
    { name: 'Training', icon: GraduationCap, path: '/training', roles: ['admin', 'user'] },
    { name: 'Users', icon: Users, path: '/users', roles: ['admin'] },
  ];

  const visibleItems = menuItems.filter(item => item.roles.includes(role));

  return (
    <aside className="w-64 bg-[#09090b] border-r border-zinc-800 hidden md:flex flex-col">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
          <ShieldAlert className="w-5 h-5 text-white" />
        </div>
        <span className="font-bold text-xl tracking-tight">SENTINEL</span>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        {visibleItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2 rounded-md transition-all ${
                isActive 
                  ? 'bg-zinc-800 text-white shadow-sm' 
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
              }`}
            >
              <item.icon className={`w-5 h-5 ${isActive ? 'text-indigo-400' : ''}`} />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-zinc-800 space-y-1">
        <button className="flex items-center gap-3 px-3 py-2 w-full text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-md transition-all">
          <Settings className="w-5 h-5" />
          <span className="font-medium">Settings</span>
        </button>
        <button 
          onClick={onLogout}
          className="flex items-center gap-3 px-3 py-2 w-full text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-md transition-all"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
