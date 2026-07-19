import tirupati from "../images/tirupati.jpg";
import yadadri from "../images/yadadri.jpg";
import srisailam from "../images/srisailam.jpg";
import bhadrachalam from "../images/bhadrachalam.jpg";

const temples = [
  {
    id: "tirupati",
    name: "Tirumala Tirupati",
    location: "Tirupati, Andhra Pradesh",
    image: tirupati,
    description:
      "Sri Venkateswara Swamy Temple is one of the most sacred Hindu temples dedicated to Lord Venkateswara. Millions of devotees visit every year seeking blessings.",
    timings: "6:00 AM - 10:00 PM",
    darshanTypes: [
      {
        name: "Sarva Darshan",
        price: 0,
      },
      {
        name: "Special Entry Darshan",
        price: 300,
      },
      {
        name: "Divya Darshan",
        price: 0,
      },
      {
        name: "VIP Break Darshan",
        price: 500,
      },
    ],
  },

  {
    id: "yadadri",
    name: "Yadadri",
    location: "Yadadri Bhuvanagiri, Telangana",
    image: yadadri,
    description:
      "Sri Lakshmi Narasimha Swamy Temple is one of Telangana's most famous pilgrimage destinations.",
    timings: "4:00 AM - 9:30 PM",
    darshanTypes: [
      {
        name: "General Darshan",
        price: 0,
      },
      {
        name: "Special Darshan",
        price: 150,
      },
      {
        name: "Seegra Darshan",
        price: 300,
      },
    ],
  },

  {
    id: "srisailam",
    name: "Srisailam",
    location: "Nandyal, Andhra Pradesh",
    image: srisailam,
    description:
      "Srisailam is one of the twelve Jyotirlingas dedicated to Lord Mallikarjuna Swamy.",
    timings: "5:00 AM - 10:00 PM",
    darshanTypes: [
      {
        name: "General Darshan",
        price: 0,
      },
      {
        name: "Ati Seegra Darshan",
        price: 300,
      },
      {
        name: "Sparsha Darshan",
        price: 500,
      },
    ],
  },

  {
    id: "bhadrachalam",
    name: "Bhadrachalam",
    location: "Bhadradri Kothagudem, Telangana",
    image: bhadrachalam,
    description:
      "Sri Seetha Ramachandra Swamy Temple is one of the most important Lord Rama temples in India.",
    timings: "5:30 AM - 9:00 PM",
    darshanTypes: [
      {
        name: "General Darshan",
        price: 0,
      },
      {
        name: "Special Darshan",
        price: 100,
      },
      {
        name: "Archana Seva",
        price: 250,
      },
    ],
  },
];

export default temples;