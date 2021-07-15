const {
    CheckBoxRadio,
    GroupRadio,
    OptionRadio,
    CategoryRadio,
    BlockRadio,
    EnumerationRadio,
    ConditionalRadio,
    LiteralRadio,
    VariableOCRadio,
    VariableMCRadio,
    VariableTextRadio,
    VariableNumberRadio,
    VariableDateRadio,
    VariableRatioRadio,
    myDictRadio
  } = require('../models/template')


module.exports.parserRadio = function parser(json){
  var customDict = new myDictRadio("random", [], "name");

    json.forEach(element => {
        // blocks and aufzählung have a value in "typ"
        if(element.hasOwnProperty("Typ")){
            if(element.Typ == "Block"){
                let myblock = new BlockRadio(element["Text-Befund"], 
                                            element.hasOwnProperty("Text-Beurteilung") ? element["Text-Beurteilung"] : undefined,
                                            {});
                customDict.dict.push(myblock);
            } else if(element.Typ == "Aufzählung"){
                let myauf = new EnumerationRadio(element["Text-Befund"],
                                            element.hasOwnProperty("Text-Beurteilung") ? element["Text-Beurteilung"] : undefined,
                                            element.Aufzählung,
                                            {});
                customDict.dict.push(myauf);
            }
        } else if(element.hasOwnProperty("Gliederung")){
            let vari;
            if(element.hasOwnProperty("Variable-Typ")){
                switch(element["Variable-Typ"]){
                    case "Datum":
                        vari = new VariableDateRadio(element["Variable-ID"], element["Variable-Info"], undefined, {}, new Date());
                    
                }
            }
        }


    });
}
