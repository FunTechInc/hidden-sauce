"use client";

import Link from "next/link";
import { i18n, Locale } from "@/i18n-config";
import { useLocalePathname } from "@/hooks/useLocalePathname";
import { useEffect } from "react";

export default function LocaleSwitcher() {
   const { getRedirectedPathname, activeLocale } = useLocalePathname();

   return (
      <div className="flex gap-4">
         <p>Locale:</p>
         <ul className="flex gap-2">
            {i18n.locales.map((locale) => {
               return (
                  <li key={locale} className="text-sm">
                     <Link
                        href={getRedirectedPathname(locale)}
                        className={activeLocale === locale ? "" : ""}
                        scroll={false}>
                        {locale}
                     </Link>
                  </li>
               );
            })}
         </ul>
      </div>
   );
}

export const LocaleTagSwitcher = ({ lang }: { lang: Locale }) => {
   useEffect(() => {
      document.documentElement.lang = lang;
   }, [lang]);
   return null;
};
