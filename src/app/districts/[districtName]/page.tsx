import React from "react";
import { Suspense } from "react";
import Link from "next/link";
import RoutesHeroSections from "@/components/common/RoutesHeroSection";
import SectionTitle from "@/components/common/SectionTitle";
import districtData from "@/assets/data/districtList";
import logo1 from "@/assets/Images/totalvote-logo.png";
import logo2 from "@/assets/Images/man-logo.png";
import logo3 from "@/assets/Images/Female-logo.png";
import logo4 from "@/assets/Images/transgender-logo.png";
import logo5 from "@/assets/Images/team-logo.png";
import VoterInfoCard from "@/components/common/VoterInfoCard";
import RadialBarChart3 from "@/components/common/RadialBarChart3";
import toEnglishDigits from "@/assets/lib/toEnglishDigits";
import StickyAd from "@/components/common/StickyAd";
import { fetchDistrictWiseInfo } from "@/apis";
import { DistrictElectionData } from "@/types";
import mapData from "@/assets/data/map/mapData";
import seatListData from "@/assets/data/seatList";
import DistrictSeatsSection from "@/components/common/DistrictSeatsSection";
import { formatBnDate } from "@/assets/lib/formatBnDate";
import { generatePageMetadata } from "../../config/metadata";
import { domain } from "../../config/api/api";
import type { Metadata } from "next";
import DistrictNewsPart from "@/components/specific/DistrictNewsPart";
import DistrictNewsPartSkeleton from "@/components/specific/DistrictNewsPartSkeleton";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ districtName: string }>;
}): Promise<Metadata> {
  const districtName = (await params).districtName;
  const url = `${domain}/districts/${encodeURIComponent(districtName)}`;
  return generatePageMetadata(url);
}

const Page = async ({
  params,
}: {
  params: Promise<{ districtName: string }>;
}) => {
  const districtName = (await params).districtName;
  const districtNameDecode = decodeURIComponent(districtName);

  let districtInfoData: DistrictElectionData[] = [];
  let districtInfoError = false;

  // Get district code before making API calls
  const getDistrictCode = () => {
    const districtCode = districtData
      .flatMap((data) => data.districts)
      .find((district) => district.districtName === districtNameDecode);

    return districtCode
      ? districtCode.districtCode
      : "Code information not found";
  };
  const districtCode = getDistrictCode();

  // Fetch district info
  try {
    const districtDataPromise = await fetchDistrictWiseInfo();
    districtInfoData = districtDataPromise?.data || [];
  } catch (error) {
    console.error("Error fetching district data:", error);
    districtInfoError = true;
  }

  const getDistrictSeats = () => {
    const district = districtData
      .flatMap((data) => data.districts)
      .find((district) => district.districtName === districtNameDecode);

    return district ? district.seat : "Seat information not found";
  };
  const districtseat = getDistrictSeats();

  // Get seats for the current district
  const getDistrictSeatsList = () => {
    const currentDistrict = mapData.find(
      (district) => String(district?.districtCode) === String(districtCode)
    );

    if (!currentDistrict?.containedSeats) return [];

    // Flatten all seats from seatList
    const allSeats = seatListData.flatMap((division) => division.seats || []);

    // Match seat numbers with seat names
    return currentDistrict.containedSeats
      .map((seatNo) => {
        const seatInfo = allSeats.find(
          (seat) => seat.seatNo === String(seatNo)
        );
        return seatInfo
          ? {
              seatNo: seatInfo.seatNo,
              seatName: seatInfo.seatName,
            }
          : null;
      })
      .filter(
        (seat): seat is { seatNo: string; seatName: string } => seat !== null
      )
      .sort((a, b) => Number(a.seatNo) - Number(b.seatNo));
  };

  const districtSeats = getDistrictSeatsList();

  // robust lookup: normalize names and fallback to code/no matching
  const normalize = (s?: string) =>
    (s || "").toString().replace(/\s+/g, " ").trim().toLowerCase();

  const flatDistricts = districtData.flatMap((d) => d.districts || []);
  const matched = flatDistricts.find(
    (d) =>
      normalize(d.districtName) === normalize(districtNameDecode) ||
      normalize(d.districtName).includes(normalize(districtNameDecode)) ||
      normalize(districtNameDecode).includes(normalize(d.districtName))
  );

  const matchedNo = Number(matched?.districtCode ?? districtCode);

  // final district info lookup (fallback to best-effort matches)
  const districtInfo =
    districtInfoData.find((data) => Number(data.districtNo) === matchedNo) ||
    districtInfoData.find(
      (data) =>
        normalize(String(data.districtNo || "")) ===
        normalize(String(matchedNo))
    ) ||
    null;

  // Handle case when districtInfo is not found
  if (!districtInfo) {
    return (
      <div className="lg:mb-14 mb-10">
        <div className="container mx-auto lg:mt-14 mt-10">
          <div className="rounded-2xl bg-white p-6 text-center">
            <p className="text-gray-600">
              {districtNameDecode} জেলার তথ্য পাওয়া যায়নি
            </p>
          </div>
        </div>
        <StickyAd />
      </div>
    );
  }

  const chartData =
    districtInfo?.elections?.map((election: any) => {
      return {
        electionNo: election.electionNoEn ?? 0,
        series: [
          Number(toEnglishDigits(election.partySeats?.al || "0")),
          Number(toEnglishDigits(election.partySeats?.bnp || "0")),
          Number(toEnglishDigits(election.partySeats?.jp || "0")),
          Number(toEnglishDigits(election.partySeats?.ji || "0")),
          Number(toEnglishDigits(election.partySeats?.ao || "0")),
        ],
      };
    }) ?? [];

  const latestElection = districtInfo?.elections
    ?.slice()
    ?.sort((a, b) => b.electionNoEn - a.electionNoEn)[0];

  // const selectedElectionNo = 12;
  // const selectedElection = districtInfo?.elections?.find(
  //   (e) => e.electionNoEn === selectedElectionNo
  // );

  const voterData = [
    {
      title: "মোট ভোটার",
      logo: logo1,
      total: Number(toEnglishDigits(latestElection?.totalVoter || "")),
      percentage: "",
    },
    {
      title: "পুরুষ",
      logo: logo2,
      total: Number(toEnglishDigits(latestElection?.maleVoter || "")),
      percentage: "",
    },
    {
      title: "মহিলা",
      logo: logo3,
      total: Number(toEnglishDigits(latestElection?.femaleVoter || "")),
      percentage: "",
    },
    {
      title: "অন্যান্য",
      logo: logo4,
      total: Number(toEnglishDigits(latestElection?.thirdGenderVoter || "")),
      percentage: "",
    },
    {
      title: "মোট আসন",
      logo: logo5,
      total: Number(toEnglishDigits(latestElection?.totalSeat || "")),
      percentage: "",
    },
  ];

  return (
    <div className="lg:mb-14 mb-10">
      <RoutesHeroSections
        data={{
          title: districtNameDecode,
          text: "মোট আসন",
          seatNo: districtseat,
        }}
      />

      <div className="container mx-auto lg:mt-14 mt-10">
        <div className="rounded-2xl bg-white">
          <SectionTitle>জেলার সংক্ষিপ্ত তথ্য</SectionTitle>
          {districtInfoError ? (
            <div className="lg:px-6 px-4 pb-4 lg:pb-6 text-center text-gray-500">
              তথ্য লোড করতে সমস্যা হয়েছে
            </div>
          ) : (
            <div className="grid grid-cols-10 lg:gap-6 gap-4 lg:px-6 px-4 pb-4 lg:pb-6">
              {voterData.map((data, i) => (
                <div
                  key={i}
                  className="col-span-5 lg:col-span-2 text-gray-700 rounded-lg bg-PurpleLight border border-PurpleDark"
                >
                  <VoterInfoCard data={data} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <DistrictSeatsSection
        seats={districtSeats}
        title={`${districtNameDecode} জেলার আসনসমূহ`}
        districtCode={districtCode}
        districtName={districtNameDecode}
        showMap={true}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 container mx-auto lg:mt-14 mt-10 lg:gap-6 gap-y-10">
        <div className="col-span-2">
          {districtInfoError ? (
            <div className="rounded-2xl bg-white p-6 text-center text-gray-500">
              তথ্য লোড করতে সমস্যা হয়েছে
            </div>
          ) : (
            <RadialBarChart3 chartData={chartData || []} />
          )}
        </div>
        <div className="col-span-1">
          <Suspense fallback={<DistrictNewsPartSkeleton />}>
            <DistrictNewsPart districtName={districtNameDecode} />
          </Suspense>
        </div>
      </div>
      {/* <StickyAd /> */}
    </div>
  );
};

export default Page;
