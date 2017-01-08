# sesd

> :mag::scroll: Search [esdiscuss.org](https://esdiscuss.org) topics

Made with ❤ at [@outlandish](http://www.twitter.com/outlandish)

<a href="http://badge.fury.io/js/sesd"><img alt="npm version" src="https://badge.fury.io/js/sesd.svg"></a>
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

## Install

```sh
npm install sesd
```

```sh
yarn add sesd
```

## Import

```js
// ES2015
import sesd from 'sesd'
```

```js
// CommonJS
const sesd = require('sesd')
```

## Usage

### `sesd(term[, opts]) : Promise`

Find topics with `term` in topic title or discussion.

- __term__ {String} Search term (give it an empty string to scoop up everything)
- __[opts.limit]__ {Number} Number of pages to search, starting at 1
- __[opts.author]__ {String} Author search term
- __[opts.deep]__ {Boolean} Search topic contents for results (default: `false`)

Returns a Promise that resolves with details of matched topics.

Examples:

```js
// e.g. Get topics about "prototype" on first five pages
sesd('prototype', { limit: 5 }).then((results) => {
  console.log(results) //=> [ { author, title, href, page } ]
})
```

```js
// e.g. Get all topics by an author
sesd('', { author: 'Sam Gluck' }).then((results) => {
  console.log(results)
  //=> [{
  //     author: 'Sam Gluck',
  //     title: 'Why are ES6 class methods not automatically bound to the instance?',
  //     href: '/topic/why-are-es6-class-methods-not-automatically-bound-to-the-instance'
  //     page: 12
  //   }]
})
```

## Contributing

All pull requests and issues welcome!

If you're not sure how, check out Kent C. Dodds'
[great video tutorials on egghead.io](https://egghead.io/lessons/javascript-identifying-how-to-contribute-to-an-open-source-project-on-github)!

