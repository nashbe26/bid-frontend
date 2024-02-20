import React, { useEffect, useState } from "react";
import styles from "./AuctionsClosed.module.scss";
import MainContainer from "../../components/Containers/MainContainer";
import Flex from "../../components/Flex/Flex";
import { table, auction, blog } from "./data";

import { crown, heart_empty, heart_fill } from "../../assets/svgs";
import { H24, P12, P14, P16, P21, P11 } from "../../components/TXT/TXT";
import { sold_out } from "../../assets/images";
import BlogSection from "../AuctionLive/BlogSection/BlogSection";
import useGetTime from "../../hooks/UseGetTime";
import Button from "../../components/Buttons/Button";
import { UseBidById } from "../../utils/functions/bid/bid-fn";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";

function AuctionsClosed() {

  let {id} = useParams()

  const {data,isLoading,isError,refetch} = UseBidById(id)

  useEffect(()=>{
    console.log("here");
    refetch()
  },[id])
  return (
    <MainContainer className={styles.main}>
      {data && !isLoading && 
      <StatsPart bid={data}/>
      }
    </MainContainer>
  );
}

const StatsPart = ({bid}) => {
  return (
    <Flex flex="between" className={styles.top_side}>
      {bid && <Table bid={bid} /> }
      {bid && <ClosedAuction auction={bid} />}
      {bid && <DetailsAuctionClosed auction={bid} />}
      
    </Flex>
  );
};

const Table = ({bid}) => {
  const data = [...table];

  return (
    <div className={styles.table_part}>
      <Flex flex="between" className={styles.table_header}>
        <Flex flex="start">
          <img src={crown} alt="" />
          <div className={styles.txts}>
            <Flex flex="start">
              <P14 className={styles.txt1} weight={600}>
                {bid.winner?.username ? bid.winner.username : 'No Winner Yet'}
              </P14>
              <P14 weight={300}> {bid.message_bid.length} Bets used</P14>
            </Flex>
          </div>
        </Flex>
        <P21 weight={500} className={styles.price}>
          €{bid.last_amount}
        </P21>
      </Flex>

      <table className={styles.table}>
        <thead>
          <tr className={styles.th}>
          <th>PRICE</th>
          <th>HOURS</th>           
          <th>USER</th>
          </tr>
        </thead>
        <tbody>
          {bid.message_bid.map((item, index) => {
            return (
              <tr key={index}>
                <td>€{item.bid_amount}</td>
                <td>{moment(item.createdAt).format('YYYY/MM/DD HH:MM:SS')}</td>
                <td>{item.sender.username}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const ClosedAuction = ({ auction }) => {
  let heart = auction.hearted ? heart_fill : heart_empty;
useEffect(()=>{
  console.log(auction);
},[auction])
  return (
    <div className={styles.closed_auction}>
     <Flex flex="between" className={styles.top}>
        <P21 weight={700}>{auction.status.toUpperCase()}</P21>
        <img src={heart} alt="" />
      </Flex>
      

      <div className={styles.body}>
        <Flex className={styles.img_container}>
          <img src={auction.prod_id.images[0]} alt="" />
        </Flex>
        {auction.status == "closed" && 
        <Flex className={styles.overlay}>
          <img src={sold_out} alt="" />
        </Flex>
        }
      </div>

      <Flex flex="between" className={styles.footer}>
        {auction.prod_id.images.map((img, index) => {
          return <img src={img} alt="" key={index} />;
        })}
      </Flex>
    </div>
  );
};

const DetailsAuctionClosed = ({auction}) => {

  const givenDate = moment(new Date(`${auction.date}T${auction.time}`), 'YYYY/MM/DD HH:mm');

  const [timeDiff, setTimeDiff] = useState(null);
  const [countdown, setCountdown] = useState(null);

  useEffect(() => {
    const updateCountdown = () => {

      const currentTimeDiff = givenDate.diff(moment(), 'seconds') - 1;


      setTimeDiff(currentTimeDiff);
      setCountdown(currentTimeDiff);
    };

    const intervalId = setInterval(updateCountdown, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const navigate = useNavigate()

  return (
    <div className={styles.auction_closes}>
      <H24>{auction.prod_id.title}</H24>

      <Flex flex="start" className={styles.price}>
        <P16 className={styles.value}>{auction.last_amount}</P16>
        <P14 className={styles.money} weight={600}>
          EUR
        </P14>
      </Flex>

      <Flex flex="between" className={styles.start_price}>
        <P14 className={styles.money}>current price : {auction.last_amount}$</P14>
     
      </Flex>

      <P12 className={styles.desc}>
      <div dangerouslySetInnerHTML={{__html:auction.prod_id.description}} />
        
      </P12>
      {
        auction.status == "ending soon" && 
      <div className={styles.auction_closed_in}>
        <P14>Auction {auction.status}</P14>
        <Timer seconds={timeDiff} />
      </div>
}
{
        auction.status == "coming soon"  && 
      <div className={styles.auction_closed_in}>
        <P14>Auction {auction.status}</P14>
        <Timer seconds={timeDiff} />
      </div>
}
      {
        auction.status == "live" && 
        <div className={styles.buttons}>
        <Button onClick={e => navigate('/')} fullWidth className={styles.btn1}>
          Home Page
        </Button>
        <Button  onClick={e => navigate('/live-auctions/'+auction._id)} fullWidth type="outlined" className={styles.btn2}>
          Place a bid
        </Button>
      </div>
      }
      
    </div>
  );
};

const Timer = ({ seconds = 0 }) => {
  const { time } = useGetTime(seconds);
  useEffect(()=>{
    console.log(time);
  },[time])
  return (
    <div className={styles.timer}>
      <Flex flex="between" className={styles.block}>
        <TimeBox title="DAYS" number={time.days} />
        <TimeBox title="HOURS" number={time.hours} />
        <TimeBox title="MINUTES" number={time.minutes} />
        <TimeBox title="SECONDS" number={time.seconds} />
      </Flex>
    </div>
  );
};

const TimeBox = ({ number = "00", title = "" }) => {
  return (
    <Flex className={styles.box}>
      <Flex className={styles.digits}>
        <P16 className={styles.digit}>{number[0]}</P16>
        <P16 className={styles.digit}>{number[1]}</P16>
      </Flex>
      <P11>{title}</P11>
    </Flex>
  );
};

export default AuctionsClosed;
