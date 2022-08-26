const UUIDStorageKey = "UUID"
const surveyStorageKey = "survey"

export function getUUID(): string{
  const currentUUID = localStorage.getItem(UUIDStorageKey)
  if(currentUUID == null){
    const newUUID = generateUUID()
    localStorage.setItem(UUIDStorageKey, newUUID)
    console.log("Generated new UUID: " + newUUID)
    return newUUID
  }else {
    console.log("Found existing UUID: " + currentUUID)
    return currentUUID
  }
}

export function generateUUID(): string{
  const validChars = 'abcdefghijklmnopqrstuvwxyz0123456789'
  const UUIDTemplate = 'xxxx-xxxx-xxxx-xxxx'
  let UUID = ''
  for (let i = 0; i < UUIDTemplate.length; i++){
    if(UUIDTemplate[i] == 'x'){
      UUID += validChars.charAt(Math.floor(Math.random() * validChars.length))
    }else {
      UUID += '-'
    }
  }
  return UUID
}
//returns -1 if the survey link has been clicked once, or a positive integer for the amount of materials that have been completed
export function getSurveyStatus(): number {
  let surveyStatus = localStorage.getItem(surveyStorageKey)
  if(surveyStatus==null){
    const newSurveyStatus = String(0)
    localStorage.setItem(surveyStatus, newSurveyStatus)
    return Number(newSurveyStatus)
  }
  return Number(surveyStatus)
}

export function increaseSurveyCounter(){
  let surveyStatus = getSurveyStatus()
  if(surveyStatus == -1) return
  localStorage.setItem(surveyStorageKey, String(surveyStatus + 1))
}

export function surveyLinkClicked(){
  localStorage.setItem(surveyStorageKey, String(-1))
}

