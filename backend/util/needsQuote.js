module.exports = function needsQuote(type) {
  switch (type) {
    case 'varchar':
    case 'char':
    case 'text':
    case 'date':
    case 'time':
    case 'datetime':
      return true;

    case 'int':
    case 'decimal':
    case 'tinyint':
      return false;

    default:
      return false;
  }
};
