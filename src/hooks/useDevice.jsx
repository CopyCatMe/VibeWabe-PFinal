import { useState, useEffect } from "react";

export function useDevice() {
  const [isOpen, setIsOpen] = useState(window.innerWidth <= 768);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const toggleOpen = () => setIsOpen(!isOpen);

  const handleResize = () => {
    const mobile = window.innerWidth <= 768;
    setIsMobile(mobile);
    if (mobile) setIsOpen(true); // Mantener abierto en móviles
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { isOpen, toggleOpen, isMobile };
}
