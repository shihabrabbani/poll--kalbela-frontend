import type { Metadata } from "next";
import { domain } from "./api/api";

// Single source of truth for metadata
export const baseMetadata = {
  title: "নির্বাচনের খবর ২০২৬ | Election News 2026 Bangladesh | কালবেলা",
  description:
    "নির্বাচন ২০২৬ ঘিরে দেশের সর্বশেষ ও নির্ভরযোগ্য খবর পড়ুন কালবেলায়। আসনভিত্তিক ও জেলাভিত্তিক নির্বাচন সংবাদ, প্রার্থীর তালিকা, ভোটের আপডেট, বিশ্লেষণ, ছবি ও ভিডিও প্রতিবেদন এক জায়গায়।",
  image: "https://kalbela.ideahubbd.com/EC-02-(1).jpg",
  twitterSite: "@kalbeladigital",
  twitterTitle: "কালবেলা",
  siteName: "Kalbela Election",
  locale: "bn_BD",
  icon: "/favicon.png",
};

/**
 * Generate metadata for a page with a custom URL
 * Everything stays the same as base metadata except the URL
 */
export function generatePageMetadata(url: string): Metadata {
  return {
    title: baseMetadata.title,
    description: baseMetadata.description,
    icons: {
      icon: baseMetadata.icon,
    },
    alternates: {
      canonical: url,
      languages: {
        "bn-BD": url,
        "x-default": url,
      },
    },
    openGraph: {
      title: baseMetadata.title,
      description: baseMetadata.description,
      url: url,
      type: "website",
      locale: baseMetadata.locale,
      siteName: baseMetadata.siteName,
      images: [
        {
          url: baseMetadata.image,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: baseMetadata.twitterSite,
      title: baseMetadata.twitterTitle,
      description: baseMetadata.description,
      images: [baseMetadata.image],
    },
  };
}
