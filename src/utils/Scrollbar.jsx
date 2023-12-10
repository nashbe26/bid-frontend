import React, { useEffect, useRef } from "react";
import styles from "./Scrollbar.module.scss";
import { useLocation } from "react-router-dom";

const Resize = () => {
  let scrollbar_height =
    (window.innerHeight / document.documentElement.scrollHeight) *
    window.innerHeight;
  let scrollbar = document.querySelector(`.${styles.scrollbar}`);
  scrollbar.style.height = `${scrollbar_height}px`;
};

const Scroll = () => {
  let scrollbar = document.querySelector(`.${styles.scrollbar}`);
  let scroll_position =
    (window.scrollY / document.documentElement.scrollHeight) *
    window.innerHeight;
  scrollbar.style.transform = `translateY(${scroll_position}px)`;
};

const DoAll = () => {
  Resize();
  Scroll();
};

const Scrollbar = () => {
  const location = useLocation();
  const scrollbar = useRef(null);

  useEffect(() => {
    DoAll();
    window.addEventListener("resize", () => {
      DoAll();
    });
    window.addEventListener("scroll", () => {
      DoAll();
    });
    window.addEventListener("hashchange", () => {
      DoAll();
    });

    return () => {
      window.removeEventListener("resize", () => {
        DoAll();
      });
      window.removeEventListener("scroll", () => {
        DoAll();
      });
      window.removeEventListener("hashchange", () => {
        DoAll();
      });
    };
  }, [location.pathname]);

  useEffect(() => {}, []);

  return (
    <div className={styles.scrollbar_parent}>
      <div ref={scrollbar} className={styles.scrollbar} />
    </div>
  );
};

export default Scrollbar;
