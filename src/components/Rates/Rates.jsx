import React from "react";
import styles from "./Rates.module.scss";

import star from "./star.svg";

const MakeArray = (rates) => {
  let arr = [];
  for (let i = 0; i < rates; i++) {
    arr.push(true);
  }

  for (let i = 0; i < 5 - rates; i++) {
    arr.push(false);
  }

  return arr;
};

function Rates({ number = 5, className = "" }) {
  return (
    <div className={`${styles.rates} ${className}`}>
      {MakeArray(number).map((item, index) => {
        return item ? <img key={index} src={star} alt="" /> : null;
      })}
    </div>
  );
}

export default Rates;
