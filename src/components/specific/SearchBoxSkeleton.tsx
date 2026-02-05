import React from "react";

interface SearchBoxSkeletonProps {
  /** When true, use transparent styling to match SearchBox inside hero (desktop) */
  inHero?: boolean;
}

const SearchBoxSkeleton = ({ inHero = false }: SearchBoxSkeletonProps) => {
  return (
    <section className="mt-6 lg:mt-8">
      <div className="container mx-auto">
        <div
          className={`rounded-2xl py-8 p-4 ${
            inHero
              ? "bg-white/65 backdrop-blur-sm border border-white/30"
              : "bg-white border border-gray-300"
          }`}
        >
          <div className="h-6 lg:h-7 w-full max-w-md mb-4 lg:mb-5 bg-gray-200 rounded animate-gray-pulse" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            <div className="sm:col-span-1">
              <div className="h-10 bg-gray-200 rounded-lg animate-gray-pulse" />
            </div>
            <div className="sm:col-span-1">
              <div className="h-10 bg-gray-200 rounded-lg animate-gray-pulse" />
            </div>
            <div className="sm:col-span-2 lg:col-span-1 flex items-end gap-2">
              <div className="flex-1">
                <div className="h-10 bg-gray-200 rounded-lg animate-gray-pulse" />
              </div>
              <div className="h-10 w-20 bg-PurpleDark/30 rounded-lg animate-gray-pulse" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchBoxSkeleton;
