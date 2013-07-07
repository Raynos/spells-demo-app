module.exports = Layout

function Layout(body, opts) {
    return ["body", [
        body,
        { fragment: !opts.scripts ? [] :
            opts.scripts.map(scriptTag) }
    ]]
}

function scriptTag(source) {
    return ["script", { src: source }]
}
