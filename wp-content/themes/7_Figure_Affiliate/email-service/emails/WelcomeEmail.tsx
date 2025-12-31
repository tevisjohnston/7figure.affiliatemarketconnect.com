import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Text,
  Button,
  Hr,
  Link,
  Tailwind,
} from '@react-email/components';
import * as React from 'react';
import { EmailFooter } from './components/EmailFooter';

interface WelcomeEmailProps {
  name: string;
}

export const WelcomeEmail = ({ name }: WelcomeEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Your Step-by-Step Blueprint to $5k/Month is Ready!</Preview>
      <Tailwind>
        <Body className="bg-[#f6f9fc] font-sans">
          <Container className="bg-white mx-auto pt-5 pb-12 mb-16 max-w-[700px]">
            <h1 className="text-slate-900 text-lg font-bold my-10 px-10">
              Welcome, {name}! 🎉
            </h1>

            <Text className="text-slate-700 text-base leading-[26px] my-4 px-10">
              Click on the link to download:{' '}
              <Link
                className="underline"
                href="https://7figure.affiliatemarketconnect.com/wp-content/uploads/2025/12/The-Step-by-Step-Blueprint-to-dollar5kMonth-1.pdf"
              >
                The Step-by-Step Blueprint to $5k/Month
              </Link>
            </Text>

            <Text className="text-slate-700 text-base leading-[26px] my-4 px-10">
              This blueprint contains the exact system I use to generate consistent income
              with my online business.
            </Text>

            <Text className="text-slate-700 text-base leading-[26px] my-4 px-10">
              You are about to discover:
            </Text>

            <Section className="px-10">
              <Text className="text-slate-700 text-sm leading-7 my-2">
                <strong>✓ The 4-step framework to create a powerful system that converts traffic into revenue</strong>
              </Text>
              <Text className="text-slate-700 text-sm leading-7 my-2">
                <strong>✓ Where to find winning products that are proven to convert</strong>
              </Text>
              <Text className="text-slate-700 text-sm leading-7 my-2">
                <strong>✓ How to build trust with your audience (without being pushy)</strong>
              </Text>
              <Text className="text-slate-700 text-sm leading-7 my-2">
                <strong>✓ The #1 traffic source to get guaranteed ready-to-buy customers</strong>
              </Text>
            </Section>

            <Section className="py-7 text-center">
              <Button
                className="bg-amber-500 rounded text-white text-base font-bold no-underline text-center inline-block py-3 px-6"
                href="https://7figure.affiliatemarketconnect.com/products"
              >
                View My Recommended Products
              </Button>
            </Section>

            <Hr className="border-slate-200 my-5" />

            <Text className="text-slate-700 text-base leading-[26px] my-4 px-10">
              Over the next 7 days, I'll be sending you additional strategies and case studies
              to help you implement this system as quickly as possible.
            </Text>

            <Text className="text-slate-700 text-base leading-[26px] my-4 px-10">
              <strong>Tomorrow:</strong> I'll share how I choose which products to promote
              (this alone will save you months of trial and error).
            </Text>

            <EmailFooter
              signature={
                <>
                  To your success,
                  <br />
                  Tevis Johnston
                  <br />
                  7 Figure Affiliate
                </>
              }
            />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default WelcomeEmail;
