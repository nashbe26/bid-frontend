import React from "react";
import styles from "./TextArea.module.scss";
import { Controller } from "react-hook-form";
import { P12ERROR } from "../../TXT/TXT";

function TextArea({
  placeholder = "",
  className = "",
  value = "",
  onChange = () => { },
  name = "",
  label = "",
  rows = 3,
  control
}) {
  return (
    <Controller
      name={name}
      className={styles['input']}
      control={control}
      defaultValue={value}
      rules={{ required: 'Description est obligatoire !'}}
      render={({ field, fieldState }) => (
        <div className={`${styles.main} ${className}`}>
          <label htmlFor="">{label}</label>
          <textarea
            className={styles.textarea}
            placeholder={placeholder}
            name={name}
            {...field}
          ></textarea>
          {fieldState.error && <P12ERROR>{fieldState.error.message}</P12ERROR>}
        </div>
      )}
    />
  );
}

export default TextArea;
