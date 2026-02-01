import React from "react";

const HeroPartSkeleton = () => {
  return (
    <section>
      <div className="bg-cover w-full bg-center bg-no-repeat h-[250px] lg:h-[450px] bg-gray-300">
        <div className="bg-black bg-opacity-50 backdrop-blur-sm text-white py-2 justify-center items-center h-full flex flex-col relative">
          {/* Mobile Navigation Items Skeleton */}
          <div className="block lg:hidden absolute top-0 left-0 right-0 w-full">
            <div className="flex flex-wrap justify-center gap-2 px-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="h-9 w-12 bg-white bg-opacity-20 rounded animate-gray-pulse"
                />
              ))}
            </div>
          </div>
          {/* Title + subheading skeleton - centered like HeroPart */}
          <div className="flex flex-col justify-center items-center text-center px-4">
            <div className="h-8 sm:h-9 md:h-10 lg:h-12 w-64 sm:w-72 md:w-80 lg:w-96 max-w-2xl bg-white bg-opacity-20 rounded animate-gray-pulse" />
            <div className="mt-4 h-5 sm:h-6 w-48 sm:w-56 bg-white bg-opacity-20 rounded animate-gray-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroPartSkeleton;
