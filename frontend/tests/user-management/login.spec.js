import { test, expect } from '@playwright/test';
import { getEnv, login, requireEnvVars } from './helpers/auth';

test.describe('User Management - Login', () => {
  test('shows validation for empty login', async ({ page }) => {
    await page.goto('/login');
    await page.getByRole('button', { name: /^login$/i }).click();
    await expect(page.getByText('Email is required.')).toBeVisible();
    await expect(page.getByText('Password is required.')).toBeVisible();
  });

  test('rejects invalid credentials', async ({ page }) => {
    await page.goto('/login');
    await page.locator('#email').fill('invalid-user@example.com');
    await page.locator('#password').fill('wrong-password');
    await page.getByRole('button', { name: /^login$/i }).click();
    await expect(page.getByText(/invalid email or password|login failed/i)).toBeVisible();
  });

  test('logs in admin successfully', async ({ page }) => {
    requireEnvVars(test, ['E2E_ADMIN_EMAIL', 'E2E_ADMIN_PASSWORD']);
    await login(page, {
      email: getEnv('E2E_ADMIN_EMAIL'),
      password: getEnv('E2E_ADMIN_PASSWORD'),
    });
    await expect(page).toHaveURL(/\/admin\/dashboard|\/admin$/);
    await expect(page.getByRole('heading', { name: /^overview$/i })).toBeVisible();
  });
});
