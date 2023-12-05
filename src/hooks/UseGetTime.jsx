import { useEffect, useState } from "react";

const make_it_2_digits = (number) => {
  return number < 10 ? `0${number}` : `${number}`;
};

const useGetTime = (minutes) => {
  const [time, setTime] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
  });

  const calculateTime = () => {
    let remainingMinutes = minutes;

    const years = Math.floor(remainingMinutes / (365 * 24 * 60));
    remainingMinutes -= years * (365 * 24 * 60);

    const months = Math.floor(remainingMinutes / (30 * 24 * 60));
    remainingMinutes -= months * (30 * 24 * 60);

    const days = Math.floor(remainingMinutes / (24 * 60));
    remainingMinutes -= days * (24 * 60);

    const hours = Math.floor(remainingMinutes / 60);
    remainingMinutes -= hours * 60;

    const calculatedTime = {
      years: make_it_2_digits(years),
      months: make_it_2_digits(months),
      days: make_it_2_digits(days),
      hours: make_it_2_digits(hours),
      minutes: make_it_2_digits(remainingMinutes),
    };

    setTime(calculatedTime);
  };

  useEffect(() => {
    calculateTime();
  }, []);

  return { time, calculateTime };
};

export default useGetTime;
