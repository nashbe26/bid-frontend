import React from "react";
import styles from "./Containers.module.scss";

function MainContainer({ children, className = "" }) {
  return (
    <div className={`${styles.MainContainer} ${className}`}>{children}</div>
  );
}

export default MainContainer;
