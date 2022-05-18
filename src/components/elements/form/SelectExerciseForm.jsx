/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React, { useState, useEffect } from 'react';
import { PulldownMenu } from './PulldownMenu';
import useDateList from './hooks/useDateList';
import { zeroPadding } from '../../../util/zeroPadding';

const container = css({
  width: '100%',
  display: 'flex',
  flexWrap: 'wrap',
});
const inputLabel = css({
  width: '100%',
});

export const SelectExerciseForm = ({
  currentDate = new Date(),
  exerciseList = [],
  errors = {},
  setFullDate,
  setExerciseName,
}) => {
  const [year, setYear] = useState(currentDate.getFullYear());
  const [month, setMonth] = useState(currentDate.getMonth() + 1);
  const [date, setDate] = useState(currentDate.getDate());

  const yearList = [-2, -1, 0, 1, 2].map((i) => currentDate.getFullYear() + i);
  const monthList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const [dateList, updateDateList] = useDateList();

  useEffect(() => {
    updateDateList(year, month);
  }, [year, month]);

  useEffect(() => {
    if (dateList.includes(date)) {
      document.getElementById('dateList').value = date;
    } else {
      setDate(1);
    }
  }, [dateList]);

  useEffect(() => {
    setFullDate(year + zeroPadding(month, 2) + zeroPadding(date, 2));
  }, [year, month, date]);

  return (
    <div css={container}>
      <label css={inputLabel} htmlFor="fullDate">
        日付
        <PulldownMenu
          itemList={yearList}
          name={'fullDate'}
          id={'yearList'}
          defaultValue={year}
          onChange={() => setYear(Math.trunc(Number(document.getElementById('yearList').value)))}
        />
        <PulldownMenu
          itemList={monthList}
          name={'fullDate'}
          id={'monthList'}
          defaultValue={month}
          onChange={() => setMonth(Math.trunc(Number(document.getElementById('monthList').value)))}
        />
        <PulldownMenu
          itemList={dateList}
          name={'fullDate'}
          id={'dateList'}
          defaultValue={date}
          onChange={() => setDate(Math.trunc(Number(document.getElementById('dateList').value)))}
        />
      </label>
      <p id="fullDateError">{errors.fullDateError}</p>
      <label css={inputLabel} htmlFor="exerciseList">
        種目
        <PulldownMenu
          itemList={[...exerciseList.map((exercise) => exercise.name)]}
          name={'exerciseNameList'}
          id={'exerciseNameList'}
          onChange={() => setExerciseName(document.getElementById('exerciseNameList').value)}
        />
      </label>
      <p id="exerciseListError">{errors.exerciseListError}</p>
    </div>
  );
};
