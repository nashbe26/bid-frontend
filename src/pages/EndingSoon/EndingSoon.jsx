import React from "react";
import styles from "./EndingSoon.module.scss";
import MainContainer from "../../components/Containers/MainContainer";
import AuctionSection from "../../components/AuctionSection/AuctionSection";
import { ending_auctions } from "./data";
import AuctionsTypes from "../../common/AuctionsTypes/AuctionsTypes";

function EndingSoon() {
  return (
    <div className={styles.main}>
      <AuctionsTypes />
      <MainContainer>
        <AuctionSection
          type="ending"
          title="ENDING SOON ​🔥​🔥​"
          sub_title="Fast join us !"
          auctions={ending_auctions}
        />
      </MainContainer>
    </div>
  );
}

export default EndingSoon;
