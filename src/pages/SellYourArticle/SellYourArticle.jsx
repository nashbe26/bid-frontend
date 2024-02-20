import React, { useEffect, useState } from "react";
import styles from "./SellYourArticle.module.scss";
import MainContainer from "../../components/Containers/MainContainer";
import { H49, P12ERROR, P14, P16 } from "../../components/TXT/TXT";
import Flex from "../../components/Flex/Flex";
import TextField from "../../components/Inputs/TextField/TextField";
import TextArea from "../../components/Inputs/TextArea/TextArea";
import Select from "../../components/Inputs/Select/Select";
import Button from "../../components/Buttons/Button";
import { DatePicker, LocalizationProvider, TimeField } from "@mui/x-date-pickers";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import moment from "moment";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import FilesField from "../../components/Inputs/file/FileField";
import { setUploadProgress } from "../../store/progressSlice";
import { CreateBid } from "../../api/bid";
import { useMutation } from "@tanstack/react-query";
import { showErrorToast, showSuccessToast } from "../toast/toast";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function SellYourArticle() {

  /*const onSubmit = (data) => {
    if (isshowned) {

        const hasError =
            category.length === 0 ||
            marque.length === 0 ||
            etats.length === 0 ||
            couleur.length === 0 ||
            image.length === 0 ||
            tailles.length === 0 ||
            mat.length === 0 ||
            category.includes("Choisir") ||
            marque.includes("Choisir") ||
            etats.includes("Choisir") ||
            couleur.includes("Choisir") ||
            tailles.includes("Choisir") ||
            mat.includes("Choisir");

        // If there's an error, set the corresponding error flags
        if (hasError) {
            setCategoryErr(category.length === 0 || category.includes("Choisir"));
            setMarqueErr(marque.length === 0 || marque.includes("Choisir"));
            setEtatErr(etats.length === 0 || etats.includes("Choisir"));
            setCouleurErr(couleur.length === 0 || couleur.includes("Choisir"));
            setImageErr(image.length === 0);
            setTailleErr(tailles.length === 0 || tailles.includes("Choisir"));
            setMatErr(mat.length === 0 || mat.includes("Choisir"));


        } else {
            if (image.length == 3) {

                const vars = {
                    ...data,
                    category,
                    marque,
                    etat: etats,
                    couleur,
                    matieres: mat,
                    taille: tailles,
                    image
                };

                console.log(vars);

                UpdateUser.mutate(vars)
            } else {
                setErrorImage(true)
            }

        }

    } else {

        if (image.length == 3) {

            const vars = {
                ...data,
                category,
                image
            };

            console.log(vars);

            UpdateUser.mutate(vars)
        } else {
            setErrorImage(true)
        }
    }
};*/

  const [category, setCategory] = useState(false)
  const [time, setTime] = useState('')
  const [timeEnd, setTimeEnd] = useState('')
  const [dateEnd, setDateEnd] = useState('')
  const [date, setDate] = useState('')
  const [image, setImage] = useState([])
  const [payment, setPayment] = useState('')
  const [errCategory, setErrCategory] = useState(false);
  const [errTime, setErrTime] = useState(false);
  const [errDate, setErrDate] = useState(false);
  const [err, setErr] = useState(false);
  const [errDateEnd, setErrDateEnd] = useState(false);

  function handleCateogry(data) {
    console.log("dddddddddd", data);
    setCategory(data);
  }

  function handlePayment(data) {
    console.log("dddddddddd", data);
    setPayment(data);
  }

  const createBid = useMutation({
    mutationFn: CreateBid,
    onError: (error) => {
      console.log("error", error);
    },
    onSuccess: (res) => {
      showSuccessToast('bid created successfully')
    }
  });
  const [cate, setCate] = useState(false)
  function submit(data) {

    if (image.length === 0 || category.length === 0 && category !== "Select your category") {
      if (image.length === 0) {
        setErr(true);
      } else {
        setErr(false);
      }
      if (category.length === 0) {
        setErrCategory(true);
      } else {
        setErrCategory(false);
      }
      showErrorToast('Please fill all your information !')
    } else {
      createBid.mutate({
        ...data,
        category,
        time: moment(data.time).format('HH:mm'),
        date: moment(data.date).format('YYYY-MM-DD'),
        time_end: moment(data.time_end).format('HH:mm'),
        date_end: moment(data.date_end).format('YYYY-MM-DD'),
        images: image,
        payment
      });
    }



  }

  const [text, setText] = useState('');

  const handleChange = (content) => {
    setText(content);
  };
  const { control, handleSubmit } = useForm();

  function handletime(data) {
    setTime(data.auctionTime)
    setDate(data.auctionDate)
  }

  function handletime_end(data) {
    setTimeEnd(data.auctionTime)
    setDateEnd(data.auctionDate)
  }

  function handleImage(data) {
    setImage(data);
  }

  return (
    <MainContainer className={styles.main}>
      <H49 weight={500}>Add product</H49>
      <div className={styles.sub_container}>
        <form onSubmit={handleSubmit(submit)}>
          <ImageUpload onChange={handleImage} err={err} />

          <div className={styles.box}>
            <ProdName control={control} name={"title"} />
            <Description control={control} name={"description"} />
          </div>
          <SelectCateg onChange={handleCateogry} err={errCategory} />
          <SelectPayment onChange={handlePayment} err={errCategory} />
          <Prix control={control} name={"city"} />
          <Seeing control={control} name={"see_work"} ></Seeing>
          <AuctionTime onChange={handletime} err={errTime} errDate={errDate} control={control} />
          <AuctionTimeEnd onChange={handletime_end} err={errTime} errDate={errDate} control={control} />
          <AuctionTimeOffer onChange={handletime_end} err={errTime} errDate={errDate} control={control} />

          <Flex flex="end">
            <Button className={styles.stubmit_btn}>Add product</Button>
          </Flex>
        </form>
      </div>
    </MainContainer>
  );
}

const ImageUpload = ({ onChange, err }) => {

  const dispatch = useDispatch();

  const { progress } = useSelector((state) => state.uploadReducer);

  const [progBar, setprogBar] = useState(false);
  const [images, setImages] = useState([]);

  useEffect(() => {
    console.log(progress);
    if (progress == 100) {
      dispatch(setUploadProgress(0))
    } else if (progress == 0) {

      setprogBar(false);
    } else {
      setprogBar(true);
    }
  }, [progress])

  function handleData(data) {
    data.map(x => {
      setImages(old => [...old, x])

    })
    onChange(data)
  }





  return (
    <div className={styles.box}>
      <div className={styles.row}>
        <P14 weight={300}>Add Pictures</P14>
        {err && <P12ERROR>This field is required</P12ERROR>}
        {images.length > 0 ?
          <Flex flex="between">
            {images.map(x => {
              return (
                <div className={styles.imgprod}>
                  <img src={x} alt={x} />

                </div>

              )
            })}
            <FilesField left={true} type="images" color="#4E879B" onChange={handleData} fontSize={'16px'} many={true} ><i class="fa-solid fa-2x fa-plus"></i> </FilesField>

          </Flex>

          :
          <Flex className={styles.img_upload}>

            <FilesField left={true} type="images" color="#4E879B" onChange={handleData} fontSize={'16px'} many={true} >Ajouter des photos</FilesField>

          </Flex>
        }

      </div>
    </div>
  );
};

const ProdName = ({ control, name }) => {


  return (
    <Flex flex="between" className={`${styles.row} `}>
      <P16 weight={300}>Product name:</P16>
      <TextField placeholder="ex : SOny" className={styles.input} control={control} type={"text"} name={name} />
    </Flex>
  );
};

const Description = ({ control, name }) => {

  return (
    <Flex flex="between" className={`${styles.row} ${styles.with_border} ${styles.flex_col}`}>
      <P16 weight={300}>Product description:</P16>
      <Controller
        control={control}
        defaultValue=""
        name={name}
        render={({ field }) => (
          <ReactQuill
            theme="snow"
            value={field.value}
            onChange={field.onChange}
            style={{ width: 100 + "%", height: "270px",marginBottom:"2rem" }}
          />
        )}
      />
    </Flex>
  );
};

const   Seeing = ({ control, name }) => {

  return (
    <Flex flex="between" className={`${styles.row} ${styles.with_border} ${styles.flex_col} ${styles.box}`}>
      <P16 weight={300}>Seeing work place in advance:</P16>
      <Controller
          control={control}
          defaultValue=""
          name={name}
          render={({ field }) => (
            <Flex>
              <P16>Yes</P16>
              <input type="radio"  {...field}  value="yes" checked/>
            </Flex>
          )}
        />
        <Controller
          control={control}
          defaultValue=""
          name={name}
          render={({ field }) => (
            <Flex>
              <P16>No</P16>
              <input type="radio"  {...field}  value="no"/>
            </Flex>
          )}
        />
    </Flex>
  );
};


const SelectCateg = ({ onChange, err }) => {
  const list_auctions = [
    "Bet Auctions",
    "Good",
    "Appel",
    "Smartphones",
    "House & Garden",
    "Video games",
    "Beauty",
    "Home applicationces",
    "Kitchen",
    "Hobby",
    "TV and Audio",
    "Fashion",
    "Sport",
    "Jewellery",
    "Watches",
    "Cars",
    "Motorcycles",
    "Boats",
    "Real Estate",
    "Other",
  ];

  const [category, setCategory] = useState('')

  useEffect(() => {
    console.log(category);
    onChange(category);
  }, [category])

  function handleEtat(data) {
    console.log(data);
    setCategory(data.target.value)
  }


  return (
    <Flex flex="between" className={`${styles.row} ${styles.box}`}>
      <P16 weight={300}>Catégorie:</P16>
      <Select
        placeholder="Select your category"
        className={styles.input}
        options={list_auctions}
        onChange={handleEtat} label="État" type="text" name="etat" err={err}
      />
    </Flex>
  );
};

const Prix = ({ control, name }) => {
  return (
    <Flex flex="between" className={`${styles.row} ${styles.box}`}>
      <P16 weight={300}>City:</P16>
      <TextField placeholder="Write your city" className={styles.input} control={control} type={"text"} name={name} />
    </Flex>
  );
};
const SelectPayment = ({ onChange, err }) => {
  const list_auctions = [
    "Cash",
    "Bank",
    "Mobilepay"
  ];

  const [category, setCategory] = useState('')

  useEffect(() => {
    console.log(category);
    onChange(category);
  }, [category])

  function handleEtat(data) {
    console.log(data);
    setCategory(data.target.value)
  }


  return (
    <Flex flex="between" className={`${styles.row} ${styles.box}`}>
      <P16 weight={300}>Payment:</P16>
      <Select
        placeholder="Select your payment"
        className={styles.input}
        options={list_auctions}
        onChange={handleEtat} label="État" type="text" name="etat" err={err}
      />
    </Flex>
  );
};

const AuctionTime = ({ onChange, err, errDate, control }) => {

  const [auctionDate, setAuctionDate] = useState();
  const [auctionTime, setAuctionTime] = useState();
  const [errAuctionDate, setErrAuctionDate] = useState(false);
  const [errAuctionTime, setErrAuctionTime] = useState(false);
  const handleAuctionDateChange = (date) => {
    console.log(date);
    setAuctionDate(moment(date).format('YYYY-MM-DD'));
  };

  const handleAuctionTimeChange = (time) => {
    console.log(time);
    setAuctionTime(moment(time).format('HH:mm'));
  };

  useEffect(() => {

    onChange({ auctionDate, auctionTime })
  }, [])
  useEffect(() => {

    setErrAuctionDate(err);

  }, [errDate])

  useEffect(() => {

    setErrAuctionTime(err);

  }, [err])

  const { formState: { errors } } = useForm({
    defaultValues: {
      date: auctionDate, // Provide default values if needed
      time: auctionTime,
    },
  });


  useEffect(() => {
    console.log(errors);
  }, [errors])

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Flex flex="between" className={`${styles.row} ${styles.box}`}>
        <P16 weight={300}>
          Auction Date start :
        </P16>
        <Controller
          name="date"
          control={control}
          rules={{
            required: 'This field is required',
          }}
          render={({ field, fieldState }) => {
            console.log(field); return (
              <>
                <DatePicker {...field} className={styles.input} />
                {fieldState.error?.message && <P12ERROR className={styles.pos_ab}>{fieldState.error?.message}</P12ERROR>}
              </>
            )
          }}
        />
      </Flex>

      <Flex flex="between" className={`${styles.row} ${styles.box}`}>
        <P16 weight={300}>
          Auction Time start :
        </P16>
        <Controller
          name="time"
          control={control}
          rules={{
            required: 'This field is required', // Make the field required

          }}
          render={({ field, fieldState }) => {
            console.log(fieldState.error); return (
              <>
                {fieldState.error?.message && <P12ERROR className={styles.pos_ab}>{fieldState.error?.message}</P12ERROR>}
                <TimeField {...field} className={styles.input} />
              </>
            )
          }} />
      </Flex>
    </LocalizationProvider>
  );
};

const AuctionTimeEnd = ({ onChange, err, errDate, control }) => {
  const [auctionDate, setAuctionDate] = useState();
  const [auctionTime, setAuctionTime] = useState();
  const [errAuctionDate, setErrAuctionDate] = useState(false);
  const [errAuctionTime, setErrAuctionTime] = useState(false);

  const { formState: { errors } } = useForm({
    defaultValues: {
      date_end: auctionDate,
      time_end: auctionTime,
    },
  });

  const handleAuctionDateChange = (date) => {
    setAuctionDate(moment(date).format('YYYY-MM-DD'));
  };

  const handleAuctionTimeChange = (time) => {
    setAuctionTime(moment(time).format('HH:mm'));
  };

  useEffect(() => {
    onChange({ auctionDate, auctionTime });
  }, [auctionDate, auctionTime]);

  useEffect(() => {
    setErrAuctionDate(err);
  }, [errDate]);

  useEffect(() => {
    setErrAuctionTime(err);
  }, [err]);

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Flex flex="between" className={`${styles.row} ${styles.box}`}>
        <P16 weight={300}>Auction Date end :</P16>
        <Controller
          name="date_end"
          control={control}
          rules={{
            required: 'This field is required',

          }}
          render={({ field, fieldState }) =>
            <>
              <DatePicker {...field} className={styles.input} />
              {fieldState.error?.message && <P12ERROR className={styles.pos_ab}>{fieldState.error?.message}</P12ERROR>}
            </>
          }
        />
      </Flex>

      <Flex flex="between" className={`${styles.row} ${styles.box}`}>
        <P16 weight={300}>Auction Time end:</P16>
        <Controller
          name="time_end"
          control={control}
          rules={{
            required: 'This field is required',

          }}
          render={({ field, fieldState }) =>
            <>
              <TimeField {...field} className={styles.input} label="Time" />
              {fieldState.error?.message && <P12ERROR className={styles.pos_ab}>{fieldState.error?.message}</P12ERROR>}
            </>

          }
        />
      </Flex>
    </LocalizationProvider>
  );
};


const AuctionTimeOffer = ({ onChange, err, errDate, control }) => {
  const [auctionDate, setAuctionDate] = useState();
  const [auctionTime, setAuctionTime] = useState();
  const [errAuctionDate, setErrAuctionDate] = useState(false);
  const [errAuctionTime, setErrAuctionTime] = useState(false);

  const { formState: { errors } } = useForm({
    defaultValues: {
      date_end: auctionDate,
      time_end: auctionTime,
    },
  });

  const handleAuctionDateChange = (date) => {
    setAuctionDate(moment(date).format('YYYY-MM-DD'));
  };

  const handleAuctionTimeChange = (time) => {
    setAuctionTime(moment(time).format('HH:mm'));
  };

  useEffect(() => {
    onChange({ auctionDate, auctionTime });
  }, [auctionDate, auctionTime]);

  useEffect(() => {
    setErrAuctionDate(err);
  }, [errDate]);

  useEffect(() => {
    setErrAuctionTime(err);
  }, [err]);

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Flex flex="between" className={`${styles.row} ${styles.box}`}>
        <P16 weight={300}>Date of work :</P16>
        <Flex flex="between">
          <Controller
            name="date_work_start"
            control={control}
            rules={{
              required: 'This field is required',

            }}
            render={({ field, fieldState }) =>
              <>
                <DatePicker {...field} className={styles.input} />
                {fieldState.error?.message && <P12ERROR className={styles.pos_ab}>{fieldState.error?.message}</P12ERROR>}
              </>
            }
          />
          <Controller
            name="date_work_end"
            control={control}
            rules={{
              required: 'This field is required',

            }}
            render={({ field, fieldState }) =>
              <>
                <DatePicker {...field} className={styles.input} />
                {fieldState.error?.message && <P12ERROR className={styles.pos_ab}>{fieldState.error?.message}</P12ERROR>}
              </>
            }
          />
        </Flex>
      </Flex>
    </LocalizationProvider>
  );
};

export default SellYourArticle;
