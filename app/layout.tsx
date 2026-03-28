import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/providers/Theme';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className='min-h-full flex flex-col'>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
