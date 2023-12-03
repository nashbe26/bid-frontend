import React from "react";
import styles from "./AuctionSection.module.scss";
import MainContainer from "../Containers/MainContainer";
import TitleAndSubTitle from "../TitleAndSubTitle/TitleAndSubTitle";
import Grid from "../Grid/Grid";
import CardAuction from "../Cards/CardAuction/CardAuction";

const AuctionSection = ({ title = "", sub_title = "", auctions = [] }) => {
  return (
    <MainContainer className={styles.auction_section}>
      <TitleAndSubTitle title={title} sub_title={sub_title} />
      <Grid className={styles.cards}>
        {auctions.map((item, index) => {
          return <CardAuction key={index} auction={item} />;
        })}
      </Grid>
    </MainContainer>
  );
};

export default AuctionSection;
