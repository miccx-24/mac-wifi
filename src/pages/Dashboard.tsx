import React from 'react';
import { Activity, Users, Server, AlertTriangle } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    { icon: Activity, label: 'Network Status', value: '98.9%', color: 'text-green-500' },
    { icon: Users, label: 'Active Users', value: '1,234', color: 'text-blue-500' },
    { icon: Server, label: 'Active Devices', value: '56', color: 'text-purple-500' },
    { icon: AlertTriangle, label: 'Active Alerts', value: '3', color: 'text-orange-500' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <stat.icon className={`h-8 w-8 ${stat.color}`} />
              <span className="text-2xl font-bold">{stat.value}</span>
            </div>
            <h3 className="text-gray-500">{stat.label}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Network Traffic</h2>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
            <p className="text-gray-500">Traffic Graph Placeholder</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Recent Alerts</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
                <div>
                  <p className="font-medium">High CPU Usage</p>
                  <p className="text-sm text-gray-500">Server ID: SRV-{index + 1}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;