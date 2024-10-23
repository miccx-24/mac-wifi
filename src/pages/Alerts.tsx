import React from 'react';
import { AlertTriangle, CheckCircle, AlertCircle, Clock } from 'lucide-react';

const Alerts = () => {
  const alerts = [
    {
      id: 1,
      title: 'High CPU Usage',
      description: 'Server CPU usage exceeded 90%',
      severity: 'high',
      time: '2 minutes ago',
      status: 'active',
    },
    {
      id: 2,
      title: 'Network Latency',
      description: 'Increased latency detected on main network',
      severity: 'medium',
      time: '15 minutes ago',
      status: 'investigating',
    },
    {
      id: 3,
      title: 'Storage Warning',
      description: 'Storage capacity reaching 85%',
      severity: 'low',
      time: '1 hour ago',
      status: 'resolved',
    },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'text-red-500';
      case 'medium':
        return 'text-orange-500';
      case 'low':
        return 'text-yellow-500';
      default:
        return 'text-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'investigating':
        return <Clock className="h-5 w-5 text-orange-500" />;
      case 'resolved':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Alert Center</h1>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
            Mark All as Read
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="divide-y">
          {alerts.map((alert) => (
            <div key={alert.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  {getStatusIcon(alert.status)}
                  <div>
                    <h3 className="font-semibold">{alert.title}</h3>
                    <p className="text-gray-600 mt-1">{alert.description}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <span className={`text-sm font-medium ${getSeverityColor(alert.severity)}`}>
                        {alert.severity.toUpperCase()}
                      </span>
                      <span className="text-sm text-gray-500">{alert.time}</span>
                    </div>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <AlertCircle className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Alerts;