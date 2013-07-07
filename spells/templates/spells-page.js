module.exports = SpellsPage

function SpellsPage(model) {
    return {
        fragment: [
            editList("Fire Spells", model.fireSpells),
            editList("Water Spells", model.waterSpells)
        ]
    }
}

function editList(name, items) {
    return ["div", [
        ["h2", name], {
            fragment: items.map(editLink)
        }, ["button", "+ Add Spell"]
    ]]
}


function editLink(item) {
    return ["a", {
        "href": "#/spell/" + item.id
    }, item.name]
}
