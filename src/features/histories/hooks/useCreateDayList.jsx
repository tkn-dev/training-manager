/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React, { useCallback, useEffect, useState } from 'react';
import { BsClipboardCheck } from 'react-icons/bs';
import { zeroPadding } from '../../../util/zeroPadding';

const days = css({
  height: '45px',
  width: '14%',
  border: 'solid 0.1rem lightgray',
  backgroundColor: 'transparent',
  lineHeight: '1.6',
});
const subDays = css(days, {
  color: 'lightgray',
});
const clipboardCheck = (isVisible) =>
  css({
    height: '15px',
    width: '15px',
    visibility: isVisible ? 'visible' : 'hidden',
    color: 'green',
  });

export default function useCreateDayList(year, month, recordList, onSelectDate) {
  const [startingWeekDay, setStartingWeekDay] = useState();
  const [prevMonthEnd, setPrevMonthEnd] = useState();
  const [selectedMonthEnd, setSelectedMonthEnd] = useState();
  const [prevYearMonth, setPrevYearMonth] = useState();
  const [nextYearMonth, setNextYearMonth] = useState();

  useEffect(() => {
    const weekDay = new Date(year, month - 1, 1).getDay();
    setStartingWeekDay(weekDay === 0 ? 7 : weekDay);
  }, [year, month]);

  useEffect(() => {
    setPrevMonthEnd(new Date(year, month - 1, 0).getDate());
  }, [year, month]);

  useEffect(() => {
    setSelectedMonthEnd(new Date(year, month, 0).getDate());
  }, [year, month]);

  useEffect(() => {
    if (month === 1) {
      setPrevYearMonth(`${year - 1}-12`);
    } else {
      setPrevYearMonth(`${year}-${zeroPadding(month - 1, 2)}`);
    }
  }, [year, month]);

  useEffect(() => {
    if (month === 12) {
      setNextYearMonth(`${year + 1}-1`);
    } else {
      setNextYearMonth(`${year}-${zeroPadding(month + 1, 2)}`);
    }
  }, [year, month]);

  const createDayList = useCallback(() => {
    const exerciseDateList = [...new Set(recordList.map((record) => record.exercise_date))];

    return [...Array(42)].map((_, i) => {
      let date;
      let fullDate;
      let dayStyle;
      if (i < startingWeekDay - 1) {
        // 前月
        date = prevMonthEnd - startingWeekDay + i + 2;
        fullDate = `${prevYearMonth}-${zeroPadding(date, 2)}`;
        dayStyle = subDays;
      } else if (i < selectedMonthEnd + startingWeekDay - 1) {
        // 当月
        date = i - startingWeekDay + 2;
        fullDate = `${year}-${zeroPadding(month, 2)}-${zeroPadding(date, 2)}`;
        dayStyle = days;
      } else {
        // 次月
        date = i - prevMonthEnd - startingWeekDay + 2;
        fullDate = `${nextYearMonth}-${zeroPadding(date, 2)}`;
        dayStyle = subDays;
      }
      return (
        <button
          id={`button-${fullDate}`}
          css={dayStyle}
          key={i}
          type="button"
          onClick={() => onSelectDate(fullDate)}
        >
          {date}
          <br />
          <BsClipboardCheck css={clipboardCheck(exerciseDateList.includes(fullDate))} />
        </button>
      );
    });
  });

  return [createDayList];
}
