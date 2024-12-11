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
      "Rapid and efficient blockage removal using advanced high-pressure water jetting techniques. Our team is available around the clock, ensuring prompt and effective solutions to even the most stubborn obstructions. With state-of-the-art equipment and a commitment to delivering top-tier service, we guarantee minimal disruption and optimal flow restoration for both residential and commercial properties. Whether it's a minor blockage or a severe issue, our skilled technicians are ready to respond swiftly to your needs.",
    image: "/images/services1.jpg",
  },
  {
    id: 2,
    title: "CCTV Surveys",
    description:
      "Comprehensive inspections to identify structural or functional issues within drainage systems. Our cutting-edge CCTV technology provides a thorough, non-invasive examination of pipes and drains, enabling us to pinpoint the root cause of any blockages or damage. This service is invaluable in uncovering hidden problems that could otherwise go undetected, offering a detailed visual report and precise recommendations for remedial action. Ideal for both preventative maintenance and post-incident diagnostics, our CCTV surveys ensure that your drainage system operates smoothly and efficiently.",
    image: "/images/services2.jpg",
  },
  {
    id: 3,
    title: "Drain Installation",
    description:
      "Expertly installed drainage systems tailored to meet the highest standards of reliability and efficiency. Our team uses only premium materials and advanced installation techniques to ensure your drainage system is robust, durable, and able to withstand the test of time. From design through to implementation, we consider every aspect of the installation process, including water flow dynamics, environmental factors, and compliance with local regulations. We pride ourselves on delivering a seamless and sustainable solution that supports long-term functionality.",
    image: "/images/services3.jpg",
  },
  {
    id: 4,
    title: "Drain Investigation",
    description:
      "Thorough diagnostic assessments to pinpoint underlying drainage concerns with precision. Using a combination of expert techniques and state-of-the-art equipment, we can investigate issues such as blockages, leaks, or cracks deep within your drainage system. Our highly trained engineers will conduct a comprehensive assessment, identifying not only the immediate problems but also any potential future risks. This proactive approach helps prevent costly repairs by addressing minor issues before they escalate.",
    image: "/images/services4.jpg",
  },
  {
    id: 5,
    title: "Drain Relining & Repair",
    description:
      "Cost-effective and durable solutions to restore drain integrity without extensive excavation. Our drain relining and repair services offer an innovative, minimally invasive method to restore damaged pipes and drains. Using advanced lining materials and techniques, we can reinforce and repair your drainage system, improving its functionality and lifespan without the disruption and cost of traditional excavation. This solution is perfect for addressing issues such as cracks, corrosion, or leaking joints in an efficient, environmentally-friendly manner.",
    image: "/images/services5.jpg",
  },
  {
    id: 6,
    title: "Septic Tank Maintenance",
    description:
      "Professional maintenance services to ensure optimal performance and compliance with environmental regulations. We provide expert septic tank inspections, cleaning, and repairs, ensuring that your system continues to operate efficiently and without issue. Regular maintenance is vital for preventing costly repairs and for meeting local environmental standards. Our team is fully certified to handle all aspects of septic tank care, from routine servicing to addressing more complex concerns. We pride ourselves on delivering peace of mind and helping you avoid unnecessary disruptions.",
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
    content:
      "Had a blocked pipe in the upstairs bathroom due to the Mrs going to an all-you-can-eat Chinese. Turned up on time, was very professional and prices were much cheaper than quoted elsewhere. Would recommend!",
  },
  {
    id: 4,
    name: "Reece",
    content: "Top quality service from top quality lads, highly recommend 👍🏻",
  },
];
