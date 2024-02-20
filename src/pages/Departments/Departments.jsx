import React, { useEffect, useState } from "react";
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
import { P12, P12ERROR, P14, P16, P21 } from "../../components/TXT/TXT";
import { close, loop, white_close } from "../../assets/svgs";
import { Drawer, Slider } from "@mui/material";
import { useForm } from "react-hook-form";
import { showErrorToast } from "../toast/toast";
import { chnagePassword } from "../../api/user";
import { useMutation } from "@tanstack/react-query";
import { searchBid } from "../../api/bid";
import { selectSearch, setSearchBid } from "../../store/bidSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function Departments() {
  const [open_filter, set_open_filter] = useState(true);
  let {id} = useParams()
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

  const { register, handleSubmit, watch , formState: { errors } } = useForm({
    defaultValues: {
      search: '',

    },
  });
  

  const [value, setValue] = React.useState([5, 5000]);

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  let {id} = useParams();
  
  useEffect(()=>{
    if(id.length >0 && value.length>0 )
     updateUsers.mutate({search:id,price:value,type:selected_types_auctions});
  },[id,value])

  const [selected_types_auctions, set_selected_types_auctions] = useState(null);
  const [arrayOfValues, setArrayOfValues] = useState([]);

  const SelectType = (index) => {
    if (selected_types_auctions === index) {
      set_selected_types_auctions(-1);
    } else {
      set_selected_types_auctions(index);
    }
  };

  const dispatch = useDispatch()

   const updateUsers = useMutation({

    mutationFn: searchBid,

    onError: (error) => {
      if (error.response.data.error)
      showErrorToast("Something went worng!")

    },
    onSuccess: (data) => {
        dispatch( setSearchBid(data))

    },

  });
  function submit(data){
    setArrayOfValues(old => [...old,data.search])
    updateUsers.mutate({...data,price:value,type:selected_types_auctions});
  }
  const handleDelete = (index) => {
    setArrayOfValues(old => old.filter((data, i) => data !== index));
  };

  return (
    open_filter && (
      <div className={styles.part1}>
        <Flex flex="between" className={styles.header}>
          <P21 weight={700}>Filters</P21>
          <img src={close} alt="" onClick={closeFilter} />
        </Flex>
        <form onSubmit={handleSubmit(submit)}>
        <Flex className={styles.search}>
          <img src={loop} alt="" />
          <input type="text" placeholder="Search for product" {...register('search', { required: 'This field is required' })} />
        </Flex>
          {errors.search && <P12ERROR>{errors.search.message}</P12ERROR>}

        <hr />

        <P16 weight={500}>Product</P16>
        <Flex flex="start" className={styles.searched_items}>
          {arrayOfValues.map((item, index) => (
            <Flex flex="start" key={index} className={styles.searched_item}>
              <P12 weight={500}>{item}</P12>
              <img src={white_close} alt="" onClick={e => handleDelete(item)}/>
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
          min={5}
          max={5000}
          onChange={handleChange}
          valueLabelFormat={(x) => `${x}$`}
        />
        <Flex flex="between" className={styles.slide_values}>
          <P12>$5</P12>
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
        </form>
        
      </div>
    )
  );
};


const Part2 = ({ open_filter = false }) => {
  const op_filt_st = open_filter ? styles.opened_filter : "";

  const auctions = useSelector(selectSearch)
  const [array,setArray] = useState([])
  useEffect(()=>{
    setArray(auctions)
    console.log(auctions);
  },[auctions])
  
  
  return (
    <div className={`${styles.part2} ${op_filt_st}`}>
      <AuctionSection
        className={styles.auctions_section}
        title="COMPANY LIVE AUCTION​"
        auctions={array.filter(x=> x.prod_id.type == "company")}
        cardclassName={styles.card}
        type="company"
      />

      <AuctionSection
        className={styles.auctions_section}
        title="INDIVIDUAL LIVE AUCTION​"
        auctions={array.filter(x=> x.prod_id.type == "individual")}
        cardclassName={styles.card}
        type="individual"
      />
    </div>
  );
};

export default Departments;
