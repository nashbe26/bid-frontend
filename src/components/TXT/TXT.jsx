import React from "react";
import styles from "./txts.module.scss";

export const H38 = ({
  children,
  className,
  onClick = () => {},
  weight = 400,
}) => {
  return (
    <h2
      className={`${styles.h38} ${className}`}
      style={{ fontWeight: weight }}
      onClick={onClick}
    >
      {children}
    </h2>
  );
};

export const H32 = ({
  children,
  className,
  onClick = () => {},
  weight = 400,
}) => {
  return (
    <h2
      className={`${styles.h32} ${className}`}
      style={{ fontWeight: weight }}
      onClick={onClick}
    >
      {children}
    </h2>
  );
};

export const H24 = ({
  children,
  className,
  onClick = () => {},
  weight = 400,
}) => {
  return (
    <h2
      className={`${styles.h24} ${className}`}
      style={{ fontWeight: weight }}
      onClick={onClick}
    >
      {children}
    </h2>
  );
};

export const P21 = ({
  children,
  className,
  onClick = () => {},
  weight = 400,
}) => {
  return (
    <p
      className={`${styles.p21} ${className}`}
      style={{ fontWeight: weight }}
      onClick={onClick}
    >
      {children}
    </p>
  );
};

export const P18 = ({
  children,
  className,
  onClick = () => {},
  weight = 400,
}) => {
  return (
    <p
      className={`${styles.p18} ${className}`}
      style={{ fontWeight: weight }}
      onClick={onClick}
    >
      {children}
    </p>
  );
};

export const P16 = ({
  children,
  className,
  onClick = () => {},
  weight = 400,
}) => {
  return (
    <p
      className={`${styles.p16} ${className}`}
      style={{ fontWeight: weight }}
      onClick={onClick}
    >
      {children}
    </p>
  );
};

export const P14 = ({
  children,
  className,
  onClick = () => {},
  weight = 400,
}) => {
  return (
    <p
      className={`${styles.p14} ${className}`}
      style={{ fontWeight: weight }}
      onClick={onClick}
    >
      {children}
    </p>
  );
};

export const P13 = ({
  children,
  className,
  onClick = () => {},
  weight = 400,
}) => {
  return (
    <p
      className={`${styles.p13} ${className}`}
      style={{ fontWeight: weight }}
      onClick={onClick}
    >
      {children}
    </p>
  );
};

export const P12 = ({
  children,
  className,
  onClick = () => {},
  weight = 400,
}) => {
  return (
    <p
      className={`${styles.p12} ${className}`}
      style={{ fontWeight: weight }}
      onClick={onClick}
    >
      {children}
    </p>
  );
};

export const P11 = ({
  children,
  className,
  onClick = () => {},
  weight = 400,
}) => {
  return (
    <p
      className={`${styles.p11} ${className}`}
      style={{ fontWeight: weight }}
      onClick={onClick}
    >
      {children}
    </p>
  );
};

export const P9 = ({
  children,
  className,
  onClick = () => {},
  weight = 400,
}) => {
  return (
    <p
      className={`${styles.p9} ${className}`}
      style={{ fontWeight: weight }}
      onClick={onClick}
    >
      {children}
    </p>
  );
};
