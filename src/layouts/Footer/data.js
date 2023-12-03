import {
  rx_f,
  rx_in,
  rx_insta,
  rx_whatsup,
  payement_meothods,
} from "../../assets/svgs";

const { american_express, mastercard, mastero, paypal, postepay, visa } =
  payement_meothods;

export const payements = [
  {
    icon: paypal,
    link: "https://www.paypal.com",
  },
  {
    icon: american_express,
    link: "https://www.americanexpress.com",
  },
  {
    icon: mastero,
    link: "https://www.mastero.com",
  },
  {
    icon: postepay,
    link: "https://www.postepay.com",
  },
  {
    icon: visa,
    link: "https://www.visa.com",
  },
  {
    icon: mastercard,
    link: "https://www.mastercard.com",
  },
];

export const external_links = [
  {
    icon: rx_in,
    link: "https://www.linkedin.com",
  },
  {
    icon: rx_f,
    link: "https://www.facebook.com",
  },
  {
    icon: rx_insta,
    link: "https://www.instagram.com",
  },

  {
    icon: rx_whatsup,
    link: "https://www.whatsapp.com",
  },
];

export const LinksGroups = [
  {
    title: "About us",
    links: [
      {
        text: "Customer Service",
        link: "/customer-service",
      },
      {
        text: "Contact us ↗",
        link: "/contact-us",
      },
      {
        text: "Terms and conditions",
        link: "/terms-and-conditions",
      },
    ],
  },
  {
    title: "Conditions",
    links: [
      {
        text: "Information",
        link: "/information",
      },
      {
        text: "Cookies",
        link: "/cookies",
      },
    ],
  },
];
