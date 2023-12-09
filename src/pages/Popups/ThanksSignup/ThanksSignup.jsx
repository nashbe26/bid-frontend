import React from "react";
import styles from "./ThanksSignup.module.scss";
import Popup from "../../../components/Dialogue/Dialogue";
import { useDispatch, useSelector } from "react-redux";
import { H24, H32, P14, P16 } from "../../../components/TXT/TXT";
import { close_thanks_signup } from "../../../store/popups.reducer";

import { logo1 } from "../../../assets/svgs";

function ThanksSignup() {
  const popups = useSelector((state) => state.popups);
  const { thanks_signup } = popups;
  const dispatch = useDispatch();

  const handle_close = () => {
    dispatch(close_thanks_signup());
  };

  return (
    <Popup open={thanks_signup} handleClose={handle_close}>
      <div className={styles.main}>
        <img src={logo1} alt="" />
        <div className={styles.txts}>
          <H32 weight={700} className={styles.title}>
            Thank you!
          </H32>
          <P16 className={styles.desc}>
            An email verification link has been sent to your <br /> account.
            <br /> Go to your inbox and verify.
          </P16>
        </div>
      </div>
    </Popup>
  );
}

export default ThanksSignup;
