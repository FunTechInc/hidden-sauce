"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";
import { useGsapTicker } from "@/hooks/useGsapTicker";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";

export type InfinityLoopProps = {
   active?: boolean;
   /** Negative values will result in the opposite direction. default : `1` */
   speed?: number | React.RefObject<number>;
} & React.HTMLAttributes<HTMLDivElement> & {
   ref?: React.Ref<HTMLDivElement>;
};

export const InfinityLoop = ({
   active = false,
   speed = 1,
   children,
   ref,
   ...rest
}: InfinityLoopProps) => {
   const scrollerRef = useRef<HTMLDivElement>(null);

   const progress = useRef(0);
   const childWidth = useRef(0);

   // Update childWidth on mount and resize
   useIsomorphicLayoutEffect(() => {
      const updateWidth = () => {
         if (scrollerRef.current) {
            childWidth.current = scrollerRef.current.clientWidth / 2;
         }
      };
      updateWidth();
      window.addEventListener("resize", updateWidth);
      return () => window.removeEventListener("resize", updateWidth);
   }, []);

   useGsapTicker(() => {
      if (!active) return;
      const scroller = scrollerRef.current;
      if (!scroller || childWidth.current === 0) return;

      const delta = gsap.ticker.deltaRatio() / 1000;
      const speedValue =
         typeof speed === "number" ? speed : speed?.current ?? 1;
      progress.current += delta * speedValue * childWidth.current;

      // Always wrap progress between 0 and childWidth
      progress.current =
         ((progress.current % childWidth.current) + childWidth.current) %
         childWidth.current;

      scroller.style.transform = `translateX(${-progress.current}px)`;
   });

   return (
      <div ref={ref} {...rest}>
         <div
            style={{
               overflow: "hidden",
               width: "100%",
            }}>
            <div
               ref={scrollerRef}
               style={{
                  display: "flex",
                  width: "fit-content",
                  willChange: "transform",
               }}>
               {children}
               <div aria-hidden="true" style={{ display: "contents" }}>
                  {children}
               </div>
            </div>
         </div>
      </div>
   );
};

export const InfinityLoopOnView = (
   props: Omit<InfinityLoopProps, "active">
) => {
   const { isIntersecting, ref } = useIntersectionObserver<HTMLDivElement>({
      once: false,
   });
   return <InfinityLoop ref={ref} {...props} active={isIntersecting} />;
};
