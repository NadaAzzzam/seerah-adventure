# Deploy shared cloud sync (one-time setup)

This makes **one shared dataset** for everyone who opens the site — laptop, mobile, and all visitors see the same students and progress.

## How it works

- Frontend: [GitHub Pages](https://nadaazzzam.github.io/seerah-adventure/)
- Backend API: [Vercel serverless function](api/data.js) saves to `data/shared.json` in this repo via GitHub API
- Auto refresh every 8 seconds on each device

## One-time setup (about 5 minutes)

### 1. Push this repo (already on GitHub)

### 2. Deploy API on Vercel

1. Go to [https://vercel.com/new](https://vercel.com/new)
2. Import GitHub repo **`NadaAzzzam/seerah-adventure`**
3. Click **Deploy** (default settings are fine)

### 3. Add GitHub token to Vercel

1. GitHub → **Settings** → **Developer settings** → **Personal access tokens** → **Tokens (classic)**
2. Create token with scope: **`repo`**
3. Vercel → your project → **Settings** → **Environment Variables**
4. Add:

| Name | Value |
|------|--------|
| `GITHUB_TOKEN` | your GitHub token |
| `GITHUB_OWNER` | `NadaAzzzam` |
| `GITHUB_REPO` | `seerah-adventure` |

5. **Redeploy** the project (Deployments → ⋯ → Redeploy)

### 4. Update `config.js`

Set the Vercel URL from step 2:

```javascript
window.SEERAH_CONFIG = {
  apiUrl: 'https://YOUR-PROJECT.vercel.app/api/data'
};
```

Commit and push. GitHub Pages will update in ~1 minute.

## Test

1. Open the site on laptop → **📋 الإدارة** → add a student
2. Open the same site on mobile → student should appear within ~8 seconds
3. Status should show: **☁️ متصل — البيانات مشتركة**

## Alternative: Supabase

See `BACKEND.md` if you prefer Supabase instead of Vercel.
