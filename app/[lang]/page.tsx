import { Locale } from "@/i18n-config";
import { getDictionary } from "@/lib/dictionaries";
import Link from "next/link";

export default async function Home({
   params,
}: {
   params: Promise<{ lang: Locale }>;
}) {
   const { lang } = await params;
   const { home } = await getDictionary(lang);
   return (
      <div className="flex items-center justify-center px-4 py-32">
         <div className="flex w-full max-w-3xl flex-col items-start justify-center gap-70">
            <Link href="#trigger" className="hover:underline">
               Trigger
            </Link>
            <p id="trigger" className="text-sm font-bold md:text-base">
               {home.text}
            </p>
         </div>
      </div>
   );
}
