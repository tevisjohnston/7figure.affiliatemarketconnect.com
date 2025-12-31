# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

WordPress site for "7 Figure Affiliate" - an affiliate marketing site for Michael Cheney's products. Runs via Docker with nginx-proxy for SSL/reverse proxy.

## Architecture

```
/                           # WordPress root (Docker-managed)
├── docker-compose.yml      # MySQL 8.0 + WordPress + email-service containers
├── wp-content/
│   └── themes/
│       └── 7_Figure_Affiliate/  # Custom theme (main development area)
│           └── email-service/   # Containerized autoresponder service
└── [WordPress core files]  # Managed by Docker, don't modify
```

**Custom theme contains detailed documentation:** `wp-content/themes/7_Figure_Affiliate/CLAUDE.md`

## Development Commands

### Docker Operations
```bash
# Start services using the following commands in order
1. Database + email-service
docker-compose up -d --build email-service
2. Wordpress
docker-compose up -d

# Rebuild services after changes using the following commands in order
1. docker-compose down
2. docker-compose up -d --build email-service
3. docker-compose up -d

# View logs
docker-compose logs -f wordpress
docker-compose logs -f db_2
docker-compose logs -f email-service

# Restart services
docker-compose restart wordpress
docker-compose restart email-service
```

### Theme Development (from wp-content/themes/7_Figure_Affiliate/)
```bash
npm install                    # Install dependencies
npm run send-email             # Test Resend email integration
npm run list-emails            # List email campaigns
npm run update-email           # Update email template
npx @tailwindcss/cli -i assets/css/styles.css -o assets/css/src/output.css          # Tailwind CSS: compile
npx @tailwindcss/cli -i assets/css/styles.css -o assets/css/src/output.css --watch  # Tailwind CSS: watch mode
```

### Email Service Development (from wp-content/themes/7_Figure_Affiliate/email-service/)
```bash
npm install              # Install dependencies
npm run dev              # Start dev server with hot reload
npm run build            # Compile TypeScript
npm run email:dev        # Preview email templates at localhost:3001
```

#### Web Address URL for React Email in Browser
- http://72.60.231.242:3001/preview/WelcomeEmail

### Database Development
```bash
docker exec -it 7figureaffiliatemarketconnectcom_db_2_1 mysql -u wp_db_user -p    # MySQL command line
# Then enter password and run:                                                    # Enter database password
USE wp_db_7figure;                                                                # Database to use
TRUNCATE TABLE wp_lead_magnet_subscribers;                                        # Reset subscribers to 0

```

## Environment

- **Domain:** 7figure.affiliatemarketconnect.com
- **MySQL:** Port 3302 (external), database `wp_db_7figure`
- **Email Service:** Port 3000 (autoresponder API)
- **Network:** Uses external `affiliatemarketconnectcom_webproxy` network for nginx-proxy/letsencrypt

## Key Development Areas

All custom code lives in the theme directory:
- Custom post type `affiliate_product` with extensive meta fields
- Lead magnet system with `wp_lead_magnet_subscribers` table
- Tailwind CSS v4 styling
- Containerized email-service with React Email templates and cron-based autoresponders
- Database query tool at `database-query.php`

See `wp-content/themes/7_Figure_Affiliate/CLAUDE.md` for detailed architecture, meta field references, and security notes.
