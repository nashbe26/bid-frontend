import React from "react";
import styles from "./Containers.module.scss";

function MainContainer2({ children, className = "" }) {
  return (
    <div className={`${styles.MainContainer2} ${className}`}>{children}</div>
  );
}

export default MainContainer2;
