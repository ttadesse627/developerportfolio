// app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'sonner'; // Use the simpler Toaster instead

import ThemeScript from '../components/ThemeScript';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Providers } from '@/providers/ThemeProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'DevPortfolio - Software Developer',
  description: 'Professional portfolio of a software developer',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className={`${inter.className} bg-background-light dark:bg-background-dark`}>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </Providers>
        <Toaster 
          position="bottom-right"
          expand={true}
          richColors
          visibleToasts={3}
          gap={12}
          toastOptions={{
            classNames: {
              toast: '!border !shadow-lg',
              title: 'font-semibold',
              description: 'text-gray-600',
              success: '!bg-emerald-50 !text-emerald-900 !border-emerald-200',
              error: '!bg-rose-50 !text-rose-900 !border-rose-200',
              info: '!bg-blue-50 !text-blue-900 !border-blue-200',
              warning: '!bg-amber-50 !text-amber-900 !border-amber-200',
            },
          }}
        />
      </body>
    </html>
  );
}