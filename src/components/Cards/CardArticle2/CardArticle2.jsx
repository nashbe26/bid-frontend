import React from "react";
import styles from "./CardArticle2.module.scss";
import Flex from "../../Flex/Flex";
import { P12, P14, P16 } from "../../TXT/TXT";
import { heart_empty, protection, user } from "../../../assets/svgs";

function CardArticle2({ article, with_padding = false, className = "" }) {
  // ############### conditional styles
  let is_with_padding = with_padding ? styles.with_padding : "";

  return (
    <div className={`${styles.article} ${className}`}>
      <Flex flex="start" className={`${styles.user} ${is_with_padding}`}>
        <img src={article.user_img ? article.user_img : user} alt="" />
        <P12 weight={300}>{article.user}</P12>
      </Flex>
      <img src={article.img} className={styles.main_img} alt="" />
      <div className={`${styles.infos} ${is_with_padding}`}>
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
    </div>
  );
}

function EmptyCardArticle2({ children }) {
  return (
    <div className={styles.empty}>
      <P16>{children}</P16>
    </div>
  );
}

export { CardArticle2, EmptyCardArticle2 };
