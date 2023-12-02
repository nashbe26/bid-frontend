import React from "react";
import styles from "./Button.module.scss";

function Button({
  children,
  onClick,
  className = "",
  type = "filled",
  fullWidth = false,
  disabled = false,
  icon = null,
  left = false,
  right = false,
}) {
  // ############### conditional styles
  let is_filled = type === "filled" ? styles.filled : "";
  let is_outlined = type === "outlined" ? styles.outlined : "";
  let is_fullWidth = fullWidth ? styles.fullWidth : "";
  // let is_text = type==="text" ? styles.text : "";

  return (
    <button
      onClick={onClick}
      className={`${styles.button} ${className} ${is_filled} ${is_outlined} ${is_fullWidth}`}
      disabled={disabled}
    >
      {icon && left && <img src={icon} alt="" />}
      <span>{children}</span>
      {icon && right && <img src={icon} alt="" />}
    </button>
  );
}

export default Button;
