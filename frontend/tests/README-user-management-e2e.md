# User Management E2E (Playwright)

This suite automates key user-management journeys for viva/demo.

## Covered flows

- Login validation, invalid credentials, admin login
- Protected route redirect (`/admin/dashboard` -> `/login` if unauthenticated)
- Admin access to Logs & Monitoring page
- Customer registration -> Admin approval workflow
- Guest support chat -> message appears in Admin Chat -> admin reply visible to guest

## Prerequisites

1. Backend running at `http://localhost:3000`
2. Frontend running at `http://localhost:5173`
3. Playwright browsers installed:
   - `npx playwright install`

## Required environment variables

Set these before running tests:

- `E2E_ADMIN_EMAIL`
- `E2E_ADMIN_PASSWORD`

Example (PowerShell):

```powershell
$env:E2E_ADMIN_EMAIL="admin@example.com"
$env:E2E_ADMIN_PASSWORD="Admin@123"
```

Optional:

- `PLAYWRIGHT_BASE_URL` (defaults to `http://localhost:5173`)

## Run

```bash
npm run test:e2e
```

Single file:

```bash
npx playwright test tests/user-management/support-chat.spec.js
```

UI mode:

```bash
npm run test:e2e:ui
```

Report:

```bash
npm run test:e2e:report
```
