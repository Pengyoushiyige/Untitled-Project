FROM node:18-alpine AS base

FROM base AS deps

RUN apk add --no-cache libc6-compat

WORKDIR /app/ChatTao

COPY package.json package-lock.json ./

RUN npm config set registry 'https://registry.npmmirror.com/'


FROM base AS builder

RUN apk update && apk add --no-cache git

ENV OPENAI_API_KEY=""
ENV CODE=""

WORKDIR /app/ChatTao
COPY --from=deps /app/ChatTao/node_modules ./node_modules
COPY . .

RUN npm run build

FROM base AS runner


EXPOSE 3003

CMD ["node", "server.js"]