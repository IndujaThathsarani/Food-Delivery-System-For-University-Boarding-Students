import { test, expect } from '@playwright/test';
import { getEnv, login, requireEnvVars } from './helpers/auth';

test.describe('User Management - Protected Routes', () => {
  test('redirects unauthenticated user to login for admin page', async ({ page }) => {
    await page.goto('/admin/dashboard');
    await expect(page).toHaveURL(/\/login/);
  });

  test('admin can access logs & monitoring after login', async ({ page }) => {
    requireEnvVars(test, ['E2E_ADMIN_EMAIL', 'E2E_ADMIN_PASSWORD']);
    await login(page, {
      email: getEnv('E2E_ADMIN_EMAIL'),
      password: getEnv('E2E_ADMIN_PASSWORD'),
    });
    await page.goto('/admin/logs-monitoring');
    await expect(page).toHaveURL(/\/admin\/logs-monitoring/);
    await expect(page.getByRole('heading', { name: /audit logs/i })).toBeVisible();
  });
});
