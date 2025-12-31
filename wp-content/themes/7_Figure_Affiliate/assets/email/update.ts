import { Resend } from 'resend';

const resend = new Resend('re_3TMqNEpy_FWcmZyDjw2PHyqwtzsmf7qnH');

const oneMinuteFromNow = new Date(Date.now() + 1000 * 60).toISOString();

resend.emails.update({
  id: 'b78d00af-034c-428c-a663-6379feed0005',
  scheduledAt: oneMinuteFromNow,
});