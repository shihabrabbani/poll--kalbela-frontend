import React from "react";

const SeatCandidatesResultSkeleton = () => {
  return (
    <section className="container mx-auto mt-2 px-4 lg:mt-4">
      <div className="rounded-2xl bg-white border border-gray-200 overflow-visible">
        {/* Section title – matches SectionTitle with seat name • আসন নং + three-dot action */}
        <div className="lg:px-6 px-4 py-4 flex gap-2 items-center justify-between flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            <div className="h-6 w-40 sm:w-52 bg-gray-200 rounded animate-gray-pulse" />
            <span className="text-gray-400 font-light">•</span>
            <div className="h-6 w-24 bg-gray-200 rounded animate-gray-pulse" />
          </div>
          <div className="h-9 w-9 rounded-full bg-gray-200 animate-gray-pulse shrink-0" />
        </div>
        {/* Candidate cards – matches SeatCandidatesResult flex card layout */}
        <div className="grid grid-cols-1 gap-4 px-4 pb-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex flex-wrap items-stretch gap-4 rounded-xl border border-gray-200 bg-white p-4 sm:p-5"
            >
              {/* Radio indicator */}
              <div className="flex items-center shrink-0">
                <div className="h-5 w-5 shrink-0 rounded-full border-2 border-gray-300 bg-transparent" />
              </div>
              {/* Circular candidate photo */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-full bg-gray-100 border-2 border-gray-200 animate-gray-pulse" />
              {/* Main content: name, constituency, party, progress bar area */}
              <div className="flex-1 min-w-0 space-y-1">
                <div className="h-5 w-36 sm:w-44 bg-gray-200 rounded animate-gray-pulse" />
                <div className="h-4 w-28 bg-gray-200 rounded animate-gray-pulse" />
                <div className="h-4 w-32 bg-gray-200 rounded animate-gray-pulse" />
                <div className="pt-2 space-y-1 min-h-[52px]">
                  <div className="flex justify-end">
                    <div className="h-4 w-10 bg-gray-200 rounded animate-gray-pulse" />
                  </div>
                  <div className="h-2.5 w-full bg-gray-200 rounded-full overflow-hidden animate-gray-pulse" />
                </div>
              </div>
              {/* Party symbol – circular */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-full bg-white border-2 border-gray-200 animate-gray-pulse self-start" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SeatCandidatesResultSkeleton;
