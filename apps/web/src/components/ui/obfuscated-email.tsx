'use client';

import { useEffect, useState } from 'react';

interface ObfuscatedEmailProps {
  user: string;
  domain: string;
  link?: boolean;
  className?: string;
}

export function ObfuscatedEmail({ user, domain, link, className }: ObfuscatedEmailProps) {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    setEmail(`${user}@${domain}`);
  }, [user, domain]);

  if (!email) {
    return <span className={className}>[email protégé]</span>;
  }

  if (link) {
    return (
      <a href={`mailto:${email}`} className={className}>
        {email}
      </a>
    );
  }

  return <span className={className}>{email}</span>;
}
