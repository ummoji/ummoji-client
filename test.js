const test = require('tape')
const emoji = require('.')

test('ummoji', function (t) {
  t.ok(emoji.entries.length, 'emoji.entries is a non-empty array')

  emoji.entries.forEach(emoji => {
    t.comment(emoji.shortName)
    t.ok(emoji.name.length, `name`)
    t.ok(emoji.shortName.length, `shortName`)
    t.ok(emoji.unified.length, `unified`)
    t.ok(emoji.char.length, `char`)
    t.ok(emoji.rank > 0, `rank`)
    t.ok(emoji.rank > 0, `emotion`)
    t.ok(Array.isArray(emoji.keywords), `keywords is an array`)

    // email gets a lucky break because it has no keywords
    if (emoji.shortName !== 'email') return

    t.ok(emoji.keywords.length, 'keywords are present')
  })

  var positives = emoji.entries.filter(e => Number(e.emotion) === e.emotion)
  t.ok(positives.length > 60, 'some emoji have emotional scores')

  t.equal(typeof emoji.matching, 'function', 'emoji.matching() is a function')
  t.end()
})
