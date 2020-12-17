# readmoo-marathon-bot

A bot for readmoo marathons.

# Requirement

Node >= 15.x

or

Node >= 10.x <= 14.x

Also, you may need install a browser on your dev machine or server (headless browser, driver etc...)

Usually, chromium is enough 

```
apt install chromium-browser
```

# Setup And Configuration

```
npm run setup
```

then you could set options in config by editing `config.yml`.

the url is book reader page url, it should look like this:

`https://new-read.readmoo.com/mooreader/<book_id>`

```
book:
  url: https://new-read.readmoo.com/mooreader/210105298000101
  page-flip-delay: 10000
  page-max-flip-step: 1000

creds:
  username: <readmoo user email>
  password: <your password>
```

now you can run

```
node app
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

### Build Docker Image

```
npm run docker:build
```

Note: Remember to edit `config.yaml` and run `npm run setup` before `npm run docker:build`

run container, it will using config of `config.yaml` if you don't give it any arguments

```
npm run docker:container
```

Run container ad background and pass it a book url
```
docker build -t <image:tag> . && docker run -d --rm <image:tag> -b <bookurl>
```

run a container, give it a book url as parameter:
```
npm run docker:container -- -b <book url>
```

e.g
```
npm run docker:container -- -b https://new-read.readmoo.com/mooreader/210139757000101
```
### read multiple books
Put all your books url in `books.txt`, then build image, after build image and run container

if you have your own `books.txt`, then you can use this npm command, it will run for all your books

```
npm run docker:containers
```

it is equal to this command

```
cat books.txt | xargs -I book bash -c '{ docker run -d --restart on-failure <image:tag> -b book; sleep 3; }'
```
