import React from "react";
import styles from "./LiveAuctions.module.scss";
import MainContainer from "../../components/Containers/MainContainer";
import AuctionSection from "../../components/AuctionSection/AuctionSection";
import { live_auctions } from "./data";
import AuctionsTypes from "../../common/AuctionsTypes/AuctionsTypes";

function LiveAuctions() {
  return (
    <div className={styles.main}>
      <AuctionsTypes />
      <MainContainer>
        <AuctionSection
          title="LIVE AUCTION"
          sub_title="Many items are live Now , join fast !"
          auctions={live_auctions}
        />
      </MainContainer>
    </div>
  );
}

export default LiveAuctions;
