module.exports = Domain

function Domain() {
    var skills = {}

    return {
        getAll: function getAll(callback) {
            callback(null, Object.keys(skills).map(function (k) {
                return skills[k]
            }))
        }
    }
}
