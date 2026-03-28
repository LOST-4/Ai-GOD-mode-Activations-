# Contributing to G0DM0DƎ

## Quick Start

```bash
# 1. Fork on GitHub → https://github.com/AiGptCode/G0DM0D3

# 2. Clone your fork
git clone https://github.com/YOUR_USERNAME/G0DM0D3.git
cd G0DM0D3

# 3. Add upstream remote
git remote add upstream https://github.com/AiGptCode/G0DM0D3.git

# 4. Install dependencies
npm ci

# 5. Run dev server
npm run dev
# → http://localhost:3000

# 6. (Optional) Run API server
npm run api
# → http://localhost:7860
```

---

## Making Changes

### Create a feature branch

```bash
git checkout -b feat/your-feature-name
```

Branch naming conventions:
- `feat/` — new features
- `fix/` — bug fixes
- `docs/` — documentation only
- `refactor/` — code restructure without behavior change
- `ui/` — visual/UX changes

### Develop & Test

```bash
# Dev server with hot reload
npm run dev

# Type check
npx tsc --noEmit

# Build (must pass before PR)
npm run build
```

### Commit

```bash
git add .
git commit -m "feat: description of what changed and why"
```

Commit message format: `type: short description`

Examples:
- `feat: add Ollama provider preset to settings`
- `fix: chat window not rendering after conversation create`
- `ui: glassmorphism sidebar with dark/light toggle`
- `docs: add Coolify deployment guide`

---

## Raising a Pull Request

### 1. Push to your fork

```bash
git push origin feat/your-feature-name
```

### 2. Open PR on GitHub

Go to your fork → **Compare & pull request** → target `AiGptCode/G0DM0D3` `main`

### 3. PR template

```markdown
## What

Brief description of the change.

## Why

What problem does this solve or what feature does it add?

## How to Test

1. Step-by-step instructions
2. What to look for
3. Expected behavior

## Screenshots

(If UI changes — before/after)

## Checklist

- [ ] `npm run build` passes
- [ ] No new TypeScript errors
- [ ] Tested in both dark and light mode
- [ ] Existing features still work
```

---

## Staying Up to Date

```bash
# Fetch upstream changes
git fetch upstream

# Rebase your branch on latest main
git checkout feat/your-feature-name
git rebase upstream/main

# Force push (only your fork, never upstream)
git push --force-with-lease
```

---

## Project Structure

```
G0DM0D3/
├── src/
│   ├── app/           # Next.js app router (page, layout, globals.css)
│   ├── components/    # React components (Sidebar, ChatArea, Settings...)
│   ├── lib/           # Client libraries (openrouter, upstream, autotune...)
│   ├── store/         # Zustand state management
│   └── hooks/         # Custom React hooks
├── api/
│   ├── server.ts      # Express API server
│   ├── routes/        # API routes (chat, ultraplinian, consortium...)
│   └── lib/           # Server libraries (ultraplinian, consortium...)
├── DEPLOY.md          # Deployment guide (Coolify + Hostinger)
└── CONTRIBUTING.md    # This file
```

---

## Code Style

- **TypeScript** everywhere — no `any` unless absolutely necessary
- **Tailwind CSS** for styling — use CSS variables (`var(--primary)`, etc.)
- **No comments that narrate** — only explain non-obvious intent
- **Glass design system** — use `.glass`, `.glass-card`, `.glass-panel`, `.glass-input`
- **Dark/light mode** — all UI must work in both (test with the toggle)

---

## License

AGPL-3.0 — all contributions are under the same license.
By submitting a PR, you agree to license your contribution under AGPL-3.0.
