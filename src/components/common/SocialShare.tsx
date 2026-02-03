"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  FacebookShareButton,
  FacebookMessengerShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  FacebookMessengerIcon,
  LinkedinIcon,
  XIcon,
  WhatsappIcon,
} from "react-share";
import { MdContentCopy, MdCheck } from "react-icons/md";

interface SocialShareProps {
  url?: string;
  title?: string;
  description?: string;
  className?: string;
  iconSize?: number;
  round?: boolean;
}

const defaultTitle = "ত্রয়োদশ জাতীয় সংসদ নির্বাচন ২০২৬";
const defaultDescription = "কালবেলা অনলাইন জরিপ";

export default function SocialShare({
  url,
  title = defaultTitle,
  description = defaultDescription,
  className = "",
  iconSize = 28,
  round = true,
}: SocialShareProps) {
  const [shareUrl, setShareUrl] = useState(url ?? "");
  const [copied, setCopied] = useState(false);
  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && !url) {
      setShareUrl(window.location.href);
    } else if (url) {
      setShareUrl(url);
    }
  }, [url]);

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
    };
  }, []);

  const handleCopyLink = async () => {
    if (!shareUrl) return;
    try {
      await navigator.clipboard.writeText(shareUrl);
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
      setCopied(true);
      copyTimeoutRef.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  if (!shareUrl) return null;

  return (
    <div
      className={`flex items-center gap-2 flex-wrap ${className}`}
      aria-label="শেয়ার করুন"
    >
      <span className="text-base text-gray-700 font-semibold mr-3 hidden md:block">
        শেয়ার করুন
      </span>
      <FacebookShareButton url={shareUrl}>
        <FacebookIcon size={iconSize} round={round} />
      </FacebookShareButton>
      <FacebookMessengerShareButton url={shareUrl} appId="">
        <FacebookMessengerIcon size={iconSize} round={round} />
      </FacebookMessengerShareButton>
      <WhatsappShareButton url={shareUrl} title={title}>
        <WhatsappIcon size={iconSize} round={round} />
      </WhatsappShareButton>
      <TwitterShareButton url={shareUrl} title={title}>
        <XIcon size={iconSize} round={round} />
      </TwitterShareButton>
      <LinkedinShareButton url={shareUrl} title={title} summary={description}>
        <LinkedinIcon size={iconSize} round={round} />
      </LinkedinShareButton>
      <button
        type="button"
        onClick={handleCopyLink}
        className="inline-flex items-center justify-center rounded-full bg-green-800 hover:bg-green-700 transition-colors shrink-0 text-white"
        style={{ width: iconSize, height: iconSize }}
        title={copied ? "কপি হয়েছে" : "লিংক কপি করুন"}
        aria-label={copied ? "কপি হয়েছে" : "লিংক কপি করুন"}
      >
        {copied ? (
          <MdCheck size={iconSize * 0.55} className="fill-white" />
        ) : (
          <MdContentCopy size={iconSize * 0.55} className="fill-white" />
        )}
      </button>
    </div>
  );
}
