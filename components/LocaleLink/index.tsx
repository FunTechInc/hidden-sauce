"use client";

import { useLocalePathname } from "@/hooks/useLocalePathname";
import Link, { LinkProps } from "next/link";

export type LocaleLinkProps = LinkProps &
   React.AnchorHTMLAttributes<HTMLAnchorElement> & {
      ref?: React.Ref<HTMLAnchorElement>;
   };

export const LocaleLink = ({ href, ref, ...props }: LocaleLinkProps) => {
   const { getLocalizedHref } = useLocalePathname();
   return (
      <Link
         ref={ref}
         href={props.target === "_blank" ? href : getLocalizedHref(href)}
         {...props}
      />
   );
};
