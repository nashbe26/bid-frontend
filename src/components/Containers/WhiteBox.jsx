import React from "react";
import styles from "./Containers.module.scss";

function WhiteBox({
  children,
  className = "",
  topline = false,
  botline = false,
  topmargin = false,
  botmargin = false,
}) {
  const topLine = topline ? styles.topline : "";
  const botLine = botline ? styles.botline : "";
  const topMargin = topmargin ? styles.topmargin : "";
  const botMargin = botmargin ? styles.botmargin : "";

  let final_class_name = `${styles.white_container} ${className} ${topLine} ${botLine} ${topMargin} ${botMargin}`;

  return <div className={final_class_name}>{children}</div>;
}

export default WhiteBox;
