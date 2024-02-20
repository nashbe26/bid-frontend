import React from "react";
import styles from "./ClosedAuctions.module.scss";
import MainContainer from "../../components/Containers/MainContainer";
import AuctionSection from "../../components/AuctionSection/AuctionSection";
import { ended_auctions } from "./data";
import AuctionsTypes from "../../common/AuctionsTypes/AuctionsTypes";

function COommingAuction() {
  return (
    <div className={styles.main}>
      <AuctionsTypes />
      <MainContainer>
        <AuctionSection
         type="coming soon"
          title="UPCOMING AUCTION​"
          sub_title="Get Ready to take an action !"
          auctions={ended_auctions}
        />
      </MainContainer>
    </div>
  );
}

export default COommingAuction;
