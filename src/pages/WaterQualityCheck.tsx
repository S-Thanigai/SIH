import React, { useState } from 'react';
import { useData } from '../contexts/DataContext';
import { useTranslation } from 'react-i18next';
import { MapPin, Calendar, Droplets, TrendingDown, TrendingUp } from 'lucide-react';

const locations = [
  'Guwahati Central',
  'Dibrugarh East',
  'Tezpur North',
  'Silchar South',
  'Jorhat West',
  'Nagaon Central',
];

export const WaterQualityCheck: React.FC = () => {
  const { getLocationData } = useData();
  const { t } = useTranslation();
  const [selectedLocation, setSelectedLocation] = useState('');
  const [locationData, setLocationData] = useState<any[]>([]);

  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location);
    const data = getLocationData(location);
    setLocationData(data);
  };

  return (
    <div className="min-h-screen pt-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Droplets className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {t('check_water_quality')}
          </h1>
          <p className="text-lg text-gray-600">
            Select a location to view current and historical water quality data
          </p>
        </div>

        {/* Location Selector */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <MapPin className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-900">{t('select_location')}</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {locations.map((location) => (
              <button
                key={location}
                onClick={() => handleLocationSelect(location)}
                className={`p-4 text-left border-2 rounded-xl transition-all duration-200 ${
                  selectedLocation === location
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900">{location}</span>
                  {selectedLocation === location && (
                    <div className="w-3 h-3 bg-blue-600 rounded-full" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        {selectedLocation && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center space-x-3 mb-6">
              <Calendar className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-900">
                Water Quality Data for {selectedLocation}
              </h2>
            </div>

            {locationData.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Droplets className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-600">No data available for this location</p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Latest Reading */}
                <div className="border-l-4 border-blue-600 pl-6 py-4 bg-blue-50 rounded-r-xl">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-900">Latest Reading</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      locationData[0].isUnsafe 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      Risk Score: {locationData[0].riskScore}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <div className="text-sm text-gray-600">pH Level</div>
                      <div className="text-lg font-semibold text-gray-900">{locationData[0].pH}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Turbidity</div>
                      <div className="text-lg font-semibold text-gray-900">{locationData[0].turbidity} NTU</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Chloride</div>
                      <div className="text-lg font-semibold text-gray-900">{locationData[0].chloride} mg/L</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">TDS</div>
                      <div className="text-lg font-semibold text-gray-900">{locationData[0].tds} mg/L</div>
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-600">
                    Last updated: {locationData[0].date} at {locationData[0].time}
                  </div>
                </div>

                {/* Historical Data */}
                {locationData.length > 1 && (
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Historical Data</h3>
                    <div className="space-y-3">
                      {locationData.slice(1).map((data, index) => (
                        <div key={data.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                          <div className="flex items-center space-x-4">
                            <div className={`w-3 h-3 rounded-full ${
                              data.isUnsafe ? 'bg-red-400' : 'bg-green-400'
                            }`} />
                            <div>
                              <div className="font-medium text-gray-900">
                                {data.date} - Risk Score: {data.riskScore}
                              </div>
                              <div className="text-sm text-gray-600">
                                pH: {data.pH}, Turbidity: {data.turbidity} NTU
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {data.riskScore > locationData[0].riskScore ? (
                              <TrendingUp className="w-4 h-4 text-red-500" />
                            ) : (
                              <TrendingDown className="w-4 h-4 text-green-500" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};