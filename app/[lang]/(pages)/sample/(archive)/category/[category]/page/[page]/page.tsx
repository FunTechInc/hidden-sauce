import * as CMS from "@/lib/cms";
import { getDictionary } from "@/lib/dictionaries";
import { Archive } from "../../../../Archive";
import { Locale } from "@/i18n-config";
import { getPageRange } from "@/lib/utils/paging";

export async function generateMetadata({
   params,
}: {
   params: Promise<{ page: number; category: string; lang: Locale }>;
}) {
   const { page, category, lang } = await params;
   const { meta } = await getDictionary(lang);
   const { name: categoryName } = await CMS.get<CMS.Categories>({
      endpoint: "categories",
      contentId: category,
   });
   return {
      title: `${meta.sample.title}(${categoryName})(${page}p)`,
   };
}

export const generateStaticParams = async ({
   params,
}: {
   params: { lang: string; category: string };
}) => {
   const { category } = params;
   const { totalCount } = await CMS.getList({
      endpoint: "news",
      category: category,
   });
   if (totalCount === 0) return [];
   return getPageRange(totalCount, CMS.PER_PAGE).map((page) => ({
      page: `${page}`,
   }));
};

const Page = async ({
   params,
}: {
   params: Promise<{ page: number; category: string }>;
}) => {
   const { page, category } = await params;
   return <Archive page={page} category={category} />;
};

export default Page;
