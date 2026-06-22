import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Header, Footer, HreflangTags } from "@/components";
import { generateHomeMetadata } from "@/lib/metadata";
import "../globals.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const metadata = generateHomeMetadata();
  return {
    ...metadata[locale as "en" | "ja"],
    metadataBase: new URL("https://kumarhamamatsu.com"),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale} className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-full flex flex-col bg-cream text-charcoal font-sans">
        <a href="#main-content" className="sr-only skip-link">
          Skip to main content
        </a>
        <HreflangTags locale={locale} />
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main id="main-content" className="flex-1">{children}</main>
          <Footer locale={locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
