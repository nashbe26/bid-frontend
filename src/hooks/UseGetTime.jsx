import { useEffect, useState } from "react";

const make_it_2_digits = (number) => {
  return number < 10 ? `0${number}` : `${number}`;
};

const useGetTime = (seconds) => {
  const [time, setTime] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const calculateTime = () => {
    let remainingSeconds = seconds;

    const years = Math.floor(remainingSeconds / (365 * 24 * 60 * 60));
    remainingSeconds -= years * (365 * 24 * 60 * 60);

    const months = Math.floor(remainingSeconds / (30 * 24 * 60 * 60));
    remainingSeconds -= months * (30 * 24 * 60 * 60);

    const days = Math.floor(remainingSeconds / (24 * 60 * 60));
    remainingSeconds -= days * (24 * 60 * 60);

    const hours = Math.floor(remainingSeconds / (60 * 60));
    remainingSeconds -= hours * (60 * 60);

    const minutes = Math.floor(remainingSeconds / 60);
    remainingSeconds -= minutes * 60;

    const calculatedTime = {
      years: make_it_2_digits(years),
      months: make_it_2_digits(months),
      days: make_it_2_digits(days),
      hours: make_it_2_digits(hours),
      minutes: make_it_2_digits(minutes),
      seconds: make_it_2_digits(Math.round(remainingSeconds)),
    };

    setTime(calculatedTime);
  };

  useEffect(() => {
    calculateTime();
  }, [seconds]);

  return { time, calculateTime };
};

export default useGetTime;
