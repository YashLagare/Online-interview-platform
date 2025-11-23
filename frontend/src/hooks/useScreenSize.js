
import { useEffect, useState } from "react";

export const useScreenSize = () => {
  const [isSmall, setIsSmall] = useState(false);

  useEffect(() => {
    const checkSize = () => {
      setIsSmall(window.innerWidth < 1024); // below 1024px = small
    };

    checkSize(); // run on first load
    window.addEventListener("resize", checkSize);

    return () => window.removeEventListener("resize", checkSize);
  }, []);

  return isSmall;
};
