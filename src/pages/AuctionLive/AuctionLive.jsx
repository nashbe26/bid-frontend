import React, { useEffect } from "react";
import styles from "./AuctionLive.module.scss";
import MainContainer from "../../components/Containers/MainContainer";
import MakeAuction from "./MakeAuction/MakeAuction";

import BlogSection from "./BlogSection/BlogSection";
import { blog } from "./data";
import { UseBidById } from "../../utils/functions/bid/bid-fn";
import { useParams } from "react-router-dom";
import DescriptionProject from "./descriptino/description";
import Flex from "../../components/Flex/Flex";

function AuctionLive() {
  
  let { id } = useParams()
  const { data, isLoading, isError, refetch } = UseBidById(id)
  useEffect(() => {
    refetch()
    
    
  }, [id])
  return (
    <MainContainer className={styles.main}>
      <Flex flex="between" className={styles.columnAv}>

        {data && !isLoading &&  
        <BlogSection data={data} />
        } 
        {data && !isLoading &&   
        <MakeAuction data={data} />
        }
      </Flex>
      {data && !isLoading && 
      <DescriptionProject data={data} />
      }
    </MainContainer>
  );
}

export default AuctionLive;
