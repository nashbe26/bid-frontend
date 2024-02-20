import React, { useEffect, useState } from "react";
import styles from "./AuthPop.module.scss";
import Popup from "../../../components/Dialogue/Dialogue";
import { useDispatch, useSelector } from "react-redux";
import { google_icon, logo1 } from "../../../assets/svgs";
import { H24, P10, P12, P14, P16, P17 } from "../../../components/TXT/TXT";
import { close_auth } from "../../../store/popups.reducer";
import Flex from "../../../components/Flex/Flex";
import Button from "../../../components/Buttons/Button";
import { NavLink, useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { ForgotPassword, LoginFn, RegisterFn } from "../../../api/auth";
import { showSuccessToast } from "../../toast/toast";
import { createUser, selectType } from "../../../store/userSlice";
import { GoogleLoginButton } from "react-social-login-buttons";

function AuthPop() {
  const popups = useSelector((state) => state.popups);
  const { auth_open } = popups;
  const dispatch = useDispatch();

  const [is_login, setis_login] = React.useState("login");

  const MakeLogin = () => {
    setis_login("login");
  };

  const MakeRegister = () => {
    setis_login("register");
  };
  const MakeForgot = () => {
    setis_login("forgot");
  };
  const handle_close = () => {
    dispatch(close_auth());
  };

  return (
    <Popup open={auth_open} handleClose={handle_close}>
      <div className={styles.main}>
        <div className={styles.container}>
          <div className={styles.auth}>
            <H24 className={styles.title} weight={600}>
              {is_login =="login" && "Log In To"}
              {is_login =="register" && "Sign Up"}
              {is_login =="forgot" && "Forgot password"}
            </H24>
            {!is_login =="forgot" && <WithGoogle />}
            {!is_login =="forgot" && <Or />}
            
            
            {is_login =="login" && <Login handle_close={handle_close} onClick={MakeForgot} />}
            {is_login=="register"  && <Register handle_close={handle_close}/>}
            {is_login=="forgot"  && <Forgot handle_close={handle_close} />}
          </div>
        </div>
        <div className={styles.footer}>
          {is_login  =="login" && <FooterLogin onClick={MakeRegister} />}
          {is_login =="register"&& <FooterRegister onClick={MakeLogin} />}
            {is_login=="forgot"  && <FooterForgot onClick={MakeLogin} />}
        </div>
      </div>
    </Popup>
  );
}

// ############################## LOGIN ##############################

const Login = ({ handle_close = () => { } ,onClick}) => {

  const { control, handleSubmit } = useForm();
  const [msg, setMsg] = useState('');
  const dispatch = useDispatch();
  const loginMutation = useMutation({

    mutationFn: LoginFn,

    onError: (error) => {

      if (error.response.data.error)
        setMsg(error.response.data.error)

    },
    onSuccess: (data) => {
      console.log(data);
      localStorage.setItem('token', data.accessToken)
      dispatch(createUser(data.user))
      dispatch(close_auth());
      showSuccessToast('Welcome to your profile !')
      setTimeout(() => {
        window.location.reload()
      }, 2000);
    },

  });

  const onSubmit = (data) => {
    loginMutation.mutate(data)
  };

  useEffect(() => {
    console.log(msg);
  }, [msg])

  function handleClick(){
    onClick('forgot')
  }

  const type = useSelector(selectType)

  return (
    <div className={styles.form}>
      <form onSubmit={handleSubmit(onSubmit)}>

        <P14>{msg.length > 0 && msg}</P14>


        <Input placeholder="Enter your email" control={control} type="email" name="email" />
        
        <Input
          control={control}
          placeholder="Create password"
          hint="8 characters or longer. Combine upper and lowercase letters and numbers."
          name={"password"}
          type={"password"}
        />
        <Flex flex="between">
          <CheckBox rememer handle_close={handle_close} />
          <P14 className={styles.forget_pass} onClick={handleClick}>Forgot Password?</P14>
        </Flex>

        <Button fullWidth className={styles.btn}>
          Continue
        </Button>
      </form>
    </div>
  );
};

// ############################## FORGOT ##############################

const Forgot = ({ handle_close = () => { } }) => {

  const { control, handleSubmit } = useForm();
  const [msg, setMsg] = useState('');
  const dispatch = useDispatch();
  const loginMutation = useMutation({

    mutationFn: ForgotPassword,

    onError: (error) => {

      if (error.response.data.error)
        setMsg(error.response.data.error)

    },
    onSuccess: (data) => {
      console.log(data);
      localStorage.setItem('token', data.accessToken)
      dispatch(createUser(data.user))
      showSuccessToast('Email has been sent to you  !')
      setTimeout(() => {
        dispatch(close_auth());
      }, 2000);
    },

  });

  const onSubmit = (data) => {
    loginMutation.mutate(data)
  };

  useEffect(() => {
    console.log(msg);
  }, [msg])

  return (
    <div className={styles.form}>
      <form onSubmit={handleSubmit(onSubmit)}>

        <P14>{msg.length > 0 && msg}</P14>

        <Input placeholder="Enter your email" control={control} type="email" name="email" />
        <Button fullWidth className={styles.btn}>
          Continue
        </Button>
      </form>
    </div>
  );
};
const FooterLogin = ({ onClick = () => { } }) => {
  return (
    <Flex>
      <P16 className={styles.txt_footer}>
        Not a member yet? <span onClick={onClick}>Join now</span>
      </P16>
    </Flex>
  );
};

// ############################## REGISTER ##############################

const Register = ({ handle_close = () => { } }) => {

  const { control, handleSubmit } = useForm();
  const [msg, setMsg] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const loginMutation = useMutation({

    mutationFn: RegisterFn,

    onError: (error) => {
      if (error.response.data.error)
        setMsg(error.response.data.error)

    },
    onSuccess: (data) => {
      localStorage.setItem('token', data.accessToken)
      showSuccessToast('Your account was successfully created !')
      dispatch(createUser(data.user))
      dispatch(close_auth());
    },

  });

  const type = useSelector(selectType)

  const onSubmit = (data) => {
    loginMutation.mutate({...data,type})
  };
  return (
    <div className={styles.form}>
      <P14>{msg.length > 0 && msg}</P14>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Input placeholder="Enter your email" control={control} type="email" name="email" />
        {type !=="company" && <Input placeholder="Enter your account name" control={control} type="text" name="username" />}
        {type =="company" && <Input placeholder="Enter your company name" control={control} type="text" name="username" />}
        {type =="company" && <Input placeholder="Enter your company id" control={control} type="text" name="company_id" />}
        <Input
          control={control}
          placeholder="Create password"
          hint="8 characters or longer. Combine upper and lowercase letters and numbers."
          name={"password"}
          type={"password"}
        />

        <CheckBox type={"checkbox"} control={control} tearm_and_cond handle_close={handle_close} />

        <Button fullWidth className={styles.btn}>
          Continue
        </Button>
      </form>
    </div>
  );
};

const FooterRegister = ({ onClick = () => { } }) => {
  return (
    <Flex>
      <P16 className={styles.txt_footer}>
        Already a member ? <span onClick={onClick}>Sign In</span>
      </P16>
    </Flex>
  );
};
const FooterForgot = ({ onClick = () => { } }) => {
  return (
    <Flex>
      <P16 className={styles.txt_footer}>
        You have an account ? <span onClick={onClick}>Sign In</span>
      </P16>
    </Flex>
  );
};
// ############################## OTHERS ##############################

const WithGoogle = () => {
  async function getGoogleApi() {
    window.location.href="https://urakkahuuto.fi/api/v1/auth/google";
    
}
  return (
    <Flex className={styles.with_google}>
      <GoogleLoginButton  align="center" style={{fontSize:"16px!important"}}
                    onClick={getGoogleApi}
                />
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

const Input = ({ placeholder = "", hint, name, control, value, type }) => {

  const [required, setRequired] = useState("");
  const [pattern, setPattern] = useState({ value: null, message: "" });
  const [min, setMin] = useState(null);
  const [max, setMax] = useState(null);
  const [minLength, setMinLength] = useState(null);
  const [maxLength, setMaxLength] = useState(null);

  useEffect(() => {
    if (type === "email") {
      setRequired("This field cannot be empty");
      setPattern({ value: /\S+@\S+\.\S+/, message: "Format invalide !" });
      setMin(null);
      setMax(null);
      setMinLength(null);
    } else if (type === "day") {
      setPattern({ value: /^\d+$/, message: "Format invalide !" });
      setMin(1);
      setMax(31);
    } else if (type === "months") {
      setPattern({ value: /^\d+$/, message: "Format invalide !" });
      setMin(1);
      setMax(12);
    } else if (type === "year") {
      setPattern({ value: /^\d+$/, message: "Format invalide !" });
      setMin(1950);
      setMax(2023);
    } else if (type === "password") {
      setRequired("This field cannot be empty");
      setMinLength(6);
    } else if (type === "text") {
      setMinLength(3);
    }
  }, [type]);


  return (

    <div className={styles.input}>
      <Controller
        name={name}
        className={styles['input']}
        rules={{
          required: required,
          pattern: pattern,
          min: { value: min, message: `min value is  ${min}` },
          max: { value: max, message: `Max value is ${max}` },
          minLength: { value: minLength, message: `Minimum length is ${minLength}` },
          maxLength: { value: maxLength, message: `Maximum length is ${maxLength}` },

        }}
        defaultValue={value}
        control={control}
        render={({ field, fieldState }) => {
          return (
            <>
              <input
                className={styles.textarea}
                placeholder={placeholder}
                {...field}
                name={name}
                type={type}
              />
              {fieldState.error && <P10 className={styles.hint}>{fieldState.error.message}</P10>}
            </>

          )
        }
        }

      />
    </div>
  );
};

const CheckBox = ({
  tearm_and_cond = false,
  rememer = false,
  handle_close,
  name, control = false, type,
}) => {
  const [checked, setchecked] = React.useState(false);
  const check_style = checked ? styles.checked : styles.not_checked;

  const handle_check = () => {
    setchecked(!checked);
  };

  return (
    <Flex flex="start" className={styles.checkbox}>
      {control ?
        <Controller
          name="check"
          control={control}
          defaultValue={false}
          rules={{ required: 'This checkbox is required' }}
          render={({ fieldState, field }) => (
            <>
              <input type={"checkbox"} className={check_style} onClick={handle_check}  {...field} />

              {fieldState.error && <P10 className={styles.hint}>{fieldState.error.message}</P10>}
            </>
          )}
        />
        :
        <input type={"checkbox"} className={check_style} onClick={handle_check} />

      }

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
