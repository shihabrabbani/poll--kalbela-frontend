import React from "react";
import HeavyweightCandidatesPage from "@/components/specific/HeavyweightCandidatesPage";
import { ElectionSeatResponse } from "@/types";
import { generatePageMetadata } from "../config/metadata";
import { domain } from "../config/api/api";
import { fetchVoteCountingAsCandidates } from "@/apis";

export const metadata = generatePageMetadata(
  `${domain}/heavyweight-candidates`
);

const HeavyWeightPage = async () => {
  const candidatesData: ElectionSeatResponse =
    await fetchVoteCountingAsCandidates({ revalidateSeconds: 30 });

  return (
    <section>
      <HeavyweightCandidatesPage candidatesData={candidatesData} />
    </section>
  );
};

export default HeavyWeightPage;
