export const removeDiacritics = (str) => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase();
  };
  
  export const Search = (searchKey, dataList,parameter1, parameter2, dispatchFunction) => {
    if (!searchKey.trim() || searchKey.trim() === "") {
    dispatchFunction(dataList);
    }
  
    const searchNormalized = removeDiacritics(searchKey);
  
    const filteredResults = dataList.filter(
      (item) =>
        removeDiacritics(item[parameter1]).includes(searchNormalized) ||
        removeDiacritics(item[parameter2]).includes(searchNormalized)
    );
    if(filteredResults){
    dispatchFunction(filteredResults);
    }else{
      console.log("not found");
      
    }
  
      
  };
  