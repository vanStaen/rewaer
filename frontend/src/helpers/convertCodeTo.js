export const convertCodeToObjectString = (searchForCode, searchInObject) => {
    const result = searchInObject.find((element) => searchForCode === element.code);
    if (result){
      return result
    }
    else {
      //console.log("searchForCode", searchForCode);
      //console.log("searchInObject", searchInObject);
      return { en: "not found", de: "not found", fr: "not found"}
    }
 };