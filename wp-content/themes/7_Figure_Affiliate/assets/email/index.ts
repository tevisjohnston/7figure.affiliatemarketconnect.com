import 'dotenv/config';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

(async function() {
  try {
    await resend.emails.send({
        from: '7 Figure Affiliate <tevis.johnston@affiliatemarketconnect.com>',
        to: ['tevisjohnston@gmail.com'],
        subject: 'Hello-World',
        html: '<p>It works!</p>',
  });

    console.log;
  } catch (error) {
    console.error(error);
  }
});