import React, { useEffect, useState } from 'react';
import { getExercises } from '../../api/exercises';
import { postRecord } from '../../api/records';
import CreateRecord from './CreateRecord';

export default function RecordsIndex() {
  const [message, setMessage] = useState();
  const [exerciseList, setExerciseList] = useState();

  const getExerciseList = async () => {
    const res = await getExercises();
    setExerciseList(res.results);
  };

  const insertRecord = async (record) => {
    const res = await postRecord(record);
    setMessage(res.message);
    return res;
  };

  useEffect(() => {
    getExerciseList();
  }, []);

  return (
    <section>
      <h1>記録入力</h1>
      <p>{message}</p>
      <CreateRecord exerciseList={exerciseList} onSubmit={insertRecord}></CreateRecord>
    </section>
  );
}
