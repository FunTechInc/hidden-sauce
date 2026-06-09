"use client";

import { useRef, useEffect, useCallback } from "react";
import { promiseMaker } from "@/lib/utils/promiseMaker";

export type ModalButtonProps = {
   dialog: React.DialogHTMLAttributes<HTMLDialogElement>;
   /** set focus to `focusTarget` when the modal is opened */
   focusTarget?: React.RefObject<HTMLElement | null>;
   onOpen?: (dialog: Element) => void;
   onClose?: (dialog: Element) => void;
   /** scroll lock behavior. default : `true` */
   scrollLock?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement> & {
   ref?: React.Ref<HTMLButtonElement>;
};

type StyleStore = {
   paddingRight: number;
   scrollbarWidth: number;
};

const DIALOG_STYLE: React.CSSProperties = {
   border: "none",
   background: "none",
   maxWidth: "100%",
   maxHeight: "100%",
   width: "100%",
   height: "100%",
   padding: "0",
   pointerEvents: "auto",
};

export const MODAL_CLASSNAME = {
   close: "spice__modal_close",
   scrollArea: "js_modal_scroll_area",
};

const getPaddingRight = () =>
   parseInt(getComputedStyle(document.documentElement).paddingRight, 10) || 0;
const getScrollbarWidth = () =>
   window.innerWidth - document.documentElement.clientWidth;

const toggleScrollLock = (
   lock: boolean,
   { paddingRight, scrollbarWidth }: StyleStore
) => {
   const htmlRootStyle = document.documentElement.style;
   const bodyStyle = document.body.style;
   const adjustedPaddingRight = lock
      ? paddingRight + scrollbarWidth
      : paddingRight - scrollbarWidth;
   htmlRootStyle.paddingRight = `${adjustedPaddingRight}px`;
   htmlRootStyle.scrollbarGutter = lock ? "auto" : "";
   bodyStyle.overflow = lock ? "hidden" : "";
};

export const ModalButton = ({
   dialog,
   onOpen,
   onClose,
   focusTarget,
   scrollLock = true,
   ref,
   ...rest
}: ModalButtonProps) => {
   const dialogRef = useRef<HTMLDialogElement>(null);
   const styleStore = useRef<StyleStore>({
      paddingRight: 0,
      scrollbarWidth: 0,
   });

   const showModal = useCallback(() => {
      const dialogElement = dialogRef.current;
      if (!dialogElement) return;
      if (scrollLock) {
         styleStore.current.paddingRight = getPaddingRight();
         styleStore.current.scrollbarWidth = getScrollbarWidth();
         toggleScrollLock(true, styleStore.current);
      }
      dialogElement.showModal();
      if (focusTarget?.current) {
         focusTarget.current.focus();
      }
      dialogElement
         .getElementsByClassName(MODAL_CLASSNAME.scrollArea)[0]
         ?.scrollTo(0, 0);
      onOpen?.(dialogElement);
   }, [onOpen, scrollLock, focusTarget]);

   const closeModal = useCallback(async () => {
      const dialogElement = dialogRef.current;
      if (!dialogElement) return;
      if (onClose) {
         await promiseMaker(onClose(dialogElement));
      }
      if (scrollLock) {
         styleStore.current.paddingRight = getPaddingRight();
         toggleScrollLock(false, styleStore.current);
      }
      dialogElement.close();
   }, [onClose, scrollLock]);

   // close the modal when ‘spice__modal_close’ is clicked.
   useEffect(() => {
      const dialogElement = dialogRef.current;
      if (!dialogElement) return;
      const closeBtn = dialogElement.querySelectorAll(
         `.${MODAL_CLASSNAME.close}`
      );
      closeBtn.forEach((element) =>
         element.addEventListener("click", closeModal)
      );
      return () =>
         closeBtn.forEach((element) =>
            element.removeEventListener("click", closeModal)
         );
   }, [closeModal]);

   // close the modal when the Esc key on the keyboard is pressed.
   useEffect(() => {
      const keyDownHandler = (event: globalThis.KeyboardEvent) => {
         const isOpen = dialogRef.current?.hasAttribute("open");
         if (isOpen && event.key === "Escape") closeModal();
      };
      window.addEventListener("keydown", keyDownHandler);
      return () => window.removeEventListener("keydown", keyDownHandler);
   }, [closeModal]);

   return (
      <>
         <button
            ref={ref}
            {...rest}
            onClick={(e) => {
               rest?.onClick?.(e);
               if (!e.defaultPrevented) {
                  showModal();
               }
            }}
         />
         <dialog
            ref={dialogRef}
            {...dialog}
            onClick={(e: React.MouseEvent<HTMLDialogElement>) => {
               if (e.target === dialogRef.current) closeModal();
               dialog.onClick?.(e);
            }}
            style={{
               ...DIALOG_STYLE,
               ...(dialog.style || {}),
            }}
         />
      </>
   );
};
