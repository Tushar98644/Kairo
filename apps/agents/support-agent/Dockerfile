FROM oven/bun:1.0 AS build
WORKDIR /app

COPY package.json bun.lockb ./

RUN bun install --frozen-lockfile

COPY . .

RUN bun run build

FROM oven/bun:1.0-slim AS production
WORKDIR /app

COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json ./
COPY --from=build /app/bun.lockb ./

RUN bun install --production --frozen-lockfile

EXPOSE 5000

CMD ["bun", "dist/index.js"]
