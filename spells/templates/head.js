module.exports = head

function head(title) {
    return ["head", [
        ["meta", { charset: "utf-8" }],
        ["title", title || "Spells Demo App"],
    ]]
}
