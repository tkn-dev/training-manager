/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import AnaerobicFrom from './AnaerobicForm';
import PulldownMenu from '../../components/elements/form/PulldownMenu';
import { getActualMaxDate } from '../../util/getActualMaxDate';
import { zeroPadding } from '../../util/zeroPadding';
import AerobicForm from './AerobicForm';

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
  const [exercise, setExercise] = useState();
  const [dateList, setDateList] = useState([]);
  const [isAerobic, setIsAerobic] = useState(false);
  const [result, setResult] = useState();

  const [exerciseMessage, setExerciseMessage] = useState();
  const [weightMessage, setWeightMessage] = useState();
  const [repetitionMessage, setRepetitionMessage] = useState();
  const [distanceMessage, setDistanceMessage] = useState();
  const [runTimeMessage, setRunTimeMessage] = useState();

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

  const resetMessage = () => {
    setExerciseMessage(null);
    setWeightMessage(null);
    setRepetitionMessage(null);
    setDistanceMessage(null);
    setRunTimeMessage(null);
  };

  useEffect(() => {
    setDateList([...Array(getActualMaxDate(year, month))].map((_, i) => i + 1));
  }, [month]);

  useEffect(() => {
    if (dateList.includes(date)) {
      document.getElementById('exerciseDateDate').value = date;
    }
  }, [dateList]);

  useEffect(() => {
    resetMessage();
    for (let exerciseObj of exerciseList) {
      if (exerciseObj.name === exercise) {
        setIsAerobic(!!exerciseObj.is_aerobic);
        break;
      }
    }
  }, [exercise]);

  useEffect(() => {
    ['exercise', 'weightKg', 'weightLb', 'repetition', 'distanceKm', 'distanceMile', 'runTime'].map(
      (item) => {
        document.getElementById(item).value = '';
      },
    );
  }, [result]);

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

      <AerobicForm
        distanceMessage={distanceMessage}
        runTimeMessage={runTimeMessage}
        isHidden={!isAerobic}
      />
      <AnaerobicFrom
        weightMessage={weightMessage}
        repetitionMessage={repetitionMessage}
        isHidden={isAerobic}
      />

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
          resetMessage();
          let isValid = true;

          const getLeftOrRight = () => {
            const elements = document.getElementsByName('leftOrRight');
            for (let i = 0; i < elements.length; i++) {
              if (elements.item(i).checked) return elements.item(i).value;
            }
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
            distance_km: document.getElementById('distanceKm').value,
            distance_mile: document.getElementById('distanceMile').value,
            run_time: document.getElementById('runTime').value,
            memo: document.getElementById('memo').value,
            is_supported: document.getElementById('support').checked,
            left_or_right: getLeftOrRight(),
            distance_km: null,
            distance_mile: null,
          };
          if (!record.exercise) {
            setExerciseMessage('種目を選択して下さい。');
            isValid = false;
          }
          if (!record.weight_kg && !record.weight_lb && !isAerobic) {
            setWeightMessage('重さを入力して下さい。');
            isValid = false;
          }
          if (!record.repetition && !isAerobic) {
            setRepetitionMessage('回数を入力してください。');
            isValid = false;
          }
          if (!record.distance_km && !record.distance_mile && isAerobic) {
            setDistanceMessage('距離を入力してください。');
            isValid = false;
          }
          if (!record.run_time && isAerobic) {
            setRunTimeMessage('時間を入力してください。');
            isValid = false;
          }
          if (isValid) {
            onSubmit(record).then(async (res) => await setResult(res.status));
          }
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
