const must = (name: string): string => {
  const value = process.env[name];
  if (!value) throw new Error(`Missing environment variable: ${name}`);
  return value;
};

const CONFIG = {
  backend_url: must("NEXT_PUBLIC_BACKEND_URL"),
  cv_url: `${must("NEXT_PUBLIC_BACKEND_URL")}/cv`,
  img_store_key: must("NEXT_PUBLIC_IMG_STORE_API_KEY"),
  img_store_origin: must("NEXT_PUBLIC_IMG_STORE_ORIGIN"),
  microsfot_clarity_id: must("NEXT_PUBLIC_MICROSOFT_CLARITY"),
  google_tag_id: must("NEXT_PUBLIC_GOOGLE_TAG_ID"),
  umami_website_id: must("NEXT_PUBLIC_UMAMI_WEBSITE_ID"),
  umami_api_endpoint: must("NEXT_PUBLIC_UMAMI_API_CLIENT_ENDPOINT"),
};

export default CONFIG;
