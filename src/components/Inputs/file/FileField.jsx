import React from "react";
import styles from "./TextField.module.scss";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import { createImage } from "../../../api/user";
import { useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { selectUploadProgress, setUploadProgress } from "../../../store/progressSlice";
import customAxios from "../../../axios/custom";
function FilesField({
  children,
  onClick,
  className = "",
  type = "filled",
  fullWidth = false,
  disabled = false,
  icon = null,
  left = false,
  right = false,
  submit = false,
  color = "",
  fontSize = '14px',
  many = false,
  onChange = () => { },
}) {
  const [val, setVal] = useState("");

  const dispatch = useDispatch();

  async function uploadImagesProducts(data) {
    const res = await customAxios.post("/api/v1/bid/create-images-product",data, {
      onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          dispatch(setUploadProgress(percentCompleted));
        },
    });
    return res.data;
  }
  

  useEffect(() => {
    if (val) {
      if (many) {
        const selectedFiles = val;
        const formData = new FormData();

        for (let i = 0; i < selectedFiles.length; i++) {

          const file = selectedFiles[i];
          formData.append("files", file);

        }

        UpdateMultiImage.mutate(formData);

      } 

    }
  }, [val]);

  const [msg, setMsg] = useState('');

  const UpdateMultiImage = useMutation({

    mutationFn: uploadImagesProducts,

    onError: (error) => {

      if (error.response.data.message)
        setMsg(error.response.data.message)
      else
        setMsg(error.response.data)

    },
    onSuccess: (data) => {
      console.log(data);
      onChange(data);

    },

  });



  let is_filled = type === "filled" ? styles.filled : "";
  let is_outlined = type === "outlined" ? styles.outlined : "";
  let is_fullWidth = fullWidth ? styles.fullWidth : "";

  return (
    <label htmlFor="formId" >
      <input
        name={"files"}
        type={"file"}
        hidden
        accept="image/*"

        multiple = {many}

        onChange={(e) => {
          many ? setVal(e.target.files) : setVal(e.target.files[0]) ;
        }}

        id="formId"
      />
      <div
        className={`${styles.button} ${className} ${is_filled} ${is_outlined} ${is_fullWidth}`}
      >
        {icon && left && <img src={icon} alt="" />}
        <span style={{ color, fontSize }}>{children}</span>
        {icon && right && <img src={icon} alt="" />}
      </div>
    </label>
  );
}

export default FilesField;