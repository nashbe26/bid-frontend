import React from "react";
import styles from "./Avatar.module.scss";

const Avatar = ({ img, fullName = "", className = "" }) => {
  let [first, last] = fullName.toUpperCase().split(" ");

  let NN = first[0] + (last ? last[0] : "");

  return (
    <div className={`${styles.avatar} ${className}`}>
      {img ? <img src={img} alt={fullName} /> : <span> {NN} </span>}
    </div>
  );
};

export default Avatar;
