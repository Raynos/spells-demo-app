var forms = require("./forms")

var types = ["water", "fire"]
var difficulties = ["easy", "normal", "hard"]
var relatedAffinities = ["love", "mother"]

module.exports = SpellEditor

function SpellEditor(model) {
    var emitter = Emitter()
    var addSave = emitter.submit("save")

    return emitter(["div#spell-editor", [
        forms.enum.dropdown({
            label: "type: ",
            placeholder: "Please select a type",
            value: model.type,
            options: types,
            event: addSave("type")
        }),
        forms.enum.dropdown({
            label: "difficulty: ",
            placeholder: "Please select a difficulty",
            value: model.difficulty,
            options: difficulties,
            event: addSave("difficulty")
        }),
        forms.string.input({
            label: "name: ",
            placeholder: "Please enter a name",
            value: model.name,
            event: addSave("name")
        }),
        forms.html.editor({
            label: "explanation: ",
            placeholder: "Please enter an explanation",
            value: model.explanation,
            event: addSave("explanation")
        }),
        forms.array.list({
            label: "runes: ",
            addition: "+ Add rune",
            values: model.runes,
            child: RuneControl(addSave)
        }),
        forms.enum.dropdown({
            label: "relatedAffinity: ",
            placeholder: "Please select related affinity",
            value: model.relatedAffinity,
            options: relatedAffinities,
            event: addSave("relatedAffinity")
        }),
        forms.seperated.editor({
            label: "shopLocations: ",
            placeholder: "Please enter shop locations",
            value: model.shopLocations,
            event: addSave("shopLocations")
        })
    ]])
}

function RuneControl(addSave) {
    return function (model) {
        return ["div", [
            forms.string.input({
                label: "type: ",
                placeholder: "Enter rune type",
                value: model.type,
                event: addSave("runes[].type")
            }),
            forms.number.input({
                label: "count: ",
                placeholder: "Enter the number of runes",
                value: model.count,
                event: addSave("runes[].count")
            })
        ]]
    }
}

// todo
function Emitter() {
    function emitter(jsonml) {
        return jsonml
    }

    emitter.submit = function (eventName) {
        return function (property) {
            return function (jsonml) {
                return jsonml
            }
        }
    }

    return emitter
}
