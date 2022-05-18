import React, { useState } from 'react';
import { TrainingCalendar } from './TrainingCalendar';
import { DailySimpleTrainingRecord } from './DailySimpleTrainingRecord';

export const HistoriesIndex = () => {
  const [dailyRecordList, setDailyRecordList] = useState([]);
  const [selectedDate, setSelectedDate] = useState();
  const [modifyCount, setModifyCount] = useState(0);
  const incrementModifyCount = () => setModifyCount((prev) => prev + 1);

  return (
    <div>
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
