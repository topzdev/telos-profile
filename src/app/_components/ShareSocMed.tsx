"use client";
import React from "react";
import Typography from "@/components/ui/typography";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookMessengerIcon,
  FacebookMessengerShareButton,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  RedditIcon,
  RedditShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  XIcon,
} from "react-share";

type Props = {
  children?: React.ReactNode;
};

const PAGE_URL = process.env.NEXT_PUBLIC_WEBSITE_URL || "";
const ShareSocMed = (props: Props) => {
  return (
    <div className="flex flex-col text-center justify-center mt-5">
      <Typography className={"px-2 py-2 h-full"} variant={"small"}>
        Additionally, help us amplify this cause by sharing it across your
        social media platforms.
      </Typography>
      <div
        className={
          "flex items-center flex-wrap justify-center mx-auto text-inherit"
        }
      >
        <FacebookShareButton url={PAGE_URL}>
          <FacebookIcon
            className={"[&>path]:fill-foreground [&>rect]:fill-transparent"}
            size={50}
          />
        </FacebookShareButton>
        <TwitterShareButton url={PAGE_URL}>
          <XIcon
            size={50}
            className={"[&>path]:fill-foreground [&>rect]:fill-transparent"}
          />
        </TwitterShareButton>
        <RedditShareButton url={PAGE_URL}>
          <RedditIcon
            size={50}
            className={"[&>path]:fill-foreground [&>rect]:fill-transparent"}
          />
        </RedditShareButton>
        <TelegramShareButton url={PAGE_URL}>
          <TelegramIcon
            size={50}
            className={"[&>path]:fill-foreground [&>rect]:fill-transparent"}
          />
        </TelegramShareButton>
        <WhatsappShareButton url={PAGE_URL}>
          <WhatsappIcon
            size={50}
            className={"[&>path]:fill-foreground [&>rect]:fill-transparent"}
          />
        </WhatsappShareButton>
        <LinkedinShareButton url={PAGE_URL}>
          <LinkedinIcon
            size={50}
            className={"[&>path]:fill-foreground [&>rect]:fill-transparent"}
          />
        </LinkedinShareButton>
        <EmailShareButton url={PAGE_URL}>
          <EmailIcon
            size={50}
            className={"[&>path]:fill-foreground [&>rect]:fill-transparent"}
          />
        </EmailShareButton>
      </div>
    </div>
  );
};

export default ShareSocMed;
