import React from "react";
import styles from './style.module.scss';
import moment from "moment";

const DescriptionProject = ({data}) =>{

    console.log(data);

    return(
        <div className={styles.description}>
            <div className={styles.selection_description}>
                <div className={styles.text}>
                    <p className={styles.bold}>Location :</p>
                    <p>{data.prod_id.city}</p>
                </div>
                <div className={styles.text}>
                    <p className={styles.bold}>Category :</p>
                    <p>{data.prod_id.category}</p>
                </div>
                <div className={styles.text}>
                    <p className={styles.bold}>Payment :</p>
                    <p>{data.method}</p>
                </div>
                <div className={styles.text}>
                    <p className={styles.bold}>Dates of work :</p>
                    <p>{moment(data.date_work_start).format('YYYY/MM/DD')} - {moment(data.date_work_end).format('YYYY/MM/DD')}</p>
                    
                </div>
                <div className={styles.text}>
                    <p className={styles.bold}>Seeing work place in advance :</p>
                    <p>{data.see_work}</p>
                </div>
            </div>
            <div className={styles.text_project}>
                <p>Description</p>
                <div dangerouslySetInnerHTML={{__html: data.prod_id.description}} />
            </div>
        </div>
    )

}

export default DescriptionProject;