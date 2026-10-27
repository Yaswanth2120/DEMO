# Deploy on Netlify

The repository includes the complete Netlify configuration. The frontend and Express backend deploy together as one Netlify site. Login uses the existing review credentials; no API key, database URL, session secret, or separate backend server is required.

## Deploy from GitHub

1. In Netlify, choose **Add new project → Import an existing project → GitHub**.
2. Select **Yaswanth2120/DEMO**, branch **main**.
3. Use the repository root: leave **Base directory** and **Package directory** empty. If Netlify suggests a Vite preset, use the values below instead.
4. Verify these settings, which are also defined in the root `netlify.toml`:

| Setting | Value |
| --- | --- |
| Build command | `npm run build:netlify` |
| Publish directory | `netlify/publish` |
| Functions directory | `netlify/functions` |
| Node version | `22` |

5. Deploy. Open the generated Netlify URL: it should show the login screen.

Do not change the publish directory to `frontend/dist/client`. Those files are intentionally included inside the function rather than served publicly, so anonymous visitors cannot bypass the login gate. Do not add a `/* /index.html 200` SPA redirect. The included rewrite routes all requests through Express.

No environment variables are required for the demo. Netlify provides the Blobs connection automatically. An optional `SITE_URL=https://your-custom-domain.example` sets canonical URLs after connecting a custom domain; otherwise the Netlify deploy URL is used. Existing optional `WHATSAPP_NUMBER` and `PUBLISH_VERIFIED_CLAIMS` settings still work. Set optional runtime values with the **Functions** scope, then redeploy. Do not set `NODE_ENV=production` for dependency installation: the frontend build needs dev dependencies.

## Local commands

```sh
npm ci
npm run check:netlify
npm run preview:netlify
```

`check:netlify` performs a full offline Netlify build and packages the function. `preview:netlify` opens the local Netlify environment on **http://localhost:8888**, with sandbox Blobs storage. Stop it with Ctrl+C. The `--filter` in these scripts selects the npm workspace without an interactive prompt, while the root configuration builds the entire app.

The original `npm run dev` remains available at **http://localhost:5173** and uses in-memory sessions. Hosted sessions use persistent Netlify Blobs with strong consistency, expire after eight hours, and are deleted on sign-out. Existing sessions survive cold starts and redeploys. The password is verified only on the server; it is not embedded in frontend JavaScript.

## Check after deployment

- An anonymous `/` or `/boardmembers` request opens login.
- Sign in with the existing review credentials, reload, and open the board page.
- Search for **Sign out** and select it; the site returns to login.
- In a private window, `/assets/engineering.png` returns `401`.
- The single site at `/` defaults to light and supports dark; previous version URLs redirect home.

If login returns `500`, inspect **Functions → site → Logs**, and confirm Netlify Blobs is available for the project. Authentication deliberately fails closed if its storage is unavailable. If a previous static deployment is cached, redeploy from `main` using this root configuration.

All site assets pass through a function to enforce the access gate; requests therefore consume Netlify Functions and Blobs usage. Failed login limits are persisted across instances, with a best-effort counter for simultaneous requests. Expired entries are rejected and removed when read; sign-out deletes sessions immediately. No live deployment is performed by the build or preview commands.
