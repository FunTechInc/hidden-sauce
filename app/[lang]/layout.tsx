import type { Metadata } from "next";
import { i18n, Locale } from "@/i18n-config";
import { getDictionary } from "@/lib/dictionaries";
import { LocaleTagSwitcher } from "./_components/localeSwitcher";
import { Navigation } from "@/app/[lang]/_components/navigation";
import { AppSetup } from "@/components/AppSetup";
import { Lenis } from "@/components/Lenis";

export async function generateStaticParams() {
   return i18n.locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
   params,
}: {
   params: Promise<{ lang: string }>;
}): Promise<Metadata> {
   const { lang } = await params;
   const { meta } = await getDictionary(lang as Locale);
   return {
      title: meta.title,
      description: meta.description,
      twitter: {
         card: "summary_large_image",
         title: meta.title,
         description: meta.description,
         creator: "@funtech_inc",
         siteId: "@funtech_inc",
      },
   };
}

export default async function LangLayout({
   children,
   params,
}: Readonly<{
   children: React.ReactNode;
   params: Promise<{ lang: string }>;
}>) {
   const { lang } = await params;
   return (
      <>
         <AppSetup />
         <Lenis />
         <Navigation />
         <a
            href="#main-content"
            className="fixed left-4 top-4 z-50 -translate-y-16 bg-background px-3 py-2 text-sm text-foreground transition-transform focus-visible:translate-y-0">
            Skip to content
         </a>
         <div className="flex min-h-screen flex-col">
            <main id="main-content" className="flex-1">
               {children}
            </main>
            <footer className="bg-neutral-200 text-center text-sm">
               <p>Footer</p>
            </footer>
         </div>
         <LocaleTagSwitcher lang={lang as Locale} />
      </>
   );
}
