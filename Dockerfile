FROM alpine:edge

ARG book
ARG page-flip-delay
ARG page-max-flip-step
ARG username
ARG password

WORKDIR /app

COPY package.json ./

RUN apk add tzdata git nodejs npm chromium nss freetype freetype-dev harfbuzz ca-certificates ttf-freefont && npm i --production
RUN cp /usr/share/zoneinfo/Asia/Taipei /etc/localtime && echo "Asia/Taipei" > /etc/timezone

COPY . ./

HEALTHCHECK --interval=10s --timeout=3s CMD [ $(cat ./error.log | wc -c) -eq 0 ] || exit 1

ENTRYPOINT ["node", "--unhandled-rejections=strict", "app"]

CMD []
