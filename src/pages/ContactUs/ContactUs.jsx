import React from "react";
import styles from "./ContactUs.module.scss";
import { contact_us_img } from "../../assets/images";
import MainContainer from "../../components/Containers/MainContainer";
import Flex from "../../components/Flex/Flex";
import { H38, P13, P14 } from "../../components/TXT/TXT";
import Button from "../../components/Buttons/Button";

import { contacts } from "./data";

function ContactUs() {
  return (
    <div className={styles.main}>
      <MainContainer>
        <Flex flex="between" className={styles.flex}>
          <div className={styles.form}>
            <H38 weight={500} className={styles.title}>
              CONTACT URAKKAHUUTO
            </H38>

            <input type="text" placeholder="FULL NAME*" />
            <input type="text" placeholder="Email" />
            <input type="text" placeholder="PHONE NUMBER*" />
            <input type="text" placeholder="OBJECT" />
            <textarea type="text" rows={6} placeholder="Message..." />
            <Button fullWidth>SEND</Button>

            <Flex flex="between" className={styles.contacts}>
              {contacts.map((item, index) => {
                return (
                  <Flex key={index} className={styles.item_contact}>
                    <img src={item.icon} alt="" />
                    <div className={styles.txt}>
                      <P14 className={styles.name} weight={600}>
                        {item.name}
                      </P14>
                      <P14 className={styles.value}>{item.value}</P14>
                    </div>
                  </Flex>
                );
              })}
            </Flex>
          </div>
          <div className={styles.img}>
            <img src={contact_us_img} alt="" />
          </div>
        </Flex>
      </MainContainer>
      <div className={styles.blue} />
    </div>
  );
}

export default ContactUs;
