# Deploying G0DM0DE

## Quick Start (Docker Compose)

The fastest way to run the full stack:

```bash
git clone https://github.com/AiGptCode/G0DM0D3.git
cd G0DM0D3

# Configure
cp .env.example .env
# Edit .env — set OPENROUTER_API_KEY at minimum

# Launch
docker compose up --build -d

# Open
open http://localhost:3000
```

This starts three services:
- **web** (port 3000) — Next.js frontend
- **api** (port 7860) — Express API server (ULTRAPLINIAN, CONSORTIUM, proxy)
- **proxy** (port 80) — nginx reverse proxy that routes /v1/* to API, everything else to frontend

## Local Development (no Docker)

```bash
npm install

# Terminal 1: Next.js dev server
npm run dev
# → http://localhost:3000

# Terminal 2: Express API server (needed for ULTRAPLINIAN/CONSORTIUM)
npm run api
# → http://localhost:7860
```

## Hostinger KVM2 with Coolify

### Prerequisites

- Hostinger KVM2 VPS with SSH access
- Coolify installed ([coolify.io/docs/installation](https://coolify.io/docs/installation))
- Repo on GitHub

### Install Coolify

```bash
ssh root@YOUR_VPS_IP
curl -fsSL https://cdn.coolify.io/install.sh | bash
# Open http://YOUR_VPS_IP:8000
```

### Option A: Docker Compose (recommended)

1. Coolify dashboard > Resources > Add New > Docker Compose
2. Point to your repo, select `docker-compose.yml`
3. Set environment variables in Coolify UI (from `.env.example`)
4. Deploy

### Option B: Separate Services

**Frontend:**

| Setting | Value |
|---------|-------|
| Build Pack | Nixpacks |
| Build Command | `npm ci && npm run build` |
| Start Command | `npm run start` |
| Port | 3000 |

**API Server:**

| Setting | Value |
|---------|-------|
| Build Pack | Nixpacks |
| Build Command | `npm ci` |
| Start Command | `npx tsx api/server.ts` |
| Port | 7860 |

Environment variables for API:
```
OPENROUTER_API_KEY=sk-or-v1-...
CORS_ORIGIN=*
```

### Domain + SSL

1. Point DNS A record to your VPS IP
2. Coolify > App > Settings > Domains > add domain
3. Coolify auto-provisions Let's Encrypt SSL

## Architecture

```
                    ┌─────────────────────┐
                    │       nginx :80     │
                    │   reverse proxy     │
                    └────────┬────────────┘
                             │
              ┌──────────────┼──────────────┐
              │              │              │
              ▼              ▼              │
     ┌────────────┐  ┌────────────┐        │
     │ Next.js    │  │ Express    │        │
     │ :3000      │  │ API :7860  │        │
     │ Frontend   │  │ ULTRA/CON  │        │
     └────────────┘  └─────┬──────┘        │
                           │               │
                           ▼               │
                    ┌────────────┐         │
                    │ OpenRouter │         │
                    │ (cloud)    │         │
                    └────────────┘         │
                                           │
                    Browser ───────────────┘
                    (Standard mode calls
                     OpenRouter directly)
```

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `OPENROUTER_API_KEY` | For ULTRA/CONSORTIUM | Powers server-side model calls |
| `GODMODE_API_KEY` | No | Auth for API endpoints (leave empty for open access) |
| `CORS_ORIGIN` | No | Set to `*` behind reverse proxy |
| `HF_TOKEN` | No | HuggingFace write token for dataset publishing |
| `HF_DATASET_REPO` | No | Target HF dataset repo |
| `PORT` | No | API server port (default: 7860) |
| `WEB_PORT` | No | Frontend port (default: 3000) |

## Troubleshooting

| Issue | Fix |
|-------|-----|
| ULTRAPLINIAN empty response | Check OpenRouter credits at openrouter.ai/activity. Free tier = 50 req/day. ULTRA fast uses 12 per message. |
| "Failed to fetch" on ULTRA | API server not running. Start with `npm run api` |
| CORS errors | Set `CORS_ORIGIN=*` in API server env |
| esbuild arch mismatch | `rm -rf node_modules && npm install` |
| path-to-regexp crash | Already fixed. Use Express 5 `{*param}` syntax |
| Build fails (SWC) | `rm -rf node_modules .next && npm install` |
