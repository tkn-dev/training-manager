import React, { useState, useCallback, useEffect } from 'react';
import CreateExercise from './CreateExercise';
import ShowExercises from './ShowExercises';
import {
  getExercises,
  postExercise,
  deleteExercise,
} from '../../api/exercises';

export default function ExercisesIndex() {
  const [message, setMessage] = useState();
  const [exerciseList, setExerciseList] = useState([]);

  const updateList = useCallback(async () => {
    const res = await getExercises();
    setExerciseList(res.results.map((result) => result.name));
  });

  const insertExercise = useCallback(async (exerciseName) => {
    const res = await postExercise(exerciseName);
    setMessage(res.message);
    updateList();
  });

  const removeExercise = useCallback(async (exerciseName) => {
    const res = await deleteExercise(exerciseName);
    setMessage(res.message);
    updateList();
  });

  useEffect(() => {
    updateList();
  }, []);

  return (
    <section>
      <h1>種目登録</h1>
      <p>{message}</p>
      <CreateExercise onSubmit={insertExercise} />
      <ShowExercises exerciseList={exerciseList} onDelete={removeExercise} />
    </section>
  );
}
