module.exports = SpellsPage

function SpellsPage(model) {
    return { fragment: [
        ["div#fire-spells", [
            editList("Fire Spells", model.fireSpells)
        ]],
        ["div#water-spells", [
            editList("Water Spells", model.waterSpells)
        ]]
    ] }
}

function editList(name, items) {
    return ["div", [
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
