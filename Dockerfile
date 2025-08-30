# =========================
# Stage 1: Build
# =========================
FROM node:20 AS builder

# Install build dependencies
RUN apt-get update && \
    apt-get install -y python3 make g++ libvips-dev libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --force

# Copy source code
COPY . .

# Build-time environment variables
ARG NEXT_PUBLIC_BACKEND_URL
ARG NEXT_PUBLIC_IMG_STORE_API_KEY
ARG NEXT_PUBLIC_IMG_STORE_ORIGIN
ARG NEXT_PUBLIC_MICROSOFT_CLARITY
ARG NEXT_PUBLIC_GOOGLE_TAG_ID
ARG NEXT_PUBLIC_UMAMI_WEBSITE_ID
ARG NEXT_PUBLIC_UMAMI_API_CLIENT_ENDPOINT

# Create .env file for runtime
RUN echo "NEXT_PUBLIC_BACKEND_URL=${NEXT_PUBLIC_BACKEND_URL}" >> .env && \
    echo "NEXT_PUBLIC_IMG_STORE_API_KEY=${NEXT_PUBLIC_IMG_STORE_API_KEY}" >> .env && \
    echo "NEXT_PUBLIC_IMG_STORE_ORIGIN=${NEXT_PUBLIC_IMG_STORE_ORIGIN}" >> .env && \
    echo "NEXT_PUBLIC_MICROSOFT_CLARITY=${NEXT_PUBLIC_MICROSOFT_CLARITY}" >> .env && \
    echo "NEXT_PUBLIC_GOOGLE_TAG_ID=${NEXT_PUBLIC_GOOGLE_TAG_ID}" >> .env && \
    echo "NEXT_PUBLIC_UMAMI_WEBSITE_ID=${NEXT_PUBLIC_UMAMI_WEBSITE_ID}" >> .env && \
    echo "NEXT_PUBLIC_UMAMI_API_CLIENT_ENDPOINT=${NEXT_PUBLIC_UMAMI_API_CLIENT_ENDPOINT}" >> .env

# Build Next.js
RUN npm run build

# =========================
# Stage 2: Production
# =========================
FROM node:20-slim AS production

WORKDIR /app

# Copy built files and node_modules from builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/.env ./.env

# Expose port and start app
EXPOSE 3000
CMD ["npm", "run", "start"]
