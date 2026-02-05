import React from "react";
import HeroPartSkeleton from "@/components/specific/HeroPartSkeleton";
import SearchBoxSkeleton from "@/components/specific/SearchBoxSkeleton";
import SeatCandidatesResultSkeleton from "@/components/specific/SeatCandidatesResultSkeleton";

export default function PoolLoading() {
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
        <SeatCandidatesResultSkeleton />
      </div>
    </div>
  );
}
