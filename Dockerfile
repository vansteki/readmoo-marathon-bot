FROM alpine:edge

ARG book
ARG page-flip-delay
ARG page-max-flip-step
ARG username
ARG password

WORKDIR /app

COPY package.json ./

RUN apk add --no-cache git nodejs npm chromium nss freetype freetype-dev harfbuzz ca-certificates ttf-freefont && npm i --production

COPY . ./

ENTRYPOINT ["node", "app"]

CMD []
