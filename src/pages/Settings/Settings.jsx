import React, { useState } from "react";
import styles from "./Settings.module.scss";
import MainContainer from "../../components/Containers/MainContainer";
import Flex from "../../components/Flex/Flex";
import { H36, P16 } from "../../components/TXT/TXT";
import {
  kouba_icon,
  user_icon,
  email_icon,
  edit_icon,
} from "../../assets/svgs";
import Button from "../../components/Buttons/Button";

function Settings() {
  return (
    <MainContainer className={styles.main}>
      <Flex>
        <H36 weight={700}>Settings</H36>
      </Flex>

      <SettingItem icon={user_icon} title="User Name">
        <User />
      </SettingItem>
      <SettingItem icon={email_icon} title="Email">
        <Email />
      </SettingItem>
      <SettingItem icon={kouba_icon} icon2={edit_icon} title="Your password">
        <Password />
      </SettingItem>
    </MainContainer>
  );
}

const SettingItem = ({ icon, title, icon2, children }) => {
  const [show, setShow] = useState(false);
  let show_class = show ? styles.show : "";

  const handle_show = () => {
    setShow(!show);
  };

  return (
    <div className={styles.setting}>
      <HeadParam
        icon={icon}
        title={title}
        icon2={icon2}
        onClick={handle_show}
      />
      <div className={`${styles.content} ${show_class}`}>
        <div className={styles.sub_content}>{children}</div>
      </div>
    </div>
  );
};

const HeadParam = ({ icon, title, icon2, onClick = () => {} }) => {
  return (
    <Flex flex="start" className={styles.header_param} onClick={onClick}>
      <img src={icon} alt="" />
      <P16 weight={600}> {title} </P16>
      {icon2 && <img src={icon2} alt="" className={styles.icon2} />}
    </Flex>
  );
};

// ################################ Settings ################################
const Email = () => {
  return (
    <div className={styles.email}>
      <P16> Confirm your Email: Email@gmail.com </P16>
      <br />
      <br />
      <P16>We have sent you a confirmation code to: Email@gmail.com</P16>
      <P16>Enter your confirmation code here:</P16>

      <input type="text" />

      <Button>HE CONFIRMS</Button>
      <br />
      <br />
      <P16>If you can't find the email:</P16>
      <br />
      <P16 weight={700}>Resend the confirmation code</P16>
      <P16 weight={700}>Enter a new Email</P16>
    </div>
  );
};

const User = () => {
  return (
    <div className={styles.email}>
      <P16> User Full Name : Hatem Ben Echikh </P16>
      <br />
      <P16>First Name</P16>
      <input type="text" defaultValue="Hatem" />

      <br />
      <P16>Last Name</P16>
      <input type="text" defaultValue="Hatem" />
      <br />
      <br />
      <Button>Update</Button>
    </div>
  );
};

const Password = () => {
  return (
    <div className={styles.email}>
      <P16>
        You have to confirm the password change by your mail after the
        modification
      </P16>

      <br />
      <P16>Old Password</P16>
      <input type="text" />
      <br />

      <P16>New Password</P16>
      <input type="text" />
      <br />

      <P16>Confirm New Password</P16>
      <input type="text" />
      <br />

      <Button>Update</Button>
    </div>
  );
};

export default Settings;
