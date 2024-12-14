"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Typography from "@/components/ui/typography";
import { useState } from "react";
import { Copy } from "lucide-react";

type Props = {};
const DonationSection = (props: Props) => {
  const [copied, setCopied] = useState(false);
  const address = "0xa579940e4afa5D3F3A731DbBC62c89ffA67CA8Cb";

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div
      className={
        "border border-border p-4 w-full flex items-center gap-x-2 rounded-md mt-5"
      }
    >
      <div className={"flex-shrink-0"}>
        <Image
          src={"/my-ca-qr.png"}
          alt={"Donate TLOS"}
          width={100}
          height={100}
        ></Image>
      </div>
      <div className={"flex-1 text-left min-w-0"}>
        <Typography>
          <b>I accept $TLOS donation :)</b>
        </Typography>
        <div className="flex items-center">
          <p className="text-slate-400 truncate font-mono">{address}</p>
          <Button
            variant="text"
            className="flex-shrink-0 text-slate-400 hover:text-white !px-1 !py-1 !h-auto"
            onClick={copyToClipboard}
          >
            <Copy className="h-4 w-4" />
            <span className="sr-only">Copy address</span>
          </Button>
        </div>

        <Typography variant={"p-ui"} className={"break-words"}></Typography>

        {copied && (
          <p className="text-green-500 text-sm mt-1">Copied to clipboard!</p>
        )}
      </div>
    </div>
  );
};
export default DonationSection;
