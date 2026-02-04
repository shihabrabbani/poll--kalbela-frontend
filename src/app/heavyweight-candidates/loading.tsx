import React from "react";

export default function Loading() {
  return (
    <div className="lg:mb-14 mb-10">
      <div className="container mx-auto lg:mt-14 lg:mb-14 mt-10 mb-10">
        {/* Candidates Grid Skeleton */}
        <div className="rounded-2xl bg-white">
          {/* FilterSectionTitle Skeleton */}
          <div className="lg:px-6 px-4 py-4 flex flex-col lg:flex-row gap-3 lg:gap-2 items-start lg:items-center lg:justify-between">
            <div className="flex gap-2 items-center justify-start">
              <div className="h-7 w-48 bg-gray-200 rounded animate-gray-pulse"></div>
            </div>
            <div className="flex items-center gap-2 w-full lg:w-auto">
              <div className="h-10 bg-gray-200 rounded-lg w-full lg:w-[300px] animate-gray-pulse"></div>
            </div>
          </div>

          {/* Grid Skeleton */}
          <div className="grid grid-cols-12 lg:gap-6 gap-4 lg:p-6 p-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="col-span-12 md:col-span-6 lg:col-span-3">
                <div className="relative rounded-lg border-2 border-gray-200 bg-gradient-to-br from-white to-gray-50 shadow-lg overflow-hidden">
                  {/* Seat Name Header Skeleton */}
                  <div className="bg-gray-200 py-2 px-3 text-center animate-gray-pulse">
                    <div className="h-3 bg-gray-300 rounded w-20 mx-auto"></div>
                  </div>

                  <div className="p-4 lg:p-5 flex flex-col items-center">
                    {/* Image Skeleton */}
                    <div className="relative mb-3">
                      <div className="w-24 h-24 lg:w-28 lg:h-28 rounded-full border-2 border-gray-200 bg-gray-200 animate-gray-pulse"></div>
                    </div>

                    {/* Name Skeleton */}
                    <div className="h-4 lg:h-5 bg-gray-200 rounded w-28 mb-2 animate-gray-pulse"></div>

                    {/* Party Info Skeleton */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-6 h-6 lg:w-7 lg:h-7 rounded-full bg-gray-200 animate-gray-pulse"></div>
                      <div className="h-3 lg:h-4 bg-gray-200 rounded w-20 animate-gray-pulse"></div>
                    </div>

                    {/* Vote Stats Skeleton */}
                    <div className="w-full mt-3 pt-3 border-t border-gray-200">
                      <div className="grid grid-cols-2 gap-3 text-center">
                        <div>
                          <div className="h-2.5 lg:h-3 bg-gray-200 rounded w-12 mx-auto mb-1 animate-gray-pulse"></div>
                          <div className="h-3.5 lg:h-4 bg-gray-200 rounded w-16 mx-auto animate-gray-pulse"></div>
                        </div>
                        <div>
                          <div className="h-2.5 lg:h-3 bg-gray-200 rounded w-10 mx-auto mb-1 animate-gray-pulse"></div>
                          <div className="h-3.5 lg:h-4 bg-gray-200 rounded w-12 mx-auto animate-gray-pulse"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Load More Button Skeleton */}
        <div className="flex flex-col justify-center items-center mt-6">
          <div className="h-10 bg-gray-200 rounded-lg w-32 animate-gray-pulse"></div>
        </div>
      </div>
    </div>
  );
}
