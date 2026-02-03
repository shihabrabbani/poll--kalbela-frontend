"use client";

import React, { useMemo } from "react";
import SeatCandidatesResult from "@/components/specific/SeatCandidatesResult";
import SeatCandidatesResultSkeleton from "@/components/specific/SeatCandidatesResultSkeleton";
import seatList from "@/assets/data/seatList";

function getSeatName(seatNo: string): string | null {
  const allSeats = seatList.flatMap((d) => d.seats ?? []);
  const seat = allSeats.find((s) => String(s.seatNo) === String(seatNo));
  return seat?.seatName ?? null;
}

export default function PoolView({ seatNo }: { seatNo: string }) {
  const seatName = useMemo(() => getSeatName(seatNo), [seatNo]);

  return <SeatCandidatesResult seatNo={seatNo} seatName={seatName || ""} />;
}
