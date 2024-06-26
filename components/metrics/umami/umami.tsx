"use client";

import CONFIG from "@/config";
import Script from "next/script";

const Umami = () => {
  return (
    <Script
      defer
      src={`${CONFIG.umami_api_endpoint}/script.js`}
      data-website-id={CONFIG.umami_website_id}
    />
  );
};
export default Umami;
