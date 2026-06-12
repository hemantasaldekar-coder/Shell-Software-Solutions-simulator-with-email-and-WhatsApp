# Next Tailwind Sandbox

A modern Next.js starter with TypeScript, Tailwind CSS, secure defaults, and a lightweight container sandbox.

## Requirements

- Node.js 20.11 or newer
- npm 10 or newer
- Docker, optional for the sandboxed workflow

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Sandboxed development

```bash
docker compose up --build
```

The container runs as the non-root `node` user, drops Linux capabilities, blocks privilege escalation, and uses a read-only root filesystem with writable temporary mounts for Next.js build output.

## Environment

Copy `.env.local.example` to `.env.local` for local overrides. Do not commit real secrets.

## Quality checks

```bash
npm run typecheck
npm run lint
npm run build
```
