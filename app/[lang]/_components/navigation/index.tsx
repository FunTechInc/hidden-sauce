"use client";

import cn from "classnames";
import { usePathname } from "next/navigation";
import { useStore } from "@/lib/store";
import LocaleSwitcher from "../localeSwitcher";
import { LocaleLink } from "@/components/LocaleLink";

const LINKS = [
   { href: "/", label: "home" },
   { href: "/sample", label: "sample" },
];

export const Navigation = () => {
   const pathname = usePathname();
   const setIsNavOpened = useStore((state) => state.setIsNavOpened);
   const isNavOpened = useStore((state) => state.isNavOpened);
   return (
      <nav className="fixed z-2 flex flex-col uppercase font-mono pl-8 top-8 pt-8">
         <div className="inline-flex">
            <h1>Hidden Sauce</h1>
            <span>{pathname}</span>
         </div>

         <ul className="pl-[24px]">
            {LINKS.map((link) => (
               <li key={link.href}>
                  <LocaleLink
                     href={link.href}
                     className={cn(
                        "relative",
                        pathname === link.href &&
                           "before:content-['👉'] before:absolute before:left-[-24px]"
                     )}>
                     {link.label}
                  </LocaleLink>
               </li>
            ))}
         </ul>
         <button
            className="cursor-pointer"
            onClick={() => setIsNavOpened(!isNavOpened)}>
            {isNavOpened ? "Close" : "Open"}
         </button>
         <LocaleSwitcher />
      </nav>
   );
};
