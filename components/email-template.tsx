import * as React from 'react';
import { Button } from './ui/button';
import Link from 'next/link';

interface EmailTemplateProps {
  to: string;
  subject: string;
  replyContent: string;
  name: string | null
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  to,
  subject,
  replyContent,
  name
}) => (
  <div>
    <h1>{to}</h1>
    <h3> {subject}</h3>
    <h4>Bienvenido/a a bordo, {name}</h4>
    <div style={{ whiteSpace: 'pre-wrap' }}>{replyContent}</div>
    <div>
      <Link href={'https://simplelifeofficial.com/tutor/profile'}>
      <Button className='m-auto mt-2 mb-2'>
       Comienza con tu perfil
      </Button>
      </Link>
    </div>
  </div>
);
