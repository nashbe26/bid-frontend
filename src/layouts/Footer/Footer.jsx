import React from "react";
import styles from "./Footer.module.scss";

import MainContainer from "../../components/Containers/MainContainer";
import Flex from "../../components/Flex/Flex";
import { P14, P16, P19 } from "../../components/TXT/TXT";

import { logo2 } from "../../assets/svgs";

import { external_links, LinksGroups, payements } from "./data";
import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <div className={styles.main}>
      <MainContainer className={styles.container}>
        <Flex flex="start" className={styles.content}>
          <div className={styles.part1}>
            <img src={logo2} alt="" className={styles.logo} />
            <Flex flex="start" className={styles.rxs}>
              {external_links.map((link, index) => (
                <NavLink
                  to={link.link}
                  target="_blank"
                  rel="noreferrer"
                  key={index}
                >
                  <img src={link.icon} alt="" />
                </NavLink>
              ))}
            </Flex>
          </div>

          <Flex flex="start" className={styles.part2}>
            {LinksGroups.map((group, index) => {
              return (
                <div key={index} className={styles.group}>
                  <P19 className={styles.main_title} weight={700}>
                    {group.title}
                  </P19>
                  <div>
                    {group.links.map((link, index) => {
                      return (
                        <P16 weight={300} className={styles.link} key={index}>
                          <NavLink to={link.link}>{link.text}</NavLink>
                        </P16>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </Flex>
        </Flex>

        <Flex flex="between" className={styles.bottom}>
          <P14 weight={300}>URAKKAHUUTO ALL RIGHTS RESERVED</P14>

          <Flex flex="start" className={styles.payements}>
            {payements.map((payement, index) => {
              return (
                <NavLink key={index} to={payement.link} target="_blank">
                  <img src={payement.icon} alt="" />
                </NavLink>
              );
            })}
          </Flex>
        </Flex>
      </MainContainer>
    </div>
  );
}

export default Footer;
