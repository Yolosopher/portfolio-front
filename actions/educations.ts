"use server";

import CONFIG from "@/config";

export const fetchEducations = async () => {
  const res = await fetch(`${CONFIG.backend_url}/education`, {
    next: {
      revalidate: 0,
      tags: ["educations"],
    },
  });
  return await res.json();
};

export const fetchSingleEducation = async (id: string) => {
  const res = await fetch(`${CONFIG.backend_url}/education/${id}`, {
    next: {
      revalidate: 0,
      tags: ["education", id],
    },
  });
  return await res.json();
};
