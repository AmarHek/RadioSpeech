const uuidStorageKey = "UUID";
const surveyStorageKey = "survey";
const resetKey = "reset";

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function getUUID(): string{
  const currentUUID = localStorage.getItem(uuidStorageKey);
  if(currentUUID == null){
    const newUUID = generateUUID();
    localStorage.setItem(uuidStorageKey, newUUID);
    console.log("Generated new UUID: " + newUUID);
    return newUUID;
  }else {
    console.log("Found existing UUID: " + currentUUID);
    return currentUUID;
  }
}

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function generateUUID(): string{
  const validChars = "abcdefghijklmnopqrstuvwxyz0123456789";
  const uuidTemplate = "xxxx-xxxx-xxxx-xxxx";
  let UUID = "";
  for (let i = 0; i < uuidTemplate.length; i++){
    if (uuidTemplate[i] === "x"){
      UUID += validChars.charAt(Math.floor(Math.random() * validChars.length));
    } else {
      UUID += "-";
    }
  }
  return UUID;
}

// returns -1 if the survey link has been clicked once
// or a positive integer for the amount of materials that have been completed
// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function getSurveyStatus(): number {
  const surveyStatus = localStorage.getItem(surveyStorageKey);
  if(surveyStatus==null){
    const newSurveyStatus = String(0);
    localStorage.setItem(surveyStatus, newSurveyStatus);
    return Number(newSurveyStatus);
  }
  return Number(surveyStatus);
}

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function increaseSurveyCounter(){
  const surveyStatus = getSurveyStatus();
  if(surveyStatus === -1) {
return;
}
  localStorage.setItem(surveyStorageKey, String(surveyStatus + 1));
}

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function surveyLinkClicked(){
  localStorage.setItem(surveyStorageKey, String(-1));
}

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function getResetCounter(){
  const resetCounter = localStorage.getItem(resetKey);
  if(resetCounter == null){
    const newResetCounter = String(0);
    localStorage.setItem(resetCounter, newResetCounter);
    return Number(newResetCounter);
  }
  return Number(resetCounter);
}

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function increaseResetCounter(){
  const resetCounter = getResetCounter();
  localStorage.setItem(resetKey, String(resetCounter + 1));
}

