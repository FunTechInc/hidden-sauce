import Image from "next/image";
import parse, { Element } from "html-react-parser";

export const HTMLConverter = ({ children }: { children: string }) => {
   return parse(children, {
      replace: (domNode) => {
         if (
            domNode instanceof Element &&
            domNode.attribs &&
            domNode.name === "img"
         ) {
            const { src, alt, width, height } = domNode.attribs;
            return (
               <Image
                  src={src}
                  width={Number(width) || 1}
                  height={Number(height) || 1}
                  alt={alt || ""}
               />
            );
         }
      },
   });
};
