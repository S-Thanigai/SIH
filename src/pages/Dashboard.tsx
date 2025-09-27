import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import { useTranslation } from 'react-i18next';
import { RiskChart } from '../components/RiskChart';
import { 
  Droplets, 
  TrendingUp, 
  AlertTriangle, 
  Calendar,
  MapPin,
  Eye
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { waterQualityData, outbreakAlerts, getCurrentRiskScore } = useData();
  const { t } = useTranslation();
  
  const riskScore = getCurrentRiskScore();
  const isUnsafe = riskScore > 50;
  const recentData = waterQualityData.slice(0, 5);
  const recentAlerts = outbreakAlerts.slice(0, 3);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High': return 'text-red-600 bg-red-100';
      case 'Moderate': return 'text-yellow-600 bg-yellow-100';
      case 'Low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">
          {t('welcome')}, {user?.name}!
        </h1>
        <p className="text-blue-100">
          {user?.role === 'municipality_worker' 
            ? 'Monitor and collect water quality data to protect your community.'
            : 'Analyze trends and manage public health initiatives.'
          }
        </p>
      </div>

      {/* Risk Score Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center space-x-3 mb-6">
            <Droplets className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-900">{t('risk_score')}</h2>
          </div>
          
          <div className="flex justify-center">
            <RiskChart riskScore={riskScore} size={250} />
          </div>
          
          <div className="mt-6 p-4 rounded-xl bg-gray-50">
            <div className="text-sm text-gray-600 mb-2">Current Status</div>
            <div className={`text-lg font-semibold ${
              isUnsafe ? 'text-red-600' : 'text-green-600'
            }`}>
              {isUnsafe ? t('unsafe') : t('safe')} Water Conditions
            </div>
            <div className="text-sm text-gray-500 mt-1">
              Last updated: {waterQualityData[0]?.date || 'N/A'}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {new Set(waterQualityData.map(d => d.location)).size}
                  </div>
                  <div className="text-sm text-gray-600">Locations</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {outbreakAlerts.length}
                  </div>
                  <div className="text-sm text-gray-600">Active Alerts</div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Alerts */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Recent Alerts</h3>
              <Eye className="w-5 h-5 text-gray-400" />
            </div>
            
            <div className="space-y-3">
              {recentAlerts.map((alert) => (
                <div key={alert.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 text-sm">
                      {alert.location}
                    </div>
                    <div className="text-xs text-gray-600">
                      {alert.predictionDays} days, {alert.probability}% probability
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(alert.severity)}`}>
                    {alert.severity}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Water Quality Data */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="flex items-center space-x-3 mb-6">
          <TrendingUp className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-bold text-gray-900">{t('recent_data')}</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-600">{t('location')}</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">{t('date')}</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">pH</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">{t('turbidity')}</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Risk</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentData.map((data) => (
                <tr key={data.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-900">{data.location}</td>
                  <td className="py-3 px-4 text-gray-600">{data.date}</td>
                  <td className="py-3 px-4 text-gray-600">{data.pH}</td>
                  <td className="py-3 px-4 text-gray-600">{data.turbidity}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      data.riskScore > 50 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {data.riskScore}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      data.isUnsafe ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {data.isUnsafe ? t('unsafe') : t('safe')}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};