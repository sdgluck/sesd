# sesd

> :mag::scroll: API to search [esdiscuss.org](https://esdiscuss.org)

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

## Usage

### sesd(term[, opts]) : Promise

Find topics with `term` in topic title or discussion.

- __term__ {String} Search term
- __[opts.limit]__ {Number} Number of pages to search, starting at 1
- __[opts.author]__ {String} Author search term
- __[opts.deep]__ {Boolean} Search topic contents for results (default: `false`)

Returns a Promise that resolves with details of matched topics.

```js
// Get topics on "prototype" in first five pages
sesd('prototype', { limit: 5 }).then((results) => {
  console.log(results) //=> [ { title, author, href } ]
})
```

## Contributing

All pull requests and issues welcome!

If you're not sure how, check out Kent C. Dodds'
[great video tutorials on egghead.io](https://egghead.io/lessons/javascript-identifying-how-to-contribute-to-an-open-source-project-on-github)!

