const axios = require('axios');
const fs = require('fs');
const $ = require('cheerio')
const cron = require('node-cron')

const url = 'https://twitter.com/swiperi9ht'

var newest = ''
var temp = []

cron.schedule('*/5 * * * * *', () => {
  axios.get(url)
  .then(({data}) => {
    let html = $.load(data)
    temp = []
    html('.tweet').each((i, e) => {
      let loaded = $.load(e)
      let pinned = loaded('.js-pinned-text').text().length
      if(pinned < 1 ) {
        temp.push(loaded('.TweetTextSize').text())
      }
    })
    // console.log(newest)
    if(temp[0] !== newest) {
      newest = temp[0]
      console.log('new tweet:', newest)
    }
  })
  .catch(err => {
    console.log(err)
  })
})