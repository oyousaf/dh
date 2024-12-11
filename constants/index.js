export const navLinks = [
  { id: "home", label: "Home" },
  { id: "services", label: "Services" },
  { id: "reviews", label: "Reviews" },
  { id: "contact", label: "Contact" },
];

import { FaFacebook, FaInstagram, FaPhone } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { MdMail } from "react-icons/md";

export const socialLinks = [
  { name: "Instagram", href: "https://instagram.com", icon: FaInstagram },
  {
    name: "Facebook",
    href: "https://www.facebook.com/people/Drainage-Hero/100091557146560/",
    icon: FaFacebook,
  },
  { name: "Twitter", href: "https://twitter.com", icon: BsTwitterX },
  { name: "Email", href: "mailto:wmoore4001@hotmail.co.uk", icon: MdMail },
  { name: "Phone", href: "tel:+447722128784", icon: FaPhone },
];

import { FaPhoneAlt, FaSmile, FaLaptop } from "react-icons/fa";
import { MdSecurity } from "react-icons/md";
import { AiOutlineCheckCircle } from "react-icons/ai";

export const tiles = [
  {
    id: 1,
    icon: <FaPhoneAlt size={50} />,
    text: "24/7/365 emergency callouts",
  },
  {
    id: 2,
    icon: <FaSmile size={50} />,
    text: "Friendly & approachable professionals",
  },
  {
    id: 3,
    icon: <FaLaptop size={50} />,
    text: "State-of-the-art technology",
  },
  {
    id: 4,
    icon: <MdSecurity size={50} />,
    text: "Fully insured & secure services",
  },
  {
    id: 5,
    icon: <AiOutlineCheckCircle size={50} />,
    text: "100% satisfaction guarantee",
  },
];

export const services = [
  {
    id: 1,
    title: "24-Hour Clearance",
    description:
      "Rapid and efficient blockage removal using advanced high-pressure water jetting techniques",
    image: "/images/services1.jpg",
  },
  {
    title: "CCTV Surveys",
    description:
      "Comprehensive inspections to identify structural or functional issues within drainage systems",

    image: "/images/services2.jpg",
  },
  {
    title: "Drain Installation",
    description:
      "Expertly installed drainage systems tailored to meet the highest standards of reliability and efficiency",

    image: "/images/services3.jpg",
  },
  {
    title: "Drain Investigation",
    description:
      "Thorough diagnostic assessments to pinpoint underlying drainage concerns with precision",

    image: "/images/services4.jpg",
  },
  {
    title: "Drain Relining & Repair",
    description:
      "Cost-effective and durable solutions to restore drain integrity without extensive excavation",

    image: "/images/services5.jpg",
  },
  {
    title: "Septic Tank Maintenance",
    description:
      "Professional maintenance services to ensure optimal performance and compliance with environmental regulations",
    image: "/images/services6.jpg",
  },
];

export const gallery = [
  {
    id: 1,
    src: "/images/gallery1.jpg",
    alt: "Gallery Image 1",
  },
  {
    id: 2,
    src: "/images/gallery2.jpg",
    alt: "Gallery Image 2",
  },
  {
    id: 3,
    src: "/images/gallery3.jpg",
    alt: "Gallery Image 3",
  },
  {
    id: 4,
    src: "/images/gallery4.jpg",
    alt: "Gallery Image 4",
  },
];

export const CTAContent = {
  title: "Professional Drainage Services",
  description:
    "We provide reliable and expert drainage solutions for residential and commercial clients across West Yorkshire.",
  buttonText: "Get a Quote",
  buttonLink: "tel:+447722128784",
};

export const reviews = [
  {
    id: 1,
    name: "Daniel",
    content: "Very professional and got my drainage unblocked fast.",
  },
  {
    id: 2,
    name: "Lois",
    content:
      "Excellent service, didn’t have to wait long. Nice Lad, would highly recommend.",
  },
  {
    id: 3,
    name: "Ashley",
    content: "Had a blocked pipe in’t upstairs bathroom due to mr’s going an all you can eat Chinese. Turned up on time, was very professional and prices were much cheaper than quoted elsewhere. Would recommend!",
  },
  {
    id: 4,
    name: "Reece",
    content: "Top quality service from top quality lads, highly recommend 👍🏻",
  },
];
