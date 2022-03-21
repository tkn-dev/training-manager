import React, { useState } from 'react';
import TrainingCalendar from './TrainingCalendar';
import DailySimpleTrainingRecord from './DailySimpleTrainingRecord';

export default function HistoriesIndex() {
  const [dailyRecordList, setDailyRecordList] = useState();

  return (
    <div>
      <TrainingCalendar setDailyRecordList={setDailyRecordList} />
      <DailySimpleTrainingRecord />
    </div>
  );
}
