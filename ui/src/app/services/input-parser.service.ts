import { Injectable, Input } from '@angular/core';
import * as M from '../new_model'
import { Keyword2, Category, Disease, MyVariable, TextDic } from '../gastro/Keyword';
import { TextOutputService } from './text-output.service';


@Injectable({
  providedIn: 'root'
})

export class InputParserService {

  constructor(private textOut: TextOutputService) {

  }
  // Contains whole Polyp with its Categories and Keywords inside of each Category
  diseases: Array<Disease> = [];
  // contains input text
  twInput: { twInput: string, again: boolean } = { twInput: "", again: false };
  // contains all missing categorys after first "ende"
  missing: Array<TextDic> = [];
  // 2nd ende?
  end: boolean = false;
  start: boolean = false;
  // 1st ende?
  end0: boolean = false;
  globalPos: number;
  startingTime: Date;



  /* --------------------------------
      Creating Dictionary
     --------------------------------
  */
  // Create a Dictionary (e.g. the polyp Object)
  createStartDict(rootEl: M.TopLevel[]) {
    //note starting time
    this.startingTime = new Date();

    // loops through all diseases and categories: Form, Lokalisierung...
    for (const El of rootEl) {

      let disName = "";
      //block indicates a new disease, every rootEl that follows is a category of it
      if (El.kind == "disease") {
        disName = El.name;
        this.diseases.push({ name: disName, categories: [], active: false, number: 1, position: [], firstTime: true, positionEnd: [] });


        // indicates a new category
        for (const cat of El.categories) {
          let syns: string[];
          let keys: Keyword2[] = [];
          // loops through all options inside the categories, e.g. for "Form": Knospe, gestielt...
          for (const att of cat.selectables) {
            //splits all the synonyms into an array
            syns = att.name;
            for (const s of syns) {
              // adds a new possible Keyword based on the information from the excel table
              keys.push(this.createKeyword(att, cat, s));
              //keys.push(this.createKeyword(att, El, s));
            }
          }

          // Adds a new category

          let con = null;
          if (!(cat.condition == undefined)) {
            con = cat.condition;
          }


          this.diseases[this.diseases.length - 1].categories.push({ keys: keys, name: cat.name, active: false, position: -1, condition: con });

        }
      }
    }
    //makes an entry for this disease in output data structure
    this.textOut.initDiseaseText(this.diseases);
  }

  // --------- Help methods for creating Dictionary ----------

  // sets default values for each keyword
  createKeyword(option: M.CheckBox, category: M.Category, synonym: string) {
    let Vars: MyVariable[] = [];
    for (const vari of option.variables) {

      // if variable is like "links / rechts"
      if (vari.kind === "oc") {
        Vars.push({ kind: vari.kind, textBefore: undefined, textAfter: undefined, options: vari.values, varFound: [] });
        // if variable is like "bei..."
      } else if (vari.kind === "text") {
        // extracts ending word, for example [cm]

        Vars.push({ kind: vari.kind, textBefore: vari.textBefore, textAfter: vari.textAfter, options: [vari.unit], varFound: [] })
      }
    }
    return {
      // assigning corresponding values
      name: option.name[0],
      synonym: synonym,
      variables: Vars,
      category: category.name,
      position: -1,
      active: undefined,
      text: option.text,
      buttonPos: -1,
      normal: option.normal,
      code: option.judgementText
    };
  }




  /* --------------------------------
      Analyzing Input
     --------------------------------
  */



  // parses the input by calling different methods and writing/reading to/from the polyp object
  parseInput(input: string) {
    this.twInput.twInput = input;
    // checks if "ende" is called
    if (input.toLowerCase().indexOf(" ende") !== -1) {
      let main = document.getElementsByClassName("main")[0].classList
      this.missing = this.textOut.firstOut();
      // checks if "ende" is only called once
      if (this.missing.length !== 0 && ((input.split(" ende").length - 1) === 1)) {
        this.end0 = true;
        // if "ende" is called twice
      } else {

        main.remove("main");
        main.add("report");
        let signalButton = document.getElementById("listening");
        signalButton.classList.remove("btn-success");
        signalButton.classList.add("btn-danger");
        signalButton.innerText = "Aus";
        this.end = true;
      }
    }
    // if ende is not called yet
    if (!this.end) {
      let text
      // gets current disease
      let activeDis = this.setDisease(input, this.diseases);
      if (activeDis != undefined) {
        // Checks if Category name contains Disease name, which produces an error
        let disPosLast = activeDis.position[activeDis.position.length - 1] + activeDis.name.length;
        if ((disPosLast != input.length) && input.charAt(disPosLast) !== " ") {

          let tempInput = input.substr(0, activeDis.position[activeDis.position.length - 1]) + input.substr(disPosLast + 1);
          activeDis = this.setDisease(tempInput, this.diseases);
        }
        /* disabled: // pushes dis name to array for correction purpose later
        if(this.textOut.recogWords[this.textOut.recogWords.length-1] !== activeDis.name.toLowerCase()){
        this.textOut.recogWords.push(activeDis.name.toLowerCase());
        }  */
        // only look for categories at what comes after the last disease

        let input2 = "";
        for (let j = 0; j < activeDis.positionEnd.length; j++) {
          // adds together all input parts that belong to the active disease
          input2 += input.substring(activeDis.position[j], activeDis.positionEnd[j]);
        }
        // adds the current part from the disease
        input2 += input.substring(activeDis.position[activeDis.position.length - 1]);
        // loops through all categories of current disease
        for (let i = 0; i < activeDis.categories.length; i++) {
          let activeCat = activeDis.categories[i];
          activeCat.position = 0;
          activeCat.active = true;
          // if one active category is detected, it's active value is set to true, all others to false
          if (activeCat) {

            // Evaluate only the input that comes after the last category
            input2 = input2.substring(activeCat.position);
            // Find out which keywords occur in the input2
            for (const key of activeCat.keys) {
              key.position = this.getIndex(key, input2, activeCat.position + activeDis.position[activeDis.position.length - 1]);

            }
            //enables the rest normal method
            if (input2.toLowerCase().indexOf("rest normal") != -1) {
              this.restNormal(activeDis);
            }
            // if a keyword is addressed by different synonyms, the synonym with the latest appearance has to be used
            // (currently not used: Also responsible for button clicks)
            this.onlyLatestKeyword(activeCat.keys);
            // if a category is addressed by different keywords, the keyword with the lastest appearance has to be used
            // Also check which keywords have variables and if the occurr in the input2
            this.twInput.again = this.getActivesAndVariables(activeCat.keys, input2, activeDis, activeCat);
            // produces text output
            text = this.textOut.makeReport(activeCat, activeDis, this.startingTime);
          }
          activeCat.active = false;
        }
        // Test Log
        console.log("KeyTest");
        console.log(this.diseases);
        console.log(this.diseases[0].categories[0].condition);
        console.log(this.diseases[0].categories[0].condition == "");
        console.log(this.twInput.twInput);

      }
      return text
    }
    // no text when no category is activated
    return this.textOut.makeReport(undefined, undefined, this.startingTime);

  }

  // sets all unused categories of one disease to its normal keywords
  restNormal(disease: Disease) {
    // loops through all categories
    for (const cat of disease.categories) {
      // if category is unused
      if (cat.keys.find(key => key.position !== -1) == undefined) {
        // find normal keyword and set it
        for (const key of cat.keys) {

          if (key.normal == true && key.name == key.synonym) {
            key.active = key.name;
            key.position = 0;
            /*  console.log("RestNormalCheck");
             console.log(key.name); */
          }
        }
        // make additional report
        this.textOut.makeReport(cat, disease, this.startingTime);
      }
    }
  }

  // only for buttons, currently disabled
  /* radioClicked(buttonPos: number, keyName: string, category: string){
    // Only one button of each category may be active at the same time
    for (const key of this.keywords.filter(key => key.category == category)){
      if(key.name == keyName){
        key.buttonPos = buttonPos;
      } else {
        key.buttonPos = -1;
      }
    }
  } */


  // find only the latest keyword of one category
  onlyLatestKeyword(keys: Array<Keyword2>) {

    // Filter Keywords for the active ones and sort them by their position in the input
    let activeKeys = keys.filter(activeKey => activeKey.position != -1).sort((a, b) => b.position - a.position);
    // From all active Keywords with the same category, only the one with the latest position stays active.
    for (let i = 0; i < activeKeys.length - 1; i++) {
      if ((activeKeys[i].position) > (activeKeys[i + 1].position) + activeKeys[i + 1].synonym.length - 1) {
        while (activeKeys[i + 1] != undefined) {
          activeKeys[i + 1].position = -1;
          activeKeys.splice(i + 1, 1);
        }
      } else {
        activeKeys[i].position = -1;
      }
    }
    // currently disabled
    // Filter for all buttons that were pressed and sort them by order
    /* let activeButtons = keys.filter(activeKey => activeKey.buttonPos != -1).sort((a,b) => a.buttonPos-b.buttonPos);
    if(activeButtons.length >= 1){

      // if keyword of latest button click occurs later than latest written key -> take button click, else take written key
      if(activeKeys.length >= 1){
        if(activeButtons[0].buttonPos > activeKeys[activeKeys.length-1].position){
          activeButtons[0].position =  activeButtons[0].buttonPos;
          activeKeys[activeKeys.length-1].position = -1;
        } else {
        activeButtons[0].buttonPos = -1;
        activeButtons[0].position = -1;
        }
      } else {
        activeButtons[0].position = activeButtons[0].buttonPos;
      }
    } */

  }


  getActivesAndVariables(allKeywords: Array<Keyword2>, input: string, activeDis: Disease, activeCat: Category) {
    // Filters for all Keywords, that are active in input and sorts them by index
    let activeKeys = allKeywords.filter(activeKey => activeKey.position != -1).sort((a, b) => a.position - b.position);
    let reRun = false;
    // Searches for Signal Variable Text (Text Before) between corresponding keyword and next active Variable
    for (let i = 0; i < activeKeys.length; i++) {
      activeKeys[i].active = activeKeys[i].name;
      const index = activeDis.categories.findIndex(cat => cat.name === activeCat.name);
      // guide unused in this version
      let guided = (activeDis.categories[activeDis.categories.length - 1].keys.find(key => key.position !== -1) !== undefined);
      // computes field in the string, where the variable text will be

      let endIndex: number;
      let activeVar = -1;
      if (i == activeKeys.length - 1) {
        endIndex = input.length;
      } else {
        endIndex = activeKeys[i + 1].position - 1;
      }
      let startIndex = activeKeys[i].position + activeKeys[i].synonym.length + 1;
      let varField = input.slice(startIndex, endIndex).toLowerCase();


      let done: boolean = false;
      let varStarted = false;
      // loops through all the keywords variables
      for (let k = 0; k < activeKeys[i].variables.length; k++) {

        let variable = activeKeys[i].variables[k];
        // checks if there is a text variable

        if (variable.kind === "text" && !varStarted) {
          done = false;
          // checks if text before is activated

          let tbPos = varField.indexOf(variable.textBefore.toLowerCase());
          // if so, take every input until end word occurs

          if (tbPos != -1) {
            varStarted = true;
            let tbPosEnd = tbPos + variable.textBefore.length;
            let reg = new RegExp(variable.options[0], "i");

            //let varEnd = varField.slice(tbPosEnd).search(/[cm]m/);
            let varEnd = varField.slice(tbPosEnd).search(reg);

            let varInp;
            if (varEnd != -1) {
              // if end word is written, save the variable

              varInp = varField.slice(tbPosEnd, tbPosEnd + varEnd + varField.slice(tbPosEnd).match(reg)[0].length);
              variable.varFound[0] = variable.textBefore + varInp + variable.textAfter;
              varStarted = false;
              done = true;
              // adds variable text to correction mode

              if (this.textOut.recogWords.find(el => {
                return (el.word === varInp.trim().toLowerCase() && el.pos === activeCat.position + activeDis.position[activeDis.position.length - 1] + tbPos + variable.textBefore.length + startIndex)
              }) === undefined && ((varInp.search(reg)) !== -1)) {
                this.textOut.recogWords.push({ word: varInp.trim().toLowerCase(), pos: activeCat.position + activeDis.position[activeDis.position.length - 1] + tbPos + variable.textBefore.length + startIndex });
              }
            } else {
              variable.varFound[0] = variable.textBefore + varField.slice(tbPos + variable.textBefore.length) + variable.textAfter;
            }
            // pushes text before to array for correction purpose later
            if (this.textOut.recogWords.find(el => {
              return (el.word === variable.textBefore.trim().toLowerCase() && el.pos === activeCat.position + activeDis.position[activeDis.position.length - 1] + tbPos + startIndex)
            }) === undefined) {
              this.textOut.recogWords.push({ word: variable.textBefore.trim().toLowerCase(), pos: activeCat.position + activeDis.position[activeDis.position.length - 1] + tbPos + startIndex });
            }

          }
        }
        // same as before with "choosing variables", e.g. "links / rechts"

        if (variable.kind === "oc" && !varStarted) {
          done = false;
          varStarted = true;
          console.log("Varfield");
          console.log(varField);
          for (const opt of variable.options) {
            console.log(opt.toLowerCase());
            if (varField.indexOf(opt.toLowerCase()) != -1) {
              variable.varFound[0] = opt;
              done = true;
              console.log("gotit");
              varStarted = false;
              if (this.textOut.recogWords.find(el => {
                return (el.word === opt.toLowerCase() && el.pos === activeCat.position + activeDis.position[activeDis.position.length - 1] + varField.indexOf(opt) + startIndex)
              }) === undefined) {
                this.textOut.recogWords.push({ word: opt.toLowerCase(), pos: activeCat.position + activeDis.position[activeDis.position.length - 1] + varField.indexOf(opt) + startIndex });
              }
              break;
            }
          }
        }
      }
    }
    return reRun;
  }

  // resets keywords of specified category
  resetCategory(category: Category) {
    category.position = -1;
    category.active = false;
    for (const keyword of category.keys) {
      keyword.position = -1;
      for (const vari of keyword.variables) {
        vari.varFound = [];
      }
      keyword.active = undefined;
    }
  }

  // gets position of a keyword in specified input string
  getIndex(key: Keyword2, input: string, glPos: number) {
    let tempPos: number = -1;
    let indSq = key.name.indexOf("[d]");
    if (indSq !== -1) {
      let reg;
      let match = key.name.replace("[d]", "").trim();
      console.log(match);
      if (indSq == 0) {
        reg = new RegExp("(\\d+(,\\d+)?)(?=\\s*" + match + ")", "mig");
        //reg = /(\d+(,\d+)?)(?=\s*\match)/mig
        console.log("reg");
        console.log(reg);
      } else {
        reg = new RegExp("(?<="+ match + "\\s)\\d+", "mig");
      }
      //let result = input.toLowerCase().search(reg);
      console.log("Look here");
      let result = input.toLowerCase().match(reg);
      console.log(result);
      if (result !== null) {
        let num = result[result.length - 1];
        //key.name = key.synonym.replace("[d]", res2[0]);
        key.synonym = key.name.replace("[d]", num);
        console.log(key.name.replace("[d]", num));
        //console.log(result);
      }
    }
    // gets index of latest appearance of synonym, if keyword is not in input, position = -1
    tempPos = input.toLowerCase().indexOf(key.synonym.toLowerCase());
    // adds keyword to array for correction mode, makes sure every keyword is only once in the array and no wrong synonyms
    let ind = this.textOut.recogWords.findIndex(el => {
      return ((el.pos + el.word.length) === (glPos + tempPos + key.synonym.length) && (el.word.length > key.synonym.length));
    });
    if (this.textOut.recogWords.find(el => {
      return (el.word === key.synonym.toLowerCase() && el.pos === glPos + tempPos);
    }) === undefined && tempPos !== -1 && ind === -1) {
      this.textOut.recogWords.push({ word: key.synonym.toLowerCase(), pos: glPos + tempPos });
      let ind2 = this.textOut.recogWords.findIndex(el => {
        return ((el.pos + el.word.length) === (glPos + tempPos + key.synonym.length) && (el.word.length < key.synonym.length));
      });
      ind2 !== -1 ? this.textOut.recogWords.splice(ind2, 1) : ind = ind;
    }

    while (input.toLowerCase().indexOf(key.synonym.toLowerCase(), tempPos + 1) !== -1) {
      tempPos = input.toLowerCase().indexOf(key.synonym.toLowerCase(), tempPos + 1);
    }
    return tempPos;
  }

  // finds the active category
  setDisease(input: string, diseases: Array<Disease>) {
    let activeDis: { disPos: number, disName: string } = { disPos: -1, disName: "" };
    // loops through all diseases
    for (let i = 0; i < diseases.length; i++) {
      // only for the first instance of every disease
      if (diseases[i].number == 1) {
        // computes next Instance
        let nextInstance = diseases.filter(disease => disease.name.indexOf(diseases[i].name) !== -1).length + 1;

        // checks if new intance should be created
        let addInstance = input.toLowerCase().indexOf(diseases[i].name.toLowerCase() + " " + nextInstance);
        // creates new instance
        if (addInstance !== -1) {
          // makes copie of instance number 1
          let copy: Disease = JSON.parse(JSON.stringify(diseases[i]));
          copy.number = nextInstance;
          copy.position.push(addInstance);
          copy.active = true;
          copy.firstTime = true;
          copy.name += " " + copy.number;
          copy.positionEnd = [];
          for (const cat of copy.categories) {
            this.resetCategory(cat);
          }
          // adds new instance in diseases array
          this.diseases.splice(i + nextInstance - 1, 0, copy);
          // adds new instance in textproduction
          this.textOut.addDisease(copy, i + nextInstance - 1);


        }
      }
      // checks what is the latest disease
      let tempPos: number = -1;
      tempPos = input.toLowerCase().indexOf(diseases[i].name.toLowerCase());
      while (input.toLowerCase().indexOf(diseases[i].name.toLowerCase(), tempPos + 1) !== -1) {
        tempPos = input.toLowerCase().indexOf(diseases[i].name.toLowerCase(), tempPos + 1);
      }
      // makes that "polyp 2" is not recognised as "polyp"
      if (tempPos !== -1 && ((tempPos + diseases[i].name.length) > (activeDis.disPos + activeDis.disName.length))) {
        activeDis.disPos = tempPos;
        activeDis.disName = diseases[i].name;
        /* console.log("distest");
        console.log(diseases[i].name);
        console.log(activeDis);
   */
      }
    }
    // sets active and position of latest disease
    if (diseases.find(dis => dis.name == activeDis.disName) != undefined) {
      for (const act of diseases) {
        if (act.name == activeDis.disName) {
          if (!act.position.includes(activeDis.disPos) && (act.positionEnd[act.position.length - 1] !== undefined || act.position === [])) {
            act.position.push(activeDis.disPos);
          }
          act.active = true;
          this.globalPos = activeDis.disPos;
          // pushes dis name to array for correction purpose later

          if (this.textOut.recogWords.find(el => {
            return (el.word.length >= activeDis.disName.length && el.pos === activeDis.disPos);
          }) === undefined) {
            this.textOut.recogWords.push({ word: activeDis.disName.toLowerCase(), pos: activeDis.disPos });
            let ind = this.textOut.recogWords.findIndex(el => {
              return ((el.pos === activeDis.disPos) && (el.word.length < activeDis.disName.length))
            });
            ind !== -1 ? this.textOut.recogWords.splice(ind, 1) : ind = ind;
          }
        } else if (act.active == true) {
          act.positionEnd.push(activeDis.disPos);
          let deleter = act.position.indexOf(activeDis.disPos);
          if (deleter !== -1) {
            act.position.splice(deleter, 1);
          }
          act.active = false;
        }
      }
      // return disease
      return diseases.find(dis => dis.name == activeDis.disName);
    } else {
      return undefined;
    }
  }


  // set the last category to active
  setCategory(input: string, dis: Array<Category>) {

    let activeCat: { tempPos: number, catName: string } = { tempPos: -1, catName: "" };

    // loop through categories
    for (const cat of dis) {
      let catPos: number = -1;
      // find latest occurence of one category
      catPos = input.toLowerCase().indexOf(cat.name.toLowerCase());
      while (input.toLowerCase().indexOf(cat.name.toLowerCase(), catPos + 1) != -1) {
        catPos = input.toLowerCase().indexOf(cat.name.toLowerCase(), catPos + 1);
      }
      // if it is the latest occurence of a category by now, assign its name to activeCat
      if (catPos > activeCat.tempPos) {
        activeCat.tempPos = catPos;
        activeCat.catName = cat.name;
      }
    }

    // sets active and position of latest category
    if (dis.find(dis => dis.name == activeCat.catName) != undefined) {
      dis.find(dis => dis.name == activeCat.catName).position = activeCat.tempPos;
      for (const act of dis) {
        if (act.name == activeCat.catName) {
          act.active = true;
        } else {
          act.active = false;
        }
      }
      // return category
      return dis.find(dis => dis.name == activeCat.catName);
    } else {
      return undefined;
    }
  }
}
