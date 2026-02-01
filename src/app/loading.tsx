import React from "react";
import MobileNavbar from "@/components/common/MobileNavbar";
import HeroPartSkeleton from "@/components/specific/HeroPartSkeleton";
import SearchBoxSkeleton from "@/components/specific/SearchBoxSkeleton";
import SeatCandidatesResultSkeleton from "@/components/specific/SeatCandidatesResultSkeleton";

const HomePageSkeleton = () => {
  return (
    <div className="lg:mb-14 mb-10">
      <MobileNavbar />
      <HeroPartSkeleton />
      <SearchBoxSkeleton />
      <SeatCandidatesResultSkeleton />
    </div>
  );
};

export default HomePageSkeleton;
