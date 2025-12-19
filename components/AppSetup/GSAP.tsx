"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ISDEV } from "@/lib/constants";

export const GSAP = () => {
   gsap.registerPlugin(ScrollTrigger);
   ScrollTrigger.defaults({
      markers: ISDEV,
   });
   gsap.registerPlugin(useGSAP);
   return null;
};
