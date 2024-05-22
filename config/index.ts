const CONFIG = {
  backend_url: process.env.NEXT_PUBLIC_BACKEND_URL!,
  allowed_image_extensions: ["jpg", "jpeg", "webp", "png", "gif"],

  img_store_key: process.env.NEXT_PUBLIC_IMG_STORE_API_KEY!,
  img_store_origin: process.env.NEXT_PUBLIC_IMG_STORE_ORIGIN!,
  microsfot_clarity_id: process.env.NEXT_PUBLIC_MICROSOFT_CLARITY!,
};

export default CONFIG;
