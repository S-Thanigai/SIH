import React, { useState } from 'react';
import { useData } from '../contexts/DataContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TrendingUp, Calendar, MapPin, Filter } from 'lucide-react';

export const WaterTrends: React.FC = () => {
  const { waterQualityData } = useData();
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [timeRange, setTimeRange] = useState('7d');

  const locations = ['all', ...new Set(waterQualityData.map(d => d.location))];

  const getFilteredData = () => {
    let filtered = waterQualityData;
    
    if (selectedLocation !== 'all') {
      filtered = filtered.filter(d => d.location === selectedLocation);
    }
    
    // Sort by date for proper trend visualization
    return filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  };

  const trendData = getFilteredData().map(item => ({
    date: item.date,
    location: item.location,
    riskScore: item.riskScore,
    pH: item.pH,
    turbidity: item.turbidity,
    chloride: item.chloride,
    nitrite: item.nitrite,
    tds: item.tds,
  }));

  const locationSummary = locations.slice(1).map(location => {
    const locationData = waterQualityData.filter(d => d.location === location);
    const avgRisk = locationData.reduce((acc, d) => acc + d.riskScore, 0) / locationData.length;
    const latestData = locationData[0];
    
    return {
      location,
      avgRisk: Math.round(avgRisk),
      status: avgRisk > 50 ? 'High Risk' : avgRisk > 30 ? 'Moderate Risk' : 'Low Risk',
      lastUpdate: latestData?.date || 'N/A',
      dataPoints: locationData.length,
    };
  }).sort((a, b) => b.avgRisk - a.avgRisk);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-blue-600 rounded-2xl p-8 text-white">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-2">Water Quality Trends</h1>
            <p className="text-teal-100">
              Analyze historical data and identify patterns across monitoring locations
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex items-center space-x-3">
            <Filter className="w-5 h-5 text-gray-600" />
            <span className="font-medium text-gray-900">Filters</span>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-gray-600" />
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Locations</option>
                {locations.slice(1).map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-gray-600" />
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
                <option value="90d">Last 90 Days</option>
                <option value="1y">Last Year</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Risk Score Trends */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Risk Score Trends</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={[0, 100]} />
              <Tooltip 
                formatter={(value: any, name: string) => [
                  `${value}${name === 'riskScore' ? '' : ''}`, 
                  name === 'riskScore' ? 'Risk Score' : name
                ]}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="riskScore" 
                stroke="#3B82F6" 
                strokeWidth={3}
                dot={{ r: 6 }}
                name="Risk Score"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Parameter Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-lg font-bold text-gray-900 mb-6">pH Levels Over Time</h3>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[6, 9]} />
                <Tooltip />
                <Line type="monotone" dataKey="pH" stroke="#10B981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Turbidity Levels</h3>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="turbidity" fill="#F59E0B" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Location Summary */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Location Risk Summary</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-600">Location</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Avg Risk Score</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Data Points</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Last Update</th>
              </tr>
            </thead>
            <tbody>
              {locationSummary.map((location) => (
                <tr key={location.location} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-900">{location.location}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      location.avgRisk > 50 ? 'bg-red-100 text-red-800' : 
                      location.avgRisk > 30 ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {location.avgRisk}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      location.status === 'High Risk' ? 'bg-red-100 text-red-800' :
                      location.status === 'Moderate Risk' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {location.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{location.dataPoints}</td>
                  <td className="py-3 px-4 text-gray-600">{location.lastUpdate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Insights */}
      <div className="bg-blue-50 rounded-2xl p-8">
        <h3 className="text-lg font-bold text-blue-900 mb-4">Key Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6">
            <h4 className="font-bold text-gray-900 mb-2">Highest Risk Location</h4>
            <p className="text-2xl font-bold text-red-600 mb-1">{locationSummary[0]?.location}</p>
            <p className="text-sm text-gray-600">Risk Score: {locationSummary[0]?.avgRisk}</p>
          </div>
          
          <div className="bg-white rounded-xl p-6">
            <h4 className="font-bold text-gray-900 mb-2">Total Data Points</h4>
            <p className="text-2xl font-bold text-blue-600 mb-1">{waterQualityData.length}</p>
            <p className="text-sm text-gray-600">Across all locations</p>
          </div>
          
          <div className="bg-white rounded-xl p-6">
            <h4 className="font-bold text-gray-900 mb-2">Average Risk Score</h4>
            <p className="text-2xl font-bold text-yellow-600 mb-1">
              {Math.round(waterQualityData.reduce((acc, d) => acc + d.riskScore, 0) / waterQualityData.length)}
            </p>
            <p className="text-sm text-gray-600">Overall system health</p>
          </div>
        </div>
      </div>
    </div>
  );
};