import React from "react";

const StoriesPageSkeleton = () => {
  return (
    <section>
      <div className="container mx-auto lg:mt-14 lg:mb-14 mt-10 mb-10">
        <div className="rounded-2xl bg-white">
          {/* Header Skeleton */}
          <div className="lg:px-6 px-4 py-4 text-xl font-bold flex gap-2 items-center">
            <div className="h-6 w-48 bg-gray-200 rounded animate-gray-pulse"></div>
          </div>
          <div className="grid grid-cols-12 lg:gap-6 gap-4 lg:p-x-6 p-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
              <div
                key={i}
                className="col-span-12 lg:col-span-3 flex flex-col justify-between"
              >
                <div className="h-full flex flex-col border border-gray-300 rounded px-4 py-4 bg-white">
                  <div className="flex flex-col items-center pb-4 flex-grow">
                    {/* Image Skeleton */}
                    <div className="overflow-hidden w-full relative rounded">
                      <div className="w-full aspect-video bg-gray-200 rounded animate-gray-pulse"></div>
                    </div>

                    {/* Content Skeleton */}
                    <div className="flex flex-col justify-center items-center w-full">
                      <div className="pt-4 w-full">
                        {/* Title Skeleton - 2 lines */}
                        <div className="h-5 bg-gray-200 rounded animate-gray-pulse mb-2"></div>
                        <div className="h-5 bg-gray-200 rounded animate-gray-pulse w-3/4"></div>
                      </div>
                      {/* Date Skeleton */}
                      <div className="pt-2 w-full">
                        <div className="h-4 bg-gray-200 rounded animate-gray-pulse w-24 mx-auto"></div>
                      </div>
                    </div>
                  </div>

                  {/* Button Skeleton */}
                  <div className="flex flex-col justify-center items-center border-t border-gray-300 pt-4">
                    <div className="flex justify-center items-center gap-2 w-fit border border-gray-300 py-2 px-4 rounded-lg bg-gray-200 animate-gray-pulse">
                      <div className="h-4 w-16 bg-gray-300 rounded"></div>
                      <div className="h-4 w-4 bg-gray-300 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoriesPageSkeleton;
