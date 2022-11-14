FROM node:19-alpine3.15 AS builder

WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED 1
COPY . .

RUN npm ci
RUN npm run build

FROM node:19-alpine3.15 as runner

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

COPY --from=builder /app/next.config.js next.config.js
COPY --from=builder /app/.next .next
COPY --from=builder /app/.env .env
COPY --from=builder /app/public public
COPY --from=builder /app/node_modules node_modules
COPY --from=builder /app/package.json package.json
COPY --from=builder /app/package-lock.json package-lock.json
CMD ["npm", "start"]