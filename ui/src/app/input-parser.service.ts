import { Injectable, Input } from '@angular/core';
import * as M from './model'
import { Keyword2, Category, Disease } from './text/Keyword';
import { TextOutputService } from './text-output.service';


@Injectable({
  providedIn: 'root'
})

export class InputParserService {

  
  
  constructor(private textOut: TextOutputService){

  }
  // (currently not used: only when all keywords can occurr simultaneously)
  keywords: Array<Keyword2> = [];
  // Contains whole Polyp with its Categories and Keywords inside of each Category 
  polyp: Array<Category> = [];

  normalKeys: Array<Keyword2> = [];

  diseases: Array<Disease> = [];

  twInput: {twInput: string, again: boolean} = {twInput: "", again: false};
  

 
  /* --------------------------------
      Creating Dictionary
     --------------------------------
  */
  // Create a Dictionary (e.g. the polyp Object)
  createStartDict(rootEl: M.TopLevel[]){
    let syns: string[];
    var keys: Keyword2[];
    var disName = "";
    // loops through all 5 categories: Form, Lokalisierung...
    for (const El of rootEl){
      if(El.kind == "block"){
        disName = El.text;
        this.diseases.push({name: disName, categories: [], active: false, number: 1, position: -1 });
      }
      keys = [];
      if(El.kind == "category"){
        const categ = El.selectables[0];
        if(categ.kind == "group"){
          // loops through all options inside the categories, e.g. for "Form": Knospe, gestielt...
          for (const opt of categ.options){
            syns = opt.data['bau'][0].split(';');
              for(const s of syns){
              // adds a new possible Keyword based on the information from the excel table
             keys.push(this.createKeyword(opt,El,s));
            }
          }
        }
        // Adds a new category 
        this.diseases.find(disease => disease.name == disName).categories.push({keys: keys, name: El.name, active: false, position: -1});
        //this.polyp.push({keys: keys, name: El.name, active: false});
      }
    }
    this.textOut.initDiseaseText(this.diseases);
    console.log(this.diseases);
  }

  // --------- Help methods for creating Dictionary ----------

/*   addKeyword(keywords: any, option : any, category: any, synonym: string){
    this.keywords.push({
      // assigning corresponding values
      name: option.name,
      synonym: synonym,
      // conditional tests whether keyword can have a variable or not
      VarType: option.variables.length!=0 ? option.variables[0].kind : undefined,
      TextAfter: option.variables.length!=0 ? option.variables[0].textAfter : undefined,
      TextBefore:  option.variables.length!=0 ? option.variables[0].textBefore : undefined,
      category: category.name,
      position: undefined,
      VarFound: undefined
    })
  } */

  // sets default values for each keyword
  createKeyword(option : any, category: any, synonym: string){
      return  {
        // assigning corresponding values
        name: option.name,
        synonym: synonym,
        // conditional tests whether keyword can have a variable or not
        VarType: option.variables.length!=0 ? option.variables[0].kind : undefined,
        TextAfter: option.variables.length!=0 ? option.variables[0].textAfter : undefined,
        TextBefore:  option.variables.length!=0 ? option.variables[0].textBefore : undefined,
        category: category.name,
        position: -1,
        VarFound: [],
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
 parseInput(input: string){
  this.twInput.twInput = input;
  let activeDis = this.setDisease(input, this.diseases);
  if(activeDis != undefined){
    // Checks if Category name contains Disease name, which produces an error
    let disPosLast = activeDis.position+activeDis.name.length;
    if((disPosLast != input.length) && input.charAt(disPosLast) !== " "){
        
        let tempInput = input.substr(0,activeDis.position) + input.substr(disPosLast+1);
        activeDis = this.setDisease(tempInput, this.diseases);
    }
    // only look for categories at what comes after the last disease
    let input2 = input.substring(activeDis.position);
    //let actDis = this.diseases.find(dis => dis.active == true);
    //enables the rest normal method
    if(input2.toLowerCase().indexOf("rest normal") != -1){
      this.restNormal(activeDis);   
    }
    // checks which category is active and where in the input field it occurs
    let activeCat =  this.setCategory(input2, activeDis.categories );
    // if one active category is detected, it's active value is set to true, all others to false
    if(activeCat != undefined){
      
      // Evaluate only the input that comes after the last category
      input2 = input2.substring(activeCat.position);
      // Autocorrect words
      input2 = this.autocorrect(input2);
      // Find out which keywords occur in the input2
      for(const key of activeCat.keys){
        key.position = this.getIndex(key.synonym, input2);
      }
      // if a keyword is addressed by different synonyms, the synonym with the latest appearance has to be used
      // (currently not used: Also responsible for button clicks)
      this.onlyLatestKeyword(activeCat.keys);
      // if a category is addressed by different keywords, the keyword with the lastest appearance has to be used
      // Also check which keywords have variables and if the occurr in the input2
      let reRun = this.getActivesAndVariables(activeCat.keys, input2, activeDis, activeCat);
      this.twInput.again = reRun;
      // produces text output 
      let text = this.textOut.makeReport(activeCat, activeDis);


      // Test Log
      
      const index = activeDis.categories.findIndex(cat => cat.name === activeCat.name);
      console.log("IndexTest");
      console.log(this.diseases);
      console.log(index);
      return text
     //return {report: text, twInput: input};
  
    }
  console.log("KeyTest");
  console.log(this.diseases);
  }
  // no text when no category is activated
  let text2 = this.textOut.makeReport(undefined, undefined);
  return text2;
}

// sets all unused categories of one disease to its normal keywords
restNormal(disease: Disease){
  // loops through all categories
  for(const cat of disease.categories){
    // if category is unused
    if(cat.keys.find(key => key.position !== -1) == undefined){
      // find normal keyword and set it 
      for(const key of cat.keys){
        if(key.normal == true && key.name == key.synonym){
          key.active = key.name;
          key.position = 0;
        }
      }
      // make additional report
      this.textOut.makeReport(cat, disease);
    }
  }
}

// only for buttons, currently disabled
radioClicked(buttonPos: number, keyName: string, category: string){
  // Only one button of each category may be active at the same time
  for (const key of this.keywords.filter(key => key.category == category)){
    if(key.name == keyName){
      key.buttonPos = buttonPos;
    } else {
      key.buttonPos = -1;
    }
  }
}


// find only the latest keyword of one category
onlyLatestKeyword(keys: Array<Keyword2>){

  // Filter Keywords for the active ones and sort them by their position in the input
  let activeKeys = keys.filter(activeKey => activeKey.position != -1).sort((a,b) => b.position-a.position);
  // From all active Keywords with the same category, only the one with the latest position stays active.
  for (let i = 0; i<activeKeys.length-1; i++){
    if((activeKeys[i].position) > (activeKeys[i+1].position)+ activeKeys[i+1].synonym.length-1){
      while(activeKeys[i+1] != undefined){
        activeKeys[i+1].position = -1;
        activeKeys.splice(i+1,1);
      }
    } else {
      activeKeys[i].position = -1;
    }
  }
  // currently disabled
  // Filter for all buttons that were pressed and sort them by order !!! todo
  let activeButtons = keys.filter(activeKey => activeKey.buttonPos != -1).sort((a,b) => a.buttonPos-b.buttonPos);
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
  }

}


getActivesAndVariables(allKeywords: Array<Keyword2>, input: string, activeDis: Disease, activeCat: Category){
  // Filters for all Keywords, that are active in input and sorts them by index
  var activeKeys = allKeywords.filter(activeKey => activeKey.position != -1).sort((a,b) => a.position-b.position);
  var reRun = false;
  // Searches for Signal Variable Text (Text Before) between corresponding keyword and next active Variable
  for(let i = 0; i<activeKeys.length; i++){
    activeKeys[i].active = activeKeys[i].name;
    const index = activeDis.categories.findIndex(cat => cat.name === activeCat.name);
    console.log("CheckActiveKeys");
    console.log(activeKeys);
    //if(activeKeys[i].VarType != undefined){
      let endIndex : number;
      let activeVar = -1;
      if(i == activeKeys.length-1){
        endIndex = input.length;
      } else {
        endIndex = activeKeys[i+1].position-1;
      }
      let startIndex = activeKeys[i].position + activeKeys[i].synonym.length+1;
      let varField = input.slice(startIndex, endIndex).toLowerCase();

      if(activeKeys[i].TextBefore != undefined){
        //for(let j = 0; j<activeKeys[i].TextBefore.split(';').length; j++){
        for(let j = 0; j<1; j++){

          let tb = activeKeys[i].TextBefore.split(';');
          let ta = activeKeys[i].TextAfter.split(';');
          activeVar = varField.indexOf(tb[j].toLowerCase());
          console.log("VarTest");
          console.log(activeVar);
      
          if( activeVar != -1){
            let varStart = activeVar + tb[j].length;
            // decides what combination of characters ends variable input
            activeKeys[i].VarFound[j] = (tb[j] + varField.slice(varStart, varField.search(/[cm]m/)+2) + ta[j]);
            
            
            // Automatically gets you to the next Categorie if valid Attribute is entered
            if(index < activeDis.categories.length-1 && varField.search(/[cm]m/) !== -1){
              let nextCatName = activeDis.categories[index+1].name;
              this.twInput.twInput += " " + nextCatName + " ";
              reRun = true;
            }
          }
          else {
            activeKeys[i].VarFound[j] = undefined;
          }
        } 
      } else {
        // Automatically gets you to the next Categorie if valid Attribute is entered
        if(index < activeDis.categories.length-1){
          let nextCatName = activeDis.categories[index+1].name;
          this.twInput.twInput += " " + nextCatName + " ";
          reRun = true;

        }
      }
      //Zusatz Function for every attribute, not needed when automatic categories iterating is active
      /* let str = "Zusatz";
      activeVar = varField.indexOf(str.toLowerCase());
      if(activeVar != -1){
        let varStart = activeVar + str.length;
        // decides what combination of characters ends variable input
        activeKeys[i].VarFound[1] = "Zusatz:" + varField.slice(varStart, varField.search(/fertig/)-1) + ". ";
      } */
    //}
  }
  // same procedure for last element of activeKeys
  /* if(activeKeys.length >=1){
  activeKeys[activeKeys.length-1].active = activeKeys[activeKeys.length-1].name;
  if(activeKeys[activeKeys.length-1].VarType != undefined){
    let endIndex = input.length;
    let startIndex = activeKeys[activeKeys.length-1].position + activeKeys[activeKeys.length-1].synonym.length+1;
    let varField = input.slice(startIndex, endIndex).toLowerCase();
    let activeVar = varField.indexOf(activeKeys[activeKeys.length-1].TextBefore.toLowerCase());
      if( activeVar != -1){
        let varStart = activeVar + activeKeys[activeKeys.length-1].TextBefore.length;
        // decides what combination of characters ends variable input
        activeKeys[activeKeys.length-1].VarFound = varField.slice(varStart, varField.search(/[cm]m/)+2);  
      }
    }
  } */
  // (currently not used: only when all keywords can be used as input simultaneously)
  /* let mainKeys = allKeywords.filter((mainKey => mainKey.synonym == mainKey.name));
  for (const key of activeKeys){
    for (const main of mainKeys){
      if (key.name == main.name){
        main.active = key.name;
      }
    }
  } */

  return reRun;
}

// resets keywords of specified category
resetCategory(category: Category){
  category.position = -1;
  category.active = false;
  for (const keyword of category.keys){
    keyword.position = -1;
    keyword.VarFound = [];
    keyword.active = undefined;
  }
}

// gets position of a keyword in specified input string
getIndex(keySyn: string, input:string){
  let tempPos : number = -1;
  // gets index of latest appearance of synonym, if keyword is not in input, position = -1
  tempPos = input.toLowerCase().indexOf(keySyn.toLowerCase());
    while (input.toLowerCase().indexOf(keySyn.toLowerCase(), tempPos+1) !==-1){
      tempPos = input.toLowerCase().indexOf(keySyn.toLowerCase(), tempPos+1);
    }
  return tempPos;
}

// finds the active category
setDisease(input: string, diseases: Array<Disease>){
  let activeDis: {disPos: number, disName: string} = {disPos: -1, disName: ""};
  // loops through all diseases
  for(let i = 0; i<diseases.length; i++){
    // only for the first instance of every disease
    if(diseases[i].number == 1){
      // computes next Instance
      let nextInstance = diseases.filter(disease => disease.name.indexOf(diseases[i].name) !== -1).length +1;
      /* console.log("nextInst");
      console.log(diseases[i].name);
      console.log(nextInstance); */
      // checks if new intance should be created
      let addInstance = input.toLowerCase().indexOf(diseases[i].name.toLowerCase() + " " + nextInstance);
      // creates new instance
      if(addInstance !== -1){
        // makes copie of instance number 1
        let copy : Disease = JSON.parse(JSON.stringify(diseases[i]));
        copy.number = nextInstance;
        copy.position = addInstance;
        copy.active = true;
        copy.name += " " + copy.number;
        for(const cat of copy.categories){
          this.resetCategory(cat);
        }
        // adds new instance in diseases array
        this.diseases.splice(i+nextInstance-1, 0, copy);
        // adds new instance in textproduction
        this.textOut.addDisease(copy, i+nextInstance-1);
        

      }
    }
    // checks what is the latest disease
    let tempPos: number = -1;
    tempPos = input.toLowerCase().indexOf(diseases[i].name.toLowerCase());
    while (input.toLowerCase().indexOf(diseases[i].name.toLowerCase(), tempPos+1) !== -1){
      tempPos = input.toLowerCase().indexOf(diseases[i].name.toLowerCase(), tempPos+1);
    }
    // makes that "polyp 2" is not recognised as "polyp" 
    if(tempPos !== -1 && ((tempPos+diseases[i].name.length) > (activeDis.disPos + activeDis.disName.length))){
      activeDis.disPos = tempPos;
      activeDis.disName = diseases[i].name;
      /* console.log("distest");
      console.log(diseases[i].name);
      console.log(activeDis);
 */
    }
  }
  // sets active and position of latest disease
  if(diseases.find(dis => dis.name == activeDis.disName) != undefined){
    diseases.find(dis => dis.name == activeDis.disName).position = activeDis.disPos;
    for(const act of diseases){
      if(act.name == activeDis.disName){
        act.active = true;
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
setCategory(input:string, dis: Array<Category>){
  
  let activeCat: {tempPos: number, catName: string} = {tempPos: -1, catName: ""};
  
  // loop throught categories
  for(const cat of dis){
    let catPos: number = -1;
    // find latest occurence of one category
    catPos = input.toLowerCase().indexOf(cat.name.toLowerCase());
    while (input.toLowerCase().indexOf(cat.name.toLowerCase(), catPos+1) != -1){
      catPos = input.toLowerCase().indexOf(cat.name.toLowerCase(), catPos+1);
    }
    // if it is the latest occurence of a category by now, assign its name to activeCat
    if(catPos > activeCat.tempPos){
      activeCat.tempPos = catPos;
      activeCat.catName = cat.name;
    }
  }

   // sets active and position of latest category
  if(dis.find(dis => dis.name == activeCat.catName) != undefined){
    dis.find(dis => dis.name == activeCat.catName).position = activeCat.tempPos;
    for(const act of dis){
      if(act.name == activeCat.catName){
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


// this algorithm computes by how many insertions, deletions oder substitutes two words differ from each other
// it is used for autocorrect()
levenshtein_2(a: string, b: string): number {
  const an = a ? a.length : 0;
  const bn = b ? b.length : 0;
  if (an === 0) {
    return bn;
  }
  if (bn === 0) {
    return an;
  }
  const matrix = new Array<number[]>(bn + 1);
  for (let i = 0; i <= bn; ++i) {
    let row = matrix[i] = new Array<number>(an + 1);
    row[0] = i;
  }
  const firstRow = matrix[0];
  for (let j = 1; j <= an; ++j) {
    firstRow[j] = j;
  }
  for (let i = 1; i <= bn; ++i) {
    for (let j = 1; j <= an; ++j) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      }
      else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1], // substitution
          matrix[i][j - 1], // insertion
          matrix[i - 1][j] // deletion
        ) + 1;
      }
    }
  }
  return matrix[bn][an];
};


// autocorrects inputs
autocorrect(inputString: string): string {
  let result = inputString;
  let words = new Set<string>();
  for (const w of this.keywords) {
    let temp = w.synonym.split(" ");
    for (const t of temp) {
      words.add(t)
    }
  }
  let wordsArray: string[] = Array.from(words);
  let inpA = inputString.split(" ");
  for (const t of inpA) {
    // Words with 5 to 8 letters may differ from keyword by 1 letter
    if (t.length >= 5 && t.length < 8) {
      let temp = new Array();
      for (const w of wordsArray) {
        if (this.levenshtein_2(t.toLowerCase(), w.toLowerCase()) === 1) {
          temp.push(w.trim());
        }
        else if (this.levenshtein_2(t.toLowerCase(), w.toLowerCase()) === 0) {
          temp = [];
          break;
        }
      }
      if (temp.length >= 1) {
        result = result.replace(t, temp[0]);
      }
    }
    // Words with more than 9 letters may differ from keyword by 2 letters
    else if (t.length >= 9) {
      let temp = new Array();
      for (const w of wordsArray) {
        if (this.levenshtein_2(t.toLowerCase(), w.toLowerCase()) === 1 || this.levenshtein_2(t.toLowerCase(), w.toLowerCase()) === 2) {
          temp.push(w.trim());
        }
        else if (this.levenshtein_2(t.toLowerCase(), w.toLowerCase()) === 0) {
          temp = [];
          break;
        }
      }
      if (temp.length >= 1) {
        result = result.replace(t, temp[0]);
      }
    }
  }
  return result;
}
 


  



  


}
