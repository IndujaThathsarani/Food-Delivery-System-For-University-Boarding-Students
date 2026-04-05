// frontend/src/App.jsx
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AdminLayout from './features/user-management/pages/AdminLayout';
import AdminDashboardPage from './features/user-management/pages/admin/AdminDashboardPage';
import CustomerRegistrationPage from './features/user-management/pages/admin/CustomerRegistrationPage';
import StaffRegistrationPage from './features/user-management/pages/admin/StaffRegistrationPage';
import RoleManagementPage from './features/user-management/pages/admin/RoleManagementPage';
import CustomerManagementPage from './features/user-management/pages/admin/CustomerManagementPage';
import AdminProfilePage from './features/user-management/pages/admin/AdminProfilePage';
import LoginPage from './features/user-management/pages/LoginPage';
import RegisterPage from './features/user-management/pages/RegisterPage';
import ForgotPasswordPage from './features/user-management/pages/ForgotPasswordPage';
import DeliveryDriverPage from './features/user-management/pages/staff/DeliveryDriverPage';
import FoodMenu from './features/food-menu-management/FoodMenu';
import AdminOrders from './features/order-managemnt/pages/AdminOrders';
import AdminGroupOrders from './features/order-managemnt/pages/AdminGroupOrders';
import ProtectedRoute from './components/ProtectedRoute';
import GuestRoute from './components/GuestRoute';
import { syncAxiosAuth } from './lib/auth';

function App() {
  useEffect(() => {
    syncAxiosAuth();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={
            <GuestRoute>
              <LoginPage />
            </GuestRoute>
          }
        />
        <Route
          path="/register"
          element={
            <GuestRoute>
              <RegisterPage />
            </GuestRoute>
          }
        />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Outlet />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="profile" element={<AdminProfilePage />} />
          <Route element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboardPage />} />
            <Route path="customer-registration" element={<CustomerRegistrationPage />} />
            <Route path="staff-registration" element={<StaffRegistrationPage />} />
            <Route path="role-management" element={<RoleManagementPage />} />
            <Route path="customer-management" element={<CustomerManagementPage />} />
            <Route path="menu" element={<FoodMenu isAdmin />} />
            <Route path="menu/category/:categorySlug" element={<FoodMenu isAdmin />} />
            <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
          </Route>
        </Route>
        <Route
          path="/food-menu"
          element={
            <ProtectedRoute allowedRoles={['admin', 'staff']} allowedStaffRoles={['Food Menu Manager']}>
              <FoodMenu isAdmin adminBasePath="/food-menu" />
            </ProtectedRoute>
          }
        />
        <Route
          path="/food-menu/category/:categorySlug"
          element={
            <ProtectedRoute allowedRoles={['admin', 'staff']} allowedStaffRoles={['Food Menu Manager']}>
              <FoodMenu isAdmin adminBasePath="/food-menu" />
            </ProtectedRoute>
          }
        />
        <Route
          path="/staff/orders"
          element={
            <ProtectedRoute allowedRoles={['admin', 'staff']} allowedStaffRoles={['Order Manager']}>
              <AdminOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/staff/orders/group"
          element={
            <ProtectedRoute allowedRoles={['admin', 'staff']} allowedStaffRoles={['Order Manager']}>
              <AdminGroupOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/staff/delivery"
          element={
            <ProtectedRoute allowedRoles={['admin', 'staff']} allowedStaffRoles={['Delivery Driver']}>
              <DeliveryDriverPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
