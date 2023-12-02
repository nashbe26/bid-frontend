import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function useToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location]);
}

export default useToTop;
