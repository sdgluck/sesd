'use strict'

const cheerio = require('cheerio')
const https  = require('https')

const includes = (a, b) => a.toLowerCase().includes(b.toLowerCase())

/** Fetch a page of ES Discuss topics. */
function getPage (page) {
  return new Promise((resolve, reject) => {
    let body = ''
    https.get(`https://esdiscuss.org/${page}`, (res) => {
      if (res.statusCode !== 200) return resolve({ OK: false })
      res.on('data', (data) => body += data)
      res.on('end', () => resolve({ OK: true, body }))
    }).on('error', reject).end()
  })
}

/** Parse ES Discuss topics document for the topics listed. */
function findTopics (document, opts) {
  const $ = cheerio.load(document)
  const titleTerm = opts.term.trim()
  const authorTerm = opts.author && opts.author.trim()
  const page = opts.page
  const results = []

  $('.topic-title').each(function () {
    const $topic = $(this)
    const $title = $($topic.find('h4 a').get(0))
    const title = $title.text().trim()
    const author = $topic.find('p b').text().trim()
    const href = $title.attr('href')

    if (includes(title, titleTerm))
      if (!author || includes(author, authorTerm))
        results.push({ author, title, href, page })
  })

  return results
}

module.exports = function sesd (term, opts) {
  const limit = opts && opts.limit || 999
  const author = opts && opts.author || ''

  let resolve, reject, promise = new Promise((rs, rj) => (resolve = rs, reject = rj))
  let results = []
  let remaining = limit
  let stop = false

  for (let i = 1; i <= limit; i++) {
    fetch(i)
  }

  function fetch (i) {
    getPage(i)
      .then((res) => {
        --remaining
        if (!res.OK || stop) return
        results = results.concat(findTopics(res.body, { page: i, term, author }))
        if (!remaining) resolve(results.sort((a, b) => a.page - b.page))
      })
      .catch((err) => {
        if (!stop) reject(err)
        stop = true
      })
  }

  return promise
}
