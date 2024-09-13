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
    <h3>{subject}</h3>
    <div style={{ whiteSpace: 'pre-wrap' }}>{replyContent}</div>
    <div>
      <p>Para comenzar con tu perfil, visita: <a href="https://simplelifeofficial.com/tutor/profile">https://simplelifeofficial.com/tutor/profile</a></p>
    </div>
  </div>
);