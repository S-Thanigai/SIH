import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import { useTranslation } from 'react-i18next';
import { 
  Database, 
  MapPin, 
  Calendar, 
  Clock,
  TestTube,
  Droplets,
  CheckCircle
} from 'lucide-react';

const locations = [
  'Guwahati Central',
  'Dibrugarh East',
  'Tezpur North',
  'Silchar South',
  'Jorhat West',
  'Nagaon Central',
];

export const DataCollection: React.FC = () => {
  const { addWaterQualityData } = useData();
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    location: '',
    date: new Date().toISOString().split('T')[0],
    time: new Date().toTimeString().slice(0, 5),
    pH: '',
    turbidity: '',
    chloride: '',
    nitrite: '',
    tds: '',
  });
  
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    addWaterQualityData({
      location: formData.location,
      date: formData.date,
      time: formData.time,
      pH: parseFloat(formData.pH),
      turbidity: parseFloat(formData.turbidity),
      chloride: parseFloat(formData.chloride),
      nitrite: parseFloat(formData.nitrite),
      tds: parseFloat(formData.tds),
    });
    
    setLoading(false);
    
    // Show success message and redirect to dashboard
    alert('Data submitted successfully! Risk score has been calculated.');
    navigate('/dashboard');
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isFormValid = () => {
    return Object.values(formData).every(value => value !== '');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl p-8 text-white">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
            <Database className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-2">{t('data_collection')}</h1>
            <p className="text-green-100">
              Collect water quality measurements to assess community health risks
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Location & DateTime */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="w-4 h-4 inline mr-2" />
                {t('location')}
              </label>
              <select
                value={formData.location}
                onChange={(e) => handleChange('location', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">{t('select_location')}</option>
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-2" />
                {t('date')}
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => handleChange('date', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Clock className="w-4 h-4 inline mr-2" />
                Time
              </label>
              <input
                type="time"
                value={formData.time}
                onChange={(e) => handleChange('time', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          {/* Water Quality Parameters */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
              <TestTube className="w-5 h-5 mr-2" />
              Water Quality Parameters
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  pH Level (6.5 - 8.5)
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="14"
                  value={formData.pH}
                  onChange={(e) => handleChange('pH', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="7.0"
                  required
                />
                <div className="mt-1 text-xs text-gray-500">
                  Ideal range: 6.5 - 8.5
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Turbidity (NTU)
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  value={formData.turbidity}
                  onChange={(e) => handleChange('turbidity', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="2.5"
                  required
                />
                <div className="mt-1 text-xs text-gray-500">
                  Ideal: {'<'} 1 NTU
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Chloride (mg/L)
                </label>
                <input
                  type="number"
                  step="1"
                  min="0"
                  value={formData.chloride}
                  onChange={(e) => handleChange('chloride', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="45"
                  required
                />
                <div className="mt-1 text-xs text-gray-500">
                  Ideal: {'<'} 250 mg/L
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nitrite (mg/L)
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  value={formData.nitrite}
                  onChange={(e) => handleChange('nitrite', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0.8"
                  required
                />
                <div className="mt-1 text-xs text-gray-500">
                  Ideal: {'<'} 1 mg/L
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  TDS (mg/L)
                </label>
                <input
                  type="number"
                  step="1"
                  min="0"
                  value={formData.tds}
                  onChange={(e) => handleChange('tds', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="180"
                  required
                />
                <div className="mt-1 text-xs text-gray-500">
                  Ideal: {'<'} 500 mg/L
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="border-t border-gray-200 pt-6">
            <button
              type="submit"
              disabled={!isFormValid() || loading}
              className="w-full md:w-auto px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3"
            >
              {loading ? (
                <>
                  <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <CheckCircle className="w-5 h-5" />
                  <span>{t('submit_data')}</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Information Panel */}
        <div className="mt-8 p-6 bg-blue-50 rounded-xl">
          <div className="flex items-start space-x-4">
            <Droplets className="w-6 h-6 text-blue-600 mt-1" />
            <div>
              <h4 className="text-lg font-bold text-blue-900 mb-2">
                How Risk Calculation Works
              </h4>
              <p className="text-blue-800 text-sm leading-relaxed">
                Our AI model analyzes the submitted parameters against WHO standards to calculate a risk score (0-100). 
                Scores above 50 indicate unsafe water conditions that may lead to waterborne diseases. 
                The system will automatically generate alerts and predictions for your location.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};