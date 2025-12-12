FROM node:20-alpine AS builder

WORKDIR /app

# Copy root package files and common package
COPY package.json pnpm-workspace.yaml ./
COPY packages/common ./packages/common

# Copy shell app
COPY shell ./shell

# Install dependencies
RUN npm install -g pnpm
RUN pnpm install

# Build
WORKDIR /app/shell
RUN pnpm run build

# Production image
FROM nginx:alpine

COPY --from=builder /app/shell/dist /usr/share/nginx/html
COPY shell/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]