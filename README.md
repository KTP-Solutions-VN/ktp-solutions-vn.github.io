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
2. Custom domain: `www.ktpsolutions.vn` (already set via `public/CNAME`)

### DNS records (Cloudflare)

Cloudflare flattens CNAME at the apex, so no A records are needed.

| Type  | Name | Target                        | Proxy status |
| ----- | ---- | ----------------------------- | ------------ |
| CNAME | `@`  | `ktp-solutions-vn.github.io`  | DNS only     |
| CNAME | `www`| `ktp-solutions-vn.github.io`  | DNS only     |

Notes:

- **Proxy = DNS only (grey cloud)** until GitHub issues the TLS cert;
  turning the orange proxy on too early blocks cert issuance.
- **SSL/TLS mode = Full** (not Flexible) to avoid a redirect loop.

Then enable **Enforce HTTPS** in Settings → Pages.
