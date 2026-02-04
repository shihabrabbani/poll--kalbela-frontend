import { Suspense } from "react";
import HeroWithSearch from "@/components/specific/HeroWithSearch";
import SeatInfo3 from "@/components/specific/SeatInfo";
import HomePoolViewSection from "@/components/specific/HomePoolViewSection";
import SeatCandidatesResultSkeleton from "@/components/specific/SeatCandidatesResultSkeleton";
import { generatePageMetadata } from "./config/metadata";
import { domain } from "./config/api/api";

export const metadata = generatePageMetadata(domain);

function PoolViewSectionFallback() {
  return (
    <div className="space-y-10 mt-10">
      <SeatCandidatesResultSkeleton />
      <SeatCandidatesResultSkeleton />
    </div>
  );
}

export default function Home() {
  return (
    <div className="lg:mb-14 mb-10">
      <div className="relative z-10">
        <HeroWithSearch />
      </div>
      <div className="relative z-0">
        <SeatInfo3 className="lg:mt-14 mt-10" />
        <Suspense fallback={<PoolViewSectionFallback />}>
          <HomePoolViewSection />
        </Suspense>
      </div>
    </div>
  );
}
