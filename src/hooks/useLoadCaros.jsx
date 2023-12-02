import { useEffect, useState } from "react";

function useLoadCaros(array, subArrayLength) {
  const [current, setCurrent] = useState([]);
  const [pos, setPos] = useState(0);
  const [hasPrev, setHasPrev] = useState(false);
  const [hasNext, setHasNext] = useState(false);

  useEffect(() => {
    let start = pos;
    let end = subArrayLength + pos;
    let temp_array = [...array];

    end = end > array.length ? array.length : end;

    setHasPrev(!(start === 0));

    setHasNext(!(end === array.length));

    setCurrent(temp_array.slice(start, end));
  }, [array, pos, subArrayLength]);

  function Next() {
    if (pos < array.length - subArrayLength) {
      setPos(pos + 1);
    }
  }

  function Prev() {
    if (pos > 0) {
      setPos(pos - 1);
    }
  }

  return { current, Prev, hasPrev, Next, hasNext };
}

export default useLoadCaros;
