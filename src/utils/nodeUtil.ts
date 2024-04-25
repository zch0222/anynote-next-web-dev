import { RefObject } from "react";

export function scrollToBottoms(ref: RefObject<HTMLElement>) {
    if (ref.current) {
        ref.current.scrollTop = ref.current.scrollHeight;
    }

}