import { type Locale } from "@/i18n-config";
import { type Url } from "next/dist/shared/lib/router/router";
import { usePathname } from "next/navigation";
import { useCallback, useMemo } from "react";
import { i18n } from "@/i18n-config";

const isLocale = (value: string): value is Locale =>
   i18n.locales.includes(value as Locale);

export const useLocalePathname = () => {
   const pathname = usePathname();
   const segments = useMemo(() => pathname.split("/"), [pathname]);
   const activeLocale = isLocale(segments[1])
      ? segments[1]
      : i18n.defaultLocale;
   const basePathname = `/${segments.slice(2).join("/")}`;

   const getLocalizedHref = useCallback(
      (href: Url) => {
         if (typeof href !== "string") {
            return href;
         }
         if (href.startsWith("#") || /^https?:\/\//.test(href)) {
            return href;
         }
         const normalizedHref = href.startsWith("/") ? href : `/${href}`;
         return `/${activeLocale}${normalizedHref}`;
      },
      [activeLocale]
   );

   const getRedirectedPathname = useCallback(
      (locale: Locale) => {
         const _segments = [...segments];
         _segments[1] = locale;
         return _segments.join("/");
      },
      [segments]
   );

   return {
      pathname,
      activeLocale,
      basePathname,
      getLocalizedHref,
      getRedirectedPathname,
   };
};
