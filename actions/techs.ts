"use server";

import CONFIG from "@/config";

export const fetchTechs = async () => {
  const res = await fetch(`${CONFIG.backend_url}/tech`, {
    next: {
      revalidate: 0,
      tags: ["techs"],
    },
  });
  return await res.json();
};

export const fetchSingleTech = async (id: string) => {
  const res = await fetch(`${CONFIG.backend_url}/tech/${id}`, {
    next: {
      revalidate: 0,
      tags: ["tech", id],
    },
  });
  return await res.json();
};
