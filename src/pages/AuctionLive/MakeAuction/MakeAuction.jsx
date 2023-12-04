import React from "react";
import styles from "./MakeAuction.module.scss";

import Flex from "../../../components/Flex/Flex";
import { P19, P21 } from "../../../components/TXT/TXT";
import Circle from "../../../components/Circle/Circle";
import Button from "../../../components/Buttons/Button";
import { table } from "../data";

function MakeAuction() {
  return (
    <div className={styles.main}>
      <HeaderP1 />
      <CircleP1 />
      <ButtonsSelects />
      <Table />
    </div>
  );
}

const HeaderP1 = () => {
  return (
    <Flex flex="between" className={styles.head}>
      <P19 weight={700}>Starting Time: 8:01</P19>
      <P21 weight={700} className={styles.price}>
        €30.05
      </P21>
    </Flex>
  );
};

const CircleP1 = ({ perct = 20 }) => {
  return (
    <Flex className={styles.c_container}>
      <div className={styles.c1}>
        <Flex flex="center" className={styles.content}>
          <h1>4</h1>
          <P21 weight={300}>andreto30</P21>
        </Flex>
        <Flex flex="center" className={styles.content2}>
          <Circle percentage={75} className={styles.c2} />
        </Flex>
        <Flex flex="center" className={styles.content3}>
          <Circle percentage={perct * 0.75} className={styles.c2} />
        </Flex>
      </div>
    </Flex>
  );
};

const ButtonsSelects = () => {
  return (
    <Flex className={styles.buttons_selects}>
      <Button className={styles.place_bet}>Place your bet</Button>

      <Flex className={styles.choises}>
        <Button className={styles.choise}>+10</Button>
        <Button className={styles.choise}>+20</Button>
        <Button className={styles.choise}>+50</Button>
        <Button className={styles.choise}>+100</Button>
      </Flex>
    </Flex>
  );
};

const Table = () => {
  const data = [...table];

  return (
    <table className={styles.table}>
      <thead>
        <tr className={styles.th}>
          <th>PRICE</th>
          <th>MODE</th>
          <th>HOURS</th>
          <th>USER</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => {
          return (
            <tr key={index}>
              <td>{item.PRICE}</td>
              <td>{item.MODE}</td>
              <td>{item.HOURS}</td>
              <td>{item.USER}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default MakeAuction;
