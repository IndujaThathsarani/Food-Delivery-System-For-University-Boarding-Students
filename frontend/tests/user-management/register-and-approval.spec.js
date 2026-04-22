import path from 'path';
import { fileURLToPath } from 'url';
import { test, expect } from '@playwright/test';
import { getEnv, login, requireEnvVars } from './helpers/auth';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const sampleImage = path.resolve(__dirname, '../../src/assets/riceandcurry1.png');

test.describe.serial('User Management - Register and Admin Approval', () => {
  const unique = `${Date.now()}${Math.floor(Math.random() * 1000)}`;
  const fullName = `E2E Student ${unique}`;
  const studentId = `IT${String(unique).slice(-8)}`;
  const email = `e2e.student.${unique}@example.com`;
  const phone = '0712345678';
  const password = 'Passw0rd!';

  test('customer registration is submitted for review', async ({ page }) => {
    await page.goto('/register');
    await page.locator('#fullName').fill(fullName);
    await page.locator('#studentId').fill(studentId);
    await page.locator('#studentIdPhoto').setInputFiles(sampleImage);
    await page.locator('#phoneNumber').fill(phone);
    await page.locator('#registerEmail').fill(email);
    await page.locator('#registerPassword').fill(password);
    await page.getByRole('button', { name: /create account/i }).click();
    await expect(page.getByText('Your account has been submitted for review.')).toBeVisible({ timeout: 15000 });
  });

  test('admin can see and approve pending registration', async ({ page }) => {
    requireEnvVars(test, ['E2E_ADMIN_EMAIL', 'E2E_ADMIN_PASSWORD']);
    await login(page, {
      email: getEnv('E2E_ADMIN_EMAIL'),
      password: getEnv('E2E_ADMIN_PASSWORD'),
    });

    await page.goto('/admin/user-registration');
    await expect(page.getByRole('heading', { name: /user registration/i })).toBeVisible();

    const row = page.locator('tr', { hasText: email }).first();
    await expect(row).toBeVisible({ timeout: 30000 });
    await row.getByRole('button', { name: /approve/i }).click();

    await expect(page.getByRole('heading', { name: /^success$/i })).toBeVisible();
    await expect(page.getByText(/approved successfully/i)).toBeVisible();
    await expect(page.locator('tr', { hasText: email })).toHaveCount(0, { timeout: 30000 });
  });
});
