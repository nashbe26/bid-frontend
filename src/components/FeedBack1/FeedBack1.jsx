import React from "react";
import styles from "./FeedBack1.module.scss";
import Flex from "../Flex/Flex";
import { P14 } from "../TXT/TXT";
import Button from "../Buttons/Button";
import { IoHappyOutline, IoSadOutline } from "react-icons/io5";

function FeedBack1() {
  return (
    <Flex flex="start" className={styles.feedback}>
      <P14>Cela t'a-t-il aidé ?</P14>
      <Button type="outlined">
        <Flex flex="center">
          <IoHappyOutline className={styles.icon} />
          Oui
        </Flex>
      </Button>
      <Button type="outlined">
        <Flex flex="center">
          <IoSadOutline className={styles.icon} /> Non
        </Flex>
      </Button>
    </Flex>
  );
}

export default FeedBack1;
