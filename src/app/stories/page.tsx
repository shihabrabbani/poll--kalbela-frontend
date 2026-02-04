import React from "react";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";
import NewsCard from "@/components/common/NewsCard";
import { fetchNewsList } from "@/apis";
import { NewsListResponse } from "@/types";
import StickyAd from "@/components/common/StickyAd";
import SectionTitle from "@/components/common/SectionTitle";
import { generatePageMetadata } from "../config/metadata";
import { domain } from "../config/api/api";

export const metadata = generatePageMetadata(`${domain}/stories`);

const NewsPart = async () => {
  let newsData: NewsListResponse | null = null;

  try {
    // Fetch more news items for the stories page (12 items)
    newsData = await fetchNewsList({ catId: 138, limit: 12 });
  } catch (error) {
    console.error("Error fetching news:", error);
  }

  return (
    <section>
      <div className="container mx-auto lg:mt-14 lg:mb-14 mt-10 mb-10">
        <div className="rounded-2xl bg-white">
          <SectionTitle headingLevel="h1">নির্বাচনের খবর</SectionTitle>
          <div className="grid grid-cols-12 lg:gap-6 gap-4 lg:p-x-6 p-4">
            {newsData?.data?.map((item, i) => (
              <div
                key={i}
                className="col-span-12 lg:col-span-3 flex flex-col justify-between"
              >
                <NewsCard item={item} headingLevel="h2" />
              </div>
            ))}
          </div>
        </div>
        {/* <div className="flex flex-col justify-center items-center mt-6">
          <Link
            href={`/stories`}
            className="flex items-center justify-center border hover:text-PurpleDark hover:bg-white hover:border-PurpleDark bg-PurpleDark px-4 py-1 rounded-lg text-white text-lg"
          >
            <div className="">আরও</div>
            <div>
              <IoIosArrowForward />
            </div>
          </Link>
        </div> */}
      </div>
      {/* <StickyAd /> */}
    </section>
  );
};

export default NewsPart;
