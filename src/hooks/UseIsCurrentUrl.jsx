import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const useIsCurrentUrl = (link) => {
  const [isCurrentUrl, setIsCurrentUrl] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsCurrentUrl(location.pathname.indexOf(link) !== -1);
  }, [link, location]);

  return isCurrentUrl;
};

export default useIsCurrentUrl;
