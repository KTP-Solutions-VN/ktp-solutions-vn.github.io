# KTP Solutions — Website

Public landing page for **KTP Solutions** (ktpsolutions.vn).
Built with [Astro](https://astro.build) + [Tailwind CSS v4](https://tailwindcss.com), bilingual (VI/EN), deployed to GitHub Pages.

## Stack

- **Astro 5** — static site generation
- **Tailwind CSS v4** — styling (`@tailwindcss/vite`)
- **i18n** — Astro built-in routing. VI at `/`, EN at `/en/`
- **Deploy** — GitHub Actions → GitHub Pages

## Local development

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # output to ./dist
npm run preview  # preview the production build
```

## Editing content

All text lives in [`src/i18n/ui.ts`](src/i18n/ui.ts) — edit `vi` and `en`
dictionaries. Sections are components under [`src/components/`](src/components/).

## Deployment

Push to `main` → GitHub Actions builds and deploys automatically.

**One-time setup on GitHub:**

1. Repo → **Settings → Pages → Build and deployment → Source = GitHub Actions**
2. Custom domain: `ktpsolutions.vn` (already set via `public/CNAME`)

### DNS records for `ktpsolutions.vn`

At your domain registrar, point the apex domain to GitHub Pages:

| Type  | Host  | Value                    |
| ----- | ----- | ------------------------ |
| A     | @     | 185.199.108.153          |
| A     | @     | 185.199.109.153          |
| A     | @     | 185.199.110.153          |
| A     | @     | 185.199.111.153          |
| CNAME | www   | ktp-solutions-vn.github.io. |

Then enable **Enforce HTTPS** in Settings → Pages.
