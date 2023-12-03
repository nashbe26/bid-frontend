import React from "react";
import styles from "./Tracking.module.scss";
import MainContainer from "../../components/Containers/MainContainer";
import AuctionSection from "../../components/AuctionSection/AuctionSection";
import { P21 } from "../../components/TXT/TXT";
import { live_auctions } from "./data";

import { empty_box } from "../../assets/svgs";
import Flex from "../../components/Flex/Flex";

function Tracking() {
  return (
    <MainContainer className={styles.main}>
      {live_auctions.length === 4 ? (
        <YouHaveNoAuction />
      ) : (
        <AuctionSection title="Favourite" auctions={live_auctions} />
      )}
    </MainContainer>
  );
}

const YouHaveNoAuction = () => {
  return (
    <Flex flex="center" className={styles.no_auction}>
      <img src={empty_box} alt="empty_box" />
      <P21 weight={700}>You are not saving anything yet !</P21>
    </Flex>
  );
};

export default Tracking;
