import { useMemo, useState } from "react";
import { useIsomorphicLayoutEffect } from "./useIsomorphicLayoutEffect";

export const useMediaQuery = (
   mediaQueryType: "max" | "min",
   breakpoint: number
) => {
   const [isRange, setIsRange] = useState<boolean | null>(null);
   const query = useMemo(
      () => `(${mediaQueryType}-width: ${breakpoint}px)`,
      [mediaQueryType, breakpoint]
   );

   useIsomorphicLayoutEffect(() => {
      const mediaQueryList = window.matchMedia(query);
      const updateIsRange = () => {
         setIsRange(mediaQueryList.matches);
      };

      updateIsRange();
      mediaQueryList.addEventListener("change", updateIsRange);
      return () => {
         mediaQueryList.removeEventListener("change", updateIsRange);
      };
   }, [query]);

   return isRange;
};
