# readmoo-bot

A bot for readmoo marathons.

# Setup

```
npm i
```

you could set options in config by editing `config.yml`.

```
book:
  url: https://new-read.readmoo.com/mooreader/210105298000101
  page-flip-delay: 10000
  page-max-flip-step: 50

creds:
  username: <readmoo user email>
  password: <your password>
```

# Usage

```
node app    
```

you can also use command line arguments to set options, cli options will overwrite `config.yml` if you have both.

```
node app -b https://new-read.readmoo.com/mooreader/210105298000101 -u <email> -p <password> --page-flip-delay 10000 --page-max-flip-step 50
```

if you don't use some options in cli, it will use options in `config.yml`

```
node app -b https://new-read.readmoo.com/mooreader/<book id>
```

## Using Container

checkout to branch `docker`, put all your books url in `books.txt`, then build image, after build image and run container

build image and run container
```
docker build -t <image_tag> . && docker run -t -i --rm <image_tag> -b <bookurl>
```

if you have your own `books.txt`, then you can use this npm command, it will run for all your books

```
npm run containers
```

it is equal to this command

```
cat books.txt | xargs -I book docker run -d --rm <image_tag> -b book
```
