"use server";

import CONFIG from "@/config";

export const fetchSettings = async () => {
  const res = await fetch(`${CONFIG.backend_url}/setting`, {
    next: {
      revalidate: 60,
      tags: ["settings"],
    },
  });
  return await res.json();
};
