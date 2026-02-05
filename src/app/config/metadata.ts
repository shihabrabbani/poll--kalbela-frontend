import type { Metadata } from "next";
import { domain } from "./api/api";

// Single source of truth for metadata
export const baseMetadata = {
  title:
    "কালবেলা নির্বাচনী জরিপ ২০২৬ | আপনার পছন্দের প্রার্থীকে সমর্থন করুন",
  description:
    "কালবেলার আয়োজনে ত্রয়োদশ জাতীয় সংসদ নির্বাচন ২০২৬ উপলক্ষে পাঠকদের আগ্রহ ও পছন্দের প্রতিফলন তুলে ধরতে এই নির্বাচনী জরিপ। আপনার পছন্দের প্রার্থীকে সমর্থন করতে ক্লিক করুন।",
  keywords: [
    "কালবেলা নির্বাচনী জরিপ",
    "কালবেলা জরিপ ২০২৬",
    "নির্বাচনী জরিপ ২০২৬",
    "ত্রয়োদশ জাতীয় সংসদ নির্বাচন ২০২৬",
    "নির্বাচন ২০২৬",
    "জাতীয় সংসদ নির্বাচন ২০২৬",
    "আপনার পছন্দের প্রার্থী",
    "পছন্দের প্রার্থী জরিপ",
    "অনলাইন নির্বাচন জরিপ",
    "জনমত জরিপ বাংলাদেশ",
    "পাঠক মতামত জরিপ",
    "নির্বাচন জরিপ বাংলাদেশ",
    "Kalbela Election Poll 2026",
    "Bangladesh Election Survey 2026",
  ],
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
    keywords: baseMetadata.keywords,
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
