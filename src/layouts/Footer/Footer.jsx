import React from "react";
import styles from "./Footer.module.scss";

import Flex from "../../components/Flex/Flex";
import MainContainer from "../../components/Containers/MainContainer";

import { logo2, box_face, box_inst, box_link } from "../../assets/svgs";
import { P12, P14, P16 } from "../../components/TXT/TXT";

import { LinksGroups, LinkGroupExmp } from "./data";
import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <div className={styles.main}>
      <MainContainer>
        <Flex flex="between" className={styles.footer_top}>
          <div className={styles.part1}>
            <div className={styles.logo}>
              <img src={logo2} alt="" />
            </div>

            <div className={styles.desc}>
              <P16 weight={300} className={styles.title}>
                Lecoindine
              </P16>
              <P14 weight={200}>
                Lecoindine I Une Oummah, une <br /> multitude d’articles qui
                correspondent à <br /> tes principes et tes valeurs.
              </P14>
            </div>
          </div>

          <Flex flex="between" className={styles.part2}>
            {LinksGroups.map((links_group, key) => {
              return <LingGroup key={key} links_group={links_group} />;
            })}
          </Flex>
        </Flex>

        <Flex flex="between" className={styles.footer_bottom}>
          <P16 weight={300} className={styles.title}>
            © 2023 LECOINDINE - ALL RIGHTS RESERVED | RELEASED BY XSUSTAIN.
          </P16>
          <Flex flex="center" className={styles.rxs}>
            <img src={box_inst} alt="" />
            <img src={box_face} alt="" />
            <img src={box_link} alt="" />
          </Flex>
        </Flex>
      </MainContainer>
    </div>
  );
}

const LingGroup = ({ links_group = LinkGroupExmp }) => {
  return (
    <div className={styles.links_group}>
      <P14 weight={500} className={styles.title}>
        {links_group.title}
      </P14>
      {links_group.links.map((link, key) => {
        return (
          <P12 weight={300} key={key} className={styles.link}>
            <NavLink to={link.link}> {link.text} </NavLink>
          </P12>
        );
      })}
    </div>
  );
};

export default Footer;
