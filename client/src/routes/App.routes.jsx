import { Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import DashboardPage from '../pages/DashboardPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import ProtectedRoute from './Protected.route';
import GuestRoute from './guest.route';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={
        <GuestRoute>
          <LoginPage />
        </GuestRoute>
      } />
      <Route path="/register" element={
        <GuestRoute>
          <RegisterPage />
        </GuestRoute>
      } />
      <Route element={
        <ProtectedRoute>
          <AppLayout />
        </ProtectedRoute>
      }>
        <Route index element={<DashboardPage />} />
        <Route path="dashboard" element={<DashboardPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
