import { Injectable, Input } from '@angular/core';
import * as M from './model'
import { Keyword2, Category } from './text/Keyword';
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
  

 
  /* --------------------------------
      Creating Dictionary
     --------------------------------
  */
  // Create a Dictionary (e.g. the polyp Object)
  createStartDict(rootEl: M.TopLevel[]){
    let syns: string[];
    var keys: Keyword2[];
    // loops through all 5 categories: Form, Lokalisierung...
    for (const El of rootEl){
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
        this.polyp.push({keys: keys, name: El.name, active: false});
      }
    }
    console.log(this.polyp);
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
        VarFound: undefined,
        active: undefined,
        text: option.text,
        buttonPos: -1,
      };
  }




  /* --------------------------------
      Analyzing Input
     --------------------------------
  */



 // parses the input by calling different methods and writing/reading to/from the polyp object
 parseInput(input: string){
  // checks which category is active and where in the input field it occurs
  let activeCat: {tempPos: number, catName: string} =  this.setCategory(input, this.polyp);
  // if one active category is detected, it's active value is set to true, all others to false
  if(activeCat.catName.length != 0){
    for(const act of this.polyp){
      if(act.name == activeCat.catName){
        act.active = true;
      } else {
        act.active = false;
      }
    }
    // resets Keywords that belong to the active category
    this.resetKeywords(activeCat.catName);
    // Evaluate only the input that comes after the last category
    input = input.substring(activeCat.tempPos);
    // Autocorrect words
    input = this.autocorrect(input);
    // Find out which keywords occur in the input
    let active = this.polyp.find(cat=> cat.name == activeCat.catName);
    for(const key of active.keys){
      key.position = this.getIndex(key.synonym, input);
    }
    // if a keyword is addressed by different synonyms, the synonym with the latest appearance has to be used
    // (currently not used: Also responsible for button clicks)
    this.onlyLatestKeyword(active.keys);
    // if a category is addressed by different keywords, the keyword with the lastest appearance has to be used
    // Also check which keywords have variables and if the occurr in the input
    let dummy = this.getActivesAndVariables(active.keys, input);
    
    // Test Log
    console.log("KeyTest");
    console.log(this.polyp);
 
  }
}

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



onlyLatestKeyword(keys: Array<Keyword2>){
// Loop through all Categories

  // Filter Keywords for the active ones and sort them by their position in the input
  let activeKeys = keys.filter(activeKey => activeKey.position != -1).sort((a,b) => a.position-b.position);
  // From all active Keywords with the same category, only the one with the latest position stays active.
  for (let i = 0; i<activeKeys.length-1; i++){
    if((activeKeys[i].position + activeKeys[i].synonym.length-1) < activeKeys[i+1].position){
      activeKeys[i].position = -1;
    } else {
      activeKeys[i+1].position = -1;
      activeKeys.splice(i+1,1);
    }
  }

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


getActivesAndVariables(allKeywords: any, input: string){
  // Filters for all Keywords, that are active in input and sorts them by index
  var activeKeys = allKeywords.filter(activeKey => activeKey.position != -1).sort((a,b) => a.position-b.position);
  // Searches for Signal Variable Text (Text Before) between corresponding keyword and next active Variable
  for(let i = 0; i<activeKeys.length-1; i++){
    activeKeys[i].active = activeKeys[i].name;
    if(activeKeys[i].VarType != undefined){
      let endIndex = activeKeys[i+1].position-1;
      let startIndex = activeKeys[i].position + activeKeys[i].synonym.length+1;
      let varField = input.slice(startIndex, endIndex);
      let activeVar = varField.indexOf(activeKeys[i].TextBefore);
      if( activeVar != -1){
        let varStart = activeVar + activeKeys[i].TextBefore.length;
        // decides what combination of characters ends variable input
        activeKeys[i].VarFound = varField.slice(varStart, varField.search(/[cm]/)+2);  
      }
    }
  }
  // same procedure for last element of activeKeys
  if(activeKeys.length >=1){
  activeKeys[activeKeys.length-1].active = activeKeys[activeKeys.length-1].name;
  if(activeKeys[activeKeys.length-1].VarType != undefined){
    let endIndex = input.length;
    let startIndex = activeKeys[activeKeys.length-1].position + activeKeys[activeKeys.length-1].synonym.length+1;
    let varField = input.slice(startIndex, endIndex);
    let activeVar = varField.indexOf(activeKeys[activeKeys.length-1].TextBefore);
      if( activeVar != -1){
        let varStart = activeVar + activeKeys[activeKeys.length-1].TextBefore.length;
        // decides what combination of characters ends variable input
        activeKeys[activeKeys.length-1].VarFound = varField.slice(varStart, varField.search(/[cm]/)+2);  
      }
    }
  }
  // (currently not used: only when all keywords can be used as input simultaneously)
  let mainKeys = allKeywords.filter((mainKey => mainKey.synonym == mainKey.name));
  for (const key of activeKeys){
    for (const main of mainKeys){
      if (key.name == main.name){
        main.active = key.name;
      }
    }
  }

  return activeKeys;
}

// resets keyword of specified category
resetKeywords(category: string){
  for (const keyword of this.polyp.filter(cat => cat.name == category)[0].keys){
    keyword.position = undefined;
    keyword.VarFound = undefined;
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

setCategory(input:string, polyp: Array<Category>){
  // set the last category to active
  let activeCat: {tempPos: number, catName: string} = {tempPos: -1, catName: ""};
  
  // loop throught categories
  for(const cat of polyp){
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
  return activeCat;
  
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
