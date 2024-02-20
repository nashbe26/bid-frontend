import React, { useEffect } from "react";
import styles from './style.module.scss';
import { useParams } from "react-router-dom";
import { useUserId } from "../../utils/functions/user/user";
import useResponsive from "../../hooks/UseResponsive";

const Profile = () => {

    const { id } = useParams()

    const { data, isLoading, isError } = useUserId(id);

    useEffect(() => {
        console.log(data);
    }, [data])

    const isMobile = useResponsive()

    return (
        <div className={styles.main_profile}>
            {data && !isLoading &&
                <div className={styles.container}>
                    <div className={styles.photos}>
                        {data.cover_photo?.length > 0 ?
                         <div className={styles.cover}>
                         <img src={data.cover_photo} alt="" />
                     </div>
                        :  
                        <div className={styles.cover_no}>
                        <p>No cover photo uploaded</p>
                        <i class="fa-solid fa-3x fa-images"></i>
                    </div>
                        }
                       
                        <div className={styles.flex}>
                            <div className={styles.getReady}>
                                <div className={styles.logo}>
                                    <img src={data.photo} alt="" />
                                </div>
                                {!isMobile.lt.md  && <p>{data.username}</p>}
                                
                            </div>
                        </div>
                    </div>
                    <div className={styles.wBop}>
                    <div className={styles.description}>
                        {data.type=="company" ?
                         <div className={styles.Header}>
                         <div className={styles.text}>
                             <p className={styles.main}>Company Name :</p>
                             <p className={styles.title}>{data.company_name}</p>
                         </div>
                         <div className={styles.text}>
                             <p className={styles.main}>Company Id : </p>
                             <p className={styles.title}>{data.company_id}</p>
                         </div>
                         <div className={styles.text}>
                             <p className={styles.main}>Company Owner :</p>
                             <p className={styles.title}>{data.username}</p>
                         </div>
                     </div>
                        : 
                        <div className={styles.Header}>
                        <div className={styles.text}>
                            <p className={styles.main}>Full name :</p>
                            <p className={styles.title}>{data.firstName || "Not available"} {data.lastName || "Not available"}</p>
                        </div>
                        <div className={styles.text}>
                            <p className={styles.main}>Email : </p>
                            <p className={styles.title}>{data.email}</p>
                        </div>
                        <div className={styles.text}>
                            <p className={styles.main}>Username :</p>
                            <p className={styles.title}>{data.username}</p>
                        </div>
                        <div className={styles.text}>
                            <p className={styles.main}>Location :</p>
                            <p className={styles.title}>{data.location || "Not available"}  </p>
                        </div>
                    </div>
                        }
                       
                            <div className={styles.bio}>
                                <div className={styles.text}>
                                    <p className={styles.main}>Description :</p>
                                    <p className={styles.title}>{data.description || "Not available" }</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }

        </div>
    )

}

export default Profile;