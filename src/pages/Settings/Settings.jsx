import React, { useEffect, useState } from "react";
import styles from "./Settings.module.scss";
import MainContainer from "../../components/Containers/MainContainer";
import Flex from "../../components/Flex/Flex";
import { H36, P12, P12ERROR, P16 } from "../../components/TXT/TXT";
import {
  kouba_icon,
  user_icon,
  email_icon,
  edit_icon,
} from "../../assets/svgs";
import Button from "../../components/Buttons/Button";
import { useDispatch, useSelector } from "react-redux";
import { createUser, selectUser } from "../../store/userSlice";
import { useForm } from "react-hook-form";
import { showErrorToast, showSuccessToast } from "../toast/toast";
import { chnagePassword, sendEmailToken, updateUser, verifEmailToken } from "../../api/user";
import { useMutation } from "@tanstack/react-query";
import customAxios from "../../axios/custom";

function Settings() {

  const user = useSelector(selectUser)

  return (
    <MainContainer className={styles.main}>
      <Flex>
        <H36 weight={700}>Settings</H36>
      </Flex>
      
      <SettingItem icon={user_icon} title="User Name">
        {
          user && <User user={user} />
        }
        
      </SettingItem>
      <SettingItem icon={email_icon} title="Email">
        {
          user && <Email user={user} />
        }
      </SettingItem>
      <SettingItem icon={kouba_icon} icon2={edit_icon} title="Your password">
        {
          user && <Password user={user} />
        }
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
const Email = ({user}) => {

  const { register, handleSubmit, formState: { errors }  } = useForm({
    defaultValues: {
      token: ''
    },
  });

  const updateUsers = useMutation({

    mutationFn: sendEmailToken,

    onError: (error) => {
      if (error.response.data.error)
      showErrorToast("Error due server rendering !")

    },
    onSuccess: (data) => {
      showSuccessToast('Email has been sent !')

    },

  });
  const dispatch= useDispatch()
  const verifUsers = useMutation({

    mutationFn: verifEmailToken,

    onError: (error) => {

      showErrorToast("Error : Token is not valid !")

    },
    onSuccess: (data) => {
      showSuccessToast('Your account was verified successfully!')
      dispatch(createUser(data))
    },

  });


  function submit(data) {
    updateUsers.mutate()
  }

  function verifsubmit(data){
    verifUsers.mutate(data)
  }


  return (
    <div className={styles.email}>
      <P16> Confirm your Email: {user.email} </P16>
      <br />
      <br />
      {user.isVerified ?
  
  <P16>Your account is verified</P16>
  : 
  
  <>
  <P16>We have sent you a confirmation code to: {user.email}</P16>
      <P16>Enter your confirmation code here:</P16>
      <form onSubmit={handleSubmit(verifsubmit)}>
        <input type="text" id="token" 
            {...register('token', { required: 'Token is required' })} />
          {errors.token && <P12ERROR>{errors.token.message}</P12ERROR>}
        <Button>HE CONFIRMS</Button>
      </form>
      <br />
      <br />
      <P16>If you can't find the email:</P16>
      <br />
      <Button onClick={submit}>Resend the confirmation code</Button>
      </>}
      
    </div>
  );
};

const User = ({user}) => {


  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      username: user.username || '',
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      description:user.description || '',
      cover_photo:user.cover_photo || '',
      photo:user.photo || '',
      location:user.location || ''
    },
  });

  const dispatch = useDispatch()

  const [msg,setMsg] = useState('')

  const updateUsers = useMutation({

    mutationFn: updateUser,

    onError: (error) => {
      if (error.response.data.error)
      showErrorToast("Error due server rendering !")

    },
    onSuccess: (data) => {
      showSuccessToast('Your account was successfully created !')
      dispatch(createUser(data))

    },

  });

  const [uploadProgress, setUploadProgress] = useState(0)

  async function uploadImagesProducts(data) {
      const res = await customAxios.post("/api/v1/bid/create-images-product", data, {
          onUploadProgress: (progressEvent) => {
              const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
              setUploadProgress(percentCompleted);
          },
      });
      return res.data;
  }

  const UpdateMultiImage = useMutation({

      mutationFn: uploadImagesProducts,

      onError: (error) => {

          showErrorToast("Erreur lors de l'ajout des images ! ")

      },
      onSuccess: (data) => {
          setValue('photo',data[0])
          setUploadProgress(0)
      },

  });

  const UpdateMultiImageCover = useMutation({

    mutationFn: uploadImagesProducts,

    onError: (error) => {

        showErrorToast("Erreur lors de l'ajout des images ! ")

    },
    onSuccess: (data) => {
        setValue('cover_photo',data[0])
        setUploadProgress(0)
    },

});

  function handleDataCover(e) {
    const selectedFiles = e.target.files[0];
    const formData = new FormData();
    console.log(e);
    formData.append("files", selectedFiles);
    UpdateMultiImageCover.mutate(formData)
  }

  function handleData(e) {
    const selectedFiles = e.target.files[0];
    const formData = new FormData();

  console.log(e);
    formData.append("files", selectedFiles);



  UpdateMultiImage.mutate(formData)
}

  function submit(data) {
    updateUsers.mutate({...data,id:user._id})
  }

  useEffect(()=>{
    if(user && user.type !='company'){
      setValue('username',user.username)
      setValue('firstName',user.firstName)
      setValue('lastName',user.lastName)
      setValue('description',user.description)
      setValue('cover_photo',user.cover_photo)
      setValue('photo',user.photo)
    }else{
      setValue('username',user.username)
      setValue('firstName',user.firstName)
      setValue('company_name',user.company_name)
      setValue('company_id',user.company_id)
      setValue('lastName',user.lastName)
      setValue('description',user.description)
      setValue('cover_photo',user.cover_photo)
      setValue('location',user.location)
      setValue('photo',user.photo)
    }
  },[user])

  return (
    <div className={styles.email}>
      <P16> User Full Name : { user.firstName || user.lastName ? user.firstName + " " + user.lastName : 'Not definied yet'} </P16>
      <br />
      {user.type=="company" ? 
        <form onSubmit={handleSubmit(submit)}>
        <P16>Cover photo</P16>
          <input type="file"  id="cover_photo" onChange={e => handleDataCover(e)}
           />
          <br />
          <P16>Profil Photo</P16>
          <input type="file" id="photo"  onChange={e => handleData(e)}
          />
          <br />
          <P16>Username</P16>
          <input type="text" defaultValue={user.username} id="username"
            {...register('username')} />
          <br />
          
          <P16>Company name</P16>
          <input type="text" defaultValue={user.company_name} id="company_name"
            {...register('company_name')} />
          <br />
          <P16>Company id</P16>
          <input type="text" defaultValue={user.company_id} id="company_id"
            {...register('company_id')} />
          <br />
  
          <P16>First Name</P16>
          <input type="text" defaultValue={user.firstName || ""}  id="firstName"
            {...register('firstName')}/>
          <br />
          <P16>Last Name</P16>
          <input type="text" defaultValue={user.lastName || ""}  id="lastName"
            {...register('lastName')}/>
          <br />
          <P16>Location</P16>
            <input type="text" defaultValue={user.location || ""}  id="location"
              {...register('location')}/>
            <br />
          <P16>Description</P16>
          <textarea type="text" defaultValue={user.description || ""}  id="description"
            {...register('description')}/>
          <br />
          <br />
          <Button>Update</Button>
        </form>: 
          <form onSubmit={handleSubmit(submit)}>
          <P16>Cover photo</P16>
            <input type="file"  id="cover_photo" onChange={e => handleDataCover(e)}
             />
            <br />
            <P16>Profil Photo</P16>
            <input type="file" id="photo"  onChange={e => handleData(e)}
            />
            <br />
            <P16>Username</P16>
            <input type="text" defaultValue={user.username} id="username"
              {...register('username')} />
            <br />
            <P16>First Name</P16>
            <input type="text" defaultValue={user.firstName || ""}  id="firstName"
              {...register('firstName')}/>
            <br />
            <P16>Last Name</P16>
            <input type="text" defaultValue={user.lastName || ""}  id="lastName"
              {...register('lastName')}/>
            <br />
            <P16>Location</P16>
            <input type="text" defaultValue={user.location || ""}  id="location"
              {...register('location')}/>
            <br />
            <P16>Description</P16>
            <textarea type="text" defaultValue={user.description || ""}  id="description"
              {...register('description')}/>
            <br />
            <br />
            <Button>Update</Button>
          </form>}
    
    </div>
  );
};

const Password = ({user}) => {

  const { register, handleSubmit, watch , formState: { errors } } = useForm({
    defaultValues: {
      password: '',
      newPassword:'',
      confirmPassword:'',
    },
  });
  const updateUsers = useMutation({

    mutationFn: chnagePassword,

    onError: (error) => {
      if (error.response.data.error)
      showErrorToast("Something went worng!")

    },
    onSuccess: (data) => {
      showSuccessToast('Password changed sucessfully !')

    },

  });
  function submit(data){
    updateUsers.mutate(data);
  }

  return (
    <div className={styles.email}>
      <P16>
        You have to confirm the password change by your mail after the
        modification
      </P16>
      <br />
      <form onSubmit={handleSubmit(submit)}>
      <P16>Old Password</P16>
      <input type="password" {...register('password', { required: 'Password is required',minLength:6 })}/>
      {errors.password && <P12ERROR>{errors.password.message}</P12ERROR>}

      <br />

      <P16>New Password</P16>
      <input type="password" {...register('newPassword', { required: 'New Password is required',minLength:6 })}/>
      {errors.newPassword && <P12>{errors.newPassword.message}</P12>}

      <br />

      <P16>Confirm New Password</P16>
      <input type="password" {...register('confirmPassword', { required: 'Confirm Password is required',validate: (value) => value === watch('newPassword') || 'Passwords do not match' })} />
      {errors.confirmPassword && <P12>{errors.confirmPassword.message}</P12>}
      <br />

      <Button>Update</Button>
      </form>
      
    </div>
  );
};

export default Settings;
