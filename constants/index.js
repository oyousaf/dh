export const NAV_LINKS = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
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
  { name: "Phone", href: "tel:07722128784", icon: FaPhone },
];

const currentYear = new Date().getFullYear();
const yearsInBusiness = currentYear - 2023;

export const aboutTiles = [
  {
    title: "Our Mission",
    description:
      "At Drainage Hero, we are devoted to providing dependable and expertly tailored drainage solutions throughout West Yorkshire. We strive to assist both residential and commercial clients by resolving drainage issues promptly and efficiently, minimising disruption to daily operations.",
    icon: "FaBullhorn",
  },
  {
    title: "Our Core Values",
    description:
      "We are firmly committed to the principles of integrity, professionalism, and unparalleled customer satisfaction. We believe in transparency, reliability, and trustworthiness, ensuring that every client interaction is characterised by the highest standards of service and ethical conduct.",
    icon: "FaHandshake",
  },
  {
    title: "Our History",
    description:
      `Founded in 2023, Drainage Hero has rapidly established itself as a leader in drainage services within West Yorkshire. With ${yearsInBusiness} years of collective experience, we continue to deliver innovative solutions and set the benchmark for quality and reliability in the industry.`,
    icon: "FaHistory",
  },
  {
    title: "Why Choose Us?",
    description:
      "Our distinctive approach combines extensive expertise, state-of-the-art technology, and a customer-centric ethos. We are dedicated to delivering the highest calibre of drainage services, offering bespoke solutions that are both efficient and cost-effective, ensuring long-term satisfaction.",
    icon: "FaStar",
  },
];

export const gallery = [
  {
    id: 1,
    src: "https://www.drainandsewer.co.uk/wp-content/uploads/Do-your-drains-need-repairing-1.jpg",
    alt: "Gallery Image 1",
  },
  {
    id: 2,
    src: "https://i.imgur.com/Ym54z2R.jpg",
    alt: "Gallery Image 2",
  },
  {
    id: 3,
    src: "https://cdn.mos.cms.futurecdn.net/r2yVHzwtrU659ixpzaMfXb-1200-80.jpg",
    alt: "Gallery Image 3",
  },
  {
    id: 4,
    src: "https://media.istockphoto.com/id/1311303472/photo/newly-made-ditch-for-irrigation-of-fields.jpg?s=612x612&w=0&k=20&c=IuJZbV2z8uedh3b_4kMnBnsjl61cF55fa5s43JNBxcI=",
    alt: "Gallery Image 4",
  },
  {
    id: 5,
    src: "https://media.istockphoto.com/id/1412684227/photo/sewer-cleaning-service-worker-clean-a-clogged-drainage-with-hydro-jetting.jpg?s=612x612&w=0&k=20&c=9Y29Qld_zvlKYoe-uUc9wRQZ2td83aCH7rbN76GufXg=",
    alt: "Gallery Image 5",
  },
  {
    id: 6,
    src: "https://static.wixstatic.com/media/d58553_9a62d8da8b5941619bccb9615401ed21~mv2.jpg/v1/fill/w_406,h_304,al_c,lg_1,q_80,enc_auto/d58553_9a62d8da8b5941619bccb9615401ed21~mv2.jpg",
    alt: "Gallery Image 6",
  },
  {
    id: 7,
    src: "https://i.imgur.com/IRe9Zpc.jpg",
    alt: "Gallery Image 7",
  },
  {
    id: 8,
    src: "https://www.drainagepipe.co.uk/media/wysiwyg/guides-tips/installation/underground-drainage/foul-and-surface-water-drainage.jpg",
    alt: "Gallery Image 8",
  },
  {
    id: 9,
    src: "https://www.homehow.co.uk/images/drainagecost.jpg",
    alt: "Gallery Image 9",
  },
];

export const services = [
  {
    title: "24-Hour Clearance",
    description:
      "Rapid and efficient blockage removal using advanced high-pressure water jetting techniques",
    icon: "FaTools",
  },
  {
    title: "CCTV Surveys",
    description:
      "Comprehensive inspections to identify structural or functional issues within drainage systems",
    icon: "FaVideo",
  },
  {
    title: "Drain Installation",
    description:
      "Expertly installed drainage systems tailored to meet the highest standards of reliability and efficiency",
    icon: "FaWrench",
  },
  {
    title: "Drain Investigation",
    description:
      "Thorough diagnostic assessments to pinpoint underlying drainage concerns with precision",
    icon: "FaSearch",
  },
  {
    title: "Drain Relining & Repair",
    description:
      "Cost-effective and durable solutions to restore drain integrity without extensive excavation",
    icon: "FaToolbox",
  },
  {
    title: "Septic Tank Maintenance",
    description:
      "Professional maintenance services to ensure optimal performance and compliance with environmental regulations",
    icon: "FaRecycle",
  },
];
