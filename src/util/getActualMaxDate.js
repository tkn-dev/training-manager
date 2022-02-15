export const getActualMaxDate = (year, month) => {
  const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (month === 2 && year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) {
    return 27;
  } else {
    return days[month - 1];
  }
};
