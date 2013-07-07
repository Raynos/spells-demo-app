var SpellEditor = require("./editor")

module.exports = SpellsPage

function SpellsPage(model) {
    return { fragment: [
        editList("fire-spells", "Fire Spells", model.fireSpells),
        editList("water-spells", "Water Spells", model.waterSpells),
        SpellEditor(model.emptySpell)
    ] }
}

function editList(id, name, items) {
    return ["div#" + id, [
        ["h2", name],
        { fragment: items.map(editLink) },
        ["button", {
            "data-event~click": "add"
        }, "+ Add Spell"]
    ]]
}


function editLink(item) {
    return ["a", {
        "href": "#/spell/" + item.id
    }, item.name]
}
