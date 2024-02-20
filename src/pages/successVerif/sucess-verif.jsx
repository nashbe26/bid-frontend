import React from "react";
import style from './style.module.scss';
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useUser, useUserToken } from "../../utils/functions/user/user";
import { H24 } from "../../components/TXT/TXT";

const SuccessVerifSocail = () => {

    const {token} = useParams();
    const { data, error, isLoading,refetch } = useUserToken();
    
    useEffect(()=>{
        
        if(token.length > 0){
            console.log(token);
            localStorage.setItem('token',token)
            refetch()
        
        }
    
    },[token])

    useEffect(()=>{
        if(data && !isLoading){
            setTimeout(() => {
                window.location.href="/profile/"+data._id
            }, 2000);
        }
    },[data,isLoading])

    return (
        <div className={style.main}>
            <div className={style.box}>
                <div className={style.img}>
                <i class="fa-solid fa-circle-check"></i>
                </div>
                <div className={style.successMsg}>
                    <H24 className={style.text}>Connexion a été faite avec succés !</H24>
                </div>
                <div className={style.successMsg}>
                    <H24 className={style.text}>Vous serez redirigé vers votre accueil.</H24>
                </div>

            </div>
        </div>
    )
}

export default SuccessVerifSocail;