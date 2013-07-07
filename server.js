var http = require("http")
var RoutesRouter = require("routes-router")
var opts = require("optimist")

var SpellsRoute = require("./spells/route.js")
var SpellsDomain = require("./spells/domain.js")

var spellsDomain = SpellsDomain()
var spellsRoutes = SpellsRoute({
    domain: spellsDomain,
    config: Config("skills")
})

var router = RoutesRouter()
router.addRoute("/", spellsRoutes.skills)
router.addRoute("/skills", spellsRoutes.skills)
router.addRoute("/base/skills/*", spellsRoutes.base)

var server = http.createServer(router)
    .listen(opts.PORT || 8000, function () {
        console.log("listening on port", server.address().port)
    })

function Config(name) {
    return {
        baseUri: function (uri) {
            return "/base/" + name + uri
        }
    }
}
