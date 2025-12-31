import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Text,
  Heading,
  Button,
  Hr,
  Tailwind,
} from '@react-email/components';
import * as React from 'react';
import { EmailFooter } from './components/EmailFooter';

interface Day3FollowUpProps {
  name: string;
}

export const Day3FollowUp = ({ name }: Day3FollowUpProps) => {
  return (
    <Html>
      <Head />
      <Preview>How to Find Winning Products That Actually Convert</Preview>
      <Tailwind>
        <Body className="bg-[#f6f9fc] font-sans">
          <Container className="bg-white mx-auto pt-5 pb-12 mb-16 max-w-[600px]">
            <Heading className="text-slate-900 text-[28px] font-bold my-10 px-10">
              Hey {name}, Let's Talk Products...
            </Heading>

            <Text className="text-slate-700 text-base leading-[26px] my-4 px-10">
              You've had a few days to review the blueprint. Now I want to share something critical:
            </Text>

            <Text className="text-slate-900 text-lg leading-7 my-6 py-5 px-10 bg-amber-100 border-l-4 border-amber-500">
              <strong>95% of affiliate marketers fail because they promote the WRONG products.</strong>
            </Text>

            <Text className="text-slate-700 text-base leading-[26px] my-4 px-10">
              It doesn't matter how good your marketing is if the product doesn't convert.
              Here's my exact 3-question filter for finding winners:
            </Text>

            <Section className="px-10">
              <Text className="text-slate-700 text-base leading-7 my-4">
                <strong>1. Does it solve a PAINFUL problem?</strong>
                <br />
                People are actively searching for a solution. If what you are promoting
                isn't solving a problem, you're pushing a boulder uphill.
              </Text>
              <Text className="text-slate-700 text-base leading-7 my-4">
                <strong>2. Is the sales page proven?</strong>
                <br />
                Check the <a href="https://warriorplus.com/affiliate/offers">offers page</a> for conversion rates. I only promote products converting at 3%+ minimum.
              </Text>
              <Text className="text-slate-700 text-base leading-7 my-4">
                <strong>3. Does it have a recurring commission?</strong>
                <br />
                One-time commissions are fine, but recurring commissions add to your income
                monthly.
              </Text>
            </Section>

            <Text className="text-slate-700 text-base leading-[26px] my-4 px-10">
              Right now, I'm promoting <strong>3 products</strong> that hit all three criteria.
              Combined, they generate $5k-$8k/month on autopilot.
            </Text>

            <Section className="py-7 text-center">
              <Button
                className="bg-amber-500 rounded text-white text-base font-bold no-underline text-center inline-block py-3 px-8"
                href="https://7figure.affiliatemarketconnect.com"
              >
                See My Top 3 Featured Products
              </Button>
            </Section>

            <Hr className="border-slate-200 my-5" />

            <Text className="text-slate-700 text-base leading-[26px] my-4 px-10">
              <strong>Pro tip:</strong> Start with ONE product. Master the promotion process.
              Then add more to your arsenal.
            </Text>

            <Text className="text-slate-700 text-base leading-[26px] my-4 px-10">
              In 4 days, I'll send you a real case study showing exactly how I took one of these
              products from $0 to $5k in 30 days.
            </Text>

            <EmailFooter
              signature={
                <>
                  Talk soon,
                  <br />
                  Tevis Johnston
                  <br />
                  7 Figure Affiliate
                </>
              }
              footerNote="You're receiving this as part of your 7-day email sequence from 7figure.affiliatemarketconnect.com"
            />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default Day3FollowUp;
