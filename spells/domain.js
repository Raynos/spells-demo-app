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
            skills[record.id] = record
            callback(null, record)
        }
    }
}
