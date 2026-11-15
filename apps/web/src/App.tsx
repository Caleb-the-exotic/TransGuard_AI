import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppLayout } from './components/layout/AppLayout.js';

import { Dashboard } from './pages/Dashboard.js';
import { Monitoring } from './pages/Monitoring.js';
import { HealthAssessment } from './pages/HealthAssessment.js';
import { Alerts } from './pages/Alerts.js';
import { Maintenance } from './pages/Maintenance.js';
import { Assets } from './pages/Assets.js';
import { Reports } from './pages/Reports.js';
import { Devices } from './pages/Devices.js';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 2000,
      retry: 1
    }
  }
});

export const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="monitoring" element={<Monitoring />} />
            <Route path="analytics" element={<HealthAssessment />} />
            <Route path="alerts" element={<Alerts />} />
            <Route path="maintenance" element={<Maintenance />} />
            <Route path="assets" element={<Assets />} />
            <Route path="reports" element={<Reports />} />
            <Route path="devices" element={<Devices />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};
