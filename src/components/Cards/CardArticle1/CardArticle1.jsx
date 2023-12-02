import React from "react";
import styles from "./CardArticle1.module.scss";
import Flex from "../../Flex/Flex";
import { P12, P14, P16 } from "../../TXT/TXT";
import { heart_empty, protection } from "../../../assets/svgs";
import verif_img from "../../../assets/images/permats/verifier.png";

function CardArticle1({ article }) {
  return (
    <div className={styles.article}>
      <img src={article.img} className={styles.main_img} alt="" />
      <Flex flex="between" className={styles.price_heart}>
        <P14 weight={500}>{article.price} €</P14>
        <Flex flex="start" className={styles.likes}>
          <img src={heart_empty} alt="" />
          <P12 weight={500}>{article.likes}</P12>
        </Flex>
      </Flex>
      <Flex flex="start" className={styles.price2_sheald}>
        <P12>{article.price2} € incl.</P12>
        <img src={protection} alt="" />
      </Flex>
      <div className={styles.additionals}>
        {article.qtt && <P12>{article.qtt}</P12>}
        {article.type && <P12>{article.type}</P12>}
        {article.sizes && <P12>{article.sizes}</P12>}
        {article.c_a && <P12>{article.c_a}</P12>}
      </div>
    </div>
  );
}

function EmptyCardArticle1({ children }) {
  return (
    <div className={styles.empty}>
      <P16>{children}</P16>
    </div>
  );
}

function FaitVerifierCardArticle({ children }) {
  return (
    <div className={styles.verif}>
      <img src={verif_img} alt="" />
    </div>
  );
}

export { CardArticle1, EmptyCardArticle1, FaitVerifierCardArticle };
