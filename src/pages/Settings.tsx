import React from 'react';
import { Bell, Shield, Globe, Mail, User } from 'lucide-react';

const Settings = () => {
  const sections = [
    {
      title: 'Profile Settings',
      icon: User,
      settings: [
        { name: 'Full Name', value: 'John Doe' },
        { name: 'Email', value: 'john@example.com' },
        { name: 'Role', value: 'Administrator' },
      ],
    },
    {
      title: 'Notification Preferences',
      icon: Bell,
      settings: [
        { name: 'Email Notifications', type: 'toggle', value: true },
        { name: 'Alert Notifications', type: 'toggle', value: true },
        { name: 'System Updates', type: 'toggle', value: false },
      ],
    },
    {
      title: 'Security Settings',
      icon: Shield,
      settings: [
        { name: 'Two-Factor Authentication', type: 'toggle', value: false },
        { name: 'Session Timeout', value: '30 minutes' },
        { name: 'Password', type: 'password', value: '••••••••' },
      ],
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      <div className="space-y-6">
        {sections.map((section, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b">
              <div className="flex items-center space-x-2">
                <section.icon className="h-5 w-5 text-gray-500" />
                <h2 className="text-lg font-semibold">{section.title}</h2>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {section.settings.map((setting, settingIndex) => (
                <div key={settingIndex} className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">{setting.name}</h3>
                    {setting.type !== 'toggle' && (
                      <p className="text-sm text-gray-500">{setting.value}</p>
                    )}
                  </div>
                  {setting.type === 'toggle' ? (
                    <button
                      className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                        setting.value ? 'bg-blue-500' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                          setting.value ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  ) : (
                    <button className="text-sm text-blue-500 hover:text-blue-600">
                      Edit
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Settings;