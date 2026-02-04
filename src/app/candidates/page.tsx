import React from "react";
import FinalCandidatesPage from "@/components/specific/FinalCandidatesPage";
import { fetchVoteCountingAsCandidates } from "@/apis";
import { generatePageMetadata } from "../config/metadata";
import { domain } from "../config/api/api";

export const metadata = generatePageMetadata(`${domain}/final-candidates`);

const CandidatePage = async () => {
  const candidatesData = await fetchVoteCountingAsCandidates({
    revalidateSeconds: 30,
  });

  return (
    <section>
      <FinalCandidatesPage candidatesData={candidatesData} />
    </section>
  );
};

export default CandidatePage;
