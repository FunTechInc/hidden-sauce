import { useCallback, useRef } from "react";
import { useGsapTicker } from "./useGsapTicker";
import { useIsomorphicLayoutEffect } from "./useIsomorphicLayoutEffect";

export const useOnHovering = (
   onHovering: React.PointerEventHandler,
   onStart?: React.PointerEventHandler
): {
   onPointerLeave: React.PointerEventHandler;
   onPointerMove: React.PointerEventHandler;
} => {
   const isHovering = useRef(false);
   const pointerEvent = useRef<React.PointerEvent | undefined>(undefined);
   const onStartRef = useRef(onStart);

   useIsomorphicLayoutEffect(() => {
      onStartRef.current = onStart;
   }, [onStart]);

   useGsapTicker(() => {
      if (isHovering.current && pointerEvent.current) {
         onHovering(pointerEvent.current);
      }
   });

   const onPointerLeave = useCallback(() => {
      pointerEvent.current = undefined;
      isHovering.current = false;
   }, []);
   const onPointerMove = useCallback(
      (e: React.PointerEvent) => {
         if (!isHovering.current) {
            isHovering.current = true;
            onStartRef.current?.(e);
         }
         pointerEvent.current = e;
      },
      []
   );

   return {
      onPointerLeave,
      onPointerMove,
   };
};
