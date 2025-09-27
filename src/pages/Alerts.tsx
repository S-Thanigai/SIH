import React from 'react';
import { useData } from '../contexts/DataContext';
import { useTranslation } from 'react-i18next';
import { 
  AlertTriangle, 
  Clock, 
  MapPin, 
  TrendingUp,
  Shield,
  Calendar
} from 'lucide-react';

export const Alerts: React.FC = () => {
  const { outbreakAlerts } = useData();
  const { t } = useTranslation();

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High': return {
        bg: 'bg-red-50 border-red-200',
        text: 'text-red-800',
        badge: 'bg-red-100 text-red-800',
        icon: 'text-red-600'
      };
      case 'Moderate': return {
        bg: 'bg-yellow-50 border-yellow-200',
        text: 'text-yellow-800',
        badge: 'bg-yellow-100 text-yellow-800',
        icon: 'text-yellow-600'
      };
      case 'Low': return {
        bg: 'bg-green-50 border-green-200',
        text: 'text-green-800',
        badge: 'bg-green-100 text-green-800',
        icon: 'text-green-600'
      };
      default: return {
        bg: 'bg-gray-50 border-gray-200',
        text: 'text-gray-800',
        badge: 'bg-gray-100 text-gray-800',
        icon: 'text-gray-600'
      };
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'High': return AlertTriangle;
      case 'Moderate': return Clock;
      case 'Low': return Shield;
      default: return AlertTriangle;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl p-8 text-white">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-2">{t('alerts')}</h1>
            <p className="text-red-100">
              Monitor outbreak predictions and take preventive action
            </p>
          </div>
        </div>
      </div>

      {/* Alert Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {outbreakAlerts.filter(a => a.severity === 'High').length}
              </div>
              <div className="text-sm text-gray-600">High Risk</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {outbreakAlerts.filter(a => a.severity === 'Moderate').length}
              </div>
              <div className="text-sm text-gray-600">Moderate Risk</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {outbreakAlerts.filter(a => a.severity === 'Low').length}
              </div>
              <div className="text-sm text-gray-600">Low Risk</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {Math.round(outbreakAlerts.reduce((acc, alert) => acc + alert.probability, 0) / outbreakAlerts.length)}%
              </div>
              <div className="text-sm text-gray-600">Avg. Probability</div>
            </div>
          </div>
        </div>
      </div>

      {/* Active Alerts */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="flex items-center space-x-3 mb-6">
          <AlertTriangle className="w-6 h-6 text-red-600" />
          <h2 className="text-xl font-bold text-gray-900">{t('outbreak_predictions')}</h2>
        </div>

        {outbreakAlerts.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">No Active Alerts</h3>
            <p className="text-gray-600">All monitored locations are currently safe</p>
          </div>
        ) : (
          <div className="space-y-6">
            {outbreakAlerts.map((alert) => {
              const colors = getSeverityColor(alert.severity);
              const SeverityIcon = getSeverityIcon(alert.severity);
              
              return (
                <div
                  key={alert.id}
                  className={`border-2 rounded-2xl p-6 ${colors.bg}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 bg-white rounded-xl flex items-center justify-center`}>
                        <SeverityIcon className={`w-6 h-6 ${colors.icon}`} />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <h3 className={`text-lg font-bold ${colors.text}`}>
                            Outbreak Risk Alert
                          </h3>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${colors.badge}`}>
                            {alert.severity} {t('severity')}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div className="flex items-center space-x-2">
                            <MapPin className={`w-4 h-4 ${colors.icon}`} />
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {alert.location}
                              </div>
                              <div className="text-xs text-gray-600">Location</div>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Clock className={`w-4 h-4 ${colors.icon}`} />
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {alert.predictionDays} {t('days_prediction')}
                              </div>
                              <div className="text-xs text-gray-600">Prediction Window</div>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <TrendingUp className={`w-4 h-4 ${colors.icon}`} />
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {alert.probability}% {t('probability')}
                              </div>
                              <div className="text-xs text-gray-600">Risk Probability</div>
                            </div>
                          </div>
                        </div>
                        
                        <p className={`text-sm ${colors.text} mb-4`}>
                          {alert.description}
                        </p>
                        
                        <div className="flex items-center space-x-2 text-xs text-gray-600">
                          <Calendar className="w-3 h-3" />
                          <span>Alert generated on {alert.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Action Items */}
      <div className="bg-blue-50 rounded-2xl p-8">
        <h3 className="text-lg font-bold text-blue-900 mb-4">Recommended Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6">
            <h4 className="font-bold text-gray-900 mb-3">For High Risk Areas:</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Increase water treatment monitoring frequency</li>
              <li>• Issue public health advisories</li>
              <li>• Deploy rapid response teams</li>
              <li>• Coordinate with local health authorities</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-xl p-6">
            <h4 className="font-bold text-gray-900 mb-3">For Moderate Risk Areas:</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Enhanced water quality testing</li>
              <li>• Community awareness campaigns</li>
              <li>• Preventive health measures</li>
              <li>• Regular system maintenance</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};