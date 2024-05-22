"use client";

import clarityScriptContent from "@/config/clarity";
import Script from "next/script";
const MicrosoftClarity = () => {
  return (
    <Script
      id="microsoft-clarity-init"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: clarityScriptContent,
      }}
    />
  );
};

export default MicrosoftClarity;
