import React from "react";
import PhotoEditor from "@/app/_components/PhotoEditor";
import Typography from "@/components/ui/typography";
import Link from "next/link";
import { Metadata } from "next";
import ShareSocMed from "@/app/_components/ShareSocMed";
import Footer from "@/app/_components/Footer";
import Logo from "@/app/_components/Logo";
import DonationSection from "@/app/_components/DonationSection";

interface Frame {
  id: string;
  url: string;
  name: string;
}

export const metadata: Metadata = {
  title: "Show Your Support for Telos – Change Your Profile Picture Today",
  description:
    "Join the Telos movement and showcase your support for the fastest, eco-friendly blockchain. Change your profile picture to the Telos frame and help spread the word about a scalable, decentralized future. Together, we build better!",
  openGraph: {
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://telos-frame.netlify.app"}/telos-seo-cover.jpg`,
        width: 1200,
        height: 630,
        alt: "Telos SEO Cover",
      },
    ],
  },
};

const App: React.FC = () => {
  return (
    <div
      className={
        "flex flex-col text-center items-center py-10 pb-14 max-w-[500px] mx-auto max-lg:px-4"
      }
    >
      <Link
        className={"mb-2"}
        target={"_blank"}
        href={"https://www.telos.net/"}
      >
        <Logo />
      </Link>
      <Typography variant="p-ui" className="py-4">
        One small change, one big statement. Update your profile with the Telos
        frame and show your support for the fastest, eco-friendly blockchain
        platform empowering global innovation!
        <br />
        <b>
          {" "}
          <Link
            className={"underline"}
            href={"https://telos.net/"}
            target={"_blank"}
          >
            Learn more about Telos
          </Link>{" "}
        </b>
      </Typography>
      <PhotoEditor />

      <ShareSocMed />
      <DonationSection />
      <Footer />
    </div>
  );
};

export default App;
