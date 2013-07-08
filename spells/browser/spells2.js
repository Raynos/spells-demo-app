/*
    There is some input

        on('add') -> set state visibleEditor to be
            empty spell with that type

    There is some state {
        visibleEditor: Spell | null
    }

    There is some output

        if visibleEditor -> render editor control
        else -> render nothing
*/
var observe = require("observable/observe")
var interactions = require("observable/interactions")
var render = require("jsonml/render")
var observeDOM = require("jsonml/observe")
var extend = require("xtend")

var EditorTemplate = require("../templates/editor")

var lists = interactions(["#fire-spells", "#water-spells"])
var viewModel = {
    visibleSpell: null
}

function ImperativeStyle() {
    var state = observe(viewModel)

    lists.on("add", function (change) {
        state.update({
            visibleSpell: { type: change.type }
        })
    })

    var editor = state.transform(function(viewModel) {
        return viewModel.visibleSpell
    })

    observeDOM("#skill-editor", editor)
}

function FunctionalStyle() {
    var updateSkills = lists.on("add").transform(function (change){
        return function (viewModel) {
            return extend(viewModel, {
                visibleSpell: { type: change.type }
            })
        }
    })

    var state = observe([ updateSkills ], function (viewModel, fn) {
        return fn(viewModel)
    }, viewModel)

    var editor = state.transform(function (viewModel) {
        return viewModel.visibleSpell
    }).transform(function (visibleSpell) {
        return EditorTemplate(visibleSpell)
    })

    render("#skill-editor", editor)
}
