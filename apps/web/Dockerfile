ARG VERSION=22-alpine

FROM node:$VERSION AS builder

WORKDIR /app

ARG NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

ENV NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=$NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

COPY package*.json .

RUN npm install 

COPY . .

RUN npm run build


FROM node:$VERSION AS runner

ENV NODE_ENV=production

WORKDIR /app

COPY --from=builder /app/.next/standalone/apps/web .
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["node", "server.js"]