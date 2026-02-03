import React from "react";
import MobileNavbar from "@/components/common/MobileNavbar";
import HeroPartSkeleton from "@/components/specific/HeroPartSkeleton";
import SearchBoxSkeleton from "@/components/specific/SearchBoxSkeleton";
import SeatCandidatesResultSkeleton from "@/components/specific/SeatCandidatesResultSkeleton";

const SeatPoolSectionSkeleton = () => (
  <section className="container mx-auto mt-8 px-4 lg:mt-10">
    <div className="rounded-2xl bg-white border border-gray-200 overflow-hidden shadow-sm">
      <div className="lg:px-6 px-4 py-4">
        <div className="h-6 w-64 bg-gray-200 rounded animate-gray-pulse" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 p-4 lg:p-6">
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl border border-gray-200 bg-gray-50/30 p-5 min-h-[220px] animate-gray-pulse"
          />
        ))}
      </div>
    </div>
  </section>
);

const HomePageSkeleton = () => {
  return (
    <div className="lg:mb-14 mb-10">
      <MobileNavbar />
      <HeroPartSkeleton />
      <SearchBoxSkeleton />
      <SeatCandidatesResultSkeleton />
      <SeatPoolSectionSkeleton />
    </div>
  );
};

export default HomePageSkeleton;
