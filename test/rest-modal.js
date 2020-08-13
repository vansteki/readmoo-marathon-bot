await page.waitForSelector('#tutorial-content').then(() => {
  page.evaluate(`
    MooReaderApp.resetRestAlertTimer = function() {
      let that = this;
    if(this.restAlertTimer){
      clearTimeout(this.restAlertTimer);
    }
    this.restAlertTimer = setTimeout(() => {
      that.showRestAlertTimerModal();
    }, 1000);//一小時後觸發
}
    `)
  page.evaluate(`MooReaderApp.resetRestAlertTimer()`)
})

page.evaluate(`$('.rest-alert-timer-modal .btn').click()`)
