export const getExercises = () => {
  return fetch('/exercises/get/all', {
    method: 'GET',
  }).then(async (res) => {
    const ret = await res.json();
    ret.status = res.status;
    return ret;
  });
};

export const postExercise = (exercise) => {
  return fetch('/exercises/new', {
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
  return fetch('exercises/delete', {
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
