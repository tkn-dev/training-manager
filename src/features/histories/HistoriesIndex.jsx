/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React, { useState } from 'react';
import { TrainingCalendar } from './TrainingCalendar';
import { DailySimpleTrainingRecord } from './DailySimpleTrainingRecord';

const container = css({
  maxWidth: '100rem',
});

export const HistoriesIndex = () => {
  const [dailyRecordList, setDailyRecordList] = useState([]);
  const [selectedDate, setSelectedDate] = useState();
  const [modifyCount, setModifyCount] = useState(0);
  const incrementModifyCount = () => setModifyCount((prev) => prev + 1);

  return (
    <div css={container}>
      <TrainingCalendar
        setDailyRecordList={setDailyRecordList}
        setSelectedDate={setSelectedDate}
        modifyCount={modifyCount}
      />
      <DailySimpleTrainingRecord
        dailyRecordList={dailyRecordList}
        selectedDate={selectedDate}
        incrementModifyCount={incrementModifyCount}
      />
    </div>
  );
};
