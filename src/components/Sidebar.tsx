import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Bell, 
  BarChart2, 
  HardDrive, 
  Settings,
  LogOut,
  Network
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Sidebar = () => {
  const { logout, user } = useAuth();

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Bell, label: 'Alerts', path: '/alerts' },
    { icon: BarChart2, label: 'Analytics', path: '/analytics' },
    { icon: HardDrive, label: 'Devices', path: '/devices' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <div className="w-64 bg-gray-900 text-white flex flex-col">
      <div className="p-4">
        <div className="flex items-center space-x-2 mb-8">
          <Network className="h-8 w-8 text-blue-400" />
          <span className="text-xl font-bold">Mac-Fi</span>
        </div>
        
        <div className="mb-8">
          <div className="px-4 py-2 bg-gray-800 rounded-lg">
            <p className="text-sm text-gray-400">Welcome,</p>
            <p className="font-semibold">{user?.name}</p>
          </div>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center space-x-2 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-300 hover:bg-gray-800'
                }`
              }
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-4">
        <button
          onClick={logout}
          className="flex items-center space-x-2 px-4 py-3 w-full text-gray-300 hover:bg-gray-800 rounded-lg transition-colors"
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;