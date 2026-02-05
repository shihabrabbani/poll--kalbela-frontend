import React, { ReactNode } from "react";

interface HeroPartSkeletonProps {
  /** Rendered inside hero on desktop (lg) only – e.g. SearchBoxSkeleton */
  children?: ReactNode;
}

const HeroPartSkeleton = ({ children }: HeroPartSkeletonProps) => {
  return (
    <section>
      <div
        className={`bg-cover w-full bg-center bg-no-repeat bg-gray-400 animate-gray-pulse ${
          children ? "h-[250px] lg:min-h-[450px]" : "h-[250px] lg:h-[450px]"
        }`}
      >
        <div className="bg-black bg-opacity-50 backdrop-blur-sm text-white py-2 flex flex-col items-center w-full min-h-full">
          <div
            className={`flex flex-col flex-1 w-full items-center ${
              children ? "pt-6 pb-8 justify-center" : "justify-center"
            }`}
          >
            <div className="flex flex-col justify-center items-center text-center px-4">
              <div className="h-8 sm:h-9 md:h-10 lg:h-12 w-64 sm:w-72 md:w-80 lg:w-96 max-w-2xl bg-white/20 rounded animate-gray-pulse" />
              <div className="mt-4 h-5 sm:h-6 w-48 sm:w-56 bg-white/20 rounded animate-gray-pulse" />
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

export default HeroPartSkeleton;
