import { useEffect, useState } from "react";

const Header = () => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="mx-auto flex items-center justify-between relative max-w-7xl h-[70px]">
        <div></div>
        <ul className="hidden sm:flex justify-end items-center gap-10 header-box p-5 h-[70px] text-white ">
          <li
            className="cursor-pointer hover:text-[#bababa]"
            onClick={() => scrollToSection(".hero-section")}
          >
            Home
          </li>
          <li
            className="cursor-pointer hover:text-[#bababa]"
            onClick={() => scrollToSection(".section-one")}
          >
            About
          </li>
          <li
            className="cursor-pointer hover:text-[#bababa]"
            onClick={() => scrollToSection(".section-two")}
          >
            Tech Stack
          </li>
          <li
            className="cursor-pointer hover:text-[#bababa]"
            onClick={() => scrollToSection(".section-three")}
          >
            Project
          </li>
          <li
            className="cursor-pointer hover:text-[#bababa]"
            onClick={() => scrollToSection(".section-four")}
          >
            Testimonial
          </li>
          <li
            className="cursor-pointer hover:text-[#bababa]"
            onClick={() => scrollToSection(".section-five")}
          >
            Contact
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
