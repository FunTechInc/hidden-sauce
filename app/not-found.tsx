import type { Metadata } from "next";
import Link from "next/link";

const metadata: Metadata = {
   title: "Sorry , This page doesn’t exist",
};

const Page = () => {
   return (
      <div className="flex min-h-screen items-center justify-center bg-amber-600">
         <h2>Not Found</h2>
         <p>Could not find requested resource</p>
         <Link href="/">Return Home</Link>
      </div>
   );
};

export default Page;
export { metadata };
