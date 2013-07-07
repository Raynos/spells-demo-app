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
    return ["div", [
        ["label", opts.label],
        ["textarea", {
            placeholder: opts.placeholder
        }, opts.value.join( opts.seperator || "\n")]
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
    return ["div", [
        ["label", opts.label],
        ["textarea.ckeditor", {
            placeholder: opts.placeholder
        }, opts.value]
    ]]
}

function stringInput(opts) {
    return ["div", [
        ["label", opts.label],
        ["input", {
            type: "text",
            placeholder: opts.placeholder,
            value: opts.value
        }]
    ]]
}

function numberInput(opts) {
    return ["div", [
        ["label", opts.label],
        ["input", {
            type: "number",
            placeholder: opts.placeholder,
            value: opts.value
        }]
    ]]
}

function enumDropdown(opts) {
    return ["div", [
        ["label", opts.label],
        ["select", [
            ["option", { value: "" }, opts.placeholder],
            { fragment: opts.options.map(function (str) {
                return ["option", {
                    value: str,
                    selected: opts.value === str
                }, str]
            }) }
        ]]
    ]]
}
