import { Injectable } from '@angular/core';
import * as M from '../model'
import { Keyword2, Category, Disease, MyVariable } from './text/Keyword';
import { TextOutputService } from './text-output.service';


@Injectable({
  providedIn: 'root'
})

export class InputParserService {

  constructor(private textOut: TextOutputService) {

  }
  // Contains whole Polyp with its Categories and Keywords inside of each Category
  diseases: Array<Disease> = [];
  // contains the input text
  twInput: { twInput: string, again: boolean } = { twInput: "", again: false };
  startingTime: Date;
  // finished?
  end: boolean = false;
  globalPos: number;


  /* --------------------------------
      Creating Dictionary
     --------------------------------
  */
  // Create a Dictionary (e.g. the polyp Object)
  createStartDict(rootEl: M.TopLevel[]) {
    //note starting time
    this.startingTime = new Date();
    let syns: string[];
    var keys: Keyword2[];
    var disName = "";
    // loops through all diseases and categories: Form, Lokalisierung...
    for (const El of rootEl) {
      //block indicates a new disease, every rootEl that follows is a category of it
      if (El.kind == "block") {
        disName = El.text;
        this.diseases.push({ name: disName, categories: [], active: false, number: 1, position: -1, firstTime: true });
      }
      keys = [];
      // indicates a new category
      if (El.kind == "category") {
        const categ = El.selectables[0];
        if (categ.kind == "group") {
          // loops through all options inside the categories, e.g. for "Form": Knospe, gestielt...
          for (const opt of categ.options) {
            //splits all the synonyms into an array
            syns = opt.data['bau'][0].split(';');
            for (const s of syns) {
              // adds a new possible Keyword based on the information from the excel table
              keys.push(this.createKeyword(opt, El, s));
            }
          }
        }
        // Adds a new category
        this.diseases.find(disease => disease.name == disName).categories.push({ keys: keys, name: El.name, active: false, position: -1 });
      }
    }
    //makes an entry for this disease in output data structure
    this.textOut.initDiseaseText(this.diseases);
    console.log(this.diseases);
  }

  // --------- Help methods for creating Dictionary ----------

  // sets default values for each keyword
  createKeyword(option: any, category: any, synonym: string) {
    let Vars: MyVariable[] = [];
    for (const vari of option.variables) {
      // if variable is like "links / rechts"
      if (vari.kind === "oc") {
        Vars.push({ kind: vari.kind, textBefore: undefined, textAfter: undefined, options: vari.values, varFound: [] });
        // if variable is like "bei..."
      } else if (vari.kind === "text") {
        let signalWord: Array<string> = [];
        // extracts ending word, for example [cm]
        signalWord.push(vari.textAfter.split('[').pop().split(']')[0]);
        let helpTextAfter = vari.textAfter.replace('[' + signalWord + ']', '');
        Vars.push({ kind: vari.kind, textBefore: vari.textBefore, textAfter: helpTextAfter, options: signalWord, varFound: [] })
      }
    }
    return {
      // assigning corresponding values
      name: option.name,
      synonym: synonym,
      variables: Vars,
      category: category.name,
      position: -1,
      active: undefined,
      text: option.text,
      buttonPos: -1,
      normal: option.normal
    };
  }




  /* --------------------------------
      Analyzing Input
     --------------------------------
  */



  // parses the input by calling different methods and writing/reading to/from the polyp object
  parseInput(input: string) {
    // checks if "ende" is called
    if (input.toLowerCase().indexOf(" ende") !== -1) {
      // switches to correction mode
      let main = document.getElementsByClassName("main")[0].classList
      main.remove("main");
      main.add("report");
      let signalButton = document.getElementById("listening");
      signalButton.classList.remove("btn-success");
      signalButton.classList.add("btn-danger");
      signalButton.innerText = "Aus";
      this.end = true;
      // if ende is not called yet
    } else {
      this.twInput.twInput = input;
      // gets currently active Disease
      let activeDis = this.setDisease(input, this.diseases);
      if (activeDis != undefined) {
        // Checks if Category name contains Disease name, which produces an error
        let disPosLast = activeDis.position + activeDis.name.length;
        if ((disPosLast != input.length) && input.charAt(disPosLast) !== " ") {
          let tempInput = input.substr(0, activeDis.position) + input.substr(disPosLast + 1);
          activeDis = this.setDisease(tempInput, this.diseases);
        }

        // only look for categories at what comes after the last disease
        let input2 = input.substring(activeDis.position);
        // checks which category is active and where in the input field it occurs
        let activeCat = this.setCategory(input2, activeDis.categories);
        // if one active category is detected, it's active value is set to true, all others to false
        if (activeCat != undefined) {
          // pushes dis name to array for correction purpose later
          if (this.textOut.recogWords.find(el => {
            return (el.word.length >= activeCat.name.length && el.pos === activeCat.position + activeDis.position);
          }) === undefined) {
            this.textOut.recogWords.push({ word: activeCat.name.toLowerCase(), pos: activeDis.position + activeCat.position });
            let ind = this.textOut.recogWords.findIndex(el => {
              return ((el.pos === activeCat.position + activeDis.position) && (el.word.length < activeCat.name.length))
            });
            ind !== -1 ? this.textOut.recogWords.splice(ind, 1) : ind = ind;
          }

          // Evaluate only the input that comes after the last category
          input2 = input2.substring(activeCat.position);
          // Find out which keywords occur in the input2
          for (const key of activeCat.keys) {
            key.position = this.getIndex(key.synonym, input2, activeCat.position + activeDis.position);
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
          let reRun = this.getActivesAndVariables(activeCat.keys, input2, activeDis, activeCat);
          // checks if the guide is still necessary
          this.twInput.again = reRun;
          // produces text output
          let text = this.textOut.makeReport(activeCat, activeDis, this.startingTime);
          // Test log
          const index = activeDis.categories.findIndex(cat => cat.name === activeCat.name);
          console.log("IndexTest");
          console.log(this.diseases);
          console.log(index);
          // return output text
          return text
          // if no category is active yet and a new disease was just created
        } else if (activeDis.firstTime) {
          // automatically goes into first category when disease is called
          let firstCatName = activeDis.categories[0].name;
          this.twInput.twInput += " " + firstCatName + " ";
          this.twInput.again = true;
          activeDis.firstTime = false;
        }
        console.log("KeyTest");
        console.log(this.diseases);

      }
    }
    // no text when no category is activated
    let text2 = this.textOut.makeReport(undefined, undefined, this.startingTime);
    return text2;

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
            console.log("RestNormalCheck");
            console.log(key.name);
          }
        }
        // make additional report
        this.textOut.makeReport(cat, disease, this.startingTime);
      }
    }
  }

  /* // only for buttons, currently disabled
  radioClicked(buttonPos: number, keyName: string, category: string){
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
    // Filter for all buttons that were pressed and sort them by order !!! todo
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
    var activeKeys = allKeywords.filter(activeKey => activeKey.position != -1).sort((a, b) => a.position - b.position);
    var reRun = false;
    // Searches for Signal Variable Text (Text Before) between corresponding keyword and next active Variable
    for (let i = 0; i < activeKeys.length; i++) {
      activeKeys[i].active = activeKeys[i].name;
      const index = activeDis.categories.findIndex(cat => cat.name === activeCat.name);
      let lastKey = (activeDis.categories[activeDis.categories.length - 1].keys.find(key => key.position !== -1));
      //checks if there is a variable and if whether it is already used
      let guided: boolean;
      if (lastKey !== undefined) {
        if (lastKey.variables.length > 0) {
          if (lastKey.variables[lastKey.variables.length - 1].varFound.length !== 0) {
            guided = true;
          } else {
            guided = false;
          }
        } else {
          guided = true;

        }
      } else {
        guided = false;
      }
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
            console.log("Regex");
            console.log(reg);
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
                return (el.word === varInp.trim().toLowerCase() && el.pos === activeCat.position + activeDis.position + tbPos + variable.textBefore.length + startIndex)
              }) === undefined && ((varInp.search(reg)) !== -1)) {
                this.textOut.recogWords.push({ word: varInp.trim().toLowerCase(), pos: activeCat.position + activeDis.position + tbPos + variable.textBefore.length + startIndex });
              }
            } else {
              variable.varFound[0] = variable.textBefore + varField.slice(tbPos + variable.textBefore.length) + variable.textAfter;
            }
            // pushes text before to array for correction purpose later
            if (this.textOut.recogWords.find(el => {
              return (el.word === variable.textBefore.trim().toLowerCase() && el.pos === activeCat.position + activeDis.position + tbPos + startIndex)
            }) === undefined) {
              this.textOut.recogWords.push({ word: variable.textBefore.trim().toLowerCase(), pos: activeCat.position + activeDis.position + tbPos + startIndex });
            }

          } else {
            // Automatically gets you to the next variable if valid Attribute is entered
            if (index <= activeDis.categories.length - 1 && activeKeys[i].position !== 0 && !guided) {
              this.twInput.twInput += " " + variable.textBefore;
              reRun = true;
            }
          }
        }
        // same as before with "choosing variables", e.g. "links / rechts"
        if (variable.kind === "oc" && !varStarted) {
          done = false;
          varStarted = true;
          for (const opt of variable.options) {
            if (varField.indexOf(opt) != -1) {
              variable.varFound[0] = opt;
              done = true;
              varStarted = false;
              if (this.textOut.recogWords.find(el => {
                return (el.word === opt.toLowerCase() && el.pos === activeCat.position + activeDis.position + varField.indexOf(opt) + startIndex)
              }) === undefined) {
                this.textOut.recogWords.push({ word: opt.toLowerCase(), pos: activeCat.position + activeDis.position + varField.indexOf(opt) + startIndex });
              }
              break;
            }
          }
        }
      }
      // if all variables are done and not every category is already done, get to the next category
      if (index < activeDis.categories.length - 1 && activeKeys[i].position !== 0 && !guided) {
        let polypektomie = true;
        // if keine abtragung is chosen, dont even go to komplikationen or gefäß
        if (activeCat.name === "Polypektomie") {
          polypektomie = (activeKeys[i].name !== "keine Abtragung");
        }
        if ((done || activeKeys[i].variables.length === 0) && polypektomie) {
          let nextCatName = activeDis.categories[index + 1].name;
          console.log("nextCat");
          console.log(nextCatName);
          this.twInput.twInput += " " + nextCatName;
          reRun = true;
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
  getIndex(keySyn: string, input: string, glPos: number) {
    let tempPos: number = -1;
    // gets index of latest appearance of synonym, if keyword is not in input, position = -1
    tempPos = input.toLowerCase().indexOf(keySyn.toLowerCase());
    // adds keyword to array for correction mode, makes sure every keyword is only once in the array and no wrong synonyms
    let ind = this.textOut.recogWords.findIndex(el => {
      return ((el.pos + el.word.length) === (glPos + tempPos + keySyn.length) && (el.word.length > keySyn.length));
    });
    let ind3 = this.textOut.recogWords.findIndex(el => {
      return ((el.pos) === (glPos + tempPos) && el.word.length > keySyn.length);
    });
    if (this.textOut.recogWords.find(el => {
      return (el.word === keySyn.toLowerCase() && el.pos === glPos + tempPos);
    }) === undefined && tempPos !== -1 && ind === -1 && ind3 === -1) {
      this.textOut.recogWords.push({ word: keySyn.toLowerCase(), pos: glPos + tempPos });
      let ind2 = this.textOut.recogWords.findIndex(el => {
        return ((el.pos + el.word.length) === (glPos + tempPos + keySyn.length) && (el.word.length < keySyn.length));
      });
      let ind4 = this.textOut.recogWords.findIndex(el => {
        return ((el.pos) === (glPos + tempPos) && (el.word.length < keySyn.length));
      });
      ind4 !== -1 ? this.textOut.recogWords.splice(ind4, 1) : ind = ind;
      ind2 !== -1 ? this.textOut.recogWords.splice(ind2, 1) : ind = ind;
    }

    while (input.toLowerCase().indexOf(keySyn.toLowerCase(), tempPos + 1) !== -1) {
      tempPos = input.toLowerCase().indexOf(keySyn.toLowerCase(), tempPos + 1);
    }
    return tempPos;
  }

  // finds the active disease
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
          copy.position = addInstance;
          copy.active = true;
          copy.firstTime = true;
          copy.name += " " + copy.number;
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
      }
    }
    // sets active and position of latest disease
    if (diseases.find(dis => dis.name == activeDis.disName) != undefined) {
      diseases.find(dis => dis.name == activeDis.disName).position = activeDis.disPos;
      for (const act of diseases) {
        if (act.name == activeDis.disName) {
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
        } else {
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

    // loop throught categories
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
