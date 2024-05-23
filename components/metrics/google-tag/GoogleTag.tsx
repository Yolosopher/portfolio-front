"use client";

import CONFIG from "@/config";
import googleTagScriptContent from "@/config/googleTag";
import Script from "next/script";

const GoogleTag = () => {
  return (
    <>
      <Script
        id="google-tag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: googleTagScriptContent,
        }}
      />
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${CONFIG.google_tag_id}`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        ></iframe>
      </noscript>
    </>
  );
};
export default GoogleTag;
