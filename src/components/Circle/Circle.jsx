import React from "react";
import styles from "./Circle.module.scss";

function Circle({ percentage = 0, className = "" }) {
  return (
    <div className={`${styles.circle} ${className}`}>
      <svg viewBox="0 0 36 36">
        <path
          d="M18 2.0845
           a 15.9155 15.9155 0 0 1 0 31.831
           a 15.9155 15.9155 0 0 1 0 -31.831"
          stroke-dasharray={`${percentage}, 100`}
        />
      </svg>
    </div>
  );
}

export default Circle;
