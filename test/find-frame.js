const puppeteer = require('puppeteer')
const opts = require('./options')

async function run () {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: [
      // '--user-data-dir=/var/tmp/readmoo'
    ]
  })
  const page = await browser.newPage()

  page.on('error', err => {
    console.log(Date(), 'error happen at the page: ', err)
  })
  page.on('page error', err => {
    console.log(Date(), 'page error happen at the page: ', err)
  })

  await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4182.0 Safari/537.36')
  // get the User Agent on the context of Puppeteer
  const userAgent = await page.evaluate(() => navigator.userAgent)
  // If everything correct then no 'HeadlessChrome' sub string on userAgent
  console.log(userAgent)

  await page.goto('https://member.readmoo.com/login/')

  const USERNAME_SELECTOR = '#email'
  const PASSWORD_SELECTOR = '#password'
  const SIGNIN_SELECTOR = '#sign-in'

  await page.click(USERNAME_SELECTOR)
  await page.keyboard.type(opts.creds.username)

  await page.click(PASSWORD_SELECTOR)
  await page.keyboard.type(opts.creds.password)

  await page.click(SIGNIN_SELECTOR)
  console.log(Date(), '登入成功')

  await page.waitForNavigation()
  console.log(Date(), '認證完成跳轉')

  // try using  old profile
  // select a book, simulate flow as real as possible
  await page.goto(opts.book)
  // await page.goto('https://reader.readmoo.com/reader/index.html#token=d94957d384764a41a1749f357efc5846274ae488&state=210105298000101')
  console.log(Date(), 'Connect to book frame')
  let src = await page.waitForSelector('#mooreader-iframe').then(()=> page.evaluate(`$('#mooreader-iframe').attr('src')`))
  console.log(Date(), 'src', src)
}

run()
