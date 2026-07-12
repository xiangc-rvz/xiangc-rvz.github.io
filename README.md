# xiangc-rvz.github.io

Personal website of Xiang Chen — live at **[xiangc-rvz.github.io](https://xiangc-rvz.github.io)**.

## Stack

- **Next.js 16** (App Router, React 19, TypeScript)
- **Tailwind CSS v4**
- **GitHub Pages** via GitHub Actions

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deployment

Every push to `master` triggers an automatic build and deploy to GitHub Pages via the workflow in `.github/workflows/deploy.yml`.

```bash
npm run build      # production build
npm run lint       # ESLint
npm run typecheck  # TypeScript check
```
