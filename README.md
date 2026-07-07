# Identity Secure Access Portal

Nx React/Vite authentication portal with Supabase Auth as the first provider. The UI depends on auth use cases and domain contracts; Supabase is isolated in the infrastructure library.

## Architecture

Dependency direction:

`identity-web -> auth-feature-* -> auth-application -> auth-domain`

`identity-web -> auth-infrastructure -> auth-application/auth-domain`

`shared-ui/shared-utils/shared-config` stay presentation or pure utility focused and do not import auth infrastructure.

Project graph:

```text
apps/identity-web
  -> auth-feature-login
  -> auth-feature-forgot-password
  -> auth-feature-session
  -> auth-feature-dashboard
  -> auth-infrastructure
  -> core-routing

auth-feature-login -> auth-application contracts via injected dependencies
auth-application -> auth-domain
auth-infrastructure -> auth-domain + @supabase/supabase-js
core-routing -> auth-feature-session
```

SOLID decisions:

- UI components render and emit typed events; they do not create Supabase clients.
- Use cases depend on `AuthRepository`, not `SupabaseAuthRepository`.
- Provider-specific models are mapped before leaving infrastructure.
- Composition root is `apps/identity-web/src/app/dependencies.ts`.

## Setup

```bash
npm install
npm run dev
```

Frontend env file:

```text
SSO_FE/.env
```

```text
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
```

Backend env file:

```text
SSO_BE/.env
```

```text
PORT=3000
CORS_ORIGIN=http://localhost:4200
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_JWT_SECRET=your-supabase-jwt-secret
```

Legacy Supabase anon key naming is supported as `VITE_SUPABASE_ANON_KEY`, but new code uses `supabasePublishableKey`.

## Commands

```bash
npm run dev
npm run build
npm run test
npm run lint
```

## Supabase

Enable email/password auth in Supabase Auth and add this redirect URL:

```text
http://localhost:4200/dashboard
```

Database migrations live in the backend repository:

```text
../SSO_BE/supabase/migrations
```

Apply `../SSO_BE/supabase/migrations/001_profiles.sql` if you create the `profiles` table. RLS limits reads and updates to `auth.uid() = id`.

## Replace Supabase Auth

1. Implement `AuthRepository` in a new infrastructure adapter.
2. Map provider users/errors into `AuthUser` and `AuthError`.
3. Wire the new repository in `apps/identity-web/src/app/dependencies.ts`.

Feature UI, route guards and application use cases should not need changes.

## Security Notes

- No service role or secret key belongs in the frontend.
- Tokens are not stored in custom storage, React context, URL state or UI.
- AuthContext exposes only status, user metadata and `signOut`.
- ProtectedRoute is a UX guard, not a backend security boundary.
- Backend APIs must verify JWT signature, issuer, audience and authorization server-side.
- Errors shown to users are normalized and do not expose raw provider responses.
