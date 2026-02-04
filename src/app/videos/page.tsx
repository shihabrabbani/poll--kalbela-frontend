import React from "react";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";
import VideoCard from "@/components/common/VideoCard";
import SectionTitle from "@/components/common/SectionTitle";
import StickyAd from "@/components/common/StickyAd";
import { fetchElectionVideos } from "@/apis";
import { formatBnDate } from "@/assets/lib/formatBnDate";
import { generatePageMetadata } from "../config/metadata";
import { domain } from "../config/api/api";

export const metadata = generatePageMetadata(`${domain}/videos`);

interface VideoItem {
  id: number;
  video_title: string;
  cover_photo: string;
  cover_photo_from_server: string;
  entry_time: string;
  url: string;
  publish?: number;
}

const VideosPage = async () => {
  let videoData: VideoItem[] = [];

  try {
    videoData = await fetchElectionVideos();
  } catch (error) {
    console.error("Error fetching video data:", error);
  }

  // Transform API data to match VideoCard format
  const transformedVideos = videoData
    .filter((video) => video.publish === 1)
    .map((video) => {
      // Use consistent date formatting to prevent hydration errors
      const formattedDate = formatBnDate(video.entry_time);

      let coverPhotoUrl = "";
      if (video.cover_photo_from_server) {
        try {
          coverPhotoUrl = decodeURIComponent(video.cover_photo_from_server);
        } catch (e) {
          coverPhotoUrl = video.cover_photo_from_server;
        }
      }

      return {
        title: video.video_title,
        logo: coverPhotoUrl,
        date: formattedDate,
        url: video.url,
      };
    });

  return (
    <section>
      <div className="container mx-auto lg:mt-14 lg:mb-14 mt-10 mb-10">
        <div className="rounded-2xl bg-white">
          <SectionTitle headingLevel="h1">নির্বাচনের ভিডিও</SectionTitle>
          <div className="grid grid-cols-12 lg:gap-6 gap-4 lg:p-x-6 px-4 py-4">
            {transformedVideos.length > 0 ? (
              transformedVideos.map((item, i) => (
                <Link
                  key={i}
                  href={`https://www.kalbela.com${item.url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="col-span-12 lg:col-span-3 border group rounded overflow-hidden flex flex-col justify-between pt-4 px-4 hover:border-PurpleDark transition-colors"
                >
                  <VideoCard item={item} headingLevel="h2" />
                </Link>
              ))
            ) : (
              <div className="col-span-12 text-center py-8 text-gray-500">
                কোন ভিডিও পাওয়া যায়নি
              </div>
            )}
          </div>
        </div>
        {/* {transformedVideos.length > 0 && (
          <div className="flex flex-col justify-center items-center mt-6">
            <Link
              href={`/videos/videosPage`}
              className="flex items-center justify-center border hover:text-PurpleDark hover:bg-white hover:border-PurpleDark bg-PurpleDark px-4 py-1 rounded text-white text-lg"
            >
              <div className="">আরও</div>
              <div>
                <IoIosArrowForward />
              </div>
            </Link>
          </div>
        )} */}
      </div>
      {/* <StickyAd /> */}
    </section>
  );
};

export default VideosPage;
