import React, { useState, useCallback, useEffect } from 'react';
import { CreateExercise } from './CreateExercise';
import { ShowExercises } from './ShowExercises';
import { getExercises, postExercise, deleteExercise } from '../../api/exercises';
import { AlertDialog } from '../../components/elements/notification/AlertDialog';

export const ExercisesIndex = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState();
  const [exerciseList, setExerciseList] = useState([]);

  const openDialog = useCallback(() => {
    setOpen(true);
  });

  const closeDialog = useCallback(() => {
    setOpen(false);
  });

  const updateList = useCallback(async () => {
    const res = await getExercises();
    setExerciseList(res.results.map((result) => result.name));
  });

  const insertExercise = useCallback(async (exercise) => {
    const res = await postExercise(exercise);
    setMessage(res.message);
    updateList();
    if (res.status !== '201') openDialog();
    return res;
  });

  const removeExercise = useCallback(async (exerciseName) => {
    const res = await deleteExercise(exerciseName);
    setMessage(res.message);
    updateList();
    return res;
  });

  useEffect(() => {
    updateList();
  }, []);

  return (
    <section>
      <CreateExercise onSubmit={insertExercise} />
      <ShowExercises exerciseList={exerciseList} onDelete={removeExercise} />
      <AlertDialog open={open} title={message} onClose={closeDialog} onAgree={closeDialog} />
    </section>
  );
};
