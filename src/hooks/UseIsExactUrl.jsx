import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const UseIsExactUrl = (link) => {
  const [isExact, setIsExact] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsExact(location.pathname === link);
  }, [link, location]);

  return isExact;
};

export default UseIsExactUrl;
