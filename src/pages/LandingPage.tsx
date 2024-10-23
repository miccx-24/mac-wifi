import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Network, Shield, Zap, BarChart2, ArrowRight, CheckCircle } from 'lucide-react';
import AuthModal from '../components/AuthModal';

const LandingPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const navigate = useNavigate();

  const features = [
    {
      icon: Network,
      title: 'Network Monitoring',
      description: 'Real-time monitoring of your entire network infrastructure with advanced analytics',
    },
    {
      icon: Shield,
      title: 'Security Management',
      description: 'Enterprise-grade security features to protect your network from threats',
    },
    {
      icon: Zap,
      title: 'Performance Analytics',
      description: 'Comprehensive insights into network performance and usage patterns',
    },
    {
      icon: BarChart2,
      title: 'Resource Optimization',
      description: 'AI-powered optimization to maximize network efficiency and reduce costs',
    },
  ];

  const benefits = [
    'Real-time monitoring and alerts',
    'Advanced security protocols',
    '24/7 technical support',
    'Custom reporting dashboard',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Network className="h-8 w-8 text-blue-500 animate-pulse" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                Mac-Fi
              </span>
            </div>
            <div className="space-x-4">
              <button
                onClick={() => {
                  setAuthMode('login');
                  setIsModalOpen(true);
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  setAuthMode('signup');
                  setIsModalOpen(true);
                }}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all transform hover:scale-105 shadow-lg hover:shadow-blue-200"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <div className="inline-block">
            <span className="bg-blue-50 text-blue-600 text-sm font-medium px-4 py-1 rounded-full">
              New: Advanced AI Integration
            </span>
          </div>
          <h1 className="mt-6 text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
            Network Management
            <span className="block mt-2 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              Made Simple
            </span>
          </h1>
          <p className="mt-6 max-w-md mx-auto text-base text-gray-600 sm:text-lg md:mt-8 md:text-xl md:max-w-3xl">
            Monitor, manage, and optimize your network infrastructure with our comprehensive solution.
            Trusted by over 10,000 businesses worldwide.
          </p>
          <div className="mt-8 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <button
              onClick={() => {
                setAuthMode('signup');
                setIsModalOpen(true);
              }}
              className="group w-full flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg text-white bg-blue-500 hover:bg-blue-600 transition-all transform hover:scale-105 shadow-lg hover:shadow-blue-200"
            >
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          <div className="mt-8 flex justify-center space-x-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center text-gray-600">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-sm">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group bg-white p-6 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-100"
            >
              <div className="p-3 bg-blue-50 rounded-lg w-fit group-hover:bg-blue-100 transition-colors">
                <feature.icon className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">{feature.title}</h3>
              <p className="mt-2 text-gray-500">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode={authMode}
        onSwitchMode={setAuthMode}
      />
    </div>
  );
};

export default LandingPage;