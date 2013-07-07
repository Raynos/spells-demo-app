var test = require("tape")

var spellsDemoApp = require("../index")

test("spellsDemoApp is a function", function (assert) {
    assert.equal(typeof spellsDemoApp, "function")
    assert.end()
})
