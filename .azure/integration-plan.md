# Integration Plan

## Frontend
- Folder: workspace root (`index.html`, `src/`)
- Dev: `npm run dev` (Vite, default port 5173)
- Build: `npm run build`
- Tests: `npm test`
- API seam: `src/api/index.js` exports the `ApiClient`-shaped `api`; mock implementation: `src/api/mockClient.js`
- Local collection data: `src/data/collections.js`; illustrations: `src/assets/illustrations/`
- The plan has no backend or live data service. Keep the local-only client and demo form; do not invent HTTP APIs or transmit/persist user data.
- Dev-only data-state controls: `src/api/previewState.js` and `src/components/preview-state-switcher.js`

## Routes
- `GET /`: serve the Vite-built static application.
- `GET /#colecciones`: client-side anchor to the three mock notebook designs; not an HTTP API.
- Client-side `/#pedido`: render a local demo summary; no submission request.

## Backend and Database
- Backend: none. No run command, health endpoint, or backend port.
- Database: none. Do not create migrations or seed data.
- Shared types: no shared package; local JSDoc contract is in `src/api/types.js`.
- Azure services: none.