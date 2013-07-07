var byId = require("by/id")
var DataSet = require("data-set")
var EventEmitter = require("events").EventEmitter

var slice = Array.prototype.slice
var PREFIX = "event"

module.exports = interactions

/*
    interactions := (String | Element) => EventEmitter
*/
function interactions(elem) {
    if (typeof elem === "string") {
        elem = byId(elem)
    }

    var events = new EventEmitter()

    scanEvents(elem)

    return events

    function scanEvents(elem) {
        var children = slice.call(elem.children)

        children.forEach(function (child) {
            var ds = DataSet(child)
            var tuples = Object.keys(ds).reduce(extractTuple, [])

            tuples.forEach(function (tuple) {
                // if (tuple.key === "submit") {
                //     submit(elem, function (v) {
                //         events.emit(tuple.value, v)
                //     })
                // } else if (tuple.key === "changes") {
                //     changes(elem, function (v) {
                //         events.emit(tuple.value, v)
                //     })
                // }

                child.addEventListener(tuple.key, function (ev) {
                    events.emit(tuple.value, ev)
                })
            })

            scanEvents(child)

            function extractTuple(acc, key) {
                var parts = key.split("~")
                if (parts[0] === PREFIX) {
                    acc.push({ key: parts[1], value: ds[key] })
                }

                return acc
            }
        })
    }
}
