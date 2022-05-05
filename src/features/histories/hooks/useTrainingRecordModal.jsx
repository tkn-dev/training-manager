/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React, { useState, useCallback } from 'react';
import { EditItem } from '../../../components/elements/button/EditItem';
import { DeleteItem } from '../../../components/elements/button/DeleteItem';
import { getRecordsByDate } from '../../../api/records';

const overlay = css({
  position: 'fixed',
  top: '0',
  left: '0',
  height: '100%',
  width: '100%',
  backgroundColor: 'rgba(0, 0 ,0 ,0.3)',
});
const modal = css({
  position: 'absolute',
  top: '0',
  bottom: '0',
  right: '0',
  left: '0',
  height: '600px',
  width: '75%',
  margin: 'auto',
  backgroundColor: 'white',
  borderRadius: '2%',
});

export const useTrainingRecordModal = () => {
  const [modalWindow, setModalWIndow] = useState();
  const [recordView, setRecordView] = useState();

  const onClickOverlay = useCallback(() => {
    setModalWIndow();
  });

  const openModal = useCallback((date) => {
    setModalWIndow(
      <div css={overlay} onClick={() => onClickOverlay()}>
        <section
          css={modal}
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          <h2>{date}</h2>
          {recordView}
        </section>
      </div>,
    );
  });

  const createRecordSummaryList = useCallback((recordList) => {
    return recordList.results.reduce((prev, curt) => {
      const prevMaxLen = prev.length - 1;
      if (!prev.length || prev[prevMaxLen].exercise !== curt.exercise) {
        if (!curt.Exercise.is_aerobic) {
          curt.weight = [curt.weight];
          curt.repetition = [curt.repetition];
          curt.memo = [curt.memo];
          curt.maxSetNum = 1;
        }
        prev.push(curt);
      } else if (prev[prevMaxLen].exercise === curt.exercise) {
        prev[prevMaxLen].weight = [...prev[prevMaxLen].weight, curt.weight];
        prev[prevMaxLen].repetition = [...prev[prevMaxLen].repetition, curt.repetition];
        prev[prevMaxLen].memo = [...prev[prevMaxLen].memo, curt.memo];
        prev[prevMaxLen].maxSetNum++;
      }
      return prev;
    }, []);
  });

  const aerobicExerciseRecord = useCallback(
    (key, exerciseName, distance, distanceType, exerciseTime, memoField, recordedAt) => {
      return (
        <div key={key}>
          <div>
            <h3>{exerciseName}</h3>
            <EditItem />
            <DeleteItem />
          </div>
          <div>
            <p>{`距離：${distance}${distanceType}`}</p>
            <p>{`時間：${exerciseTime}分`}</p>
            {memoField}
          </div>
          <p>{recordedAt}</p>
        </div>
      );
    },
  );

  const anaerobicExerciseRecord = useCallback((key, exerciseName, setField, recordedAt) => {
    return (
      <div key={key}>
        <div>
          <h3>{exerciseName}</h3>
          <EditItem />
          <DeleteItem />
        </div>
        {setField}
        <p>{recordedAt}</p>
      </div>
    );
  });

  const createTrainingRecordModal = useCallback((recordSummaryList) => {
    return recordSummaryList.map((record, i) => {
      if (record.Exercise.is_aerobic) {
        const memoField = record.memo ? <p>{`メモ：${record.memo}`}</p> : null;
        return aerobicExerciseRecord(
          i,
          record.exercise,
          record.distance,
          record.distance_type,
          record.exercise_time,
          memoField,
          record.recorded_at,
        );
      } else {
        const setField = [...Array(record.maxSetNum)].map((_, i) => {
          const memoField = record.memo[i] ? <p>{`メモ：${record.memo[i]}`}</p> : null;
          return (
            <div key={i}>
              <p>{`セット${i + 1}：${record.weight[i]}${record.weight_type} × ${
                record.repetition[i]
              }`}</p>
              {memoField}
            </div>
          );
        });
        return anaerobicExerciseRecord(i, record.exercise, setField, record.recorded_at);
      }
    });
  });

  const updateModal = useCallback(async (date) => {
    if (!date) return;
    const res = await getRecordsByDate(date);
    if (!res.results) return;

    const recordSummaryList = createRecordSummaryList(res);
    setRecordView(createTrainingRecordModal(recordSummaryList));
  });

  return [modalWindow, { openModal, updateModal }];
};
