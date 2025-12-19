"use client";

import { forwardRef } from "react";
import { useLocalePathname } from "@/hooks/useLocalePathname";
import Link, { LinkProps } from "next/link";

export type LocaleLinkProps = LinkProps &
   React.AnchorHTMLAttributes<HTMLAnchorElement>;

export const LocaleLink = forwardRef<HTMLAnchorElement, LocaleLinkProps>(
   ({ href, ...props }, ref) => {
      const { getLocalizedHref } = useLocalePathname();
      return (
         <Link
            ref={ref}
            href={props.target === "_blank" ? href : getLocalizedHref(href)}
            {...props}
         />
      );
   }
);

LocaleLink.displayName = "LocaleLink";
