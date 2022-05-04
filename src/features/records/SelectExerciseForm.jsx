/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { PulldownMenu } from '../../components/elements/form/PulldownMenu';
//import { getActualMaxDate } from '../../util/getActualMaxDate';

const container = css({
  width: '100%',
  display: 'flex',
  flexWrap: 'wrap',
});
const inputLabel = css({
  width: '100%',
});

export default function SelectExerciseForm({ exerciseList, setExercise, exerciseMessage }) {
  const currentDate = new Date();
  const [year, setYear] = useState(currentDate.getFullYear());
  const [month, setMonth] = useState(currentDate.getMonth() + 1);
  const [date, setDate] = useState(currentDate.getDate());
  const [dateList, setDateList] = useState([]);

  const yearList = useMemo(() => [-2, -1, 0, 1, 2].map((i) => year + i), []);

  const onChangeYear = useCallback(() => {
    setYear(Math.trunc(Number(document.getElementById('exerciseDateYear').value)));
  });
  const onChangeMonth = useCallback(() => {
    setMonth(Math.trunc(Number(document.getElementById('exerciseDateMonth').value)));
  });
  const onChangeDate = useCallback(() => {
    setDate(Math.trunc(Number(document.getElementById('exerciseDateDate').value)));
  });
  const onChangeExercise = useCallback(() => {
    setExercise(document.getElementById('exercise').value);
  });

  // 月切替時の日付フォーム更新処理
  useEffect(() => {
    //setDateList([...Array(getActualMaxDate(year, month))].map((_, i) => i + 1));
  }, [month]);

  // 日付フォーム更新後の日付設定値調整処理
  useEffect(() => {
    if (dateList.includes(date)) {
      document.getElementById('exerciseDateDate').value = date;
    }
  }, [dateList]);

  return (
    <div css={container}>
      <label css={inputLabel} htmlFor="exerciseDate">
        日付
        <PulldownMenu
          itemList={yearList}
          name={'exerciseDate'}
          id={'exerciseDateYear'}
          defaultValue={year}
          onChange={onChangeYear}
        />
        <PulldownMenu
          itemList={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
          name={'exerciseDate'}
          id={'exerciseDateMonth'}
          defaultValue={month}
          onChange={onChangeMonth}
        />
        <PulldownMenu
          itemList={dateList}
          name={'exerciseDate'}
          id={'exerciseDateDate'}
          onChange={onChangeDate}
        />
      </label>

      <label css={inputLabel} htmlFor="exercise">
        種目
        <PulldownMenu
          itemList={['', ...exerciseList.map((exerciseObj) => exerciseObj.name)]}
          name={'exercise'}
          id={'exercise'}
          onChange={onChangeExercise}
        />
        <p id="exerciseMessage">{exerciseMessage}</p>
      </label>
    </div>
  );
}

SelectExerciseForm.propTypes = {
  exerciseList: PropTypes.arrayOf(PropTypes.object),
  setExercise: PropTypes.func,
  exerciseMessage: PropTypes.string,
};

SelectExerciseForm.defaultProps = {
  exerciseList: [],
  setExercise: (f) => f,
  exerciseMessage: '',
};
