const UUIDStorageKey = "UUID"
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
