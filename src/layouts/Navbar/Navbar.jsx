import React from "react";
import styles from "./Navbar.module.scss";

import { logo1, loop } from "../../assets/svgs/index";

import MainContainer from "../../components/Containers/MainContainer";
import Flex from "../../components/Flex/Flex";
import { NavLink } from "react-router-dom";
import UseIsContainUrl from "../../hooks/UseIsContainUrl";
import { P16 } from "../../components/TXT/TXT";

import Button from "../../components/Buttons/Button";

function Navbar() {
  return (
    <MainContainer className={styles.main}>
      <Flex flex="between" className={styles.content}>
        <Logo />
        <Search />
        <Links />
        <Login />
      </Flex>
    </MainContainer>
  );
}

const Logo = () => {
  return (
    <div className={styles.logo}>
      <img src={logo1} alt="" />
    </div>
  );
};

const Search = () => {
  return (
    <Flex flex="start" className={styles.search}>
      <img src={loop} alt="" />
      <input type="text" placeholder="Search" />
    </Flex>
  );
};

const Links = () => {
  const links = [
    {
      name: "Live auctions",
      link: "/live-auctions",
    },
    {
      name: "Auctions closed",
      link: "/auctions-closed",
    },
    {
      name: "Departments",
      link: "/departments",
    },
    {
      name: "Ending soon",
      link: "/ending-soon",
    },
  ];

  return (
    <Flex flex="start" className={styles.links}>
      {links.map((link, key) => (
        <Link link={link} key={key} />
      ))}
    </Flex>
  );
};

const Link = ({ link = { name: "", link: "" } }) => {
  const current = UseIsContainUrl(link.link) ? styles.current : "";

  return (
    <P16 className={`${styles.link} ${current}`}>
      <NavLink to={link.link}>{link.name}</NavLink>
    </P16>
  );
};

const Login = () => {
  return (
    <div className={styles.login}>
      <Button type="outlined">Login</Button>
    </div>
  );
};

export default Navbar;
