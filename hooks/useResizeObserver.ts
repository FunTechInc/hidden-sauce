import { useRef } from "react";
import { useIsomorphicLayoutEffect } from "./useIsomorphicLayoutEffect";

type UseResizeObserverProps = {
   target?: React.RefObject<Element | null> | Element;
   onResize?: (entry: Element) => void;
   /** default:100 */
   debounce?: number;
};

export const useResizeObserver = (
   { target, onResize, debounce = 100 }: UseResizeObserverProps = {},
   dependencies?: React.DependencyList
) => {
   const ref = useRef<Element | null>(null);
   const timeoutID = useRef<number | undefined>(undefined);
   const isInitialRender = useRef(true);
   const onResizeRef = useRef(onResize);
   const debounceRef = useRef(debounce);

   useIsomorphicLayoutEffect(() => {
      onResizeRef.current = onResize;
      debounceRef.current = debounce;
   }, [onResize, debounce]);

   useIsomorphicLayoutEffect(() => {
      const _target =
         target instanceof Element ? target : target?.current ?? ref.current;
      if (!_target) return;

      isInitialRender.current = true;
      const resizeObserver = new ResizeObserver((entries) => {
         const entry = entries[0]?.target;
         if (!entry) return;
         window.clearTimeout(timeoutID.current);
         timeoutID.current = window.setTimeout(() => {
            if (isInitialRender.current) {
               isInitialRender.current = false;
               return;
            }
            onResizeRef.current?.(entry);
         }, debounceRef.current);
      });
      resizeObserver.observe(_target);
      return () => {
         resizeObserver.disconnect();
         window.clearTimeout(timeoutID.current);
      };
   }, dependencies);

   return ref;
};
