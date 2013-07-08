var JSONGlobals = require("json-globals/get")
var EventEmitter = require("events").EventEmitter

var interactions = require("../lib/interactions")

var model = JSONGlobals("model")
var FIRE_SPELLS = "fire-spells"
var WATER_SPELLS = "water-spells"
var SPELL_EDITOR = "spell-editor"

var editor = SpellEditor(SPELL_EDITOR)
SpellList({
    id: WATER_SPELLS,
    model: model.waterSpells,
    type: "water",
    editor: editor
})
SpellList({
    id: FIRE_SPELLS,
    model: model.fireSpells,
    type: "fire",
    editor: editor
})

function SpellList(opts) {
    var events = interactions(opts.id)

    events.on("add", function () {
        opts.editor.show(opts.type)
    })
}

function SpellEditor(id) {
    var events = unpackEmitter(id)

    return {
        show: show
    }

    function show(record) {
        console.log("showing things", record)
    }
}

function unpackEmitter(elem) {
    var events = new EventEmitter()

    return events
}
