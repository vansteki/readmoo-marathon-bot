FROM alpine:3.12.4 AS base

RUN apk add tzdata git nodejs npm chromium nss freetype freetype-dev harfbuzz ca-certificates ttf-freefont
RUN cp /usr/share/zoneinfo/Asia/Taipei /etc/localtime && echo "Asia/Taipei" > /etc/timezone
COPY package.json ./
COPY package-lock.json ./
RUN npm i --production

FROM base
LABEL name="readmoo-marathon-bot"

ARG book
ARG page-flip-delay
ARG page-max-flip-step
ARG username
ARG password

WORKDIR /app
COPY . ./

HEALTHCHECK --interval=10s --timeout=3s CMD [ $(cat ./error.log | wc -c) -eq 0 ] || exit 1

ENTRYPOINT ["node", "--unhandled-rejections=strict", "app"]

CMD []
