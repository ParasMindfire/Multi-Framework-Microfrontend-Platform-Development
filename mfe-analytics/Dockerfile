FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json pnpm-workspace.yaml ./
COPY common ./common
COPY mfe-analytics ./mfe-analytics

RUN npm install -g pnpm
RUN pnpm install

WORKDIR /app/mfe-analytics
RUN pnpm run build:docker

FROM nginx:alpine

COPY --from=builder /app/mfe-analytics/dist /usr/share/nginx/html
COPY mfe-analytics/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]