import React from "react";
import styles from "./AuthPop.module.scss";
import Popup from "../../../components/Dialogue/Dialogue";
import { useDispatch, useSelector } from "react-redux";
import { google_icon, logo1 } from "../../../assets/svgs";
import { H24, P10, P12, P14, P16, P17 } from "../../../components/TXT/TXT";
import { close_auth } from "../../../store/popups.reducer";
import Flex from "../../../components/Flex/Flex";
import Button from "../../../components/Buttons/Button";
import { NavLink } from "react-router-dom";

function AuthPop() {
  const popups = useSelector((state) => state.popups);
  const { auth_open } = popups;
  const dispatch = useDispatch();

  const [is_login, setis_login] = React.useState(true);

  const MakeLogin = () => {
    setis_login(true);
  };

  const MakeRegister = () => {
    setis_login(false);
  };

  const handle_close = () => {
    dispatch(close_auth());
  };

  return (
    <Popup open={auth_open} handleClose={handle_close}>
      <div className={styles.main}>
        <div className={styles.container}>
          <img src={logo1} alt="" className={styles.logo} />
          <div className={styles.auth}>
            <H24 className={styles.title} weight={600}>
              {is_login ? "Log In To" : "Sign Up"}
            </H24>
            <WithGoogle />
            <Or />
            {is_login && <Login handle_close={handle_close} />}
            {!is_login && <Register handle_close={handle_close} />}
          </div>
        </div>
        <div className={styles.footer}>
          {is_login && <FooterLogin onClick={MakeRegister} />}
          {!is_login && <FooterRegister onClick={MakeLogin} />}
        </div>
      </div>
    </Popup>
  );
}

// ############################## LOGIN ##############################

const Login = ({ handle_close = () => {} }) => {
  return (
    <div className={styles.form}>
      <Input placeholder="Email/ Username" />
      <Input placeholder="password" />
      <Flex flex="between">
        <CheckBox rememer handle_close={handle_close} />
        <P14 className={styles.forget_pass}>Forgot Password?</P14>
      </Flex>

      <Button fullWidth className={styles.btn}>
        Continue
      </Button>
    </div>
  );
};

const FooterLogin = ({ onClick = () => {} }) => {
  return (
    <Flex>
      <P16 className={styles.txt_footer}>
        Not a member yet? <span onClick={onClick}>Join now</span>
      </P16>
    </Flex>
  );
};

// ############################## REGISTER ##############################

const Register = ({ handle_close = () => {} }) => {
  return (
    <div className={styles.form}>
      <Input placeholder="Enter your email" />
      <Input
        placeholder="Create password"
        hint="8 characters or longer. Combine upper and lowercase letters and numbers."
      />
      <Input placeholder="Confirm password" />
      <CheckBox tearm_and_cond handle_close={handle_close} />

      <Button fullWidth className={styles.btn}>
        Continue
      </Button>
    </div>
  );
};

const FooterRegister = ({ onClick = () => {} }) => {
  return (
    <Flex>
      <P16 className={styles.txt_footer}>
        Already a member ? <span onClick={onClick}>Sign In</span>
      </P16>
    </Flex>
  );
};

// ############################## OTHERS ##############################

const WithGoogle = () => {
  return (
    <Flex className={styles.with_google}>
      <img src={google_icon} alt="" />
      <P17 weight={500}> Continue with google </P17>
    </Flex>
  );
};

const Or = () => {
  return (
    <Flex className={styles.or}>
      <span className={styles.line} />
      <P17 weight={500}> Or </P17>
    </Flex>
  );
};

const Input = ({ placeholder = "", hint }) => {
  return (
    <div className={styles.input}>
      <input type="text" placeholder={placeholder} />
      <P10 className={styles.hint}>{hint}</P10>
    </div>
  );
};

const CheckBox = ({
  tearm_and_cond = false,
  rememer = false,
  handle_close,
}) => {
  const [checked, setchecked] = React.useState(false);
  const check_style = checked ? styles.checked : styles.not_checked;
  const handle_check = () => {
    setchecked(!checked);
  };

  return (
    <Flex flex="start" className={styles.checkbox}>
      <input type="checkbox" className={check_style} onClick={handle_check} />
      {tearm_and_cond && (
        <P12 className={styles.text}>
          I agree to the Rise{" "}
          <NavLink to="/terms-and-conditions" onClick={handle_close}>
            Terms of use
          </NavLink>{" "}
          and{" "}
          <NavLink to="/terms-and-conditions" onClick={handle_close}>
            Privacy Policy
          </NavLink>
        </P12>
      )}
      {rememer && <P12 className={styles.text}>Remember me</P12>}
    </Flex>
  );
};

export default AuthPop;
