import React from "react";
import styles from "./AuctionsTypes.module.scss";
import useLoadCaros from "../../hooks/useLoadCaros";
import MainContainer from "../../components/Containers/MainContainer";
import { left_normal_arrow, right_normal_arrow } from "../../assets/svgs";
import Flex from "../../components/Flex/Flex";
import { auctions_types } from "./data";
import { P13, P16 } from "../../components/TXT/TXT";
import { useNavigate } from "react-router-dom";

const AuctionsTypes = ({ className = "" }) => {
  const { current, Next, Prev, hasNext, hasPrev } = useLoadCaros(
    auctions_types,
    9
  );

  const navigate = useNavigate()

  return (
    <div className={`${styles.main_lis_auctions} ${className}`}>
      <MainContainer>
        <Flex flex="center" className={styles.list_auctions}>
          {hasPrev && (
            <img
              src={left_normal_arrow}
              alt="prev"
              className={styles.left}
              onClick={Prev}
            />
          )}

          <Flex flex="between" className={styles.list}>
            {current.map((item, index) => {
              return (
                <Flex flex="start" className={styles.item} key={index} onClick={e => navigate('/departments/'+item.title)}>
                  <img src={item.icon} alt="" />
                  <P13 weight={400}>{item.title}</P13>
                </Flex>
              );
            })}
          </Flex>

          {hasNext && (
            <img
              src={right_normal_arrow}
              alt="next"
              className={styles.right}
              onClick={Next}
            />
          )}
        </Flex>
      </MainContainer>
    </div>
  );
};

export default AuctionsTypes;
