import React, { useState } from "react";
import styles from "./Packs.module.scss";
import MainContainer from "../../components/Containers/MainContainer";
import TitleAndSubTitle from "../../components/TitleAndSubTitle/TitleAndSubTitle";
import Flex from "../../components/Flex/Flex";
import { packs } from "./data";

import { reward, verified_1 } from "../../assets/svgs";
import { H36, P12, P14, P16 } from "../../components/TXT/TXT";
import Button from "../../components/Buttons/Button";
import { loadStripe } from "@stripe/stripe-js";
import customAxios from "../../axios/custom";

function Packs() {
  return (
    <MainContainer className={styles.main}>
      <TitleAndSubTitle title={"Packs"} />
      <Flex flex="center" className={styles.packs}>
        {packs.map((pack, key) => {
          return <Pack pack={pack} key={key} />;
        })}
      </Flex>

      <Flex flex="center" className={styles.reward}>
        <img src={reward} alt="" />
        <div className={styles.infos}>
          <H36 weight={700}>"Zero Risk" Bet Guarantee</H36>
          <P16 weight={500}>
            If you are unable to win, you can always have a refund of all bets
            spent by purchasing the product at the normal price.
          </P16>
        </div>
      </Flex>
    </MainContainer>
  );
}

const Pack = ({ pack = packs[0] }) => {
  const special = pack.price.special;
  const [sessionId, setSessionId] = useState(null);

  const handlePayment = async (data) => {
    const stripePromise = loadStripe('pk_test_51HEvaHLlNX7wORuBb9M0Xm4yYBaiBn6apMqpdxyUPAaFqFKcynJsWhxqsmwsuffuQzO97YY5928975nhugVoIWi600L0o043it');

    try {
      const response = await customAxios.post('/api/v1/payment/create-checkout-session?amount='+data);
      const stripe = await stripePromise;
      await stripe.redirectToCheckout({ sessionId:response.data.sessionId });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className={styles.pack}>
      <Flex flex="start" className={styles.head}>
        <img src={pack.icon} alt="" />
        <div className={styles.infos}>
          <H36 weight={700}>{pack.amount}</H36>
          <P16 weight={500}>{pack.type}</P16>
        </div>
        {pack.tag && (
          <div className={styles.tag}>
            <P12 weight={300}>{pack.tag}</P12>
          </div>
        )}
      </Flex>

      <div className={styles.body}>
        {pack.caracters.map((caracter, key) => {
          return (
            <Flex flex="start" key={key} className={styles.caracter}>
              <img src={verified_1} alt="" />
              <P16 weight={500}>
                {caracter.normal} <span> {caracter.bold} </span>
              </P16>
            </Flex>
          );
        })}
      </div>

      <Flex className={styles.footer}>
        <Button
          className={`${special ? styles.special : ""}`}
          type={special ? "filled" : "outlined"}
          onClick={e => handlePayment(pack.price.value)}
        >
          €{pack.price.value}
        </Button>
        <P14 weight={300}>
          {pack.plus.value} X {pack.plus.is_bet && "Bet"}
          {pack.plus.is_stake && "Stake"}
        </P14>
      </Flex>
    </div>
  );
};

export default Packs;
