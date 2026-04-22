# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: user-management\login.spec.js >> User Management - Login >> rejects invalid credentials
- Location: tests\user-management\login.spec.js:12:3

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
        - paragraph [ref=e24]: Invalid email or password.
        - generic [ref=e25]:
          - text: New user?
          - button "Register" [ref=e26]
        - generic [ref=e27]:
          - generic [ref=e28]:
            - text: Email
            - textbox "Email" [ref=e29]:
              - /placeholder: name@example.com
              - text: invalid-user@example.com
          - generic [ref=e30]:
            - text: Password
            - textbox "Password" [ref=e31]:
              - /placeholder: Enter password
              - text: wrong-password
          - button "Login" [ref=e32]
          - link "Forgot your password?" [ref=e34] [cursor=pointer]:
            - /url: /forgot-password
```