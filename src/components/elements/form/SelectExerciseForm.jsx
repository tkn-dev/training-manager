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
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  marginBottom: '1rem',
  fontSize: '1.5rem',
});
const pulldownMenu = css({
  marginLeft: '0.5rem',
});
const monthPulldown = css(pulldownMenu, {
  '&>div': {
    width: '9rem',
  },
});
const datePulldown = css(pulldownMenu, {
  '&>div': {
    width: '9rem',
  },
});
const exercisePulldown = css(pulldownMenu, {
  '&>div': {
    width: '50rem',
  },
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
    if (!dateList.includes(date)) setDate(1);
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
          appendCss={pulldownMenu}
          name={'fullDate'}
          id={'yearList'}
          defaultValue={currentDate.getFullYear()}
          onChange={(event) => setYear(Math.trunc(Number(event.target.value)))}
        />
        <PulldownMenu
          itemList={monthList}
          appendCss={monthPulldown}
          name={'fullDate'}
          id={'monthList'}
          defaultValue={currentDate.getMonth() + 1}
          onChange={(event) => setMonth(Math.trunc(Number(event.target.value)))}
        />
        <PulldownMenu
          itemList={dateList}
          appendCss={datePulldown}
          name={'fullDate'}
          id={'dateList'}
          defaultValue={currentDate.getDate()}
          onChange={(event) => setDate(Math.trunc(Number(event.target.value)))}
        />
      </label>
      <label css={inputLabel} htmlFor="exerciseList">
        種目
        <PulldownMenu
          itemList={exerciseList.map((exercise) => exercise.name)}
          appendCss={exercisePulldown}
          name={'exerciseNameList'}
          id={'exerciseNameList'}
          defaultValue={exerciseList[0].name}
          onChange={(event) => setExerciseName(event.target.value)}
          errorMessage={errors.exerciseListError}
        />
      </label>
    </div>
  );
};
