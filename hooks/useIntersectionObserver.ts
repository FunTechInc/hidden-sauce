import { useRef, useState } from "react";
import { useIsomorphicLayoutEffect } from "./useIsomorphicLayoutEffect";

export type UseIntersectionObserverProps = {
   target?: React.RefObject<Element | null> | Element;
   options?: IntersectionObserverInit;
   /** default : `false` */
   once?: boolean;
   onEnter?: (entry: IntersectionObserverEntry) => void;
   onLeave?: (entry: IntersectionObserverEntry) => void;
};

export const useIntersectionObserver = <T extends Element>(
   {
      target,
      options,
      once = false,
      onEnter,
      onLeave,
   }: UseIntersectionObserverProps = {},
   dependencies?: React.DependencyList
) => {
   const ref = useRef<T>(null);
   const [isIntersecting, setIsIntersecting] = useState(false);
   const onEnterRef = useRef(onEnter);
   const onLeaveRef = useRef(onLeave);

   useIsomorphicLayoutEffect(() => {
      onEnterRef.current = onEnter;
      onLeaveRef.current = onLeave;
   }, [onEnter, onLeave]);

   useIsomorphicLayoutEffect(() => {
      const _target =
         target instanceof Element ? target : target?.current ?? ref.current;
      if (!_target) return;

      const callbackEvent = (
         entries: IntersectionObserverEntry[],
         observer: IntersectionObserver
      ) => {
         entries.forEach((entry) => {
            setIsIntersecting((current) =>
               current === entry.isIntersecting
                  ? current
                  : entry.isIntersecting
            );
            if (entry.isIntersecting) {
               onEnterRef.current?.(entry);
               if (once) observer.unobserve(entry.target);
            } else if (!entry.isIntersecting) {
               onLeaveRef.current?.(entry);
            }
         });
      };

      const observer = new IntersectionObserver(callbackEvent, options);
      observer.observe(_target);

      return () => {
         observer.disconnect();
      };
   }, dependencies);

   return { ref, isIntersecting };
};
