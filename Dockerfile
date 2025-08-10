FROM node:24.5.0-alpine AS builder

RUN mkdir /build
WORKDIR /build
RUN apk add --update --no-cache python3 openssl zlib libgcc musl-dev make gcc g++
RUN ln -sf /usr/bin/python3 /usr/bin/python

COPY . .
ENV DATABASE_URL=file:persist/data.db
RUN npm i
RUN npx prisma generate && npm run build
RUN npx prisma migrate deploy
RUN npm prune --production

FROM node:24.5.0-alpine

RUN mkdir /app
WORKDIR /app
RUN apk add --update --no-cache openssl zib libgcc musl

COPY --from=builder /build .
ENV DATABASE_URL=file:persist/data.db

CMD ["npm", "run", "start"]
