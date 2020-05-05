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




  keywords:{name: string, synonym: string,  VarType: string, TextAfter: string, TextBefore:string, category: string,
            position: number, active: string, VarFound: string, text: string, buttonPos :number}[] = [];
  
  finalKeys:{name: string, synonym: string,  VarType: string, TextAfter: string, TextBefore:string, category: string,
            position: number, active: string, VarFound: string, text: string, buttonPos :number}[] = []; 
  
  polyp: Array<Category> = [];
  

 
  /* --------------------------------
      Creating Dictionary
     --------------------------------
  */

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
            //  this.addKeyword(this.keywords, opt, El, s);
            }
          }
        }
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
        position: undefined,
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



 
 parseInput(input: string){
  let activeCat: {tempPos: number, catName: string} =  this.setCategory(input, this.polyp);
  if(activeCat.catName.length != 0){
    this.resetKeywords(activeCat.catName);
    input = input.substring(activeCat.tempPos);
    input = this.autocorrect(input);
    let active = this.polyp.find(cat=> cat.name == activeCat.catName);
    for(const key of active.keys){
      key.position = this.getIndex(key.synonym, input);
    }
    

  
    // if a keyword category is addressed by different synonyms or names, the name or synonym with the latest appearance has to be used
  this.onlyLatestKeyword(this.polyp);

  /*  console.log("Test_Indices");
    console.log(this.keywords); */
    /* this.finalKeys.push({name: "hey", synonym: "hey", VarType: "hey", TextAfter: "hey",
    TextBefore: "hey", category: "hey", position: 0, active: "hey", VarFound: "hey",}) */
  let dummy = this.getActivesAndVariables(this.keywords, input);
    //console.log(this.finalKeys);
  // this.makeReport(this.keywords);
  console.log("KeyTest");
  console.log(this.keywords);
 
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



onlyLatestKeyword(polyp: Array<Category>){
// Loop through all Categories
for (const cat of polyp){
  // Filter Keywords for the active ones and sort them by their position in the input
  let activeKeys = cat.keys.filter(activeKey => activeKey.position != -1).sort((a,b) => a.position-b.position);
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
  let activeButtons = cat.keys.filter(activeKey => activeKey.buttonPos != -1).sort((a,b) => a.buttonPos-b.buttonPos);
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
        activeKeys[i].VarFound = varField.slice(varStart, varField.search(/[.]/)+1);  
      }
    }
  }
  if(activeKeys.length >=1){
  activeKeys[activeKeys.length-1].active = activeKeys[activeKeys.length-1].name;
  if(activeKeys[activeKeys.length-1].VarType != undefined){
    let endIndex = input.length;
    let startIndex = activeKeys[activeKeys.length-1].position + activeKeys[activeKeys.length-1].synonym.length+1;
    let varField = input.slice(startIndex, endIndex);
    let activeVar = varField.indexOf(activeKeys[activeKeys.length-1].TextBefore);
      if( activeVar != -1){
        let varStart = activeVar + activeKeys[activeKeys.length-1].TextBefore.length;
        activeKeys[activeKeys.length-1].VarFound = varField.slice(varStart, varField.search(/[.]/)+1);  
      }
    }
  }
  let mainKeys = allKeywords.filter((mainKey => mainKey.synonym == mainKey.name));
  for (const key of activeKeys){
    for (const main of mainKeys){
      if (key.name == main.name){
        main.active = key.name;
      }
    }
    this.finalKeys.push(key);
  }

  return activeKeys;
}

resetKeywords(category: string){
  for (const keyword of this.polyp.filter(cat => cat.name == category)[0].keys){
    keyword.position = undefined;
    keyword.VarFound = undefined;
    keyword.active = undefined;
  }
}

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
    while (input.toLowerCase().indexOf(cat.name.toLowerCase(), catPos+1) !==-1){
      activeCat.tempPos = input.toLowerCase().indexOf(cat.name.toLowerCase(), catPos+1);
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
