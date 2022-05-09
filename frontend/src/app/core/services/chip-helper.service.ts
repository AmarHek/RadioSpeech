import {Injectable} from '@angular/core';
import {ChipColors, InputChip, KeyClickable, KeyVariable} from "@app/models";

@Injectable({
  providedIn: 'root'
})
export class ChipHelperService {

  constructor() { }

  getMergedInput(input: string, chips: InputChip[]){
    let mergedInput = ""
    chips.forEach(chip => mergedInput += chip.content + " ")
    if(mergedInput.length>1 && input.length > 0){
      if(this.isNumeric(mergedInput[mergedInput.length-2]) && this.isNumeric(input[0])){
        //dont separate numbers by spaces
        mergedInput = mergedInput.trim()
      }
    }

    mergedInput += input
    return mergedInput
  }

  //Only keep newest clickable of a specific group, e.g. if input was "Thorax pa Thorax 2 Ebenen" this removes "Thorax pa"
  getFilteredClickables(foundClickables: KeyClickable[]): KeyClickable[]{
    let trimmedClickables = [];
    foundClickables.reverse().forEach(c =>{
      if (c.group === undefined) {
        let add = true
        trimmedClickables.forEach(tc =>{
          if(tc.name == c.name){
            add = false
          }
        })
        if(add) trimmedClickables.push(c)
        return
      }
      let add = true;
      trimmedClickables.forEach(t => {
        if(t.group === c.group){
          add = false
          return
        }
      })
      if(add) trimmedClickables.push(c)
    })
    //Restore regular order of found clickables
    //This list now only contains the newest clickables of unique groups
    trimmedClickables = trimmedClickables.reverse()
    return trimmedClickables
  }

  getFilteredVariables(foundVariables: Map<String, KeyVariable[]>): Map<String, KeyVariable[]> {
    let trimmedVariables = new Map<String, KeyVariable[]>();
    foundVariables.forEach((subUntrimmed, key) => {
      let subTrimmed = []
      subUntrimmed.reverse().forEach(v =>{
        if(v.kind === "oc"){
          let add = true
          subTrimmed.forEach(cv => {
            if(cv.id === v.id){
              add = false
            }
          })
          if(add){
            subTrimmed.push(v)
          }
        }else{
          subTrimmed.push(v)
        }
      })
      subTrimmed = subTrimmed.reverse()
      trimmedVariables.set(key, subTrimmed)
    })
    return trimmedVariables
  }

  getTextWithoutVariables(mergedInput: String, foundVariables: Map<String, KeyVariable[]>){
    let textNoVars = ""
    for(let i = 0; i < mergedInput.length; i++){
      let add = true
      foundVariables.forEach(list =>{
        list.forEach(v =>{
          if(v.kind == "date" && v.value === undefined){
            add = true
          } else if(v.kind == "date"){
            const dateVar = mergedInput.substring(v.position, v.positionEnd);
            let trimAmount = 0;
            for(let i = dateVar.length-1; i > -1; i--){
              if(!this.isNumeric(dateVar[i])){
                trimAmount += 1
              }else{
                break
              }
            }
            if(i >= v.position && i <= v.positionEnd - trimAmount){
              add = false
            }

          }else if(i >= v.position && i <= v.positionEnd){
            add = false
          }
        })
      })
      if(add){
        textNoVars += mergedInput[i]
      }
    }
    return textNoVars
  }

  getTextWithoutClickables(mergedInput: string, foundClickables: KeyClickable[]): string{
    foundClickables.forEach(fc =>{
      const searchMask = fc.synonym;
      const regEx = new RegExp(searchMask, "ig");
      mergedInput = mergedInput.replace(regEx, "")
    })
    return mergedInput
  }

  isNumeric(s) {
    return !isNaN(s - parseFloat(s));
  }

  getChips(trimmedClickables: KeyClickable[], trimmedVariables: Map<String, KeyVariable[]>, unModifiedMerged: string): InputChip[]{
    let chips = []
    trimmedClickables.forEach(fc =>{
      let chipText = fc.synonym
      let id = fc.category + " " + fc.name
      let vars = trimmedVariables.get(id)
      // let vars = this.inputParser.foundVariables.get(id)
      if(vars!== undefined){
        chipText += " "
        vars.forEach(v => {
          if(v.kind === "date" && v.value === undefined){
            return
          }
          if(v.kind === "date"){
            const dateVar = unModifiedMerged.substring(v.position, v.positionEnd);
            let trimAmount = 0;
            for(let i = dateVar.length-1; i > -1; i--){
              if(!this.isNumeric(dateVar[i])){
                trimAmount += 1
              }else{
                break
              }
            }
            chipText += unModifiedMerged.substring(v.position, v.positionEnd-trimAmount)
            return
          }
          if(v.textBefore !== undefined && v.textBefore !== ""){
            chipText += v.textBefore
          }
          if(v.synonym !== undefined){
            chipText += v.synonym
          }
          if(v.textAfter !== undefined && v.textAfter !== ""){
            chipText += v.textAfter
          }
          else{
            chipText += " "
          }
        })
      }
      chipText = chipText.trim()
      chips.push(new InputChip(chipText, ChipColors.GREEN))
    })
    return chips
  }
}
