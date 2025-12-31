import {
  Section,
  Text,
  Hr,
  Link,
} from '@react-email/components';
import * as React from 'react';

interface EmailFooterProps {
  signature: React.ReactNode;
  footerNote?: string;
}

export const EmailFooter = ({ signature, footerNote }: EmailFooterProps) => {
  return (
    <>
      <Text className="text-slate-700 text-base leading-[26px] my-4 px-10">
        {signature}
      </Text>

      <Hr className="border-slate-200 my-5" />

      {footerNote && (
        <Text className="text-slate-500 text-xs leading-5 my-4 px-10">
          {footerNote}
        </Text>
      )}

      <Section className="text-center my-5 mb-2.5">
        <Link
          href="https://7figure.affiliatemarketconnect.com/unsubscribe"
          className="text-slate-500 text-xs underline"
        >
          Unsubscribe
        </Link>
      </Section>

      <Text className="text-slate-400 text-[11px] leading-[18px] text-center my-2.5 mb-5">
        21420 Plane Tree Ln, Newhall, CA 91321
      </Text>
    </>
  );
};

export default EmailFooter;
