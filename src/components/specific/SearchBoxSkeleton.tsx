import React from "react";

const SearchBoxSkeleton = () => {
  return (
    <section className="mt-6 lg:mt-8">
      <div className="container mx-auto">
        <div className="bg-white rounded-2xl border border-gray-300 p-4 py-8">
          {/* Text line: পছন্দের প্রার্থীকে ভোট দিতে আসন নির্বাচন করুন */}
          <div className="h-6 lg:h-7 w-full max-w-md mb-4 lg:mb-5 bg-gray-200 rounded animate-gray-pulse" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            <div className="sm:col-span-1">
              <div className="h-10 bg-gray-200 rounded-lg animate-gray-pulse" />
            </div>
            <div className="sm:col-span-1">
              <div className="h-10 bg-gray-200 rounded-lg animate-gray-pulse" />
            </div>
            <div className="sm:col-span-2 lg:col-span-1 flex items-end gap-2">
              <div className="flex-1">
                <div className="h-10 bg-gray-200 rounded-lg animate-gray-pulse" />
              </div>
              <div className="h-10 w-20 bg-PurpleDark/30 rounded-lg animate-gray-pulse" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchBoxSkeleton;
