module.exports = {
    string: {
        input: stringInput
    },
    enum: {
        dropdown: enumDropdown
    },
    number: {
        input: numberInput
    },
    html: {
        editor: htmlEditor
    },
    array: {
        list: listControl
    },
    seperated: {
        editor: listTextArea
    }
}

function listTextArea(opts) {
    var event = opts.event || id

    return ["div", [
        ["label", opts.label],
        event(["textarea", {
            placeholder: opts.placeholder
        }, opts.value.join( opts.seperator || "\n")])
    ]]
}

function listControl(opts) {
    return ["div", [
        ["label", opts.label],
        ["ul", opts.values.map(opts.child)],
        ["button", opts.addition]
    ]]
}

function htmlEditor(opts) {
    var event = opts.event || id

    return ["div", [
        ["label", opts.label],
        event(["textarea.ckeditor", {
            placeholder: opts.placeholder
        }, opts.value])
    ]]
}

function stringInput(opts) {
    var event = opts.event || id

    return ["div", [
        ["label", opts.label],
        event(["input", {
            type: "text",
            placeholder: opts.placeholder,
            value: opts.value
        }])
    ]]
}

function numberInput(opts) {
    var event = opts.event || id

    return ["div", [
        ["label", opts.label],
        event(["input", {
            type: "number",
            placeholder: opts.placeholder,
            value: opts.value
        }])
    ]]
}

function enumDropdown(opts) {
    var event = opts.event || id

    return ["div", [
        ["label", opts.label],
        event(["select", [
            ["option", { value: "" }, opts.placeholder],
            { fragment: opts.options.map(function (str) {
                return ["option", {
                    value: str,
                    selected: opts.value === str
                }, str]
            }) }
        ]])
    ]]
}

function id(x) { return x }
