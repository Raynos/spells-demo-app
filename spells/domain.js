/*
    type HtmlString := String
    type Spell := {
        id: String,
        type: Enum("water", "fire"),
        difficulty: Enum("easy", "normal", "hard"),
        explanation: HtmlString,
        runes: Array<{
            type: String,
            count: Number
        }>,
        relatedAffinity: Enum("love", "mother"),
        shopLocations: Array<String>
    }
*/

module.exports = Domain

function Domain() {
    var spells = require("./json/spells.json")

    return {
        getAll: function getAll(callback) {
            callback(null, Object.keys(spells).map(function (k) {
                return spells[k]
            }))
        },
        save: function save(record, callback) {
            spells[record.id] = record
            callback(null, record)
        }
    }
}
