 # Chiku Commerce Monorepo

 Omnichannel ecommerce platform scaffold built with Turborepo, pnpm workspaces, and a modular TypeScript stack. It ships with a backend API (Express + Swagger + Zod) and four Next.js applications (customer storefront, admin dashboard, delivery operations panel, merchant dashboard) sharing UI components, configs, and utilities.

 ## Tech Stack

 - **Package manager:** pnpm workspace  
 - **Build orchestration:** Turborepo  
 - **Frontend apps:** Next.js 16 (App Router), TypeScript, Tailwind CSS  
 - **Backend service:** Express, Zod validation, Swagger UI docs  
 - **Shared packages:** UI library, configuration, utilities (TypeScript)  

 ## Repository Structure

 ```
 apps/
   backend/       # Express API with Swagger docs
   frontend/      # Customer storefront
   admin/         # Platform admin console
   delivery/      # Delivery partner panel
   shopkeeper/    # Marketplace merchant dashboard
 packages/
   ui/            # Shared React components (Tailwind-ready)
   config/        # Shared configuration helpers (Tailwind themes etc.)
   utils/         # Shared utility helpers (dates, money)
 ```

 ## Getting Started

 1. **Install dependencies**
    ```bash
    pnpm install
    ```

 2. **Run everything in dev mode (Turbo pipeline)**
    ```bash
    pnpm dev
    ```
    This launches all Next.js apps (on incremental ports) and the backend API with hot reload.

 3. **Run services individually**
    ```bash
    pnpm dev:frontend    # Storefront
    pnpm dev:admin       # Admin console
    pnpm dev:delivery    # Delivery panel
    pnpm dev:shopkeeper  # Merchant dashboard
    pnpm dev:backend     # Express API (Swagger at /docs)
    ```

 ## Useful Scripts

 ```bash
 pnpm lint        # Turbo lint across all apps/packages
 pnpm typecheck   # Turbo TypeScript type checking
 pnpm build       # Production builds for all workspaces
 pnpm test        # Placeholder (extend with tests as you add them)
 ```

 Each package/app also exposes its own `build`, `dev`, `typecheck`, and (for Next.js) `lint` scripts. You can run them via `pnpm --filter <package> <script>`.

 ## Backend API

 - Service URL (dev): `http://localhost:4000`
 - Swagger UI: `http://localhost:4000/docs`
 - Example endpoints:
   - `GET /api/health` — health check
   - `GET /api/products` — product listing
   - `POST /api/products` — create product (validated with Zod + middleware)

 ## Tailwind & Shared UI

 - Next.js apps use Tailwind CSS 4 with shared design tokens from `@ecommerce/config`.
 - `@ecommerce/ui` exposes reusable components like `PrimaryButton`.
 - To extend the system, add new components/utilities in the respective package and consume via the configured path aliases (`@ecommerce/ui/*`, `@ecommerce/utils/*`, etc.).

 ## Environment Variables

Backend reads `.env` via `dotenv`. Copy `apps/backend/.env.example` (create one if needed) and supply:
 ```
 PORT=4000
MONGODB_URI=mongodb://127.0.0.1:27017/chiku-commerce
APP_URL=http://localhost:4000             # used to build email verification links
EMAIL_VERIFICATION_OTP_TTL_MINUTES=10     # OTP expiry window (minutes)
# Option 1: Generic SMTP server
SMTP_HOST=smtp.resend.com
SMTP_PORT=465
SMTP_USER=apikey
SMTP_PASS=super-secret
SMTP_SECURE=true
SMTP_FROM="Chiku Commerce <noreply@yourdomain.com>"

# Option 2: Gmail (fallback if SMTP_* not set)
EMAIL_USER=yourgmail@gmail.com
EMAIL_PASS=app-password-generated-in-google-account
EMAIL_FROM="Chiku Commerce <yourgmail@gmail.com>"
 ```
 Extend with database credentials, third-party API keys, etc., as you build out the platform.

## Email Verification Flow

1. **Register a user**
   ```bash
   curl -X POST http://localhost:4000/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{
       "name": "Priya Sharma",
       "email": "priya@example.com",
       "password": "Str0ngP@ssword!",
       "platform": "android"
     }'
   ```
   The response includes a `verificationUrl` (for convenience) and a message indicating that an OTP has been emailed to the user. The OTP itself is delivered via email using Nodemailer.

2. **Verify with token + OTP**
   ```bash
   curl -X POST http://localhost:4000/api/auth/verify-email \
     -H "Content-Type: application/json" \
     -d '{
       "token": "<64-char-token-from-verificationUrl>",
       "otp": "<6-digit-code>"
     }'
   ```
   A `200` response sets `isEmailVerified` to `true` for that user.

 ## Next Steps

 - Hook the backend into a real database (Prisma, Drizzle, etc.)
 - Configure auth (Clerk, Auth.js, custom JWT) across apps
 - Expand shared UI kit and add component documentation
 - Add testing (Vitest/Jest + Playwright/Cypress)
 - Set up CI (GitHub Actions/Turborepo remote cache) and deployment workflows

 ---

 With this scaffold you can iterate rapidly on a multi-surface ecommerce experience while keeping shared logic and design systems in sync across teams.

"# EveryThink" 
