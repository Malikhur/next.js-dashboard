import './globals.css';
import { ReactNode } from 'react';
import ClientLayout from './components/ClientLayout';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
export const metadata = {
  title: 'Next.js Dashboard',
  description: 'A simple dashboard built with Next.js and React Query',
};
export const dynamic = 'force-dynamic';
export const revalidate = 0; 
export const fetchCache = 'force-no-store'; 