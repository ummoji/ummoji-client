const emojiData = require('emoji-data')
const emojiRankings = require('emoji-rankings')
const emojiEmotion = require('emoji-emotion')
const synonyms = require('emoji-synonyms')

const data = emojiData
  .all()
  .map(e => {
    var out = {
      name: e.name,
      shortName: e.short_name,
      unified: e.unified,
      char: e.render(),
      rank: emojiRankings.find(ranked => ranked.id === e.unified).score,
      keywords: []
    }

    var emotion = emojiEmotion.find(e => e.emoji === out.char)
    if (emotion) out.emotion = emotion.polarity

    // Add keywords (synonyms), if defined
    if (synonyms[e.short_name]) out.keywords = synonyms[e.short_name]

    return out
  })
  .sort((a, b) => b.rank - a.rank)

process.stdout.write(JSON.stringify(data, null, 2))
