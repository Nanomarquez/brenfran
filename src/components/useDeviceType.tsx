import { useState, useEffect } from "react";

export function useDeviceType() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");

    // Handler que actualiza el estado en función del tamaño de la ventana
    const handleResize = (event: { matches: boolean | ((prevState: boolean) => boolean); }) => {
      setIsMobile(event.matches);
    };

    // Agregar el listener al evento de cambio de media query
    mediaQuery.addEventListener("change", handleResize);

    // Eliminar el listener cuando el componente se desmonte
    return () => {
      mediaQuery.removeEventListener("change", handleResize);
    };
  }, []);

  return isMobile;
}
