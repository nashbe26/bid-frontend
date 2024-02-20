import React, { useEffect, useRef, useState } from "react";
import styles from "./Select.module.scss";

import { down_arrow_select, triangle } from "../../../assets/svgs";
import Flex from "../../Flex/Flex";
import UseOutside from "../../../hooks/UseOutside";
import { P12ERROR } from "../../TXT/TXT";

function Select({
  placeholder = "Choisir une option",
  className = "",
  value = "",
  onChange = () => {},
  name = "",
  label = "",
  options = [],
  type = 1, // 1 , 2
  err
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const type_class2 = type === 2 ? styles.type2 : "";
  const ref = useRef(null);

  const handle_open = () => {
    setIsOpen(isOpen === true ? false : true);
  };

  UseOutside(ref, () => {
    setIsOpen(false);
  });

  useEffect(() => {
    if (selected) {
      onChange({ target: { name, value: selected } });
    }
  }, [selected]);

  return (
    <div className={`${styles.main} ${className} ${type_class2}`} ref={ref}>
      <Flex flex="between" onClick={handle_open} className={styles.header}>
        <span className={styles.value}>{selected}</span>
        <img
          className={styles.arrow}
          src={type === 1 ? down_arrow_select : triangle}
          alt=""
        />
      </Flex>

      {isOpen && (
        <div className={styles.list}>
          {options.map((option, index) => {
            let is_selected = selected?.value === option?.value;
            let is_selected_class = is_selected ? styles.selected : "";

            return (
              <div
                key={index}
                className={`${styles.option} ${is_selected_class}`}
                onClick={() => {
                  setSelected(option);
                  setIsOpen(false);
                }}
              >
                {option}
              </div>
            );
          })}
        </div>
      )}
      {err && <P12ERROR>This field is required</P12ERROR>}
    </div>
  );
}

export default Select;
