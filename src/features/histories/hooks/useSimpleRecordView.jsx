/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React, { useCallback, useState } from 'react';
import { HiOutlineAnnotation } from 'react-icons/hi';
import { COLOR } from '../../../style/constants';

const simpleRecordContainer = css({
  display: 'flex',
});
const exerciseStyle = css({
  width: '75%',
  marginTop: '1rem',
  paddingBottom: '1rem',
  borderBottom: `1px solid ${COLOR.BORDER}`,
})
const achievementStyle = css({
  width: '20%',
  textAlign: 'right',
  marginTop: '1rem',
  paddingBottom: '1rem',
  borderBottom: `1px solid ${COLOR.BORDER}`,
});
const annotationStyle = css({
  width: '10%',
  textAlign: 'center',
  marginTop: '1rem',
  paddingBottom: '1rem',
  borderBottom: `1px solid ${COLOR.BORDER}`,
})

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
            <p css={exerciseStyle}>{simpleRecord.exercise}</p>
            <p css={achievementStyle}>{achievement}</p>
            <p css={annotationStyle}>{annotation}</p>
          </div>
        );
      }),
    );
  });

  return [simpleRecordView, { updateRecordView }];
};
