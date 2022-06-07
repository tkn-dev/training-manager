/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React, { useCallback, useState } from 'react';
import { DeleteItem } from '../../components/elements/button/DeleteItem';
import { AlertDialog } from '../../components/elements/notification/AlertDialog';
import { HOVER } from '../../style/constants';

const exercisesContainer = css({
  width: '90%',
});
const exerciseContainer = css({
  display: 'flex',
  justifyContent: 'space-between',
  listStyleType: 'none',
  '&:hover': {
    backgroundColor: HOVER.COLOR,
    transition: HOVER.TRANSITION,
    borderRadius: HOVER.BORDER_RADIUS,
  },
});
const exerciseName = css({
  width: '100%',
  marginTop: '1rem',
  paddingBottom: '1rem',
  borderBottom: '1px solid rgba(0,0,0,0.2)',
});
const deleteExerciseButton = css({
  height: '3.5rem',
  borderBottom: '1px solid rgba(0,0,0,0.2)',
  '&:hover': {
    color: 'crimson',
    transitio: '0.3s',
  },
});

export const ShowExercises = ({ exerciseList = [], onDelete = (f) => f }) => {
  const [open, setOpen] = useState(false);
  const [deleteExerciseName, setDeleteExerciseName] = useState();

  const iterateList = exerciseList.map((exercise, i) => (
    <li key={i.toString()} css={exerciseContainer}>
      <p css={exerciseName}>{exercise}</p>
      <DeleteItem appendCss={deleteExerciseButton} onClick={() => openDialog(exercise)} />
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
    <div css={exercisesContainer}>
      <ul>{iterateList}</ul>
      <AlertDialog
        open={open}
        title={'種目を削除しますか？'}
        onClose={closeDialog}
        onAgree={deleteExercise}
        onDisagree={closeDialog}
      />
    </div>
  );
};
