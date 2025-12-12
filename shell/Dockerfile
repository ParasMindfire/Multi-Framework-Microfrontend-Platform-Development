FROM node:20-alpine AS builder

WORKDIR /app

RUN apk add --no-cache git

# Copy root package files and common package
COPY package.json pnpm-workspace.yaml ./
COPY common ./common

# Copy shell app
COPY shell ./shell

# Install dependencies
RUN npm install -g pnpm
RUN pnpm install

# Accept build-time env
ARG VITE_DASHBOARD_URL
ARG VITE_INVENTORY_URL
ARG VITE_ANALYTICS_URL
ARG VITE_API_URL

# Pass to Vite
ENV VITE_DASHBOARD_URL=$VITE_DASHBOARD_URL
ENV VITE_INVENTORY_URL=$VITE_INVENTORY_URL
ENV VITE_ANALYTICS_URL=$VITE_ANALYTICS_URL
ENV VITE_API_URL=$VITE_API_U

# Build
WORKDIR /app/shell
RUN pnpm run build:docker

# Production image
FROM nginx:alpine

COPY --from=builder /app/shell/dist /usr/share/nginx/html
COPY shell/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]