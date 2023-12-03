import React from "react";
import styles from "./MyAuctionWon.module.scss";
import MainContainer from "../../components/Containers/MainContainer";
import AuctionSection from "../../components/AuctionSection/AuctionSection";
import { P21, H24, P18 } from "../../components/TXT/TXT";
import Button from "../../components/Buttons/Button";
import { live_auctions } from "./data";

import { cup, empty_box } from "../../assets/svgs";
import Flex from "../../components/Flex/Flex";

function MyAuctionWon() {
  return (
    <MainContainer className={styles.main}>
      {live_auctions.length === 0 ? (
        <YouHaveNoAuction />
      ) : (
        <AuctionSection title="Favourite" auctions={live_auctions} />
      )}
    </MainContainer>
  );
}

const YouHaveNoAuction = () => {
  return (
    <Flex flex="between" className={styles.no_auction}>
      {/* <img src={empty_box} alt="empty_box" /> */}
      <Flex flex="center" className={styles.txts}>
        <Flex className={styles.main_title}>
          <H24 weight={700}>My Auctions Won</H24>
          <img src={cup} alt="" />
        </Flex>
        <P18>You haven't won any auctions yet.</P18>
      </Flex>

      <Button>GO WIN WITH THEM NOW</Button>
    </Flex>
  );
};

export default MyAuctionWon;
