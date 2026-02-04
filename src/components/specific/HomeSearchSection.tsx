"use client";

import React from "react";
import SearchBox from "@/components/specific/SearchBox/SearchBox";

interface HomeSearchSectionProps {
  /** Pre-select this seat (e.g. on pool page). */
  initialSeatNo?: string;
  initialSeatName?: string | null;
}

export default function HomeSearchSection({
  initialSeatNo,
  initialSeatName,
}: HomeSearchSectionProps = {}) {
  return (
    <SearchBox
      initialSeatNo={initialSeatNo}
      initialSeatName={initialSeatName}
    />
  );
}
