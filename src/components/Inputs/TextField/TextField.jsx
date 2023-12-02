import React from "react";
import styles from "./TextField.module.scss";

function TextField({
  placeholder = "",
  className = "",
  value = "",
  onChange = () => {},
  name = "",
  label = "",
}) {
  return (
    <div className={`${styles.main} ${className}`}>
      <label htmlFor="">{label}</label>
      <input
        className={styles.textarea}
        placeholder={placeholder}
        name={name}
        value={value}
        // onChange={onChange}
      />
    </div>
  );
}

export default TextField;
