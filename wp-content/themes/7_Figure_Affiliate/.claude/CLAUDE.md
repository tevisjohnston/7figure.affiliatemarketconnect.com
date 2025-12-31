# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Custom WordPress theme for "7 Figure Affiliate" - an affiliate marketing site for Michael Cheney's products. Combines PHP WordPress development with Tailwind CSS v4, TypeScript, and a containerized email autoresponder service.

## Architecture

### Custom Post Types & Taxonomies

The `affiliate_product` CPT with rich meta fields (functions.php):
- Core fields: affiliate link, JV page link, subtitle, price point, conversion tracking ID
- Content arrays: key features, benefits, bonuses, testimonials
- Meta boxes: functions.php:206-450
- Save handler: `Theme_7_Figure_Affiliate_save_product_meta()` at functions.php:452-513
- Admin dashboard: 'Products' menu at functions.php:97-204
- Taxonomy: `affiliate_product_category`

### Lead Magnet System

Email capture with autoresponder integration (functions.php:515-646):
- Database: `wp_lead_magnet_subscribers` table (auto-created on load)
- REST endpoint: `POST /wp-json/7figure/v1/lead-magnet-subscribe`
- n8n webhook integration: configured via Settings → 7 Figure Settings
- Settings page: functions.php:610-646

### Email Service (email-service/)

Containerized Express.js autoresponder with React Email templates:
- Runs on port 3000 inside Docker
- Webhook endpoint: `POST /webhook/welcome` for new subscribers
- Cron jobs send Day 3 and Day 7 follow-up emails
- Templates in `email-service/emails/` (WelcomeEmail.tsx, Day3FollowUp.tsx, Day7CaseStudy.tsx)
- See `email-service/README.md` for full documentation

### Template Structure

- `front-page.php`: Homepage with hero, featured products, testimonials
- `single-affiliate_product.php`: Individual product pages
- `home.php`: Blog/posts listing
- `single.php`: Individual blog posts
- `page-products.php`: Products archive page

### Styling System

Dual CSS approach:
- `style.css`: Required WordPress theme stylesheet
- Tailwind CSS v4: Source in `assets/css/styles.css`, output to `assets/css/src/output.css`
- Color scheme: slate grays (#0f172a to #f8fafc) with amber accents (#f59e0b)

## Development Commands

```bash
# Tailwind CSS
npx @tailwindcss/cli -i assets/css/styles.css -o assets/css/src/output.css          # compile
npx @tailwindcss/cli -i assets/css/styles.css -o assets/css/src/output.css --watch  # watch mode

# Email scripts (theme root)
npm run send-email     # Send test email via Resend
npm run list-emails    # List email campaigns
npm run update-email   # Update email template

# Email service (email-service/)
npm run dev            # Start dev server with hot reload
npm run build          # Compile TypeScript
npm run email:dev      # Preview templates at localhost:3001
```

## Database

### Lead Magnet Subscribers Table
```sql
wp_lead_magnet_subscribers (
  id, name, email, date_submitted,
  day_3_sent, day_3_sent_at,
  day_7_sent, day_7_sent_at
)
```

### Database Query Tool
`database-query.php` provides admin-only database inspection (SELECT queries only).

## Custom Meta Fields

```php
get_post_meta($post_id, '_affiliate_link', true);        // URL
get_post_meta($post_id, '_jv_page_link', true);          // URL
get_post_meta($post_id, '_product_subtitle', true);      // Text
get_post_meta($post_id, '_price_point', true);           // Text (e.g., "From $47")
get_post_meta($post_id, '_conversion_tracking_id', true); // Text
get_post_meta($post_id, '_key_features', true);          // Array
get_post_meta($post_id, '_product_benefits', true);      // Array
get_post_meta($post_id, '_bonus_offers', true);          // Array
get_post_meta($post_id, '_testimonials', true);          // Array of ['name', 'text']
```

## Environment Files

- `.env` (theme root): `RESEND_API_KEY` for email scripts
- `email-service/.env`: `RESEND_API_KEY`, `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `DB_PORT`

## Security Notes

- All admin functions check `current_user_can('manage_options')`
- Nonce verification on meta box saves
- URLs sanitized with `esc_url_raw()`
- Text fields sanitized with `sanitize_text_field()`
- Testimonial text allows HTML via `wp_kses_post()`
- Database query tool restricted to SELECT queries only
