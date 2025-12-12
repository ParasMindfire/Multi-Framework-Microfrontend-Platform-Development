# server/Dockerfile
FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache git

COPY server/package*.json ./

RUN npm install --production

COPY server/ ./

EXPOSE 5000

HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget --quiet --tries=1 --spider http://localhost:5000/api/flights || exit 1

CMD ["node", "src/server.js"]