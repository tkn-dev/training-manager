function isOnlySpace(str) {
  const regex = /^\s*$/;
  return regex.test(str);
}

module.exports = { isOnlySpace };
