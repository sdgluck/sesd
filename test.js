'use strict'

const test = require('tape')
const sesd = require('./index')

let results
let topic

test('gets results from first page', (t) => {
  sesd('', { limit: 1 }).then((_results) => {
    t.equal(_results.length > 0, true)
    results = _results
    topic = results[0]
    t.end()
  }).catch(t.fail)
})

test('result is object with author, title, href, page', (t) => {
  t.equal(typeof topic.author, 'string')
  t.equal(typeof topic.href, 'string')
  t.equal(typeof topic.title, 'string')
  t.equal(typeof topic.page, 'number')
  t.end()
})

test('gets results for an author', (t) => {
  sesd('', { limit: 1, author: topic.author }).then((_results) => {
    t.deepEqual(_results, results.filter((r) => r.author === topic.author))
    t.end()
  }).catch(t.fail)
})

test('gets multiple page results', (t) => {
  sesd('', { limit: 2 }).then((_results) => {
    t.equal(_results.length, results.length * 2)
    t.end()
  }).catch(t.fail)
})
