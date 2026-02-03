import React from "react";

const SeatCandidatesResultSkeleton = () => {
  return (
    <section className="container mx-auto mt-2 px-4 lg:mt-4">
      <div className="rounded-2xl bg-white border border-gray-200 overflow-hidden">
        {/* Section title – matches SectionTitle (lg:px-6 px-4 py-4) */}
        <div className="lg:px-6 px-4 py-4">
          <div className="h-6 w-64 sm:w-80 bg-gray-200 rounded animate-gray-pulse" />
        </div>
        {/* Candidate cards grid – matches SeatCandidatesResult layout */}
        <div className="grid grid-cols-1 gap-6 px-4 pb-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="grid grid-cols-1 sm:grid-cols-[auto_auto_1fr_180px_auto] lg:grid-cols-[auto_auto_1fr_220px_auto] gap-4 rounded-xl p-4 sm:p-5 items-center border border-gray-200 bg-gray-50/50"
            >
              {/* Col 1: image */}
              <div className="w-full sm:w-28 lg:w-36 aspect-square sm:aspect-auto sm:h-[120px] bg-gray-200 rounded-lg animate-gray-pulse justify-self-center sm:justify-self-start" />
              {/* Col 2: seat info, name, party */}
              <div className="space-y-2 min-w-0">
                <div className="h-3 w-32 bg-gray-200 rounded animate-gray-pulse" />
                <div className="h-5 w-40 bg-gray-200 rounded animate-gray-pulse" />
                <div className="h-4 w-36 bg-gray-200 rounded animate-gray-pulse" />
                <div className="h-4 w-28 bg-gray-200 rounded animate-gray-pulse" />
              </div>
              {/* Col 3: vote badge – empty in skeleton */}
              <div className="hidden sm:block min-w-0" />
              {/* Col 4: result box – logo + ফলাফল + count/% + progress bar */}
              <div className="flex items-stretch gap-3 rounded-xl border-2 border-PurpleDark/20 bg-PurpleLight/50 p-4 sm:p-5 min-w-0">
                <div className="w-12 h-12 shrink-0 rounded-xl bg-gray-200 animate-gray-pulse self-center" />
                <div className="flex-1 min-w-0 space-y-2">
                  <div className="h-3 w-12 bg-gray-200 rounded animate-gray-pulse" />
                  <div className="flex justify-between gap-2">
                    <div className="h-4 w-14 bg-gray-200 rounded animate-gray-pulse" />
                    <div className="h-4 w-10 bg-gray-200 rounded animate-gray-pulse" />
                  </div>
                  <div className="h-3 w-full bg-gray-200 rounded-full animate-gray-pulse" />
                </div>
              </div>
              {/* Col 5: vote button */}
              <div className="flex justify-center sm:justify-end">
                <div className="h-10 w-24 bg-gray-200 rounded-lg animate-gray-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SeatCandidatesResultSkeleton;
