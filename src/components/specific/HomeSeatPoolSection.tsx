import React from "react";
import Image from "next/image";
import Link from "next/link";
import SectionTitle from "@/components/common/SectionTitle";
import toBengaliDigits from "@/assets/lib/toBanglaDigits";
import type { Seat, Candidate } from "@/types";

function getCandidatesByVotes(seat: Seat): Candidate[] {
  return [...seat.candidates].sort(
    (a, b) => (b.votesReceived ?? 0) - (a.votesReceived ?? 0)
  );
}

function formatPercentBangla(value: number): string {
  return `${toBengaliDigits(value.toFixed(1))}%`;
}

interface HomeSeatPoolSectionProps {
  seats: Seat[];
  error?: string | null;
}

export default function HomeSeatPoolSection({
  seats,
  error = null,
}: HomeSeatPoolSectionProps) {
  if (error) {
    return (
      <section className="container mx-auto mt-8 px-4 lg:mt-10">
        <div className="rounded-2xl bg-white border border-gray-200 p-8 text-center shadow-sm">
          <p className="text-gray-600">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="container mx-auto mt-8 px-4 lg:mt-10">
      <div className="rounded-2xl bg-white border border-gray-200 overflow-hidden shadow-sm">
        <SectionTitle>৩০০ আসনের পোল – প্রতীক ও ফলাফল</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 p-4 lg:p-6">
          {seats.map((seat) => {
            const candidates = getCandidatesByVotes(seat);
            const href = `/pools/seat-${seat.seatNumber}`;
            return (
              <Link
                key={seat.seatId}
                href={href}
                className="group flex flex-col rounded-2xl border border-gray-200 bg-white hover:border-PurpleDark/50 hover:shadow-md hover:shadow-PurpleDark/5 p-5 transition-all duration-200 min-h-[220px]"
              >
                {/* Card header */}
                <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-gray-100">
                  <h3 className="text-base font-bold text-gray-900 truncate">
                    {seat.seatName}
                  </h3>
                  <span className="shrink-0 rounded-lg bg-PurpleLight/60 px-2.5 py-1 text-xs font-medium text-PurpleDark">
                    আসন {toBengaliDigits(seat.seatNumber)}
                  </span>
                </div>
                {/* Party list */}
                <div className="flex flex-col gap-2.5 flex-1 min-h-0">
                  {candidates.length === 0 ? (
                    <p className="text-sm text-gray-500">কোন প্রার্থী নেই</p>
                  ) : (
                    candidates.map((c) => (
                      <div
                        key={c.candidateId}
                        className="flex items-center gap-3 min-w-0 py-1.5 rounded-lg hover:bg-gray-50/80 transition-colors"
                      >
                        <div className="w-7 h-7 shrink-0 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden shadow-sm">
                          {c.partyLogo ? (
                            <Image
                              src={c.partyLogo}
                              width={28}
                              height={28}
                              alt={c.partySymbol ?? c.partyName}
                              className="w-full h-full object-contain p-0.5"
                              unoptimized
                            />
                          ) : (
                            <span className="text-[9px] text-gray-500 font-medium leading-none">
                              {c.partySymbol?.slice(0, 1) ?? "—"}
                            </span>
                          )}
                        </div>
                        <span className="text-sm text-gray-700 truncate flex-1 min-w-0 font-medium">
                          {c.partyName}
                        </span>
                        <span className="text-sm font-bold text-PurpleDark shrink-0 tabular-nums">
                          {typeof c.votePercentage === "number"
                            ? formatPercentBangla(c.votePercentage)
                            : "—"}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
