import type { Metadata } from "next";
import { Locale } from "@/i18n-config";
import { getDictionary } from "@/lib/dictionaries";
import { LocaleTagSwitcher } from "./_components/localeSwitcher";

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
   };
}

export default async function RootLayout({
   children,
   params,
}: Readonly<{
   children: React.ReactNode;
   params: Promise<{ lang: string }>;
}>) {
   const { lang } = await params;
   return (
      <div>
         {children}
         <LocaleTagSwitcher lang={lang as Locale} />
      </div>
   );
}
