import React, { useEffect, useState } from 'react';
import { Submit } from '../../components/elements/button/Submit';

export const CreateExercise = ({ onSubmit = (f) => f }) => {
  const [result, setResult] = useState();

  useEffect(() => {
    if (result === 201) {
      document.getElementById('exerciseName').value = '';
      document.getElementById('isAerobic').checked = false;
      setResult();
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
      <Submit
        onClick={() => {
          const exercise = {
            name: document.getElementById('exerciseName').value,
            is_aerobic: document.getElementById('isAerobic').checked,
          };
          onSubmit(exercise).then(async (res) => setResult(res.status));
        }}
      />
    </div>
  );
};
