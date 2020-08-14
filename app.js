const puppeteer = require('puppeteer')
const opts = require('./options.js')
const pageFlipDelay = opts['page-flip-delay']
const pageMaxFlipStep = opts['page-max-flip-step']
console.log('opts:', opts)

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
  await page.screenshot({path: `screenshots/${arguments.callee.name}.png`})

  const USERNAME_SELECTOR = '#email'
  const PASSWORD_SELECTOR = '#password'
  const SIGNIN_SELECTOR = '#sign-in'

  await page.click(USERNAME_SELECTOR)
  await page.keyboard.type(opts.username)

  await page.click(PASSWORD_SELECTOR)
  await page.keyboard.type(opts.password)

  await page.click(SIGNIN_SELECTOR)
  console.log(Date(), '登入成功')

  await page.waitForNavigation()
  console.log(Date(), '認證完成跳轉')

  // try using  old profile
  // select a book, simulate flow as real as possible
  await page.goto(opts.book)
  console.log(Date(), `Book: 《${await page.title()}》`)

  page.on('dialog', async dialog => {
    console.log(Date(), '同步進度視窗彈出:')
    console.log(Date(), dialog.message())
    await dialog.dismiss()
  })

  let frameSrc = await page.waitForSelector('#mooreader-iframe').then(() => page.evaluate(`$('#mooreader-iframe').attr('src')`))
  console.log(Date(), 'frame src', frameSrc)
  await page.goto(frameSrc)

  console.log(Date(), 'Connect to book frame')
  await page.waitForTimeout(3000)

  let isRightToLEft = await page.evaluate(`ReadiumSDK.reader.getCurrentView().getPaginationInfo().isRightToLeft`)
  console.log(Date(), '取得閱讀模式: isRightToLeft:', isRightToLEft)


  await page.waitForSelector('#tutorial-content').then(() => {
    // page.click('#tutorial-content span').click()
    console.log(Date(), '教學視窗彈出:')
    page.evaluate(`$('#tutorial-content').find("span:contains('略過教學')").click()`)
  })

  await page.screenshot({path: `screenshots/${arguments.callee.name}.book.png`})

  async function right (page) {
    await page.evaluate(`$('.rest-alert-timer-modal .btn').click()`)
    await page.evaluate(`window.MooReaderApp.openPageRight()`)

  }

  async function left (page) {
    await page.evaluate(`$('.rest-alert-timer-modal .btn').click()`)
    await page.evaluate(`window.MooReaderApp.openPageLeft()`)
    await page.waitForTimeout(pageFlipDelay)
  }

  await page.waitForSelector('#reading-area').then(() => {
    (async function () {
      console.log(Date(), '開始閱讀')
      while (1) {

        if (isRightToLEft) {
          for (let i = 0; i < pageMaxFlipStep; i++) {
            console.log(Date(), 'Flip Left', i)
            await left(page)
            await page.waitForTimeout(pageFlipDelay)
          }
          for (let i = 0; i < pageMaxFlipStep; i++) {
            console.log(Date(), 'Flip Right', i)
            await right(page)
            await page.waitForTimeout(pageFlipDelay)
          }
        } else {
          for (let i = 0; i < pageMaxFlipStep; i++) {
            console.log(Date(), 'Flip Right', i)
            await right(page)
            await page.waitForTimeout(pageFlipDelay)
          }
          for (let i = 0; i < pageMaxFlipStep; i++) {
            console.log(Date(), 'Flip Left', i)
            await left(page)
            await page.waitForTimeout(pageFlipDelay)
          }
        }
      }
    })()
  })
}

run()
