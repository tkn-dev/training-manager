import React, { useCallback, useState } from 'react';
import { EditItem } from '../../../components/elements/button/EditItem';
import { DeleteItem } from '../../../components/elements/button/DeleteItem';
import { getRecordsByDate } from '../../../api/records';

export const useRecordSummary = (
  setOpenDialog,
  setOpenEditModal,
  setEditTargetRecord,
  setDeleteTargetRecord,
) => {
  const [recordSummary, setRecordSummary] = useState();

  const createResSummary = useCallback((res) => {
    return res.results.reduce((prev, curt) => {
      const prevMaxLen = prev.length - 1;
      if (
        !prev.length ||
        prev[prevMaxLen].exercise !== curt.exercise ||
        prev[prevMaxLen].recorded_at !== curt.recorded_at
      ) {
        curt.weight = [curt.weight];
        curt.weight_type = [curt.weight_type];
        curt.repetition = [curt.repetition];
        curt.is_supported = [curt.is_supported];
        curt.memo = [curt.memo];
        curt.maxSetNum = 1;
        prev.push(curt);
      } else if (prev[prevMaxLen].exercise === curt.exercise) {
        prev[prevMaxLen].weight = [...prev[prevMaxLen].weight, curt.weight];
        prev[prevMaxLen].weight_type = [...prev[prevMaxLen].weight_type, curt.weight_type];
        prev[prevMaxLen].repetition = [...prev[prevMaxLen].repetition, curt.repetition];
        prev[prevMaxLen].is_supported = [...prev[prevMaxLen].is_supported, curt.is_supported];
        prev[prevMaxLen].memo = [...prev[prevMaxLen].memo, curt.memo];
        prev[prevMaxLen].maxSetNum++;
      }
      return prev;
    }, []);
  });

  const createSetField = useCallback((record) => {
    return [...Array(record.maxSetNum)].map((_, i) => {
      const memoField = record.memo[i] ? <p>{`メモ: ${record.memo[i]}`}</p> : null;
      return (
        <div key={i}>
          <p>{`セット${i + 1}: ${record.weight[i]}${record.weight_type[i]} x ${
            record.repetition[i]
          }`}</p>
          {memoField}
        </div>
      );
    });
  });

  const createAerobicRecordView = useCallback((record, key) => {
    const memoField = record.memo[0] ? <p>{`メモ: ${record.memo}`}</p> : null;
    return (
      <div key={key}>
        <div>
          <h3>{record.exercise}</h3>
          <EditItem
            onClick={() => {
              setOpenEditModal(true);
              setEditTargetRecord(record);
            }}
          />
          <DeleteItem
            onClick={() => {
              setOpenDialog(true);
              setDeleteTargetRecord({
                exercise: record.exercise,
                recorded_at: record.recorded_at,
                set_number: record.set_number,
              });
            }}
          />
        </div>
        <div>
          <p>{`距離： ${record.distance}${record.distance_type}`}</p>
          <p>{`時間： ${record.exercise_time}分`}</p>
          {memoField}
        </div>
        <p>{record.recordedAt}</p>
      </div>
    );
  });

  const createAnaerobicRecordView = useCallback((record, key) => {
    const setField = createSetField(record);
    return (
      <div key={key}>
        <div>
          <h3>{record.exercise}</h3>
          <EditItem
            onClick={() => {
              setOpenEditModal(true);
              setEditTargetRecord(record);
            }}
          />
          <DeleteItem
            onClick={() => {
              setOpenDialog(true);
              setDeleteTargetRecord({
                exercise: record.exercise,
                recorded_at: record.recorded_at,
                set_number: record.maxSetNum,
              });
            }}
          />
        </div>
        {setField}
        <p>{record.recordedAt}</p>
      </div>
    );
  });

  const createRecordSummary = useCallback(async (date) => {
    if (!date) return setRecordSummary();
    const res = await getRecordsByDate(date);
    if (!res.results) return setRecordSummary();

    const resSummary = createResSummary(res);
    setRecordSummary(
      resSummary.map((record, i) => {
        if (record.Exercise.is_aerobic) {
          return createAerobicRecordView(record, i, date);
        } else {
          return createAnaerobicRecordView(record, i, date);
        }
      }),
    );
  });

  return [recordSummary, { createRecordSummary }];
};
