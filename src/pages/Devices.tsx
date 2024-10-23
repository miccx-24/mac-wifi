import React from 'react';
import { Server, Wifi, Smartphone, HardDrive } from 'lucide-react';

const Devices = () => {
  const devices = [
    {
      id: 1,
      name: 'Main Server',
      type: 'server',
      status: 'online',
      ip: '192.168.1.100',
      lastSeen: 'Active now',
      icon: Server,
    },
    {
      id: 2,
      name: 'WiFi Router',
      type: 'network',
      status: 'online',
      ip: '192.168.1.1',
      lastSeen: 'Active now',
      icon: Wifi,
    },
    {
      id: 3,
      name: 'Mobile Device',
      type: 'mobile',
      status: 'offline',
      ip: '192.168.1.154',
      lastSeen: '2 hours ago',
      icon: Smartphone,
    },
    {
      id: 4,
      name: 'Storage Server',
      type: 'storage',
      status: 'online',
      ip: '192.168.1.200',
      lastSeen: 'Active now',
      icon: HardDrive,
    },
  ];

  const getStatusColor = (status: string) => {
    return status === 'online' ? 'text-green-500' : 'text-gray-500';
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Network Devices</h1>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
          Add Device
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {devices.map((device) => (
          <div key={device.id} className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <device.icon className="h-6 w-6 text-gray-600" />
                </div>
                <div>
                  <h3 className="font-semibold">{device.name}</h3>
                  <p className="text-sm text-gray-500">{device.type}</p>
                </div>
              </div>
              <span className={`text-sm font-medium ${getStatusColor(device.status)}`}>
                ●
              </span>
            </div>
            
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">IP Address</span>
                <span>{device.ip}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Last Seen</span>
                <span>{device.lastSeen}</span>
              </div>
            </div>

            <div className="mt-4 flex space-x-2">
              <button className="flex-1 px-3 py-2 text-sm text-blue-500 hover:bg-blue-50 rounded-lg transition-colors">
                Configure
              </button>
              <button className="flex-1 px-3 py-2 text-sm text-gray-500 hover:bg-gray-50 rounded-lg transition-colors">
                Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Devices;