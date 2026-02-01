"use client";

import React from "react";
import { MdOutlineInbox } from "react-icons/md";

export default function EmptyCandidateMessage() {
  return (
    <section className="container mx-auto mt-2 px-4 lg:mt-4">
      <div className="rounded-2xl bg-white shadow-sm py-16 px-8 lg:py-24 lg:px-12 min-h-[280px] lg:min-h-[320px] flex flex-col items-center justify-center text-center">
        <div className="mb-6 text-gray-300">
          <MdOutlineInbox size={80} className="mx-auto" />
        </div>
        <p className="text-gray-600 text-lg lg:text-xl">
          আপনি কোনো আসন নির্বাচন করেননি
        </p>
      </div>
    </section>
  );
}
