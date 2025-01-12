import gsap from "gsap";
import { useEffect, useMemo, useRef } from "react";

interface TestimonialData {
  id: number;
  comment: string;
  author: string;
  role: string;
  avatar: string;
  rating: number;
}

const testimonialData: TestimonialData[] = [
  {
    id: 1,
    comment:
      "Outstanding work on optimizing our application performance. The attention to detail and clean code structure made a huge difference.",
    author: "Emily Chen",
    role: "Senior Software Architect",
    avatar:
      "https://ui-avatars.com/api/?name=Emily+Chen&background=random&size=60",
    rating: 5,
  },
  {
    id: 2,
    comment:
      "The UI/UX implementation exceeded our expectations. Fast, responsive, and beautifully animated.",
    author: "Michael Rodriguez",
    role: "Product Manager",
    avatar:
      "https://ui-avatars.com/api/?name=Michael+Rodriguez&background=random&size=60",
    rating: 5,
  },
  {
    id: 3,
    comment:
      "Exceptional React expertise. Delivered complex features ahead of schedule with outstanding quality.",
    author: "Sarah Johnson",
    role: "Tech Lead",
    avatar:
      "https://ui-avatars.com/api/?name=Sarah+Johnson&background=random&size=60",
    rating: 5,
  },
  {
    id: 4,
    comment:
      "Transformed our legacy codebase into a modern, maintainable application. Impressive TypeScript skills!",
    author: "David Kim",
    role: "CTO",
    avatar:
      "https://ui-avatars.com/api/?name=David+Kim&background=random&size=60",
    rating: 5,
  },
  {
    id: 5,
    comment:
      "Great communication and problem-solving skills. The 3D animations are smooth and performant.",
    author: "Lisa Anderson",
    role: "Creative Director",
    avatar:
      "https://ui-avatars.com/api/?name=Lisa+Anderson&background=random&size=60",
    rating: 5,
  },
];

const TestimonialCard = ({ data }: { data: TestimonialData }) => (
  <div className="w-[15rem] p-4 testimonial-card z-10 flex-shrink-0">
    <div>
      <img
        src="/images/comma.svg"
        alt="Quote"
        width={15}
        className="float-left"
        loading="lazy"
      />
    </div>
    <div className="mt-4 p-4">
      <p className="text-sm font-medium text-white">{data.comment}</p>
      <img
        src="/images/Star.svg"
        alt={`${data.rating} stars`}
        width={100}
        className="mt-12"
        loading="lazy"
      />
    </div>
    <div className="mt-2 flex justify-between items-center p-2 gap-3 w-full">
      <img
        src={data.avatar}
        alt={data.author}
        width={60}
        height={60}
        loading="lazy"
      />
      <div className="flex flex-col">
        <p className="text-base font-semibold text-white">{data.author}</p>
        <span className="m-0 text-sm text-left font-normal text-[#bababa]">
          {data.role}
        </span>
      </div>
    </div>
  </div>
);

function Testimonial() {
  const testimonials = useMemo(() => testimonialData, []);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Timeline>();

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const originalCards = Array.from(container.children);
    const cardWidth = (originalCards[0] as HTMLElement).offsetWidth + 32; // Include gap
    const totalWidth = cardWidth * originalCards.length;

    // Clone all cards for seamless loop
    const clonedCards = originalCards.map((card) => card.cloneNode(true));
    clonedCards.forEach((card) => container.appendChild(card));

    // Set initial container width to fit both original and cloned cards
    gsap.set(container, {
      x: 0,
      width: totalWidth * 2, // Double width to fit clones
    });

    const createInfiniteLoop = () => {
      const tl = gsap.timeline({
        repeat: -1,
        defaults: { ease: "none" },
      });

      tl.to(container, {
        x: -totalWidth,
        duration: 50,
        ease: "none",
        onComplete: () => {
          gsap.set(container, { x: 0 });
        },
      });

      return tl;
    };

    // Create and store the animation
    animationRef.current = createInfiniteLoop();

    // Pause/Resume controls
    const handleMouseEnter = () => animationRef.current?.pause();
    const handleMouseLeave = () => animationRef.current?.play();

    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [testimonials.length]);

  return (
    <section className="third-section dark-bg z-10 px-7 py-12 section-four relative overflow-hidden h-[37rem]">
      <h1 className="text-[40px] sm:text-[46px] md:text-5xl text-center font-bold primary-color mb-20">
        TESTIMONIALS.
      </h1>
      <div className="relative w-full overflow-hidden">
        <div
          className="flex items-center gap-10"
          ref={containerRef}
          style={{ willChange: "transform" }}
        >
          {testimonials.map((item) => (
            <TestimonialCard key={item.id} data={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

// Add this CSS in your styles file
// const styles = `
// .testimonial-card {
//   transform: translateZ(0);
//   backface-visibility: hidden;
//   perspective: 1000px;
// }
// `;

export default Testimonial;
