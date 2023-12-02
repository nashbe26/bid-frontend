import React from "react";
import styles from "./TitleAndSubTitle.module.scss";
import { H42, P16 } from "../TXT/TXT";

const TitleAndSubTitle = ({ title = "", sub_title = "" }) => {
  return (
    <div className={styles.title_and_sub_title}>
      <H42 weight={700} className={styles.title}>
        {title}
      </H42>
      <P16 className={styles.sub_title}>{sub_title}</P16>
    </div>
  );
};
export default TitleAndSubTitle;
