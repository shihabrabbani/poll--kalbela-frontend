"use client";

import React from "react";
import SeatCandidatesResult from "@/components/specific/SeatCandidatesResult";
import SeatCandidatesResultSkeleton from "@/components/specific/SeatCandidatesResultSkeleton";
import type { Seat } from "@/types";

interface PoolViewProps {
  seatNo: string;
  seatName: string | null;
  initialSeat: Seat | null;
  initialError: string | null;
}

export default function PoolView({
  seatNo,
  seatName,
  initialSeat,
  initialError,
}: PoolViewProps) {
  if (!seatNo) {
    return <SeatCandidatesResultSkeleton />;
  }

  if (!seatName) {
    return (
      <section className="container mx-auto mt-8 px-4">
        <div className="rounded-2xl bg-white border border-gray-200 p-12 text-center">
          <p className="text-gray-600">আসন পাওয়া যায়নি।</p>
        </div>
      </section>
    );
  }

  return (
    <SeatCandidatesResult
      seatNo={seatNo}
      seatName={seatName}
      initialSeat={initialSeat}
      initialError={initialError}
    />
  );
}
