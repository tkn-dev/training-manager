/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React, { useCallback, useEffect, useState } from 'react';
import { BsClipboardCheck } from 'react-icons/bs';
import { zeroPadding } from '../../../util/zeroPadding';
import { COLOR } from '../../../style/constants';

const days = css({
  height: '6rem',
  width: '14%',
  marginLeft: '-1px',
  marginTop: '-1px',
  border: `solid 1px ${COLOR.BORDER}`,
  backgroundColor: 'transparent',
  lineHeight: '1.6',
});
const subDays = css(days, {
  color: 'lightgray',
});
const clipboardCheck = (isVisible) =>
  css({
    height: '1.5rem',
    width: '1.5rem',
    visibility: isVisible ? 'visible' : 'hidden',
    color: 'green',
  });

export const useCreateDayListView = (year, month, recordList, onSelectDate) => {
  const [startingWeekDay, setStartingWeekDay] = useState();
  const [prevMonthEnd, setPrevMonthEnd] = useState();
  const [selectedMonthEnd, setSelectedMonthEnd] = useState();
  const [selectedFullDate, setSelectedFullDate] = useState();
  const [prevYearMonth, setPrevYearMonth] = useState();
  const [nextYearMonth, setNextYearMonth] = useState();
  const getFullDate = () => selectedFullDate;

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

  const createDayListView = useCallback(() => {
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
        date = i - selectedMonthEnd - startingWeekDay + 2;
        fullDate = `${nextYearMonth}-${zeroPadding(date, 2)}`;
        dayStyle = subDays;
      }
      return (
        <button
          id={`button-${fullDate}`}
          css={dayStyle}
          key={i}
          type="button"
          onClick={() => {
            onSelectDate(fullDate);
            setSelectedFullDate(fullDate);
          }}
        >
          {date}
          <br />
          <BsClipboardCheck css={clipboardCheck(exerciseDateList.includes(fullDate))} />
        </button>
      );
    });
  });

  return [createDayListView, getFullDate];
};
