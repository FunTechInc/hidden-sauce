import "server-only";

import * as CMS from "@/lib/cms";
import { CategoryNav } from "./_components/CategoryNav";

const Layout = async ({ children }: { children: React.ReactNode }) => {
   const categoryList = await CMS.getList<CMS.Categories>({
      endpoint: "categories",
      perPage: 100,
   });

   return (
      <div className="flex min-h-screen items-center justify-center flex-col overflow-hidden">
         <nav aria-label="Sample categories">
            <ul style={{ display: "flex", gap: "16px" }}>
               {categoryList.contents.map(
                  (category: CMS.Categories) => (
                     <li key={category.id}>
                        <CategoryNav id={category.id}>
                           {category.name}
                        </CategoryNav>
                     </li>
                  )
               )}
            </ul>
         </nav>
         {children}
      </div>
   );
};

export default Layout;
