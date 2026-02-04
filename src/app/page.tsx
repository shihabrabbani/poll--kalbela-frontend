import HeroWithSearch from "@/components/specific/HeroWithSearch";
import HomeSeatPoolSection from "@/components/specific/HomeSeatPoolSection";
import SeatInfo3 from "@/components/specific/SeatInfo";
import { generatePageMetadata } from "./config/metadata";
import { domain } from "./config/api/api";
import { fetchVoteCountingAsCandidates } from "@/apis";
import type { Seat } from "@/types";

export const metadata = generatePageMetadata(domain);

export default async function Home() {
  let seats: Seat[] = [];
  let error: string | null = null;
  try {
    const res = await fetchVoteCountingAsCandidates();
    const data = res?.data;
    if (Array.isArray(data)) {
      seats = [...data].sort((a, b) => a.seatNumber - b.seatNumber);
    }
  } catch (err) {
    error = "তথ্য লোড হয়নি।";
  }

  return (
    <div className="lg:mb-14 mb-10">
      <HeroWithSearch />
      <SeatInfo3 className="lg:mt-14 mt-10" />
      {/* <HomeSeatPoolSection seats={seats} error={error} /> */}
    </div>
  );
}
