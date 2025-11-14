// src/components/Logo.tsx
export default function Logo() {
  return <img src="/logo.png" alt="Nova Logo" className="h-10 w-auto" />;
}

import Logo from '@/components/Logo';

<header className="flex items-center justify-between p-4 border-b">
  <Logo />
</header>
