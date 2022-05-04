/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React, { useCallback, useState } from 'react';

const simpleRecordContainer = css({
  display: 'flex',
  justifyContent: 'space-between',
});

export default function useSimpleRecordView() {
  const [simpleRecordView, setSimpleRecordView] = useState();

  const createRecordList = useCallback((dailyRecordList) => {
    return dailyRecordList.reduce((prev, curt) => {
      if (!prev.length || prev[prev.length - 1].recordedAt !== curt.recorded_at) {
        prev.push({
          exercise: curt.exercise,
          isAerobic: curt.Exercise.is_aerobic,
          setNum: curt.set_number,
          distanceKm: curt.distance_km,
          distanceMile: curt.distance_mile,
          recordedAt: curt.recorded_at,
        });
      } else {
        prev[prev.length - 1].setNum++;
      }
      return prev;
    }, []);
  });

  const udpateRecordView = useCallback((dailyRecordList) => {
    const simpleRecordList = createRecordList(dailyRecordList);
    setSimpleRecordView(
      simpleRecordList.map((simpleRecord, i) => {
        let achievement;
        if (simpleRecord.isAerobic) {
          achievement = `${simpleRecord.distanceKm}Km`;
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

  return [simpleRecordView, udpateRecordView];
}
