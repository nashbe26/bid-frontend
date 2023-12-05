import React from "react";
import styles from "./SellYourArticle.module.scss";
import MainContainer from "../../components/Containers/MainContainer";
import { H49, P14, P16 } from "../../components/TXT/TXT";
import Flex from "../../components/Flex/Flex";
import TextField from "../../components/Inputs/TextField/TextField";
import TextArea from "../../components/Inputs/TextArea/TextArea";
import Select from "../../components/Inputs/Select/Select";
import Button from "../../components/Buttons/Button";

function SellYourArticle() {
  return (
    <MainContainer className={styles.main}>
      <H49 weight={500}>Add product</H49>
      <div className={styles.sub_container}>
        <ImageUpload />

        <div className={styles.box}>
          <ProdName />
          <Description />
        </div>
        <SelectCateg />
        <Prix />
        <AuctionTime />

        <Flex flex="end">
          <Button className={styles.stubmit_btn}>Add product</Button>
        </Flex>
      </div>
    </MainContainer>
  );
}

const ImageUpload = () => {
  return (
    <div className={styles.box}>
      <div className={styles.row}>
        <P14 weight={300}>Add Pictures</P14>
        <Flex className={styles.img_upload}>
          <Button type="outlined">+ Add pictures</Button>
        </Flex>
      </div>
    </div>
  );
};

const ProdName = () => {
  return (
    <Flex flex="between" className={`${styles.row} `}>
      <P16 weight={300}>Product name</P16>
      <TextField placeholder="ex : SOny" className={styles.input} />
    </Flex>
  );
};

const Description = () => {
  return (
    <Flex flex="between" className={`${styles.row} ${styles.with_border}`}>
      <P16 weight={300}>Product name</P16>
      <TextArea rows={5} placeholder="Prodcut desc" className={styles.input} />
    </Flex>
  );
};

const SelectCateg = () => {
  const options = [
    {
      title: "Catégorie 1",
      value: "1",
    },
    {
      title: "Catégorie 2",
      value: "2",
    },
    {
      title: "Catégorie 3",
      value: "3",
    },
  ];
  return (
    <Flex flex="between" className={`${styles.row} ${styles.box}`}>
      <P16 weight={300}>Catégorie</P16>
      <Select
        placeholder="Sélectionne une catégorie"
        className={styles.input}
        options={options}
      />
    </Flex>
  );
};

const Prix = () => {
  return (
    <Flex flex="between" className={`${styles.row} ${styles.box}`}>
      <P16 weight={300}>Prix</P16>
      <TextField placeholder="0,00 $" className={styles.input} />
    </Flex>
  );
};

const AuctionTime = () => {
  const options = [
    {
      title: "1 day",
      value: "1",
    },
    {
      title: "2 days",
      value: "2",
    },
    {
      title: "3 days",
      value: "3",
    },
    {
      title: "4 days",
      value: "4",
    },
    {
      title: "5 days",
      value: "5",
    },
    {
      title: "6 days",
      value: "6",
    },
    {
      title: "7 days",
      value: "7",
    },
  ];
  return (
    <Flex flex="between" className={`${styles.row} ${styles.box}`}>
      <P16 weight={300}>Auction Time</P16>
      <Select placeholder="Time" className={styles.input} options={options} />
    </Flex>
  );
};

export default SellYourArticle;
