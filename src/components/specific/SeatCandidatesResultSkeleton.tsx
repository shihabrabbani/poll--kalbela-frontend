import React from "react";

const SeatCandidatesResultSkeleton = () => {
  return (
    <section className="container mx-auto mt-2 px-4 lg:mt-4">
      <div className="rounded-2xl bg-white border border-gray-200 overflow-hidden">
        {/* Section title skeleton */}
        <div className="lg:px-6 px-4 py-4">
          <div className="h-6 w-64 bg-gray-200 rounded animate-gray-pulse" />
        </div>
        {/* Empty state skeleton - icon + text like EmptyCandidateMessage */}
        <div className="py-16 px-8 lg:py-24 lg:px-12 min-h-[280px] lg:min-h-[320px] flex flex-col items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-gray-200 animate-gray-pulse mb-6" />
          <div className="h-6 w-72 max-w-full bg-gray-200 rounded animate-gray-pulse" />
        </div>
      </div>
    </section>
  );
};

export default SeatCandidatesResultSkeleton;
