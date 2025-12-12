FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json pnpm-workspace.yaml ./
COPY common ./common
COPY mfe-dashboard ./mfe-dashboard

RUN npm install -g pnpm
RUN pnpm install

WORKDIR /app/mfe-dashboard
RUN pnpm run build:docker

FROM nginx:alpine

COPY --from=builder /app/mfe-dashboard/dist /usr/share/nginx/html
COPY mfe-dashboard/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]