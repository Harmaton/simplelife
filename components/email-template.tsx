import * as React from 'react';

interface EmailTemplateProps {
  to: string;
  subject: string;
  replyContent: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  to,
  subject,
  replyContent,
}) => (
  <div>
    <h1>{to}</h1>
    <h3>Subject: {subject}</h3>
    <div style={{ whiteSpace: 'pre-wrap' }}>{replyContent}</div>
  </div>
);
