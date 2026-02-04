"use client";
import React, { ReactNode } from "react";
import Image from "next/image";

interface HeroPartProps {
  /** Rendered inside hero on desktop (lg) only. Used for SearchBox on home/pool. */
  children?: ReactNode;
}

const HERO_IMAGE_URL = "https://kalbela.ideahubbd.com/website-banner.png";

const HeroPart = ({ children }: HeroPartProps) => {
  const mobileMenu = [
    { mainNav: "আসন", link: "/seats" },
    { mainNav: "জেলা", link: "/districts" },
    { mainNav: "খবর", link: "/stories" },
    { mainNav: "ভিডিও", link: "/videos" },
    { mainNav: "ফলাফল", link: "/results" },
  ];

  return (
    <section>
      <div
        className={`relative w-full h-[250px] ${
          children
            ? "lg:min-h-[450px] lg:pb-0 lg:overflow-visible"
            : "lg:h-[450px]"
        }`}
      >
        <Image
          src={HERO_IMAGE_URL}
          alt="কালবেলা হিরো ব্যানার"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm text-white py-2 flex flex-col items-center w-full min-h-full z-[1]"
          aria-hidden="false"
        >
          <div
            className={`flex flex-col flex-1 w-full items-center ${
              children ? "pt-6 pb-8 justify-center" : "justify-center"
            }`}
          >
            <div className="flex flex-col justify-center items-center text-center px-4">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white font-bold tracking-tight max-w-2xl">
                ত্রয়োদশ জাতীয় সংসদ নির্বাচন ২০২৬
              </h1>
              <p className="mt-4 text-base sm:text-lg md:text-xl text-white/95 font-medium tracking-wide">
                কালবেলা অনলাইন জরিপ
              </p>
            </div>
            {children ? (
              <div className="hidden lg:block container mx-auto w-full mt-8 px-4">
                <div className="w-full">{children}</div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroPart;
