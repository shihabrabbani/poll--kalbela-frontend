import React from "react";
import Image, { StaticImageData } from "next/image";
import Counter from "@/components/common/Counter";

interface VoterInfoItem {
  logo: StaticImageData | string;
  title: string;
  total: number;
  percentage?: string;
  /** Solid background for the icon section (e.g. #E53935) */
  iconBg?: string;
  /** Pastel background for the text section (e.g. #FFEBEE) */
  textBg?: string;
  /** If true, do not apply white filter on the icon (e.g. for remote images) */
  logoRaw?: boolean;
}

const DEFAULT_ICON_BG = "#7C3AED";
const DEFAULT_TEXT_BG = "#F5F3FF";

const VoterInfoCard = ({ data }: { data: VoterInfoItem }) => {
  const iconBg = data.iconBg ?? DEFAULT_ICON_BG;
  const textBg = data.textBg ?? DEFAULT_TEXT_BG;

  return (
    <div
      className="flex min-h-0 w-full overflow-hidden rounded-xl text-gray-800"
      style={{ backgroundColor: textBg }}
    >
      {/* Icon section: solid color, white icon */}
      <div
        className="flex shrink-0 items-center justify-center p-3 sm:p-4"
        style={{
          backgroundColor: iconBg,
          minWidth: "4rem",
          width: "4rem",
        }}
      >
        <Image
          className={`h-7 w-7 sm:h-8 sm:w-8 object-contain ${
            data.logoRaw !== true ? "[filter:brightness(0)_invert(1)]" : ""
          }`}
          src={data?.logo}
          alt=""
          width={32}
          height={32}
        />
      </div>
      {/* Text section: pastel bg, title + number */}
      <div className="flex flex-1 flex-col justify-center gap-0.5 py-3 pr-4 pl-3 sm:py-4 sm:pr-5 sm:pl-4">
        <div className="text-sm font-semibold sm:text-base">{data?.title}</div>
        <div className="text-base font-semibold sm:text-lg">
          {Number.isNaN(data.total) ? (
            "চূড়ান্ত হয়নি"
          ) : (
            <Counter targetNumber={Number(data.total)} />
          )}
        </div>
        {data?.percentage != null && data.percentage !== "" && (
          <div className="text-xs font-medium opacity-90">
            {data.percentage}
          </div>
        )}
      </div>
    </div>
  );
};

export default VoterInfoCard;
