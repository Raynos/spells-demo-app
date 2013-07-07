var stringify = require("jsonml-stringify")
var WriteHtml = require("write-html")

var head = require("../templates/head")
var Layout = require("../templates/layout")

module.exports = layout

function layout(req, res, body, opts) {
    var page = Layout(body, opts)

    var writer = WriteHtml(req, res)
    writer.writeHead(stringify(head()))
    writer.writeBody(stringify(page))
}
