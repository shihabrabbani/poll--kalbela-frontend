"use client";
import React from "react";
import mapData from "@/assets/data/map/mapData";
import { cn } from "@/assets/lib/cn";
import Link from "next/link";
import { toBanglaNum } from "@/assets/utils";

function DistrictMap({ seatNo, districtNo, districtName }) {
  const activeSeatNo = seatNo ? String(seatNo) : null;

  const currentDistrict = seatNo
    ? mapData.find((district) =>
        district?.containedSeats?.some((s) => String(s) === String(seatNo))
      )
    : districtNo
    ? mapData.find(
        (district) => String(district?.districtCode) === String(districtNo)
      )
    : null;

  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <svg
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
        viewBox={
          currentDistrict?.district === "dhaka"
            ? "0 0 624 385.9"
            : currentDistrict?.district === "kurigram" ||
              currentDistrict?.district === "bhola" ||
              currentDistrict?.district === "noakhali" ||
              currentDistrict?.district === "pirojpur" ||
              currentDistrict?.district === "feni"
            ? "0 0 300 600"
            : "0 0 300 430"
        }
        style={{
          enableBackground: `
                        ${
                          currentDistrict?.district === "dhaka"
                            ? "new 0 0 624 385.9"
                            : currentDistrict?.district === "kurigram" ||
                              currentDistrict?.district === "bhola" ||
                              currentDistrict?.district === "noakhali" ||
                              currentDistrict?.district === "pirojpur" ||
                              currentDistrict?.district === "feni"
                            ? "new 0 0 300 600"
                            : "new 0 0 300 430"
                        }
                        `,
          width: "300px",
          height: "300px",
        }}
        xmlSpace="preserve"
      >
        {currentDistrict?.data?.map((seat) => {
          //For Dhaka District
          if (parseInt(seat?.seatNo) >= 174 && parseInt(seat?.seatNo) <= 193) {
            return (
              <>
                <Link key={seat?.seatNo} href={`/pools/seat-${seat?.seatNo}`}>
                  <polyline
                    id={`seat_${seat?.seatNo}`}
                    className={cn(
                      "fill-red-300 stroke-white stroke-1 hover:fill-PurpleDark transition-all duration-1000",
                      {
                        "fill-PurpleDark":
                          activeSeatNo &&
                          String(activeSeatNo) === String(seat?.seatNo),
                      }
                    )}
                    style={{ strokeMiterlimit: 10 }}
                    points={seat?.points}
                  />
                  <text
                    transform={seat?.transform}
                    className={cn(
                      "fill-black text-base font-bold pointer-events-none",
                      {
                        "text-[6px]":
                          parseInt(seat?.seatNo) > 176 &&
                          parseInt(seat?.seatNo) < 192,
                      }
                    )}
                  >
                    {toBanglaNum(seat?.text)}
                  </text>
                </Link>
              </>
            );
          } else {
            //All except Dhaka District
            return (
              <Link href={`/pools/seat-${seat.seatNo}`} key={seat?.seatNo}>
                {(seat?.seatNo === "222") | "223" | "110" && (
                  <path
                    id={`seat_${seat?.seatNo}`}
                    style={{ strokeMiterlimit: 10 }}
                    d={seat?.points}
                    className={cn(
                      "fill-red-300 stroke-white stroke-1 hover:fill-PurpleDark transition-all duration-1000",
                      {
                        "fill-PurpleDark":
                          activeSeatNo &&
                          String(activeSeatNo) === String(seat?.seatNo),
                      }
                    )}
                  />
                )}
                <polyline
                  id={`seat_${seat?.seatNo}`}
                  className={cn(
                    "fill-red-300 stroke-white stroke-1 hover:fill-PurpleDark transition-all duration-1000",
                    {
                      "fill-PurpleDark":
                        activeSeatNo &&
                        String(activeSeatNo) === String(seat?.seatNo),
                    }
                  )}
                  style={{ strokeMiterlimit: 10 }}
                  points={seat?.points}
                />
                <text
                  transform={seat?.transform}
                  className={cn(
                    "fill-black text-base font-bold pointer-events-none",
                    {
                      "text-[8px]":
                        parseInt(seat?.seatNo) > 176 &&
                        parseInt(seat?.seatNo) < 192,
                    }
                  )}
                >
                  {toBanglaNum(seat?.text)}
                </text>
              </Link>
            );
          }
        })}

        {/* Zoom section for Dhaka District start here */}
        {currentDistrict?.district === "dhaka" && (
          <>
            <rect
              style={{ strokeMiterlimit: 10 }}
              x="187.8"
              y="91.5"
              className="fill-none stroke-red-600 stroke-2"
              width="105.7"
              height="147.2"
            />
            {currentDistrict?.zoom.map((seat) => (
              <g key={seat.seatNo}>
                <Link href={`/pools/seat-${seat?.seatNo}`}>
                  {console.log(seatNo === seat?.seatNo, "Matches")}
                  <polyline
                    id={`seat_${seat?.seatNo}`}
                    className={cn(
                      "fill-red-300 stroke-white stroke-1 hover:fill-PurpleDark transition-all duration-1000",
                      activeSeatNo &&
                        String(activeSeatNo) === String(seat?.seatNo) &&
                        "fill-PurpleDark"
                    )}
                    points={seat?.points}
                  />
                  <g>
                    <text
                      transform={seat?.transform}
                      className="fill-black text-base font-bold pointer-events-none"
                    >
                      {toBanglaNum(seat?.text)}
                    </text>
                  </g>
                </Link>
              </g>
            ))}
            <line
              style={{ strokeMiterlimit: 10 }}
              className="fill-none stroke-red-600 stroke-2"
              x1="292.6"
              y1="149.7"
              x2="354.5"
              y2="149.9"
            ></line>
          </>
        )}
      </svg>
      <div className="py-2">
        <p className="text-center text-lg font-bold">{districtName} জেলা</p>{" "}
      </div>
    </div>
  );
}

export default DistrictMap;
