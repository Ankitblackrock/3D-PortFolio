const Navbar = () => {
  return (
    <div className="fixed top-0 w-full flex justify-between items-center z-10 p-6">
      <div></div>

      <ul className="text-white flex justify-between items-center text-base mx-0 gap-2 font-medium">
        <li className="cursor-pointer">Home</li>
        <li className="cursor-pointer">About</li>
        <li className="cursor-pointer">Projects</li>
        <li className="cursor-pointer">Testimonial</li>
        <li className="cursor-pointer">Contact Me !!</li>
      </ul>
    </div>
  );
};

export default Navbar;
