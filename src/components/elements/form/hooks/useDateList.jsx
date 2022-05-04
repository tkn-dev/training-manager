import React, { useCallback, useState } from 'react';

export default function useDateList() {
  const defaultDateList = [...Array(32).keys()];
  defaultDateList.shift();
  const [dateList, setDateList] = useState(defaultDateList);

  const updateDateList = useCallback((year, month) => {
    let list;
    if (month === 12) {
      list = [...Array(32).keys()];
    } else {
      const maxDate = new Date(year, month, 0).getDate();
      list = [...Array(maxDate + 1).keys()];
    }
    list.shift();
    setDateList(list);
  });

  return [dateList, updateDateList];
}
