import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const UseIsContainUrl = (link) => {
  const [isCurrentUrl, setIsCurrentUrl] = useState(false);
  const location = useLocation();

  useEffect(() => {
    let res = location.pathname.indexOf(link) !== -1;
    setIsCurrentUrl(res);
  }, [link, location]);

  return isCurrentUrl;
};

export default UseIsContainUrl;
