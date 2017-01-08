'use strict'

const test = require('tape')
const sesd = require('./index')

let results
let author

test('gets results from first page', (t) => {
  sesd('', { limit: 1 })
    .then((_results) => {
      t.equal(_results.length > 0, true)
      results = _results
      author = results[0].author
      t.end()
    })
    .catch(t.fail)
})

test('gets results for an author', (t) => {
  sesd('', { limit: 1, author })
    .then((_results) => {
      t.deepEqual(_results, results.filter((r) => r.author === author))
      t.end()
    })
    .catch(t.fail)
})
