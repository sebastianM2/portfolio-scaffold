# Deploying your portfolio

You have a GitHub account already, so this is three stages: push the code, deploy it on Vercel, then point a domain at it.

## 1. Push the project to GitHub

From inside the unzipped project folder:

```bash
git init
git add .
git commit -m "Initial portfolio site"
```

Then on github.com, create a new empty repository (no README, no .gitignore — you already have one), and follow the "push an existing repository" instructions it shows you, which will look like:

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

## 2. Deploy on Vercel

1. Go to https://vercel.com and sign up/log in **using your GitHub account** — this lets Vercel see your repos without extra setup.
2. Click "Add New" → "Project".
3. Select the repository you just pushed.
4. Vercel auto-detects Next.js — leave all settings as default.
5. Click "Deploy".

That's it. In about a minute you'll get a live URL like `your-project.vercel.app`. Every future `git push` to `main` will auto-redeploy the live site — this is the main day-to-day workflow once you're adding new case studies.

## 3. Buy and connect a domain

You don't have a domain yet, so:

1. Buy one through any registrar — Vercel can also sell you one directly from inside the project dashboard ("Domains" tab → search and purchase), which is the simplest path since it auto-configures. Alternatively use Namecheap, Google Domains successor (Squarespace Domains), Porkbun, etc. — all are fine, some are cheaper than buying via Vercel.
2. In your Vercel project → **Settings → Domains**, add the domain you bought.
3. If you bought it somewhere other than Vercel, Vercel will show you DNS records (usually an A record and/or CNAME) to add at your registrar. This can take a few minutes to a few hours to propagate.

## 4. Update the site's real URL

Once you have your final domain, open `src/content/site.ts` and update:

```ts
export const siteMeta = {
  ...
  url: "https://your-actual-domain.com", // <-- update this
};
```

This feeds the sitemap, Open Graph tags, and canonical URLs — important for SEO once the site is actually reachable. Commit and push the change; Vercel redeploys automatically.

## Notes specific to this project

- The case-study PDF download route (`/api/case-study-pdf/[slug]`) is a serverless function — Vercel supports this natively, no extra configuration needed.
- Fonts (Urbanist, Zilla Slab) are fetched from Google Fonts at build time via `next/font` — Vercel's build servers have normal internet access, so this will work automatically (this only failed in my sandboxed dev environment, not in production).
- Nothing in this project needs environment variables or a database, so there's no extra config to set in the Vercel dashboard beyond the domain.
