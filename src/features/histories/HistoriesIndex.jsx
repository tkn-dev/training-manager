import React, { useState } from 'react';
import { TrainingCalendar } from './TrainingCalendar';
import { DailySimpleTrainingRecord } from './DailySimpleTrainingRecord';

export const HistoriesIndex = () => {
  const [dailyRecordList, setDailyRecordList] = useState([]);
  const [selectedDate, setSelectedDate] = useState();

  return (
    <div>
      <TrainingCalendar setDailyRecordList={setDailyRecordList} setSelectedDate={setSelectedDate} />
      <DailySimpleTrainingRecord dailyRecordList={dailyRecordList} selectedDate={selectedDate} />
    </div>
  );
};
