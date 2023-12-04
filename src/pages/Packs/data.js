import { packs_icons } from "../../assets/svgs";
const { pack1, pack2, pack3 } = packs_icons;

export const packs = [
  {
    icon: pack1,
    type: "Bet",
    amount: 150,
    tag: "",
    caracters: [
      {
        normal: "150 Bets",
        bold: "",
      },
      {
        normal: "+1 WINNING SLOT",
        bold: "",
      },
      {
        normal: "1g Free Shipping",
        bold: "",
      },
    ],
    price: {
      value: "29.99",
      special: false,
    },
    plus: {
      value: "0.200",
      is_bet: true,
      is_stake: false,
    },
  },
  {
    icon: pack2,
    type: "Bet",
    amount: 300,
    tag: "",
    caracters: [
      {
        normal: "250+ 50 Bonus",
        bold: "",
      },
      {
        normal: "+3 WINNING SLOTS",
        bold: "",
      },
      {
        normal: "3 Days Free Shipping",
        bold: "",
      },
    ],
    price: {
      value: "49.99",
      special: true,
    },
    plus: {
      value: "0.16",
      is_bet: true,
      is_stake: false,
    },
  },
  {
    icon: pack3,
    type: "Bet",
    amount: 750,
    tag: "The + Sold",
    caracters: [
      {
        normal: "500 + 250 Bonus",
        bold: "",
      },
      {
        normal: "+ 10 WINNING SLOTS",
        bold: "",
      },
      {
        normal: "10 Days Free shipping",
        bold: "",
      },
    ],
    price: {
      value: "99.99",
      special: false,
    },
    plus: {
      value: "0.133",
      is_bet: true,
      is_stake: false,
    },
  },
  {
    icon: pack1,
    type: "Bet",
    amount: 2500,
    tag: "",
    caracters: [
      {
        normal: "1250 Bets +",
        bold: "1250 Bonus",
      },
      {
        normal: "+40 WINNING SLOT",
        bold: "",
      },
      {
        normal: "40 Days Free Shipping",
        bold: "",
      },
    ],
    price: {
      value: "249.99",
      special: false,
    },
    plus: {
      value: "0.100",
      is_bet: false,
      is_stake: true,
    },
  },
  {
    icon: pack2,
    type: "Bet",
    amount: 7000,
    tag: "The + Convenient",
    caracters: [
      {
        normal: "2450 Bets +",
        bold: "4450 Bonus",
      },
      {
        normal: "+150 WINNING SLOTS",
        bold: "",
      },
      {
        normal: "150 Days Free Shipping",
        bold: "",
      },
    ],
    price: {
      value: "489.99",
      special: true,
    },
    plus: {
      value: "0.070",
      is_bet: false,
      is_stake: true,
    },
  },
];
