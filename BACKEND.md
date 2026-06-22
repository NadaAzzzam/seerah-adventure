# Backend setup (optional cloud sync)

The app always saves data **locally in the browser** (students, stars, photos, game progress).

To sync the same data across phones, tablets, and computers, connect a free Supabase database (about 5 minutes).

## 1. Create Supabase project

1. Go to [https://supabase.com](https://supabase.com) and sign up (free).
2. Create a new project.
3. Open **SQL Editor** → **New query**.
4. Paste the contents of `supabase/schema.sql` and click **Run**.

## 2. Get API keys

1. In Supabase, open **Project Settings** → **API**.
2. Copy **Project URL**.
3. Copy **anon public** key.

## 3. Configure the app

Edit `config.js` in this repo:

```javascript
window.SEERAH_CONFIG = {
  supabaseUrl: 'https://xxxxx.supabase.co',
  supabaseAnonKey: 'eyJhbGciOi...'
};
```

Commit and push to GitHub. GitHub Pages will redeploy automatically.

## 4. Use a class code

1. Open the app → **📋 الإدارة**.
2. Set **رمز الفصل** (e.g. `faseh-2025`).
3. Use the **same code** on every device to load the same students and progress.

## What gets saved

- Student roster (names, stars, photos)
- Game progress (keys, completed stations)
- Theme preference
- Draw list names

## Notes

- Without Supabase, data stays on each device only (localStorage).
- Photos are stored as base64 inside the JSON; keep class sizes reasonable.
- This setup is meant for classroom/personal use, not high-security data.
