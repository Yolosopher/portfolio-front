"use server";

import CONFIG from "@/config";

export const fetchExperiences = async () => {
  const res = await fetch(`${CONFIG.backend_url}/experience`, {
    next: {
      revalidate: 0,
      tags: ["experiences"],
    },
  });
  return await res.json();
};

export const fetchSingleExperience = async (id: string) => {
  const res = await fetch(`${CONFIG.backend_url}/experience/${id}`, {
    next: {
      revalidate: 0,
      tags: ["experience", id],
    },
  });
  return await res.json();
};
