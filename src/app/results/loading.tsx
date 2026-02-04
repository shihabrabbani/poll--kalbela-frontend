import React from "react";
import PreviousDataPartSkeleton from "@/components/specific/PreviousDataPartSkeleton";
import LineChartSkeleton from "@/components/common/LineChartSkeleton";
import PreviousResultMapSkeleton from "@/components/common/PreviousResultMapSkeleton";

const ResultsPageSkeleton = () => {
  return (
    <div className="lg:mb-14 mb-10">
      <PreviousDataPartSkeleton />
      <div className="lg:mt-14 mt-10">
        <LineChartSkeleton />
      </div>
      <div className="mt-10 lg:mt-14">
        <PreviousResultMapSkeleton />
      </div>
      {/* StickyAd - Usually a small ad component, can be omitted or shown as placeholder */}
    </div>
  );
};

export default ResultsPageSkeleton;
