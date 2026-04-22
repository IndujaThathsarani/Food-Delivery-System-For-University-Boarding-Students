import { expect } from '@playwright/test';

export function getEnv(name) {
  return String(process.env[name] || '').trim();
}

export function requireEnvVars(test, vars) {
  const missing = vars.filter((v) => !getEnv(v));
  test.skip(
    missing.length > 0,
    `Missing env vars for this test: ${missing.join(', ')}.`
  );
}

export async function login(page, { email, password }) {
  await page.goto('/login');
  await page.locator('#email').fill(email);
  await page.locator('#password').fill(password);
  await page.getByRole('button', { name: /^login$/i }).click();
  try {
    await expect(page).not.toHaveURL(/\/login$/, { timeout: 10000 });
  } catch {
    const errText = await page.locator('p.text-red-600').first().textContent().catch(() => '');
    throw new Error(`Login did not navigate away from /login. UI error: ${String(errText || '').trim() || '(none)'}`);
  }
}
