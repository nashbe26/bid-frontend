import { useMediaQuery } from "react-responsive";

const mobile = { min: 0, max: 599 };

const tablet = { min: 600, max: 959 };

const sm_lap = { min: 960, max: 1279 };

const la_lap1 = { min: 1280, max: 1381 };

const la_lap2 = { min: 1390, max: 1499 };

const la_lap3 = { min: 1500, max: 1750 };

const la_des = { min: 1751, max: 1920 };

const useResponsive = () => {
  const xs = useMediaQuery({ maxWidth: mobile.max });
  const sm = useMediaQuery({ minWidth: tablet.min, maxWidth: tablet.max });
  const md = useMediaQuery({ minWidth: sm_lap.min, maxWidth: sm_lap.max });
  const lg = useMediaQuery({ minWidth: la_lap1.min, maxWidth: la_lap1.max });
  const llg = useMediaQuery({ minWidth: la_lap2.min, maxWidth: la_lap2.max });
  const xl = useMediaQuery({ minWidth: la_lap3.min, maxWidth: la_lap3.max });
  const xxl = useMediaQuery({ minWidth: la_des.min });

  const lt_sm = useMediaQuery({ maxWidth: tablet.max });
  const lt_md = useMediaQuery({ maxWidth: sm_lap.max });
  const lt_lg = useMediaQuery({ maxWidth: la_lap1.max });
  const lt_llg = useMediaQuery({ maxWidth: la_lap2.max });
  const lt_xl = useMediaQuery({ maxWidth: la_lap3.max });
  const lt_xxl = useMediaQuery({ maxWidth: la_des.max });
  const lt = {
    sm: lt_sm,
    md: lt_md,
    lg: lt_lg,
    llg: lt_llg,
    xl: lt_xl,
    xxl: lt_xxl,
  };

  const gt_xs = useMediaQuery({ minWidth: mobile.max });
  const gt_sm = useMediaQuery({ minWidth: tablet.max });
  const gt_md = useMediaQuery({ minWidth: sm_lap.max });
  const gt_lg = useMediaQuery({ minWidth: la_lap1.max });
  const gt_llg = useMediaQuery({ minWidth: la_lap2.max });
  const gt_xl = useMediaQuery({ minWidth: la_lap3.max });
  const gt_xxl = useMediaQuery({ minWidth: la_des.max });
  const gt = {
    xs: gt_xs,
    sm: gt_sm,
    md: gt_md,
    lg: gt_lg,
    llg: gt_llg,
    xl: gt_xl,
    xxl: gt_xxl,
  };

  return { xs, sm, md, lg, llg, xl, xxl, lt, gt };
};

export default useResponsive;
