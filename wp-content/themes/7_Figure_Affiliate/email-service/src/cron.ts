import cron from 'node-cron';
import mysql from 'mysql2/promise';
import { Resend } from 'resend';
import { Day3FollowUp } from '../emails/Day3FollowUp';
import { Day7CaseStudy } from '../emails/Day7CaseStudy';

const resend = new Resend(process.env.RESEND_API_KEY);

// Database connection configuration
const dbConfig = {
  host: process.env.DB_HOST || 'db_2',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'wp_db_password',
  database: process.env.DB_NAME || 'wp_db_7figure',
  port: parseInt(process.env.DB_PORT || '3306'),
};

// Helper function to get database connection
async function getDbConnection() {
  try {
    const connection = await mysql.createConnection(dbConfig);
    return connection;
  } catch (error) {
    console.error('❌ Database connection error:', error);
    throw error;
  }
}

// Check and send Day 3 follow-up emails
async function sendDay3Emails() {
  const connection = await getDbConnection();

  try {
    // Find subscribers who subscribed 3 days ago and haven't received day 3 email
    const [rows] = await connection.execute<mysql.RowDataPacket[]>(
      `SELECT id, name, email, date_submitted
       FROM wp_lead_magnet_subscribers
       WHERE DATE(date_submitted) = DATE_SUB(CURDATE(), INTERVAL 3 DAY)
       AND (day_3_sent IS NULL OR day_3_sent = 0)
       LIMIT 50`
    );

    console.log(`📅 Day 3: Found ${rows.length} subscribers to email`);

    for (const subscriber of rows) {
      try {
        const { data, error } = await resend.emails.send({
          from: '7 Figure Affiliate <tevis.johnston@affiliatemarketconnect.com>',
          to: subscriber.email,
          subject: 'Day 3: How to Find Winning Products',
          react: Day3FollowUp({ name: subscriber.name }),
        });

        if (error) {
          console.error(`❌ Failed to send Day 3 email to ${subscriber.email}:`, error);
          continue;
        }

        // Mark email as sent
        await connection.execute(
          'UPDATE wp_lead_magnet_subscribers SET day_3_sent = 1, day_3_sent_at = NOW() WHERE id = ?',
          [subscriber.id]
        );

        console.log(`✅ Day 3 email sent to ${subscriber.email} - ID: ${data?.id}`);
      } catch (error) {
        console.error(`❌ Error sending to ${subscriber.email}:`, error);
      }
    }
  } finally {
    await connection.end();
  }
}

// Check and send Day 7 case study emails
async function sendDay7Emails() {
  const connection = await getDbConnection();

  try {
    // Find subscribers who subscribed 7 days ago and haven't received day 7 email
    const [rows] = await connection.execute<mysql.RowDataPacket[]>(
      `SELECT id, name, email, date_submitted
       FROM wp_lead_magnet_subscribers
       WHERE DATE(date_submitted) = DATE_SUB(CURDATE(), INTERVAL 7 DAY)
       AND (day_7_sent IS NULL OR day_7_sent = 0)
       LIMIT 50`
    );

    console.log(`📅 Day 7: Found ${rows.length} subscribers to email`);

    for (const subscriber of rows) {
      try {
        const { data, error } = await resend.emails.send({
          from: '7 Figure Affiliate <tevis.johnston@affiliatemarketconnect.com>',
          to: subscriber.email,
          subject: 'Day 7: Real Case Study - $5k in 30 Days',
          react: Day7CaseStudy({ name: subscriber.name }),
        });

        if (error) {
          console.error(`❌ Failed to send Day 7 email to ${subscriber.email}:`, error);
          continue;
        }

        // Mark email as sent
        await connection.execute(
          'UPDATE wp_lead_magnet_subscribers SET day_7_sent = 1, day_7_sent_at = NOW() WHERE id = ?',
          [subscriber.id]
        );

        console.log(`✅ Day 7 email sent to ${subscriber.email} - ID: ${data?.id}`);
      } catch (error) {
        console.error(`❌ Error sending to ${subscriber.email}:`, error);
      }
    }
  } finally {
    await connection.end();
  }
}

// Start all cron jobs
export function startCronJobs() {
  console.log('⏰ Starting cron jobs for email sequences...');

  // Run every day at 9:00 AM
  cron.schedule('0 9 * * *', async () => {
    console.log('🕘 Running daily email sequence check...');

    try {
      await sendDay3Emails();
      await sendDay7Emails();
      console.log('✅ Daily email sequence check completed');
    } catch (error) {
      console.error('❌ Error in daily email sequence:', error);
    }
  });

  // Also run every hour during business hours (9 AM - 5 PM) for more frequent checks
  cron.schedule('0 9-17 * * *', async () => {
    console.log('⏰ Hourly sequence check...');

    try {
      await sendDay3Emails();
      await sendDay7Emails();
    } catch (error) {
      console.error('❌ Error in hourly sequence:', error);
    }
  });

  console.log('✅ Cron jobs initialized');
  console.log('   - Daily at 9:00 AM');
  console.log('   - Hourly from 9 AM - 5 PM');
}
