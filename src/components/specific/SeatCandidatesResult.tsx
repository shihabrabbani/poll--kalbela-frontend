"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import clsx from "clsx";
import SectionTitle from "@/components/common/SectionTitle";
import SocialShare from "@/components/common/SocialShare";
import toBengaliDigits from "@/assets/lib/toBanglaDigits";
import { MdMoreVert, MdCheck } from "react-icons/md";
import {
  getVotedCandidateForSeatToday,
  setVotedForSeatToday,
} from "@/assets/lib/voteStorage";
import { submitVote } from "@/app/actions/vote";
import type { Seat, Candidate, VoteSuccessData } from "@/types";

interface SeatCandidatesResultProps {
  seatNo: string;
  seatName: string;
  initialSeat: Seat | null;
  initialError: string | null;
}

export default function SeatCandidatesResult({
  seatNo,
  seatName,
  initialSeat,
  initialError,
}: SeatCandidatesResultProps) {
  const [candidatesData, setCandidatesData] = useState<Seat | null>(
    initialSeat
  );
  const [error, setError] = useState<string | null>(initialError);
  const [optimisticVotedId, setOptimisticVotedId] = useState<number | null>(
    null
  );
  const [shareOpen, setShareOpen] = useState(false);
  const shareDropdownRef = useRef<HTMLDivElement>(null);

  // Keep in sync when navigating to same component with different props
  useEffect(() => {
    setCandidatesData(initialSeat);
    setError(initialError);
  }, [initialSeat, initialError]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        shareDropdownRef.current &&
        !shareDropdownRef.current.contains(e.target as Node)
      ) {
        setShareOpen(false);
      }
    };
    if (shareOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [shareOpen]);

  if (error) {
    return (
      <section className="container mx-auto mt-4 px-4 lg:mt-6">
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
    <section className="container mx-auto mt-2 px-4 lg:mt-4">
      <div className="rounded-2xl bg-white border border-gray-200 overflow-visible">
        <SectionTitle
          action={
            <div className="relative" ref={shareDropdownRef}>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setShareOpen((o) => !o);
                }}
                onMouseDown={(e) => e.stopPropagation()}
                className="p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
                title="শেয়ার করুন"
                aria-label="শেয়ার অপশন"
                aria-expanded={shareOpen}
                aria-haspopup="true"
              >
                <MdMoreVert size={24} />
              </button>
              {shareOpen && (
                <div
                  className="absolute right-0 top-full mt-1 z-[100] w-max rounded-xl border border-gray-200 bg-white p-4 shadow-lg"
                  onClick={(e) => e.stopPropagation()}
                  onMouseDown={(e) => e.stopPropagation()}
                >
                  <SocialShare
                    url={`/pools/seat-${seatNo}`}
                    title={"ত্রয়োদশ জাতীয় সংসদ নির্বাচন ২০২৬"}
                    iconSize={32}
                  />
                </div>
              )}
            </div>
          }
          className="justify-start flex-wrap gap-3 items-center"
        >
          <span>{seatName}</span>
          <span className="text-gray-400 font-light mx-1" aria-hidden="true">
            •
          </span>
          <span>আসন নং {toBengaliDigits(seatNo)}</span>
        </SectionTitle>

        {candidates.length === 0 ? (
          <div className="px-4 pb-6 pt-0 text-center">
            <p className="text-gray-500 py-8">কোন প্রার্থী পাওয়া যায়নি</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 px-4 pb-6">
            {candidates.map((c) => {
              const isSelected =
                votedCandidateIdToday === c.candidateId ||
                optimisticVotedId === c.candidateId;
              const isPending = optimisticVotedId === c.candidateId;
              const isDisabled =
                votedCandidateIdToday != null || optimisticVotedId != null;
              const handleCardVote = async () => {
                if (!seatNo || votedCandidateIdToday != null) return;
                setOptimisticVotedId(c.candidateId);
                try {
                  const result = await submitVote(
                    Number(seatNo),
                    c.candidateId,
                    1
                  );
                  if (result.success && result.data) {
                    setVotedForSeatToday(seatNo, c.candidateId);
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
                  }
                } catch {
                  // Vote failed; optimistic state is reverted in finally
                } finally {
                  setOptimisticVotedId(null);
                }
              };
              return (
                <button
                  key={c.candidateId}
                  type="button"
                  disabled={isDisabled}
                  onClick={handleCardVote}
                  className={clsx(
                    "relative flex flex-wrap items-stretch gap-4 rounded-xl border p-4 sm:p-5 w-full text-left transition-colors",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-PurpleDark focus-visible:ring-offset-2",
                    "disabled:cursor-not-allowed",
                    isSelected
                      ? "border-green-300 bg-green-50/90"
                      : "border-gray-200 bg-white hover:border-green-300 hover:bg-green-50/90 disabled:hover:border-gray-200 disabled:hover:bg-white"
                  )}
                  aria-pressed={isSelected}
                  aria-busy={isPending}
                  aria-label={`${c.candidateName}, ${seatName} – ভোট দিন`}
                >
                  {/* Pending overlay: same green as card, opacity-only pulse (no red) */}
                  {isPending && (
                    <div
                      className="absolute inset-0 rounded-xl bg-green-50/90 animate-card-pulse pointer-events-none z-0"
                      aria-hidden
                    />
                  )}
                  {/* Selection indicator (radio style, filled with tick when selected) */}
                  <div className="relative z-10 flex items-center shrink-0 [&_svg]:outline-none [&_svg]:border-0">
                    <span
                      className={clsx(
                        "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 overflow-hidden outline-none",
                        isSelected
                          ? "border-green-600 bg-green-600 text-white"
                          : "border-gray-400 bg-transparent"
                      )}
                      aria-hidden
                    >
                      {isSelected && (
                        <MdCheck size={14} className="fill-current block" />
                      )}
                    </span>
                  </div>

                  {/* Circular candidate photo */}
                  <div className="relative z-10 w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-full overflow-hidden bg-gray-100 border-2 border-gray-200">
                    <Image
                      className="w-full h-full object-cover"
                      src={c.candidateImage}
                      width={96}
                      height={96}
                      alt=""
                      unoptimized={true}
                    />
                  </div>

                  {/* Main content: name, constituency, party, progress bar */}
                  <div className="relative z-10 flex-1 min-w-0 space-y-1">
                    <h3 className="text-base sm:text-lg font-bold text-gray-800">
                      {c.candidateName}
                    </h3>
                    <p className="text-sm text-gray-600">{seatName}</p>
                    <p className="text-sm text-gray-600">{c.partyName}</p>

                    {/* প্রাপ্ত ভোট – always reserve space; show content only after vote */}
                    <div className="pt-2 space-y-1 min-h-[52px]">
                      {votedCandidateIdToday != null ? (
                        <>
                          <div className="flex justify-end items-center">
                            <span className="text-sm font-semibold text-gray-800">
                              {typeof c.votePercentage === "number"
                                ? `${toBengaliDigits(
                                    c.votePercentage.toFixed(1)
                                  )}%`
                                : "—"}
                            </span>
                          </div>
                          <div className="h-2.5 w-full bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-500 bg-green-500"
                              style={{
                                width: `${Math.min(
                                  100,
                                  Math.max(0, c.votePercentage ?? 0)
                                )}%`,
                              }}
                            />
                          </div>
                        </>
                      ) : (
                        <div
                          className="h-2.5 w-full rounded-full overflow-hidden bg-transparent"
                          aria-hidden
                        />
                      )}
                    </div>
                  </div>

                  {/* Party symbol – in flex flow (circular) */}
                  <div className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center overflow-hidden pointer-events-none self-start">
                    {c.partyLogo ? (
                      <Image
                        className="w-full h-full object-contain p-1"
                        src={c.partyLogo}
                        width={80}
                        height={80}
                        alt=""
                        unoptimized={true}
                      />
                    ) : (
                      <span className="text-xs text-gray-400">প্রতীক</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
