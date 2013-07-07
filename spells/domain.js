module.exports = Domain

function Domain() {
    var spells = require("./json/spells.json")

    return {
        getAll: function getAll(callback) {
            callback(null, Object.keys(spells).map(function (k) {
                return spells[k]
            }))
        }
    }
}
