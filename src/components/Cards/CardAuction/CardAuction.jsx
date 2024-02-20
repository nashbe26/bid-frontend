import React, { useEffect } from "react";
import styles from "./CardAuction.module.scss";
import {
  heart_fill,
  heart_empty,
  blue_comp,
  blue_ppl,
  clock,
  cup,
} from "../../../assets/svgs";
import { P14, P17, P18, P19, P12 } from "../../TXT/TXT";
import Flex from "../../Flex/Flex";
import Button from "../../Buttons/Button";
import { sold_out } from "../../../assets/images";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createUser, selectUser } from "../../../store/userSlice";
import { useMutation } from "@tanstack/react-query";
import { addToFav, deleteToFav } from "../../../api/user";
import { showSuccessToast } from "../../../pages/toast/toast";
import moment from "moment";

const c_type = {
  company: blue_comp,
  individual: blue_ppl,
};

const empty_auction = {
  live: true,
  title: "",
  price: "",
  img: "",
  name_bid: "",
  starting_price: "",
  with_icon: "",
  end_date: new Date(),
  end_soon: false,
  finis_price: "",
  hearted: false,
  win: false,
};

const CardAuction = ({ auction = empty_auction, className = "" }) => {
  
  let styles_state

  if(auction.status == "live"){
    styles_state = styles.live
  }else if(auction.status == "coming soon"){
    styles_state = styles.closed
  }else if(auction.status == "closed"){
    styles_state = styles.closed
  }else if(auction.status == "ending soon"){
    styles_state = styles.closed
  }


  return (
    <div className={`${styles.auction} ${styles_state} ${className}`}>
      <Header auction={auction} />
      <Image auction={auction} />
      <EndSoon auction={auction} />
      <Content auction={auction} />
    </div>
  );
};

const Header = ({ auction = empty_auction }) => {
  
  let heart = auction.hearted ? heart_fill : heart_empty;

  const user = useSelector(selectUser)
  const dispatch = useDispatch()


  const favBid = useMutation({
    mutationFn: addToFav,
    onError: (error) => {
      console.log("error", error);
    },
    onSuccess: (res) => {
      showSuccessToast('Bid just add to your favorites !')
      dispatch(createUser(res.user))
    }
  });

  const deleteBid = useMutation({
    mutationFn: deleteToFav,
    onError: (error) => {
      console.log("error", error);
    },
    onSuccess: (res) => {
      showSuccessToast('Bid was delete from your favorites !')
      dispatch(createUser(res.user))
    }
  });

  function addToFavs () {
    favBid.mutate({id:auction._id})
  }

  function deleteToFavs () {
    deleteBid.mutate({id:auction._id})
  }

  return (
    <Flex flex="between" className={styles.head}>
      <P18> {auction?.status} </P18>
      {user &&  user.fav_bid?.find(x=>x == auction._id) ? <img src={heart_fill} alt="" className={styles.icon} onClick={deleteToFavs} /> : <img src={heart_empty} alt="" className={styles.icon} onClick={addToFavs } /> }
      
    </Flex>
  );
};

const Image = ({ auction = empty_auction }) => {
  let cercle_item = auction.type ? c_type[auction.type] :null;
  let over_img = auction.winner ? cup : sold_out;

  const navigate = useNavigate();
  const SeeEndAuction = () => {
    navigate(`/product-list/`+auction._id);
  };

  console.log(auction);

  return (
    <Flex flex="center" className={styles.auction_img} onClick={SeeEndAuction}>
        <div className={auction.status == 'closed' ? styles.img : styles.img_live }>
          <img src={auction.prod_id.images[0]} alt="" />
        </div>
    

      {auction.type == 'company' &&  (
        <div className={styles.overlay}>
            <Flex flex="center" className={styles.cercle_item}>
              <Flex flex="center" className={styles.cercle_item}>
                <img src={cercle_item} alt="" />
              </Flex>
              <P12>{auction.type}</P12>
            </Flex>
        </div>
          )}
      {auction.status == 'closed'  && (
        <Flex
          flex="center"
          onClick={SeeEndAuction}
          className={styles.overlay_closed}
        >
          <img src={over_img} alt="sold out" />
        </Flex>
      )}
    </Flex>
  );
};

const EndSoon = ({ auction = empty_auction }) => {
  console.log(auction);
  return auction.status == "ending soon" ? (
    <Flex flex="center" className={styles.finish_in}>
      <img src={clock} alt="" />
      <P17 weight={700}>Finish in : {moment(`${auction.date_end}T${auction.time_end}`).startOf('minute').fromNow()}</P17>
    </Flex>
  ) : null;
};

const Content = ({ auction = empty_auction, JoinAuction = () => {} }) => {
  let end_price = 'City :' + auction.prod_id.city;

  return (
    <div className={styles.content}>
      <Flex flex="between" className={styles.title_and_price}>
        <P19 weight={700} className={styles.title}>
          {auction.prod_id.title}
        </P19>
        <P18 weight={700} className={styles.price}>
          {auction.last_amount}$
        </P18>
      </Flex>

      <P14 className={styles.name_bid}>{auction.owner.username} bid</P14>
      <P14 className={styles.starting_price}>
        {end_price}
      </P14>

      {auction.status == 'live' && (
        <Button type="fill" fullWidth>
          <NavLink to={"/live-auctions/"+auction._id}>Join Biding</NavLink>
        </Button>
      )}
    </div>
  );
};

export default CardAuction;
