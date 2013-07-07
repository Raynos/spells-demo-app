var async = require("gens")
var ServeJavascript = require("serve-browserify")
var path = require("path")

var render = require("./lib/render")
var SpellsPage = require("./templates/spells-page")

module.exports = Route

function Route(deps) {
    var domain = deps.domain
    var config = deps.config

    var serveJS = ServeJavascript({
        root: path.join(__dirname, "browser")
    })

    return {
        spells: async(function* (req, res) {
            var spells = yield domain.getAll.bind(null)

            var model = viewModel(spells)
            var template = SpellsPage(model)

            render(req, res, template, {
                scripts: [config.baseUri("/js/spells")]
            })
        }),
        base: async(function* (req, res) {
            if (/\/js\//.test(req.url)) {
                return serveJS(req, res)
            }
        })
    }
}


function viewModel(spells) {
    return {
        fireSpells: spells.filter(function (spell) {
            return spell.type === "fire"
        }),
        waterSpells: spells.filter(function (spell) {
            return spell.type === "water"
        })
    }
}
