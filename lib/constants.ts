export const ISDEV = process.env.NODE_ENV === "development";
export const ISPROD = process.env.NODE_ENV === "production";

/*===============================================
Size
===============================================*/
// same as tailwindcss breakpoints
export const BREAKPOINTS = {
   sm: 640,
   md: 768,
   lg: 1024,
   xl: 1280,
   "2xl": 1536,
};

export const stableSvh = (multiplier: number) => {
   return `calc(var(--stable-svh) * ${multiplier})`;
};
export const stableLvh = (multiplier: number) => {
   return `calc(var(--stable-lvh) * ${multiplier})`;
};

/*===============================================
Easing
===============================================*/
export const DURATION = {
   strong: 1.2,
   emphasized: 0.6,
   standard: 0.3,
};

/*===============================================
External Links
===============================================*/
export const EXTERNAL_LINKS = {
   instagram: "https://www.instagram.com/",
};

/*===============================================
Constant Routes
===============================================*/
export type ConstantRouteKeys = "sample";
export type ConstantRouteProps = {
   pathname: string;
   title: string;
};

const CONSTANT_ROUTES: Record<ConstantRouteKeys, ConstantRouteProps> =
   Object.freeze({
      sample: {
         pathname: "/sample",
         title: "sample",
      },
   });

/**
 * @param key - Key to get routing data
 */
export const getConstantRoute = (key: ConstantRouteKeys) =>
   CONSTANT_ROUTES[key];

/**
 * @param keys - Array of keys to get routing data
 */
export const getConstantRoutes = (
   ...keys: ConstantRouteKeys[]
): ConstantRouteProps[] => {
   if (keys.length === 0) {
      return Object.values(CONSTANT_ROUTES);
   }
   return keys.map((key) => CONSTANT_ROUTES[key]);
};

export const getConstantRouteKeys = (): ConstantRouteKeys[] => {
   return Object.keys(CONSTANT_ROUTES) as ConstantRouteKeys[];
};
