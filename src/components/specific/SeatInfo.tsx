"use client";
import React, { useState } from "react";
import seatsData from "@/assets/data/seatList";
import { cn } from "@/assets/lib/cn";
import SeatNavigationMap from "../common/SeatNavigationMap/SeatNavigationMap";
import SectionTitle from "../common/SectionTitle";
import toBengaliDigits from "@/assets/lib/toBanglaDigits";
import Link from "next/link";

const SeatInfo3 = ({ className }: { className?: string }) => {
  const [selectedDivision, setSelecteDivision] = useState("dhaka");
  const DivisionData = seatsData.find(
    (item) => item.division === selectedDivision
  );
  const seats = DivisionData?.seats || [];
  return (
    <section>
      <div className={cn("container mx-auto lg:mb-14 mb-10", className)}>
        <div className="bg-white rounded-2xl">
          <div className="mb-3">
            <SectionTitle>
              পছন্দের প্রার্থীকে ভোট দিতে আসন ক্লিক করুন
            </SectionTitle>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 px-4 lg:px-6 pb-4 lg:pb-6">
            <div className="col-span-12 lg:col-span-8 order-2 lg:order-1 rounded-lg">
              <div className="grid grid-cols-4 lg:grid-cols-8 gap-1">
                {seatsData.map((divisionData, i) => (
                  <button
                    key={i}
                    onClick={() => setSelecteDivision(divisionData.division)}
                    className={cn(
                      "text-sm lg:text-lg border-gray-300 px-2 py-1 text-center text-PurpleDark hover:bg-PurpleDark hover:text-white rounded font-semibold transition-all duration-300",
                      {
                        "bg-PurpleDark text-white hover:text-white":
                          selectedDivision === divisionData.division,
                      }
                    )}
                  >
                    {divisionData.text}
                  </button>
                ))}
              </div>
              <div className="pt-14">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 h-[228px] lg:h-[290px] overflow-y-auto custom-scrollbar">
                  {seats.map((seatdata, i) => (
                    <Link
                      href={`/pools/seat-${seatdata.seatNo}`}
                      key={i}
                      className="flex flex-col justify-between text-center items-center rounded-sm bg-PurpleLight hover:bg-hover py-2 duration-200"
                    >
                      <div className="text-PurpleDark hover:text-black duration-200 text-base lg:text-lg font-semibold">
                        {seatdata.seatName}
                      </div>
                      <div className="text-sm lg:text-base">
                        আসন নং: {toBengaliDigits(seatdata.seatNo)}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-span-12 lg:col-span-4 order-2 lg:order-1 rounded-lg pt-6 lg:pt-0">
              <SeatNavigationMap selectedDivision={selectedDivision} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SeatInfo3;
