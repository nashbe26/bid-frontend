import React from "react";
import styles from "./NoContentHere.module.scss";
import { H24, P13 } from "../TXT/TXT";
import Flex from "../Flex/Flex";

function NoContentHere({ title = "", parag = "", className = "" }) {
  return (
    <Flex flex="center" className={`${styles.main} ${className} `}>
      <H24>{title}</H24>
      <P13>{parag}</P13>
    </Flex>
  );
}

export default NoContentHere;
