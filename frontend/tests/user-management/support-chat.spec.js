import { test, expect } from '@playwright/test';
import { getEnv, login, requireEnvVars } from './helpers/auth';

test.describe.serial('User Management - Support Chat', () => {
  test('guest message appears in admin chat inbox', async ({ browser }) => {
    requireEnvVars(test, ['E2E_ADMIN_EMAIL', 'E2E_ADMIN_PASSWORD']);

    const suffix = `${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const guestMessage = `E2E guest support message ${suffix}`;
    const adminReply = `E2E admin reply ${suffix}`;

    const guestContext = await browser.newContext();
    const guestPage = await guestContext.newPage();
    await guestPage.goto('/');
    await guestPage.getByRole('button', { name: /open support chat/i }).click();
    await guestPage.getByLabel('Message input').fill(guestMessage);
    await guestPage.getByRole('button', { name: /send message/i }).click();
    await expect(guestPage.getByText(guestMessage)).toBeVisible({ timeout: 15000 });

    const adminContext = await browser.newContext();
    const adminPage = await adminContext.newPage();
    await login(adminPage, {
      email: getEnv('E2E_ADMIN_EMAIL'),
      password: getEnv('E2E_ADMIN_PASSWORD'),
    });
    await adminPage.goto('/admin/chat');
    await expect(adminPage.getByRole('heading', { name: /support chat/i })).toBeVisible();
    await expect(adminPage.getByText(guestMessage).first()).toBeVisible({ timeout: 30000 });

    await adminPage.getByPlaceholder(/reply to this chat/i).fill(adminReply);
    await adminPage.getByRole('button', { name: /^send$/i }).click();
    await expect(adminPage.locator('p.whitespace-pre-wrap', { hasText: adminReply }).first()).toBeVisible({
      timeout: 15000,
    });

    await guestPage.bringToFront();
    await expect(guestPage.locator('p.whitespace-pre-wrap', { hasText: adminReply }).first()).toBeVisible({
      timeout: 30000,
    });

    await guestContext.close();
    await adminContext.close();
  });
});
