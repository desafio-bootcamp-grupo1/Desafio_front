# Multi-stage Dockerfile for Vite React app

# ---- Builder stage ----
FROM node:20-alpine AS builder
WORKDIR /app

# Install deps first (better cache)
COPY package.json package-lock.json* ./
RUN npm ci --no-audit --no-fund

# Copy source
COPY . .

# Build with optional API base URL (override at build time)
ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}
RUN npm run build

# ---- Runtime stage (nginx) ----
FROM nginx:alpine AS runtime

# Copy built artifacts
COPY --from=builder /app/dist /usr/share/nginx/html

# Provide a default nginx config optimized for SPA routing and static caching
COPY <<'NGINX_CONF' /etc/nginx/conf.d/default.conf
server {
    listen 8080;
    server_name _;

    # Serve static files
    root /usr/share/nginx/html;
    index index.html;

    # Cache immutable assets aggressively
    location /assets/ {
        add_header Cache-Control "public, max-age=31536000, immutable";
        try_files $uri =404;
    }

    # SPA fallback for client-side routing
    location / {
        try_files $uri /index.html;
    }
}
NGINX_CONF

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]


