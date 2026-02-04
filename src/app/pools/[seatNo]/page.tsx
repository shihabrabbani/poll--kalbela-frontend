import PoolView from "./PoolView";
import HeroWithSearch from "@/components/specific/HeroWithSearch";
import { fetchSeatWithVotes } from "@/apis";
import seatList from "@/assets/data/seatList";

function getSeatName(seatNo: string): string | null {
  const allSeats = seatList.flatMap((d) => d.seats ?? []);
  const seat = allSeats.find((s) => String(s.seatNo) === String(seatNo));
  return seat?.seatName ?? null;
}

export default async function PoolPage({
  params,
}: {
  params: Promise<{ seatNo: string }>;
}) {
  const slug = (await params).seatNo;
  const seatNo = slug.replace(/^seat-/i, "").trim();
  let initialSeat = null;
  let initialError: string | null = null;

  if (seatNo) {
    try {
      const seat = await fetchSeatWithVotes(seatNo);
      initialSeat = seat;
      if (!seat) {
        initialError = "আসনের প্রার্থী পাওয়া যায়নি";
      }
    } catch {
      initialError = "প্রার্থী তালিকা লোড হয়নি। আবার চেষ্টা করুন।";
    }
  } else {
    initialError = "আসন পাওয়া যায়নি।";
  }

  const seatName = getSeatName(seatNo);

  return (
    <div className="lg:mb-14 mb-10">
      <HeroWithSearch initialSeatNo={seatNo} initialSeatName={seatName} />
      <PoolView
        seatNo={seatNo}
        seatName={seatName}
        initialSeat={initialSeat}
        initialError={initialError}
      />
    </div>
  );
}
