FROM node:18-alpine AS base

FROM base AS deps

RUN apk add --no-cache libc6-compat

WORKDIR /app/ChatTao/Untitled-Project/backend/

COPY package.json package-lock.json ./

RUN npm config set registry 'https://registry.npmmirror.com/'

FROM base AS runner

EXPOSE 3003

CMD ["node", "server.js"]