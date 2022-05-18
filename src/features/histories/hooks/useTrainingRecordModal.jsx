/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React, { useState, useCallback, useEffect } from 'react';
import { EditItem } from '../../../components/elements/button/EditItem';
import { DeleteItem } from '../../../components/elements/button/DeleteItem';
import { getRecordsByDate, deleteRecord } from '../../../api/records';

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

export const useTrainingRecordModal = (incrementModifyCount = (f) => f) => {
  const [modalWindow, setModalWindow] = useState();
  const [recordView, setRecordView] = useState();
  const [rerenderDate, setRerenderDate] = useState();
  const [rerenderCount, setRerenderCount] = useState(0);
  const [open, setOpen] = useState(false);

  const incrementRenderCount = () => setRerenderCount((prev) => prev + 1);

  const onClickOverlay = useCallback(() => {
    setModalWindow();
  });

  const openModal = useCallback((date) => {
    setModalWindow(
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

  const deleteAndRerender = useCallback(async (exercise, recordedAt, setNum, date) => {
    const res = await deleteRecord({
      exercise: exercise,
      recorded_at: recordedAt,
      set_number: setNum,
    });
    if (res.status == '200') {
      await updateModal(date);
      setRerenderDate(date);
      incrementRenderCount();
      incrementModifyCount();
    }
  });

  const createRecordSummaryList = useCallback((recordList) => {
    return recordList.results.reduce((prev, curt) => {
      const prevMaxLen = prev.length - 1;
      if (
        !prev.length ||
        prev[prevMaxLen].exercise !== curt.exercise ||
        prev[prevMaxLen].recorded_at !== curt.recorded_at
      ) {
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

  const aerobicExerciseRecord = useCallback((record, key, memoField, date) => {
    return (
      <div key={key}>
        <div>
          <h3>{record.exercise}</h3>
          <EditItem />
          <DeleteItem
            onClick={() => {
              deleteAndRerender(record.exercise, record.recorded_at, record.maxSetNum, date);
            }}
          />
        </div>
        <div>
          <p>{`距離： ${record.distance}${record.distance_type}`}</p>
          <p>{`時間： ${record.exercise_time}分`}</p>
          {memoField}
        </div>
        <p>{record.recorded_at}</p>
      </div>
    );
  });

  const anaerobicExerciseRecord = useCallback((record, key, setField, date) => {
    return (
      <div key={key}>
        <div>
          <h3>{record.exercise}</h3>
          <EditItem />
          <DeleteItem
            onClick={() =>
              deleteAndRerender(record.exercise, record.recorded_at, record.maxSetNum, date)
            }
          />
        </div>
        {setField}
        <p>{record.recorded_at}</p>
      </div>
    );
  });

  const createTrainingRecordModal = useCallback((recordSummaryList) => {
    return recordSummaryList.map((record, i) => {
      if (record.Exercise.is_aerobic) {
        const memoField = record.memo ? <p>{`メモ: ${record.memo}`}</p> : null;
        return aerobicExerciseRecord(record, i, memoField, recordSummaryList.date);
      } else {
        const setField = [...Array(record.maxSetNum)].map((_, i) => {
          const memoField = record.memo[i] ? <p>{`メモ: ${record.memo[i]}`}</p> : null;
          return (
            <div key={i}>
              <p>{`セット${i + 1}: ${record.weight[i]}${record.weight_type} x ${
                record.repetition[i]
              }`}</p>
              {memoField}
            </div>
          );
        });
        return anaerobicExerciseRecord(record, i, setField, recordSummaryList.date);
      }
    });
  });

  const updateModal = useCallback(async (date) => {
    if (!date) return;
    const res = await getRecordsByDate(date);
    if (!res.results) return;

    const recordSummaryList = createRecordSummaryList(res);
    recordSummaryList.date = date;
    setRecordView(createTrainingRecordModal(recordSummaryList));
  });

  useEffect(() => {
    if (rerenderDate) {
      openModal(rerenderDate);
      setRerenderDate();
    }
  }, [rerenderCount]);

  return [modalWindow, { openModal, updateModal }];
};
