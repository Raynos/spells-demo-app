var JSONGlobals = require("json-globals")

module.exports = Layout

function Layout(body, opts) {
    return ["body", [
        !opts.globals ? { fragment: [] } :
            ["script", JSONGlobals(opts.globals)],
        body,
        { fragment: !opts.scripts ? [] :
            opts.scripts.map(scriptTag) }
    ]]
}

function scriptTag(source) {
    return ["script", { src: source }]
}
