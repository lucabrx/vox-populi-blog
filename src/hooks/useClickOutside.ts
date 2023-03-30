import { type RefObject, useEffect } from "react";

type Event = MouseEvent | TouchEvent

export const useClickOutside = <T extends HTMLElement = HTMLElement>(ref: RefObject<T>, handler: (event: Event) => void) => {
  useEffect(
    () => {
      const listener = (event: Event) => {
        const el = ref?.current
        if (!el || el.contains(event?.target as Node) || null) {
          return;
        }

        handler(event) // calls only if click outside of the element happens
      };

      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);

      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      };
    },

    [ref, handler] // reload only if ref or handler changes
  );
}