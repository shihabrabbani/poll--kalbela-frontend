import React from "react";
import Link from "next/link";
import DistrictMap from "@/components/common/DistrictMap/DistrictMap";
import SectionTitle from "@/components/common/SectionTitle";
import toBengaliDigits from "@/assets/lib/toBanglaDigits";

interface Seat {
  seatNo: string;
  seatName: string;
}

interface DistrictSeatsSectionProps {
  seats: Seat[];
  title: string;
  districtCode: string | number;
  districtName: string;
  showMap?: boolean;
  currentSeatNo?: string | number | null;
}

const DistrictSeatsSection: React.FC<DistrictSeatsSectionProps> = ({
  seats,
  title,
  districtCode,
  districtName,
  showMap = true,
  currentSeatNo = null,
}) => {
  // Sort seats to show current seat first if currentSeatNo is provided
  const sortedSeats = (() => {
    if (!currentSeatNo) return seats;

    const currentSeatStr = String(currentSeatNo);
    const currentSeat = seats.find(
      (seat) => String(seat.seatNo) === currentSeatStr
    );
    const otherSeats = seats.filter(
      (seat) => String(seat.seatNo) !== currentSeatStr
    );

    return currentSeat ? [currentSeat, ...otherSeats] : seats;
  })();

  return (
    <div className="container mx-auto lg:mt-14 mt-10">
      <div className="rounded-2xl bg-white">
        <SectionTitle>{title}</SectionTitle>
        <div className="lg:px-6 px-4 pb-4 lg:pb-6">
          <div className="grid grid-cols-1 lg:grid-cols-[auto_300px] gap-4 items-start">
            <div className="flex flex-col h-[340px]">
              <div className="flex-1 overflow-y-auto custom-scrollbar min-h-0 pr-2">
                <div className="grid grid-cols-1 gap-3">
                  {sortedSeats.map((seat) => {
                    const isCurrentSeat =
                      currentSeatNo &&
                      String(currentSeatNo) === String(seat.seatNo);

                    return (
                      <Link
                        key={seat.seatNo}
                        href={`/pools/seat-${seat.seatNo}`}
                        className="group"
                      >
                        <div className="relative group">
                          <div
                            className={`relative z-10 bg-white border rounded-2xl p-4 transition-all duration-300 cursor-pointer ${
                              isCurrentSeat
                                ? "border-PurpleDark shadow-xl"
                                : "border-gray-200 hover:border-PurpleDark hover:shadow-xl"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <p
                                  className={`text-base font-semibold transition-colors ${
                                    isCurrentSeat
                                      ? "text-PurpleDark"
                                      : "text-gray-800 group-hover:text-PurpleDark"
                                  }`}
                                >
                                  {seat.seatName}
                                </p>
                                <p className="text-sm text-gray-500 mt-1">
                                  আসন নং: {toBengaliDigits(seat.seatNo)}
                                </p>
                              </div>
                              <div className="ml-4 flex items-center justify-center">
                                {isCurrentSeat ? (
                                  <svg
                                    className="w-6 h-6 text-PurpleDark"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M5 13l4 4L19 7"
                                    />
                                  </svg>
                                ) : (
                                  <svg
                                    className="w-6 h-6 text-gray-400 group-hover:text-PurpleDark transition-transform duration-300 transform group-hover:translate-x-2 group-hover:rotate-12"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M9 5l7 7-7 7"
                                    />
                                  </svg>
                                )}
                              </div>
                            </div>

                            {/* Gradient line */}
                            <div className="mt-2 h-[3px] w-full overflow-hidden rounded">
                              {/* <div
                              className="h-full bg-gradient-to-r from-PurpleDark via-transparent to-PurpleDark 
                    scale-x-0 group-hover:scale-x-100 
                    origin-left group-hover:origin-center 
                    transition-transform duration-500 ease-out"
                            ></div> */}
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>

            {showMap && (
              <div className="bg-red-50 h-full rounded-xl border border-red-200">
                <DistrictMap
                  districtNo={districtCode}
                  seatNo={currentSeatNo}
                  districtName={districtName}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DistrictSeatsSection;
