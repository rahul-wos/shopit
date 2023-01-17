import { useRef, useEffect } from "react";

export const useInitialRenderSkip = () => {
  const firstMount = useRef(true);
  useEffect(() => {
    if (firstMount.current === true) {
      firstMount.current = false;
    }
  }, []);
  return firstMount.current;
};
