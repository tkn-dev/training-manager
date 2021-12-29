import React, { useState, useCallback, useEffect } from 'react';
import CreateExercise from './CreateExercise';
import ShowExercises from './ShowExercises';

export default function ExercisesIndex() {
  const [message, setMessage] = useState();
  const [exerciseList, setExerciseList] = useState([]);

  const getExercises = useCallback(() => {
    fetch('/exercises/api', {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => setExerciseList(data.result));
  });
  const insertExercise = useCallback((exerciseName) => {
    fetch('/exercises/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: exerciseName,
      }),
    })
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  });

  const deleteExercise = (exerciseName) => {
    fetch('exercise/api', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: exerciseName,
      }),
    })
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  };

  useEffect(() => {
    getExercises();
  }, []);

  useEffect(() => {
    getExercises();
  }, [exerciseList]);

  return (
    <>
      <h1>種目登録</h1>
      <p>{message}</p>
      <CreateExercise onSubmit={insertExercise} />
      <ShowExercises exerciseList={exerciseList} onDelete={deleteExercise} />
    </>
  );
}
