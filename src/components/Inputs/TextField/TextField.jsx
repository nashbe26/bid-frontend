import React, { useEffect, useState } from "react";
import styles from "./TextField.module.scss";
import { Controller } from "react-hook-form";
import { P12ERROR } from "../../TXT/TXT";

function TextField({
  placeholder = "",
  className = "",
  value = "",
  onChange = () => { },
  name = "",
  label = "",
  type,
  control
}) {

  const [required, setRequired] = useState("");
  const [pattern, setPattern] = useState({ value: null, message: "" });
  const [min, setMin] = useState(null);
  const [max, setMax] = useState(null);
  const [minLength, setMinLength] = useState(null);
  const [maxLength, setMaxLength] = useState(null);

  useEffect(() => {
    if (type === "email") {
      setRequired("Ce champs est requis");
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
      setRequired("Mot de passe doit être supérieur à 6");
      setMinLength(6);
    } else if (type === "text") {
      setRequired('Ce champs est requis')
    } else if (type === "iban") {
      setPattern({ value: /^FR[0-9]{2}[A-Z0-9]{5}[0-9]{11}\d{2}$/, message: "Format invalide !" });
    }else if (type === "price") {
      setRequired("Ce champs est requis");
    }

    console.log(type);
  }, [type]);


  useEffect(() => {

    console.log({
      required: required,
      pattern: pattern,
      min: min,
      max: max,
      minLength: minLength,
    });

  }, [])
  return (
    <Controller
      name={name}
      className={styles['input']}
      rules={{
        required: required,
        pattern: pattern,
        min: { value: min, message: `Valeur minimale: ${min}` },
        max: { value: max, message: `Valeur maximale: ${max}` },
        minLength: { value: minLength, message: `Longueur doit être: ${minLength}` },
        maxLength: { value: maxLength, message: `Longueur doit être: ${maxLength}` },

      }}
      defaultValue={value}
      control={control}
      render={({ field, fieldState }) => {
        return (
          <div className={`${styles.main} ${className}`}>
            <label htmlFor="">{label}</label>
            <input
              className={styles.textarea}
              placeholder={placeholder}
              name={name}
              {...field}
            />
            {fieldState.error && <P12ERROR>{fieldState.error.message}</P12ERROR>}

          </div>
        )
      }
      }
    />
  );
}

export default TextField;
