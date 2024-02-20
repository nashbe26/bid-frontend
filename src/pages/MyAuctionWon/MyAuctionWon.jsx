import React from "react";
import styles from "./MyAuctionWon.module.scss";
import MainContainer from "../../components/Containers/MainContainer";
import AuctionSection from "../../components/AuctionSection/AuctionSection";
import { P21, H24, P18 } from "../../components/TXT/TXT";
import Button from "../../components/Buttons/Button";
import { live_auctions } from "./data";

import { cup, empty_box } from "../../assets/svgs";
import Flex from "../../components/Flex/Flex";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";

function MyAuctionWon() {
  const user= useSelector(selectUser)
  const currentUrl = new URL(window.location.href)
  return (
    <MainContainer className={styles.main}>
      {currentUrl.pathname == "/my-auctions-won" &&
       <>
    
       {user && user.bids_won && user.bids_won.length == 0 ? (
         <YouHaveNoAuction text={"You haven't won any auctions yet."}  title={"My Auctions Won"}/>
       ) : (
       
         <AuctionSection title="My Auctions Won" type={"won"} auctions={user.bids_won} />
       )}
     </>
      }
      {currentUrl.pathname == "/my-auctions-fav" &&
     <>
    
       {user && user.fav_bid && user.fav_bid.length == 0 ? (
         <YouHaveNoAuction />
       ) : (
       
         <AuctionSection title="My Favourite" type={"favorite"} auctions={user.fav_bid} />
       )}
     </>
  }
     
    </MainContainer>
  );
}

const YouHaveNoAuction = ({title,text}) => {
  const navigate = useNavigate()
  return (
    <Flex flex="between" className={styles.no_auction}>
      {/* <img src={empty_box} alt="empty_box" /> */}
      <Flex flex="center" className={styles.txts}>
        <Flex className={styles.main_title}>
          <H24 weight={700}>{title}</H24>
          <img src={cup} alt="" />
        </Flex>
        <P18>{text}</P18>
      </Flex>

      <Button onClick={e => navigate('/')}>GO WIN WITH THEM NOW</Button>
    </Flex>
  );
};

export default MyAuctionWon;
