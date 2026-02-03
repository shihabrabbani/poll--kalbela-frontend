import type { Seat, Candidate, VoteSeatResponse } from "@/types";

export interface FetchOptions {
  revalidateSeconds?: number;
}

function getFetchOpts(options?: FetchOptions) {
  const s = options?.revalidateSeconds;
  return s != null && s > 0
    ? ({ next: { revalidate: s } } as const)
    : { cache: "no-store" as const };
}

export async function fetchDistrictWiseInfo(options?: FetchOptions) {
  const opts = getFetchOpts(options);
  try {
    const res = await fetch(
      "https://kalbela.ideahubbd.com/election/data/district-wise-info.json",
      opts
    );
    if (!res.ok) {
      throw new Error(
        `Failed to fetch district data: ${res.status} ${res.statusText}`
      );
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching district-wise info:", error);
    return { data: [] };
  }
}

export async function fetchSeatWiseInfo(options?: FetchOptions) {
  const opts = getFetchOpts(options);
  const res = await fetch(
    "https://kalbela.ideahubbd.com/election/data/seat-wise-info.json",
    opts
  );
  return res.json();
}

export async function fetchSeatShortInfo(options?: FetchOptions) {
  const opts = getFetchOpts(options);
  const res = await fetch(
    "https://kalbela.ideahubbd.com/election/json/SeatShortInfo.json",
    opts
  );
  return res.json();
}

export async function fetchPreviousElectionInfo(options?: FetchOptions) {
  const opts = getFetchOpts(options);
  const res = await fetch(
    "https://kalbela.ideahubbd.com/election/data/previous-elections.json",
    opts
  );
  return res.json();
}

export async function fetchElectionShortInfo(options?: FetchOptions) {
  const opts = getFetchOpts(options);
  const res = await fetch(
    "https://kalbela.ideahubbd.com/election/data/election-short-info.json",
    opts
  );
  return res.json();
}

export async function fetchImportantCandidates(options?: FetchOptions) {
  const opts = getFetchOpts(options);
  const res = await fetch(
    "https://kalbela.ideahubbd.com/election/data/important-candidates.json",
    opts
  );
  return res.json();
}

export async function fetchfeaturedCandidates(options?: FetchOptions) {
  const opts = getFetchOpts(options);
  const res = await fetch(
    "https://kalbela.ideahubbd.com/election/data/featured-candidates.json",
    opts
  );
  return res.json();
}

export async function fetchVoteCountingAsCandidates(options?: FetchOptions) {
  const opts = getFetchOpts(options);
  const res = await fetch(
    "https://kalbela.ideahubbd.com/election/data/vote-counting-compress.json",
    opts
  );
  return res.json();
}

const KBV_VOTE_URL = "https://kbv.ideahubbd.com/api/Vote/seatNumber";

export async function fetchVoteBySeat(
  seatNo: string,
  options?: FetchOptions
): Promise<VoteSeatResponse | null> {
  const opts = getFetchOpts(options);
  try {
    const url = `${KBV_VOTE_URL}?seatNumber=${encodeURIComponent(
      seatNo.trim()
    )}`;
    const res = await fetch(url, {
      ...opts,
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

/** Fetches seat from vote-counting and merges with vote-by-seat data. Returns null if seat not found or on error. */
export async function fetchSeatWithVotes(
  seatNo: string,
  options?: FetchOptions
): Promise<Seat | null> {
  const seatNum = Number(seatNo);
  const [countingRes, voteRes] = await Promise.all([
    fetchVoteCountingAsCandidates(options),
    fetchVoteBySeat(seatNo, options),
  ]);
  const seats: Seat[] = countingRes?.data ?? [];
  const seat = seats.find((s: Seat) => s.seatNumber === seatNum) ?? null;
  if (!seat) return null;

  const voteData = voteRes?.success && voteRes?.data ? voteRes.data : null;
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

export async function fetchCurrentPartyResults(options?: FetchOptions) {
  const opts = getFetchOpts(options);
  const res = await fetch(
    "https://kalbela.ideahubbd.com/election/data/party-results.json",
    opts
  );
  return res.json();
}

export interface FetchNewsListOptions extends FetchOptions {
  catId?: number;
  limit?: number;
}

export async function fetchNewsList(options?: FetchNewsListOptions) {
  const catId = options?.catId ?? 138;
  const limit = options?.limit ?? 3;
  const opts = getFetchOpts(options);
  const res = await fetch(
    `https://api.kalbela.com/news-list?cat_id=${catId}&limit=${limit}`,
    opts
  );
  return res.json();
}

export interface FetchSeatNewsListOptions extends FetchOptions {
  tags: string;
  catId?: number;
  limit?: number;
}

export async function fetchSeatNewsList(options: FetchSeatNewsListOptions) {
  const catId = options.catId ?? 138;
  const limit = options.limit ?? 3;
  const opts = getFetchOpts(options);
  const res = await fetch(
    `https://api.kalbela.com/news-list?cat_id=${catId}&tags=${options.tags}&limit=${limit}`,
    opts
  );
  return res.json();
}

export async function fetchElectionVideos(options?: FetchOptions) {
  const opts = getFetchOpts(options);
  try {
    const res = await fetch(
      "https://www.kalbela.com/json-feed/video/election.json",
      opts
    );
    if (!res.ok) {
      throw new Error(
        `Failed to fetch election videos: ${res.status} ${res.statusText}`
      );
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching election videos:", error);
    return [];
  }
}
