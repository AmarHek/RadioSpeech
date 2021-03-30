module.exports.CheckBoxRadio = function CheckBoxRadio(name, value, text, judgementText = undefined, conditionalID = undefined, normal, variables, enumeration = undefined, data){
    this.kind = "box";
    this.name = name;
    this.value = value;
    this.text = text;
    this.judgementText = judgementText;
    this.conditionalID = conditionalID;
    this.normal = normal;
    this.variables = variables;
    this.enumeration = enumeration;
    this.data = data;
}

module.exports.GroupRadio = function GroupRadio(name, options, value = undefined, data){
    this.kind = "group";
    this.name = name;
    this.options = options;
    this.value = value;
    this.data = data;
}

module.exports.OptionRadio = function OptionRadio(name, text, judgementText = undefined, conditionalID = undefined, normal, variables, data){
    this.kind = "option";
    this.name = name;
    this.text = text;
    this.judgementText = judgementText;
    this.conditionalID = conditionalID;
    this.normal = normal;
    this.variables = variables;
    this.data = data;
}

module.exports.CategoryRadio = function CategoryRadio(name, optional = undefined, selectables, data){
    this.kind = "category";
    this.name = name;
    this.optional = optional;
    this.selectables = selectables;
    this.data = data;
}

module.exports.BlockRadio = function BlockRadio(text = undefined, judgementText = undefined, data){
    this.kind = "block";
    this.text = text;
    this.judgementText = judgementText;
    this.data = data;
}

module.exports.EnumerationRadio = function EnumerationRadio(text, judgementText = undefined, id, data){
    this.kind = "enumeration";
    this.text = text;
    this.judgementText = judgementText;
    this.id = id;
    this.data = data;
}

module.exports.ConditionalRadio = function ConditionalRadio(precondition, normalText = undefined, judgementText = undefined, data){
    this.kind = "conditional";
    this.precondition = precondition;
    this.normalText = normalText;
    this.judgementText = judgementText;
    this.data = data;
}

module.exports.LiteralRadio = function LiteralRadio(id, negated){
    this.id = id;
    this.negated = negated;
}

module.exports.VariableOCRadio = function VariableOCRadio(id, textBefore, textAfter, data, value = undefined, values) {
    this.kind = "oc";
    this.id = id;
    this.textBefore = textBefore;
    this.textAfter = textAfter;
    this.data = data;
    this.value = value;
    this.values = values;
}

module.exports.VariableMCRadio = function VariableMCRadio(id, textBefore, textAfter, data, values) {
    this.kind = "mc";
    this.id = id;
    this.textBefore = textBefore;
    this.textAfter = textAfter;
    this.data = data;
    this.values = values;
}

module.exports.VariableTextRadio = function VariableTextRadio(id, textBefore, textAfter, data, value) {
    this.kind = "text";
    this.id = id;
    this.textBefore = textBefore;
    this.textAfter = textAfter;
    this.data = data;
    this.value = value;
}

module.exports.VariableNumberRadio = function VariableNumberRadio(id, textBefore, textAfter, data, value) {
    this.kind = "number";
    this.id = id;
    this.textBefore = textBefore;
    this.textAfter = textAfter;
    this.data = data;
    this.value = value;
}

module.exports.VariableDateRadio = function VariableDateRadio(id, textBefore, textAfter, data, value) {
    this.kind = "date";
    this.id = id;
    this.textBefore = textBefore;
    this.textAfter = textAfter;
    this.data = data;
    this.value = value;
}

module.exports.VariableRatioRadio = function VariableRatioRadio(id, textBefore, textAfter, data, numerator, denominator, fractionDigits) {
    this.kind = "ratio";
    this.id = id;
    this.textBefore = textBefore;
    this.textAfter = textAfter;
    this.data = data;
    this.numerator = numerator;
    this.denominator = denominator;
    this.fractionDigits = fractionDigits;
}

module.exports.myDictRadio = function (id, dict, name){
    this.id = id;
    this.dict = dict;
    this.name = name;
}
