/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AerobicForm from './AerobicForm';
import AnaerobicFrom from './AnaerobicForm';
import { zeroPadding } from '../../util/zeroPadding';
import SelectExerciseForm from './SelectExerciseForm';

const container = css({
  display: 'flex',
  flexWrap: 'wrap',
});
const formContainer = css({
  display: 'flex',
  flexWrap: 'wrap',
  width: '100%',
  marginTop: '10px',
});
const formTitle = css({
  width: '100%',
});
const inputContainer = css({
  display: 'flex',
  marginTop: '10px',
});
const submitButton = css({
  marginTop: '20px',
});

export default function CreateRecord({ exerciseList, onSubmit }) {
  const defaultSelectedNum = 2;

  const [exercise, setExercise] = useState();
  const [isAerobic, setIsAerobic] = useState(false);
  const [selectedSetNum, setSelectedSetNumber] = useState(defaultSelectedNum);
  const [recordFrom, setRecordFrom] = useState();
  const [response, setResponse] = useState();
  const [exerciseMessage, setExerciseMessage] = useState();

  const createAerobicForm = useCallback(() => {
    return (
      <div css={formContainer}>
        <div css={inputContainer}>
          <AerobicForm />
        </div>
      </div>
    );
  });

  const createAnaerobicForm = useCallback((setNum) => {
    return [...Array(setNum)].map((_, i) => {
      return (
        <div css={formContainer} id={`formContainer${i + 1}`} key={i}>
          <h2 css={formTitle}>{`セット${i + 1}`}</h2>
          <div css={inputContainer}>
            <AnaerobicFrom setNum={i + 1} />
          </div>
        </div>
      );
    });
  });

  const hideAnaerobicFormContainer = useCallback((setNum) => {
    for (let i = 10; i > setNum; i--) {
      const style = document.getElementById(`formContainer${i}`).style;
      style.visibility = 'hidden';
      style.margin = '0';
      style.height = '0';
    }
  });

  // 種目切替時の有酸素フラグ更新
  useEffect(() => {
    setExerciseMessage(null);
    if (!exercise) {
      setIsAerobic(null);
      setSelectedSetNumber(0);
      setRecordFrom(null);
      return;
    }
    for (let exerciseObj of exerciseList) {
      if (exerciseObj.name === exercise) {
        setIsAerobic(!!exerciseObj.is_aerobic);
        break;
      }
    }
  }, [exercise]);

  // 有酸素フラグ切替時のフォーム切替処理
  useEffect(() => {
    if (isAerobic) {
      setSelectedSetNumber(1);
      setRecordFrom(createAerobicForm());
    } else if (!isAerobic && exercise) {
      setSelectedSetNumber(defaultSelectedNum);
      setRecordFrom(createAnaerobicForm(10));
    }
  }, [isAerobic]);

  // セット数増減時の無酸素フォーム増減処理
  useEffect(() => {
    if (recordFrom && !isAerobic) hideAnaerobicFormContainer(selectedSetNum);
  }, [selectedSetNum]);

  // フォームのリセット処理
  useEffect(() => {}, [response]);

  return (
    <div css={container}>
      <SelectExerciseForm
        exerciseList={exerciseList}
        setExercise={setExercise}
        exerciseMessage={exerciseMessage}
      />

      {recordFrom}

      <button
        type="submit"
        css={submitButton}
        onClick={() => {
          setExerciseMessage();
          let isValid = true;

          const setMessage = (id, setNum, message) => {
            document.getElementById(`${id}${setNum}`).innerHTML = message;
          };

          const getLeftOrRight = (setNum) => {
            const elements = document.getElementsByName(`leftOrRight${setNum}`);
            for (let i = 0; i < elements.length; i++) {
              if (elements.item(i).checked) return elements.item(i).value;
            }
          };

          if (!document.getElementById('exercise').value) {
            setExerciseMessage('種目を選択して下さい。');
            return;
          }

          const records = [...Array(selectedSetNum)].map((_, i) => {
            const setNum = i + 1;
            let record = {
              exercise_date:
                document.getElementById('exerciseDateYear').value +
                zeroPadding(document.getElementById('exerciseDateMonth').value, 2) +
                zeroPadding(document.getElementById('exerciseDateDate').value, 2),
              exercise: document.getElementById('exercise').value,
              set_number: setNum,
            };
            if (isAerobic) {
              record = {
                ...record,
                distance_km: document.getElementById('distanceKm').value,
                distance_mile: document.getElementById('distanceMile').value,
                run_time: document.getElementById('runTime').value,
                memo: document.getElementById('memo1').value,
              };
            } else if (!isAerobic) {
              record = {
                ...record,
                weight_kg: document.getElementById(`weightKg${setNum}`).value,
                weight_lb: document.getElementById(`weightLb${setNum}`).value,
                repetition: document.getElementById(`repetition${setNum}`).value,
                memo: document.getElementById(`memo${setNum}`).value,
                is_supported: document.getElementById(`support${setNum}`).checked,
                left_or_right: getLeftOrRight(setNum),
              };
            }
            if (isAerobic) {
              if (!record.distance_km && !record.distance_mile) {
                setMessage('distanceMessage', setNum, '距離を入力してください。');
                isValid = false;
              }
              if (!record.run_time) {
                setMessage('runTimeMessage', setNum, '時間を入力してください。');
                isValid = false;
              }
            } else if (!isAerobic) {
              if (!record.weight_kg && !record.weight_lb) {
                setMessage('weightMessage', setNum, '重さを入力してください。');
                isValid = false;
              }
              if (!record.repetition) {
                setMessage('repetitionMessage', setNum, '回数を入力してください。');
                isValid = false;
              }
            }
            return record;
          });

          if (isValid) {
            onSubmit(records).then(async (res) => await setResponse(res.status));
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
