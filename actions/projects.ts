"use server";

import CONFIG from "@/config";

export const fetchProjects = async () => {
  const res = await fetch(`${CONFIG.backend_url}/project`, {
    next: {
      revalidate: 0,
      tags: ["projects"],
    },
  });
  return await res.json();
};

export const fetchSingleProject = async (id: string) => {
  const res = await fetch(`${CONFIG.backend_url}/project/${id}`, {
    next: {
      revalidate: 0,
      tags: ["project" + id],
    },
  });
  return await res.json();
};
