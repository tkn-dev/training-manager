import React, { useCallback, useState } from 'react';
import { DeleteItem } from '../../components/elements/button/DeleteItem';
import { AlertDialog } from '../../components/elements/notification/AlertDialog';

export const ShowExercises = ({ exerciseList = [], onDelete = (f) => f }) => {
  const [open, setOpen] = useState(false);
  const [deleteExerciseName, setDeleteExerciseName] = useState();

  const iterateList = exerciseList.map((exercise, i) => (
    <li key={i.toString()}>
      <p>{`${i} ${exercise}`}</p>
      <DeleteItem onClick={() => openDialog(exercise)} />
    </li>
  ));

  const openDialog = useCallback((exercise) => {
    setOpen(true);
    setDeleteExerciseName(exercise);
  });

  const closeDialog = useCallback(() => {
    setOpen(false);
  });

  const deleteExercise = useCallback(async () => {
    const res = await onDelete(deleteExerciseName);
    if (res.status === 201) {
      closeDialog();
      setDeleteExerciseName();
    }
  });

  return (
    <div>
      <ul>{iterateList}</ul>
      <AlertDialog
        open={open}
        title={'種目を削除しますか？'}
        onAgree={deleteExercise}
        onDisagree={closeDialog}
      />
    </div>
  );
};
