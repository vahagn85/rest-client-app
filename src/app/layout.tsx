import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Toaster } from '@/components/ui/sonner';
import { getLocale } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Rest Client App',
  description: 'Rest Client App with Next.js',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html lang={locale} suppressHydrationWarning={true}>
      <body
        suppressHydrationWarning={true}
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider>
          <div className="container mx-auto flex flex-col min-h-screen px-4">
            <Header />
            <main className="flex-1 py-4">{children}</main>
            <Footer />
          </div>
          <Toaster
            toastOptions={{
              classNames: {
                error: '!border-red-400 !bg-red-50',
                success: '!border-green-400 !bg-green-50',
                warning: '!text-yellow-200',
                info: '!bg-blue-200',
              },
            }}
          />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
