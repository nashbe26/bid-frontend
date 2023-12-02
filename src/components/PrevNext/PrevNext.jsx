import React from "react";
import styles from "./PrevNext.module.scss";
import { next_arrow_circle } from "../../assets/svgs";

const PrevBtn = ({ className = "", onClick = () => {}, hasPrev = true }) => {
  return hasPrev ? (
    <img
      src={next_arrow_circle}
      className={`${styles.prev} ${className}`}
      onClick={onClick}
      alt=""
    />
  ) : null;
};

const NextBtn = ({ className = "", onClick = () => {}, hasNext = true }) => {
  return hasNext ? (
    <img
      src={next_arrow_circle}
      className={`${styles.next} ${className}`}
      onClick={onClick}
      alt=""
    />
  ) : null;
};

export { PrevBtn, NextBtn };
