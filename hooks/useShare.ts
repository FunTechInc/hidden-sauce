import { useMemo, useState } from "react";

type UseShareProps = {
   shareUrl: string;
   /** window.navigator.share API seems to automatically insert siteorigin, so just pass the path */
   sharePath?: string;
   shareTitle?: string;
   /** size of new window , default:600 */
   width?: number;
   /** size of new window , default:800 */
   height?: number;
};

export const useShare = ({
   shareUrl,
   sharePath,
   shareTitle = "",
   width = 600,
   height = 800,
}: UseShareProps) => {
   const encodedUrl = useMemo(() => encodeURIComponent(shareUrl), [shareUrl]);
   const encodedTitle = useMemo(
      () => encodeURIComponent(shareTitle),
      [shareTitle]
   );
   const windowSize = useMemo(
      () => `height=${height},width=${width}`,
      [height, width]
   );

   const Facebook = useMemo(
      () => ({
         onClick: () => {
            window.open(
               `https://www.facebook.com/sharer.php?u=${encodedUrl}&t=${encodedTitle}`,
               "newwindow",
               windowSize
            );
         },
      }),
      [encodedUrl, encodedTitle, windowSize]
   );

   const X = useMemo(
      () => ({
         onClick: () => {
            window.open(
               `https://twitter.com/share?url=${encodedUrl}&text=${encodedTitle}`,
               "newwindow",
               windowSize
            );
         },
      }),
      [encodedUrl, windowSize, encodedTitle]
   );

   const LINE = useMemo(
      () => ({
         onClick: () => {
            window.open(
               `https://social-plugins.line.me/lineit/share?url=${encodedUrl}&text=${encodedTitle}`,
               "newwindow",
               windowSize
            );
         },
      }),
      [encodedUrl, windowSize, encodedTitle]
   );

   const share = useMemo(
      () => ({
         onClick: async () => {
            if (!navigator.share) {
               alert("このブラウザは共有機能に対応していません。");
               return;
            }
            try {
               await window.navigator.share({
                  title: shareTitle,
                  url: sharePath ?? shareUrl,
               });
            } catch {
               return;
            }
         },
      }),
      [shareTitle, shareUrl, sharePath]
   );

   const [isCopied, setIsCopied] = useState(false);
   const copy = useMemo(
      () => ({
         onClick: () => {
            navigator.clipboard.writeText(shareUrl).then(() => {
               setIsCopied(true);
            });
         },
      }),
      [shareUrl]
   );

   return {
      Facebook,
      X,
      LINE,
      share,
      copy,
      isCopied,
   };
};
