import * as CMS from "@/lib/cms";
import { HTMLConverter } from "@/components/HTMLConverter";
import type { Metadata } from "next";
import s from "@/css/article.module.scss";

export async function generateMetadata({
   params,
}: {
   params: Promise<{ id: string }>;
}): Promise<Metadata> {
   const { id } = await params;
   const blog = await CMS.get({
      contentId: id,
      endpoint: "news",
   });
   return {
      title: blog.title,
   };
}

export async function generateStaticParams() {
   const news = await CMS.getAllContentIds({ endpoint: "news" });
   return news.map((id) => ({
      id: id,
   }));
}

const Single = async ({ params }: { params: Promise<{ id: string }> }) => {
   const { id } = await params;

   const content = await CMS.get({
      endpoint: "news",
      contentId: id,
   });

   return (
      <article className="mt-80 bg-black text-white max-w-6xl mx-auto">
         <div>
            <h1 style={{ marginBottom: "120px", fontSize: "40px" }}>
               {content.title}
            </h1>
            <div className={s.article}>
               <div>
                  <HTMLConverter>{content.content}</HTMLConverter>
               </div>
            </div>
         </div>
      </article>
   );
};

export default Single;
