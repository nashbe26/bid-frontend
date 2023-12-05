import React from "react";
import styles from "./ClosedAuctions.module.scss";
import MainContainer from "../../components/Containers/MainContainer";
import AuctionSection from "../../components/AuctionSection/AuctionSection";
import { ended_auctions } from "./data";
import AuctionsTypes from "../../common/AuctionsTypes/AuctionsTypes";

function ClosedAuctions() {
  return (
    <div className={styles.main}>
      <AuctionsTypes />
      <MainContainer>
        <AuctionSection
          title="FINISHIED AUCTION​"
          sub_title="Better luck next time !"
          auctions={ended_auctions}
        />
      </MainContainer>
    </div>
  );
}

export default ClosedAuctions;
