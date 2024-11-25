import { socialLinks } from "../constants";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-beige py-6">
      <div className="text-center">
        <p className="text-lg">&copy; {currentYear} Drainage Hero</p>
        <p>All rights reserved</p>
        <div className="flex justify-center space-x-4 mt-4">
          {socialLinks.map(({ name, href, icon: Icon }, index) => (
            <a
              key={index}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="text-beige hover:text-tan transition-all duration-300 ease-in-out"
            >
              <Icon size={30} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
