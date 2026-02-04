import "./vertical.css";
import React from "react";
import { Suspense } from "react";
import RoutesHeroSections from "@/components/common/RoutesHeroSection";
import SectionTitle from "@/components/common/SectionTitle";
import { generatePageMetadata } from "../../config/metadata";
import { domain } from "../../config/api/api";
import type { Metadata } from "next";
import logo1 from "@/assets/Images/totalvote-logo.png";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ seatNo: string }>;
}): Promise<Metadata> {
  const seatNo = (await params).seatNo;
  const url = `${domain}/seats/${seatNo}`;
  return generatePageMetadata(url);
}
import logo2 from "@/assets/Images/man-logo.png";
import logo3 from "@/assets/Images/Female-logo.png";
import logo4 from "@/assets/Images/transgender-logo.png";
import logo5 from "@/assets/Images/team-logo.png";
import seatData from "@/assets/data/jsonData/seatInfoData.json";
import PreviousResult from "@/assets/data/jsonData/seatPreviousResult.json";
import allogo from "@/assets/Images/partyLogo/AwamiLeagueLogo.webp";
import bnplogo from "@/assets/Images/partyLogo/BNPLogo.webp";
import japalogo from "@/assets/Images/partyLogo/JatioyoPartyLogo.webp";
import pallalogo from "@/assets/Images/partyLogo/dari-palla.webp";
import haturilogo from "@/assets/Images/partyLogo/Haturi.webp";
import masallogo from "@/assets/Images/partyLogo/masal.webp";
import kantelogo from "@/assets/Images/partyLogo/kante.png";
import ektaralogo from "@/assets/Images/partyLogo/ektara.webp";
import roselogo from "@/assets/Images/partyLogo/Rose.png";
import Dablogo from "@/assets/Images/partyLogo/Coconut_Logo.png";
import tracklogo from "@/assets/Images/partyLogo/Track.png";
import gamchalogo from "@/assets/Images/partyLogo/Gamcha.png";
import mangologo from "@/assets/Images/partyLogo/mango_logo.png";
import eaglelogo from "@/assets/Images/partyLogo/Eagle.jpg";
import televisonlogo from "@/assets/Images/partyLogo/Televison.png";
import fishlogo from "@/assets/Images/partyLogo/Fish.png";
import kobutorlogo from "@/assets/Images/partyLogo/Pigeon.png";
import chodilogo from "@/assets/Images/partyLogo/chodi.png";
import mombatilogo from "@/assets/Images/partyLogo/mombati.png";
import kolarchodilogo from "@/assets/Images/partyLogo/Banana.png";
import minarlogo from "@/assets/Images/partyLogo/Minar.png";
import kachilogo from "@/assets/Images/partyLogo/kachi.png";
import chairlogo from "@/assets/Images/partyLogo/chair.png";
import kulalogo from "@/assets/Images/partyLogo/Kula.png";
import botgachlogo from "@/assets/Images/partyLogo/botgach.png";
import gorilogo from "@/assets/Images/partyLogo/Watch.png";
import kettlelogo from "@/assets/Images/partyLogo/Kettle.png";
import sonaliashlogo from "@/assets/Images/partyLogo/TBNPlogo.png";
import bashilogo from "@/assets/Images/partyLogo/bashi.png";
import cyclelogo from "@/assets/Images/partyLogo/cycle.png";
import nongorlogo from "@/assets/Images/partyLogo/Nongor.png";
import malalogo from "@/assets/Images/partyLogo/Fulermala.png";
import VoterInfoCard from "@/components/common/VoterInfoCard";
import toEnglishDigits from "@/assets/lib/toEnglishDigits";
import StickyAd from "@/components/common/StickyAd";
import "react-vertical-timeline-component/style.min.css";
import CandidatesTimeline from "@/components/common/CandidatesTimeline";
import ElectionResultsTimeline from "@/components/common/ElectionResultsTimeline";
import {
  fetchSeatShortInfo,
  fetchSeatWiseInfo,
  fetchVoteCountingAsCandidates,
} from "@/apis";
import { ElectionInfo, SeatInfo } from "@/types";
import {
  SeatShortItem,
  SeatShortResponse,
} from "@/app/config/interfaces/interfaces";
import DistrictSeatsSection from "@/components/common/DistrictSeatsSection";
import mapData from "@/assets/data/map/mapData";
import seatListData from "@/assets/data/seatList";
import districtData from "@/assets/data/districtList";
import SeatNewsPart from "@/components/specific/SeatNewsPart";
import SeatNewsPartSkeleton from "@/components/specific/SeatNewsPartSkeleton";

const Page = async ({ params }: { params: Promise<{ seatNo: string }> }) => {
  const seatNo = (await params).seatNo;

  const oldseatInfoData = seatData.data.find(
    (seatInfo) => seatInfo.seatNo === Number(seatNo)
  );

  const [seatWiseResponseRaw, seatShortResponseRaw, candidatesResponseRaw] =
    await Promise.all([
      fetchSeatWiseInfo(),
      fetchSeatShortInfo(),
      fetchVoteCountingAsCandidates(),
    ]);

  const seatWiseData: SeatInfo[] = seatWiseResponseRaw.data;

  // Find the correct seat's elections
  const currentSeat = seatWiseData.find((s) => String(s.seatNo) == seatNo);
  const sortedData = (currentSeat?.elections || []).sort(
    (a, b) => parseInt(b.electionYearEn) - parseInt(a.electionYearEn)
  );

  const yearsArray = sortedData.map((item) => [
    item.electionYearBn,
    item.electionYearEn,
  ]);

  const yearRangeText = (() => {
    if (yearsArray.length === 0) return "ফলাফল";
    const firstYearBn = yearsArray[0][0];
    const lastYearBn = yearsArray[yearsArray.length - 1][0];
    return `ফলাফল ${lastYearBn} থেকে ${firstYearBn}`;
  })();

  // Use API data instead of JSON file
  const candidatesInfoData = (candidatesResponseRaw?.data || []).find(
    (seat: any) => seat.seatNumber === Number(seatNo)
  );

  const filter = (year: string): ElectionInfo | undefined => {
    const seat = seatWiseData.find((s) => String(s.seatNo) == seatNo);
    const found = seat?.elections.find((y) => y.electionYearBn === year);
    return found;
  };

  const seatShortData: SeatShortItem[] = Array.isArray(seatShortResponseRaw)
    ? (seatShortResponseRaw as SeatShortItem[])
    : (seatShortResponseRaw as SeatShortResponse)?.SeatShortInfo ?? [];

  const shortData: SeatShortItem[] = seatShortData.filter(
    (data) => data.seatNo === Number(seatNo)
  );

  const seatInfoData = shortData.find(
    (seatInfo) => seatInfo.seatNo === Number(seatNo)
  );

  if (!seatInfoData) {
    return <div>Seat information not found</div>;
  }

  // Get district information from seat number
  const getDistrictFromSeat = () => {
    const currentDistrict = mapData.find((district) =>
      district?.containedSeats?.some((s) => String(s) === String(seatNo))
    );

    if (!currentDistrict) return null;

    const districtCode = currentDistrict.districtCode;
    const allSeats = seatListData.flatMap((division) => division.seats || []);

    // Get all seats for this district
    const districtSeats = currentDistrict.containedSeats
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

    // Get district name
    const flatDistricts = districtData.flatMap((d) => d.districts || []);
    const districtInfo = flatDistricts.find(
      (d) => String(d.districtCode) === String(districtCode)
    );

    return {
      districtCode,
      districtName: districtInfo?.districtName || "",
      seats: districtSeats,
    };
  };

  const districtInfo = getDistrictFromSeat();

  const voterData = [
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
    {
      title: "মোট প্রার্থী",
      logo: logo5,
      total: Number(toEnglishDigits(seatInfoData?.totalCandidate)),
      percentage: "",
    },
    {
      title: "স্বতন্ত্র প্রার্থী",
      logo: logo5,
      total: Number(toEnglishDigits(seatInfoData?.independentCandidate)),
      percentage: "",
    },
  ];

  const previousResultData = PreviousResult?.data?.filter(
    (data) => data?.seatNo === Number(seatNo)
  );
  // console.log(previousResultData, "PreviousData")

  const teamSymbol = [
    {
      symbolName: "নৌকা",
      logo: allogo,
    },
    {
      symbolName: "ধানের শীষ",
      logo: bnplogo,
    },
    {
      symbolName: "লাঙল",
      logo: japalogo,
    },
    {
      symbolName: "হাতুড়ি",
      logo: haturilogo,
    },
    {
      symbolName: "কাস্তে",
      logo: kantelogo,
    },
    {
      symbolName: "দাঁড়িপাল্লা",
      logo: pallalogo,
    },
    {
      symbolName: "মশাল",
      logo: masallogo,
    },
    {
      symbolName: "ডাব",
      logo: Dablogo,
    },
    {
      symbolName: "ট্রাক",
      logo: tracklogo,
    },
    {
      symbolName: "গোলাপ ফুল",
      logo: roselogo,
    },
    {
      symbolName: "গামছা",
      logo: gamchalogo,
    },
    {
      symbolName: "আম",
      logo: mangologo,
    },
    {
      symbolName: "ঈগল",
      logo: eaglelogo,
    },
    {
      symbolName: "টেলিভিশন",
      logo: televisonlogo,
    },
    {
      symbolName: "মাছ",
      logo: fishlogo,
    },
    {
      symbolName: "কবুতর",
      logo: kobutorlogo,
    },
    {
      symbolName: "একতারা",
      logo: ektaralogo,
    },
    {
      symbolName: "ছড়ি",
      logo: chodilogo,
    },
    {
      symbolName: "মোমবাতি",
      logo: mombatilogo,
    },
    {
      symbolName: "কলার ছড়ি",
      logo: kolarchodilogo,
    },
    {
      symbolName: "মিনার",
      logo: minarlogo,
    },
    {
      symbolName: "কাঁচি",
      logo: kachilogo,
    },
    {
      symbolName: "চেয়ার",
      logo: chairlogo,
    },
    {
      symbolName: "কুলা",
      logo: kulalogo,
    },
    {
      symbolName: "বটগাছ",
      logo: botgachlogo,
    },
    {
      symbolName: "ঘড়ি",
      logo: gorilogo,
    },
    {
      symbolName: "কেটলি",
      logo: kettlelogo,
    },
    {
      symbolName: "সোনালী আঁশ",
      logo: sonaliashlogo,
    },
    {
      symbolName: "বাঁশি",
      logo: bashilogo,
    },
    {
      symbolName: "বাইসাইকেল",
      logo: cyclelogo,
    },
    {
      symbolName: "নোঙর",
      logo: nongorlogo,
    },
    {
      symbolName: "ফুলের মালা",
      logo: malalogo,
    },
  ];

  const updatedCandidatesInfoData = candidatesInfoData?.candidates.map(
    (candidate: any) => {
      const match = teamSymbol.find(
        (item) => item.symbolName === candidate.partySymbol
      );
      return {
        ...candidate,
        logo: match ? match.logo : null,
      };
    }
  );

  // Add logo and Data for Previous Result Section
  const updatedPreviousResultData = previousResultData.map((data) => {
    const match = teamSymbol.find((item) => item.symbolName === data.symbol);
    return {
      ...data,
      logo: match ? match.logo : null,
    };
  });

  return (
    <div className="lg:mb-14 mb-10">
      <RoutesHeroSections
        data={{
          title: seatInfoData.seatName,
          text: "আসন নং",
          seatNo: seatInfoData.seatNo.toString(),
        }}
      />
      {/* <div>seat No: {seatNo}</div> */}

      <section>
        <div className="container mx-auto lg:mt-14 mt-10">
          <div className="rounded-2xl bg-white">
            <SectionTitle>আসনের সংক্ষিপ্ত তথ্য</SectionTitle>
            <div className="grid grid-cols-12 gap-4 lg:gap-6 lg:px-6 px-4 pb-4 lg:pb-6">
              {voterData.map((data, i) => (
                <div
                  key={i}
                  className=" col-span-6 lg:col-span-4 text-gray-700 rounded-lg bg-PurpleLight border border-PurpleDark"
                >
                  <VoterInfoCard data={data} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {districtInfo && (
        <DistrictSeatsSection
          seats={districtInfo.seats}
          title={`${districtInfo.districtName} জেলার আসনসমূহ`}
          districtCode={districtInfo.districtCode}
          districtName={districtInfo.districtName}
          showMap={true}
          currentSeatNo={seatNo}
        />
      )}

      <section>
        <div className="container mx-auto lg:mt-14 mt-10">
          <div className="rounded-2xl bg-white">
            <SectionTitle>নির্বাচনে অংশগ্রহণকারী প্রার্থী</SectionTitle>
            <div className="lg:px-6 px-4 pb-4 lg:pb-6">
              <CandidatesTimeline data={updatedCandidatesInfoData} />
            </div>
          </div>
        </div>
      </section>

      {/* <SliderForRoutingSeatPage candidatesInfoData={candidatesInfoData} /> */}

      <section>
        <div className="container mx-auto lg:mt-14 mt-10">
          <div className="rounded-2xl bg-white">
            <SectionTitle>{yearRangeText}</SectionTitle>
            <div className="lg:px-6 px-4 pb-4 lg:pb-6">
              <ElectionResultsTimeline
                data={sortedData.map((info) => {
                  const match = teamSymbol.find(
                    (item) => item.symbolName === info.symbol
                  );
                  return {
                    ...info,
                    logo: match ? match.logo : null,
                  };
                })}
                teamSymbol={teamSymbol}
              />
            </div>
          </div>
        </div>
      </section>

      <section>
        <Suspense fallback={<SeatNewsPartSkeleton />}>
          <SeatNewsPart seatNo={seatNo} />
        </Suspense>
      </section>

      <section>
        <div className="container mx-auto lg:mt-14 mt-10">
          <div className="rounded-2xl bg-white overflow-hidden">
            <SectionTitle>সোর্স: উইকিপিডিয়া</SectionTitle>
            <div className="w-full h-[1000px] lg:h-[2500px]">
              <iframe
                src={`https://bn.wikipedia.org/wiki/${encodeURIComponent(
                  seatInfoData.seatName
                )}`}
                className="w-full h-full border-none"
                loading="lazy"
                referrerPolicy="no-referrer"
                title={`${seatInfoData.seatName} - Wikipedia`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* <StickyAd /> */}
    </div>
  );
};

export default Page;
