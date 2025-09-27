import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import { 
  User, 
  Mail, 
  Phone, 
  Building, 
  Shield, 
  Calendar,
  MapPin,
  Award
} from 'lucide-react';

export const Profile: React.FC = () => {
  const { user } = useAuth();
  const { t } = useTranslation();

  if (!user) return null;

  const getRoleDetails = () => {
    switch (user.role) {
      case 'municipality_worker':
        return {
          label: t('municipality_worker'),
          description: 'Responsible for water quality monitoring and data collection',
          permissions: [
            'Collect water quality data',
            'View risk assessments',
            'Monitor outbreak alerts',
            'Access awareness resources'
          ],
          color: 'blue'
        };
      case 'health_official':
        return {
          label: t('health_official'),
          description: 'Oversees public health initiatives and trend analysis',
          permissions: [
            'Analyze water quality trends',
            'Manage health advisories',
            'Coordinate response efforts',
            'Access all system data'
          ],
          color: 'green'
        };
      case 'community_volunteer':
        return {
          label: t('community_volunteer'),
          description: 'Supports community health monitoring efforts',
          permissions: [
            'Report water quality issues',
            'Access educational resources',
            'Participate in awareness programs',
            'Community engagement'
          ],
          color: 'purple'
        };
      default:
        return {
          label: user.role,
          description: '',
          permissions: [],
          color: 'gray'
        };
    }
  };

  const roleDetails = getRoleDetails();

  const stats = [
    { label: 'Days Active', value: '45', icon: Calendar },
    { label: 'Data Points', value: '23', icon: MapPin },
    { label: 'Alerts Handled', value: '7', icon: Shield },
    { label: 'Community Impact', value: '500+', icon: Award },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className={`bg-gradient-to-r from-${roleDetails.color}-600 to-${roleDetails.color === 'blue' ? 'indigo' : roleDetails.color === 'green' ? 'teal' : 'indigo'}-600 rounded-2xl p-8 text-white`}>
        <div className="flex items-center space-x-6">
          <div className="w-20 h-20 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center">
            <User className="w-10 h-10 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
            <p className={`text-${roleDetails.color}-100 text-lg`}>
              {roleDetails.label}
            </p>
            <p className={`text-${roleDetails.color}-200 text-sm mt-1`}>
              {roleDetails.description}
            </p>
          </div>
        </div>
      </div>

      {/* Profile Information */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Personal Information</h2>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <User className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-600">Full Name</div>
                  <div className="font-semibold text-gray-900">{user.name}</div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <Mail className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-600">Email Address</div>
                  <div className="font-semibold text-gray-900">{user.email}</div>
                </div>
              </div>

              {user.phone && (
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <Phone className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Phone Number</div>
                    <div className="font-semibold text-gray-900">{user.phone}</div>
                  </div>
                </div>
              )}

              {user.organization && (
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                    <Building className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Organization</div>
                    <div className="font-semibold text-gray-900">{user.organization}</div>
                  </div>
                </div>
              )}

              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 bg-${roleDetails.color}-100 rounded-xl flex items-center justify-center`}>
                  <Shield className={`w-6 h-6 text-${roleDetails.color}-600`} />
                </div>
                <div>
                  <div className="text-sm text-gray-600">Role</div>
                  <div className="font-semibold text-gray-900">{roleDetails.label}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Statistics */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Activity Stats</h3>
            <div className="space-y-4">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Icon className="w-5 h-5 text-gray-600" />
                      <span className="text-sm text-gray-700">{stat.label}</span>
                    </div>
                    <span className="font-bold text-gray-900">{stat.value}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Permissions */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Permissions</h3>
            <div className="space-y-3">
              {roleDetails.permissions.map((permission, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className={`w-2 h-2 bg-${roleDetails.color}-400 rounded-full`} />
                  <span className="text-sm text-gray-700">{permission}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-xl">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <MapPin className="w-4 h-4 text-blue-600" />
            </div>
            <div className="flex-1">
              <div className="font-medium text-gray-900">Data collection at Guwahati Central</div>
              <div className="text-sm text-gray-600">2 hours ago</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-xl">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <Shield className="w-4 h-4 text-green-600" />
            </div>
            <div className="flex-1">
              <div className="font-medium text-gray-900">Reviewed outbreak alert for Dibrugarh East</div>
              <div className="text-sm text-gray-600">1 day ago</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 p-4 bg-purple-50 rounded-xl">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <Award className="w-4 h-4 text-purple-600" />
            </div>
            <div className="flex-1">
              <div className="font-medium text-gray-900">Completed water safety awareness training</div>
              <div className="text-sm text-gray-600">3 days ago</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};