# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: user-management\register-and-approval.spec.js >> User Management - Register and Admin Approval >> admin can see and approve pending registration
- Location: tests\user-management\register-and-approval.spec.js:30:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('heading', { name: /^success$/i })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByRole('heading', { name: /^success$/i })

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e3]:
    - banner [ref=e4]:
      - generic [ref=e5]:
        - generic [ref=e7]:
          - generic "Administrator" [ref=e8]
          - generic "Online" [ref=e9]: Online
        - paragraph [ref=e12]: UNI EATS - FOOD ORDERING AND DELIVERY SYSTEM FOR UNIVERSITY BORDING STUDENTS
        - generic [ref=e13]:
          - button "Open user profile" [ref=e14]:
            - img [ref=e15]
            - generic "Admin" [ref=e19]: Hello, Admin
          - button "Logout" [ref=e20]:
            - img [ref=e21]
            - text: Logout
    - generic [ref=e24]:
      - complementary [ref=e26]:
        - navigation "Admin sidebar" [ref=e27]:
          - button "Dashboard" [ref=e28]:
            - img [ref=e29]
            - generic [ref=e34]: Dashboard
          - button "User Registration" [ref=e35]:
            - img [ref=e36]
            - generic [ref=e39]: User Registration
          - button "Customer Management" [ref=e40]:
            - img [ref=e41]
            - generic [ref=e46]: Customer Management
          - button "Staff Management" [ref=e47]:
            - img [ref=e48]
            - generic [ref=e52]: Staff Management
          - button "User Roles & Permissions" [ref=e53]:
            - img [ref=e54]
            - generic [ref=e56]: User Roles & Permissions
          - button "Logs & Monitoring" [ref=e57]:
            - img [ref=e58]
            - generic [ref=e61]: Logs & Monitoring
          - button "Chat" [ref=e62]:
            - img [ref=e63]
            - generic [ref=e65]: Chat
      - generic [ref=e67]:
        - heading "User Registration" [level=1] [ref=e71]
        - generic [ref=e72]:
          - generic [ref=e73]:
            - heading "Staff requests" [level=2] [ref=e74]
            - table [ref=e77]:
              - rowgroup [ref=e78]:
                - row "Name Email Phone Requested role Actions" [ref=e79]:
                  - columnheader "Name" [ref=e80]
                  - columnheader "Email" [ref=e81]
                  - columnheader "Phone" [ref=e82]
                  - columnheader "Requested role" [ref=e83]
                  - columnheader "Actions" [ref=e84]
              - rowgroup [ref=e85]:
                - row "Yasiru Arthanayaka it23818316@my.sliit.lk 0754869234 Order Manager Approve Decline" [ref=e86]:
                  - cell "Yasiru Arthanayaka" [ref=e87]
                  - cell "it23818316@my.sliit.lk" [ref=e88]
                  - cell "0754869234" [ref=e89]
                  - cell "Order Manager" [ref=e90]:
                    - generic [ref=e91]: Order Manager
                  - cell "Approve Decline" [ref=e92]:
                    - generic [ref=e93]:
                      - button "Approve" [ref=e94]
                      - button "Decline" [ref=e95]
          - generic [ref=e96]:
            - heading "Customer (student) requests" [level=2] [ref=e97]
            - table [ref=e100]:
              - rowgroup [ref=e101]:
                - row "Name Email Student ID Phone ID Photo Actions" [ref=e102]:
                  - columnheader "Name" [ref=e103]
                  - columnheader "Email" [ref=e104]
                  - columnheader "Student ID" [ref=e105]
                  - columnheader "Phone" [ref=e106]
                  - columnheader "ID Photo" [ref=e107]
                  - columnheader "Actions" [ref=e108]
              - rowgroup [ref=e109]:
                - 'row "E2E Student 1776787195324605 e2e.student.1776787195324605@example.com IT95324605 0712345678 View larger: E2E Student 1776787195324605 student ID Approve Decline" [ref=e110]':
                  - cell "E2E Student 1776787195324605" [ref=e111]
                  - cell "e2e.student.1776787195324605@example.com" [ref=e112]
                  - cell "IT95324605" [ref=e113]
                  - cell "0712345678" [ref=e114]
                  - 'cell "View larger: E2E Student 1776787195324605 student ID" [ref=e115]':
                    - 'button "View larger: E2E Student 1776787195324605 student ID" [ref=e117]'
                  - cell "Approve Decline" [ref=e118]:
                    - generic [ref=e119]:
                      - button "Approve" [ref=e120]
                      - button "Decline" [ref=e121]
                - 'row "E2E Student 1776785376492984 e2e.student.1776785376492984@example.com IT76492984 0712345678 View larger: E2E Student 1776785376492984 student ID Approve Decline" [ref=e122]':
                  - cell "E2E Student 1776785376492984" [ref=e123]
                  - cell "e2e.student.1776785376492984@example.com" [ref=e124]
                  - cell "IT76492984" [ref=e125]
                  - cell "0712345678" [ref=e126]
                  - 'cell "View larger: E2E Student 1776785376492984 student ID" [ref=e127]':
                    - 'button "View larger: E2E Student 1776785376492984 student ID" [ref=e129]'
                  - cell "Approve Decline" [ref=e130]:
                    - generic [ref=e131]:
                      - button "Approve" [ref=e132]
                      - button "Decline" [ref=e133]
                - 'row "E2E Student 1776785054165242 e2e.student.1776785054165242@example.com IT54165242 0712345678 View larger: E2E Student 1776785054165242 student ID Approve Decline" [ref=e134]':
                  - cell "E2E Student 1776785054165242" [ref=e135]
                  - cell "e2e.student.1776785054165242@example.com" [ref=e136]
                  - cell "IT54165242" [ref=e137]
                  - cell "0712345678" [ref=e138]
                  - 'cell "View larger: E2E Student 1776785054165242 student ID" [ref=e139]':
                    - 'button "View larger: E2E Student 1776785054165242 student ID" [ref=e141]'
                  - cell "Approve Decline" [ref=e142]:
                    - generic [ref=e143]:
                      - button "Approve" [ref=e144]
                      - button "Decline" [ref=e145]
                - 'row "Shalini Nathasha shalini@gmail.com IT23456723 0778564912 View larger: Shalini Nathasha student ID Approve Decline" [ref=e146]':
                  - cell "Shalini Nathasha" [ref=e147]
                  - cell "shalini@gmail.com" [ref=e148]
                  - cell "IT23456723" [ref=e149]
                  - cell "0778564912" [ref=e150]
                  - 'cell "View larger: Shalini Nathasha student ID" [ref=e151]':
                    - 'button "View larger: Shalini Nathasha student ID" [ref=e153]'
                  - cell "Approve Decline" [ref=e154]:
                    - generic [ref=e155]:
                      - button "Approve" [ref=e156]
                      - button "Decline" [ref=e157]
  - dialog "Success" [ref=e158]:
    - generic [ref=e159]:
      - img [ref=e161]
      - heading "Success" [level=2] [ref=e164]
      - paragraph [ref=e165]: Customer "E2E Student 1776787586735826" was approved successfully.
      - button "OK" [ref=e166]
```

# Test source

```ts
  1  | import path from 'path';
  2  | import { fileURLToPath } from 'url';
  3  | import { test, expect } from '@playwright/test';
  4  | import { getEnv, login, requireEnvVars } from './helpers/auth';
  5  | 
  6  | const __filename = fileURLToPath(import.meta.url);
  7  | const __dirname = path.dirname(__filename);
  8  | const sampleImage = path.resolve(__dirname, '../../src/assets/riceandcurry1.png');
  9  | 
  10 | test.describe.serial('User Management - Register and Admin Approval', () => {
  11 |   const unique = `${Date.now()}${Math.floor(Math.random() * 1000)}`;
  12 |   const fullName = `E2E Student ${unique}`;
  13 |   const studentId = `IT${String(unique).slice(-8)}`;
  14 |   const email = `e2e.student.${unique}@example.com`;
  15 |   const phone = '0712345678';
  16 |   const password = 'Passw0rd!';
  17 | 
  18 |   test('customer registration is submitted for review', async ({ page }) => {
  19 |     await page.goto('/register');
  20 |     await page.locator('#fullName').fill(fullName);
  21 |     await page.locator('#studentId').fill(studentId);
  22 |     await page.locator('#studentIdPhoto').setInputFiles(sampleImage);
  23 |     await page.locator('#phoneNumber').fill(phone);
  24 |     await page.locator('#registerEmail').fill(email);
  25 |     await page.locator('#registerPassword').fill(password);
  26 |     await page.getByRole('button', { name: /create account/i }).click();
  27 |     await expect(page.getByText('Your account has been submitted for review.')).toBeVisible({ timeout: 15000 });
  28 |   });
  29 | 
  30 |   test('admin can see and approve pending registration', async ({ page }) => {
  31 |     requireEnvVars(test, ['E2E_ADMIN_EMAIL', 'E2E_ADMIN_PASSWORD']);
  32 |     await login(page, {
  33 |       email: getEnv('E2E_ADMIN_EMAIL'),
  34 |       password: getEnv('E2E_ADMIN_PASSWORD'),
  35 |     });
  36 | 
  37 |     await page.goto('/admin/user-registration');
  38 |     await expect(page.getByRole('heading', { name: /user registration/i })).toBeVisible();
  39 | 
  40 |     const row = page.locator('tr', { hasText: email }).first();
  41 |     await expect(row).toBeVisible({ timeout: 30000 });
  42 |     await row.getByRole('button', { name: /approve/i }).click();
  43 | 
> 44 |     await expect(page.getByRole('heading', { name: /^success$/i })).toBeVisible();
     |                                                                     ^ Error: expect(locator).toBeVisible() failed
  45 |     await expect(page.getByText(/approved successfully/i)).toBeVisible();
  46 |     await expect(page.locator('tr', { hasText: email })).toHaveCount(0, { timeout: 30000 });
  47 |   });
  48 | });
  49 | 
```