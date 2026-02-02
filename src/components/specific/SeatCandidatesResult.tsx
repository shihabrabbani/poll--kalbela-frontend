"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useSelectedSeat } from "@/contexts/SelectedSeatContext";
import SectionTitle from "@/components/common/SectionTitle";
import toBengaliDigits from "@/assets/lib/toBanglaDigits";
import EmptyCandidateMessage from "@/components/specific/EmptyCandidateMessage";
import { toast } from "react-toastify";
import { submitVote } from "@/app/actions/vote";
import type {
  ElectionSeatResponse,
  Seat,
  Candidate,
  VoteSeatResponse,
} from "@/types";

export default function SeatCandidatesResult() {
  const { selectedSeat, searchTrigger } = useSelectedSeat();
  const [candidatesData, setCandidatesData] = useState<Seat | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [votingCandidateId, setVotingCandidateId] = useState<number | null>(
    null
  );
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!selectedSeat?.seatNo) {
      setCandidatesData(null);
      setError(null);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);
    const seatNo = selectedSeat.seatNo;

    Promise.all([
      fetch("/api/vote-counting").then((res) => {
        if (!res.ok) throw new Error("Failed to fetch candidates");
        return res.json() as Promise<ElectionSeatResponse>;
      }),
      fetch(`/api/vote/seat/${encodeURIComponent(seatNo)}`).then((res) => {
        if (!res.ok) return null;
        return res.json() as Promise<VoteSeatResponse | null>;
      }),
    ])
      .then(([seatResponse, voteResponse]) => {
        if (cancelled) return;
        const seats = seatResponse?.data ?? [];
        const seatNum = Number(seatNo);
        const seat = seats.find((s: Seat) => s.seatNumber === seatNum) ?? null;
        if (!seat) {
          setCandidatesData(null);
          setError("আসনের প্রার্থী পাওয়া যায়নি");
          return;
        }
        const voteData = voteResponse?.success ? voteResponse.data : null;
        const voteByCandidateId = new Map(
          voteData?.candidates?.map((c) => [c.candidateId, c]) ?? []
        );
        const mergedCandidates: Candidate[] = seat.candidates.map((c) => {
          const vote = voteByCandidateId.get(c.candidateId);
          if (!vote) return c;
          return {
            ...c,
            votesReceived: vote.totalVote,
            votePercentage: vote.votePercentage,
          };
        });
        setCandidatesData({
          ...seat,
          candidates: mergedCandidates,
          totalVotes: voteData?.totalVote ?? seat.totalVotes,
        });
        setError(null);
      })
      .catch(() => {
        if (!cancelled) {
          setError("প্রার্থী তালিকা লোড হয়নি। আবার চেষ্টা করুন।");
          setCandidatesData(null);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [selectedSeat?.seatNo, searchTrigger]);

  // Scroll into view when candidates are loaded
  useEffect(() => {
    if (
      selectedSeat &&
      (candidatesData || error) &&
      !loading &&
      sectionRef.current
    ) {
      sectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [selectedSeat, candidatesData, error, loading]);

  if (!selectedSeat) return <EmptyCandidateMessage />;

  if (loading) {
    return (
      <section ref={sectionRef} className="container mx-auto mt-4 px-4 lg:mt-6">
        <div className="rounded-2xl bg-white border border-gray-200 p-12 lg:p-16 min-h-[200px] lg:min-h-[260px] flex items-center justify-center text-center">
          <p className="text-gray-600">প্রার্থী তালিকা লোড হচ্ছে...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section ref={sectionRef} className="container mx-auto mt-4 px-4 lg:mt-6">
        <div className="rounded-2xl bg-white border border-gray-200 p-12 lg:p-16 min-h-[200px] lg:min-h-[260px] flex items-center justify-center text-center">
          <p className="text-gray-600">{error}</p>
        </div>
      </section>
    );
  }

  const candidates = candidatesData?.candidates ?? [];

  return (
    <section ref={sectionRef} className="container mx-auto mt-2 px-4 lg:mt-4">
      <div className="rounded-2xl bg-white border border-gray-200 overflow-hidden">
        <SectionTitle>
          {selectedSeat.seatName} – পছন্দের প্রার্থীকে ভোট দিন
        </SectionTitle>
        {candidates.length === 0 ? (
          <div className="px-4 pb-6 pt-0 text-center">
            <p className="text-gray-500 py-8">কোন প্রার্থী পাওয়া যায়নি</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 px-4 pb-6">
            {candidates.map((c) => (
              <div
                key={c.candidateId}
                className="grid grid-cols-1 sm:grid-cols-[auto_1fr_180px_auto] lg:grid-cols-[auto_1fr_220px_auto] gap-4 rounded-xl bg-gray-50/50 border border-gray-200 p-4 sm:p-5 items-center"
              >
                {/* Col 1: image only */}
                <div className="w-full sm:w-28 lg:w-36 aspect-square sm:aspect-auto sm:h-[120px] bg-gray-100 rounded-lg overflow-hidden justify-self-center sm:justify-self-start">
                  <Image
                    className="w-full h-full object-cover"
                    src={c.candidateImage}
                    width={144}
                    height={120}
                    alt={`${c.candidateName} এর ছবি`}
                    unoptimized={true}
                  />
                </div>

                {/* Col 2: seat info, name, party, symbol name */}
                <div className="space-y-1 min-w-0">
                  <p className="text-xs text-gray-600">
                    {selectedSeat.seatName} · আসন নং{" "}
                    {toBengaliDigits(selectedSeat.seatNo)}
                  </p>
                  <h3 className="text-lg font-bold text-PurpleDark">
                    {c.candidateName}
                  </h3>
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold text-gray-700">
                      দলের নাম:
                    </span>{" "}
                    {c.partyName}
                  </p>
                  {c.partySymbol ? (
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold text-gray-700">
                        প্রতীক:
                      </span>{" "}
                      {c.partySymbol}
                    </p>
                  ) : null}
                </div>

                {/* Col 3: vote result – symbol left, progress bar + count + % right */}
                <div className="flex items-stretch gap-3 rounded-xl border-2 border-PurpleDark/20 bg-PurpleLight/50 p-4 sm:p-5 min-w-0">
                  <div className="w-12 h-12 shrink-0 rounded-xl bg-white flex items-center justify-center overflow-hidden border-2 border-PurpleDark/30 shadow-sm self-center">
                    {c.partyLogo ? (
                      <Image
                        className="w-full h-full object-contain p-1"
                        src={c.partyLogo}
                        width={48}
                        height={48}
                        alt={c.partySymbol ?? "প্রতীক"}
                        unoptimized={true}
                      />
                    ) : (
                      <span className="text-xs text-gray-400">প্রতীক</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0 space-y-2">
                    <p className="text-xs font-bold text-PurpleDark uppercase tracking-wide">
                      ফলাফল
                    </p>
                    <div className="flex justify-between text-sm font-medium">
                      <span className="text-gray-700">
                        {typeof c.votesReceived === "number"
                          ? c.votesReceived.toLocaleString("bn-BD")
                          : "—"}
                      </span>
                      <span className="font-bold text-PurpleDark">
                        {typeof c.votePercentage === "number"
                          ? `${c.votePercentage.toFixed(1)}%`
                          : "—"}
                      </span>
                    </div>
                    <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-PurpleDark rounded-full transition-all duration-500"
                        style={{
                          width: `${Math.min(
                            100,
                            Math.max(0, c.votePercentage ?? 0)
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Col 4: vote button */}
                <div className="flex justify-center sm:justify-end">
                  <button
                    type="button"
                    disabled={votingCandidateId === c.candidateId}
                    onClick={async () => {
                      if (!selectedSeat?.seatNo) return;
                      setVotingCandidateId(c.candidateId);
                      const result = await submitVote(
                        Number(selectedSeat.seatNo),
                        c.candidateId,
                        1
                      );
                      setVotingCandidateId(null);
                      if (result.success) {
                        toast.success("ভোট সফলভাবে জমা হয়েছে");
                        // Refetch to update counts
                        const seatNo = selectedSeat.seatNo;
                        const [seatRes, voteRes] = await Promise.all([
                          fetch("/api/vote-counting").then((r) =>
                            r.json() as Promise<ElectionSeatResponse>
                          ),
                          fetch(`/api/vote/seat/${encodeURIComponent(seatNo)}`).then(
                            (r) =>
                              r.ok
                                ? (r.json() as Promise<VoteSeatResponse>)
                                : null
                          ),
                        ]);
                        const seats = seatRes?.data ?? [];
                        const seatNum = Number(seatNo);
                        const seat = seats.find(
                          (s: Seat) => s.seatNumber === seatNum
                        ) ?? null;
                        if (seat && voteRes?.success) {
                          const voteByCandidateId = new Map(
                            voteRes.data?.candidates?.map((vc) => [
                              vc.candidateId,
                              vc,
                            ]) ?? []
                          );
                          const merged = seat.candidates.map((can) => {
                            const v = voteByCandidateId.get(can.candidateId);
                            if (!v) return can;
                            return {
                              ...can,
                              votesReceived: v.totalVote,
                              votePercentage: v.votePercentage,
                            };
                          });
                          setCandidatesData({
                            ...seat,
                            candidates: merged,
                            totalVotes: voteRes.data?.totalVote ?? seat.totalVotes,
                          });
                        }
                      } else {
                        toast.error(result.message);
                      }
                    }}
                    className="px-5 py-2.5 bg-PurpleDark hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors whitespace-nowrap"
                  >
                    {votingCandidateId === c.candidateId
                      ? "জমা হচ্ছে..."
                      : "ভোট দিন"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
