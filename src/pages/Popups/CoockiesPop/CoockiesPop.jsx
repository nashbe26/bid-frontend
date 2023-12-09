import React from "react";
import styles from "./CoockiesPop.module.scss";
import Popup from "../../../components/Dialogue/Dialogue";
import { P14 } from "../../../components/TXT/TXT";
import Flex from "../../../components/Flex/Flex";
import Button from "../../../components/Buttons/Button";
import { useDispatch, useSelector } from "react-redux";
import { close_cookies } from "../../../store/popups.reducer";

function CoockiesPop() {
  const popups = useSelector((state) => state.popups);
  const { cookies_open } = popups;
  const dispatch = useDispatch();

  const handle_close = () => {
    dispatch(close_cookies());
  };

  const AcceptCookies = () => {
    localStorage.setItem("cookies", true);
    handle_close();
  };

  const RefuseCookies = () => {
    localStorage.setItem("cookies", false);
    handle_close();
  };

  return (
    <Popup open={cookies_open} handleClose={handle_close}>
      <div className={styles.main}>
        <P14 className={styles.p1}>
          Smets uses cookies tha identify your device to provide you with a
          <br />
          better online shoppung experience , tailored to you preferences.
        </P14>
        <P14 weight={500} className={styles.p2}>
          To find more and learn how to opt out , please <br /> visit our
          privacy Policy .
        </P14>

        <Flex flex="evenly" className={styles.btns}>
          <Button
            type="outlined"
            className={styles.btn1}
            onClick={RefuseCookies}
          >
            REFUSE ALL
          </Button>
          <Button
            type="outlined"
            className={styles.btn2}
            onClick={AcceptCookies}
          >
            ACCEPT ALL
          </Button>
        </Flex>
      </div>
    </Popup>
  );
}

export default CoockiesPop;
