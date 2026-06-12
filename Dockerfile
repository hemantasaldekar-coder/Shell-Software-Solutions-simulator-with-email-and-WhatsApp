FROM node:22-alpine AS base

WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

COPY package*.json ./
RUN npm install

COPY . .

USER node
EXPOSE 3000

CMD ["npm", "run", "dev"]
