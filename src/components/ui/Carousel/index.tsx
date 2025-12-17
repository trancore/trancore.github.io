import { cn } from "~/utils/cn";
import type { ReactNode } from "react";
import { A11y, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { SwiperOptions } from "swiper/types";

type Props = {
  slides: ReactNode[];
  swiperOption?: SwiperOptions;
};

export default function Carousel({ slides, swiperOption }: Props) {
  const resultSwiperOption: SwiperOptions = {
    slidesPerView: 3,
    navigation: true,
    ...swiperOption,
  };

  return (
    <Swiper modules={[A11y, Navigation]} {...resultSwiperOption}>
      {slides.map((slide, index) => (
        <SwiperSlide
          key={`slides-${index.toString()}`}
          className={cn("nth-[1]:ml-11")}
        >
          {slide}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
