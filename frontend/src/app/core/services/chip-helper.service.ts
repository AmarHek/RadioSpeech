import {Injectable} from '@angular/core';
import {
  Category,
  CheckBox,
  ChipColors,
  Group,
  InputChip,
  KeyClickable,
  KeyVariable, Option, TopLevel,
  Variable
} from "@app/models";

@Injectable({
  providedIn: 'root'
})
export class ChipHelperService {

  constructor() { }

  getMergedInput(input: string, chips: InputChip[], trim: boolean){
    let mergedInput = ""
    chips.forEach(chip => mergedInput += chip.content + " ")
    if(mergedInput.length>1 && input.length > 0 && this.isNumeric(mergedInput[mergedInput.length-2]) && this.isNumeric(input[0])){
      //dont separate numbers with spaces
      mergedInput = mergedInput.trim()
    }
    if(trim) mergedInput = mergedInput.trim()
    mergedInput += input
    return mergedInput
  }

  generateChipForGroup(group: Group, catName: string): InputChip{
    let option = group.options.find(o => o.name == group.value)
    return this.generateGenericChip(option, catName)
  }

  generateChipForBox(box: CheckBox, catName: string): InputChip{
    return this.generateGenericChip(box, catName)
  }

  generateGenericChip(element: Option | CheckBox, catName: string){
    let chipText = element.keys[0]
    let varInfo = this.getVarTextAndCount(element.variables)
    let varText = varInfo[0]
    let activeVarCount = varInfo[1]
    chipText += varText
    let variablesComplete = activeVarCount == element.variables.length
    let chipColor = variablesComplete ? ChipColors.GREEN : ChipColors.YELLOW
    return new InputChip(chipText, chipColor, catName + " " + element.name)
  }

  getVarTextAndCount(variables: Variable[]) {
    let varText = ""
    let activeVars = 0
    variables.forEach(variable => {
      if(variable.kind == "oc" && variable.value != null){
        let key: string
        if (variable.keys == null){
          key = variable.value
        }else {
          key = variable.keys[variable.values.indexOf(variable.value)][0]
        }
        varText += " " + variable.textBefore + key + variable.textAfter
        activeVars++
      }else if (variable.kind == "number" && variable.value != undefined) {
        varText += " " + variable.textBefore + variable.value + variable.textAfter
        activeVars++
      }else if(variable.kind == "mc"){
        let anyMcActive = false
        variable.values.forEach(value => {
          if(value[1]){
            varText += " " + value[0]
            anyMcActive = true
          }
        })
        if (anyMcActive) activeVars ++
      }else if (variable.kind == "text" && variable.value != ""){
        varText += " " + variable.textBefore + variable.value + variable.textAfter
        activeVars ++
      }else if(variable.kind == "date" && variable.value != undefined){
        varText += " " + variable.textBefore + variable.value.day + "." + variable.value.month + "." + variable.value.year + variable.textAfter
        activeVars ++
      }
    })
    return [varText, activeVars]
  }

  generateChipsForParts(defaultList: TopLevel[], partList: TopLevel[]):InputChip[]{
    let result = []
    defaultList.forEach((defaultPart, defaultPartIndex) =>{
      if(defaultPart.kind != "category") return
      defaultPart.selectables.forEach((defaultSel, defaultSelIndex) =>{
        if(defaultSel.kind == "group"){
          let parsedDefaultSel = defaultSel as Group
          let parsedSel = (partList[defaultPartIndex] as Category).selectables[defaultSelIndex] as Group
          if(parsedDefaultSel.value != parsedSel.value){
            result.push(this.generateChipForGroup(parsedSel, defaultPart.name))
          }
        }
        else if(defaultSel.kind == "box"){
          let parsedDefaultSel = defaultSel as CheckBox
          let parsedSel = (partList[defaultPartIndex] as Category).selectables[defaultSelIndex] as CheckBox
          if(parsedDefaultSel.value != parsedSel.value){
            result.push(this.generateChipForBox(parsedSel, defaultPart.name))
          }
        }
      })
    })
    return result
  }

  keepChar(index: number, mergedInput: string, variables: KeyVariable[]){
    for(let varCounter = 0; varCounter < variables.length; varCounter++){
      let v = variables[varCounter]
      if(v.kind == "ratio" && v.value === undefined) return true
      if(v.kind == "date" && v.value === undefined) return true
      if(v.kind == "date"){
        const dateVar = mergedInput.substring(v.position, v.positionEnd);
        let trimAmount = 0;
        for(let i = dateVar.length-1; i > -1; i--){
          if(!this.isNumeric(dateVar[i])){
            trimAmount += 1
          }else{
            break
          }
        }
        if(index >= v.position && index <= v.positionEnd - trimAmount){
          return false
        }
      }else if(index >= v.position && index <= v.positionEnd){
        return false
      }
    }
    return true
  }

  getTextWithoutVariables(mergedInput: string, foundVariables: Map<String, KeyVariable[]>){
    let textNoVars = ""
    let allVars: KeyVariable[] = []
    foundVariables.forEach(list =>{list.forEach(v => allVars.push(v))})
    for(let i = 0; i < mergedInput.length; i++){
      if(this.keepChar(i, mergedInput, allVars)){
        textNoVars += mergedInput[i]
      }
    }
    return textNoVars
  }

  getTextWithoutClickables(mergedInput: string, foundClickables: KeyClickable[]): string{
    foundClickables.sort(fc => fc.synonym.length).forEach(fc =>{
      const searchMask = fc.synonym;
      const regEx = new RegExp(searchMask, "i");
      mergedInput = mergedInput.replace(regEx, "")
    })
    return mergedInput
  }

  isNumeric(s) {
    return !isNaN(s - parseFloat(s));
  }

  removeRedChips(chips){
    for (const chip of chips){
      if (chip.color != ChipColors.RED) continue
      const index = chips.indexOf(chip);
      if (index < 0) continue
      chips.splice(index, 1);
    }
  }
}
