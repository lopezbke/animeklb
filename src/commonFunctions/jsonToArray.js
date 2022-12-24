function jsonToArray (json) {
    const arrayToReturn = [];
    Object.keys(json.data).forEach(key => {
      arrayToReturn.push(json.data[key]);
    });
    return arrayToReturn;
  };

  export default jsonToArray;