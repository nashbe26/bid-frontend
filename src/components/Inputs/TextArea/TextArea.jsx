import React from "react";
import styles from "./TextArea.module.scss";

function TextArea({
  placeholder = "",
  className = "",
  value = "",
  onChange = () => {},
  name = "",
  label = "",
  rows = 3,
}) {
  return (
    <div className={`${styles.main} ${className}`}>
      <label htmlFor="">{label}</label>
      <textarea
        className={styles.textarea}
        placeholder={placeholder}
        name={name}
        // value={value}
        // onChange={onChange}
        rows={rows}
      ></textarea>
    </div>
  );
}

export default TextArea;
