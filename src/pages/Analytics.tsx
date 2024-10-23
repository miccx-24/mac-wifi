import React from 'react';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';

const Analytics = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Network Analytics</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500">Bandwidth Usage</h3>
            <TrendingUp className="h-6 w-6 text-green-500" />
          </div>
          <p className="text-2xl font-bold">2.4 TB</p>
          <p className="text-sm text-green-500">+5.25% from last week</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500">Average Latency</h3>
            <TrendingDown className="h-6 w-6 text-red-500" />
          </div>
          <p className="text-2xl font-bold">24ms</p>
          <p className="text-sm text-red-500">+2ms from last week</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500">Uptime</h3>
            <Activity className="h-6 w-6 text-blue-500" />
          </div>
          <p className="text-2xl font-bold">99.9%</p>
          <p className="text-sm text-blue-500">Last 30 days</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Network Traffic</h2>
          <div className="h-80 flex items-center justify-center bg-gray-50 rounded">
            <p className="text-gray-500">Traffic Graph Placeholder</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Top Applications</h2>
          <div className="space-y-4">
            {['Web Server', 'Database', 'Email', 'File Storage', 'VPN'].map((app, index) => (
              <div key={index} className="flex items-center justify-between">
                <span>{app}</span>
                <div className="w-2/3">
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-2 bg-blue-500 rounded-full"
                      style={{ width: `${Math.random() * 60 + 40}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;