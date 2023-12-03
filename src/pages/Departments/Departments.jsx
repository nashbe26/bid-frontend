import React, { useState } from "react";
import styles from "./Departments.module.scss";
import AuctionsTypes from "../../common/AuctionsTypes/AuctionsTypes";
import MainContainer from "../../components/Containers/MainContainer";
import AuctionSection from "../../components/AuctionSection/AuctionSection";
import { GiSettingsKnobs } from "react-icons/gi";
import {
  company_live_auctions,
  individual_live_auctions,
  types_auctions,
} from "./data";
import Flex from "../../components/Flex/Flex";
import Button from "../../components/Buttons/Button";
import { P12, P14, P16, P21 } from "../../components/TXT/TXT";
import { close, loop, white_close } from "../../assets/svgs";
import { Slider } from "@mui/material";

function Departments() {
  const [open_filter, set_open_filter] = useState(true);

  const closeFilter = () => {
    set_open_filter(false);
  };

  const openFilter = () => {
    set_open_filter(true);
  };

  return (
    <div className={styles.main}>
      <AuctionsTypes className={styles.auction_types} />
      <MainContainer className={styles.container}>
        {!open_filter && (
          <Flex className={styles.open_filter} onClick={openFilter}>
            <GiSettingsKnobs className={styles.icon} />
          </Flex>
        )}

        <Flex flex="between" className={styles.parts}>
          <Part1 open_filter={open_filter} closeFilter={closeFilter} />
          <Part2 open_filter={open_filter} />
        </Flex>
      </MainContainer>
    </div>
  );
}

const Part1 = ({ open_filter = false, closeFilter = () => {} }) => {
  const searched_items = ["Bike", "Bike", "Bike"];

  const [value, setValue] = React.useState([100, 5000]);

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  const [selected_types_auctions, set_selected_types_auctions] = useState(null);

  const SelectType = (index) => {
    if (selected_types_auctions === index) {
      set_selected_types_auctions(-1);
    } else {
      set_selected_types_auctions(index);
    }
  };

  return (
    open_filter && (
      <div className={styles.part1}>
        <Flex flex="between" className={styles.header}>
          <P21 weight={700}>Filters</P21>
          <img src={close} alt="" onClick={closeFilter} />
        </Flex>

        <Flex className={styles.search}>
          <img src={loop} alt="" />
          <input type="text" placeholder="Search for product" />
        </Flex>

        <hr />

        <P16 weight={500}>Product</P16>
        <Flex flex="start" className={styles.searched_items}>
          {searched_items.map((item, index) => (
            <Flex flex="start" key={index} className={styles.searched_item}>
              <P12 weight={500}>{item}</P12>
              <img src={white_close} alt="" />
            </Flex>
          ))}
        </Flex>

        <br />

        <P16 weight={500}>Budget</P16>
        <Slider
          getAriaLabel={() => "Temperature range"}
          className={styles.slider}
          valueLabelDisplay="$"
          value={value}
          min={100}
          max={5000}
          onChange={handleChange}
          valueLabelFormat={(x) => `${x}$`}
        />
        <Flex flex="between" className={styles.slide_values}>
          <P12>$100</P12>
          <P12>$5000</P12>
        </Flex>

        <hr />

        <P16 weight={500}>Type</P16>

        <Flex flex="start" className={styles.types_auctions}>
          {types_auctions.map((type, index) => {
            const selected_style =
              selected_types_auctions === index ? styles.selected_type : "";
            return (
              <Flex
                onClick={() => {
                  SelectType(index);
                }}
                flex="center"
                key={index}
                className={`${styles.type_auction} ${selected_style}`}
              >
                <img src={type.icon} alt="" />
                <P14 weight={300}>{type.title}</P14>
              </Flex>
            );
          })}
        </Flex>

        <Flex flex="between" className={styles.buttons}>
          <Button type="outlined" className={styles.btn1}>
            Cancel
          </Button>
          <Button className={styles.btn2}>Show Results (20)</Button>
        </Flex>
      </div>
    )
  );
};

const Part2 = ({ open_filter = false }) => {
  const op_filt_st = open_filter ? styles.opened_filter : "";
  return (
    <div className={`${styles.part2} ${op_filt_st}`}>
      <AuctionSection
        className={styles.auctions_section}
        title="COMPANY LIVE AUCTION​"
        auctions={company_live_auctions}
        cardclassName={styles.card}
      />

      <AuctionSection
        className={styles.auctions_section}
        title="INDIVIDUAL LIVE AUCTION​"
        auctions={individual_live_auctions}
        cardclassName={styles.card}
      />
    </div>
  );
};

export default Departments;
