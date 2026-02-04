import PreviousDataPart from "@/components/specific/PreviousDataPart";
import React from "react";
import PreviousResultMap from "./../../components/common/PreviousResultMap";
import RadialBarCharts from "@/components/common/RadialBarChart";
import Image from "next/image";
import al from "@/assets/Images/partyLogo/AwamiLeagueLogo.webp";
import bnp from "@/assets/Images/partyLogo/BNPLogo.webp";
import japa from "@/assets/Images/partyLogo/JatioyoPartyLogo.webp";
import other from "@/assets/Images/partyLogo/bullet_point_png.webp";
import { cn } from "@/assets/lib/cn";
import LineChart from "@/components/common/LineChart";
import Counter from "@/components/common/Counter";
import StickyAd from "@/components/common/StickyAd";
import { fetchPreviousElectionInfo, fetchSeatWiseInfo } from "@/apis";
import {
  PreviousElectionItem,
  PreviousElectionResponse,
  SeatInfo,
} from "@/types";
import { generatePageMetadata } from "../config/metadata";
import { domain } from "../config/api/api";

export const metadata = generatePageMetadata(`${domain}/results`);

const page = async () => {
  const [PreviousElectionResponse, seatWiseResponseRaw] = await Promise.all([
    fetchPreviousElectionInfo(),
    fetchSeatWiseInfo(),
  ]);

  const PreviousElectionResponseTyped: PreviousElectionResponse =
    PreviousElectionResponse as PreviousElectionResponse;
  const PreviousElection: PreviousElectionItem[] =
    PreviousElectionResponseTyped?.data ?? [];

  const previousResultData: PreviousElectionItem[] = PreviousElection;

  const seatWiseData: SeatInfo[] = seatWiseResponseRaw?.data ?? [];

  const resultData = [
    {
      title: "আ. লীগ জোট",
      number: 120,
      textColor: "alDark",
      color: "alLight",
      logo: al,
    },
    {
      title: "বিএনপি জোট",
      number: 130,
      textColor: "bnpDark",
      color: "bnpLight",
      logo: bnp,
    },
    {
      title: "জাতীয় পার্টি",
      number: 30,
      textColor: "japaDark",
      color: "japaLight",
      logo: japa,
    },
    {
      title: "অন্যান্য",
      number: 20,
      textColor: "otherDark",
      color: "otherLight",
      logo: other,
    },
  ];

  return (
    <div className="lg:mb-14 mb-10">
      <h1 className="sr-only">নির্বাচনের ফলাফল</h1>
      {/* <section>
                <div className='container mx-auto lg:mt-14 mt-10'>
                    <div className='bg-white rounded-2xl'>

                        <div className='lg:px-6 px-4 py-4 text-xl font-bold flex gap-2 items-center'>
                            <div className="flex justify-center items-center blinking-dot">
                            </div>
                            <div className='text-gray-800'>সর্বশেষ বেসরকারি ফলাফল</div>
                        </div>

                        <div className='grid grid-cols-1 lg:grid-cols-12 lg:px-6 px-4 pb-4 lg:pb-6 gap-4 lg:gap-6'>
                            <div className={cn('col-span-6 border rounded pt-8 bg-PurpleLight border-PurpleDark',
                            )}>
                                <RadialBarCharts />
                            </div>
                            <div className='col-span-6 border-gray-400'>
                                <div className='grid grid-cols-2 lg:gap-6 gap-4'>
                                    {resultData.map((data, i) => (
                                        <div key={i}
                                            className={
                                                cn(
                                                    'flex flex-col justify-center items-center rounded text-center border px-2 py-3 gap-1',
                                                    {
                                                        'border-alBorder text-alDark bg-alLight': data.title === 'আ. লীগ জোট',
                                                        'border-bnpBorder text-bnpDark bg-bnpLight': data.title === 'বিএনপি জোট',
                                                        'border-japaBorder text-japaDark bg-japaLight': data.title === 'জাতীয় পার্টি',
                                                        'border-otherBorder text-otherDark bg-otherLight': data.title === 'অন্যান্য',
                                                    }
                                                )
                                            }>
                                            <Image className={cn('w-12 h-12 p-2 border-2 rounded-full bg-white shadow-lg',
                                                {
                                                    'border-alBorder': data.title === 'আ. লীগ জোট',
                                                    'border-bnpBorder': data.title === 'বিএনপি জোট',
                                                    'border-japaBorder': data.title === 'জাতীয় পার্টি',
                                                    'border-otherBorder': data.title === 'অন্যান্য',
                                                }
                                            )} src={data.logo} alt='' />
                                            <div className='lg:text-base text-xs mt-2'>{data?.title}</div>
                                            <div className='text-center text-sm lg:text-xl flex gap-2'>প্রাপ্ত আসন: <Counter targetNumber={Number(data.number)} /></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section> */}
      <PreviousDataPart previousResultData={previousResultData} />
      <div className="lg:mt-14 mt-10">
        <LineChart previousResultData={previousResultData} />
      </div>
      <div className="mt-10 lg:mt-14">
        <PreviousResultMap seatWiseData={seatWiseData} />
      </div>
      {/* <StickyAd /> */}
    </div>
  );
};

export default page;
