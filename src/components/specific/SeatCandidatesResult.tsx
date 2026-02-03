"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import axios from "axios";
import clsx from "clsx";
import SectionTitle from "@/components/common/SectionTitle";
import toBengaliDigits from "@/assets/lib/toBanglaDigits";
import {
  getVotedCandidateForSeatToday,
  setVotedForSeatToday,
} from "@/assets/lib/voteStorage";
import { toast } from "react-toastify";
import { submitVote } from "@/app/actions/vote";
import type {
  ElectionSeatResponse,
  Seat,
  Candidate,
  VoteSeatResponse,
  VoteSuccessData,
} from "@/types";

/** Fetches seat + vote data and returns merged seat; throws or returns null on error. */
async function fetchSeatWithVotes(seatNo: string): Promise<Seat | null> {
  const seatNum = Number(seatNo);
  const [seatResponse, voteResponse] = await Promise.all([
    axios.get<ElectionSeatResponse>("/api/vote-counting"),
    axios
      .get<VoteSeatResponse>(`/api/vote/seat/${encodeURIComponent(seatNo)}`)
      .catch(() => null),
  ]);

  if (!seatResponse?.data?.data) {
    throw new Error("প্রার্থী তালিকা লোড হয়নি।");
  }
  const seats = seatResponse.data.data;
  const seat = seats.find((s: Seat) => s.seatNumber === seatNum) ?? null;
  if (!seat) {
    return null;
  }

  const voteData =
    voteResponse?.status === 200 && voteResponse?.data?.success
      ? voteResponse.data.data
      : null;
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

  return {
    ...seat,
    candidates: mergedCandidates,
    totalVotes: voteData?.totalVote ?? seat.totalVotes,
  };
}

interface SeatCandidatesResultProps {
  seatNo: string;
  seatName: string;
}

export default function SeatCandidatesResult({
  seatNo,
  seatName,
}: SeatCandidatesResultProps) {
  const [candidatesData, setCandidatesData] = useState<Seat | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [votingCandidateId, setVotingCandidateId] = useState<number | null>(
    null
  );
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!seatNo) return;

    let cancelled = false;
    setLoading(true);
    setError(null);

    (async () => {
      try {
        const seat = await fetchSeatWithVotes(seatNo);
        if (cancelled) return;
        if (!seat) {
          setCandidatesData(null);
          setError("আসনের প্রার্থী পাওয়া যায়নি");
          return;
        }
        setCandidatesData(seat);
        setError(null);
      } catch (err) {
        if (cancelled) return;
        setError(
          axios.isAxiosError(err)
            ? err.message || "প্রার্থী তালিকা লোড হয়নি। আবার চেষ্টা করুন।"
            : "প্রার্থী তালিকা লোড হয়নি। আবার চেষ্টা করুন।"
        );
        setCandidatesData(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [seatNo]);

  // Scroll into view when candidates are loaded
  useEffect(() => {
    if ((candidatesData || error) && !loading && sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [candidatesData, error, loading]);

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
  const votedCandidateIdToday = getVotedCandidateForSeatToday(seatNo);
  const votedCandidateToday =
    votedCandidateIdToday != null
      ? candidates.find((c) => c.candidateId === votedCandidateIdToday)
      : null;

  return (
    <section ref={sectionRef} className="container mx-auto mt-2 px-4 lg:mt-4">
      <div className="rounded-2xl bg-white border border-gray-200 overflow-hidden">
        <SectionTitle>{seatName} – পছন্দের প্রার্থীকে ভোট দিন</SectionTitle>
        {votedCandidateIdToday != null && (
          <div className="mx-4 mt-2 mb-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            আপনি আজ এই আসনে{" "}
            {votedCandidateToday ? (
              <>
                <span className="font-bold">
                  {votedCandidateToday.candidateName}
                </span>{" "}
                কে ভোট দিয়েছেন। আগামীকাল আবার ভোট দিতে পারবেন।
              </>
            ) : (
              "ভোট দিয়েছেন। আগামীকাল আবার ভোট দিতে পারবেন।"
            )}
          </div>
        )}
        {candidates.length === 0 ? (
          <div className="px-4 pb-6 pt-0 text-center">
            <p className="text-gray-500 py-8">কোন প্রার্থী পাওয়া যায়নি</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 px-4 pb-6">
            {candidates.map((c) => (
              <div
                key={c.candidateId}
                className={clsx(
                  "grid grid-cols-1 sm:grid-cols-[auto_auto_1fr_180px_auto] lg:grid-cols-[auto_auto_1fr_220px_auto] gap-4 rounded-xl p-4 sm:p-5 items-center border",
                  votedCandidateIdToday === c.candidateId
                    ? "shadow-sm"
                    : "border border-gray-200 bg-gray-50/50"
                )}
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
                    {seatName} · আসন নং {toBengaliDigits(seatNo)}
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

                {/* Col 3: আপনার ভোট badge (dedicated column) */}
                <div className="flex items-center justify-start sm:justify-center min-w-0">
                  {votedCandidateIdToday === c.candidateId ? (
                    <span className="inline-flex items-center rounded-md border border-green-200 bg-green-50 px-2 py-1.5 text-xs font-semibold text-green-800 sm:px-4 sm:py-2 sm:text-sm">
                      আপনার ভোট
                    </span>
                  ) : null}
                </div>

                {/* Col 4: vote result – symbol left, progress bar + count + % right */}
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

                {/* Col 5: vote button */}
                <div className="flex justify-center sm:justify-end">
                  <button
                    type="button"
                    disabled={
                      votingCandidateId === c.candidateId ||
                      votedCandidateIdToday != null
                    }
                    onClick={async () => {
                      if (!seatNo || votedCandidateIdToday != null) return;
                      setVotingCandidateId(c.candidateId);
                      try {
                        const result = await submitVote(
                          Number(seatNo),
                          c.candidateId,
                          1
                        );
                        if (result.success && result.data) {
                          setVotedForSeatToday(seatNo, c.candidateId);
                          toast.success("ভোট সফলভাবে জমা হয়েছে");
                          const data: VoteSuccessData = result.data;
                          setCandidatesData((prev) => {
                            if (!prev) return prev;
                            const totalVote = data.totalVote;
                            const candidates: Candidate[] = prev.candidates.map(
                              (can) => {
                                if (can.candidateId === data.candidateId) {
                                  return {
                                    ...can,
                                    votesReceived: data.voteCount,
                                    votePercentage: data.votePercentage,
                                  };
                                }
                                const pct =
                                  totalVote > 0
                                    ? (can.votesReceived / totalVote) * 100
                                    : can.votePercentage ?? 0;
                                return { ...can, votePercentage: pct };
                              }
                            );
                            return {
                              ...prev,
                              candidates,
                              totalVotes: totalVote,
                            };
                          });
                        } else {
                          toast.error(result.message);
                        }
                      } catch (err) {
                        toast.error(
                          axios.isAxiosError(err)
                            ? err.message
                            : "ভোট জমা হয়নি। আবার চেষ্টা করুন।"
                        );
                      } finally {
                        setVotingCandidateId(null);
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
