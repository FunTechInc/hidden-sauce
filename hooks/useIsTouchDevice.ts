import { useState } from "react";
import { useIsomorphicLayoutEffect } from "./useIsomorphicLayoutEffect";

/**
 * @description It determines whether the device is a touch device or not. When the determination switches, the state is updated.
 */
export const useIsTouchDevice = () => {
   const [isTouchDevice, setIsTouchDevice] = useState<boolean | null>(null);

   useIsomorphicLayoutEffect(() => {
      const touchQuery = window.matchMedia("(pointer: coarse)");
      const updateIsTouchDevice = () => {
         setIsTouchDevice(
            "ontouchstart" in window ||
               navigator.maxTouchPoints > 0 ||
               touchQuery.matches
         );
      };

      updateIsTouchDevice();
      touchQuery.addEventListener("change", updateIsTouchDevice);
      return () => {
         touchQuery.removeEventListener("change", updateIsTouchDevice);
      };
   }, []);

   return isTouchDevice;
};
