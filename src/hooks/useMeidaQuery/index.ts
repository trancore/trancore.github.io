import { useEffect, useState } from "react";

export function useMediaQuery() {
  const [windowWidth, setWindowWidth] = useState<number | null>(null);
  const [isPC, setIsPC] = useState<boolean>(false);
  const [isSP, setIsSP] = useState<boolean>(false);
  const [isTablet, setIsTablet] = useState<boolean>(false);

  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;
      setIsPC(() => width >= 1024);
      setIsSP(() => width <= 768);
      setIsTablet(() => width >= 768 && width <= 1024);
      setWindowWidth(window.innerWidth);
    }

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { windowWidth, isPC, isSP, isTablet };
}
