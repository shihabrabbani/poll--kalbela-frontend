import React from "react";
import ZilaInfoSkeleton from "@/components/specific/ZilaInfoSkeleton";

const DistrictsPageSkeleton = () => {
  return (
    <section>
      <div className="lg:mb-14 mb-10">
        {/* SubHeroPart Skeleton - layout shows hero */}
        <section>
          <div className="bg-gray-200 w-full h-[250px] relative animate-gray-pulse">
            <div className="mx-auto text-white py-2 flex flex-col justify-center items-center bg-black bg-opacity-40 h-full text-center">
              <div className="h-10 w-64 bg-gray-300 rounded animate-gray-pulse"></div>
            </div>
          </div>
        </section>
        {/* ZilaInfo Skeleton */}
        <ZilaInfoSkeleton />
      </div>
    </section>
  );
};

export default DistrictsPageSkeleton;
