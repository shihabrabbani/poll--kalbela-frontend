import React from "react";
import SeatInfo3 from "@/components/specific/SeatInfo";
import { generatePageMetadata } from "../config/metadata";
import { domain } from "../config/api/api";

export const metadata = generatePageMetadata(`${domain}/seats`);

const page = () => {
  return (
    <section>
      <div className="lg:mb-14 mb-10">
        <SeatInfo3 className="lg:mt-14 mt-10" />
        {/* <StickyAd /> */}
      </div>
    </section>
  );
};

export default page;
