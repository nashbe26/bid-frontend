import React, { useEffect } from "react";
import styles from "./SideBar.module.scss";
import { H24, P14, P16 } from "../../components/TXT/TXT";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import useIsCurrentUrl from "../../hooks/UseIsCurrentUrl";
import Flex from "../../components/Flex/Flex";
import UseCompFromLinkList from "../../hooks/UseCompFromLinkList";
import UseIsExactUrl from "../../hooks/UseIsExactUrl";

// ########################### ContainerSideBar ###########################

export const ContainerSideBar = ({ children }) => {
  return (
    <Flex flex="start" className={styles.container_side_bar}>
      {children}
    </Flex>
  );
};

// ########################### SIDE BAR ###########################

export const SideBar = ({ title = "", links = [], main_link = "/" }) => {
  const navig = useNavigate();

  const is_main = UseIsExactUrl(main_link);

  useEffect(() => {
    if (is_main) {
      navig(links[0].link);
    }
  }, [links, is_main]);

  return (
    <div className={styles.side_bar}>
      <H24> {title} </H24>

      <div className={styles.links}>
        {links.map((link, index) => {
          return <OneLink key={index} link={link} />;
        })}
      </div>
    </div>
  );
};

const OneLink = ({
  link = { title: "", link: "", Component: null, sub_links: undefined },
}) => {
  let isCurrentUrl = useIsCurrentUrl(link.link);
  let isExactUrl = UseIsExactUrl(link.link);
  const navig = useNavigate();

  useEffect(() => {
    if (link.sub_links && isExactUrl) {
      navig(link.sub_links[0].link);
    }
  }, [link, isExactUrl]);

  return (
    <div>
      <P16
        weight={400}
        className={`${styles.link} ${isExactUrl ? styles.active : ""}`}
      >
        <NavLink to={link.link}>{link.title}</NavLink>
      </P16>
      <div className={styles.sublinks}>
        {link.sub_links &&
          isCurrentUrl &&
          link.sub_links.map((sub_link, index) => {
            return <SubLink key={index} link={sub_link} />;
          })}
      </div>
    </div>
  );
};

const SubLink = ({ link = { title: "", link: "", Component: null } }) => {
  let isCurrentUrl = useIsCurrentUrl(link.link);
  useEffect(() => {}, [link]);

  return (
    <P14
      weight={400}
      className={`${styles.link} ${styles.sublink} ${
        isCurrentUrl ? styles.active : ""
      }`}
    >
      <NavLink to={link.link}>{link.title}</NavLink>
    </P14>
  );
};

// ########################### CONTAINER ###########################

export const RightContainer = ({ children }) => {
  return <div className={styles.right_container}>{children}</div>;
};

export const PagesWithSideBar = ({
  title = "",
  links = [],
  main_link = "/",
}) => {
  const component = UseCompFromLinkList(links);

  return (
    <ContainerSideBar>
      <SideBar title={title} links={links} main_link={main_link} />
      <RightContainer>{component}</RightContainer>
    </ContainerSideBar>
  );
};

export default SideBar;
