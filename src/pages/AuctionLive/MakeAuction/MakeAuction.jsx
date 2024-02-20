import React, { useEffect, useRef, useState } from "react";
import styles from "./MakeAuction.module.scss";

import Flex from "../../../components/Flex/Flex";
import { P12ERROR, P19, P21 } from "../../../components/TXT/TXT";
import Circle from "../../../components/Circle/Circle";
import Button from "../../../components/Buttons/Button";
import { table } from "../data";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addNewBid, addSumAmount, getCountDown, getStatusCount, selectBid, selectCount, selectPrice, setAmountLast, setBidCreated, setWinnerBidUser } from "../../../store/bidSlice";
import { useParams } from "react-router-dom";
import { UseBidById } from "../../../utils/functions/bid/bid-fn";
import Confetti from 'react-confetti'
import { addMessgeToBid, setWinnerBid } from "../../../api/bid";
import { useMutation } from "@tanstack/react-query";
import { createUser, selectUser } from "../../../store/userSlice";
import { getSocket } from "../../../store/socket";
import { showErrorToast, showSuccessToast } from "../../toast/toast";
import moment from "moment";
import useResponsive from "../../../hooks/UseResponsive";


function MakeAuction({data}) {

  let { id } = useParams()
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(setBidCreated(data))
  }, [data])

  const [amount, setAmount] = useState(0)

  function handleAmout(data) {
    setAmount(data)
  }

  const socket = useSelector(getSocket);
  const user = useSelector(selectUser)

  useEffect(()=>{
    if(socket)
    socket.emit('userJoinBid',{bid_id:id})
  },[socket])

  return (
    <div className={styles.main}>
     
      <ButtonsSelects onChange={handleAmout} />
      <Table />
    </div>
  );
}

const HeaderP1 = () => {

  const bid = useSelector(selectBid);
  const amount = useSelector(selectPrice);
  const [isActive, setIsActive] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState();
  
  const amountBid = useMutation({
    mutationFn: setWinnerBid,
    onError: (error) => {
      console.log("error", error);
    },
    onSuccess: (res) => {
      showSuccessToast("Congratulation "+bid.message_bid[bid.message_bid.length -1].sender.username +' won this Bid !')
    }
  });

  console.log(bid);
  let { id } = useParams()
  useEffect(() => {
    if(bid &&bid.prod_id  ){
      const endDate = moment(bid.date_end+" "+ bid.time_end);
      
      const interval = setInterval(() => {
        const now = moment();
        const diff = moment.duration(endDate.diff(now));
        if (diff <= 0) {
          clearInterval(interval);
          if(bid.message_bid.length >0 && bid.status != "closed" ){
          
            amountBid.mutate({winner:bid.message_bid[bid.message_bid.length -1].sender._id,id})
            
            setIsActive(true)
            
            setTimeout(() => {
              setIsActive(false)
            }, 5000);
          
          }
        } else {
          setTimeRemaining(diff);
        }

      }, 1000);
    
      return () => clearInterval(interval);
  }
}, [bid]);

const formatTime = (value) => {
  return value.toString().padStart(2, '0');
};
  return (
    <Flex flex="between" className={styles.head}>
      {bid.prod_id &&timeRemaining && <P19 weight={400}>Remainig Time:  {formatTime(timeRemaining.days())}:{formatTime(timeRemaining.hours())}:{formatTime(timeRemaining.minutes())}:{formatTime(timeRemaining.seconds())} </P19>}
      <P21 weight={400} className={styles.price}>
        {!amount ? bid.last_amount :amount}$
      </P21>
    </Flex>
  );
};



const ButtonsSelects = ({ onChange }) => {

  let { id } = useParams()

  const dispatch = useDispatch()
  const user = useSelector(selectUser)

  const socket = useSelector(getSocket)
  const { control, handleSubmit } = useForm()

  const createBid = useMutation({
    mutationFn: addMessgeToBid,
    onError: (error) => {
      console.log("error", error);
    },
    onSuccess: (res) => {
      socket.emit('newBid', { ...res.messageBid, roomId: id,last_amount:res.bid.last_amount });
      dispatch(createUser(res.user));
      dispatch(setAmountLast(res.bid.last_amount))
    }
  });
  
  const bid = useSelector(selectBid);
  const amount = useSelector(selectPrice);
  useEffect(() => {
    if (socket)
      socket.on('receiveBid', (data) => {

        dispatch(addNewBid(data));
        dispatch(addSumAmount(data.bid_amount))
        dispatch(setAmountLast(data.last_amount))
        
      })
  }, [socket])

  function submit(data) {


      let bid = {
        id,
        bid_amount: data.amount,
        sender: user._id
      }
      createBid.mutate(bid)
    }
  

  function handleData(data) {
   
    dispatch(addNewBid({
      bid_amount: data,
      sender: "alaa"
    }));
    dispatch(addSumAmount(data));
  
  }
  const [isActive, setIsActive] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState();
  const amountBid = useMutation({
    mutationFn: setWinnerBid,
    onError: (error) => {
      console.log("error", error);
    },
    onSuccess: (res) => {
      showSuccessToast("Congratulation "+bid.message_bid[bid.message_bid.length -1].sender.username +' won this Bid !')
    }
  });
  useEffect(() => {
    if(bid &&bid.prod_id  ){
      const endDate = moment(bid.date_end+" "+ bid.time_end);
      const interval = setInterval(() => {
        const now = moment();
        const diff = moment.duration(endDate.diff(now));
        
        if (diff <= 0) {
          clearInterval(interval);
          if(bid.message_bid.length >0 && bid.status != "closed" ){
          
            amountBid.mutate({winner:bid.message_bid[bid.message_bid.length -1].sender._id,id})
            
            setIsActive(true)
            
            setTimeout(() => {
              setIsActive(false)
            }, 5000);
          
          }
        } else {
          setTimeRemaining(diff);
        }

      }, 1000);
    
      return () => clearInterval(interval);
  }
}, [bid]);

  return (
    <div className={styles.box_one}>
     <HeaderP1 />
    <Flex className={styles.buttons_selects}>
          {isActive &&
          <Confetti
          />
        }
      <form onSubmit={handleSubmit(submit)}>
        <Flex flex="between" className={styles.amount}>
          <Controller
            name="amount"
            rules={{
              required: 'Amount is required',
              pattern: {
                value: /^[+-]?[0-9]+$/,
                message: 'Invalid amount. Please enter a valid number.',
              },
            }}
            control={control}
            render={({ field, fieldState }) => (
              <div>
                <input
                  placeholder={bid.last_amount}
                  name="amount"
                  {...field}
                />
                {fieldState.error && <P12ERROR>{fieldState.error.message}</P12ERROR>}
              </div>
            )}
          />
          <Button className={styles.send} type="submit">
            Send
          </Button>
        </Flex>
      </form>
      
    </Flex>
    </div>
  );
};

const Table = () => {
  const data = [...table];
  const bid = useSelector(selectBid);
  const isMobile = useResponsive()

  return (
    <table className={styles.table}>
      <thead>
        <tr className={styles.th}>
          <th>PRICE</th>
          <th>HOURS</th>           
          <th>USER</th>
        </tr>
      </thead>
      <tbody>
        {bid.message_bid && bid.message_bid.map((item, index) => {
          return (
            <tr key={index}>
              <td>{item.bid_amount}</td>
               <td>{moment(item.createdAt).format('MM/DD HH:SS')}</td>
             
              <td>{item.sender.username}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default MakeAuction;
