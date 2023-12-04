import React from "react";
import styles from "./TermsAndCond.module.scss";
import MainContainer from "../../components/Containers/MainContainer";
import { H24, H38, H49, P14 } from "../../components/TXT/TXT";
import { logo2 } from "../../assets/svgs";
import Flex from "../../components/Flex/Flex";

function TermsAndCond() {
  return (
    <MainContainer className={styles.main}>
      <H49 weight={500} className={styles.main_title}>
        Terms & Conditions
      </H49>

      <Flex className={styles.logo_container}>
        <img src={logo2} alt="logo" />
      </Flex>

      <Flex className={styles.content_container}>
        <div className={styles.content}>
          <H38 weight={500}>Terms & Conditions</H38>
          <P14 weight={300}>
            Le lorem ipsum est, en imprimerie, une suite de mots sans
            signification utilisée à titre provisoire pour calibrer une mise en
            page, le texte définitif venant remplacer le faux-texte dès qu'il
            est prêt ou que la mise en page est achevée.
          </P14>

          <br />

          <H24>Your agreement</H24>
          <P14 weight={300}>
            Le lorem ipsum est, en imprimerie, une suite de mots sans
            signification utilisée à titre provisoire pour calibrer une mise en
            page, le texte définitif venant remplacer le faux-texte dès qu'il
            est prêt ou que la mise en page est achevée.Le lorem ipsum est, en
            imprimerie, une suite de mots sans signification utilisée à titre
            provisoire pour calibrer une mise en page, le texte définitif venant
            remplacer le faux-texte dès qu'il est prêt ou que la mise en page
            est achevée.Le lorem ipsum est, en imprimerie, une suite de mots
            sans signification utilisée à titre provisoire pour calibrer une
            mise en page, le texte définitif venant remplacer le faux-texte dès
            qu'il est prêt ou que la mise en page est achevée.
          </P14>

          <hr />

          <H24>Privacy</H24>
          <P14 weight={300}>
            Le lorem ipsum est, en imprimerie, une suite de mots sans
            signification utilisée à titre provisoire pour calibrer une mise en
            page, le texte définitif venant remplacer le faux-texte dès qu'il
            est prêt ou que la mise en page.
          </P14>

          <hr />

          <H24>Linked sites</H24>
          <P14 weight={300}>
            Le lorem ipsum est, en imprimerie, une suite de mots sans
            signification utilisée à titre provisoire pour calibrer une mise en
            page, le texte définitif venant remplacer le faux-texte dès qu'il
            est prêt ou que la mise en page est achevée.
          </P14>

          <hr />

          <H24>Forward looking statements</H24>
          <P14 weight={300}>
            Le lorem ipsum est, en imprimerie, une suite de mots sans
            signification utilisée à titre provisoire pour calibrer une mise en
            page, le texte définitif venant remplacer le faux-texte dès qu'il
            est prêt ou que la mise en page est achevée.
          </P14>
        </div>
      </Flex>
    </MainContainer>
  );
}

export default TermsAndCond;
