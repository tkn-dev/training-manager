module.exports = function isOnlySpace(str) {
  const regex = /^\s*$/;
  return regex.test(str);
};
