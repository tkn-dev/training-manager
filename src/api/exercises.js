export const getExercises = () => {
  return fetch('/exercises/api', {
    method: 'GET',
  }).then(async (res) => {
    const ret = await res.json();
    ret.status = res.status;
    return ret;
  });
};

export const postExercise = (exercise) => {
  return fetch('/exercises/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(exercise),
  }).then(async (res) => {
    const ret = await res.json();
    ret.status = res.status;
    return ret;
  });
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
  }).then(async (res) => {
    const ret = await res.json();
    ret.status = res.status;
    return ret;
  });
};
