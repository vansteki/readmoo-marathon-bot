FROM alpine:edge

WORKDIR /app

COPY package.json ./

RUN apk add --no-cache git nodejs npm chromium nss freetype freetype-dev harfbuzz ca-certificates ttf-freefont && npm i

COPY . ./

CMD ["npm", "start"]



