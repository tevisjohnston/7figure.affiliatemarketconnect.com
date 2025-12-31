# 7 Figure Affiliate - Email Service

Express.js email service with React Email templates and autoresponder sequences using Resend API.

## Features

- ✉️ Beautiful React Email templates
- 🔄 Automated email sequences (Day 3, Day 7, etc.)
- ⏰ Cron jobs for scheduled emails
- 🗄️ Direct WordPress database integration
- 🐳 Docker containerized

## Directory Structure

```
email-service/
├── src/
│   ├── server.ts          # Express server with webhook endpoints
│   └── cron.ts           # Autoresponder cron jobs
├── emails/
│   ├── WelcomeEmail.tsx  # Day 1 welcome email
│   ├── Day3FollowUp.tsx  # Day 3 follow-up
│   └── Day7CaseStudy.tsx # Day 7 case study
├── Dockerfile
├── package.json
├── tsconfig.json
└── .env
```

## Setup Instructions

### 1. Create .env file

Copy `.env.example` to `.env` and add your Resend API key:

```bash
cd email-service
cp .env.example .env
```

Edit `.env`:
```env
RESEND_API_KEY=re_your_actual_api_key_here
PORT=3000
DB_HOST=db_2
DB_USER=root
DB_PASSWORD=Password432!
DB_NAME=wp_db_7figure
DB_PORT=3306
```

### 2. Update Database Schema

Add tracking columns to your WordPress subscribers table:

```sql
ALTER TABLE wp_lead_magnet_subscribers
ADD COLUMN day_3_sent TINYINT(1) DEFAULT 0,
ADD COLUMN day_3_sent_at DATETIME NULL,
ADD COLUMN day_7_sent TINYINT(1) DEFAULT 0,
ADD COLUMN day_7_sent_at DATETIME NULL;
```

### 3. Update docker-compose.yml

Add the email service to your root `docker-compose.yml`:

```yaml
services:
  # ... existing services (wordpress, db_2) ...

  email-service:
    build: ./wp-content/themes/7_Figure_Affiliate/email-service
    container_name: 7figure-email-service
    ports:
      - "3000:3000"
    environment:
      - RESEND_API_KEY=${RESEND_API_KEY}
      - DB_HOST=db_2
      - DB_USER=root
      - DB_PASSWORD=Password432!
      - DB_NAME=wp_db_7figure
      - DB_PORT=3306
    env_file:
      - ./wp-content/themes/7_Figure_Affiliate/email-service/.env
    networks:
      - affiliatemarketconnectcom_webproxy
    depends_on:
      - db_2
    restart: unless-stopped
```

### 4. Start the Service

From your project root:

```bash
docker-compose up -d --build email-service
```

### 5. Update WordPress/n8n Webhook

Update your WordPress form or n8n workflow to POST to:

```
http://email-service:3000/webhook/welcome
```

**Payload:**
```json
{
  "name": "John Doe",
  "email": "john@example.com"
}
```

## Endpoints

### Health Check
```
GET http://localhost:3000/health
```

### Welcome Email Webhook
```
POST http://localhost:3000/webhook/welcome
Body: { "name": "string", "email": "string" }
```

### Test Email (Development)
```
POST http://localhost:3000/test/send-email
Body: { "name": "string", "email": "string" }
```

## Autoresponder Schedule

- **Day 3:** "How to Find Winning Products" - Sent daily at 9 AM
- **Day 7:** "Real Case Study - $5k in 30 Days" - Sent daily at 9 AM

Cron also runs hourly from 9 AM - 5 PM for more frequent checks.

## Development

### Local Development (without Docker)

```bash
cd email-service
npm install
npm run dev
```

### Preview Emails

React Email includes a dev server to preview templates:

```bash
npm run email:dev
```

Opens at `http://localhost:3001`

### Build TypeScript

```bash
npm run build
```

## Adding New Email Templates

1. Create new template in `emails/` directory:

```tsx
// emails/Day14Bonus.tsx
import { Html, Head, Body, Container, Text } from '@react-email/components';

interface Day14BonusProps {
  name: string;
}

export const Day14Bonus = ({ name }: Day14BonusProps) => {
  return (
    <Html>
      <Head />
      <Body>
        <Container>
          <Text>Hi {name}!</Text>
          {/* Your email content */}
        </Container>
      </Body>
    </Html>
  );
};

export default Day14Bonus;
```

2. Add database columns for tracking:

```sql
ALTER TABLE wp_lead_magnet_subscribers
ADD COLUMN day_14_sent TINYINT(1) DEFAULT 0,
ADD COLUMN day_14_sent_at DATETIME NULL;
```

3. Add cron job in `src/cron.ts`:

```typescript
async function sendDay14Emails() {
  const connection = await getDbConnection();
  const [rows] = await connection.execute(
    `SELECT id, name, email FROM wp_lead_magnet_subscribers
     WHERE DATE(date_submitted) = DATE_SUB(CURDATE(), INTERVAL 14 DAY)
     AND (day_14_sent IS NULL OR day_14_sent = 0)
     LIMIT 50`
  );

  for (const subscriber of rows) {
    await resend.emails.send({
      from: '7 Figure Affiliate <tevis.johnston@affiliatemarketconnect.com>',
      to: subscriber.email,
      subject: 'Day 14: Your Bonus',
      react: Day14Bonus({ name: subscriber.name }),
    });

    await connection.execute(
      'UPDATE wp_lead_magnet_subscribers SET day_14_sent = 1, day_14_sent_at = NOW() WHERE id = ?',
      [subscriber.id]
    );
  }
}
```

4. Register the function in `startCronJobs()`.

## Logs

View email service logs:

```bash
docker-compose logs -f email-service
```

## Troubleshooting

**Database connection errors:**
- Verify `db_2` container is running
- Check database credentials in `.env`
- Ensure both services are on same Docker network

**Emails not sending:**
- Check Resend API key is valid
- View logs: `docker-compose logs email-service`
- Test manually: `curl -X POST http://localhost:3000/test/send-email -H "Content-Type: application/json" -d '{"name":"Test","email":"your@email.com"}'`

**Cron jobs not running:**
- Verify server started successfully
- Check logs for cron initialization messages
- Ensure database columns exist (day_3_sent, day_7_sent)
