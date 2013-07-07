var async = require("gens")
var ServeJavascript = require("serve-browserify")
var path = require("path")

var render = require("./lib/render")
var SkillsPage = require("./templates/skills-page")

module.exports = Route

function Route(deps) {
    var domain = deps.domain
    var config = deps.config

    var serveJS = ServeJavascript({
        root: path.join(__dirname, "browser")
    })

    return {
        skills: async(function* (req, res) {
            var skills = yield domain.getAll.bind(null)

            var model = viewModel(skills)
            var template = SkillsPage(model)

            render(req, res, template, {
                scripts: [config.baseUri("/js/skills")]
            })
        }),
        base: function (req, res, opts, cb) {
            if (/\/js\//.test(req.url)) {
                return serveJS(req, res)
            }

            cb()
        }
    }
}

function viewModel(skills) {
    return { skills: skills }
}
