import React, { useCallback, useEffect, useState } from 'react';
import { getExercises } from '../../api/exercises';
import { postRecord } from '../../api/records';
import { CreateRecord } from './CreateRecord';
import { AlertDialog } from '../../components/elements/notification/AlertDialog';

export const RecordsIndex = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState();
  const [exerciseList, setExerciseList] = useState();

  const openDialog = useCallback(() => {
    setOpen(true);
  });

  const closeDialog = useCallback(() => {
    setOpen(false);
  });

  const getExerciseList = async () => {
    const res = await getExercises();
    setExerciseList(res.results);
  };

  const insertRecord = async (record) => {
    const res = await postRecord(record);
    setMessage(res.message);
    openDialog();
    return res;
  };

  useEffect(() => {
    getExerciseList();
  }, []);

  return (
    <section>
      <CreateRecord exerciseList={exerciseList} onSubmit={insertRecord} />
      <AlertDialog open={open} title={message} onClose={closeDialog} onAgree={closeDialog} />
    </section>
  );
};
