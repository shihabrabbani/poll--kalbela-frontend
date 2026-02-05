import PoolView from "./PoolView";
import HeroWithSearch from "@/components/specific/HeroWithSearch";
import { fetchSeatWithVotes, fetchSeatShortInfo } from "@/apis";
import seatList from "@/assets/data/seatList";
import SectionTitle from "@/components/common/SectionTitle";
import VoterInfoCard from "@/components/common/VoterInfoCard";
import toEnglishDigits from "@/assets/lib/toEnglishDigits";
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
          logo: "https://kalbela.ideahubbd.com/pepelo.png",
          total: Number(toEnglishDigits(seatInfoData?.totalVoter)),
          iconBg: "#D31C21",
          textBg: "#FBE8E9",
          logoRaw: true,
        },
        {
          title: "পুরুষ ভোটার",
          logo: "https://kalbela.ideahubbd.com/man_avater.png",
          total: Number(toEnglishDigits(seatInfoData?.maleVoter)),
          iconBg: "#58AADB",
          textBg: "#DEEEF8",
          logoRaw: true,
        },
        {
          title: "নারী ভোটার",
          logo: "https://kalbela.ideahubbd.com/wo_man.png",
          total: Number(toEnglishDigits(seatInfoData?.femaleVoter)),
          iconBg: "#6456D4",
          textBg: "#E0DDF6",
          logoRaw: true,
        },
        {
          title: "অন্যান্য ভোটার",
          logo: "https://kalbela.ideahubbd.com/icon.png",
          total: Number(toEnglishDigits(seatInfoData?.thirdGenderVoter)),
          iconBg: "#497AFC",
          textBg: "#DBE4FE",
          logoRaw: true,
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
              <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 lg:gap-6 lg:px-6 px-4 pb-4 lg:pb-6 items-start">
                <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 gap-4 content-start">
                  {voterData.map((data, i) => (
                    <div key={i} className="min-w-0">
                      <VoterInfoCard data={data} />
                    </div>
                  ))}
                </div>
                <div className="lg:col-span-2 w-full flex flex-col justify-center items-center">
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
