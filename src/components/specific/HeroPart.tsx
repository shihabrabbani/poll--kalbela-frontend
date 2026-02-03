"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import HomeSearchSection from "@/components/specific/HomeSearchSection";

const HeroPart = () => {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname.startsWith(path);
  };

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
        style={{
          backgroundImage: `url(https://kalbela.ideahubbd.com/website-banner.png)`,
        }}
        className=" bg-cover w-full bg-center bg-no-repeat h-[250px] lg:h-[450px]"
      >
        <div className="bg-black bg-opacity-50 backdrop-blur-sm text-white py-2 justify-center items-center h-full flex flex-col">
          {/* Mobile Navigation Items - commented out for now */}
          {/* <div className="block lg:hidden absolute top-0 left-0 right-0 w-full">
            <div className="flex flex-wrap justify-center gap-2 px-4">
              {mobileMenu.map((item, index) => (
                <Link
                  key={index}
                  href={item.link}
                  className={`text-sm font-medium px-3 py-3 rounded transition-colors ${
                    isActive(item.link) ? "text-blue-600" : "text-white"
                  }`}
                >
                  {item.mainNav}
                </Link>
              ))}
            </div>
          </div> */}
          <div className="flex flex-col justify-center items-center text-center px-4">
            <h1
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white font-bold tracking-tight max-w-2xl"
              // style={{
              //   textShadow:
              //     "-1px -1px 2.5px rgba(127,29,29,0.85), 1px -1px 2.5px rgba(127,29,29,0.85), -1px 1px 2.5px rgba(127,29,29,0.85), 1px 1px 2.5px rgba(127,29,29,0.85), 0 -1px 2.5px rgba(127,29,29,0.85), 0 1px 2.5px rgba(127,29,29,0.85), -1px 0 2.5px rgba(127,29,29,0.85), 1px 0 2.5px rgba(127,29,29,0.85), 0 0 16px rgba(211,28,33,0.22), 0 0 32px rgba(211,28,33,0.12), 0 2px 4px rgba(0,0,0,0.4), 0 4px 12px rgba(0,0,0,0.28), 0 8px 24px rgba(0,0,0,0.16)",
              // }}
            >
              ত্রয়োদশ জাতীয় সংসদ নির্বাচন ২০২৬
            </h1>
            <p
              className="mt-4 text-base sm:text-lg md:text-xl text-white/95 font-medium tracking-wide"
              // style={{
              //   textShadow:
              //     "0 1px 2px rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.25), 0 0 20px rgba(211,28,33,0.08)",
              // }}
            >
              কালবেলা অনলাইন জরিপ
            </p>
          </div>
          <div className="hidden lg:block container mx-auto w-full mt-8 px-4">
            <HomeSearchSection />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroPart;
