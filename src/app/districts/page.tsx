import React from "react";
import ZilaInfo3 from "@/components/specific/ZilaInfo";
import { generatePageMetadata } from "../config/metadata";
import { domain } from "../config/api/api";

export const metadata = generatePageMetadata(`${domain}/districts`);

const page = () => {
  return (
    <section>
      <div className="lg:mb-14 mb-10">
        <ZilaInfo3 className="lg:mt-14 mt-10" />
        {/* <StickyAd /> */}
      </div>
    </section>
  );
};

export default page;
