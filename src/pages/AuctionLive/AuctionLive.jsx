import React from "react";
import styles from "./AuctionLive.module.scss";
import MainContainer from "../../components/Containers/MainContainer";
import MakeAuction from "./Part1/MakeAuction";

import { blog } from "./data";
import Flex from "../../components/Flex/Flex";
import { H32, P14 } from "../../components/TXT/TXT";

function AuctionLive() {
  return (
    <MainContainer className={styles.main}>
      <MakeAuction />
      <Bloging />
    </MainContainer>
  );
}

const Bloging = () => {
  return (
    <div className={styles.blogging}>
      <Flex flex="between" className={styles.left}>
        <div className={styles.text_part}>
          <H32 weight={700}>{blog.left.title}</H32>
          <P14 weight={300}>{blog.left.desc}</P14>
        </div>
        <img src={blog.left.img} className={styles.b_img1} alt="" />
      </Flex>
      <Flex flex="between" className={styles.right}>
        <img src={blog.right.img} alt="" className={styles.b_img2} />
        <div className={styles.text_part}>
          <H32 weight={700}>{blog.right.title}</H32>
          {blog.right.steps.map((step, index) => {
            return (
              <P14 key={index} weight={300}>
                {step}
              </P14>
            );
          })}
        </div>
      </Flex>

      <div>
        <img className={styles.b_bottom} src={blog.center} alt="" />
      </div>
    </div>
  );
};

export default AuctionLive;
