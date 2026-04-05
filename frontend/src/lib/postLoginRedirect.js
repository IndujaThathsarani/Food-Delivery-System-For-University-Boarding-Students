/**
 * Default landing path after login (and when a logged-in user hits /login or /register).
 * Keep in sync with backend `constants/staffRoles.js` and staff routes in App.jsx.
 */
export function getPostLoginPath(user) {
  if (!user) return '/';

  if (user.accountType === 'admin') {
    return '/admin/dashboard';
  }

  if (user.accountType === 'customer') {
    return '/';
  }

  if (user.accountType === 'staff') {
    const role = String(user.staffRole || '').trim();
    if (role === 'Food Menu Manager') return '/food-menu';
    if (role === 'Order Manager') return '/staff/orders';
    if (role === 'Delivery Driver') return '/staff/delivery';
    if (role === 'Delivery Manager') return '/';
  }

  return '/';
}
