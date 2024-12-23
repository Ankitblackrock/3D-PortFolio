import { StackImg } from "../data/StackData";
import Tilt from "react-parallax-tilt";

function TechStack() {
  return (
    <section className="dark-bg py-16 px-7 z-20 section-two">
      <h2 className="text-5xl text-center font-bold text-white">
        Technologies
      </h2>
      <div className="grid grid-cols-5 mt-8 gap-6">
        {StackImg.map((item, index) => (
          <Tilt>
            <div className="isolate rounded-xl cursor-pointer bg-white/20 shadow-lg ring-1 ring-black/5">
              <img src={item.imgsrc} alt={item.name} key={index} />
            </div>
          </Tilt>
        ))}
      </div>
    </section>
  );
}

export default TechStack;
