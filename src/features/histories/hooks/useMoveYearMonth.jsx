import React, { useCallback, useState } from 'react';

export default function useMoveYearMonth() {
  const currentDate = new Date();
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth() + 1);

  const moveToPrevYear = useCallback(() => {
    setSelectedYear(selectedYear - 1);
  });
  const moveToNextYear = useCallback(() => {
    setSelectedYear(selectedYear + 1);
  });
  const moveToPrevMonth = useCallback(() => {
    const prevMonthEnd = new Date(new Date(selectedYear, selectedMonth - 1, 1).setDate(0));
    setSelectedYear(prevMonthEnd.getFullYear());
    setSelectedMonth(prevMonthEnd.getMonth() + 1);
  });
  const moveToNextMonth = useCallback(() => {
    const nextMonthStart = new Date(new Date(selectedYear, selectedMonth - 1, 1).setDate(32));
    setSelectedYear(nextMonthStart.getFullYear());
    setSelectedMonth(nextMonthStart.getMonth() + 1);
  });

  return [
    selectedYear,
    selectedMonth,
    moveToPrevYear,
    moveToNextYear,
    moveToPrevMonth,
    moveToNextMonth,
  ];
}
