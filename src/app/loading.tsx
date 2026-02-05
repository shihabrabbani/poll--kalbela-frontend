import React from "react";
import HeroPartSkeleton from "@/components/specific/HeroPartSkeleton";
import SearchBoxSkeleton from "@/components/specific/SearchBoxSkeleton";
import SeatInfoSkeleton from "@/components/specific/SeatInfoSkeleton";
import SeatCandidatesResultSkeleton from "@/components/specific/SeatCandidatesResultSkeleton";

export default function HomePageSkeleton() {
  return (
    <div className="lg:mb-14 mb-10">
      <div className="relative z-10">
        <HeroPartSkeleton>
          <SearchBoxSkeleton inHero />
        </HeroPartSkeleton>
      </div>
      <div className="relative z-0">
        <div className="lg:hidden">
          <SearchBoxSkeleton />
        </div>
        <SeatInfoSkeleton className="lg:mt-14 mt-10" />
        <div className="space-y-10 mt-10">
          <SeatCandidatesResultSkeleton />
          <SeatCandidatesResultSkeleton />
        </div>
      </div>
    </div>
  );
}
