/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import PulldownMenu from '../../components/elements/form/PulldownMenu';

const container = css({
  display: 'flex',
  flexWrap: 'wrap',
});

const inputLabel = css({
  width: '100%',
});

export default function CreateRecord({ exerciseList, onSubmit }) {
  const currentDate = new Date();
  const [year, setYear] = useState(currentDate.getFullYear());
  const [month, setMonth] = useState(currentDate.getMonth() + 1);
  const [date, setDate] = useState(currentDate.getDate());
  const [dateList, setDateList] = useState([]);

  const yearList = useMemo(() => [-2, -1, 0, 1, 2].map((i) => year + i), []);

  const createDateList = () => {
    const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (month === 2 && year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) {
      return [...Array(27)].map((_, i) => i + 1);
    } else {
      return [...Array(days[month - 1])].map((_, i) => i + 1);
    }
  };

  const onChangeYear = useCallback(() => {
    setYear(Math.trunc(Number(document.getElementById('exerciseDateYear').value)));
  });

  const onChangeMonth = useCallback(() => {
    setMonth(Math.trunc(Number(document.getElementById('exerciseDateMonth').value)));
  });

  const onChangeDate = useCallback(() => {
    setDate(Math.trunc(Number(document.getElementById('exerciseDateDate').value)));
  });

  useEffect(() => {
    setDateList(createDateList());
  }, [month]);

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
          itemList={exerciseList.map((exercise) => exercise.name)}
          name={'exercise'}
          id={'exercise'}
        />
      </label>

      <label css={inputLabel} htmlFor="weight">
        重さ
        {/* Todo kgとlbのどちらを使うか選べるようにする */}
        <input type="number" name="weight" id="weightKg" min="0" />
        <input type="number" name="weight" id="weightLb" min="0" defaultValue={0} hidden />
      </label>

      <label css={inputLabel} htmlFor="repetition">
        回数
        <input type="number" name="repetition" id="repetition" min="0" />
      </label>

      <label css={inputLabel} htmlFor="memo">
        メモ
        <input type="text" name="memo" id="memo" />
      </label>

      <label css={inputLabel} htmlFor="support">
        補助
        <input type="checkbox" name="support" id="support" />
      </label>

      <label css={inputLabel} htmlFor="leftOrRight">
        左右
        <div>
          <input type="radio" name="leftOrRight" id="left" defaultValue={'left'} />
          <label htmlFor="left">左</label>
          <input type="radio" name="leftOrRight" id="none" defaultValue={'none'} defaultChecked />
          <label htmlFor="none">未指定</label>
          <input type="radio" name="leftOrRight" id="right" defaultValue={'right'} />
          <label htmlFor="right">右</label>
        </div>
      </label>

      <button
        type="submit"
        onClick={() => {
          const getLeftOrRight = () => {
            const elements = document.getElementsByName('leftOrRight');
            for (let i = 0; i < elements.length; i++) {
              if (elements.item(i).checked) return elements.item(i).value;
            }
          };
          const zeroPadding = (num, digit) => {
            const ret = num.toString();
            if (ret.length < digit) {
              return [...Array(digit - ret.length)].reduce((prev) => '0' + prev, num);
            }
            return ret;
          };
          const record = {
            exercise_date:
              document.getElementById('exerciseDateYear').value +
              zeroPadding(document.getElementById('exerciseDateMonth').value, 2) +
              zeroPadding(document.getElementById('exerciseDateDate').value, 2),
            exercise: document.getElementById('exercise').value,
            weight_kg: document.getElementById('weightKg').value,
            weight_lb: document.getElementById('weightLb').value,
            repetition: document.getElementById('repetition').value,
            memo: document.getElementById('memo').value,
            is_supported: document.getElementById('support').checked,
            left_or_right: getLeftOrRight(),
            distance_km: null,
            distance_mile: null,
          };
          onSubmit(record);
        }}
      >
        submit
      </button>
    </div>
  );
}

CreateRecord.propTypes = {
  exerciseList: PropTypes.arrayOf(PropTypes.object),
  onSubmit: PropTypes.func,
};

CreateRecord.defaultProps = {
  exerciseList: [],
  onSubmit: (f) => f,
};
