export const getExercises = () => {
  return fetch('/exercises/api', {
    method: 'GET',
  }).then((res) => res.json());
};

export const postExercise = (exerciseName) => {
  return fetch('/exercises/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: exerciseName,
    }),
  }).then((res) => res.json());
};

export const deleteExercise = (exerciseName) => {
  return fetch('exercises/api', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: exerciseName,
    }),
  }).then((res) => res.json());
};
