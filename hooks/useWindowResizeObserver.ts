import { useRef } from "react";
import { useIsomorphicLayoutEffect } from "./useIsomorphicLayoutEffect";

type UseWindowResizeObserverProps = {
   onResize: ({
      winW,
      winH,
      initWinW,
   }: {
      winW: number;
      winH: number;
      initWinW: number;
   }) => void;
   /** default:100 */
   debounce?: number;
   dependencies?: React.DependencyList;
};

export const useWindowResizeObserver = ({
   onResize,
   debounce = 100,
   dependencies = [],
}: UseWindowResizeObserverProps) => {
   const initialWidth = useRef(0);
   const timeoutID = useRef<number | undefined>(undefined);
   const onResizeRef = useRef(onResize);
   const debounceRef = useRef(debounce);

   useIsomorphicLayoutEffect(() => {
      onResizeRef.current = onResize;
      debounceRef.current = debounce;
   }, [onResize, debounce]);

   useIsomorphicLayoutEffect(() => {
      initialWidth.current = window.innerWidth;
      const callbackEvent = () => {
         window.clearTimeout(timeoutID.current);
         timeoutID.current = window.setTimeout(() => {
            onResizeRef.current({
               winW: window.innerWidth,
               winH: window.innerHeight,
               initWinW: initialWidth.current,
            });
         }, debounceRef.current);
      };

      window.addEventListener("resize", callbackEvent);
      return () => {
         window.removeEventListener("resize", callbackEvent);
         window.clearTimeout(timeoutID.current);
      };
   }, dependencies);
};
