import React from "react";
import styles from "./Containers.module.scss";

function MainContainer3({ children, className = "" }) {
  return (
    <div className={`${styles.MainContainer3} ${className}`}>{children}</div>
  );
}

export default MainContainer3;
