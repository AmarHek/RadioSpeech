module.exports.CheckBox = function CheckBox(name, value, text, judgementText = undefined,
                                            conditionalID = undefined, normal, variables,
                                            enumeration = undefined, keys){
    this.kind = "box";
    this.name = name;
    this.value = value;
    this.text = text;
    this.judgementText = judgementText;
    this.conditionalID = conditionalID;
    this.normal = normal;
    this.variables = variables;
    this.enumeration = enumeration;
    this.keys = keys;
}

module.exports.Group = function Group(name, options, value = undefined){
    this.kind = "group";
    this.name = name;
    this.options = options;
    this.value = value;
}

module.exports.Option = function Option(name, text, judgementText = undefined,
                                             conditionalID = undefined, normal, variables, keys){
    this.kind = "option";
    this.name = name;
    this.text = text;
    this.judgementText = judgementText;
    this.conditionalID = conditionalID;
    this.normal = normal;
    this.variables = variables;
    this.keys = keys;
}

module.exports.Category = function Category(name, optional = undefined, selectables){
    this.kind = "category";
    this.name = name;
    this.optional = optional;
    this.selectables = selectables;
}

module.exports.Block = function Block(text = undefined, judgementText = undefined){
    this.kind = "block";
    this.text = text;
    this.judgementText = judgementText;
}

module.exports.Enumeration = function Enumeration(text, judgementText = undefined, id){
    this.kind = "enumeration";
    this.text = text;
    this.judgementText = judgementText;
    this.id = id;
}

module.exports.Conditional = function ConditionalRadio(precondition,
                                                       normalText = undefined,
                                                       judgementText = undefined){
    this.kind = "conditional";
    this.precondition = precondition;
    this.normalText = normalText;
    this.judgementText = judgementText;
}

module.exports.Literal = function LiteralRadio(id, negated){
    this.id = id;
    this.negated = negated;
}

module.exports.VariableOC = function VariableOC(id, textBefore, textAfter, keys, value = undefined, values) {
    this.kind = "oc";
    this.id = id;
    this.textBefore = textBefore;
    this.textAfter = textAfter;
    this.keys = keys;
    this.value = value;
    this.values = values;
}

module.exports.VariableMC = function VariableMCRadio(id, textBefore, textAfter, keys, values) {
    this.kind = "mc";
    this.id = id;
    this.textBefore = textBefore;
    this.textAfter = textAfter;
    this.keys = keys;
    this.values = values;
}

module.exports.VariableText = function VariableTextRadio(id, textBefore, textAfter, keys, value) {
    this.kind = "text";
    this.id = id;
    this.textBefore = textBefore;
    this.textAfter = textAfter;
    this.keys = keys;
    this.value = value;
}

module.exports.VariableNumber = function VariableNumberRadio(id, textBefore, textAfter, keys, value) {
    this.kind = "number";
    this.id = id;
    this.textBefore = textBefore;
    this.textAfter = textAfter;
    this.keys = keys;
    this.value = value;
}

module.exports.VariableDate = function VariableDateRadio(id, textBefore, textAfter, keys, value) {
    this.kind = "date";
    this.id = id;
    this.textBefore = textBefore;
    this.textAfter = textAfter;
    this.keys = keys;
    this.value = value;
}

module.exports.VariableRatio = function VariableRatioRadio(id, textBefore, textAfter, keys, numerator,
                                                           denominator, fractionDigits) {
    this.kind = "ratio";
    this.id = id;
    this.textBefore = textBefore;
    this.textAfter = textAfter;
    this.keys = keys;
    this.numerator = numerator;
    this.denominator = denominator;
    this.fractionDigits = fractionDigits;
}

module.exports.Template = function (id, name, parts){
    this.id = id;
    this.name = name;
    this.parts = parts;
}

// TODO: Check saving for class inheritance
