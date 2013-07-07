var http = require("http")
var RoutesRouter = require("routes-router")
var opts = require("optimist")
var methods = require("http-methods")
var sendError = require("send-data/error")

var SpellsRoute = require("./spells/route.js")
var SpellsDomain = require("./spells/domain.js")

var spellsDomain = SpellsDomain()
var spellsRoutes = SpellsRoute({
    domain: spellsDomain,
    config: Config("skills")
})

var router = RoutesRouter()
addRoute("/", spellsRoutes.skills)
addRoute("/skills", spellsRoutes.skills)
addRoute("/base/skills/*", spellsRoutes.base)

var server = http.createServer(router)
    .listen(opts.PORT || 8000, function () {
        console.log("listening on port", server.address().port)
    })

function addRoute(uri, handler) {
    if (typeof routeHandler === "object") {
        handler = methods(handler)
    }

    router.addRoute(uri, Route(handler))

    function Route(handler) {
        return function routeHandler(req, res, params, splats) {
            handler(req, res, {
                params: params,
                splats: splats
            }, function (err) {
                if (err) {
                    sendError(req, res, err)
                }
            })
        }
    }
}

function Config(name) {
    return {
        baseUri: function (uri) {
            return "/base/" + name + uri
        }
    }
}
