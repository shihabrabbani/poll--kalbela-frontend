import React from "react";

const DistrictNamePageSkeleton = () => {
  return (
    <div className="lg:mb-14 mb-10">
      {/* RoutesHeroSection Skeleton */}
      <section>
        <div className="bg-gray-200 w-full h-[250px] relative animate-gray-pulse">
          <div className="backdrop-blur-sm mx-auto text-white py-2 flex flex-col justify-center items-center bg-black bg-opacity-40 h-full text-center">
            <div className="h-10 w-64 bg-gray-300 rounded animate-gray-pulse mb-4"></div>
            <div className="border-4 rounded-full mt-2 p-4 flex flex-col justify-center items-center w-24 h-24">
              <div className="h-6 w-12 bg-gray-300 rounded animate-gray-pulse mb-2"></div>
              <div className="h-3 w-16 bg-gray-300 rounded animate-gray-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* District Summary Info Skeleton */}
      <div className="container mx-auto lg:mt-14 mt-10">
        <div className="rounded-2xl bg-white">
          <div className="lg:px-6 px-4 py-4 text-xl font-bold text-gray-800">
            <div className="h-6 w-48 bg-gray-200 rounded animate-gray-pulse"></div>
          </div>
          <div className="grid grid-cols-10 lg:gap-6 gap-4 lg:px-6 px-4 pb-4 lg:pb-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="col-span-5 lg:col-span-2 text-gray-700 rounded-lg bg-PurpleLight border border-PurpleDark"
              >
                <div className="py-2 lg:py-4 lg:grid grid-cols-2 flex flex-col gap-2 lg:gap-0">
                  {/* Logo Skeleton */}
                  <div className="flex justify-center items-center">
                    <div className="w-8 lg:w-16 h-8 lg:h-16 bg-gray-200 rounded animate-gray-pulse"></div>
                  </div>
                  {/* Content Skeleton */}
                  <div className="flex gap-y-1 flex-col items-center justify-center">
                    <div className="h-4 lg:h-5 w-20 bg-gray-200 rounded animate-gray-pulse"></div>
                    <div className="h-4 w-16 bg-gray-200 rounded animate-gray-pulse"></div>
                    <div className="h-3 w-12 bg-gray-200 rounded animate-gray-pulse"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* District Seats Section Skeleton */}
      <div className="container mx-auto lg:mt-14 mt-10">
        <div className="rounded-2xl bg-white">
          <div className="lg:px-6 px-4 py-4 text-xl font-bold text-gray-800">
            <div className="h-6 w-56 bg-gray-200 rounded animate-gray-pulse"></div>
          </div>
          <div className="lg:px-6 px-4 pb-4 lg:pb-6">
            <div className="grid grid-cols-1 lg:grid-cols-[auto_300px] gap-4 items-start">
              {/* Seats List Skeleton */}
              <div className="flex flex-col h-[340px] lg:h-[500px]">
                <div className="flex-1 overflow-y-auto min-h-0 pr-2">
                  <div className="grid grid-cols-1 gap-3">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                      <div
                        key={i}
                        className="bg-gray-100 rounded p-3 border border-gray-300"
                      >
                        <div className="h-5 w-32 bg-gray-200 rounded animate-gray-pulse mb-2"></div>
                        <div className="h-4 w-48 bg-gray-200 rounded animate-gray-pulse"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* Map Skeleton */}
              <div className="hidden lg:block">
                <div className="w-full h-[500px] bg-gray-200 rounded-lg animate-gray-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chart and News Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 container mx-auto lg:mt-14 mt-10 lg:gap-6 gap-y-10">
        {/* RadialBarChart Skeleton - 2 columns */}
        <div className="col-span-2">
          <div className="rounded-2xl bg-white">
            <div className="lg:px-6 px-4 py-4 text-xl font-bold text-gray-800">
              <div className="h-6 w-48 bg-gray-200 rounded animate-gray-pulse"></div>
            </div>
            <div className="lg:px-6 px-4 pb-4 lg:pb-6">
              <div className="h-[400px] bg-gray-200 rounded animate-gray-pulse"></div>
            </div>
          </div>
        </div>

        {/* News Section Skeleton - 1 column */}
        <div className="col-span-1">
          <div className="rounded-2xl bg-white">
            <div className="lg:px-6 px-4 py-4 text-xl font-bold text-gray-800">
              <div className="h-6 w-40 bg-gray-200 rounded animate-gray-pulse"></div>
            </div>
            <div className="lg:pb-6 pb-4 px-4 lg:px-6">
              <div className="h-[485px] overflow-auto rounded-sm">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div
                    key={i}
                    className="p-2 border-[1px] bg-[#f1f4f9] rounded mb-2"
                  >
                    <div className="px-2">
                      <div className="h-3 w-24 bg-gray-200 rounded animate-gray-pulse mb-2"></div>
                      <div className="h-4 w-full bg-gray-200 rounded animate-gray-pulse mb-1"></div>
                      <div className="h-4 w-3/4 bg-gray-200 rounded animate-gray-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DistrictNamePageSkeleton;
