var types = ["water", "fire"]
var difficulties = ["easy", "normal", "hard"]
var relatedAffinities = ["love", "mother"]

var forms = require("./forms")

module.exports = SpellEditor

function SpellEditor(model) {
    return ["div#spell-editor", [
        forms.enum.dropdown({
            label: "type: ",
            placeholder: "Please select a type",
            value: model.type,
            options: types
        }),
        forms.enum.dropdown({
            label: "difficulty: ",
            placeholder: "Please select a difficulty",
            value: model.difficulty,
            options: difficulties
        }),
        forms.string.input({
            label: "name: ",
            placeholder: "Please enter a name",
            value: model.name
        }),
        forms.html.editor({
            label: "explanation: ",
            placeholder: "Please enter an explanation",
            value: model.explanation
        }),
        forms.array.list({
            label: "runes: ",
            addition: "+ Add rune",
            values: model.runes,
            child: RuneControl
        }),
        forms.enum.dropdown({
            label: "relatedAffinity: ",
            placeholder: "Please select related affinity",
            value: model.relatedAffinity,
            options: relatedAffinities
        }),
        forms.seperated.editor({
            label: "shopLocations: ",
            placeholder: "Please enter shop locations",
            value: model.shopLocations
        })
    ]]
}

function RuneControl(model) {
    return ["div", [
        forms.string.input({
            label: "type: ",
            placeholder: "Enter rune type",
            value: model.type
        }),
        forms.number.input({
            label: "count: ",
            placeholder: "Enter the number of runes",
            value: model.count
        })
    ]]
}
