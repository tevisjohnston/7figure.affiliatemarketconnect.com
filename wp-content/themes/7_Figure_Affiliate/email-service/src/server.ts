import 'dotenv/config';
import express, { Request, Response } from 'express';
import cors from 'cors';
import { Resend } from 'resend';
import { startCronJobs } from './cron';
import { WelcomeEmail } from '../emails/WelcomeEmail';

const app = express();
const PORT = process.env.PORT || 3000;
const resend = new Resend(process.env.RESEND_API_KEY);

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', service: '7figure-email-service' });
});

// Webhook endpoint for immediate welcome email
app.post('/webhook/welcome', async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        error: 'Name and email are required'
      });
    }

    // Send welcome email using React Email template
    const { data, error } = await resend.emails.send({
      from: '7 Figure Affiliate <tevis.johnston@affiliatemarketconnect.com>',
      to: email,
      subject: 'Your Step-by-Step Blueprint to $5k/Month is Ready',
      react: WelcomeEmail({ name }),
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to send email'
      });
    }

    console.log(`✅ Welcome email sent to ${email} - ID: ${data?.id}`);

    res.json({
      success: true,
      message: 'Welcome email sent',
      emailId: data?.id
    });

  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Test endpoint to manually trigger an email
app.post('/test/send-email', async (req: Request, res: Response) => {
  try {
    const { name, email, template } = req.body;

    const { data, error } = await resend.emails.send({
      from: '7 Figure Affiliate <tevis.johnston@affiliatemarketconnect.com>',
      to: email || 'tevisjohnston@gmail.com',
      subject: 'Test Email',
      react: WelcomeEmail({ name: name || 'Test User' }),
    });

    if (error) {
      return res.status(500).json({ success: false, error });
    }

    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Email service running on port ${PORT}`);
  console.log(`📧 Webhook endpoint: http://localhost:${PORT}/webhook/welcome`);

  // Start cron jobs for autoresponder sequences
  startCronJobs();
});
