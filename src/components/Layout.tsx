import React, { ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from './LanguageSwitcher';
import { 
  Home, 
  Database, 
  AlertTriangle, 
  BookOpen, 
  User, 
  LogOut,
  Droplets
} from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout, isAuthenticated } = useAuth();
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getNavItems = () => {
    if (!isAuthenticated || !user) return [];

    const commonItems = [
      { path: '/dashboard', label: t('dashboard'), icon: Home },
      { path: '/profile', label: t('profile'), icon: User },
    ];

    if (user.role === 'municipality_worker') {
      return [
        ...commonItems.slice(0, 1),
        { path: '/data-collection', label: t('data_collection'), icon: Database },
        { path: '/alerts', label: t('alerts'), icon: AlertTriangle },
        { path: '/awareness', label: t('awareness'), icon: BookOpen },
        ...commonItems.slice(1),
      ];
    }

    if (user.role === 'health_official') {
      return [
        ...commonItems.slice(0, 1),
        { path: '/water-trends', label: 'Water Quality Trends', icon: Droplets },
        { path: '/alerts', label: t('alerts'), icon: AlertTriangle },
        { path: '/awareness', label: t('awareness'), icon: BookOpen },
        ...commonItems.slice(1),
      ];
    }

    return commonItems;
  };

  const navItems = getNavItems();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link to="/" className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Droplets className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">
                  {t('smart_health_monitoring')}
                </span>
              </Link>
              <LanguageSwitcher />
            </div>
          </div>
        </header>
        <main>{children}</main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/dashboard" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Droplets className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">
                {t('smart_health_monitoring')}
              </span>
            </Link>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                {t('welcome')}, {user?.name}
              </span>
              <LanguageSwitcher />
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:text-red-600 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm font-medium">{t('logout')}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        <nav className="w-64 bg-white shadow-sm border-r border-gray-200 min-h-[calc(100vh-64px)]">
          <div className="p-4">
            <ul className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>

        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};