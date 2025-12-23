"use client";

// Swiper components, modules and styles
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import slide1 from "@/assets/images/slider/slide-1.jpg";
import slide2 from "@/assets/images/slider/slide-2.jpg";
import slide3 from "@/assets/images/slider/slide-3.jpg";
import slide4 from "@/assets/images/slider/slide-4.jpg";
import slide5 from "@/assets/images/slider/slide-5.jpg";
import EligibilityNavigation from "./EligibilityNavigation";
import { usePathname } from "next/navigation";
import { useFinupsMode } from "@/store/finups/useFinupsMode";

export const sliderData = [
  {
    id: 1,
    image: slide1,
    title: "Dhaka",
  },
  {
    id: 2,
    image: slide2,
    title: "Dhaka",
  },
  {
    id: 3,
    image: slide3,
    title: "Dhaka",
  },
  {
    id: 4,
    image: slide4,
    title: "Dhaka",
  },
  {
    id: 5,
    image: slide5,
    title: "Dhaka",
  },
];

const HomeSlider = () => {

  const path = usePathname()
  const {mode} = useFinupsMode()


  return (
    <section className="relative mb-6 w-full lg:mb-20">
      <Swiper
        pagination={{ type: "bullets", clickable: true }}
        autoplay={true}
        loop={true}
        modules={[Autoplay, Pagination]}
      >
        {sliderData.map(({ id, image, title }) => (
          <SwiperSlide key={id}>
            <div className="relative">
              <Image src={image} alt={title} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="relative left-0 right-0 z-10 lg:absolute lg:-bottom-[45%] xl:-bottom-[40%] 2xl:-bottom-[20%]">
        <EligibilityNavigation path={path} />
      </div>
    </section>
  );
};

export default HomeSlider;
