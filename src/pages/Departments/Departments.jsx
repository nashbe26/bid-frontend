import React, { useState } from "react";
import styles from "./Departments.module.scss";
import AuctionsTypes from "../../common/AuctionsTypes/AuctionsTypes";
import MainContainer from "../../components/Containers/MainContainer";
import AuctionSection from "../../components/AuctionSection/AuctionSection";

import { company_live_auctions, individual_live_auctions } from "./data";
import Flex from "../../components/Flex/Flex";

function Departments() {
  const [open_filter, set_open_filter] = useState(true);

  return (
    <div className={styles.main}>
      <AuctionsTypes className={styles.auction_types} />
      <MainContainer>
        <Flex flex="between" className={styles.parts}>
          <Part1 open_filter={open_filter} />
          <Part2 open_filter={open_filter} />
        </Flex>
      </MainContainer>
    </div>
  );
}

const Part1 = ({ open_filter = false }) => {
  return open_filter && <div className={styles.part1}></div>;
};

const Part2 = ({ open_filter = false }) => {
  const op_filt_st = open_filter ? styles.opened_filter : "";
  return (
    <div className={`${styles.part2} ${op_filt_st}`}>
      <AuctionSection
        className={styles.auctions_section}
        title="COMPANY LIVE AUCTION​"
        auctions={company_live_auctions}
        cardclassName={styles.card}
      />

      <AuctionSection
        className={styles.auctions_section}
        title="INDIVIDUAL LIVE AUCTION​"
        auctions={individual_live_auctions}
        cardclassName={styles.card}
      />
    </div>
  );
};

export default Departments;
