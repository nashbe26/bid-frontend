import React, { useEffect, useState } from "react";
import styles from "./AuctionSection.module.scss";
import MainContainer from "../Containers/MainContainer";
import TitleAndSubTitle from "../TitleAndSubTitle/TitleAndSubTitle";
import Grid from "../Grid/Grid";
import CardAuction from "../Cards/CardAuction/CardAuction";
import { UseGetClosed, UseGetComing, UseGetEnd, UseGetLive } from "../../utils/functions/bid/bid-fn";
import { selectSearch, setSearchBid } from "../../store/bidSlice";
import { useDispatch, useSelector } from "react-redux";

const AuctionSection = ({
  title = "",
  sub_title = "",
  auctions = [],
  cardclassName = "",
  className = "",
  type
}) => {

  const live = UseGetLive();
  const close = UseGetClosed();
  const comming = UseGetComing();
  const end = UseGetEnd();
  
  const [liveData, setLiveData] = useState([]);
  const [closedData, setClosedData] = useState([]);
  const [comingData, setComingData] = useState([]);
  const [endData, setendData] = useState([]);
  const [fromNo, setfromNo] = useState([]);
  const auctionss = useSelector(selectSearch)
  const dispatch = useDispatch()
  useEffect(() => {
    console.log("type", type);
    console.log("type", title);
    if (type === "live") {
      setClosedData([]); 
      setComingData([]); 
      setendData([]); 
            setfromNo([]);

      live.refetch().then(({data}) => setLiveData(data));
      dispatch(setSearchBid([]))
    } else if (type === "closed") {
      setLiveData([]); 
      setComingData([]); 
      setendData([]);
            setfromNo([]);

      close.refetch().then(({data}) => setClosedData(data));
      dispatch(setSearchBid([]))
    } else if (type === "coming soon") {
      setLiveData([]); 
      setClosedData([]); 
      setendData([]);
            setfromNo([]);

      comming.refetch().then(({data}) => setComingData(data));
      dispatch(setSearchBid([]))
    }
    else if (type === "ending") {
      setLiveData([]); 
      setClosedData([]); 
      setComingData([]);
      setfromNo([]);
      
      end.refetch().then(({data}) => setendData(data));
      dispatch(setSearchBid([]))
    }else if(type === "search"){
      setLiveData([]); 
      setClosedData([]); 
      setComingData([]);
      setendData([]);
      console.log("heere");
      setfromNo(auctionss)
    }
    console.log(type);
  }, [type]);

  useEffect(()=>{
    console.log(auctionss);
  },[auctionss])

  return (
    <MainContainer className={`${styles.auction_section} ${className}`}>
      <TitleAndSubTitle title={title} sub_title={sub_title} />
      
      {
        liveData.length > 0 && 
        <Grid className={styles.cards}>
        {liveData.map((item, index) => {
          return (
            <CardAuction key={index} auction={item} className={cardclassName} />
          );
        })}
      </Grid>
      }

{
        closedData.length > 0 && 
        <Grid className={styles.cards}>
        {closedData.map((item, index) => {
          return (
            <CardAuction key={index} auction={item} className={cardclassName} />
          );
        })}
      </Grid>
      }

{
        comingData.length > 0 && 
        <Grid className={styles.cards}>
        {comingData.map((item, index) => {
          return (
            <CardAuction key={index} auction={item} className={cardclassName} />
          );
        })}
      </Grid>
      }

{
        endData.length > 0 && 
        <Grid className={styles.cards}>
        {endData.map((item, index) => {
          return (
            <CardAuction key={index} auction={item} className={cardclassName} />
          );
        })}
      </Grid>
      }
      
      {auctionss.length > 0 && type=="company" &&
      <Grid className={styles.cards}>
      {auctionss.filter(x=> x.prod_id.type == "company").map((item, index) => {
        console.log(item);
        return (
          <CardAuction key={index} auction={item} className={cardclassName} />
        );
      })}
    </Grid>
      }
         
         {auctionss.length> 0 && type=="individual" &&
      <Grid className={styles.cards}>
      {auctionss.filter(x=> x.prod_id.type == "individual").map((item, index) => {
        console.log(item);
        return (
          <CardAuction key={index} auction={item} className={cardclassName} />
        );
      })}
    </Grid>
      }
    {type== "favorite" && auctions.length > 0 &&
      <Grid className={styles.cards}>
      {auctions.map((item, index) => {
        console.log(item);
        return (
          <CardAuction key={index} auction={item} className={cardclassName} />
        );
      })}
    </Grid>
      }
 {type== "won" && auctions.length > 0 &&
      <Grid className={styles.cards}>
      {auctions.map((item, index) => {
        console.log(item);
        return (
          <CardAuction key={index} auction={item} className={cardclassName} />
        );
      })}
    </Grid>
      }

    </MainContainer>
  );
};

export default AuctionSection;
