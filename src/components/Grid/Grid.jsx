import React from "react";
import styles from "./Grid.module.scss";

function Grid({ children, className = "" }) {
  return <div className={`${styles.main} ${className}`}>{children}</div>;
}

export default Grid;
