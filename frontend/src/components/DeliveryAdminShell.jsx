import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import UserMenuBar from '../features/user-management/components/UserMenuBar';
import { clearAuthWithAudit } from '../lib/auth';
import { USER_PROFILE_PATH } from '../lib/postLoginRedirect';

/** UNI EATS user bar + delivery system nav for admin deliveries / notifications. */
export default function DeliveryAdminShell({ children }) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen uni-theme">
      <UserMenuBar
        onLogout={async () => {
          await clearAuthWithAudit();
          navigate('/login');
        }}
        onProfileClick={() => navigate(USER_PROFILE_PATH)}
      />
      <Navbar />
      <main className="mx-auto w-full max-w-[1600px] px-4 py-6 md:px-8">
        <div className="uni-panel rounded-3xl p-4 md:p-6">{children}</div>
      </main>
    </div>
  );
}
