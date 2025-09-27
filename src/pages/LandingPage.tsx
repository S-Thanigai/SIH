import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Droplets, 
  Shield, 
  Users, 
  TrendingUp,
  ChevronRight,
  MapPin,
  Calendar,
  BarChart3
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');

  const features = [
    {
      icon: Shield,
      title: 'Real-time Monitoring',
      description: 'Continuous water quality monitoring with instant alerts for potential health risks.'
    },
    {
      icon: Users,
      title: 'Community-Driven',
      description: 'Empowering municipality workers, health officials, and volunteers to protect communities.'
    },
    {
      icon: TrendingUp,
      title: 'Predictive Analytics',
      description: 'AI-powered predictions to prevent waterborne disease outbreaks before they occur.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="pt-16 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Droplets className="w-12 h-12 text-white" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              {t('protecting_communities')}
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
              {t('system_description')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <button
                onClick={() => navigate('/water-quality-check')}
                className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
              >
                <Droplets className="w-5 h-5" />
                <span>{t('check_water_quality')}</span>
              </button>
              
              <button
                onClick={() => setShowAuthModal(true)}
                className="px-8 py-4 border-2 border-blue-600 text-blue-600 font-semibold rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <span>{t('sign_in')}</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('about')}</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our comprehensive platform combines real-time monitoring, community engagement, and predictive analytics to safeguard public health.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 hover:shadow-lg transition-all duration-200">
                <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-white mb-2">50+</div>
              <div className="text-blue-100">Monitoring Locations</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">24/7</div>
              <div className="text-blue-100">Real-time Monitoring</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">95%</div>
              <div className="text-blue-100">Prediction Accuracy</div>
            </div>
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {authMode === 'signin' ? t('sign_in') : t('sign_up')}
              </h2>
              <p className="text-gray-600">Select your role to continue</p>
            </div>
            
            <div className="space-y-4">
              {[
                { key: 'municipality_worker', icon: Users, color: 'blue' },
                { key: 'health_official', icon: Shield, color: 'green' },
                { key: 'community_volunteer', icon: BarChart3, color: 'purple' },
              ].map((role) => (
                <Link
                  key={role.key}
                  to={`/${authMode}?role=${role.key}`}
                  className={`w-full flex items-center space-x-4 p-4 border-2 border-${role.color}-200 rounded-xl hover:border-${role.color}-400 hover:bg-${role.color}-50 transition-all duration-200`}
                  onClick={() => setShowAuthModal(false)}
                >
                  <role.icon className={`w-6 h-6 text-${role.color}-600`} />
                  <span className="font-medium text-gray-900">
                    {t(role.key)}
                  </span>
                  <ChevronRight className="w-5 h-5 text-gray-400 ml-auto" />
                </Link>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <button
                onClick={() => setAuthMode(authMode === 'signin' ? 'signup' : 'signin')}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                {authMode === 'signin' 
                  ? `Don't have an account? ${t('sign_up')}` 
                  : `Already have an account? ${t('sign_in')}`
                }
              </button>
            </div>
            
            <button
              onClick={() => setShowAuthModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};