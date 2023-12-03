import React, { useState } from "react";
import styles from "./Home.module.scss";

import TitleAndSubTitle from "../../components/TitleAndSubTitle/TitleAndSubTitle";
import MainContainer from "../../components/Containers/MainContainer";
import Button from "../../components/Buttons/Button";
import Flex from "../../components/Flex/Flex";
import { P12, P14, P16 } from "../../components/TXT/TXT";

import useLoadCaros from "../../hooks/useLoadCaros";

import { home_head, card_home } from "../../assets/images";
import { left_normal_arrow, right_normal_arrow } from "../../assets/svgs";
import {
  list_auctions,
  live_auctions,
  ending_soon,
  finished_auctions,
  delivery_process,
} from "./data";

import AuctionSection from "../../components/AuctionSection/AuctionSection";

function Home() {
  return (
    <div className={styles.main}>
      <Head />
      <ListAuctions />
      <WhoWeAre />
      <AuctionSection
        title="LIVE AUCTION"
        sub_title="Many items are live Now , join fast !"
        auctions={live_auctions}
      />

      <AuctionSection
        title="ENDING SOON🔥​​"
        sub_title="Fast join us !"
        auctions={ending_soon}
      />

      <AuctionSection
        title="FINISHIED AUCTION"
        sub_title="Better luck next time ! "
        auctions={finished_auctions}
      />
      <StepsDelivery />
    </div>
  );
}

export default Home;

const Head = () => {
  return (
    <div className={styles.head}>
      <div className={styles.img_bg}>
        <img src={home_head} alt="" />
      </div>
      <Flex className={styles.overlay}>
        <Button>Join Now </Button>
      </Flex>
    </div>
  );
};

const ListAuctions = () => {
  const { current, Next, Prev } = useLoadCaros(list_auctions, 10);
  const [selected, setSelected] = useState(list_auctions[0]);

  console.log(current);

  return (
    <div className={styles.main_lis_auctions}>
      <MainContainer>
        <Flex flex="center" className={styles.list_auctions}>
          <img
            src={left_normal_arrow}
            alt=""
            className={styles.left}
            onClick={Prev}
          />

          <Flex flex="between" className={styles.list}>
            {current.map((item, index) => {
              let is_selected = selected === item ? styles.selected : "";
              let classname = `${styles.item} ${is_selected}`;
              const Select = () => {
                setSelected(item);
              };
              return (
                <P16
                  weight={300}
                  className={classname}
                  key={index}
                  onClick={Select}
                >
                  {item}
                </P16>
              );
            })}
          </Flex>

          <img
            src={right_normal_arrow}
            alt="Who we are ?"
            className={styles.right}
            onClick={Next}
          />
        </Flex>
      </MainContainer>
    </div>
  );
};

const WhoWeAre = () => {
  return (
    <MainContainer>
      <Flex flex="between" className={styles.who_we_are}>
        <div className={styles.left}>
          <TitleAndSubTitle title="Who we are ?" sub_title="Le lorem ipsum !" />
          <P16>
            Le lorem ipsum est, en imprimerie, une suite de mots sans
            signification utilisée à titre provisoire pour calibrer une mise en
            page, le texte définitif venant remplacer le faux-texte dès qu'il
            est prêt ou que la mise en page est achevée. Généralement, on
            utilise un texte en faux latin, le Lorem ipsum ou LipsumLe lorem
            ipsum est, en imprimerie, une suite de mots sans signification
            utilisée à titre provisoire pour calibrer une mise en page, le texte
            définitif venant remplacer le faux-texte dès qu'il est prêt ou que
            la mise en page est achevée. Généralement, on utilise un texte en
            faux latin, le Lorem ipsum ou Lipsum
          </P16>
        </div>
        <Flex flex="end" className={styles.right}>
          <img src={card_home} alt="" />
        </Flex>
      </Flex>
    </MainContainer>
  );
};

const StepsDelivery = () => {
  return (
    <MainContainer className={styles.steps_delivery}>
      <Flex flex="between" className={styles.items}>
        {delivery_process.map((item, index) => {
          return (
            <Flex className={`${styles.item} ${styles[item.w]}`} key={index}>
              <div className={styles.icon}>
                <img src={item.icon} alt="icon" />
              </div>
              <div className={styles.text}>
                <P14 weight={500} className={styles.title}>
                  {item.title}
                </P14>
                <P12 className={styles.desc}>{item.desc}</P12>
              </div>
            </Flex>
          );
        })}
      </Flex>
    </MainContainer>
  );
};
