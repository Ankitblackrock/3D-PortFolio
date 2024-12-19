function Testimonial() {
  return (
    <section className="third-section dark-bg z-10 px-7 py-12 overflow-hidden section-four">
      <div className="relative flex flex-wrap  w-[2000px]">
        <div className="bg-green-circle absolute w-[12%] h-[20%] rounded-[10rem] top-[6rem] left-[22rem] "></div>
        <TestimonialCard />
        <TestimonialCard />
        <TestimonialCard />
        <TestimonialCard />
        <TestimonialCard />
        <TestimonialCard />
        <TestimonialCard />
        <div className="bg-green-circle absolute w-[12%] h-[20%] rounded-[10rem] bottom-[3rem] left-[0rem] "></div>{" "}
        <div className="bg-green-circle absolute w-[12%] h-[20%] rounded-[10rem] bottom-[3rem] left-[50rem] "></div>
      </div>
    </section>
  );
}

export default Testimonial;

export const TestimonialCard = () => {
  return (
    <div className="w-[15rem] p-4 testimonial-card infinity-scroll-animation z-10">
      <div>
        <img
          src="/public/images/comma.svg"
          alt="comma.svg"
          width={15}
          className="float-left"
        />
      </div>
      <div className="mt-4 p-4">
        <p className="text-sm font-medium text-white">
          {" "}
          OHHHH Thanks god !!!! Finally there is someone making it for me to use
          on my projects. Love ya
        </p>
        <img
          src="/public/images/Star.svg"
          alt="stars"
          width={100}
          className="mt-12"
        />
      </div>
      <div className="mt-2 flex justify-between items-center p-4 gap-3">
        <img
          src="/public/images/testimonial-picture/Ellipse 1.png"
          alt="Ellipse"
          width={60}
        />
        <div className="flex flex-col justify-center items-start">
          <p className="text-base font-semibold text-white">Jane Copper</p>
          <span className="text-sm font-normal text-[#bababa]">
            Lead designer
          </span>
        </div>
      </div>
    </div>
  );
};
