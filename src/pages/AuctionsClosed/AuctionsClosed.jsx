import React from "react";
import styles from "./AuctionsClosed.module.scss";
import MainContainer from "../../components/Containers/MainContainer";
import Flex from "../../components/Flex/Flex";
import { table, auction, blog } from "./data";

import { crown, heart_empty, heart_fill } from "../../assets/svgs";
import { H24, P12, P14, P16, P21, P11 } from "../../components/TXT/TXT";
import { sold_out } from "../../assets/images";
import BlogSection from "../AuctionLive/BlogSection/BlogSection";
import useGetTime from "../../hooks/UseGetTime";
import Button from "../../components/Buttons/Button";

function AuctionsClosed() {
  return (
    <MainContainer className={styles.main}>
      <StatsPart />
      <BlogSection data={blog} />
    </MainContainer>
  );
}

const StatsPart = () => {
  return (
    <Flex flex="between" className={styles.top_side}>
      <Table />
      <ClosedAuction auction={auction} />
      <DetailsAuctionClosed />
    </Flex>
  );
};

const Table = () => {
  const data = [...table];

  return (
    <div className={styles.table_part}>
      <Flex flex="between" className={styles.table_header}>
        <Flex flex="start">
          <img src={crown} alt="" />
          <div className={styles.txts}>
            <Flex flex="start">
              <P14 className={styles.txt1} weight={600}>
                andreto30
              </P14>
              <P14 weight={300}> 85 Bets used</P14>
            </Flex>
            <P14 weight={300}>Won: Today at 10:48 Oggi alle 10:48</P14>
          </div>
        </Flex>
        <P21 weight={500} className={styles.price}>
          €3.05
        </P21>
      </Flex>

      <table className={styles.table}>
        <thead>
          <tr className={styles.th}>
            <th>PRICE</th>
            <th>MODE</th>
            <th>HOURS</th>
            <th>USER</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.PRICE}</td>
                <td>{item.MODE}</td>
                <td>{item.HOURS}</td>
                <td>{item.USER}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const ClosedAuction = ({ auction }) => {
  let heart = auction.hearted ? heart_fill : heart_empty;

  return (
    <div className={styles.closed_auction}>
      <Flex flex="between" className={styles.top}>
        <P21 weight={700}>Closed</P21>
        <img src={heart} alt="" />
      </Flex>

      <div className={styles.body}>
        <Flex className={styles.img_container}>
          <img src={auction.img} alt="" />
        </Flex>
        <Flex className={styles.overlay}>
          <img src={sold_out} alt="" />
        </Flex>
      </div>

      <Flex flex="between" className={styles.footer}>
        {auction.images.map((img, index) => {
          return <img src={img} alt="" key={index} />;
        })}
      </Flex>
    </div>
  );
};

const DetailsAuctionClosed = () => {
  return (
    <div className={styles.auction_closes}>
      <H24>Sony ZX330BT</H24>

      <Flex flex="start" className={styles.price}>
        <P16 className={styles.value}>35.00</P16>
        <P14 className={styles.money} weight={600}>
          USD
        </P14>
      </Flex>

      <Flex flex="between" className={styles.start_price}>
        <P14 className={styles.money}>Starting price : 1.77$</P14>
        <Flex flex="start" className={styles.stock}>
          <P16 className={styles.value}>13</P16>
          <P14 className={styles.in_stock}>In Stock</P14>
        </Flex>
      </Flex>

      <P12 className={styles.desc}>
        Le lorem ipsum est, en imprimerie, une suite de mots sans signification
        utilisée à titre provisoire pour calibrer une mise en page, le
      </P12>

      <div className={styles.auction_closed_in}>
        <P14>Auction Closed</P14>
        <Timer minutes={7923} />
      </div>

      <div className={styles.buttons}>
        <Button fullWidth className={styles.btn1}>
          Home Page
        </Button>
        <Button fullWidth type="outlined" className={styles.btn2}>
          Place a bid
        </Button>
      </div>
    </div>
  );
};

const Timer = ({ minutes = 0 }) => {
  const { time } = useGetTime(minutes);

  return (
    <div className={styles.timer}>
      <Flex flex="between" className={styles.block}>
        <TimeBox title="DAYS" number={time.days} />
        <TimeBox title="HOURS" number={time.hours} />
        <TimeBox title="MINUTES" number={time.minutes} />
      </Flex>
    </div>
  );
};

const TimeBox = ({ number = "00", title = "" }) => {
  return (
    <Flex className={styles.box}>
      <Flex className={styles.digits}>
        <P16 className={styles.digit}>{number[0]}</P16>
        <P16 className={styles.digit}>{number[1]}</P16>
      </Flex>
      <P11>{title}</P11>
    </Flex>
  );
};

export default AuctionsClosed;
