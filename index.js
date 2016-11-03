var emoji = {}

emoji.entries = require('./data.json')

emoji.matching = (query) => {
  if (!query || !query.length) return []

  // make query pattern case insensitive
  query = new RegExp(query, 'i')

  return emoji.entries.filter(e => {
    return e.shortName.match(query) ||
    String(e.id).match(query) ||
    e.name.match(query) ||
    e.keywords.some(keyword => keyword.match(query))
  })
}

module.exports = emoji
