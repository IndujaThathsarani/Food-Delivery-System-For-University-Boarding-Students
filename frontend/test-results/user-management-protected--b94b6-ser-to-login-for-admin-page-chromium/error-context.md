# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: user-management\protected-routes.spec.js >> User Management - Protected Routes >> redirects unauthenticated user to login for admin page
- Location: tests\user-management\protected-routes.spec.js:5:3

# Error details

```
Tearing down "context" exceeded the test timeout of 30000ms.
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - banner [ref=e4]:
    - generic [ref=e5]:
      - link "UNI EATS" [ref=e6] [cursor=pointer]:
        - /url: /
        - img [ref=e8]
        - generic [ref=e10]: UNI EATS
      - link "← Back to home" [ref=e11] [cursor=pointer]:
        - /url: /
  - generic [ref=e12]:
    - generic:
      - img
    - generic:
      - img
    - generic [ref=e13]:
      - generic [ref=e14]:
        - paragraph [ref=e15]: Welcome back
        - heading "Sign in to order" [level=1] [ref=e16]
        - paragraph [ref=e17]: Access your dashboard, track orders, and manage your profile with the same calm, organic feel as our home page.
      - generic [ref=e22]:
        - heading "Login" [level=2] [ref=e23]
        - generic [ref=e24]:
          - text: New user?
          - button "Register" [ref=e25]
        - generic [ref=e26]:
          - generic [ref=e27]:
            - text: Email
            - textbox "Email" [ref=e28]:
              - /placeholder: name@example.com
          - generic [ref=e29]:
            - text: Password
            - textbox "Password" [ref=e30]:
              - /placeholder: Enter password
          - button "Login" [ref=e31]
          - link "Forgot your password?" [ref=e33] [cursor=pointer]:
            - /url: /forgot-password
```