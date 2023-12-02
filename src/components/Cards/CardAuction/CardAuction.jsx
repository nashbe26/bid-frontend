import React from "react";
import styles from "./CardAuction.module.scss";
import {
  heart_fill,
  heart_empty,
  blue_comp,
  blue_ppl,
  clock,
} from "../../../assets/svgs";
import { P14, P17, P18, P19 } from "../../TXT/TXT";
import Flex from "../../Flex/Flex";
import Button from "../../Buttons/Button";
import { sold_out } from "../../../assets/images";

const c_type = {
  company: blue_comp,
  people: blue_ppl,
};

const empty_auction = {
  live: true,
  title: "Sony ZX330BT",
  price: "35.00",
  img: "",
  name_bid: "George",
  starting_price: "1.77",
  with_icon: "company",
  end_date: new Date(),
  end_soon: false,
  finis_price: "13",
  hearted: false,
};

const CardAuction = ({ auction = empty_auction }) => {
  let styles_state = auction.live ? styles.live : styles.closed;

  return (
    <div className={`${styles.auction} ${styles_state}`}>
      <Header auction={auction} />
      <Image auction={auction} />
      <EndSoon auction={auction} />
      <Content auction={auction} />
    </div>
  );
};

const Header = ({ auction = empty_auction }) => {
  let live = auction.live ? "Live" : "Closed";
  let heart = auction.hearted ? heart_fill : heart_empty;

  return (
    <Flex flex="between" className={styles.head}>
      <P18> {live} </P18>
      <img src={heart} alt="" className={styles.icon} />
    </Flex>
  );
};

const Image = ({ auction = empty_auction }) => {
  let cercle_item = c_type[auction.with_icon] || null;

  return (
    <Flex flex="center" className={styles.auction_img}>
      <div className={styles.img}>
        <img src={auction.img} alt="" />
      </div>

      <div className={styles.overlay}>
        {auction.live && cercle_item && (
          <Flex flex="center" className={styles.cercle_item}>
            <img src={cercle_item} alt="" />
          </Flex>
        )}
      </div>

      {!auction.live && (
        <Flex flex="center" className={styles.overlay_closed}>
          <img src={sold_out} alt="sold out" />
        </Flex>
      )}
    </Flex>
  );
};

const EndSoon = ({ auction = empty_auction }) => {
  return auction.end_soon ? (
    <Flex flex="center" className={styles.finish_in}>
      <img src={clock} alt="" />
      <P17 weight={700}>Finish in : 2 min</P17>
    </Flex>
  ) : null;
};

const Content = ({ auction = empty_auction }) => {
  let end_price = auction.live ? "Starting price" : "Finised price";

  return (
    <div className={styles.content}>
      <Flex flex="between" className={styles.title_and_price}>
        <P19 weight={700} className={styles.title}>
          {auction.title}
        </P19>
        <P18 weight={700} className={styles.price}>
          {auction.price}$
        </P18>
      </Flex>

      <P14 className={styles.name_bid}>{auction.name_bid} bid</P14>
      <P14 className={styles.starting_price}>
        {end_price} : {auction.starting_price}$
      </P14>

      {auction.live && (
        <Button type="fill" fullWidth>
          Join Biding
        </Button>
      )}
    </div>
  );
};

export default CardAuction;
