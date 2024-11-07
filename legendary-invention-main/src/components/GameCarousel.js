"use client";
import GradientBorderButton from "@/components/GradientBorderButton";
import Image from "next/image";
import games from "@/images/games/games.png";
import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";
import { useRef } from "react";

const GameCarousel = () => {
  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -500, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 500, behavior: "smooth" });
    }
  };
  return (
    <>
      <div
        ref={scrollContainerRef}
        className="my-6 flex w-full format-scroll overflow-x-auto"
      >
        <div className="flex gap-4  ">
          <div className=" w-[490px] p-0.5 magic-gradient rounded-lg h-[280px]">
            <div className="bg-sharp-black gap-8 justify-between flex p-8 w-full h-full rounded-lg">
              <div className="flex flex-col justify-between">
                <span className="p-1 w-fit bg-white font-display text-black font-medium rounded">
                  PROMO
                </span>
                <h3 className="text-3xl font-medium font-display">
                  Daily games cash out
                </h3>
                <p className="text-sm">Play in our $10,00 daily race games</p>
                <span className="w-2/3">
                  <GradientBorderButton>Join Now</GradientBorderButton>
                </span>
              </div>
              <Image
                src={games}
                width={150}
                height={200}
                alt="games"
              />
            </div>
          </div>
          <div className=" w-[490px] p-0.5 magic-gradient rounded-lg h-[280px]">
            <div className="bg-sharp-black gap-8 justify-between flex p-8 w-full h-full rounded-lg">
              <div className="flex flex-col justify-between">
                <span className="p-1 w-fit bg-white font-display text-black font-medium rounded">
                  PROMO
                </span>
                <h3 className="text-3xl font-medium font-display">
                  Daily games cash out
                </h3>
                <p className="text-sm">Play in our $10,00 daily race games</p>
                <span className="w-2/3">
                  <GradientBorderButton>Join Now</GradientBorderButton>
                </span>
              </div>
              <Image
                src={games}
                width={150}
                height={200}
                alt="games"
              />
            </div>
          </div>
          <div className=" w-[490px] p-0.5 magic-gradient rounded-lg h-[280px]">
            <div className="bg-sharp-black gap-8 justify-between flex p-8 w-full h-full rounded-lg">
              <div className="flex flex-col justify-between">
                <span className="p-1 w-fit bg-white font-display text-black font-medium rounded">
                  PROMO
                </span>
                <h3 className="text-3xl font-medium font-display">
                  Daily games cash out
                </h3>
                <p className="text-sm">Play in our $10,00 daily race games</p>
                <span className="w-2/3">
                  <GradientBorderButton>Join Now</GradientBorderButton>
                </span>
              </div>
              <Image
                src={games}
                width={150}
                height={200}
                alt="games"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-2 w-full justify-end">
        <span
          onClick={scrollLeft}
          className="border-white p-1 flex rounded-full cursor-pointer border-2 border-solid  "
        >
          <FaArrowLeft />
        </span>
        <span
          onClick={scrollRight}
          className="border-white p-1 flex rounded-full cursor-pointer border-2 border-solid  "
        >
          <FaArrowRight />
        </span>
      </div>
    </>
  );
};

export default GameCarousel;
