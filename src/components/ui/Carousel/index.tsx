import { useMediaQuery } from "~/hooks/useMeidaQuery";
import type { ReactNode } from "react";
import { A11y, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { SwiperOptions } from "swiper/types";

type Props = {
  slides: ReactNode[];
  swiperOption?: SwiperOptions;
};

export default function Carousel({ slides, swiperOption }: Props) {
  const { isPC, isTablet, isSP } = useMediaQuery();

  const resultSwiperOption: SwiperOptions = {
    spaceBetween: 32,
    slidesPerView: isSP ? 1.5 : isTablet ? 2.5 : isPC ? 3.5 : 1.25,
    navigation: true,
    ...swiperOption,
  };

  return (
    <Swiper modules={[A11y, Navigation]} {...resultSwiperOption}>
      {slides.map((slide, index) => (
        <SwiperSlide key={`slides-${index.toString()}`}>{slide}</SwiperSlide>
      ))}
    </Swiper>
  );
}
