const CONFIG = {
  backend_url: process.env.NEXT_PUBLIC_BACKEND_URL!,
  allowed_image_extensions: ["jpg", "jpeg", "webp", "png", "gif"],

  img_store_key: process.env.NEXT_PUBLIC_IMG_STORE_API_KEY!,
  img_store_origin: process.env.NEXT_PUBLIC_IMG_STORE_ORIGIN!,

  microsfot_clarity_id: process.env.NEXT_PUBLIC_MICROSOFT_CLARITY!,
  google_tag_id: process.env.NEXT_PUBLIC_GOOGLE_TAG_ID!,

  umami_website_id: process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID!,
  umami_api_key: process.env.NEXT_PUBLIC_UMAMI_API_KEY!,
  umami_api_endpoint: process.env.NEXT_PUBLIC_UMAMI_API_CLIENT_ENDPOINT!,
};

export default CONFIG;
