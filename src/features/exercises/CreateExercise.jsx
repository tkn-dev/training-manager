import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export default function CreateExercise({ onSubmit }) {
  const [result, setResult] = useState();

  useEffect(() => {
    if (result === 201) {
      document.getElementById('exerciseName').value = '';
      document.getElementById('isAerobic').checked = false;
    }
  }, [result]);

  return (
    <div>
      <label htmlFor="exerciseName">
        name
        <input type="text" name="exerciseName" id="exerciseName" />
      </label>
      <label htmlFor="isAerobic">
        有酸素
        <input type="checkbox" name="isAerobic" id="isAerobic" />
      </label>
      <button
        type="submit"
        onClick={() => {
          const exercise = {
            name: document.getElementById('exerciseName').value,
            is_aerobic: document.getElementById('isAerobic').checked,
          };
          onSubmit(exercise).then(async (res) => await setResult(res.status));
        }}
      >
        submit
      </button>
    </div>
  );
}

CreateExercise.propTypes = {
  onSubmit: PropTypes.func,
};

CreateExercise.defaultProps = {
  onSubmit: (f) => f,
};
