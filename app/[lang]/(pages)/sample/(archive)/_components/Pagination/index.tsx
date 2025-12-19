import "server-only";

import { getPaginationRange } from "@/lib/utils/paging";
import { PER_PAGE } from "@/lib/cms";
import { LocaleLink } from "@/components/LocaleLink";

export const NavArrow = ({ style }: { style?: React.CSSProperties }) => {
   return <span style={style}>＞</span>;
};

export const Pagination = ({
   page = 1,
   totalCount,
   category,
   ...rest
}: {
   page?: number;
   totalCount: number;
   category?: string;
} & React.HTMLAttributes<HTMLDivElement>) => {
   const currentPage = +page; // to number
   const range = getPaginationRange(currentPage, totalCount, PER_PAGE);

   const hrefPath = category
      ? `/sample/category/${category}/page`
      : "/sample/page";

   if (range.length < 2) {
      return null;
   }

   return (
      <div
         {...rest}
         style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 24,
            ...rest.style,
         }}>
         {currentPage !== 1 && (
            <LocaleLink href={`${hrefPath}/${currentPage - 1}`}>
               <NavArrow
                  style={{ rotate: "180deg", display: "inline-block" }}
               />
            </LocaleLink>
         )}
         {range.map((page, i) => {
            if (typeof page === "string") {
               return <p key={i}>{page}</p>;
            } else {
               return (
                  <LocaleLink
                     href={`${hrefPath}/${page}`}
                     style={{
                        color: currentPage === page ? "red" : "",
                     }}
                     key={i}>
                     {page}
                  </LocaleLink>
               );
            }
         })}
         {currentPage !== range[range.length - 1] && (
            <LocaleLink href={`${hrefPath}/${currentPage + 1}`}>
               <NavArrow />
            </LocaleLink>
         )}
      </div>
   );
};
