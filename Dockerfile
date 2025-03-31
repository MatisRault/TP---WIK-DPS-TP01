FROM node:iron-alpine3.20

WORKDIR /app

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

COPY package.json package-lock.json ./

RUN npm ci --production && \
    npm ci && \
    npm cache clean --force

COPY tsconfig.json ./
COPY .env ./
COPY src/ ./src/

RUN npm run build && \
    npm prune --production && \
    chown -R appuser:appgroup /app

EXPOSE 8082

USER appuser

CMD ["node", "dist/index.js"]