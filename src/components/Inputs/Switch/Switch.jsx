import React from "react";
import styles from "./Switch.module.scss";

function Switch({ className = "" }) {
  const [checked, setChecked] = React.useState(false);
  const check_styles = checked ? styles.checked : styles.unchecked;

  const handle_change = () => {
    setChecked(!checked);
  };

  return (
    <div
      className={`${styles.main} ${check_styles} ${className}`}
      onClick={handle_change}
    >
      <span />
    </div>
  );
}

export default Switch;
