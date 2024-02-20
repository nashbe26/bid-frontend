import React from "react";
import styles from "./BlogSection.module.scss";

import Flex from "../../../components/Flex/Flex";
import { H32, P14 } from "../../../components/TXT/TXT";
import { Link } from "react-router-dom";

const emty = {
  left: {
    title: "",
    img: "",
    desc: "",
  },
  right: {
    title: "",
    img: "",
    steps: [],
  },
  center: "",
};

const BlogSection = ({ data }) => {
  console.log(data);
  return (
    <div className={styles.blogging}>
     <div className={styles.image_prod}>
      <p>{data.prod_id.title} - <Link to={'/user/'+data.owner._id}>{data.owner.username}</Link></p>
      <div className={styles.main_image}>
        <img src={data.prod_id.images[0]}alt={data.prod_id.images[0]} />
      </div>
      <div className={styles.flex_img}>
        {data.prod_id.images.map(x=>{
          return(
            <div className={styles.img_sec}>
              <img src={x} alt="XXX" />
            </div>
          )
        })}
      </div>
     </div>
    </div>
  );
};

export default BlogSection;
