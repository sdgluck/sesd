'use strict'

const cheerio = require('cheerio')
const https  = require('https')

const ES_DISCUSS_URL = 'https://esdiscuss.org'

const includes = (a, b) => a.toLowerCase().includes(b.toLowerCase())

function getPage (page, cb) {
  let body = ''

  https.get(ES_DISCUSS_URL + `/${page}`, (res) => {
    if (res.statusCode !== 200) {
      cb(new Error('Response not 200 OK'))
      return
    }
    res.on('data', (data) => body += data)
    res.on('end', () => cb(null, body))
  }).on('error', cb).end()
}

function findTopics (document, term, authorTerm) {
  term = term.trim()
  authorTerm = authorTerm && authorTerm.trim()

  const $ = cheerio.load(document)

  let results = []

  $('.topic-title').each(function () {
    const topic = $(this)
    const title = $(topic.find('h4 a').get(0))

    const titleText = title.text().trim()
    const authorText = topic.find('p b').text().trim()


    if (includes(titleText, term)) {
      if (!authorTerm || includes(authorText, authorTerm)) {
        results.push({
          author: authorText,
          title: titleText,
          href: title.attr('href')
        })
      }
    }
  })

  return results
}

module.exports = function (term, opts) {
  const limit = opts.limit || Infinity
  const author = opts.author || ''

  return new Promise((resolve, reject) => {
    let page = 1
    let fails = 0
    let results = []

    const next = () => getPage(page++, (err, document) => {
      if (err && page === 1) {
        reject(new Error('Failed on first request.'))
        return
      }

      if (!err && !document) {
        resolve(results)
        return
      }

      if (err) {
        if (++fails === 2) return reject(new Error('Failed requesting two pages.'))
        console.info('Failed requesting page ${page}. Ignoring.')
        next()
        return
      }

      results = results.concat(findTopics(document, term, author))

      if (page < limit) next()
      else resolve(results)
    })

    next()
  })
}
