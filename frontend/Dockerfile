# syntax=docker/dockerfile:1

# ────────────────────────────────────────────────────────────
#  Frontend – React + Vite (served via Nginx)
# ────────────────────────────────────────────────────────────

# ── Build stage ─────────────────────────────────────────────
FROM node:22-alpine AS build

WORKDIR /app

# Copy lock files first for better layer caching
COPY package.json pnpm-lock.yaml ./

# Install pnpm and dependencies
RUN corepack enable pnpm && \
    pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build the production bundle
# Pass in the API URL at build time
ARG VITE_API_URL=http://localhost:3000
ENV VITE_API_URL=${VITE_API_URL}
RUN pnpm run build

# ── Final stage – Nginx to serve static assets ──────────────
FROM nginx:alpine AS final

# Copy production build from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Custom Nginx config to handle React Router (SPA fallback)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
