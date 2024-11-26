import { services } from "@/constants";
import {
  FaTools,
  FaVideo,
  FaWrench,
  FaSearch,
  FaToolbox,
  FaRecycle,
} from "react-icons/fa";

const icons = { FaTools, FaVideo, FaWrench, FaSearch, FaToolbox, FaRecycle };

export default function Services() {
  return (
    <section id="services" className="py-12 text-black">
      <h2 className="text-3xl text-tan font-bold text-center mb-8">Services</h2>
      <div className="px-4 grid gap-8 md:grid-cols-3 text-center">
        {services.map(({ title, description, icon }, index) => {
          const Icon = icons[icon];
          return (
            <div key={index} className="p-6 bg-tan rounded shadow-md">
              {Icon ? (
                <Icon size={40} className="mx-auto mb-4" />
              ) : (
                <div className="mx-auto mb-4 text-red-500">Icon Missing</div>
              )}
              <h3 className="font-bold text-white text-xl">{title}</h3>
              <p className="mt-2">{description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
