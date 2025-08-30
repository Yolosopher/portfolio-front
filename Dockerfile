FROM node:20

# Install build dependencies
RUN apt-get update && apt-get install -y \
  python3 make g++ \
  libvips-dev \
  libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev \
  && rm -rf /var/lib/apt/lists/*

# apt-get update && apt-get install -y python3 make g++ libvips-dev libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy package files
COPY package*.json ./

RUN npm install --force

# Copy source code
COPY . .
# 👇 Ensure NEXT_PUBLIC_* envs are available during build

# Create .env file inside container
RUN echo "NEXT_PUBLIC_BACKEND_URL=${NEXT_PUBLIC_BACKEND_URL}" >> .env && \
  echo "NEXT_PUBLIC_IMG_STORE_API_KEY=${NEXT_PUBLIC_IMG_STORE_API_KEY}" >> .env && \
  echo "NEXT_PUBLIC_IMG_STORE_ORIGIN=${NEXT_PUBLIC_IMG_STORE_ORIGIN}" >> .env && \
  echo "NEXT_PUBLIC_MICROSOFT_CLARITY=${NEXT_PUBLIC_MICROSOFT_CLARITY}" >> .env && \
  echo "NEXT_PUBLIC_GOOGLE_TAG_ID=${NEXT_PUBLIC_GOOGLE_TAG_ID}" >> .env && \
  echo "NEXT_PUBLIC_UMAMI_WEBSITE_ID=${NEXT_PUBLIC_UMAMI_WEBSITE_ID}" >> .env && \
  echo "NEXT_PUBLIC_UMAMI_API_CLIENT_ENDPOINT=${NEXT_PUBLIC_UMAMI_API_CLIENT_ENDPOINT}" >> .env.production


# Build Next.js
RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "start"]
