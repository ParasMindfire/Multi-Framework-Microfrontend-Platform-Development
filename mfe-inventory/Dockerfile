FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json pnpm-workspace.yaml ./
COPY common ./common
COPY mfe-inventory ./mfe-inventory

RUN npm install -g pnpm
RUN pnpm install

WORKDIR /app/mfe-inventory
RUN pnpm run build:docker

FROM nginx:alpine

COPY --from=builder /app/mfe-inventory/dist /usr/share/nginx/html
COPY mfe-inventory/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]