# KTP Solutions — Website

Public website for **KTP Solutions** (www.ktpsolutions.vn).
Plain static HTML/CSS/JS — no build step, no dependencies. Deployed to GitHub Pages.

> The previous Astro landing page was replaced by this version. It is still in
> the git history if you need to look back.

## Structure

```
index.html                 Home page (+ script.js, style.css)
assets/css/global.css      Shared design system / UI kit
assets/js/global.js        Shared behavior: header, mobile nav, reveal, VI/EN toggle
assets/data/*.js           Content data: services, projects, blog posts, testimonials
assets/img/                Logos
screens/<page>/            Other pages, each with its own index.html, script.js, style.css
  ve-chung-toi/            About us
  dich-vu/                 Services overview + 5 service detail pages
                           (tu-van-ung-dung-cong-nghe/ is a hand-built page; the other 4 use detail.js)
  du-an/                   Projects portfolio (+ portfolio-motion.js) + chi-tiet/?slug=... (detail)
                           + playground/?app=... (click-through prototypes from showcase/)
  blog/                    Blog list + chi-tiet/?slug=... (post)
  lien-he/                 Contact & booking form + cam-on/ (thank-you)
en/                        Redirect for the old /en/ URL (sets language to EN)
showcase/                  White-labeled client prototypes shown in the playground (see showcase/README.md)
```

## Editing content

- Static text is in each page's HTML. English text sits next to it in a
  `data-en="..."` attribute; the VI/EN toggle swaps them (choice saved in
  `localStorage`).
- Services, projects, blog posts and testimonials live in `assets/data/*.js`.
- Adding a page? Also add it to `sitemap.xml`.

## Local preview

Any static server works, e.g.:

```bash
python3 -m http.server 8000   # http://localhost:8000
```

## Deployment

Push to `main` → GitHub Actions uploads the repo as-is and deploys to Pages.

**One-time setup on GitHub:**

1. Repo → **Settings → Pages → Build and deployment → Source = GitHub Actions**
2. Custom domain: `www.ktpsolutions.vn` (set via `CNAME`)

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
