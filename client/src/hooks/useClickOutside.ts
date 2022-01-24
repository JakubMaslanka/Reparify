import { useEffect, useRef } from "react";

function useClickOutside(handler: () => void) {
  const domNode: any = useRef();

  useEffect(() => {
    const onCloseHandler = (e: Event) => {
      if (domNode.current && !domNode.current.contains(e.target)) {
        handler();
      }
    };
    document.addEventListener('mousedown', onCloseHandler);

    return () => (document.removeEventListener('mousedown', onCloseHandler));
  });

  return domNode;
}

export default useClickOutside;