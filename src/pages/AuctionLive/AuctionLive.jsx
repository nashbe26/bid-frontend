import React from "react";
import styles from "./AuctionLive.module.scss";
import MainContainer from "../../components/Containers/MainContainer";
import MakeAuction from "./MakeAuction/MakeAuction";

import BlogSection from "./BlogSection/BlogSection";

function AuctionLive() {
  return (
    <MainContainer className={styles.main}>
      <MakeAuction />
      <BlogSection />
    </MainContainer>
  );
}

export default AuctionLive;
