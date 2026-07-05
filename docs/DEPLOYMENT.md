# Deployment Options

**Current Status:** Deployment provider not selected.

## Architecture Guidelines

- The architecture must remain compatible with standard Next.js deployments (e.g., Vercel, Netlify, AWS Amplify, self-hosted Node server).
- Do not hardcode the project to one hosting provider.
- Do not enable static export (`output: 'export'`) unless final project requirements prove it is strictly suitable (e.g., no dynamic server features needed).
- Maintain `.env.example` when environment variables are introduced. (Currently deferred).
