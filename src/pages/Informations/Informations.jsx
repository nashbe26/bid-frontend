import React from "react";
import styles from "./Informations.module.scss";
import MainContainer from "../../components/Containers/MainContainer";
import { H32, P14, P18 } from "../../components/TXT/TXT";

import { logo1, play_circle } from "../../assets/svgs";
import Flex from "../../components/Flex/Flex";
import Button from "../../components/Buttons/Button";

import { data1, data2 } from "./data";
import { NavLink } from "react-router-dom";

function Informations() {
  return (
    <div>
      <MainContainer className={styles.main}>
        <H32 weight={700}>How does it work</H32>
        <Flex className={styles.video_section}>
          <img src={logo1} alt="" className={styles.logo} />

          <Flex className={styles.video}>
            <img src={play_circle} alt="" />
          </Flex>
        </Flex>

        <Flex className={styles.process1}>
          {data1.map((item, index) => (
            <Flex key={index} className={styles.item}>
              <img src={item.icon} alt="" />
              <div className={styles.txts}>
                <P18 weight={700} className={styles.t1}>
                  {item.title}
                </P18>
                <P14 weight={300}>{item.desc}</P14>
              </div>
            </Flex>
          ))}
        </Flex>

        <Flex>
          <Button className={styles.btn}>
            <NavLink to="/live-auctions">GO TO AUCTIONS</NavLink>
          </Button>
        </Flex>
      </MainContainer>

      <div className={styles.more}>
        <H32 weight={700} className={styles.title2}>
          How to take bets
        </H32>

        <Flex className={styles.process1}>
          {data2.map((item, index) => (
            <Flex key={index} className={styles.item}>
              <img src={item.icon} alt="" />
              <div className={styles.txts}>
                <P18 weight={700}>{item.title}</P18>
                <P14 weight={300}>{item.desc}</P14>
              </div>
            </Flex>
          ))}
        </Flex>

        <P18 className={styles.final_desc}>
          We offers bet refunds via the <strong> Buy It Now feature.</strong>
          <br />
          If you do not win an Auction, you can purchase the Product at the
          market price and
          <strong> we will refund all Bets spent in the Auction.</strong>
        </P18>
      </div>
    </div>
  );
}

export default Informations;
