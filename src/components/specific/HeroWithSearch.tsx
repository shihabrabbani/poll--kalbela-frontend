"use client";

import React from "react";
import HeroPart from "@/components/specific/HeroPart";
import HomeSearchSection from "@/components/specific/HomeSearchSection";

interface HeroWithSearchProps {
  /** Pre-select this seat (e.g. on pool page). */
  initialSeatNo?: string;
  initialSeatName?: string | null;
}

/**
 * Hero + SearchBox. Desktop: search inside hero. Mobile: search below hero.
 * Pass initialSeatNo/initialSeatName on pool page to pre-select the current seat.
 */
export default function HeroWithSearch({
  initialSeatNo,
  initialSeatName,
}: HeroWithSearchProps = {}) {
  return (
    <>
      <HeroPart>
        <HomeSearchSection
          initialSeatNo={initialSeatNo}
          initialSeatName={initialSeatName}
        />
      </HeroPart>
      <div className="lg:hidden">
        <HomeSearchSection
          initialSeatNo={initialSeatNo}
          initialSeatName={initialSeatName}
        />
      </div>
    </>
  );
}
