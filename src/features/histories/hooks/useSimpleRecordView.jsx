/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React, { useCallback, useState } from 'react';
import { HiOutlineAnnotation } from 'react-icons/hi';

const simpleRecordContainer = css({
  display: 'flex',
  justifyContent: 'space-between',
});
const achievementStyle = css({
  width: '15%',
  textAlign: 'right',
});

export const useSimpleRecordView = () => {
  const [simpleRecordView, setSimpleRecordView] = useState();

  const createRecordList = useCallback((dailyRecordList) => {
    return dailyRecordList.reduce((prev, curt) => {
      if (!prev.length || prev[prev.length - 1].recordedAt !== curt.recorded_at) {
        const existMemo = !!curt.memo;
        prev.push({
          exercise: curt.exercise,
          isAerobic: curt.Exercise.is_aerobic,
          setNum: curt.set_number,
          distance: curt.distance,
          distanceType: curt.distance_type,
          recordedAt: curt.recorded_at,
          existMemo: existMemo,
        });
      } else {
        prev[prev.length - 1].setNum++;
        if (curt.memo) prev[prev.length - 1].existMemo = true;
      }
      return prev;
    }, []);
  });

  const updateRecordView = useCallback((dailyRecordList) => {
    const simpleRecordList = createRecordList(dailyRecordList);
    setSimpleRecordView(
      simpleRecordList.map((simpleRecord, i) => {
        let achievement;
        if (simpleRecord.isAerobic) {
          achievement = `${simpleRecord.distance}${simpleRecord.distanceType}`;
        } else {
          achievement = `${simpleRecord.setNum}セット`;
        }
        const annotation = simpleRecord.existMemo ? <HiOutlineAnnotation /> : null;
        return (
          <div key={i} css={simpleRecordContainer}>
            <p css={css({ width: '75%' })}>{simpleRecord.exercise}</p>
            <p css={achievementStyle}>{achievement}</p>
            <p css={css({ width: '5%' })}>{annotation}</p>
          </div>
        );
      }),
    );
  });

  return [simpleRecordView, { updateRecordView }];
};
