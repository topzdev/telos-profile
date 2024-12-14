"use client";
import Image from "next/image";
import React from "react";
import { useTheme } from "next-themes";

type Props = {};
const Logo = (props: Props) => {
  const { theme } = useTheme();
  return (
    <>
      {theme === "light" ? (
        <Image
          src="/logo-dark.png"
          alt="Telos Logo"
          width={150}
          height={50}
          priority
        />
      ) : (
        <Image
          src="/logo-light.png"
          alt="Telos Logo"
          width={150}
          height={50}
          priority
        />
      )}
    </>
  );
};
export default Logo;
