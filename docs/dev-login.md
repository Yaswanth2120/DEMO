# Dev branch access gate

## Branch separation

`main` ends at the version-only checkpoint: `/v1` is light-only and `/v2` offers Light, Dark, and Device. The former dark-only edition is removed. Old `/v3` URLs redirect to `/v2`.

The `dev` branch adds login and sign-out. These changes are not merged into `main`.

## Run

From the repository root:

```sh
git switch dev
npm install
npm run dev
```

Open http://localhost:5173. Use the exact credentials supplied by the project owner. No account registration, reset flow, or alternative account is enabled. The backend must run alongside Vite; the root dev command starts both.

For the production server:

```sh
npm run build
npm start
```

Open http://localhost:3001. Rebuild after switching branches so generated output matches the checked-out source.

## Behavior

- Visitors are redirected to `/login` until a backend session exists. Successful login returns to the requested edition or board page.
- Password checking happens in Node using scrypt and timing-safe comparisons. The fixed review password is represented by a salted hash in server code; it is absent from frontend bundles and login HTML.
- Random sessions use HttpOnly, SameSite=Lax cookies and expire after eight hours. Cookies use Secure on HTTPS or when NODE_ENV=production. HTTPS is required when running in production mode.
- Sign out invalidates the server session. Sessions are held in memory, so restarting the server signs visitors out; use a single backend process for this review gate.
- Page, API, and application-bundle access is checked on the production server and Vite preview. Only login assets, original logo/favicon, and login fonts are public.
- Failed login attempts are limited to ten per IP in a fifteen-minute window. Cross-origin form submissions and external return URLs are rejected. Protected responses are marked private/no-store and noindex.
- All existing theme, mobile layout, inline exploration, and board navigation features remain available after login.

## Validation

Build and fifteen tests pass. Authentication tests use an injected test account so the real review password is not committed in test fixtures. The actual project-owner credentials were verified through both Vite and the production server in a browser. Checks covered wrong credentials, cookie flags, sign-out, expiry, tampering, throttling, origin/redirect restrictions, protected bundles/API/source, and oversized input. Login has no horizontal overflow at 320, 390, 768 and 1440px. Original logo checksum is unchanged.

Screenshots: login-desktop.png and login-mobile.png.
