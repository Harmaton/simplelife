import React, { useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "../ui/carousel";
import Image from "next/image";
import { AspectRatio } from "../ui/aspect-ratio";
import Autoplay from "embla-carousel-autoplay";

const CarouselHero: React.FC = React.memo(({}) => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const images = [
    "/images/1.jpg",
    "/images/2.jpg",
    "/images/3.jpg",
  ];
  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className='w-full overflow-hidden'>
      <Carousel
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
        opts={{
          align: "start",
          loop: true,
        }}
        setApi={setApi}>
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem className='p-4' key={index}>
              <AspectRatio ratio={1 / 1}>
                <Image
                  src={image}
                  alt='Hero Image'
                  className='aspect-video xl:aspect-square object-cover w-full h-[180] rounded-2xl shadow-2xl grayscale transition-all ease-in-out duration-500 m-2 cursor-pointer'
                  // width={550}
                  // height={550}
                  fill
                />
              </AspectRatio>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
});

CarouselHero.displayName = "CarouselHero";

export default CarouselHero;
