import React from "react";
import styles from "./UserStars.module.scss";
import Flex from "../Flex/Flex";
import Avatar from "../Avatar/Avatar";
import { P16 } from "../TXT/TXT";
import Rates from "../Rates/Rates";

const EmptyUser = {
  name: "N N",
  img: "",
  stars: 0,
  followers: 0,
};

function UserStars({ UserData = EmptyUser }) {
  return (
    <Flex flex="between" className={styles.main}>
      <Avatar img={UserData.img} fullName={UserData.name} />
      <div className={styles.infos}>
        <P16>{UserData.name}</P16>
        <Flex flex="start">
          <Rates number={UserData.stars} className={styles.stars} />{" "}
          <P16>{UserData.followers}</P16>
        </Flex>
      </div>
    </Flex>
  );
}

export default UserStars;
