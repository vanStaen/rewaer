export const convertCodeToObjectString = (searchForCode, searchInObject) => {
  return searchInObject.find((element) => searchForCode === element.code);
};
