import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import LoginScreen from './components/LoginScreen';

export default function AppRoutes({ isLoggedIn, onLogin }: { isLoggedIn: boolean, onLogin: () => void }) {
  // Helper to render Layout with a specific section
  const renderLayout = (section: string) => <Layout initialSection={section} />;
  return (
    <Routes>
      <Route path="/login" element={<LoginScreen onLogin={onLogin} />} />
      <Route path="/dashboard" element={renderLayout('dashboard')} />
      <Route path="/vehicles" element={renderLayout('vehicles')} />
      <Route path="/vehicle-details" element={renderLayout('vehicle-details')} />
      <Route path="/vehicle-edit" element={renderLayout('vehicle-edit')} />
      <Route path="/maintenance" element={renderLayout('maintenance')} />
      <Route path="/damages" element={renderLayout('damages')} />
      <Route path="/tickets" element={renderLayout('tickets')} />
      <Route path="/alerts" element={renderLayout('alerts')} />
      <Route path="/mileage" element={renderLayout('mileage')} />
      <Route path="/revisions" element={renderLayout('revisions')} />
      <Route path="/consumption" element={renderLayout('consumption')} />
      <Route path="/settings" element={renderLayout('settings')} />
      <Route path="/analytics" element={renderLayout('analytics')} />
      <Route path="/departments" element={renderLayout('departments')} />
      <Route path="/profile" element={renderLayout('profile')} />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
