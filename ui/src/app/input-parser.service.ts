import { Injectable } from '@angular/core';
import * as M from './model'
import { Keyword } from './text/Keyword';


@Injectable({
  providedIn: 'root'
})

export class InputParserService {

  
  
  constructor(){

  }




  keywords:{name: string, synonym: string,  VarType: string, TextAfter: string, TextBefore:string, category: string,
            position: number, VarFound: string[]}[] = [];

 
  /* --------------------------------
      Creating Dictionary
     --------------------------------
  */

  createStartDict(rootEl: M.TopLevel[]){
    let syns: string[];
    // loops through all 5 categories: Form, Lokalisierung...
    for (const El of rootEl){
      if(El.kind == "category"){
        const categ = El.selectables[0];
        if(categ.kind == "group"){
          // loops through all options inside the categories, e.g. for "Form": Knospe, gestielt...
          for (const opt of categ.options){
            syns = opt.data['bau'][0].split(';');
              for(const s of syns){
              // adds a new possible Keyword based on the information from the excel table
              this.keywords.push(this.createKeyword(opt,El,s));
            //  this.addKeyword(this.keywords, opt, El, s);
            }
          }
        }
      }
    }
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
        VarFound: undefined
      };
  }




  /* --------------------------------
      Analyzing Input
     --------------------------------
  */

  parseInput(input: string){
    input = this.autocorrect(input);
    /* let tempPos : number = -1;
    // gets index of latest appearance of synonym
    for(const key of this.keywords){
      tempPos = input.toLowerCase().indexOf(key.synonym.toLowerCase());
      while (tempPos !==-1){
        tempPos = input.toLowerCase().indexOf(key.synonym.toLowerCase(), tempPos+1);
      }
      key.position = tempPos;
    }
    // if a keyword name is addressed by different synonyms, the synonym with the latest appearance has to be used
    for(let i = 0; i<(this.keywords.length-1); i++){
      if(this.keywords[i].position < this.keywords[i+1].position && this.keywords[i].name == this.keywords[i+1].name){
        this.keywords[i].position = -1;
      } else if (this.keywords[i].name == this.keywords[i+1].name){
        this.keywords[i+1].position = -1;
      }
    } */
    for(const key of this.keywords){
      key.position = this.getIndex2(key.synonym, input);
    }
    // if a keyword name is addressed by different synonyms, the synonym with the latest appearance has to be used
    for(let i = 0; i<(this.keywords.length-1); i++){
      if(this.keywords[i].position < this.keywords[i+1].position && this.keywords[i].name == this.keywords[i+1].name){
        this.keywords[i].position = -1;
      } else if (this.keywords[i].name == this.keywords[i+1].name){
        this.keywords[i+1].position = -1;
      }
    }
    console.log("Test_Indices");
    console.log(this.keywords);
    
  }

  getIndex2(keySyn: string, input:string){
    let tempPos : number = -1;
    // gets index of latest appearance of synonym
    tempPos = input.toLowerCase().indexOf(keySyn.toLowerCase());
      while (input.toLowerCase().indexOf(keySyn.toLowerCase(), tempPos+1) !==-1){
        tempPos = input.toLowerCase().indexOf(keySyn.toLowerCase(), tempPos+1);
      }
    return tempPos;
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
