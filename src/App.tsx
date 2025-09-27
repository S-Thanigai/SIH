import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import { Layout } from './components/Layout';
import { LandingPage } from './pages/LandingPage';
import { WaterQualityCheck } from './pages/WaterQualityCheck';
import { SignIn, SignUp } from './pages/Auth';
import { Dashboard } from './pages/Dashboard';
import { DataCollection } from './pages/DataCollection';
import { Alerts } from './pages/Alerts';
import { Awareness } from './pages/Awareness';
import { Profile } from './pages/Profile';
import { WaterTrends } from './pages/WaterTrends';
import './i18n/config';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/" />;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <Layout>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/water-quality-check" element={<WaterQualityCheck />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              
              {/* Protected routes */}
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/data-collection" 
                element={
                  <ProtectedRoute>
                    <DataCollection />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/alerts" 
                element={
                  <ProtectedRoute>
                    <Alerts />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/awareness" 
                element={
                  <ProtectedRoute>
                    <Awareness />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/water-trends" 
                element={
                  <ProtectedRoute>
                    <WaterTrends />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } 
              />
              
              {/* Redirect unknown routes */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Layout>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
};

export default App;