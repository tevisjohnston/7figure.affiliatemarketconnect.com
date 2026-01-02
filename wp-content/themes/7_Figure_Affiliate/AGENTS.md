# Repository Guidelines

## Project Structure & Module Organization
- Custom WordPress theme lives at this repository root under `wp-content/themes/7_Figure_Affiliate/` with templates (`front-page.php`, `single-affiliate_product.php`, `page-products.php`, `home.php`, `single.php`).
- Theme bootstrap, CPTs, REST endpoints, and admin screens are in `functions.php`.
- Styles: `style.css` plus Tailwind source/output in `assets/css/styles.css` and `assets/css/src/output.css`.
- Email utility scripts: `assets/email/` (TypeScript scripts for Resend).
- Autoresponder service: `email-service/` with app code in `email-service/src/` and templates in `email-service/emails/`.
- Admin-only database inspection tool: `database-query.php` (SELECT-only queries).

## Build, Test, and Development Commands
Theme utilities (from repository root):
- `npm run start` or `npm run send-email`: run `assets/email/index.ts` to send emails via Resend.
- `npm run list-emails`: list emails via `assets/email/list.ts`.
- `npm run update-email`: update email data via `assets/email/update.ts`.
- `npx @tailwindcss/cli -i assets/css/styles.css -o assets/css/src/output.css`: compile Tailwind CSS.
- `npx @tailwindcss/cli -i assets/css/styles.css -o assets/css/src/output.css --watch`: watch Tailwind changes.
Email service:
- `cd email-service && npm run dev`: start the Express server in watch mode.
- `cd email-service && npm run build`: compile TypeScript into `dist/`.
- `cd email-service && npm run email:dev`: preview React Email templates at `http://localhost:3001`.
Docker:
- `docker-compose up -d --build email-service`: run the email service container (see `email-service/README.md`).

## Architecture & Data Notes
- Custom post type: `affiliate_product` with rich meta fields and taxonomy `affiliate_product_category`.
- Lead magnet REST endpoint: `POST /wp-json/7figure/v1/lead-magnet-subscribe` stores in `wp_lead_magnet_subscribers`.
- Autoresponders send Day 3/Day 7 emails via the email service webhook at `POST /webhook/welcome`.

## Coding Style & Naming Conventions
- PHP follows WordPress conventions with 4-space indentation and underscore-heavy function names (example: `Theme_7_Figure_Affiliate_register_nav_menus`).
- TypeScript/TSX in `assets/email/` and `email-service/` uses 2-space indentation and `PascalCase` React components (example: `WelcomeEmail`).
- Keep asset paths explicit and registered in `functions.php` when adding scripts/styles.

## Testing Guidelines
- No automated tests are configured in the root theme or `email-service` package. When changing behavior, include a brief manual test note in the PR (for example: “sent test email, verified template preview”).

## Commit & Pull Request Guidelines
- Git history is minimal and shows no formal convention; use short, descriptive commit messages (example: “Add Day 14 email template”).
- PRs should describe user-facing changes, list any new env vars or DB migrations, and include screenshots for UI/email template updates.

## Security & Configuration Tips
- Store secrets in `.env` (theme root) and `email-service/.env`; never commit credentials.
- Document schema changes for subscriber tracking columns when adding new autoresponders.
