import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/css/globals.css";
import { Navigation } from "@/app/[lang]/_components/navigation";
import { Lenis } from "@/components/Lenis";
import { AppSetup } from "@/components/AppSetup";
import { i18n } from "@/i18n-config";
import { getDictionary } from "@/lib/dictionaries";

const geistSans = Geist({
   variable: "--font-geist-sans",
   subsets: ["latin"],
});

const geistMono = Geist_Mono({
   variable: "--font-geist-mono",
   subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
   const { meta } = await getDictionary("ja");
   return {
      title: meta.title,
      description: meta.description,
      twitter: {
         card: "summary_large_image",
         title: meta.title,
         creator: "@funtech_inc",
         siteId: "@funtech_inc",
      },
   };
}

export async function generateStaticParams() {
   return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang="ja">
         <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
            <AppSetup />
            <Lenis />
            <Navigation />
            <main>{children}</main>
         </body>
      </html>
   );
}
