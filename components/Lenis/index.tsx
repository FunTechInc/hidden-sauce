"use client";

import "lenis/dist/lenis.css";
import type { LenisRef } from "lenis/react";
import { ReactLenis, useLenis } from "lenis/react";
import { useEffect, useRef } from "react";
import { useGsapTicker } from "@/hooks/useGsapTicker";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { useStore } from "@/lib/store";
import { useLocalePathname } from "@/hooks/useLocalePathname";

export function Lenis() {
   const lenisRef = useRef<LenisRef>(null);
   useGsapTicker((time: number) => {
      if (lenisRef.current?.lenis) {
         lenisRef.current.lenis.raf(time * 1000);
      }
   });
   return (
      <>
         <ReactLenis
            ref={lenisRef}
            root={true}
            options={{
               lerp: 0.125,
               autoRaf: false,
               anchors: true,
               autoToggle: true,
               prevent: (node: Element | null) =>
                  node?.nodeName === "VERCEL-LIVE-FEEDBACK",
            }}
         />
         <ScrollTriggerIntegration />
         <ScrollPositionReset />
         <ScrollLock />
      </>
   );
}

const ScrollTriggerIntegration = () => {
   const lenis = useLenis();
   useEffect(() => {
      if (!lenis) return;
      ScrollTrigger.refresh();
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.lagSmoothing(0);
   }, [lenis]);
   return null;
};

const ScrollPositionReset = () => {
   const lenis = useLenis();
   const { basePathname: pathname } = useLocalePathname();
   const isPopStateRef = useRef(false);
   const prevPathnameRef = useRef<string | null>(null);

   useEffect(() => {
      const handlePopState = () => {
         isPopStateRef.current = true;
      };
      window.addEventListener("popstate", handlePopState);
      return () => {
         window.removeEventListener("popstate", handlePopState);
      };
   }, []);

   useEffect(() => {
      if (!lenis) return;
      if (prevPathnameRef.current === null) {
         prevPathnameRef.current = pathname;
         return;
      }
      if (prevPathnameRef.current === pathname) {
         return;
      }
      if (isPopStateRef.current) {
         isPopStateRef.current = false;
         prevPathnameRef.current = pathname;
         return;
      }
      lenis.scrollTo(0, { immediate: true });
      prevPathnameRef.current = pathname;
   }, [lenis, pathname]);

   return null;
};

const ScrollLock = () => {
   const isNavOpened = useStore((state) => state.isNavOpened);
   useEffect(() => {
      const isOverflowHidden = isNavOpened;
      document.documentElement.classList.toggle(
         "overflow-hidden",
         isOverflowHidden
      );
   }, [isNavOpened]);
   return null;
};
