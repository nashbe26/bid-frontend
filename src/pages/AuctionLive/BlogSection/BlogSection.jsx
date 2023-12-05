import React from "react";
import styles from "./BlogSection.module.scss";

import Flex from "../../../components/Flex/Flex";
import { H32, P14 } from "../../../components/TXT/TXT";

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

const BlogSection = ({ data = emty }) => {
  return (
    <div className={styles.blogging}>
      <Flex flex="between" className={styles.left}>
        <div className={styles.text_part}>
          <H32 weight={700}>{data.left.title}</H32>
          <P14 weight={300}>{data.left.desc}</P14>
        </div>
        <img src={data.left.img} className={styles.b_img1} alt="" />
      </Flex>
      <Flex flex="between" className={styles.right}>
        <img src={data.right.img} alt="" className={styles.b_img2} />
        <div className={styles.text_part}>
          <H32 weight={700}>{data.right.title}</H32>
          {data.right.steps.map((step, index) => {
            return (
              <P14 key={index} weight={300}>
                {step}
              </P14>
            );
          })}
        </div>
      </Flex>

      <div>
        <img className={styles.b_bottom} src={data.center} alt="" />
      </div>
    </div>
  );
};

export default BlogSection;
