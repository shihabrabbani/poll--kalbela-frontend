import React from "react";
import PoolView from "@/app/pools/[seatNo]/PoolView";
import { fetchSeatWithVotes } from "@/apis";
import seatList from "@/assets/data/seatList";
import type { Seat } from "@/types";

const SEAT_NOS = ["1", "300"] as const;

function getSeatName(seatNo: string): string | null {
  const allSeats = seatList.flatMap((d) => d.seats ?? []);
  const seat = allSeats.find((s) => String(s.seatNo) === String(seatNo));
  return seat?.seatName ?? null;
}

/**
 * Fetches pool data for seats 1 and 300 and renders PoolView for each.
 * Never throws: on fetch or render error returns null so the home page does not break.
 */
export default async function HomePoolViewSection() {
  try {
    const poolData = await Promise.all(
      SEAT_NOS.map(async (seatNo) => {
        const seatName = getSeatName(seatNo);
        let initialSeat: Seat | null = null;
        let initialError: string | null = null;
        try {
          const seat = await fetchSeatWithVotes(seatNo);
          initialSeat = seat;
          if (!seat) initialError = "আসনের প্রার্থী পাওয়া যায়নি";
        } catch {
          initialError = "প্রার্থী তালিকা লোড হয়নি। আবার চেষ্টা করুন।";
        }
        return { seatNo, seatName, initialSeat, initialError };
      })
    );

    return (
      <div className="space-y-10 mt-10">
        {poolData.map(({ seatNo, seatName, initialSeat, initialError }) => (
          <PoolView
            key={seatNo}
            seatNo={seatNo}
            seatName={seatName}
            initialSeat={initialSeat}
            initialError={initialError}
          />
        ))}
      </div>
    );
  } catch {
    return null;
  }
}
