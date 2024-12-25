const Footer = () => {
  const smoothScrollToTop = () => {
    const scrollDuration = 5000; // Duration in milliseconds (increase this for slower scroll)
    const scrollStep = -window.scrollY / (scrollDuration / 16.67); // Calculate step size (approx. 60fps)

    const scrollAnimation = () => {
      if (window.scrollY > 0) {
        window.scrollBy(0, scrollStep);
        requestAnimationFrame(scrollAnimation);
      }
    };

    requestAnimationFrame(scrollAnimation);
  };

  return (
    <footer className="bg-black px-7 py-12 section-six sticky z-10">
      <div className="flex flex-col items-center mb-8">
        <img
          src="/images/angle-double-up.svg"
          alt="star"
          width={60}
          className="cursor-pointer bounce"
          onClick={smoothScrollToTop}
        />
        <h3 className="text-white text-2xl font-semibold">Scroll To Top</h3>
      </div>
      <div className="flex items-center w-1/2">
        <a href="/" className="cursor-pointer">
          <img src="/images/social/github.svg" alt="github" width={30} />
        </a>
        <a href="/" className="cursor-pointer">
          <img src="/images/social/linkdin.svg" alt="linkdin" width={30} />
        </a>
        <a href="/" className="cursor-pointer">
          <img src="/images/social/twitter.svg" alt="twitter" width={30} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
