/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React, { useCallback, useState } from 'react';

const simpleRecordContainer = css({
  display: 'flex',
  justifyContent: 'space-between',
});

export const useSimpleRecordView = () => {
  const [simpleRecordView, setSimpleRecordView] = useState();

  const createRecordList = useCallback((dailyRecordList) => {
    return dailyRecordList.reduce((prev, curt) => {
      if (!prev.length || prev[prev.length - 1].recordedAt !== curt.recorded_at) {
        prev.push({
          exercise: curt.exercise,
          isAerobic: curt.Exercise.is_aerobic,
          setNum: curt.set_number,
          distance: curt.distance,
          distanceType: curt.distance_type,
          recordedAt: curt.recorded_at,
        });
      } else {
        prev[prev.length - 1].setNum++;
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
        return (
          <div key={i} css={simpleRecordContainer}>
            <p>{simpleRecord.exercise}</p>
            <p>{achievement}</p>
          </div>
        );
      }),
    );
  });

  return [simpleRecordView, { updateRecordView }];
};
