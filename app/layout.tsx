import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/providers/Theme';

import { Playfair_Display, DM_Sans, Inter } from 'next/font/google';
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-display',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-body',
});

export const metadata: Metadata = {
  title: {
    default: 'Book Zambales',
    template: '%s | Book Zambales',
  },
  description:
    'Discover and book the best resorts, activities, hiking trips, and tour packages in Zambales, Philippines. Connect with local hosts and plan your perfect Zambales getaway.',
  keywords: [
    'Zambales tourism',
    'Zambales resorts',
    'Zambales activities',
    'book Zambales',
    'Philippines travel',
    'Zambales hiking',
    'tour packages Zambales',
  ],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL!),
  openGraph: {
    type: 'website',
    locale: 'en_PH',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: 'Book Zambales',
    title: 'Book Zambales — Discover Zambales Tourism',
    description:
      'Browse and book resorts, activities, hiking trips, and tour packages across Zambales, Philippines.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='en'
      className={cn(
        'h-full',
        'antialiased',
        dmSans.variable,
        playfair.variable,
        'font-sans',
        inter.variable,
      )}
      suppressHydrationWarning
    >
      <body className='min-h-full'>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
