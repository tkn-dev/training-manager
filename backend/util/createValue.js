const addSingleQuote = require('./addSingleQuote');
const needsQuote = require('./needsQuote');

module.exports = function createValue(recordObj, typeObj) {
  return Object.keys(recordObj)
    .map((key) => {
      console.log(key + ':' + recordObj[key] + ':' + typeObj[key]);
      if (recordObj[key] !== false && !recordObj[key]) {
        return 'null';
      }
      if (needsQuote(typeObj[key])) {
        return addSingleQuote(recordObj[key]);
      } else {
        return recordObj[key];
      }
    })
    .join(',');
};
