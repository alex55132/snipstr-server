FROM node:18-alpine3.18

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

ARG BASE_PORT=3000
ARG DATABASE_HOST="postgres"
ARG DATABASE_PORT=5432
ARG DATABASE_URL="postgresql://snipstr:EXAMPLEPASSWORD@${DATABASE_HOST}}:${DATABASE_PORT}/snipstr?schema=public"

ENV DATABASE_URL=${DATABASE_URL}
ENV ENCRYPTION_DEFAULT_KEY=abcdefghijklmnopqrstuvwxyz
ENV BASE_URL=http://localhost:3000
ENV BASE_PORT=${BASE_PORT}

RUN yarn install --frozen-lockfile --production=true

COPY . .

#RUN yarn prisma migrate deploy
RUN yarn prisma generate
RUN yarn run build

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

EXPOSE ${BASE_PORT}
#CMD ["node", "dist/main"]
CMD ["./bootstrap.sh"]