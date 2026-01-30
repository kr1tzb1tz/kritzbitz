# Kritz Bitz Website

Static site built with Next.js, deployed to Cloudflare Pages with a Cloudflare Worker for contact form handling.

## Stack

- **Frontend**: Next.js 16, React 19, Tailwind CSS
- **Worker**: Cloudflare Worker (TypeScript) for contact form → Pushover notifications
- **Hosting**: Cloudflare Pages (frontend) + Cloudflare Workers (API)

## Structure

```
├── frontend/              # Next.js site
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── app/           # Next.js app router pages
│   │   └── lib/
│   │       └── api.js     # Worker API client
│   └── public/            # Static assets
├── worker/                # Cloudflare Worker
│   └── src/
│       ├── index.ts       # Router
│       ├── types.ts       # Shared types
│       └── inquiries.ts   # Contact form handler
└── .github/workflows/     # Auto-deploy worker on push
```

## Local Development

### Frontend
```bash
cd frontend
pnpm install
pnpm dev
```

### Worker
```bash
cd worker
pnpm install
pnpm run dev
```

Create `worker/.dev.vars` for local secrets:
```
PUSHOVER_API_TOKEN=your_token_here
PUSHOVER_USER_KEYS=key1,key2,key3
```

## Deployment

### Frontend (Cloudflare Pages)
1. Connect repo to Cloudflare Pages
2. Build command: `cd frontend && pnpm install && pnpm build`
3. Output directory: `frontend/out`
4. Environment variables:
   - `NEXT_PUBLIC_WORKER_URL` - Worker URL

### Worker (Auto-deploy)
Deploys automatically via GitHub Actions when `worker/**` files change on `main`. These are assigned in the repository's secrets and used in the `.github/workflows/deploy-worker.yml` script on deploy.

**Required GitHub secret 1**: `CLOUDFLARE_API_TOKEN`
**Required GitHub secret 2**: `CLOUDFLARE_ACCOUNT_ID`

**Worker secrets** (set via wrangler):
```bash
cd worker
npx wrangler secret put PUSHOVER_API_TOKEN
npx wrangler secret put PUSHOVER_USER_KEYS  # comma-separated for multiple recipients
```
