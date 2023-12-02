import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

let list_data = [
  {
    title: "",
    link: "",
    Component: null,
    sub_links: [],
  },
];

const UseCompFromLinkList = (list = list_data) => {
  const [Component, setComponent] = useState(null);
  const location = useLocation();

  useEffect(() => {
    list.forEach((item) => {
      if (location.pathname === item.link) {
        setComponent(item.Component);
      }
      if (item.sub_links) {
        item.sub_links.forEach((item2) => {
          if (location.pathname === item2.link) {
            setComponent(item2.Component);
          }
        });
      }
    });
  }, [list, location]);

  return Component;
};

export default UseCompFromLinkList;
