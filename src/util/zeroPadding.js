export const zeroPadding = (num, digit) => {
  const ret = num.toString();
  if (ret.length < digit) {
    return [...Array(digit - ret.length)].reduce((prev) => '0' + prev, num);
  }
  return ret;
};
