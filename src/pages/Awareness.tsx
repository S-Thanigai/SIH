import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  BookOpen, 
  Droplets, 
  Shield, 
  Users, 
  AlertCircle,
  CheckCircle,
  Heart,
  Home
} from 'lucide-react';

export const Awareness: React.FC = () => {
  const { t } = useTranslation();

  const diseases = [
    {
      name: 'Cholera',
      symptoms: ['Severe diarrhea', 'Vomiting', 'Dehydration'],
      prevention: ['Boil water before drinking', 'Maintain hygiene', 'Proper sanitation'],
      severity: 'High'
    },
    {
      name: 'Typhoid',
      symptoms: ['High fever', 'Headache', 'Stomach pain'],
      prevention: ['Safe water consumption', 'Vaccination', 'Food safety'],
      severity: 'High'
    },
    {
      name: 'Hepatitis A',
      symptoms: ['Fatigue', 'Nausea', 'Jaundice'],
      prevention: ['Water purification', 'Personal hygiene', 'Vaccination'],
      severity: 'Moderate'
    },
    {
      name: 'Diarrheal Diseases',
      symptoms: ['Loose stools', 'Cramping', 'Dehydration'],
      prevention: ['Clean water', 'Handwashing', 'Safe food practices'],
      severity: 'Moderate'
    }
  ];

  const preventionTips = [
    {
      category: 'Water Safety',
      icon: Droplets,
      tips: [
        'Boil water for at least 1 minute before drinking',
        'Use water purification tablets when boiling is not possible',
        'Store treated water in clean, covered containers',
        'Avoid ice unless made from safe water'
      ]
    },
    {
      category: 'Personal Hygiene',
      icon: Shield,
      tips: [
        'Wash hands frequently with soap and clean water',
        'Use alcohol-based hand sanitizer when soap is unavailable',
        'Keep fingernails short and clean',
        'Avoid touching face with unwashed hands'
      ]
    },
    {
      category: 'Food Safety',
      icon: Home,
      tips: [
        'Cook food thoroughly and eat while hot',
        'Avoid raw or undercooked foods',
        'Peel fruits and vegetables yourself',
        'Avoid street vendor food and beverages'
      ]
    },
    {
      category: 'Community Health',
      icon: Users,
      tips: [
        'Report contaminated water sources to authorities',
        'Participate in community health programs',
        'Educate family and neighbors about water safety',
        'Support local water quality monitoring efforts'
      ]
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High': return 'border-red-200 bg-red-50';
      case 'Moderate': return 'border-yellow-200 bg-yellow-50';
      case 'Low': return 'border-green-200 bg-green-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Moderate': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-white">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-2">{t('awareness')}</h1>
            <p className="text-purple-100">
              Learn about waterborne diseases and prevention strategies
            </p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Droplets className="w-6 h-6 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-2">2.2B</div>
          <div className="text-sm text-gray-600">People lack safely managed drinking water</div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-6 h-6 text-red-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-2">3.4M</div>
          <div className="text-sm text-gray-600">Deaths annually from water-related diseases</div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Heart className="w-6 h-6 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-2">80%</div>
          <div className="text-sm text-gray-600">Of diseases preventable with safe water</div>
        </div>
      </div>

      {/* Waterborne Diseases */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="flex items-center space-x-3 mb-6">
          <AlertCircle className="w-6 h-6 text-red-600" />
          <h2 className="text-xl font-bold text-gray-900">{t('waterborne_diseases')}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {diseases.map((disease, index) => (
            <div
              key={index}
              className={`border-2 rounded-xl p-6 ${getSeverityColor(disease.severity)}`}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">{disease.name}</h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSeverityBadge(disease.severity)}`}>
                  {disease.severity} Risk
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Symptoms:</h4>
                  <ul className="space-y-1">
                    {disease.symptoms.map((symptom, idx) => (
                      <li key={idx} className="text-sm text-gray-700 flex items-center space-x-2">
                        <div className="w-2 h-2 bg-red-400 rounded-full" />
                        <span>{symptom}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Prevention:</h4>
                  <ul className="space-y-1">
                    {disease.prevention.map((tip, idx) => (
                      <li key={idx} className="text-sm text-gray-700 flex items-center space-x-2">
                        <CheckCircle className="w-3 h-3 text-green-500" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Prevention Tips */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="flex items-center space-x-3 mb-6">
          <Shield className="w-6 h-6 text-green-600" />
          <h2 className="text-xl font-bold text-gray-900">{t('prevention_tips')}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {preventionTips.map((category, index) => {
            const Icon = category.icon;
            return (
              <div key={index} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">{category.category}</h3>
                </div>

                <ul className="space-y-3">
                  {category.tips.map((tip, idx) => (
                    <li key={idx} className="text-sm text-gray-700 flex items-start space-x-3">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <h3 className="text-xl font-bold text-red-900 mb-2">Emergency Health Alert</h3>
          <p className="text-red-800 mb-4">
            If you experience severe symptoms of waterborne diseases, seek immediate medical attention.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="bg-white rounded-xl p-4">
              <div className="font-bold text-gray-900">Health Emergency</div>
              <div className="text-2xl font-bold text-red-600">108</div>
            </div>
            <div className="bg-white rounded-xl p-4">
              <div className="font-bold text-gray-900">Water Quality Issues</div>
              <div className="text-2xl font-bold text-blue-600">1916</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};