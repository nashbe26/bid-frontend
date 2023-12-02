import React from "react";
import styles from "./Flex.module.scss";

const Flex = ({
  flex = "center",
  className = "",
  children,
  onClick = () => {},
}) => {
  const flexes = {
    center: "center",
    between: "space-between",
    around: "space-around",
    evenly: "space-evenly",
    start: "flex-start",
    end: "flex-end",
    stretch: "stretch",
  };

  const justifyContent = flexes[flex];

  return (
    <div
      style={{ justifyContent }}
      onClick={onClick}
      className={`${styles.main} ${className}`}
    >
      {children}
    </div>
  );
};

export default Flex;
