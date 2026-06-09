"use client";

import cn from "classnames";
import { useStore } from "@/lib/store";
import LocaleSwitcher from "../localeSwitcher";
import { LocaleLink } from "@/components/LocaleLink";
import { useLocalePathname } from "@/hooks/useLocalePathname";

const LINKS = [
   { href: "/", label: "home" },
   { href: "/sample", label: "sample" },
];

export const Navigation = () => {
   const { pathname, basePathname } = useLocalePathname();
   const toggleNavOpened = useStore((state) => state.toggleNavOpened);
   const isNavOpened = useStore((state) => state.isNavOpened);
   return (
      <nav
         aria-label="Primary navigation"
         className="fixed top-8 z-2 flex flex-col pt-8 pl-8 font-mono uppercase">
         <div className="inline-flex">
            <h1 translate="no">Hidden Sauce</h1>
            <span>{pathname}</span>
         </div>

         <ul id="site-navigation-list" className="pl-6">
            {LINKS.map((link) => {
               const isActive =
                  basePathname === link.href ||
                  (link.href !== "/" &&
                     basePathname.startsWith(`${link.href}/`));
               return (
                  <li key={link.href}>
                     <LocaleLink
                        href={link.href}
                        aria-current={isActive ? "page" : undefined}
                        className={cn(
                           "relative hover:underline",
                           isActive &&
                              "before:absolute before:-left-4 before:top-1/2 before:size-1.5 before:-translate-y-1/2 before:rounded-full before:bg-current before:content-['']"
                        )}>
                        {link.label}
                     </LocaleLink>
                  </li>
               );
            })}
         </ul>
         <button
            type="button"
            aria-controls="site-navigation-list"
            aria-expanded={isNavOpened}
            className="cursor-pointer hover:underline"
            onClick={toggleNavOpened}>
            {isNavOpened ? "Close" : "Open"}
         </button>
         <LocaleSwitcher />
      </nav>
   );
};
