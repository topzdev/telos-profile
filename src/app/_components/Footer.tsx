"use client";
import React from "react";
import Typography from "@/components/ui/typography";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

type Props = {
  children?: React.ReactNode;
};

const Footer = (props: Props) => {
  return (
    <div>
      <Typography className={"pb-10 py-5"}>
        Made by{" "}
        <b>
          <Link href={"https://x.com/_christop_"} target={"_blank"}>
            Cryptomania
          </Link>
        </b>
      </Typography>

      <Typography className={"inline-flex items-center "}>
        <span className={"opacity-75"}> Change mode</span>
        <span className={"ml-2"}>
          <ThemeToggle />
        </span>
      </Typography>
    </div>
  );
};

export default Footer;
