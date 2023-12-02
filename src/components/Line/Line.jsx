import React from "react";
import styles from "./Line.module.scss";

function Line({ className }) {
  return <div className={`${styles.line} ${className}`}></div>;
}

export default Line;
