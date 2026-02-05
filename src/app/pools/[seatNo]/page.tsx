import PoolView from "./PoolView";
import HeroWithSearch from "@/components/specific/HeroWithSearch";
import { fetchSeatWithVotes, fetchSeatShortInfo } from "@/apis";
import seatList from "@/assets/data/seatList";
import SectionTitle from "@/components/common/SectionTitle";
import VoterInfoCard from "@/components/common/VoterInfoCard";
import toEnglishDigits from "@/assets/lib/toEnglishDigits";
import logo1 from "@/assets/Images/totalvote-logo.png";
import logo2 from "@/assets/Images/man-logo.png";
import logo3 from "@/assets/Images/Female-logo.png";
import logo4 from "@/assets/Images/transgender-logo.png";
import DistrictMap from "@/components/common/DistrictMap/DistrictMap";
import mapData from "@/assets/data/map/mapData";
import districtListData from "@/assets/data/districtList";
import type {
  SeatShortItem,
  SeatShortResponse,
} from "@/app/config/interfaces/interfaces";

function getSeatName(seatNo: string): string | null {
  const allSeats = seatList.flatMap((d) => d.seats ?? []);
  const seat = allSeats.find((s) => String(s.seatNo) === String(seatNo));
  return seat?.seatName ?? null;
}

function getDistrictForSeat(
  seatNo: string
): { districtNo: string; districtName: string } | null {
  const district = mapData.find((d) =>
    d?.containedSeats?.some((s) => String(s) === String(seatNo))
  );
  if (!district?.districtCode) return null;
  const allDistricts = districtListData.flatMap((div) => div.districts ?? []);
  const match = allDistricts.find(
    (d) => String(d.districtCode) === String(district.districtCode)
  );
  return match
    ? { districtNo: match.districtCode, districtName: match.districtName }
    : null;
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

  const [seatWithVotes, seatShortResponseRaw] = await Promise.all([
    seatNo
      ? fetchSeatWithVotes(seatNo).catch(() => null)
      : Promise.resolve(null),
    fetchSeatShortInfo(),
  ]);

  if (seatNo && seatWithVotes) {
    initialSeat = seatWithVotes;
  } else if (seatNo) {
    initialError = "আসনের প্রার্থী পাওয়া যায়নি";
  } else {
    initialError = "আসন পাওয়া যায়নি।";
  }

  const seatName = getSeatName(seatNo);
  const districtInfo = getDistrictForSeat(seatNo);

  const seatShortData: SeatShortItem[] = Array.isArray(seatShortResponseRaw)
    ? (seatShortResponseRaw as SeatShortItem[])
    : (seatShortResponseRaw as SeatShortResponse)?.SeatShortInfo ?? [];

  const seatInfoData = seatShortData.find(
    (s) => String(s.seatNo) === String(seatNo)
  );

  const voterData = seatInfoData
    ? [
        {
          title: "মোট ভোটার",
          logo: logo1,
          total: Number(toEnglishDigits(seatInfoData?.totalVoter)),
          percentage: "",
        },
        {
          title: "পুরুষ",
          logo: logo2,
          total: Number(toEnglishDigits(seatInfoData?.maleVoter)),
          percentage: "",
        },
        {
          title: "মহিলা",
          logo: logo3,
          total: Number(toEnglishDigits(seatInfoData?.femaleVoter)),
          percentage: "",
        },
        {
          title: "অন্যান্য",
          logo: logo4,
          total: Number(toEnglishDigits(seatInfoData?.thirdGenderVoter)),
          percentage: "",
        },
      ]
    : [];

  return (
    <div className="lg:mb-14 mb-10">
      <div className="relative z-10">
        <HeroWithSearch initialSeatNo={seatNo} initialSeatName={seatName} />
      </div>
      <div className="relative z-0">
        <PoolView
          seatNo={seatNo}
          seatName={seatName}
          initialSeat={initialSeat}
          initialError={initialError}
        />
      </div>
      {voterData.length > 0 && (
        <section>
          <div className="container mx-auto lg:mt-14 mt-10">
            <div className="rounded-2xl bg-white">
              <SectionTitle>আসনের সংক্ষিপ্ত তথ্য</SectionTitle>
              <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 lg:gap-6 lg:px-6 px-4 pb-4 lg:pb-6">
                <div className="lg:col-span-4 grid grid-cols-2 sm:grid-cols-2 gap-4">
                  {voterData.map((data, i) => (
                    <div
                      key={i}
                      className="text-gray-700 rounded-lg bg-PurpleLight border border-PurpleDark"
                    >
                      <VoterInfoCard data={data} />
                    </div>
                  ))}
                </div>
                <div className="lg:col-span-2 min-h-[280px] lg:min-h-[340px] w-full">
                  <DistrictMap
                    seatNo={seatNo}
                    districtNo={districtInfo?.districtNo ?? ""}
                    districtName={districtInfo?.districtName ?? ""}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
