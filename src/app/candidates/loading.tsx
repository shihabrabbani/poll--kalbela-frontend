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
              <div className="h-7 w-40 bg-gray-200 rounded animate-gray-pulse"></div>
            </div>
            <div className="flex items-center gap-2 w-full lg:w-auto">
              <div className="h-10 bg-gray-200 rounded-lg w-full lg:w-[300px] animate-gray-pulse"></div>
            </div>
          </div>

          {/* Grid Skeleton */}
          <div className="grid grid-cols-12 lg:gap-6 gap-4 lg:p-6 p-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="col-span-12 lg:col-span-3 border px-4 py-4 rounded-md flex flex-col justify-between group relative"
              >
                <div className="flex flex-col justify-center items-center text-center">
                  {/* Image Skeleton */}
                  <div className="w-24 h-24 rounded-full bg-gray-200 animate-gray-pulse"></div>

                  <div className="pt-4 flex flex-col w-full">
                    {/* Name Skeleton */}
                    <div className="h-5 bg-gray-200 rounded w-3/4 mx-auto mb-2 animate-gray-pulse"></div>

                    {/* Seat Name Skeleton */}
                    <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-3 animate-gray-pulse"></div>

                    {/* Party Info Skeleton */}
                    <div className="flex gap-1 lg:gap-2 items-center justify-center">
                      <div className="w-6 h-6 rounded-full bg-gray-200 animate-gray-pulse"></div>
                      <div className="h-4 bg-gray-200 rounded w-20 animate-gray-pulse"></div>
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
