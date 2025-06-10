'use client';

import { ReactQueryProvider } from '@/app/providers/ReactQueryProvider';
import { Toaster } from 'sonner';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryProvider>
      {children}
      <Toaster richColors position="top-right" />
    </ReactQueryProvider>
  );
}
